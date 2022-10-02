import { useCallback, useEffect, useRef } from "react";
import useStateWithCallback from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
import  freeIce  from "freeice";

const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);

  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef({});
  const socket = useRef(null);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const addNewClient = useCallback(
    (newClient, cb) => {
      const findClient = clients.find((client) => client.id === newClient.id);

      if (findClient === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  // audio capture

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };
    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());

      socket.current.emit(ACTIONS.LEAVE, { roomId });
    };
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      //check client is connected or not
      if (peerId in connections.current) {
        return console.alert(`You are already connected with ${peerId}`);
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeIce(),
      });

      //handle new ice candidate
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      //handle stream in RTC
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            //connect audio element to  connected clients
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            //if audio elemnt is not rendered
            let setteld = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                //connect audio element to  connected clients
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                setteld = true;
              }

              if (setteld) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // add loacl track to remote coonection means speaker audio to all clients
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      //create offer

      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        //send offer to another client

        await connections.current[peerId].setLocalDescription(offer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    // cleaning function of events to prevent memory leekage
    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  //handle icecandidate
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  //handle SDP sessionDescription

  useEffect(() => {
    const handleRelaySdp = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      // if session description is type of offer then create an answer

      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();
        connection.setLocalDescription(answer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRelaySdp);

    //claeaner function
    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  // handle remove peer

  useEffect(() => {
    const handleRemovePeer = async (peerId, userId) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }

      delete connections.current[peerId];
      delete audioElements.current[peerId];

      setClients((list) => list.filter((client) => client.id !== userId));
    };

    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  return { clients, provideRef };
};

export default useWebRTC;

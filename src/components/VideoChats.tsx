import Peer from "simple-peer";
import { FC, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useAuthContext } from "../context/AuthProvider";
import { useAppContext } from "../context/AppProvider";
import { useHistory } from "react-router-dom";
import { iceServers, UserMediaConstraints } from "../utils/const";
import { FiVideoOff } from "react-icons/fi";
import { PeerType, UserType } from "../utils/types";
import { Video } from "./SingleVideo";
import useSound from "use-sound";

import joinSoundEffect from "../assets/discord-join.mp3";
import leaveSoundEffect from "../assets/discord-leave.mp3";
import handUpSoundEffect from "../assets/hand-up.wav";
import Loader from "./Loader";

const VideoChat: FC<{
  roomId: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  handsUp: boolean;
}> = ({ roomId, socket, handsUp }) => {
  const { currentUser } = useAuthContext();
  const {
    isMicOn,
    isVideoOn,
    leaveVideoChatTrigger,
    chatRoomTrigger,
    isSharingScreen,
  } = useAppContext();

  const [joiningSound] = useSound(joinSoundEffect, { volume: 0.3 });
  const [leavingingSound] = useSound(leaveSoundEffect);
  const [handUpSound] = useSound(handUpSoundEffect, { volume: 0.3 });

  const history = useHistory();
  const [peers, setPeers] = useState<PeerType[]>([]);
  const [numUsers, setNumUsers] = useState(0);
  const [triggerHands, setTriggerHands] = useState(false);
  const [totalConnected, setTotalConnected] = useState(0);

  const [allConnected, setAllConnected] = useState(false);

  const userVideo = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>();

  useEffect(() => {
    if (totalConnected === numUsers && numUsers !== 0) setAllConnected(true);
    if (numUsers === 0) setAllConnected(false);
  }, [numUsers, totalConnected]);

  useEffect(() => {
    if (isSharingScreen) {
      peers.forEach(async (peer) => {
        const mediaDevices = navigator.mediaDevices as any;
        const stream = await mediaDevices.getDisplayMedia();
        const vid = stream.getVideoTracks()[0];
        if (streamRef.current)
          peer.peer.replaceTrack(
            streamRef.current.getVideoTracks()[0],
            vid,
            streamRef.current
          );
        if (userVideo.current) userVideo.current.srcObject = stream;
      });
    } else if (isVideoOn) {
      peers.forEach(async (peer) => {
        // const stream = await navigator.mediaDevices.getUserMedia(
        //   UserMediaConstraints
        // );
        // const vid = stream.getVideoTracks()[0];
        if (streamRef.current) {
          peer.peer.replaceTrack(
            streamRef.current.getVideoTracks()[0],
            streamRef.current.getVideoTracks()[0],
            streamRef.current
          );
          if (userVideo.current)
            userVideo.current.srcObject = streamRef.current;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSharingScreen, peers.length, isVideoOn]);

  useEffect(() => {
    if (triggerHands) handUpSound();
    setTriggerHands(false);
  }, [triggerHands, handUpSound]);

  useEffect(() => {
    if (peers.length > numUsers) {
      joiningSound();
    } else if (numUsers > peers.length) {
      leavingingSound();
    }
    setNumUsers(peers.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers]);

  useEffect(() => {
    if (streamRef.current)
      streamRef.current.getAudioTracks()[0].enabled = isMicOn;
  }, [isMicOn]);

  useEffect(() => {
    if (streamRef.current)
      streamRef.current.getVideoTracks()[0].enabled = isVideoOn;
  }, [isVideoOn]);

  useEffect(() => {
    if (leaveVideoChatTrigger) {
      // removes connected peers from connection
      peers.forEach((peer) => {
        peer.peer.destroy();
      });

      socket.emit("manual-disconnect", { id: socket.id });
      streamRef.current?.getTracks().forEach(function (track) {
        track.stop();
      });

      if (chatRoomTrigger) {
        history.push(`/chatroom/${roomId}`);
      } else {
        history.push("/login");
      }
    }
    // Memory leak fix, do not call an event which would lead to
    // change this in this use effet
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveVideoChatTrigger, chatRoomTrigger, peers, history, roomId]);

  useEffect(() => {
    const localArrayOfPeers: PeerType[] = [];

    navigator.mediaDevices
      .getUserMedia(UserMediaConstraints)
      .then((stream) => {
        // eslint-ignore
        streamRef.current = stream;
        userVideo.current!.srcObject = streamRef.current;

        socket.emit("join-room", {
          roomId,
          name: currentUser?.displayName,
          isAnonymous: currentUser?.isAnonymous,
        });
        socket.on("all-users", (users: UserType[]) => {
          const gettingPeers: PeerType[] = [];
          users.forEach((user) => {
            const peer = createPeer(
              user.id,
              socket.id,
              streamRef.current!,
              currentUser?.displayName,
              currentUser?.isAnonymous!
            );
            localArrayOfPeers.push({
              peerId: user.id,
              peer,
              name: user.name,
              isAnonymous: user.isAnonymous,
            });
            gettingPeers.push({
              peerId: user.id,
              peer,
              name: user.name,
              isAnonymous: user.isAnonymous,
            });
          });
          setPeers(gettingPeers);
        });

        socket.on("hands", ({ handymanId, state }) => {
          if (state) setTriggerHands(true);
          setPeers((prev) =>
            prev.map((peer) => {
              if (peer.peerId !== handymanId) return peer;
              else return { ...peer, handState: state };
            })
          );
        });

        socket.on("user-joined", ({ signal, callerId, name, isAnonymous }) => {
          const peer = addPeer(signal, callerId, streamRef.current!);
          localArrayOfPeers.push({
            peerId: callerId,
            peer,
            name,
            isAnonymous,
          });

          setPeers((users) => [
            ...users,
            { peerId: callerId, peer, name, isAnonymous },
          ]);
        });

        socket.on("handshake", ({ signal, id }) => {
          const item = localArrayOfPeers.find((p) => p.peerId === id);
          if (item) item.peer.signal(signal);
        });

        socket.on("user-left", ({ quiterId }) => {
          const quiter = localArrayOfPeers.find(
            (peer) => peer.peerId === quiterId
          );
          if (quiter) {
            quiter.peer.destroy();
            setPeers((prevPeers) =>
              prevPeers.filter((peer) => peer.peerId !== quiterId)
            );
          }
        });
      })
      .catch(() => {
        alert("you need to give permissions for camera/mic!!!\nThen Refresh");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createPeer = (
    userToConnect: string,
    callerId: string,
    stream: MediaStream,
    myName: string,
    isAnonymous: boolean
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: { iceServers },
    });

    peer.addListener("connect", () => {
      setTotalConnected((prev) => prev + 1);
    });

    peer.on("signal", (signal) => {
      socket.emit("signalling", {
        userToConnect,
        callerId,
        signal,
        myName,
        isAnonymous,
      });
    });

    return peer;
  };

  const addPeer = (
    signalRecieved: string | Peer.SignalData,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: { iceServers },
    });

    peer.addListener("connect", () => {
      setTotalConnected((prev) => prev + 1);
    });

    peer.on("signal", (signal) => {
      socket.emit("signalling-back", { signal, callerId });
    });

    peer.signal(signalRecieved);
    return peer;
  };

  return (
    <>
      <div className="my-video-container">
        <video muted ref={userVideo} autoPlay playsInline id="my-video" />
        {!isVideoOn && <FiVideoOff className="no-vid" />}
        <div className={`hand ${!handsUp ? "invisible" : ""}`}>✋🏼</div>
      </div>
      {peers.length > 0 ? (
        peers.map((peer) => {
          return (
            <Video
              key={peer.peerId}
              peer={peer.peer}
              name={peer.name}
              isAnonymous={peer.isAnonymous}
              handState={peer.handState}
            />
          );
        })
      ) : !allConnected && peers.length > 0 ? (
        <Loader />
      ) : (
        <p className="empty-room">
          Seems Like no one's here yet, Invite people by sharing the link in the
          url!
        </p>
      )}
    </>
  );
};

export default VideoChat;

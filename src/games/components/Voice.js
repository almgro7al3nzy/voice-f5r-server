
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

// import io from 'socket.io-client'
import { io } from 'socket.io-client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TRUTH, DARE, CHOICES } from '../types';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { v4 as uuidv4 } from 'uuid';
// const ENDPOINT = 'http://192.168.1.2:8000/webrtcPeer';
import { IP } from '../../utils';

const dimensions = Dimensions.get('screen')

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,    // used to hold local stream object to avoid recreating the stream everytime a new offer comes
      remoteStream: null,    // used to hold remote stream object that is displayed in the main screen

      remoteStreams: [],    // holds all RTCView Streams (all remote streams)
      peerConnections: {},  // holds all Peer Connections
      selectedVideo: null,

      status: 'Please wait...',

      // showMicSettings: props.showMicSettings,
      showMicSettings: false,

      pc_config: {
        "iceServers": [
          {
            "url" : 'stun:stun.l.google.com:19302'
          },
        ]
      },

      sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': false
        }
      },

      messages: [],
      sendChannels: [],
      disconnected: false,
      room: null,
      connect: true,
      camera: true,
      mic: true,
    }

    // DONT FORGET TO CHANGE TO YOUR URL
    // this.serviceIP = 'https://97cb-188-216-87-105.ngrok.io/webrtcPeer'
    this.serviceIP = 'http://192.168.1.2:8000/webrtcPeer'

    // this.sdp
    this.socket = null
    // this.sdpOptions = {
    //   'offerToReceiveAudio': true,
    //   'offerToReceiveVideo': true
    // }
  }

  getLocalStream = () => {
    const success = (stream) => {
      
      this.setState({
        localStream: stream
      })

      this.whoisOnline()
    }

    const failure = (e) => {
      
    }

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: false,
        // video: {
        //   mandatory: {
        //     minWidth: 500, // Provide your own width, height and frame rate here
        //     minHeight: 300,
        //     minFrameRate: 30
        //   },
        //   facingMode: (isFront ? "user" : "environment"),
        //   optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
        // }
      }

      mediaDevices.getUserMedia(constraints)
        .then(success)
        .catch(failure);
    });
  }

  whoisOnline = () => {
    // let all peers know I am joining
    this.sendToPeer('onlinePeers', null, {local: this.socket.id})
  }

  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload,
      userId: this.props.userId
    })
  }

  createPeerConnection = ({socketID, userId}, callback) => {
    console.log('CREATEPEERCONNNNNNNNNNNNN', socketID, userId);
    try {
      let pc = new RTCPeerConnection(this.state.pc_config)

      // add pc to peerConnections object
      const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
      this.setState({
        peerConnections
      })

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          this.sendToPeer("candidate", e.candidate, {
            local: this.socket.id,
            remote: socketID
          })
        }
      }

      pc.oniceconnectionstatechange = (e) => {
        // if (pc.iceConnectionState === 'disconnected') {
        //   const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== socketID)

        //   this.setState({
        //     remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
        //   })
        // }
      }

      pc.onaddstream = (e) => {
        debugger

        let _remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}

        // if (e.stream.getTracks().length === 2) alert(e.stream.getTracks()[0].kind)

        // let swappedStream = new MediaStream()
        // 
        // e.stream.getAudioTracks() && swappedStream.addTrack(e.stream.getAudioTracks()[0])
        // 
        // e.stream.getVideoTracks() && swappedStream.addTrack(e.stream.getVideoTracks()[0])
        // 

        // 1. check if stream already exists in remoteStreams
        // const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)

        remoteVideo = {
          id: socketID,
          userId: userId,
          stream: e.stream,
        }
        remoteStreams = [...this.state.remoteStreams, remoteVideo]

        // 2. if it does exist then add track
        // if (rVideos.length) {
        //   _remoteStream = rVideos[0].stream
        //   _remoteStream.addTrack(e.track, _remoteStream)
        //   remoteVideo = {
        //     ...rVideos[0],
        //     stream: _remoteStream,
        //   }
        //   remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
        //     return _remoteVideo.id === remoteVideo.id && remoteVideo || _remoteVideo
        //   })
        // } else {
        //   // 3. if not, then create new stream and add track
        //   _remoteStream = new MediaStream()
        //   _remoteStream.addTrack(e.track, _remoteStream)

        //   remoteVideo = {
        //     id: socketID,
        //     name: socketID,
        //     stream: _remoteStream,
        //   }
        //   remoteStreams = [...this.state.remoteStreams, remoteVideo]
        // }



        // const remoteVideo = {
        //   id: socketID,
        //   name: socketID,
        //   stream: e.streams[0]
        // }

        this.setState(prevState => {

          // If we already have a stream in display let it stay the same, otherwise use the latest stream
          // const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
          const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.stream }

          // get currently selected video
          let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
          // if the video is still in the list, then do nothing, otherwise set to new video stream
          selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }

          return {
            // selectedVideo: remoteVideo,
            ...selectedVideo,
            // remoteStream: e.streams[0],
            ...remoteStream,
            remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
          }
        })
      }

      pc.close = () => {
        // alert('GONE')
      }

      if (this.state.localStream && pc) {
        pc.addStream(this.state.localStream)

      //   // this.state.localStream.getTracks().forEach(track => {
      //   //   pc.addTrack(track, this.state.localStream)
      //   // })
      }
      // return pc
      callback(pc)

    } catch(e) {
      
      // return;
      callback(null)
    }
  }

  componentDidMount = () => { 
    console.log('voicedidmount');
    this.joinRoom() 
  }

  componentWillUnmount() {
    this.leaveVoice();
  }

  joinRoom = () => {

    this.setState({
      connect: true,
    })


    this.socket = io.connect(
      `${IP}/webrtcPeer`,
      {
        query: {
          room: this.props.roomId
        },
        auth: { room: this.props.roomId }
      }
    )

//     const socket = io(`${IP}/webrtcPeer`, { transports: ['websocket'] }); 
//     socket.on('connect_error', err => console.log(err));
// socket.on('connect_failed', err => console.log(err));
// socket.on('disconnect', err => console.log(err));
    console.log('voicesocket', this.socket, '####################');

    this.socket.on('connection-success', data => {

      this.getLocalStream()

      
      const status = data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : this.state.status

      this.setState({
        status,
        messages: data.messages
      })
    })

    this.socket.on('joined-peers', data => {

      this.setState({
        status: data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : 'Waiting for other peers to connect'
      })
    })

    this.socket.on('peer-disconnected', data => {
      

      const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)

      this.setState(prevState => {
        // check if disconnected peer is the selected video and if there still connected peers, then select the first
        const selectedVideo = prevState.selectedVideo.id === data.socketID && remoteStreams.length ? { selectedVideo: remoteStreams[0] } : null

        return {
          // remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
          remoteStreams,
          ...selectedVideo,
          status: data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : 'Waiting for other peers to connect'
        }
        }
      )
    })

    this.socket.on('online-peer', ({socketID, userId}) => {
    // this.socket.on('online-peer', socketID => {
      // debugger
      
      // console.log('ONLINEPERRRRRRRRRRRRRR', socketID);
      console.log('ONLINEPERRRRRRRRRRRRRR', socketID, userId);
      // create and send offer to the peer (data.socketID)
      // 1. Create new pc
      this.createPeerConnection({socketID, userId}, pc => {
        // 2. Create Offer
        if (!pc) return;
      
          // Send Channel
          // const handleSendChannelStatusChange = (event) => {
            
          // }

          // const sendChannel = pc.createDataChannel('sendChannel')
          // sendChannel.onopen = handleSendChannelStatusChange
          // sendChannel.onclose = handleSendChannelStatusChange
        
          // this.setState(prevState => {
          //   return {
          //     sendChannels: [...prevState.sendChannels, sendChannel]
          //   }
          // })

          // // Receive Channels
          // const handleReceiveMessage = (event) => {
          //   const message = JSON.parse(event.data)
            
          //   this.setState(prevState => {
          //     return {
          //       messages: [...prevState.messages, message]
          //     }
          //   })
          // }

          // const handleReceiveChannelStatusChange = (event) => {
          //   if (this.receiveChannel) {
              
          //   }
          // }

          // const receiveChannelCallback = (event) => {
          //   const receiveChannel = event.channel
          //   receiveChannel.onmessage = handleReceiveMessage
          //   receiveChannel.onopen = handleReceiveChannelStatusChange
          //   receiveChannel.onclose = handleReceiveChannelStatusChange
          // }

          // pc.ondatachannel = receiveChannelCallback


        pc.createOffer(this.state.sdpConstraints)
          .then(sdp => {
            pc.setLocalDescription(sdp)

            this.sendToPeer('offer', sdp, {
              local: this.socket.id,
              remote: socketID
            })
          })
      })
    })

    this.socket.on('offer', data => {
      // console.log('oferrrrrrrrrrrrrrrrrrrrrrr', data);
      this.createPeerConnection({socketID: data.socketID, userId: data.userId}, pc => {
        if (!pc) return;

        pc.addStream(this.state.localStream)

        // Send Channel
//         const handleSendChannelStatusChange = (event) => {
          
//         }

//         const sendChannel = pc.createDataChannel('sendChannel')
//         sendChannel.onopen = handleSendChannelStatusChange
//         sendChannel.onclose = handleSendChannelStatusChange
        
//         this.setState(prevState => {
//           return {
//             sendChannels: [...prevState.sendChannels, sendChannel]
//           }
//         })

//         // Receive Channels
//         const handleReceiveMessage = (event) => {
//           const message = JSON.parse(event.data)
          
//           this.setState(prevState => {
//             return {
//               messages: [...prevState.messages, message]
//             }
//           })
//         }

//         const handleReceiveChannelStatusChange = (event) => {
//           if (this.receiveChannel) {
            
//           }
//         }

//         const receiveChannelCallback = (event) => {
//           const receiveChannel = event.channel
//           receiveChannel.onmessage = handleReceiveMessage
//           receiveChannel.onopen = handleReceiveChannelStatusChange
//           receiveChannel.onclose = handleReceiveChannelStatusChange
//         }

//         pc.ondatachannel = receiveChannelCallback
// debugger
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
          // 2. Create Answer
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              pc.setLocalDescription(sdp)

              this.sendToPeer('answer', sdp, {
                local: this.socket.id,
                remote: data.socketID
              })
            }).catch(console.log)
        }).catch(console.log)
      })
    })

    this.socket.on('answer', ({sdp, socketID}) => {
      // get remote's peerConnection
      const pc = this.state.peerConnections[socketID]
      // 
      pc.setRemoteDescription(new RTCSessionDescription(sdp)).then(()=>{}).catch(console.log)
    })

    this.socket.on('candidate', (data) => {
      try {
        // get remote's peerConnection
        const pc = this.state.peerConnections[data.socketID]

        if (!pc) return;
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      }
      catch (err) {
        console.log(err);
      }
    })
  }

  switchVideo = (_video) => {
    debugger
    // alert(_video)
    this.setState({
      selectedVideo: _video
    })
  }

  stopTracks = (stream) => {
    if (!stream) return;
    
    stream.getTracks().forEach(track => track.stop())
  }

  toggleCamera = () => {
    const videoTrack = this.state.localStream.getTracks().filter(track => track.kind === 'video')
    videoTrack[0].enabled = !videoTrack[0].enabled
    this.setState({
      camera: videoTrack[0].enabled
    })
  }

  

  toggleMicrophone = () => {
    const audioTrack = this.state.localStream.getTracks().filter(track => track.kind === 'audio')
    audioTrack[0].enabled = !audioTrack[0].enabled
    this.setState({
      mic: audioTrack[0].enabled
    })
  }

  leaveVoice = () => {
    // disconnect socket
    this.socket.close()

    // localStream.stop()
    this.stopTracks(this.state.localStream)

    // stop all remote audio & video tracks
    this.state.remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

    // stop all remote peerconnections
    this.state.peerConnections && Object.values(this.state.peerConnections).forEach(pc => pc.close())

    this.setState({
      connect: false,
      peerConnections: {},
      remoteStreams: [],
      localStream: null,
      remoteStream: null,
      selectedVideo: null,
    })
  }

  render() {
    return null;
    
    const {
      localStream,
      remoteStreams,
      peerConnections,
      room,
      connect,
    } = this.state;

    const {
      userId,
      currentPlayerId,
    } = this.props;

    // const micFlex = this.state.showMicSettings ? {flex: 1} : {flex: 0}
    console.log('remoteStreamsmmmmmmm', remoteStreams, peerConnections);
    // console.log('peerConnectionssssssssssssss', peerConnections, Object.keys(peerConnections).length);

    // const remoteStreamIndex = remoteStreams.findIndex(rStream => rStream.id === currentPlayerSocketId);
    const remoteStream = remoteStreams.find(rStream => rStream.userId === currentPlayerId) || remoteStreams[0];
    // const stream = currentPlayer ? localStream : remoteStreams[0] && remoteStreams[0].stream;
    const stream = userId === currentPlayerId ? localStream : remoteStream && remoteStream.stream;

    console.log('STREEEEEEEEEM', currentPlayerId, userId, remoteStream);

    
   
    return (

      <SafeAreaView style={styles.container}>


        {this.props.truthOrDareChoice === DARE && (
        // {false && (
        <View style={styles.videosContainer}>
          {/* <View style={{
            position: 'absolute',
            zIndex: 1,
            top: 10,
            right: 10,
            width: 100,
            // height: 150,
            backgroundColor: 'black', //width: '100%', height: '100%'
          }}>
              <View style={{flex: 1 }}> */}
                {/* <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}> */}
                    <RTCView
                      key={1}
                      zOrder={0}
                      objectFit='cover'
                      // style={{ ...styles.rtcView }}
                      // style={{
                      //   flex: 1,
                      //   width: '100%',
                      //   backgroundColor: 'black',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      // }}
                      style={{ 
                        width: dimensions.width -200, 
                        height: dimensions.height / 4, 
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 100,
                      }}
                      streamURL={localStream && localStream.toURL()}
                      type='local'
                    />
                {/* </TouchableOpacity> */}
              {/* </View>
          </View> */}
{/* 
            <View
              onPress={() => alert('hello')}
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            > */}

        {/* <RTCView
          key={2}
          mirror={true}
          style={styles.rtcView}
          objectFit='cover'
          streamURL={this.state.selectedVideo && this.state.selectedVideo.stream && this.state.selectedVideo.stream.toURL()}
          type='remote'
        /> */}
        <RTCView
          key={2}
          mirror={true}
          style={styles.rtcView}
          objectFit='cover'
          streamURL={stream && stream.toURL()}
          type='remote'
        />

        
          </View>

        )}

        </SafeAreaView>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    zIndex: 2,
    // zIndex: 2000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // top: '50%',
    // top: dimensions.height / 2,
    // top: 200,
    // bottom: 62,
    // padding: 20,
    // margin: 20,
    // marginHorizontal: 20,
    // zIndex: 100,
    // flex: 1,
    // width: '100%',
    // padding: 50,
    // flexGrow: 1,
    // flexShrink: 1,
    // right: 0, 
    backgroundColor: 'pink',
  },

  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // position: 'absolute',
    // right: 0, 
    // padding: 20,
    backgroundColor: 'yellow',
  },
  rtcView: {
    // width: dimensions.width,
    width: '100%',
    // height: dimensions.height / 2,
    // height: dimensions.height,
    height: dimensions.width + dimensions.width / 8,
    backgroundColor: 'red',
    // borderRadius: 5,
  },
  buttons: {
    // position: 'absolute',
    zIndex: 11,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    // backgroundColor: 'white',
    // padding: 20,
  },
  scrollView: {
    // flex: 1,
    // // flexDirection: 'row',
    // backgroundColor: 'black',
    // padding: 15,
    // position: 'absolute',
    zIndex: 0,
    bottom: 10,
    right: 0,
    left: 0,
    // width: 100, height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  rtcViewRemote: {
    width: 110, //dimensions.width,
    height: 110, //dimensions.height / 2,
    // backgroundColor: 'black',
    borderRadius: 5,
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 20,
    color: '#ddd',

  },
  btn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 10,
    // textAlign: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  micSettings: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

export default App;







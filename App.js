
// // import Socket from 'socket.io-client';
// // import {StyleSheet} from 'react-native';
// // import React, {useRef, useState, useEffect} from 'react';
// // import {
// //   RTCView,
// //   RTCPeerConnection,
// //   RTCIceCandidate,
// //   mediaDevices,
// // } from 'react-native-webrtc';

// // const config = {
// //   iceServers: [
// //     {
// //       urls: ['stun:stun.l.google.com:19302'],
// //     },
// //   ],
// // };

// // const styles = StyleSheet.create({
// //   viewer: {
// //     flex: 1,
// //     display: 'flex',
// //     backgroundColor: '#4F4',
// //   },
// // });

// // const App = () => {
// //   console.log('year baby');
// //   // you have to keep the peer connections without re-rendering
// //   // every time a peer connects/disconnects
// //   const peerConnections = useRef(new Map());
// //   const [stream, setStream] = useState(null);
// //   const [socket] = useState(Socket.connect('ws://8f9e54dd.ngrok.io')); // replace with your host machine's IP or public url

// //   useEffect(() => {
// //     socket.on('connect', () => {
// //       if (stream) socket.emit('broadcaster');

// //       socket.on('watcher', async id => {
// //         const connectionBuffer = new RTCPeerConnection(config);

// //         stream.getTracks.forEach(track =>
// //           connectionBuffer.addTrack(track, stream),
// //         );

// //         connectionBuffer.onicecandidate = ({candidate}) => {
// //           if (candidate) socket.emit('candidate', id, candidate);
// //         };

// //         const localDescription = await connectionBuffer.createOffer();

// //         await connectionBuffer.setLocalDescription(localDescription);

// //         socket.emit('offer', id, connectionBuffer.localDescription);

// //         peerConnections.current.set(id, connectionBuffer);
// //       });

// //       socket.on('candidate', (id, candidate) => {
// //         const candidateBuffer = new RTCIceCandidate(candidate);
// //         const connectionBuffer = peerConnections.current.get(id);

// //         connectionBuffer.addIceCandidate(candidateBuffer);
// //       });

// //       socket.on('answer', (id, remoteOfferDescription) => {
// //         const connectionBuffer = peerConnections.current.get(id);

// //         connectionBuffer.setRemoteDescription(remoteOfferDescription);
// //       });

// //       socket.on('disconnectPeer', id => {
// //         peerConnections.current.get(id).close();
// //         peerConnections.current.delete(id);
// //       });
// //     });

// //     return () => {
// //       if (socket.connected) socket.close(); // close the socket if the view is unmounted
// //     };
// //   }, [socket, stream]);

// //   useEffect(() => {
// //     if (!stream) {
// //       (async () => {
// //         const availableDevices = await mediaDevices.enumerateDevices();
// //         const {deviceId: sourceId} = availableDevices.find(
// //           // once we get the stream we can just call .switchCamera() on the track to switch without re-negotiating
// //           // ref: https://github.com/react-native-webrtc/react-native-webrtc#mediastreamtrackprototype_switchcamera
// //           device => device.kind === 'videoinput' && device.facing === 'front',
// //         );

// //         const streamBuffer = await mediaDevices.getUserMedia({
// //           audio: true,
// //           video: {
// //             mandatory: {
// //               // Provide your own width, height and frame rate here
// //               minWidth: 500,
// //               minHeight: 300,
// //               minFrameRate: 30,
// //             },
// //             facingMode: 'user',
// //             optional: [{sourceId}],
// //           },
// //         });

// //         setStream(streamBuffer);
// //       })();
// //     }
// //   }, [stream]);

// //   return <RTCView streamURL={stream?.toURL()} style={styles.viewer} />;
// // };

// // export default App;





// // import React from 'react';
// // import {View, SafeAreaView, Button, StyleSheet} from 'react-native';

// // import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';

// // export default function App() {
// //   const [localStream, setLocalStream] = React.useState();
// //   const [remoteStream, setRemoteStream] = React.useState();
// //   const [cachedLocalPC, setCachedLocalPC] = React.useState();
// //   const [cachedRemotePC, setCachedRemotePC] = React.useState();

// //   const [isMuted, setIsMuted] = React.useState(false);

// //   const startLocalStream = async () => {
// //     // isFront will determine if the initial camera should face user or environment
// //     const isFront = true;
// //     const devices = await mediaDevices.enumerateDevices();

// //     const facing = isFront ? 'front' : 'environment';
// //     const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
// //     const facingMode = isFront ? 'user' : 'environment';
// //     const constraints = {
// //       audio: true,
// //       video: {
// //         mandatory: {
// //           minWidth: 500, // Provide your own width, height and frame rate here
// //           minHeight: 300,
// //           minFrameRate: 30,
// //         },
// //         facingMode,
// //         optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
// //       },
// //     };
// //     const newStream = await mediaDevices.getUserMedia(constraints);
// //     setLocalStream(newStream);
// //   };

// //   const startCall = async () => {
// //     // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
// //     const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
// //     const localPC = new RTCPeerConnection(configuration);
// //     const remotePC = new RTCPeerConnection(configuration);

// //     // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
// //     localPC.onicecandidate = e => {
// //       try {
// //         console.log('localPC icecandidate:', e.candidate);
// //         if (e.candidate) {
// //           remotePC.addIceCandidate(e.candidate);
// //         }
// //       } catch (err) {
// //         console.error(`Error adding remotePC iceCandidate: ${err}`);
// //       }
// //     };
// //     remotePC.onicecandidate = e => {
// //       try {
// //         console.log('remotePC icecandidate:', e.candidate);
// //         if (e.candidate) {
// //           localPC.addIceCandidate(e.candidate);
// //         }
// //       } catch (err) {
// //         console.error(`Error adding localPC iceCandidate: ${err}`);
// //       }
// //     };
// //     remotePC.onaddstream = e => {
// //       console.log('remotePC tracking with ', e);
// //       if (e.stream && remoteStream !== e.stream) {
// //         console.log('RemotePC received the stream', e.stream);
// //         setRemoteStream(e.stream);
// //       }
// //     };

// //     // AddTrack not supported yet, so have to use old school addStream instead
// //     // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
// //     localPC.addStream(localStream);
// //     try {
// //       const offer = await localPC.createOffer();
// //       console.log('Offer from localPC, setLocalDescription');
// //       await localPC.setLocalDescription(offer);
// //       console.log('remotePC, setRemoteDescription');
// //       await remotePC.setRemoteDescription(localPC.localDescription);
// //       console.log('RemotePC, createAnswer');
// //       const answer = await remotePC.createAnswer();
// //       console.log(`Answer from remotePC: ${answer.sdp}`);
// //       console.log('remotePC, setLocalDescription');
// //       await remotePC.setLocalDescription(answer);
// //       console.log('localPC, setRemoteDescription');
// //       await localPC.setRemoteDescription(remotePC.localDescription);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //     setCachedLocalPC(localPC);
// //     setCachedRemotePC(remotePC);
// //   };

// //   const switchCamera = () => {
// //     localStream.getVideoTracks().forEach(track => track._switchCamera());
// //   };

// //   // Mutes the local's outgoing audio
// //   const toggleMute = () => {
// //     if (!remoteStream) return;
// //     localStream.getAudioTracks().forEach(track => {
// //       console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
// //       track.enabled = !track.enabled;
// //       setIsMuted(!track.enabled);
// //     });
// //   };

// //   const closeStreams = () => {
// //     if (cachedLocalPC) {
// //       cachedLocalPC.removeStream(localStream);
// //       cachedLocalPC.close();
// //     }
// //     if (cachedRemotePC) {
// //       cachedRemotePC.removeStream(remoteStream);
// //       cachedRemotePC.close();
// //     }
// //     setLocalStream();
// //     setRemoteStream();
// //     setCachedRemotePC();
// //     setCachedLocalPC();
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {!localStream && <Button title="Click to start stream" onPress={startLocalStream} />}
// //       {localStream && <Button title="Click to start call" onPress={startCall} disabled={!!remoteStream} />}

// //       {localStream && (
// //         <View style={styles.toggleButtons}>
// //           <Button title="Switch camera" onPress={switchCamera} />
// //           <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} disabled={!remoteStream} />
// //         </View>
// //       )}

// //       <View style={styles.rtcview}>
// //         {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} />}
// //       </View>
// //       <View style={styles.rtcview}>
// //         {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream.toURL()} />}
// //       </View>
// //       <Button title="Click to stop call" onPress={closeStreams} disabled={!remoteStream} />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: '#313131',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     height: '100%',
// //   },
// //   text: {
// //     fontSize: 30,
// //   },
// //   rtcview: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     height: '40%',
// //     width: '80%',
// //     backgroundColor: 'black',
// //   },
// //   rtc: {
// //     width: '80%',
// //     height: '100%',
// //   },
// //   toggleButtons: {
// //     width: '100%',
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //   },
// // });








// // import React from 'react';
// // import {
// //   SafeAreaView,
// //   StyleSheet,
// //   ScrollView,
// //   View,
// //   Text,
// //   StatusBar,
// //   TouchableOpacity,
// //   Dimensions,
// // } from 'react-native';

// // import {
// //   RTCPeerConnection,
// //   RTCIceCandidate,
// //   RTCSessionDescription,
// //   RTCView,
// //   MediaStream,
// //   MediaStreamTrack,
// //   mediaDevices,
// //   registerGlobals
// // } from 'react-native-webrtc';

// // import io from 'socket.io-client'

// // const dimensions = Dimensions.get('window')

// // class App extends React.Component {
// //   constructor(props) {
// //     super(props)

// //     this.state = {
// //       localStream: null,
// //       remoteStream: null,
// //     }

// //     this.sdp
// //     this.socket = null
// //     this.candidates = []
// //   }

// //   componentDidMount = () => {

// //     this.socket = io.connect(
// //       'https://0034254b9ff1.ngrok.io/webrtcPeer',
// //       {
// //         path: '/io/webrtc',
// //         query: {}
// //       }
// //     )

// //     this.socket.on('connection-success', success => {
// //       console.log(success)
// //     })

// //     this.socket.on('offerOrAnswer', (sdp) => {

// //       this.sdp = JSON.stringify(sdp)

// //       // set sdp as remote description
// //       this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
// //     })

// //     this.socket.on('candidate', (candidate) => {
// //       // console.log('From Peer... ', JSON.stringify(candidate))
// //       // this.candidates = [...this.candidates, candidate]
// //       this.pc.addIceCandidate(new RTCIceCandidate(candidate))
// //     })

// //     const pc_config = {
// //       "iceServers": [
// //         // {
// //         //   urls: 'stun:[STUN_IP]:[PORT]',
// //         //   'credentials': '[YOR CREDENTIALS]',
// //         //   'username': '[USERNAME]'
// //         // },
// //         {
// //           urls: 'stun:stun.l.google.com:19302'
// //         }
// //       ]
// //     }

// //     this.pc = new RTCPeerConnection(pc_config)

// //     this.pc.onicecandidate = (e) => {
// //       // send the candidates to the remote peer
// //       // see addCandidate below to be triggered on the remote peer
// //       if (e.candidate) {
// //         // console.log(JSON.stringify(e.candidate))
// //         this.sendToPeer('candidate', e.candidate)
// //       }
// //     }

// //     // triggered when there is a change in connection state
// //     this.pc.oniceconnectionstatechange = (e) => {
// //       console.log(e)
// //     }

// //     this.pc.onaddstream = (e) => {
// //       debugger
// //       // this.remoteVideoref.current.srcObject = e.streams[0]
// //       setTimeout(() => {
// //         this.setState({
// //           remoteStream: e.stream
// //         })
// //       }, 3000);
// //     }

// //     const success = (stream) => {
// //       console.log(stream.toURL())
// //       this.setState({
// //         localStream: stream
// //       })
// //       this.pc.addStream(stream)
// //     }

// //     const failure = (e) => {
// //       console.log('getUserMedia Error: ', e)
// //     }

// //     let isFront = true;
// //     mediaDevices.enumerateDevices().then(sourceInfos => {
// //       console.log(sourceInfos);
// //       let videoSourceId;
// //       for (let i = 0; i < sourceInfos.length; i++) {
// //         const sourceInfo = sourceInfos[i];
// //         if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
// //           videoSourceId = sourceInfo.deviceId;
// //         }
// //       }

// //       const constraints = {
// //         audio: true,
// //         video: {
// //           mandatory: {
// //             minWidth: 500, // Provide your own width, height and frame rate here
// //             minHeight: 300,
// //             minFrameRate: 30
// //           },
// //           facingMode: (isFront ? "user" : "environment"),
// //           optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
// //         }
// //       }

// //       mediaDevices.getUserMedia(constraints)
// //         .then(success)
// //         .catch(failure);
// //     });
// //   }
// //   sendToPeer = (messageType, payload) => {
// //     this.socket.emit(messageType, {
// //       socketID: this.socket.id,
// //       payload
// //     })
// //   }

// //   createOffer = () => {
// //     console.log('Offer')

// //     // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
// //     // initiates the creation of SDP
// //     this.pc.createOffer({ offerToReceiveVideo: 1 })
// //       .then(sdp => {
// //         // console.log(JSON.stringify(sdp))

// //         // set offer sdp as local description
// //         this.pc.setLocalDescription(sdp)

// //         this.sendToPeer('offerOrAnswer', sdp)
// //       })
// //   }

// //   createAnswer = () => {
// //     console.log('Answer')
// //     this.pc.createAnswer({ offerToReceiveVideo: 1 })
// //       .then(sdp => {
// //         // console.log(JSON.stringify(sdp))

// //         // set answer sdp as local description
// //         this.pc.setLocalDescription(sdp)

// //         this.sendToPeer('offerOrAnswer', sdp)
// //       })
// //   }

// //   setRemoteDescription = () => {
// //     // retrieve and parse the SDP copied from the remote peer
// //     const desc = JSON.parse(this.sdp)

// //     // set sdp as remote description
// //     this.pc.setRemoteDescription(new RTCSessionDescription(desc))
// //   }

// //   addCandidate = () => {
// //     // retrieve and parse the Candidate copied from the remote peer
// //     // const candidate = JSON.parse(this.textref.value)
// //     // console.log('Adding candidate:', candidate)

// //     // add the candidate to the peer connection
// //     // this.pc.addIceCandidate(new RTCIceCandidate(candidate))

// //     this.candidates.forEach(candidate => {
// //       console.log(JSON.stringify(candidate))
// //       this.pc.addIceCandidate(new RTCIceCandidate(candidate))
// //     });
// //   }


// //   render() {
// //     const {
// //       localStream,
// //       remoteStream,
// //     } = this.state

// //     const remoteVideo = remoteStream ?
// //       (
// //         <RTCView
// //           key={2}
// //           mirror={true}
// //           style={{ ...styles.rtcViewRemote }}
// //           objectFit='contain'
// //           streamURL={remoteStream && remoteStream.toURL()}
// //         />
// //       ) :
// //       (
// //         <View style={{ padding: 15, }}>
// //           <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>Waiting for Peer connection ...</Text>
// //         </View>
// //       )

// //     return (

// //       <SafeAreaView style={{ flex: 1, }}>
// //         {/* <StatusBar backgroundColor="blue" barStyle={'dark-content'} /> */}
// //         <View style={{ ...styles.buttonsContainer }}>
// //           <View style={{ flex: 1, }}>
// //             <TouchableOpacity onPress={this.createOffer}>
// //               <View style={styles.button}>
// //                 <Text style={{ ...styles.textContent, }}>Call</Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>
// //           <View style={{ flex: 1, }}>
// //             <TouchableOpacity onPress={this.createAnswer}>
// //               <View style={styles.button}>
// //                 <Text style={{ ...styles.textContent, }}>Answer</Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //         <View style={{ ...styles.videosContainer, }}>
// //           <ScrollView style={{ ...styles.scrollView }}>
// //             <View style={{
// //               flex: 1,
// //               width: '100%',
// //               backgroundColor: 'black',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}>
// //               {remoteVideo}
// //             </View>
// //           </ScrollView>
// //           <View style={{
// //             position: 'absolute',
// //             zIndex: 1,
// //             bottom: 10,
// //             right: 10,
// //             width: 100, height: 200,
// //             backgroundColor: 'black', //width: '100%', height: '100%'
// //           }}>
// //             <View style={{ flex: 1 }}>
// //               <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
// //                 <View>
// //                   <RTCView
// //                     key={1}
// //                     zOrder={0}
// //                     objectFit='cover'
// //                     style={{ ...styles.rtcView }}
// //                     streamURL={localStream && localStream.toURL()}
// //                   />
// //                 </View>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </SafeAreaView>
// //     );
// //   }
// // };

// // const styles = StyleSheet.create({
// //   buttonsContainer: {
// //     flexDirection: 'row',
// //   },
// //   button: {
// //     margin: 5,
// //     paddingVertical: 10,
// //     backgroundColor: 'lightgrey',
// //     borderRadius: 5,
// //   },
// //   textContent: {
// //     fontFamily: 'Avenir',
// //     fontSize: 20,
// //     textAlign: 'center',
// //   },
// //   videosContainer: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //   },
// //   rtcView: {
// //     width: 100, //dimensions.width,
// //     height: 200,//dimensions.height / 2,
// //     backgroundColor: 'black',
// //   },
// //   scrollView: {
// //     flex: 1,
// //     // flexDirection: 'row',
// //     backgroundColor: 'teal',
// //     padding: 15,
// //   },
// //   rtcViewRemote: {
// //     width: dimensions.width - 30,
// //     height: 200,//dimensions.height / 2,
// //     backgroundColor: 'black',
// //   }
// // });

// // export default App;














































// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   Button,
//   StatusBar,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';

// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   registerGlobals
// } from 'react-native-webrtc';

// import io from 'socket.io-client'


// class Video extends React.Component {
//   constructor(props) {
//     super(props)
//     // this.state = {}
//   }

//   // componentDidMount() {
//   //   if (this.props.videoStream) {
//   //     this.video.streamURL = this.props.videoStream
//   //   }
//   // }

//   // componentWillReceiveProps(nextProps) { 
//   //   console.log(nextProps.videoStream)

//   //   if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
//   //     this.video.streamURL = nextProps.videoStream
//   //   }
//   // }

//   render() {
//     const {
//       key,
//       zOrder,
//       objectFit,
//       style,
//       streamURL
//     } = this.props

//     const _streamURL = streamURL && streamURL.toURL()

//     return (
//       <View>
//         <RTCView
//           key={key}
//           zOrder={zOrder}
//           objectFit={objectFit}
//           style={{ ...style }}
//           streamURL={_streamURL}
//         />
//       </View>
//     )
//   }
// }

// const dimensions = Dimensions.get('window')

// class App extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       localStream: null,    // used to hold local stream object to avoid recreating the stream everytime a new offer comes
//       remoteStream: null,    // used to hold remote stream object that is displayed in the main screen

//       remoteStreams: [],    // holds all Video Streams (all remote streams)
//       peerConnections: {},  // holds all Peer Connections
//       selectedVideo: null,

//       status: 'Please wait...',

//       pc_config: {
//         "iceServers": [
//           {
//             "url" : 'stun:stun.l.google.com:19302'
//           },
//         ]
//       },

//       sdpConstraints: {
//         'mandatory': {
//             'OfferToReceiveAudio': true,
//             'OfferToReceiveVideo': true
//         }
//       },

//       messages: [],
//       sendChannels: [],
//       disconnected: false,
//       room: null,
//       connect: false,
//       camera: true,
//       mic: true,
//     }

//     // DONT FORGET TO CHANGE TO YOUR URL
//     this.serviceIP = 'https://bfc55fff0d55.ngrok.io/webrtcPeer'

//     // this.sdp
//     this.socket = null
//     // this.candidates = []
//   }

//   getLocalStream = () => {
//     const success = (stream) => {
//       console.log('localStream... ', stream.toURL())
//       this.setState({
//         localStream: stream
//       })

//       this.whoisOnline()
//     }

//     const failure = (e) => {
//       console.log('getUserMedia Error: ', e)
//     }

//     let isFront = true;
//     mediaDevices.enumerateDevices().then(sourceInfos => {
//       console.log(sourceInfos);
//       let videoSourceId;
//       for (let i = 0; i < sourceInfos.length; i++) {
//         const sourceInfo = sourceInfos[i];
//         if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
//           videoSourceId = sourceInfo.deviceId;
//         }
//       }

//       const constraints = {
//         audio: true,
//         video: {
//           mandatory: {
//             minWidth: 500, // Provide your own width, height and frame rate here
//             minHeight: 300,
//             minFrameRate: 30
//           },
//           facingMode: (isFront ? "user" : "environment"),
//           optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
//         }
//       }

//       mediaDevices.getUserMedia(constraints)
//         .then(success)
//         .catch(failure);
//     });
//   }

//   whoisOnline = () => {
//     // let all peers know I am joining
//     this.sendToPeer('onlinePeers', null, {local: this.socket.id})
//   }

//   sendToPeer = (messageType, payload, socketID) => {
//     this.socket.emit(messageType, {
//       socketID,
//       payload
//     })
//   }

//   createPeerConnection = (socketID, callback) => {

//     try {
//       let pc = new RTCPeerConnection(this.state.pc_config)

//       // add pc to peerConnections object
//       const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
//       this.setState({
//         peerConnections
//       })

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           this.sendToPeer("candidate", e.candidate, {
//             local: this.socket.id,
//             remote: socketID
//           })
//         }
//       }

//       pc.oniceconnectionstatechange = (e) => {
//         // if (pc.iceConnectionState === 'disconnected') {
//         //   const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== socketID)

//         //   this.setState({
//         //     remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
//         //   })
//         // }
//       }

//       pc.onaddstream = (e) => {
//         debugger

//         let _remoteStream = null
//         let remoteStreams = this.state.remoteStreams
//         let remoteVideo = {}

//         // if (e.stream.getTracks().length === 2) alert(e.stream.getTracks()[0].kind)

//         // let swappedStream = new MediaStream()
//         // console.log('0...', swappedStream)
//         // e.stream.getAudioTracks() && swappedStream.addTrack(e.stream.getAudioTracks()[0])
//         // console.log('1...', swappedStream)
//         // e.stream.getVideoTracks() && swappedStream.addTrack(e.stream.getVideoTracks()[0])
//         // console.log('2...', swappedStream)

//         // 1. check if stream already exists in remoteStreams
//         // const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)

//         remoteVideo = {
//           id: socketID,
//           name: socketID,
//           stream: e.stream,
//         }
//         remoteStreams = [...this.state.remoteStreams, remoteVideo]

//         // 2. if it does exist then add track
//         // if (rVideos.length) {
//         //   _remoteStream = rVideos[0].stream
//         //   _remoteStream.addTrack(e.track, _remoteStream)
//         //   remoteVideo = {
//         //     ...rVideos[0],
//         //     stream: _remoteStream,
//         //   }
//         //   remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
//         //     return _remoteVideo.id === remoteVideo.id && remoteVideo || _remoteVideo
//         //   })
//         // } else {
//         //   // 3. if not, then create new stream and add track
//         //   _remoteStream = new MediaStream()
//         //   _remoteStream.addTrack(e.track, _remoteStream)

//         //   remoteVideo = {
//         //     id: socketID,
//         //     name: socketID,
//         //     stream: _remoteStream,
//         //   }
//         //   remoteStreams = [...this.state.remoteStreams, remoteVideo]
//         // }



//         // const remoteVideo = {
//         //   id: socketID,
//         //   name: socketID,
//         //   stream: e.streams[0]
//         // }

//         this.setState(prevState => {

//           // If we already have a stream in display let it stay the same, otherwise use the latest stream
//           // const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
//           const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.stream }

//           // get currently selected video
//           let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
//           // if the video is still in the list, then do nothing, otherwise set to new video stream
//           selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }

//           return {
//             // selectedVideo: remoteVideo,
//             ...selectedVideo,
//             // remoteStream: e.streams[0],
//             ...remoteStream,
//             remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
//           }
//         })
//       }

//       pc.close = () => {
//         // alert('GONE')
//       }

//       if (this.state.localStream) {
//         pc.addStream(this.state.localStream)

//       //   // this.state.localStream.getTracks().forEach(track => {
//       //   //   pc.addTrack(track, this.state.localStream)
//       //   // })
//       }
//       // return pc
//       callback(pc)

//     } catch(e) {
//       console.log('Something went wrong! pc not created!!', e)
//       // return;
//       callback(null)
//     }
//   }

//   componentDidMount = () => { }

//   joinRoom = () => {

//     this.setState({
//       connect: true,
//     })

//     const room = this.state.room || ''

//     this.socket = io.connect(
//       this.serviceIP,
//       {
//         path: '/io/webrtc',
//         query: {
//           room: `/${room}`, //'/',
//         }
//       }
//     )

//     this.socket.on('connection-success', data => {

//       this.getLocalStream()

//       console.log(data.success)
//       const status = data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : this.state.status

//       this.setState({
//         status,
//         messages: data.messages
//       })
//     })

//     this.socket.on('joined-peers', data => {

//       this.setState({
//         status: data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : 'Waiting for other peers to connect'
//       })
//     })

//     this.socket.on('peer-disconnected', data => {
//       console.log('peer-disconnected', data)

//       const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)

//       this.setState(prevState => {
//         // check if disconnected peer is the selected video and if there still connected peers, then select the first
//         const selectedVideo = prevState.selectedVideo.id === data.socketID && remoteStreams.length ? { selectedVideo: remoteStreams[0] } : null

//         return {
//           // remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
//           remoteStreams,
//           ...selectedVideo,
//           status: data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : 'Waiting for other peers to connect'
//         }
//         }
//       )
//     })

//     this.socket.on('online-peer', socketID => {
//       debugger
//       console.log('connected peers ...', socketID)

//       // create and send offer to the peer (data.socketID)
//       // 1. Create new pc
//       this.createPeerConnection(socketID, pc => {
//         // 2. Create Offer
//         if (pc) {
      
//           // Send Channel
//           const handleSendChannelStatusChange = (event) => {
//             console.log('send channel status: ' + this.state.sendChannels[0].readyState)
//           }

//           const sendChannel = pc.createDataChannel('sendChannel')
//           sendChannel.onopen = handleSendChannelStatusChange
//           sendChannel.onclose = handleSendChannelStatusChange
        
//           this.setState(prevState => {
//             return {
//               sendChannels: [...prevState.sendChannels, sendChannel]
//             }
//           })

//           // Receive Channels
//           const handleReceiveMessage = (event) => {
//             const message = JSON.parse(event.data)
//             console.log(message)
//             this.setState(prevState => {
//               return {
//                 messages: [...prevState.messages, message]
//               }
//             })
//           }

//           const handleReceiveChannelStatusChange = (event) => {
//             if (this.receiveChannel) {
//               console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
//             }
//           }

//           const receiveChannelCallback = (event) => {
//             const receiveChannel = event.channel
//             receiveChannel.onmessage = handleReceiveMessage
//             receiveChannel.onopen = handleReceiveChannelStatusChange
//             receiveChannel.onclose = handleReceiveChannelStatusChange
//           }

//           pc.ondatachannel = receiveChannelCallback


//           pc.createOffer(this.state.sdpConstraints)
//             .then(sdp => {
//               pc.setLocalDescription(sdp)

//               this.sendToPeer('offer', sdp, {
//                 local: this.socket.id,
//                 remote: socketID
//               })
//             })
//         }
//       })
//     })

//     this.socket.on('offer', data => {
//       this.createPeerConnection(data.socketID, pc => {
//         pc.addStream(this.state.localStream)

//         // Send Channel
//         const handleSendChannelStatusChange = (event) => {
//           console.log('send channel status: ' + this.state.sendChannels[0].readyState)
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
//           console.log(message)
//           this.setState(prevState => {
//             return {
//               messages: [...prevState.messages, message]
//             }
//           })
//         }

//         const handleReceiveChannelStatusChange = (event) => {
//           if (this.receiveChannel) {
//             console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
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
//         pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
//           // 2. Create Answer
//           pc.createAnswer(this.state.sdpConstraints)
//             .then(sdp => {
//               pc.setLocalDescription(sdp)

//               this.sendToPeer('answer', sdp, {
//                 local: this.socket.id,
//                 remote: data.socketID
//               })
//             })
//         })
//       })
//     })

//     this.socket.on('answer', data => {
//       // get remote's peerConnection
//       const pc = this.state.peerConnections[data.socketID]
//       // console.log(data.sdp)
//       pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{})
//     })

//     this.socket.on('candidate', (data) => {
//       // get remote's peerConnection
//       const pc = this.state.peerConnections[data.socketID]

//       if (pc)
//         pc.addIceCandidate(new RTCIceCandidate(data.candidate))
//     })
//   }

//   switchVideo = (_video) => {
//     debugger
//     // alert(_video)
//     this.setState({
//       selectedVideo: _video
//     })
//   }

//   stopTracks = (stream) => {
//     stream.getTracks().forEach(track => track.stop())
//   }

//   render() {
//     const {
//       localStream,
//       remoteStreams,
//       peerConnections,
//       room,
//       connect,
//     } = this.state

//     // debugger
//     const remoteVideos = remoteStreams.map(rStream => {
//       return (
//         <TouchableOpacity onPress={() => this.switchVideo(rStream)}>
//           <View
//             style={{
//             flex: 1,
//             width: '100%',
//             backgroundColor: 'black',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: 2,
//           }}>
//             <Video
//               key={2}
//               mirror={true}
//               style={{ ...styles.rtcViewRemote }}
//               objectFit='contain'
//               streamURL={rStream.stream}
//               type='remote'
//             />
//           </View>
//         </TouchableOpacity>
//       )
//     })

//     const remoteVideo = this.state.selectedVideo ?
//       (
//         <Video
//           key={2}
//           mirror={true}
//           style={{ width: dimensions.width, height: dimensions.height / 2, }}
//           objectFit='cover'
//           streamURL={this.state.selectedVideo && this.state.selectedVideo.stream}
//           type='remote'
//         />
//       ) :
//       (
//         <View style={{ padding: 15, }}>
//           <Text style={{ fontSize:22, textAlign: 'center', color: 'white' }}>Waiting for Peer connection ...</Text>
//         </View>
//       )

//     if (!connect) 
//       return (
//         <SafeAreaView style={{ flex: 1, }}>
//           <StatusBar backgroundColor="blue" barStyle={'dark-content'}/>
//           <View style={{
//             ...styles.buttonsContainer,
//             // backgroundColor: 'teal',
//             paddingHorizontal: 15
//           }}>
//             <TextInput
//               // editable
//               maxLength={10}
//               slectionColor={'green'}
//               placeholderTextColor = "lightgrey"
//               placeholder='e.g. room1'
//               style={{
//                 width: 200,
//                 color: 'black',
//                 fontSize: 18,
//                 backgroundColor: 'white',
//                 borderColor: '#000000',
//                 borderWidth: 1,
//                 paddingHorizontal: 10,
//               }}
//               value={room}
//               onChangeText={text => this.setState({room: text})}
//             />
//             <Button
//               onPress={this.joinRoom}
//               title="Join Room"
//               color="black"
//             />
//           </View>
//         </SafeAreaView>
//       )

//       const videoActionButtons = (
//         <View style={{
//           ...styles.buttonsContainer,
//           justifyContent: 'center', alignItems: 'center',
//           paddingHorizontal: 15
//         }}>
//           <Button
//             onPress={() => {
//               debugger
//               const videoTrack = localStream.getTracks().filter(track => track.kind === 'video')
//               videoTrack[0].enabled = !videoTrack[0].enabled
//               this.setState({
//                 camera: videoTrack[0].enabled
//               })
//             }}
//             title={`camera ${ this.state.camera && '(on)' || '(off)'}`}
//             color={`${ this.state.camera && 'black' || 'red'}`}
//           />
//           <Button
//             onPress={() => {
//               debugger
//               const audioTrack = localStream.getTracks().filter(track => track.kind === 'audio')
//               audioTrack[0].enabled = !audioTrack[0].enabled
//               this.setState({
//                 mic: audioTrack[0].enabled
//               })
//             }}
//             title={`mic ${ this.state.mic && '(on)' || '(off)'}`}
//             color={`${ this.state.mic && 'black' || 'red'}`}
//           />
//           <Button
//             onPress={() => {
//               // disconnect socket
//               this.socket.close()

//               // localStream.stop()
//               this.stopTracks(localStream)

//               // stop all remote audio & video tracks
//               remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

//               // stop all remote peerconnections
//               peerConnections && Object.values(peerConnections).forEach(pc => pc.close())

//               this.setState({
//                 connect: false,
//                 peerConnections: {},
//                 remoteStreams: [],
//                 localStream: null,
//                 remoteStream: null,
//                 selectedVideo: null,
//               })
//             }}
//             title='X DISCONNECT'
//             color='red'
//           />
//         </View>
//       )

//     return (

//       <SafeAreaView style={{ flex: 1, }}>
//         <StatusBar backgroundColor="blue" barStyle={'dark-content'}/>

//         { videoActionButtons }


//         <View style={{ ...styles.videosContainer, }}>
//           <View style={{
//             position: 'absolute',
//             zIndex: 1,
//             top: 10,
//             right: 10,
//             width: 100,
//             // height: 150,
//             backgroundColor: 'black', //width: '100%', height: '100%'
//           }}>
//               <View style={{flex: 1 }}>
//                 <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
//                   <View>
//                     <Video
//                       key={1}
//                       zOrder={0}
//                       objectFit='cover'
//                       style={{ ...styles.rtcView }}
//                       streamURL={localStream}
//                       type='local'
//                     />
//                   </View>
//                 </TouchableOpacity>
//               </View>
//           </View>
//           {/* <ScrollView horizontal={true} style={{ 
//             flex: 1,
//             backgroundColor: 'black',
//             padding: 15,
//            }}> */}
//             <View
//               onPress={() => alert('hello')}
//               style={{
//                 flex: 1,
//                 width: '100%',
//                 backgroundColor: 'black',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               { remoteVideo }
//             </View>
//           {/* </ScrollView> */}
//           <ScrollView horizontal={true} style={{ ...styles.scrollView }}>
//             { remoteVideos }
//           </ScrollView>
//           </View>
//         </SafeAreaView>
//       );
//   }
// };

// const styles = StyleSheet.create({
//   buttonsContainer: {
//     flexDirection: 'row',
//     backgroundColor: "white" 
//   },
//   button: {
//     margin: 5,
//     paddingVertical: 10,
//     backgroundColor: 'lightgrey',
//     borderRadius: 5,
//   },
//   textContent: {
//     fontFamily: 'Avenir',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   videosContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   rtcView: {
//     width: 100, //dimensions.width,
//     height: 150,//dimensions.height / 2,
//     backgroundColor: 'black',
//     borderRadius: 5,
//   },
//   scrollView: {
//     // flex: 1,
//     // // flexDirection: 'row',
//     // backgroundColor: 'black',
//     // padding: 15,
//     position: 'absolute',
//     zIndex: 0,
//     bottom: 10,
//     right: 0,
//     left: 0,
//     // width: 100, height: 200,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//   },
//   rtcViewRemote: {
//     width: 110, //dimensions.width,
//     height: 110, //dimensions.height / 2,
//     // backgroundColor: 'black',
//     borderRadius: 5,
//   }
// });

// export default App;



























import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Index from './src';
import 'react-native-get-random-values';

const App = () => {
  console.log('Loading App.js');
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;




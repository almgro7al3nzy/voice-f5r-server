const { EnxDialer } = require('./dialer');
let user_data = {'name':'Ravi', 'rooms':'6024df4615081f57abba00a3,6024df4615081f57abba00a4,6024df4615081f57abba00a5', 'phone':'12028528186', 'type':'user'};
var dialer = new EnxDialer('http://127.0.0.1:8444/', user_data);
/*let connectParams = {
	host:'https://localhost:8444',
	transport : "websocket",
	reconnect : true,
  secure : true,
	rejectUnauthorized :false
}
*/
dialer.init();
dialer.login(user_data);
//dialer.handleVoiceEvents();
dialer.connectCall({"from":"12028528186", "to":"918088394833", "room":"6024df4615081f57abba00a3"}, (response) => {
    console.log("Received response " + JSON.stringify(response));
    if(response.result === 0 && response.state === 'initiated') dialer.cancelCall(response.voice_id);
});

dialer.socket.on("callstateevent", function (data) {
	console.log("Received : " + JSON.stringify(data));
  console.log("["+data.voice_id+"]"+ " State: " + dialer.state);
	if(data.state === 'incomingcall') {
           dialer.acceptCall(data.voice_id , (response) => {
            console.log("Accept Call Successfull");
           });
        	 if(dialer.state === 'online') {
            console.log("Dispatching incoming call notification to the app");
            dialer.emit('incomingcall', data);
           } else {
            //To-Do: To handle call waiting later
            console.log("Already in a call, call waiting is not supported as of now.");
            dialer.rejectCall(data.voice_id);
           }
   } else 	if(data.state === 'connected' ) {
             dialer.state = 'connected';
             console.log("Dispatching connected notification to the app");
             dialer.emit('connected', data);
   } else if(data.state === 'initiated') {
             console.log("Dispatching initiated event notification to the app");
             dialer.emit('initiated', data);
   } else if(data.state === 'disconnected') {
             dialer.state = 'online';
             console.log("Dispatching disconnected event notification to the app");
             dialer.emit('disconnected', data);
   } else if(data.state === 'room_connected') {
             dialer.state = 'room_connected';
             console.log("Dispatching room connected notification to the app");
             dialer.emit('room_connected', data);
						 //setTimeout(dialer.holdCall,5000,data.voice_id);
   } else if(data.state === 'hold_success') {
	 					dialer.state = 'Mute' 
						console.log("Dispatching Hold notification to the app")
            dialer.emit('Mute', data);
						//setTimeout(dialer.resumeCall,5000,data.voice_id);
	 } else if(data.state === 'resume_success') {
            dialer.state = 'UnMute'
            console.log("Dispatching Resume notification to the app")
            dialer.emit('UnMute', data);
	 } else {
	           console.log("Invalid state received on the call state events");
             dialer.disconnectCall(data.voice_id);
   }
});

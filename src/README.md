# socket.io-chat
Socket.io chat Voice Image File - Nginx , Node.JS , Express , Redis With Front.End sample
## Introduction
Code is performed by Socket.io to event listener and emiting messages in server-side and front-end languages . <br/>
It used JWT to confirm connections status and validating token and intention was as middleware worker NOT AS AN ENGINE . <br/>
Wish use as Engine ? Use Adaptor in Socket.io and set your validators in VALIDATE_TOKEN.js as well set your own configurations in nginx and signature.js . <br/>
which work as middleware to confirm users connections . <br/>
Also it used for sending image ... and buffer messages which controls by REDIS . <br/>
Main Stream is controlled by Pure MySql on DATABASE.JS . <br/>
Middleware functions are defined on SIGNATURE.js . <br/>

### Perform test on Index2.html 

## Initiate 

``` bash
cd /chat && npm install && npm start 
```
or run as pm2 
``` bash
pm2 start socket.js && pm2 start app.js
```

## Double-check on logs for exceeded emitting .

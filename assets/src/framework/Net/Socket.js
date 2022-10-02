cc.Class({
	name : "socket",
	static :{

	},
	ctor (){
		//地址
		this._address = arguments[0];
		let arr = this._address.split(':');
		this._ip = arr[0];
		this._port = arr[1];
		// url
		this._url = 'ws://' + this._ip + ':' +this._port;

		this._waitTime = 5000;

		this._socket = null;


        this._createSocket();
        this._addHeart();
	},
	//初始化回调函数
    _initEventHandle: function () {
        //关闭
        this._socket.onclose = this._onClose.bind(this);
        //错误
        this._socket.onerror = this._onError.bind(this);
        //连接建立成功
        this._socket.onopen = this._onOpen.bind(this);
        //收到信息
        this._socket.onmessage = this._onMessage.bind(this);
    },
	//代理模式
    _onClose: function () {
        console.log(`[socket]${this._socketName}[closed]`);
        SocketClass.removeSocket(this._socketName)
        // TODO 此时可以发送网络关闭消息
    },
    _onError: function () {
        if (this._forbidReconnect) return;
        cc.log(`[socket]${this._socketName}[error]`);
        //延时一会再执行以解决当关闭游戏时，走到这里会崩溃的问题。(关闭时访问cc.director直接崩)
        SocketClass.pushActToTimerStack(cc.js.getClassName(this), 0.1, () => {
            dispatchNodeEvent("showNetReconnect");
            this._reconnect();
        });
    },
    _onOpen: function () {
        console.log(`[socket]${this._socketName}[Connected]`);
        this._isOpenSuccess = true;
        this._waitTime = 0;
        dispatchNodeEvent("hideNetTips");
        //心跳检测重置
        this._resetHeart();
    },
    _onMessage: function (event) {
        var ret = JSON.parse(crypto.decodeBase64(data));
        dispatchNodeEvent("hideNetTips");
        //如果获取到消息，心跳检测重置
        //拿到任何消息都说明当前连接是正常的
        // let ary = JSON.parse(crypto.decodeBase64(data));
        // let cmd = XMQ.net.proto.getCmdString(ary.Protocol,ary.Protocol2);
        // this._showRecvLog(cmd,ary);
        // if(cmd === null)return;
        // this.dispatchNetEvent(cmd, ary);
    },
	//发送数据
    _send: function (data) {
        if (!this._socket) {
            return;
        }
        if (cc.sys.isNative) {
            this._tcpSend(data);
        } else {
            this._wssSend(JSON.stringify(data));
        }
    },
    //wss connect
    _wssConnect: function () {
        //h5 小游戏使用websocket
        this._socket = new WebSocket(this._url);
        // this._socket.binaryType = "arraybuffer";
        this._initEventHandle();
    },
    //wss send
    _wssSend: function (data) {
        //h5 小游戏使用websocket
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
            this._socket.send(data);
        }
    },
    //tcp connect
    _tcpConnect: function () {
        //本地平台使用bsdsocket
        this._socket = new TCP();
        this._initEventHandle();
        this._socket.connect(this._ip, this._port,'aeskey');
    },
    //tcp send
    _tcpSend: function (protoId, data, isCrypt, isZip) {
        //本地平台使用bsdsocket
        if (this._socket && this._socket.state === TCP.OPEN) {
            this._socket.send({
                cmd: parseInt(protoId),
                data: data,
                isCrypt: isCrypt,
                isZip: isZip,
            });
        }
    }

});
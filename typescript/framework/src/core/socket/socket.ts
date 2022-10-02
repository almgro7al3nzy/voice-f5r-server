/*
* 网络连接
* 只负责网络连接、关闭和数据接收。数据打包和解析放到SocketListener模块处理
*/
import { Util } from '../../tools/utils';
import { EventSocket } from '../../events';

const MAX_DATA_SIZE:number = 50 * 1024;     // 单包最大数据
export default class Socket{
    private _webSocket:WebSocket;
    private _isOpen:boolean;
    private _serverHander:(eventName:string,data:any)=>void;
    private _timeout:number;
    private _lastUrl:string;
    private _timeoutID:any;
    private _isBinary:boolean;

    constructor(isBin:boolean,hander:(eventName:string,data:any)=>void){
        this._serverHander = hander;
        this._isOpen = false;
        this._isBinary = isBin;
    };

    public isConnected():boolean {
        if (this._isOpen && this._webSocket && this._webSocket.readyState === WebSocket.OPEN)
            return true;

        return false;
    };

    //是否正在连接
    public isConnecting():boolean {
        if (!this._isOpen && this._webSocket && this._webSocket.readyState == WebSocket.CONNECTING)
            return true;

        return false;
    };

    //获取最后一次连接的URL
    public getLastConnectUrl():string {
        return this._lastUrl;
    };

    public connect(url:string, timeout:number):boolean {
        if (url === null || url.length === 0) {
            cc.log('Connect is faile. url is null');
            return false;
        }

        //首先尝试关闭之前的连接
        this.close();

        try {
            this._timeout = timeout;
            cc.log('WebSocket connect', url);
            this._webSocket = new WebSocket(url);
            this._isBinary && (this._webSocket.binaryType = 'arraybuffer');
            this._lastUrl = url;
            this._socketEvent();
            this._stopTimeout();
            this._timeoutID = setTimeout(function(){
                cc.log('WebSocket connect timeout');
                this._closeWebSocket();
            }.bind(this), timeout);
            return true;
        } catch (error) {
            cc.error(error);
            return false;
        }
    };

    public close():void {
        this._stopTimeout();
        this._closeWebSocket();
    };

    public send(data:any):boolean {
        if (this.isConnected() && !Util.isInvalid(data)) {
            this._webSocket.send(data);
            return true;
        }
        return false;
    };

    private _stopTimeout():void {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    };

    private _event(event:string, data?:any):void {
        this._serverHander && this._serverHander(event, data);
    };

    private _socketEvent():void {
        this._webSocket.onopen = function(evt:MessageEvent){
            this._isOpen = true;
            this._stopTimeout();
            this._event(EventSocket.SOCKET_CONNECTED,null);
        }.bind(this);

        this._webSocket.onmessage = function(evt:MessageEvent) {
            this._event(EventSocket.SOCKET_RECEIVE, evt.data);
        }.bind(this);

        this._webSocket.onclose = function(evt:MessageEvent) {
            this._isOpen = false;
            this._stopTimeout();
            if (!Util.isInvalid(this._webSocket)) {
                let socket = this._webSocket;
                this._webSocket = null;
            }
            this._event(EventSocket.SOCKET_CLOSE,null);
        }.bind(this);

        this._webSocket.onerror = function(evt:MessageEvent) {
            cc.log('socket error:' + evt)
            this._event(EventSocket.SOCKET_ERROR);
        }.bind(this);
    };

    private _closeWebSocket():void{
        if (!Util.isInvalid(this._webSocket)) {
            let socket = this._webSocket;
            this._webSocket = null;
            let _onclose = socket.onclose;
            let _onNull=()=>void{};
            socket.onmessage = _onNull;
            socket.onclose = _onNull;
            socket.onerror = _onNull;
            socket.onopen = _onNull;
            socket.close();
            this.close();
        }
    };
};

import SocketListener from "./socket/socketListener";
import { Util } from "../tools/utils";
import { EventCustom } from "./eventCustom";
import { EventMessage, EventSocket } from "../events";
import { Timer } from "../tools/timer";
import { Protocol, protocolKeyById, protocolIdByKey } from "./socket/protocol";

/**
 * 
 */
const TimeKey={
    TIME_CONNECT:'time_socket_connect',
    TIME_SEND_HEART_BEAT:'time_send_heartbeat',
};

export default class LogicBase{
    protected _socketListener:SocketListener = null;
    protected _openID:string = '';
    protected _token:string = '';
    private _listenerName:string = '';
    private _isActive:boolean = false;
    private _gateway:any = null;
    private _heartBeat:any = null;
    private _viewTimeHander:any = null;
    private _countdown:any = {};
    private _IDS:any = {};
    private _step = [];
    private _isPlayGame:boolean = false;        // 是否在游戏中，主要解决短线重连的问题
    private _isReconnecting:boolean = false;    // 是否是重连状态

    constructor(logicName:string){
        this._socketListener = new SocketListener(logicName); // 默认绑定一个通用的网络处理，即大厅等
        this._initEvent();
    };

    public set token(val:string){
        this._token = val;
    };

    public get Token():string{
        return this._token;
    };

    public get OpenId():string{
        return this._openID;
    }

    public set active(val:boolean){
        this._isActive = val;
    };

    public get isActive():boolean{
        return this._isActive;
    };

    public set playGame(val:boolean){
        this._isPlayGame = val;
        if (this._isPlayGame){
            this._heartBeat = {
                time            : 10, //心跳间隔时间 单位秒
                timeoutCount    : 2 , //超时次数
                reconnectCount  : 600 , //重连次数（无网络情况下是0.5秒一次，5分钟）
                reloginCount    : 7, //重新登录超时次数
                reloginTimeout  : 30,  //重新登录单次超时时间
                longTimeout     : 60, //长时间连接不上提示 时间
            };
        }else{
            this._heartBeat = {
                time            : 5, //心跳间隔时间 单位秒
                timeoutCount    : 2 , //超时次数
                reconnectCount  : 600 , //重连次数（无网络情况下是0.5秒一次，5分钟）
                reloginCount    : 10, //重新登录超时次数
                reloginTimeout  : 20,  //重新登录单次超时时间
                longTimeout     : 60, //长时间连接不上提示 时间
            };
        }

        Util.mergeObject(this._countdown,this._heartBeat);
    };

    public get isPlayGame():boolean{
        return this._isPlayGame;
    };

    public setGateway(gatewayInfo:any,isConnect:boolean=false):void{
        this._gateway = gatewayInfo;
        if (isConnect){
            this._socketClose();
            this._socketListener.connect(gatewayInfo.url);
        }
    };

    public bindSocketListener(socket:SocketListener):Object{
        if (Util.isInvalid(socket)){
            cc.warn('[%s] bind is failed.',this._listenerName);
            return null;
        }

        socket.addLogic(this);
        this._socketListener = socket;
    };

    public removeSocketListener():void{
        if (this._socketListener !== null)
            this._socketListener.removeLogic(this);
    };

    public destroy():void{
        this._stopAllTimer();
    };

    private _initEvent():void{
        let self = this;
        EventCustom.on(EventMessage.SEND_MSG_TO_SVR,(protol:string,data:any)=>{
            if (!self._isActive || Util.isInvalid(self._socketListener) || !self._socketListener.isConnected()) return ;
            self._sendData(protol,data);
        });

        EventCustom.on(EventMessage.RECEIVE_MSG_BY_SVR,(data:any)=>{
            let _key = protocolIdByKey(data.Protocol2);
            //let _tmpData = Util.deepCpy(data);
            //delete _tmpData['Protocol'];
            //delete _tmpData['Protocol2'];
            // 心跳
            if (data.Protocol === Protocol.Gateway_cmd.HeartBeat){
                EventCustom.emit(EventSocket.SOCKET_HEART_BEAT,data);
            } else if (data.Protocol === Protocol.Gateway_cmd.Relink){
                //  数据格式错误
                if (data.Protocol2 === 1){
                    let _err = '['+ data.ErrCode +'] ' +data.ErrMsg;
                    cc.error(_err);
                    EventCustom.emit(EventMessage.SHOW_SIMPLE_TIPS_MSG,_err);
                }
                /**短线重连 */
            } else if (data.Protocol === Protocol.Gateway_cmd.Main){
                if (self._isActive){
                    let _str = '[recSvrMsg]'+ Util.printObject(data);
                    cc.log(_str);
                    EventCustom.emit(_key,data);
                }
            } else if (data.Protocol === Protocol.Gateway_cmd.Logout){

            }
        });

        EventCustom.on(EventMessage.CONNECT_EVENT,(event:string,data:any)=>{
            if (!self._isActive) return ;

            if (event === EventSocket.SOCKET_HEART_BEAT){
                if (self._isPlayGame && !isNaN(data) && data === 0) {
                    //关闭心跳，意味着关闭断线重连
                    self._stopAllTimer();
                    self._reset();
                }
            }else if (event === EventSocket.SOCKET_CLOSE){
                self._socketClose();
            }else if (event === EventSocket.SOCKET_CONNECTED){
                !self._isPlayGame && this._next();
            }else if (event === EventSocket.SOCKET_ERROR){
                // 连接错误
            }else if (event === EventSocket.SOCKET_ENTER_ROOM){
                if (data === true && self._heartBeat.time > 0) {
                    this._socketListener.setHeartbeatTime(self._heartBeat.time);
                    this._readySendHeartbeat();
                }
            }
        });
    };

    private _reset():void{
        if (this._isPlayGame){
            this._countdown = Util.mergeObject({},this._heartBeat);
        }else {
            this._countdown = {};
            Util.mergeObject(this._countdown,this._heartBeat);
            this._step = [];
        }

        this._isReconnecting = false;
    };

    private _socketClose():void{
        this._socketListener.setConnectLevel(0);
        this._stopAllTimer();
        this._socketListener.isNeedReconnect && this._startTimer(TimeKey.TIME_CONNECT, this._reconnect.bind(this),0.5);
    };

    private _onHeartbeatTimeout():void{
        if (--this._countdown.timeoutCount <= 0)
            this._socketListener.closeByHeartbeatTimeout();
        else
            this._sendHeartbeat();
    };

    private _reconnect():void{
        if (this._socketListener.isNeedReconnect() && --this._countdown.reconnectCount >= 0){
            this._connectTipsView(true);
            this._isReconnecting = true;
            if (this._isPlayGame){
                this._startTimer(TimeKey.TIME_CONNECT, this._onStepTimeout.bind(this), this._heartBeat.reloginTimeout);
                this._socketListener.setConnectLevel(2);
                //this.Table.reconnectRoom(this._onReconnectResult.bind(this));
            }else{
                this._calcReconnectLongTime();    
                this._step.length > 0 && this._step.splice(0,this._step.length);
                this._step.push(this._onLogin.bind(this));
                this._step.push(this._onReconnectFinish.bind(this));
                this._startTimer(TimeKey.TIME_CONNECT, this._onStepTimeout.bind(this), this._heartBeat.reloginTimeout);
                this._socketListener.cleanSendQueue();
                this._socketListener.setConnectLevel(1);
                this._socketListener.connect();
            }
        }else
            this._onReconectTimeout();
    };

    private _calcReconnectLongTime():void{
        if (this._countdown.longTimeout > 0 ){
            let curTime = new Date().getTime();
            if (this._countdown.lastDisconnectTime ){
                let diffTime = curTime - this._countdown.lastDisconnectTime;
                this._countdown.longTimeout -= diffTime / 1000;
                this._countdown.longTimeout <= 0 && this._onReconnectLongTimeout();
            }
            this._countdown.lastDisconnectTime = curTime;
        }
    };

    private _onReconnectLongTimeout():void{
        cc.sys.isBrowser && window.onerror("reconnectLongTimeout", "LogicBase", 120);
    };

    private _onStepTimeout():void{
        if (--this._countdown.reloginCount > 0 )
            this._socketListener.closeByHeartbeatTimeout();// 执行服务器登录请求超时，直接断开连接，重走重连逻辑
        else
            this._onReconectTimeout();//登录超时次数用完
    };

    private _onReconectTimeout():void{
        cc.log('LogicBase reconnect failed.');
        this._socketListener.close();
        this._reset();
        this._connectTipsView(true,true,'common.MsgBoxPanel_Disconnect');
    };

    private _onLogin():void{
        this._socketListener.cleanSendQueue();
        let _data = {};
        if (this._isPlayGame){
            // 进入房间操作
        } else {
            
        }
        this._sendData('C2GWS_PlayerLogin',_data);
    };

    private _onReconnectFinish():void{
        if (this.isPlayGame && this._heartBeat.time > 0){
            this._socketListener.setHeartbeatTime(this._heartBeat.time);
            this._readySendHeartbeat();
        }

        this._stopTimer(TimeKey.TIME_CONNECT);
        this._connectTipsView(false);
        this._reset();
    };

    private _sendHeartbeat():void{
        // 发送心跳包

        this._startTimer(TimeKey.TIME_SEND_HEART_BEAT, this._onHeartbeatTimeout.bind(this), this._heartBeat.time);
    };

    private _readySendHeartbeat():void{
        this._startTimer(TimeKey.TIME_SEND_HEART_BEAT, this._sendHeartbeat.bind(this), this._heartBeat.time);
    };

    private _next():void{
        if( this._step.length > 0 ){
            let f = this._step.shift();
            f && f.apply(this,arguments);
        }
    };

    private _startTimer(name:string , callback:()=>void , time:number):void{
        this._stopTimer(name);
        this._IDS[name] = Timer.start(name,callback, time);
    };

    private _stopTimer(name:string):void{
        if (this._IDS[name]){
            Timer.stop(this._IDS[name]);
            delete this._IDS[name];
        }
    };

    private _stopAllTimer():void{
        for (let name in this._IDS) {
            let id = this._IDS[name];
            Timer.stop(id);
        };
        this._IDS = {};
    };

    private _connectTipsView(isShow:boolean,isMustShow?:boolean,msg?:string):void{
        if (isShow){
            if (isMustShow){

            }
        }else{
            if (!Util.isInvalid(this._viewTimeHander)){
                Timer.stop(this._viewTimeHander);
                this._viewTimeHander = undefined;
            }
        }
    };

    private _onReconnectResult(result:number):void{
        if (!this._isReconnecting) return;
        this._isReconnecting = false;

        if (result == 0) {
            this._onReconnectFinish();
            return;
        }
        // 失败处理
    };

    private _sendData(protolName:string, data:any):void{
        let _subCmd:number = protocolKeyById(protolName) || -1;
        if (isNaN(_subCmd) || _subCmd < 0){
            cc.error(protolName+' is a non-existent protocol.');
            return ;
        }
        data = data || {};
        data.Protocol = Protocol.Gateway_cmd.Main;
        data.Protocol2 = _subCmd;
        data.sign = 0;
        data.OpenID = this._openID;
        data.Token = this._token;
        data.Timestamp= Timer.getLocalTime(false);
        let _result = this._socketListener.sendData(data);
        let _str = 'send msg '+(_result?'success.':'failure.');
        _str += protolName+'='+Util.printObject(data);
        cc.log(_str);
    };
};
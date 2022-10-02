import NetConnect from "./connect";
import { Util } from "../../tools/utils";
import DES from "../thirdlibs/des";
import { EventCustom } from "../eventCustom";
import { EventMessage, EventSocket } from "../../events";

/**
 * 网络监听
 * 服务器连接，收发服务器状态信息和监听服务器状态
 * 负责前端发送数据前打包和接收到后端数据解析
 */

const BINARY:boolean = false;
export default class SocketListener{
    private _netConnect:NetConnect = null;                 // 网络链接层
    private _sendList:Array<any> = new Array<any>();       // 发送队列
    private _recvList:Array<any> = new Array<any>();       // 接收队列
    private _noLogList:Array<string|number> = new Array<any>(); // 记录不打印日志的消息名或消息ID
    private _logicMap:Object = {};                         // 逻辑对象（class LogicBase）映射表
    private _name:string = '';                             // 监听者名字
    private _intervalTime:number=0;                        // 心跳频率
    private _url:string = '';                              // 连接地址
    private _isPauseDispatcher:boolean=false;              // 是否暂停调度
    private _instanceId:string='';                         // 开启引擎帧刷新ID

    constructor(svrName:string){
        this._name = svrName;

        let self = this;
        this._netConnect = new NetConnect(function(eventName:string,data?:any){
            eventName = 'socket_' + eventName;
            if (eventName === EventSocket.SOCKET_RECEIVE){
                if (typeof data === 'string')
                    self._recvList.push({data});
                else {
                    for (let i in data)
                        self._recvList.push(data[i]);
                }

                if (self._recvList.length > 0 && !self._isPauseDispatcher) {
                    let count = self._datasParser();
                    if (count > 0) self._recvList.splice(0, count);
                }
                return ;
            }

            EventCustom.emit(EventMessage.CONNECT_EVENT,eventName, data);
        }.bind(this));
    };

    public setIp(ip:string,port:number):SocketListener{
        let _url = this._createUrlByIp(ip,port);
        if (!Util.isEmptyStr(_url))
            this._url = _url;

        return this;
    };

    public setUrl(url:string):SocketListener{
        this._url = !Util.isEmptyStr(url) && url;
        return this;
    };

    public isSameIP(ip:string,port:number):boolean{
        return !Util.isEmptyStr(this._url) && this._createUrlByIp(ip, port) === this._url;
    };

    public getUrl():string{
        return this._url;
    };

    public getName():string{
        return this._name;
    };

    /**
     * 
     * @param uid : string
     * @param lv : ConnectLevel
     * @param type : DefenseType
     * @param key : encode key
     */
    public setNetConfig(uid:string,lv:number=0,type:number=3,key:string=''):void{
        this._netConnect.setUID(uid);
        this._netConnect.setLevel(lv);
        this._netConnect.setConnectLevel(lv);
        this._netConnect.setConfig({
            dns: '',
            ddns:[''],
            types: [type],
            retry: [10],
            clv: lv >= 0, //开启连接等级
            encodeKey:key //加密设置
        });
    };

    public connect(url?:string):boolean{
        url = Util.isEmptyStr(url) ? this._url : url;
        //备份最后一次连接
        this._url = url;
        if (!Util.isEmptyStr(this._url)) {
            this.closeByHeartbeatTimeout();
            return this._netConnect.connect(this._url);
        }
        return false;
    };

    public close():void {
        this.setHeartbeatTime(0);
        this._netConnect.close();
    };

    public sendData(data:any,isLoop:boolean=true):boolean{
        if (Util.isInvalid(isLoop))
            isLoop = true;

        let sendSucceed = this._netConnect.send(this._encodeData(data));
        if (!sendSucceed && isLoop)
            this._sendList.push(data);
        if (sendSucceed && isLoop === false)
            cc.log("[%s] send package.", this._name);

        return sendSucceed;
    }

    //注册逻辑处理
    public addLogic(logic:Object):void{
        if (!Util.isInvalid(logic)){
            let _name = logic.constructor['name'];
            this._logicMap[_name] = logic;
        }
    };

    public removeLogic(logic:string|Object):void{
        if (typeof logic === 'string') {
            delete this._logicMap[logic];
        } else if (typeof logic === 'object') {
            for (let key in this._logicMap) {
                let item = this._logicMap[key];
                if (logic === item) {
                    delete this._logicMap[key];
                    break;
                }
            }
        }
    };

    //心跳开启情况
    public setHeartbeatTime(time:number):void{
        if (time !== this._intervalTime)
            EventCustom.emit(EventSocket.SOCKET_HEART_BEAT,time);
        this._intervalTime = time;
    };

    public closeByHeartbeatTimeout(){
        this._netConnect.close();
    };

    //暂停分发数据
    public pause():void{
        this._isPauseDispatcher = true;
        cc.log('Server %s pause', this.getName());
    };

    //恢复数据分发
    public resume():void{
        this._isPauseDispatcher = false;
        cc.log('Server %s resume.', this.getName());
    };

    //设置连接等级 0,1,2
    public setConnectLevel(clevel:number):void{
        this._netConnect.setConnectLevel(clevel);
    };

    //设置不打印的消息id
    public setDisableMsgLog(key:Array<string|number>):void{
        this._noLogList = key;
    };

    public isHeartbeatEnabled():boolean {
        return this._intervalTime > 0;
    };

    //是否需要重连
    public isNeedReconnect():boolean{
        return !this.isConnected() && this.isHeartbeatEnabled();
    };

    //是否已连接
    public isConnected():boolean{
        return this._netConnect.isConnected()
    };

    public startUpdate():void{
        this._instanceId = 'socketlistener' + Math.floor(Math.random() * 1000000);
        //cc.Scheduler.
        //cc.director.getScheduler().scheduleUpdate(this, 1, false);
    };

    public update(dt) {
        // 发送队列
        if (this._sendList.length > 0){
            let isSendSucceed = true;

            for (let i = 0; i < this._sendList.length; i++) {
                let data = this._sendList[i];
                let ret = this.sendData(data, false);
                if (ret === false) {
                    isSendSucceed = false;
                    i > 0 && this._sendList.splice(0, i);
                    break;
                }
            }

            isSendSucceed && this.cleanSendQueue();
        }

        // 接收队列
        if (this._recvList.length > 0 && !this._isPauseDispatcher) {
            let count = this._datasParser();
            if (count > 0) this._recvList.splice(0, count);
        }
    };

    public cleanSendQueue() {
        if (this._sendList.length > 0) {
            this._sendList.splice(0, this._sendList.length);
        }
    };

    private _datasParser():number{
        var count = 0;
        for (let i in this._recvList) {
            let _data = this._recvList[i];
            try {
                let _pack:any = null;
                if (BINARY){

                } else {
                    _pack = JSON.parse(DES.decodeBase64(_data.data));
                }
                if (typeof _pack === 'object'){
                    EventCustom.emit(EventMessage.RECEIVE_MSG_BY_SVR,_pack);
                }
            } catch (e) {
                cc.error(e);
            }

            count++;
            if (this._isPauseDispatcher) {
                break;
            }
        }
        return count;
    };

    private _createUrlByIp(ip:string,port:number):string{
        if (Util.isEmptyStr(ip) || isNaN(port))
            return '';
        return 'ws://'+ip+':'+port+'/ws';
    }

    // 编码
    private _encodeData(data:any):any{
        if (BINARY){
            // 二进制编码
        } else {
            // 字符串编码
            data = JSON.stringify(data);
        }
        return data;
    };

    // 解码
    private _decodeData(data:any):any{
        let _data:any = null;
        let _eventKey:string = '';
        if (BINARY){
            // 二进制解码
        } else {
            // 字符串解码
        }
        // 广播消息
    };

    //是否可以打印log
    private _isLog(key:string|number){
        if (!Util.isInvalid(this._noLogList))
           return !cc.js.array.contains(this._noLogList,key);

        return true;
    };
};
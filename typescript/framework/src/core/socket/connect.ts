
/**
 * 网络连接类型，socket层和socket listener的中间层。进行防护（链接）相关操作
*/

import Socket from './socket';
import { Util } from '../../tools/utils';
import { HttpClient, Http } from './http';
import { EventSocket } from '../../events';
import DES from '../thirdlibs/des';

// 防护配置
interface DefenseData{
    dns: string,
    ddns:Object;
    types: Array<any>,
    retry: Array<any>,
    clv: boolean, //开启连接等级
    encodeKey: string // 加密密钥
};

// 连接安全系数
enum ConnectLevel{
    unknow=-1,
    normal,         // 普通
    high,           // 高
    veryHigh        // 极高
};

// 防护类型
enum DefenseType{
    dns     = 1,     // DNS解析，走高防
    aliYun  = 2,     // 阿里游戏盾防御
    auto    = 3,     // 自动识别 DNS / aliYun
};

const BINARY:boolean = false;
let ENCODE_KEY:string = '';
const TIME_OUT:number = 4500;
// 直接连接
class SocketDefense {
    protected cfg:any = {defense:0};
    protected maxReconnectCount:number=0;
    protected reconnectCount:number=0;
    protected socket:Socket = null;
    protected cbSucceed:(obj:SocketDefense)=>void = null;
    protected cbFailed:(obj:SocketDefense)=>void = null;
    protected svrUrl:string='';

    constructor(cfg:any){
        this.cfg = cfg||{defense:0};
    }

    public connect(url:string, succeed:(obj:SocketDefense)=>void, failed:(obj:SocketDefense)=>void):void{
        this.close();
        this.cbSucceed = succeed;
        this.cbFailed = failed;
        this.svrUrl = url;
        Util.isInvalid(this.socket) ? this._startConnect(url) : this.socket.connect(url,TIME_OUT);
    };

    public setMaxReconnectCount(val:number):void{
        this.maxReconnectCount = val<0 ?0:val;
    };

    public close() {
        cc.log('SocketDefense close.');
        if (this.socket) {
            let ss = this.socket;
            this.socket = null;
            ss.close();
        }
    };

    public send(data:any) {
        if (Util.isInvalid(this.socket))
            return false;

        return this.socket.send(data);
    };

    public onOpen(){
        if (this.socket) {
            this.cfg.svrUrls = this.cfg.svrUrls || {};
            this.cfg.svrUrls[this.svrUrl] = this.socket.getLastConnectUrl();
        }

        this.reconnectCount = 0;
        cc.log('Socket conenct succeed.', this.cfg.defense);
        if (this.cbSucceed) {
            let _cb = this.cbSucceed;
            this.cbSucceed = null;
            _cb(this);
        }
    };

    public onClose(){
        if (this.cfg.svrUrls && this.svrUrl)
            delete this.cfg.svrUrls[this.svrUrl];
        if (this._tryConnect()) {
            cc.log('Socket reconenct : ', this.reconnectCount);
            this.socket.connect(this.svrUrl,TIME_OUT);
            return;
        }

        cc.log('Socket conenct failed.', this.cfg.defense);
        this.socket = null;
        if (this.cbFailed) {
            let cb = this.cbFailed;
            this.cbFailed = null;
            setTimeout(cb.bind(this, this), 0);
        }
    };

    public onMessage(event:string, data:any):void{/**覆盖使用 */};

    protected _startConnect(url:string):boolean {
        this.socket = new Socket(BINARY,function(event:string, data:any){
            switch (event) {
                case EventSocket.SOCKET_RECEIVE: this.onMessage(data);break;
                case EventSocket.SOCKET_CONNECTED:this.onOpen();break;
                case EventSocket.SOCKET_CLOSE: this.onClose();break;
            }
        }.bind(this));

        if (Util.startWith(url,'ws://')) {
            return this.socket.connect(url,TIME_OUT);
        } else {
            let wsurl = 'ws://' + (Util.getDomainPort(url) || url) + '/ws';
            return this.socket.connect(wsurl,TIME_OUT);
        }
        return false;
    };

    private _tryConnect():boolean{
        if (this.socket && this.reconnectCount++ < this.maxReconnectCount)
            return true;

        return false;
    };
};

 // dns防御连接
class SocketDNS extends SocketDefense{
    private _http:HttpClient = null;
    protected _isAllow206:boolean = true;
    constructor(cfg:any){
        super(cfg);
    }
    public close() {
        cc.log('DefenseDNS close');
        if (!Util.isInvalid(this._http)) {
            this._http.close();
            this._http = null;
        }

        if (this.socket) {
            if (!(this.socket.isConnected() || this.socket.isConnecting())) {
                this.socket.close();
                this.socket = null;
                this.onClose();
            } else {
                let socket = this.socket;
                this.socket = null;
                socket.close();
            }
        }
    };

    public connect(url:string, succeed:(obj:SocketDefense)=>void, failed:(obj:SocketDefense)=>void) {
        if (this.cfg.svrUrls && this.cfg.svrUrls[url] && this._startConnect(this.cfg.svrUrls[url])) {
            cc.log('cfg has ', this.cfg.svrUrls[url]);
        } else if (this.cfg.level == null && this.cfg.dns) {
            this._getDefaultUrl(this.cfg.dns, url);
        } else if (this.cfg.subdns) {
            this._getNewUrl(this.cfg.subdns, url);
        } else if (this.cfg.dns) {
            let key = 'dns' + String(this.cfg.defense);
            cc.log('sub_dns:', this.cfg.dns, key);

            this._http = Http.Post(this.cfg.dns, this._postKey(key), function (errorcode:number, data:any) {
                this.http = null;
                data = DES.decodeBase64(data);
                if (errorcode == 200 && data) {
                    if (data.startsWith('http'))
                        this.cfg.subdns = data;
                    else
                        this.cfg.subdns = 'http://' + (Util.getDomainPort(data) || data) + '/dns?i=2';
                    this._connect(url);
                } else this._onClose();
            }.bind(this), 3000);
        }

        super.connect(url,succeed,failed);
    };

    private _getNewUrl(dnsurl, url) {
        let keyList = [];
        if (this.cfg.clevel !== 0)
            keyList.push('clv' + String(this.cfg.clevel) + '/' + url);

        keyList.push(String(this.cfg.level) + '/' + url);
        let self = this;

        let _post = (keyList, callback, timeout)=>{
            let key = keyList.shift();
            cc.log('GetNewurl:', dnsurl, key);
            self._http = Http.Post(dnsurl, self._postKey(key), function(errorcode, data) {
                if (errorcode == 206 && keyList.length > 0)
                    _post(keyList, callback, timeout);
                else
                    callback(errorcode, DES.decodeBase64(data));
            }.bind(this), timeout);
        };

        _post(keyList, function (errorcode, data) {
            this.http = null;
            if (errorcode == 200 && data && this._startConnect(data)) {
                cc.log('Found url in dns:', data);
            } else if (errorcode == 206 && this.allow206 && this._startConnect(url)) {
                cc.log('Not found in dns:', url);
            } else {
                this.onclose();
            }
        }.bind(this), 2000 + this.reconnectCount * 1000);
    };

    private _getDefaultUrl(dnsurl, url) {
        let key = 'default/' + this.cfg.defense + '/' + url;
        cc.log('GetDefaulturl:', dnsurl, key);
        this._http = Http.Post(dnsurl, this._postKey(key), function (errorcode, data) {
            this.http = null;
            data = DES.encodeBase64(data);
            if (errorcode == 200 && data && this._startConnect(data)) {
                cc.log('Found url in dns:', data);
            } else if (errorcode == 206 && this.allow206 && this._startConnect(url)) {
                cc.log('Not found in dns:', url);
            } else {
                this.onclose();
            }
        }.bind(this), 3000);
    };

    protected _startConnect(url:string):boolean {
        /*if (this.socket === null) {
            cc.log('this.socket is null'); //应该是http没关闭，逻辑太复杂，先暂时这样规避
            return false;
        }*/

        return super._startConnect(url);
    };

    private _postKey(urlStr:string) {
        return Util.isEmptyStr(ENCODE_KEY) ? {url: urlStr}:{'url': DES.encodeBase64(urlStr), cLevel: 1};
    };
 }

 // 阿里盾防御
class SocketAliYun extends SocketDNS{
    private _userGroup:string;
    constructor(cfg:any){
        super(cfg);
        this.maxReconnectCount = 2;
        this._isAllow206 = false;
    };

    protected _startConnect(url:string) {
        if (Util.startWith('ws://','')) {//URL直连
            return this.socket.connect(url,TIME_OUT);
        } else { //游戏分组，查找分组IP
            let result = url.split(':');
            let UserGroup = result[0];
            let ip = null;
            try {
                //ip = require('DeviceManager').utils.getStatusString('alidunIP_' + UserGroup + (UserID ? ',' + String(UserID) : ''));
            } catch (error) {
                cc.error(error);
                //错误之后不能重试了
                this.maxReconnectCount = 0;
                return false;
            }

            if (!cc.sys.isNative && ip === '') ip = result[0]; 

            let port = result[1];
            this._userGroup = url;
            if (ip && port && this.socket.connect('ws://' + ip + ':' + String(port) + '/ws',TIME_OUT)) {
                return true;
            }
            cc.log('Alidun connect failed. ', url, ip, port);
            return false;
        }

        return super._startConnect(url);
    };

    public connect(url:string, succeed:(obj:SocketDefense)=>void, failed:(obj:SocketDefense)=>void) {
        //已经拿到过url时，直连
        if (this.cfg.svrUrls && this.cfg.svrUrls[url] && this._startConnect(this.cfg.svrUrls[url])) {
            cc.log('Config has ip ', this.cfg.svrUrls[url]);
            return;
        } else if (!Util.isEmptyStr(this._userGroup) && this._startConnect(this._userGroup)) {
            cc.log('Config has UserGroup ', this.cfg.UserGroup);
            return;
        }
        super.connect(url,succeed,failed);
    };

    public onClose() {
        this._userGroup = '';
        super.onClose.call(this);
    };
};

 // 自动识别
class SocketAuto extends SocketDNS{
    private _dnsType:number = DefenseType.auto; // enum DefenseType

    protected _startConnect(url:string) {
        if (!Util.isEmptyStr(url)){
            if (this._dnsType === -1){
                if (url.search('aliyungf.com') >=0){
                    this._dnsType = 2; // DefenseType.ali
                    //Util.deepCpy(this,SocketAliYun);
                }else{
                    this._dnsType = 1; // DefenseType.dns
                    //Util.deepCpy(this,SocketDNS);
                }
            }
        }
        return super._startConnect(url);
    };
};

class SocketSkip extends SocketDefense{
    public connect(url:string, succeed:(obj:SocketDefense)=>void, failed:(obj:SocketDefense)=>void):void {
        cc.log('Skip defense: ', this.cfg.defense);
        setTimeout(failed, 0);
    };
};

//----------------------------------------------------------------------
export default class NetConnect{
    private _userLevelList:Array<number>=new Array<number>();
    private _isConnect:boolean=false;
    private _uid:string = '';
    private _connectLv:ConnectLevel = ConnectLevel.normal;
    private _defenseLv:ConnectLevel = ConnectLevel.unknow;
    private _defenseCfg:DefenseData={dns:'',types:[],retry:[],ddns:{},clv:false,encodeKey:''};
    private _socket:SocketDefense=null;
    private _lastConnectUrl:string='';
    private _listenerHand:(event:string,data?:any)=>void = null;

    constructor(listener:(event:string,data?:any)=>void){
        this._listenerHand = listener;
        if (Util.isEmptyStr(this._uid)){
            let _cdk = cc.sys.localStorage.getItem('CDK');
            if (!Util.isEmptyStr(_cdk))
                this._userLevelList = JSON.parse(_cdk);
            let _uid = cc.sys.localStorage.getItem('UID');
            if (!Util.isEmptyStr(_uid))
                this._uid = _uid;
        }
    };

    setLevel(level:ConnectLevel) {
        for (let ulevel = level; ulevel != 0 ; ){
            let l = ulevel % 100;
            this._userLevelList.push(l);
            ulevel = Math.floor(ulevel / 100);
        }

        cc.sys.localStorage.setItem('CDK', JSON.stringify(this._userLevelList));

        //动态兼容防御层级
        if (Util.isInvalid(this._defenseCfg.types)) this._defenseCfg.types = [];
        if (Util.isInvalid(this._defenseCfg.retry)) this._defenseCfg.retry = [];

        if ( this._defenseCfg.types.length < this._userLevelList.length ){
            let count = this._userLevelList.length - this._defenseCfg.types.length;
            for( let i = 0 ; i < count; i++ ){
                this._defenseCfg.types.push(3);
                if (Util.isInvalid(this._defenseCfg.retry[i]))
                    this._defenseCfg.retry[i] = 1;
            }
        }

    };

    setUID(uid:string) {
        this._uid = uid;
        cc.sys.localStorage.setItem("UID", uid);
    };

    setConfig(cfg:DefenseData) {
        if (!Util.isInvalid(cfg) && cfg instanceof Object){
            this._defenseCfg = cfg;
            ENCODE_KEY = this._defenseCfg.encodeKey;
        }
    };

    public isConnected() {
        return this._isConnect;
    };

    public setConnectLevel(level:ConnectLevel) {
        if (typeof level === 'number') {
            level = Math.min(level, ConnectLevel.veryHigh);
            level = Math.max(level, ConnectLevel.normal);
            this._connectLv = level;
        }
    };

    public close() {
        if (this._socket) {
            let ss = this._socket;
            this._socket = null;
            ss.close();
        }
    };

    public connect(url:string) {
        if (this._defenseLv < ConnectLevel.normal) 
            this._defenseLv = this._connectLv;

        this.close();
        if (this._startConnect(url))
            return true;
        setTimeout(this._onclose.bind(this), 0);
        return false;
    };

    public send(data:any) {
        if (!Util.isInvalid(this._socket))
            return this._socket.send(data);
        return false;
    };

    private _startConnect(url?:string):boolean{
        if (Util.isEmptyStr(url)) url = this._lastConnectUrl;
        if (Util.isEmptyStr(url)) return false;

        if (url.search('w')) this._lastConnectUrl = url;
        let _socket:SocketDefense = null;

        if (this._defenseCfg && Util.isValid(this._defenseCfg.dns) && this._defenseCfg.types && this._defenseCfg.types.length > 0) {
            if (this._defenseLv >= this._defenseCfg.types.length) this._defenseLv = ConnectLevel.normal;

            this._defenseCfg.ddns = this._defenseCfg.ddns || [];
            this._defenseCfg.ddns[this._defenseLv] = this._defenseCfg.ddns[this._defenseLv] || {
                dns: this._defenseCfg.dns,
                subdns: null,
                defense: this._defenseLv + 1,
                level : this._userLevelList[this._defenseLv]
            }

            let cfg = this._defenseCfg.ddns[this._defenseLv];

            //是否可以使用连接等级
            if (this._defenseCfg.clv) {
                //每次设置连接等级
                cfg.clevel = this._connectLv;
                //非默认等级清理缓存
                if (cfg.clevel != ConnectLevel.normal && cfg.svrUrls) {
                    delete cfg.svrUrls[url];
                }
            } else {
                cfg.clevel = ConnectLevel.normal;
            }

            switch (this._defenseCfg.types[this._defenseLv]) {
                case DefenseType.dns: _socket = new SocketDNS(cfg);break;
                case DefenseType.aliYun:_socket = new SocketAliYun(cfg);break;
                case DefenseType.auto:_socket = new SocketAuto(cfg);break;
                default:_socket = new SocketDefense(cfg);break;
            }

            let retryCount:number = this._defenseCfg.retry && this._defenseCfg.retry[this._defenseLv];
            if (retryCount != null) _socket.setMaxReconnectCount(Number(retryCount));
            if (!Util.isInvalid(_socket)) {
                _socket.connect(url, this._onSucceed.bind(this), this._onFailed.bind(this));
                this._socket = _socket;
                return true;
            }
        }/* else
            _socket = new SocketDefense(this._defenseCfg);*/

        return false;
    };    

    private _onopen() {
        this._isConnect = true;
        this._listenerHand && this._listenerHand('connected');
    };

    private _onmessage(data?:any) {
        this._listenerHand && this._listenerHand('receive', data);
    };

    private _onclose() {
        this._isConnect = false;
        this._socket = null;
        this._listenerHand && this._listenerHand('close');
    };

    private _onFailed(socket:SocketDefense) {
        if (this._socket) {
            if (this._defenseLv < this._defenseCfg.types.length - 1) {
                this._defenseLv++;
                if (this._startConnect())
                    return;
            } else {
                this._defenseLv = ConnectLevel.normal;
            }
        }
        this._onclose();
    };

    private _onSucceed(socket:SocketDefense) {
        socket.onMessage = this._onmessage.bind(this);
        socket.onClose = this._onclose.bind(this);
        this._onopen();
    };
};
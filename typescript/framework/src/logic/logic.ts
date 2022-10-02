import { EventCustom } from "../core/eventCustom";
import { EventMessage } from "../events";
import { Util } from "../tools/utils";
import LogicBase from "../core/logicBase";
import { Launcher } from "../tools/launcher";
interface PersonalInfo{
    name:string;
    constellation:string;
    head:string;
    school:string;
    uid:string;
    level:number;
    sex:number;
    vip:number;
    Mcards:number;                  // M卡
    coins:number;
    diamonds:number;

};

// 比赛信息
interface MatchInfo{

};

// 背包信息
interface BackpackInfo{

};

// 邮件信息
interface MailInfo{

};

// 登陆信息
interface ServerInfo{
    maxPlayers:number;
    onlinePlayers:number;
    svrID:number;
    svrAdd:string;
    svrName:string;
    svrState:string;
    token:string;
};

class CLogic extends LogicBase{
    private static _instance:CLogic = null;
    private _launcherData:any = null;
    private _svrInfo:ServerInfo = null;         // 服务器信息
    private _userInfo:PersonalInfo = null;      // 用户信息
    private _matchInfo:MatchInfo = null;        // 比赛信息
    private _backpackInfo:BackpackInfo = null;  // 背包信息
    private _mailInfo:MailInfo = null;          // 邮件信息
    private _isHasMail:boolean = false;         // 是否有新邮件
    private _gameList:Array<any> = new Array<any>();    // 游戏列表
    private _bannerList:Array<any> = new Array<any>();  // 广告列表信息
    private _rollingMsg:Array<any> = new Array<any>();  // 滚动消息（跑马灯）
    private _matchsList:Array<any> = new Array<any>();  // 大奖赛信息列表

    constructor(){
        super('UserLogic');
        this._launcherData = Launcher.getLauncherData();
        this._userInfo = null;
        this._backpackInfo = null;
        this._matchInfo = null;
        this._mailInfo = null;
        this._init();
    };

    private _init():void{
        let self = this;
        EventCustom.on(EventMessage.UPDATE_USER_INFO,(data:PersonalInfo)=>{
            if (Util.isInvalid(self._userInfo) || self._userInfo.name === data.name)
                self._userInfo = data;
        });

        EventCustom.on('S2GWS_PlayerLogin', (data:any)=>{
            self._openID = data.OpenID;
            self._userInfo = data.Personal;
            self._isHasMail = data.IsNewEmail;
            let _getMap = function(obj:Object):any{
                let _result = [];
                if (Util.isValid(obj)){
                    for (let k in obj){
                        if (typeof obj[k] === 'object')
                            _result.push(obj[k]);
                    }
                }
                return _result;
            };
            // 滚动消息
            self._rollingMsg = _getMap(data.DefaultMsg);
            // 大奖赛列表信息
            self._matchsList = _getMap(data.RacePlayerNum);
            // 小游戏游戏列表信息
            let _nums = data.GamePlayerNum;
            if (Util.isValid(self._gameList) && Util.isValid(_nums)){
                self._gameList.forEach((it:any,index:number)=>{
                    let _num = _nums[it.GameID];
                    if (!isNaN(_num))
                        it['Number'] = _num;

                    if (index+1 === self._gameList.length){
                        self._gameList.sort((a:any,b:any)=>{
                            return b.Index-a.Index;
                        });
                    }
                });
            }
        });
    };

    public static getInstance():CLogic{
        if (CLogic._instance === null)
            CLogic._instance = new CLogic();

        return CLogic._instance;
    };

    public setProperty(id:number,data:any){
        switch (id){
            case 0:{ // 网关信息
                this._svrInfo = {
                    maxPlayers:data.MaxPlayerNum || 0,
                    onlinePlayers:data.OLPlayerNum || 0,
                    svrAdd:data.ServerIPAndPort || -1,
                    svrID:data.ServerID || -1,
                    svrName:data.ServerName||'',
                    svrState:data.State||'',
                    token:data.Tocken||''
                };
                this._connectSvr();
            }
            break ;
            case 1:{    // 用户信息
                data = data || this._launcherData;
                this._userInfo = {
                    name:data.nickName,
                    constellation:data.constellation,
                    head:data.headUrl,
                    school:data.school,
                    uid:data.uid,
                    level:0,
                    sex:data.sex,
                    vip:0,
                    Mcards:0,                  // M卡
                    coins:0,
                    diamonds:0
                };

                Util.isEmptyStr(this._openID) && (this._openID = this._userInfo.uid);
            }
            break ;
            case 2:{    // 游戏列表
                for (let k in data)
                    this._gameList.push(Util.obj2Json(data[k]));
                /*this._gameList.push({
                    GameID:10001,
                    Name:'斗兽棋|AnimalChecker',
                    IconPath:'gamesIcons/doushouqi01',
                    IsShelves:1,
                    StartTime:Util.getTimerByStr('2018-12-14 14:16:38'),
                    EndTime:Util.getTimerByStr('3018-12-14 14:16:39'),
                    IsNewest:1,
                    IsHot:1,
                    ResPath:'games/AnimalChecker/'
                });
                this._gameList.push({
                    GameID:10002,
                    Name:'扫雷|Mine',
                    IconPath:'gamesIcons/saolei01',
                    IsShelves:0,
                    StartTime:Util.getTimerByStr('2018-12-14 14:16:38'),
                    EndTime:Util.getTimerByStr('3018-12-15 14:16:39'),
                    IsNewest:0,
                    IsHot:0,
                    ResPath:'http://test.babaliuliu.com:8891/game/Maine.zip'
                });*/
            }
            break ;
            case 3:{    // 广告信息
                for (let k in data)
                    this._bannerList.push(data[k]);
            }
            break;
        }
    };

    // 服务器信息
    public get serverInfo():ServerInfo{
        return this._svrInfo;
    };

    // 用户个人信息
    public get userInfo():PersonalInfo{
        return this._userInfo;
    }

    // 比赛信息
    public get matchInfo():any{
        return this._matchInfo;
    };

    // 背包信息
    public get backpackInfo():any{
        return this._backpackInfo;
    };

    // 邮件信息
    public get mailInfo():MailInfo{
        return this._mailInfo;
    };

    // 广告信息
    public get bannerInfo():Array<any>{
        return this._bannerList;
    };

    // 游戏列表
    public get gameList():Array<any>{
        return this._gameList;
    };

    // 是否有新邮件
    public get isHasMail():boolean{
        return this._isHasMail;
    };

    private _connectSvr():void{
        let _svr = this._svrInfo;
        let _user = this._launcherData;
        if (Util.isValid(_svr) && Util.isValid(_user) && _svr.maxPlayers > _svr.onlinePlayers){
            this.setGateway(_svr);
            this.active = true;
            this.playGame = false;
            this._socketListener.setNetConfig(_user.uid);
            this._socketListener.connect('ws://'+_svr.svrAdd+'/GolangLtd') && this._socketListener.startUpdate();     // 开启网络帧监听（默认心跳包处理）
            cc.log('ws://'+_svr.svrAdd+'/GolangLtd');
        } else {
            // 提示人满，不做网络连接
        }
    };
};

export const Logic:CLogic = CLogic.getInstance();
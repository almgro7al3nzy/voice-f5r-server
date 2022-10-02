import { Util, Environment } from "./utils";
import DES from "../core/thirdlibs/des";

/**
 * 
 */
interface LauncherData{
    data:any;
    timeout:number;
};
const LOCAL_KEY = 'launcherData';
const userData = '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';
class CLauncher{
    private static _instance:CLauncher = null;
    public static getInstance():CLauncher{
        if (CLauncher._instance === null)
            CLauncher._instance = new CLauncher();

        return CLauncher._instance;
    };

    private _launcherData:LauncherData = null;
    constructor(){
        this.checkUpdate();
        this._launcherData = this.getLauncherData();
    }

    public checkUpdate() {
        if (Environment.ENV_WEGAME) {
        }
    };

    //从游戏中返回大厅
    public enterHall() {
        this.beforeEnterGame(0);

        setTimeout(function () {
            cc.game.restart();
        }.bind(this), 100);
    };

    //进入游戏
    public enterGame(gameid:string|number) {
        this.beforeEnterGame(gameid);

        setTimeout(function () {
            cc.game.restart();
        }.bind(this), 100);
    };

    public beforeEnterGame(gameid:string|number) {
        if (!Util.isInvalid(gameid)) {
            let game = {
                "gameid": gameid,
                "timeout": new Date().getTime() + 5000,
            }
            cc.sys.localStorage.setItem('StartGame', JSON.stringify(game));
        } else
            cc.sys.localStorage.removeItem('StartGame');

        this.saveLauncherData();
    };

    //指定gameid的游戏存放目录
    public fullPathGame(gameid:string|number) {
        if (cc.sys.isBrowser)
            return 'games/'+gameid+'/';

        return ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "games/" + gameid + '/');
    };

    //增加启动参数
    //用于传递游戏数据，用于restart后下一个游戏读取的数据
    public addLauncherData(key:string, val:any) {
        this._launcherData = this._launcherData || {data:null,timeout:0};
        this._launcherData[key] = val;
    };

    //是否有启动参数
    public isLauncherData() {
        return this._launcherData !== null;
    };

    //读取启动参数
    //不与当前 addLauncherData配对，读取的是restart前的游戏数据
    public readLauncherData(key:string, clean:boolean) {
        let ret = null;
        if (!Util.isInvalid(this._launcherData) && !Util.isEmptyStr(key)) {
            ret = this._launcherData[key];
            clean && delete this._launcherData[key];
        }
        return ret;
    };

    // timeoutSecond 单位秒，即多少秒后数据失效
    saveLauncherData(timeoutSecond:number=5000):void{
        if (cc.sys.isNative && !Util.isInvalid(this._launcherData)){
            let launcherData = {
                data: this._launcherData,
                timeout: new Date().getTime() + ((timeoutSecond && timeoutSecond * 1000) || 5000),
            }
            cc.sys.localStorage.setItem(LOCAL_KEY, DES.encodeCBC(JSON.stringify(launcherData)));
        }
    };

    public setLauncherData(data:any):void{

    };

    public getLauncherData():any{
        // 创建一个假用户
        let _createFakeUser = function():any{
            let _nickNames = ['球球不是胖子','大冬瓜','小米渣','老洋芋','范童童','汪斌','王锴','小仙女','小手冰凉'];
            let _names = [''];
            let _stars = ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'];
            let _schools = ['成都理工大学','四川大学','乐山师范学院','内江师范学院','成都电子科技大学','四川师范大学'];
            let _uid = ''+Math.floor((Math.random()*100000)+999999);
            return {
                uid: _uid,
                token: ''+((new Date()).getTime()+_uid),
                nickName: _nickNames[Math.floor(Math.random()*(_nickNames.length-1))],
                headUrl: 'http://xmqvip1-1253933147.file.myqcloud.com/ugc/images/2018/04/16/152387637868832h.jpg',
                constellation: _stars[Math.floor(Math.random()*11)],
                school: _schools[Math.floor(Math.random()*5)],
                sex: Math.floor(Math.random()+1)
            };
        };

        let _data = null;
        if (cc.sys.isNative){
            _data = DES.decodeCBC(cc.sys.localStorage.getItem(LOCAL_KEY));
            if (Util.isValid(_data)) {
                cc.sys.localStorage.removeItem(LOCAL_KEY);
                try {
                    _data = JSON.parse(_data);
                    if (Util.isValid(_data) && (new Date().getTime() < _data.timeout)){
                        this._launcherData = _data.data;
                        return _data.data;
                    }
                } catch (error) {
                    cc.error(error);
                }
            }
        } else {
            // 获取url附带的变量值，即=后面的部分
            let _str = window.location.search;
            _data = Util.isEmptyStr(_str) ? _createFakeUser():DES.decodeCBC(_str);
            this._launcherData = _data;
        }
        return _data;
    };
};

export const Launcher:CLauncher = CLauncher.getInstance();
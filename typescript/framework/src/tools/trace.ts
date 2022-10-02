import { Util } from "./utils";
import { ResMgr } from "../core/resourcesMgr";
const LOG_LENGTH:number = 200;

class Trace{
    private _logList:Array<string> = new Array<string>();
    private static _instance:Trace = null;
    public static getInstance():Trace{
        if (Trace._instance === null)
        Trace._instance = new Trace();

        return Trace._instance;
    };

    public log(msg: string|any, ...subst: any[]):void{
        let _msg:string = Util.format(msg,subst);
        if (_msg.length < 0)
            return ;

        _msg = this._getTimeString() + _msg;
        ResMgr.getCfg('isTrace') && console.log(_msg);
        this._recordLog(_msg);
    };

    public warn(msg: string|any, ...subst: any[]): void{
        let _msg:string = Util.format(msg,subst);
        if (_msg.length < 0)
            return ;

        _msg = this._getTimeString() + _msg;
        ResMgr.getCfg('isTrace') && console.warn(_msg);
        this._recordLog(_msg);
    };

    public error(msg: string|any, ...subst: any[]): void{
        let _msg:string = Util.format(msg,subst);
        if (_msg.length < 0)
            return ;

        _msg = this._getTimeString() + _msg;

        ResMgr.getCfg('isTrace') && console.error(_msg);
        this._recordLog(_msg);
    };

    public getAll():string{
        let _msg = "";
         for(let i in this._logList)
             _msg = _msg + this._logList[i] + "\n";

         return _msg;
    };

    private _recordLog(msg:string):void{
        this._logList.length > LOG_LENGTH && this._logList.shift();
        !Util.isEmptyStr(msg) && this._logList.push(msg);
    };

    private _getTimeString():string{
        let date = new Date();
        return "[" + Util.prefix(date.getHours(),'0',2)
                + ":" + Util.prefix(date.getMinutes(),'0',2)
                + ":" + Util.prefix(date.getSeconds(),'0',2)
                + ":"  + Util.prefix(date.getMilliseconds(),'0',3) + "]";
    };
};

cc.log = (msg: string|any, ...subst: any[])=>{Trace.getInstance().log(msg,subst);};
cc.warn = (msg: string|any, ...subst: any[])=>{Trace.getInstance().warn(msg,subst);};
cc.error = (msg: string|any, ...subst: any[])=>{Trace.getInstance().error(msg,subst);};
//export function getAllTrace():string{return Trace.getInstance().getAll();}
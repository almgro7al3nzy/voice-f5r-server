import { Util } from "./utils";
import { ResMgr } from "../core/resourcesMgr";

/**
 * 
 */

 export default class Language{
     private _language:any = null;

     public static init():void{
         if (Util.isInvalid(Language.prototype._language))
            Language.prototype._language = ResMgr.getRes('framework/language');
     };

     public static getString(key:string,...args:any[]):string{
        let _cfg:any = Language.prototype._language;
        let _getStr = ()=>{
            let _str = _cfg ? _cfg[key]:'';
            if (!Util.isEmptyStr(_str)){
                _str = Util.format(_str,args) || null;
                if (Util.isInvalid(_str))
                    cc.error('language.json=>The key[%s] is empty.',key);
            }
            return _str;
        };
        return _getStr();
     };

     public static setLable(lbl:cc.Label,key:string,...args:any[]):void{
         if (Util.isValid(lbl) && lbl instanceof cc.Label)
             lbl.string = Language.getString(key,args);
     };
 }
import { Util } from "./utils";

interface Property{
    sound:boolean;
    music:boolean;
    curMusicClib:cc.AudioClip;
    musicName: string;
    curMusic:number;
    files:any[];
};

class CAudio{
    private _prop:Property = {sound:true,music:true,curMusic:-1,curMusicClib:null,musicName:'',files:[]};
    private static _instance:CAudio = null;
    public static getInstance():CAudio{
        if (Util.isInvalid(CAudio._instance))
            CAudio._instance = new CAudio();

        return CAudio._instance;
    };

    public playAudio(name:string,isEffect:boolean=true):void{
        let self = this;
        if (self._prop.music === false || self._prop.sound === false)
            return ;

        let _load = (key:string,cb:(data:any)=>void)=>{
            if (Util.isInvalid(self._prop.files[key])){
                cc.loader.loadRes(key,cc.AudioClip,(err:Error,_clip:cc.AudioClip)=>{
                    if (Util.isInvalid(err)){
                        self._prop.files[key] = {
                            id : -1,
                            clib:_clip
                        };
                        cb && cb(self._prop.files[key]);
                    }
                }); 
            } else cb && cb(self._prop.files[key]);
        };

        if (isEffect){
            if (self._prop.sound){
                _load(name,(data:any)=>{
                    self._prop.files[name].id = cc.audioEngine.playEffect(data.clib,false);
                });
            }
        }else{ 
            if (self._prop.music && name !== self._prop.musicName){
                _load(name, (data: any) => {
                    self._prop.curMusic != -1 && cc.audioEngine.stop(self._prop.curMusic);
                    self._prop.curMusic = self._prop.files[name].id = cc.audioEngine.playMusic(data.clib, true);
                    self._prop.musicName = name;
                });
            }
        }
    };
    public change(isPlay:boolean,isEffect:boolean):void{
        if (isEffect) this._prop.sound = isPlay; else this._prop.music = isPlay;
        if (!isPlay)
            !isEffect && cc.audioEngine.pauseMusic();
        else {
            !isEffect && cc.audioEngine.resumeMusic();
            if (!isEffect && !cc.audioEngine.isMusicPlaying()) this.playAudio(this._prop.musicName,false);
        }
    };
    public isTurnOn(isEffect:boolean):boolean{
        return (isEffect?this._prop.sound:this._prop.music);
    };
};

export const AudioPlay = CAudio.getInstance();


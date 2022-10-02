import { Util } from "../tools/utils";
import { AudioPlay } from "../tools/audio";

/**
 * 资源管理，或资源预下载操作
 * 主要针对resources目录下的资源
 */
interface Asset{
    name:string;
    data:any;
};

class resMgr{
    public static readonly cdn_root:string = 'http://www.babaliuliu.com:8891/';
    private static _instance:resMgr = null;
    private _language:any = null;
    private _config:any = null;
    private _assetMap:Array<Asset> = new Array<Asset>();
    private _curSceneConfig:any = null;

    public static getInstance():resMgr{
        if (resMgr._instance === null)
            resMgr._instance = new resMgr();

        return resMgr._instance;
    };

    public preload(list:Array<string>,cb?:(resData:Array<any>)=>void,isWait:boolean=false):void{
        if (Util.isInvalid(list) || list.length < 1){
            cb && cb(null);
            return ;
        }

        // 打开遮罩窗口
        if (isWait){
        }

        let _arr = [];
        for (let i = list.length-1; i < 0; --i){
            let _name = list[i];
            for (let it of this._assetMap){
                if (it.name === _name){
                    _arr.push(it.data);
                    list.splice(i,1);
                }
            }
        }

        if (list.length > 0){
            let self = this;
            list.forEach((path:string)=>{
                let _fileType = path.substring(path.lastIndexOf(".")+1, path.length).toLowerCase();
            });
            cc.loader.loadResArray(list, (error: Error, resource: any[]) => {
                if (error !== null)
                    throw new Error(error.message);

                if (list.length === resource.length){
                    for (let i = 0; i < resource.length; ++i){
                        let it = resource[i];
                        if (it instanceof cc.JsonAsset)
                            it = it.json;
                        _arr.push(it);
                        self._assetMap.push({name:list[i],data:it})
                    }
                }
                // 关闭遮罩窗口
                cb && cb(_arr);
            });
        } else cb && cb(_arr);
    };

    public preloadDir(dirs:string|Array<string>,cb?:(resData?:Array<any>)=>void,isWait:boolean=false):void{
        if (Util.isInvalid(dirs) || (typeof dirs === 'string' && dirs === '') || (Array.isArray(dirs) && dirs.length < 1)){
            cb && cb([]);
            return ;
        }
        isWait && this.showOrHideRes(true,'');
        let self = this;
        if (typeof dirs === 'string') dirs = [dirs];
        let _count = 0;
        let _arr = [];
        dirs.forEach((dir:string)=>{
            cc.loader.loadResDir(dir, (error: Error, res:any) => {
                if (error !== null)
                    throw new Error(error.message);

                _count++;
                let _data = {name:dir,data:res};
                _arr.push(_data)
                self._assetMap.push(_data);
                if (_count === dirs.length){
                    // 关闭遮罩窗口
                    isWait && this.showOrHideRes(false,'');
                    cb && cb(_arr);
                }
            });
        });
    };

    public preloadFiles(files:string|Array<string>,cb?:(resData:Array<any>)=>void,isWait:boolean=false):void{
        if (Util.isInvalid(files) || (typeof files === 'string' && files === '') || (Array.isArray(files) && files.length < 1)){
            cb && cb([]);
            return ;
        }
        isWait && this.showOrHideRes(true,'');
        let self = this;
        if (typeof files === 'string') files = [files];
        let _count = 0;
        let _arr = [];
        files.forEach((file:string)=>{
            cc.loader.loadRes(file, (error: Error, res:any) => {
                if (error !== null)
                    throw new Error(error.message);

                _count++;
                if (res instanceof cc.JsonAsset)
                    res = res.json || res;

                let _data = {name:file,data:res};
                _arr.push(_data)
                self._assetMap.push(_data);
                if (_count === file.length){
                    // 关闭遮罩窗口
                    isWait && this.showOrHideRes(false,'');
                    cb && cb(_arr);
                }
            });
        });
    };

    public unload(list:Array<string>):void{
        if (Util.isInvalid(list) || list.length < 1 || this._assetMap.length < 1)
            return ;

        let self = this;
        list.forEach((name:string)=>{
            for (let i = self._assetMap.length-1; i < 0; --i){
                let it = self._assetMap[i];
                if (Util.isValid(it) && it.name === name){
                    cc.loader.releaseRes(name);
                    delete self._assetMap[i];
                }
            }
        });
    };
    
    public backgroundLoad(files:Array<string>):void{
        this.preload(files);
    };

    public getRes(name:string,cb?:(data:any)=>void,isWait:boolean=false):any{
        for(let i = 0; i < this._assetMap.length;++i){
            let it = this._assetMap[i];
            if (it.name === name){
                cb && cb(it.data);
                return it.data;
            }
        }

        this.preload([name],(datas:any[])=>{
            cb && cb(datas[0]);
        },isWait);
        return null;
    };

    public showOrHideRes(isShow:boolean,obj:string|cc.Prefab|cc.Node|cc.Component,parent?:cc.Node,isWait:boolean=false){
        let _toNode = (o)=>{
            if (o instanceof  cc.Node)
                return o;
            else if (o instanceof  cc.Component)
                return o.node;
            else if (o instanceof cc.Prefab)
                return cc.instantiate(o);
            return null;
        };

        if (isShow === false){
            let _tmpNode = _toNode(obj);
            if (Util.isValid(_tmpNode))
                _tmpNode.removeFromParent(false);
            return ;
        }

        let _showNode = (node)=>{
            if (Util.isInvalid((node)))
                return ;

            // 确保节点在显示之前正常初始化
            node.active = true;
            if (node.parent === null){
                parent = parent || cc.director.getScene();
                node.setPosition(cc.v2(0,0));
                parent.addChild(node);
            }
        };

        if (typeof obj === 'string'){
            this.getRes(obj,(data:any)=>{
                let _tmp = _toNode(data);
                if (Util.isValid(_tmp))
                    _showNode(_tmp);
            },isWait);
        } else
            _showNode(_toNode(obj));
    };

    public enterScene(sceneName:string,enterCallFun?:()=>void,bgMusic?:string):void{
        if (!Util.isEmptyStr(sceneName)){
            let self = this;
            cc.director.loadScene(sceneName,(err:Error,res)=>{
                if (err !== null)
                    throw new Error('[enter scene '+sceneName+' error]:'+err.message);

                let _scene = res.scene || res;
                if (_scene !== null){
                    if (!Util.isEmptyStr(bgMusic))
                        AudioPlay.playAudio(bgMusic,false);

                    self._curSceneConfig = self.getCfg('Scenes/'+sceneName);
                    enterCallFun = enterCallFun || function (){cc.log('enter scene:'+name+'.play bg music:'+bgMusic);};
                    enterCallFun();
                }
            });
        } else
            throw new Error('target scene info is error.');
    };

    public preloadScene(nameScene:string,preloads?:Array<string>,cb?:()=>void):void{
        if (Util.isEmptyStr(nameScene)) return ;
        let self = this;
        cc.director.preloadScene(nameScene,null,(error: Error, asset: cc.SceneAsset)=>{
            if (error !== null)
                throw new Error(error.message);
            Util.isValid(preloads) && self.preload(preloads,(res:Array<any>)=>{cb && cb()});
        });
    };

    public getCfg<T>(key?:string):T{
        if (Util.isInvalid(this._config))this._config = this.getRes('framework/config');

        if (!Util.isEmptyStr(key)){
            let _strs = key.split('/');
            let _obj = this._config[_strs.shift()];
            while (_strs.length > 0){
                if (typeof _obj === 'object' && !Array.isArray(_obj))
                    _obj = _obj[_strs.shift()];
                else _strs.shift();
            }
            return _obj;
        }

        return this._config;
    };
};
export const ResMgr:resMgr = resMgr.getInstance();
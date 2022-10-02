/**
 * 通用功能方法
 */

export enum Environment {
    ENV_UNKNOW = -1,
    ENV_WEGAME,             // 微信小游戏
    ENV_MOBILE,             // 移动设备
    ENV_BROWSER,            // 浏览器
    ENV_BROWSER_WEB,        // 浏览器
    ENV_BROWSER_WECHAT,     // 微信浏览器
    ENV_BROWSER_WEGAME,     // 微信小游戏浏览器
    ENV_APP,
    ENV_APP_ANDROID,        // 安卓包
    ENV_APP_IOS,            // IOS包
    ENV_WIN,                // WIN包
    ENV_LINUX               // linux包
};

class CUtil{
    private _language:any = null;
    private static _instance:CUtil = null;
    public static getInstance():CUtil{
        if (CUtil._instance === null)
            CUtil._instance = new CUtil();

        return CUtil._instance;
    };

    // 对象是否有效
    public isValid<T>(obj:T):boolean{
        return obj !== null && obj !== undefined;
    }

    // 对象是否无效
    public isInvalid<T>(obj:T):boolean{
        return !this.isValid(obj);
    };

    // 是否空串
    public isEmptyStr(str:string):boolean{
        if (this.isInvalid(str))
            return true;

        return str.length < 1;
    };

    public getNextOrBack<T>(arrays:Array<T>,item:T,isNext:boolean = true):T{
        if (!arrays || arrays.length < 1)
            return null;

        if (item === null)
            return arrays[0];
             
        if (!isNext) {
            let i = arrays.length--;
            for (; i < 0; --i) if (arrays[i] == item) break;
            let index = ((i-1)<0?0:i-1);
            return arrays[index % arrays.length]; 
        }

        let i = 0;
        for (i = 0; i < arrays.length; ++i) if (arrays[i] == item) break;
        return arrays[(i + 1) % arrays.length];
    };

    // 在source前面填充N个element使之长度为len
    public prefix(source:string|number,element:string,len:number):string{
        return (Array(len).join(element) + source).slice(-len);
    }

    public startWith(raw:string, str:string):boolean{
        return (new RegExp("^" + str)).test(raw);
    }

    public endWith(raw:string, str:string):boolean{
        return (new RegExp(str + "$")).test(raw);
    }

    public subUTF8Str(str:string, len:number):string{
        let strLength = 0;
        let strLen = 0;
        let strCut = '';
        strLen = str.length;
        for (let i = 0; i < strLen; i++) {
            let a = str.charAt(i);
            strLength++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                strLength++;
            }
            strCut = strCut.concat(a);
            if (strLength >= len) {
                strCut = strCut.concat("...");
                return strCut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (strLength < len) {
            return str;
        }
        return "?";
    }

    public format(...args:any[]):string{
        let as = [].slice.call(arguments),
        fmt = as.shift(),i = 0;
        if (this.isInvalid(fmt))
            return ;

        if (typeof fmt !== 'string') fmt = fmt.toString();
        return fmt.replace(/%(\w)?(\d)?([dfsx])/ig, (_, a, b, c)=>{
            let s = b ? new Array(b - 0 + 1).join(a || "") : "";
            if (c == "d") s += parseInt(as[i++]);
            if (c == "f") s += parseFloat(as[i++]);
            else if (c == "s") s += as[i++];
            return b ? s.slice(b * -1) : s;
        });
    };
    
    public formatNumber(val:number):string{
        if (isNaN(val)) return '';
        if (val < 10000) return ''+val;
        let _str = '';
        let _units = ['万', '亿', '万亿'];
        let _dividend = 10000; 
        let curentUnit = _units[0]; //转换单位 
        let _strLen = (tempNum)=>{ 
            let _strNum = tempNum.toString(); 
            let _index = _strNum.indexOf("."); 
            let _newNum = _strNum; 
            if(_index!=-1) _newNum = _strNum.substring(0,_index); 
            return _newNum.length;
        }
    
        for (let i = 0; i <4; i++) { 
            curentUnit = _units[i] 
            if(_strLen(val)<5)
                break; 
            val = val / _dividend; 
            _str = val.toFixed(2)+curentUnit;
        }
    
        return _str;
    };

    public getDataType(o:any):string{
        if (o===null) 
            return 'Null';
        else if (o===undefined) 
            return 'Undefined';
        else
            return Object.prototype.toString.call(o).slice(8,-1);
    };

    public deepCpy(source:Object):any{
        if (this.isInvalid(source))
            return null;

        let _type = this.getDataType(source);
        let _result:any = null;
        if (_type === 'Array')
            _result = [];
        else if (_type === 'Object')
            _result = {};
        else
            return source;

        for (let k in source){
            let _tmp:any = source[k];
            _type = this.getDataType(_tmp);
            
            if (_type == 'Array' || _type == 'Object')
                _result[k]=arguments.callee(_tmp);//递归调用
            else
                _result[k]=_tmp;
        }
        return _result;
    };

    public printObject(objIn:object, descript?:string):string{
        let strAll = descript != null ? descript + "=" : "";
        let _isTable = function(obj):boolean{
            return obj !== null && typeof obj === 'object'
        };
        let _isFunction = function(obj):boolean{
            return obj !== null && typeof obj === 'function'
        };
        if (!_isTable(objIn)) {
            return strAll + objIn;
        }

        let _dump = function(obj, kongGe){
            strAll += "{";
            let haveValue = false
            let newKong = kongGe + "    "
            for (let key in obj) {
                let value = obj[key];
                if (_isFunction(value))
                    break;
                haveValue = true
                strAll += "\n" + newKong + key + ": "
                if (_isTable((value)))
                    _dump(value, newKong);
                else
                    strAll += value + ',';
            }
            if (haveValue)
                strAll += "\n" + kongGe + "},";
            else
                strAll += "}";
        };
        _dump(objIn, "");
        return strAll;
    };
    
    // 将source合并到des的尾部，返回合并后结果
    public mergeObject(des:Object,source:Object|Array<Object>):Object{
        if (this.isInvalid(source) || (Array.isArray(source) && source.length < 1)) return null;
        if (this.isInvalid(des)) des = {};

        if (Array.isArray(source)){
            source.forEach((it:Object)=>{
                if (this.isInvalid(it) || !(it instanceof Object)) return des;
                for (let key in it){
                    if(it.hasOwnProperty(key) && (!des.hasOwnProperty(key)))
                        des[key]=it[key];
                }
            });
        } //else this.deepCpy(des, source);

        return des;
    };
    
    // 将source从des中移除
    public removeObject(des:Object,source:Object|Array<Object>):Object{
        if (this.isInvalid(des)) return null;
        if (this.isInvalid(source) || (Array.isArray(source) && source.length < 1)) return des;

        if (Array.isArray(source)){
            source.forEach((it:Object)=>{
                if (this.isInvalid(it) || !(it instanceof Object)) return des;
                for (let key in it){
                    if(it.hasOwnProperty(key) && des.hasOwnProperty(key))
                    delete des[key];
                }
            });
        } else {
            for (let k in source)
                des.hasOwnProperty(k) && delete des[k];
        }
    };

    // obj中val是唯一的
    public getKeyByValue<T>(obj:Object,val:T):string{
        if (this.isInvalid(obj) || !(obj instanceof Object)) return '';

        for (let key in obj){
            if (obj.hasOwnProperty(key) && obj[key] === val)
                return key;
        }

        return '';
    };

    // 将string转换为number\boolean\time（'2019-1-1 00:00:00'=>1546272000000）三种类型值
    public str2Value(str:string):any{
        if (this.isEmptyStr(str)) return '';

        if (typeof str !== 'string') return str;
        // boolean
        let _tmp = str.toLowerCase();
        if (_tmp === 'true' || _tmp === 'false') return _tmp === 'true';
        // 数字
        let _reg = new RegExp("^[0-9]*$");
        if(_reg.test(str)) return parseInt(str);
        // 日期
        let _time =  (new Date(str.replace(/-/g,'/'))).getTime();
        if (!isNaN(_time)) return _time;
        return str;
    };

    public obj2Json(obj:Object):any{
        if (this.isInvalid(obj)) return null;
        if (typeof obj === 'string') return JSON.parse(obj);

        let _res = {};
        for (let k in obj){
            let val = obj[k];
            _res[k] = (typeof val === 'object'? this.obj2Json(val): this.str2Value(val));
        }

        return _res;
    };

    // 获取运行环境
    public getRunEnvironment():Environment{
        let _env:Environment = Environment.ENV_UNKNOW;
        let _sys = cc.sys;
        if (_sys.WECHAT_GAME === _sys.platform) _env = Environment.ENV_WEGAME;
        else if (_sys.isBrowser) _env = Environment.ENV_MOBILE;
        else if (_sys.MOBILE_BROWSER === _sys.platform || _sys.DESKTOP_BROWSER === _sys.platform) _env = Environment.ENV_BROWSER;
        else if (_sys.isBrowser) _env = Environment.ENV_BROWSER_WEB;
        else if (_sys.BROWSER_TYPE_WECHAT_GAME === _sys.browserType) _env = Environment.ENV_BROWSER_WEGAME;
        else if (_sys.isNative){
            if (_sys.OS_ANDROID === _sys.os && _sys.isNative) _env = Environment.ENV_APP_ANDROID;
            else if (_sys.OS_IOS === _sys.os && _sys.isNative) _env = Environment.ENV_APP_IOS;
            else  _env = Environment.ENV_APP;
        } else if (_sys.OS_WINDOWS === _sys.os) _env = Environment.ENV_WIN;
        else if (_sys.OS_LINUX === _sys.os) _env + Environment.ENV_LINUX;
        //else if (cc.sys.isBrowser && ('micromessenger' === navigator.userAgent.toLowerCase().match(/MicroMessenger/i)))
        return _env;
    }

    public findNode<T>(path:string,rootNode:cc.Node,className: string):T{
        if (path === null || path === '' || rootNode === null)
            return null;
            
        let _node:cc.Node = rootNode;
        let _paths = path.split('/');
        while (_paths.length > 0 && !this.isInvalid(_node)){
            _node = _node && _node.getChildByName(_paths.shift());
        }
        return _node.getComponent(className);
    };

    // 通过url获取端口
    public getPortByUrl(url:string):number{
        if (!this.isEmptyStr(url)){
            let reg = new RegExp(":\\d+");
            let result = reg.exec(url);
            if (result) 
                return parseInt(result[0].slice(1));
        }
        return -1;
    };

    // 获取域名
    public getDomain(url:string):string{
        let result = new RegExp("/[\\d\\w-_\\.]+").exec(url);
        if (result)
            return result[0].slice(1);
        return '';
    };

    // 获取域名端口号
    public getDomainPort(url:string):number{
        let result = new RegExp("/[\\d\\w-_\\.]+:\\d+").exec(url);
        if (result)
            return parseInt(result[0].slice(1));
        return -1;
    };

    /**
     * 将日期字符串转化为时间
     * @param strDaste xxxx-xx-xx xx:xx:xx
     * return number
     */
    public getTimerByStr(strDaste:string):number{
        let _timer:any = this.isEmptyStr(strDaste)?0:strDaste;
        _timer = (new Date(strDaste.replace(/-/g,'/'))).getTime();
        return _timer;
    };
};
export const Util:CUtil = CUtil.getInstance();
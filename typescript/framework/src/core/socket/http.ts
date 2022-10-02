import { Util } from '../../tools/utils';


export class Http {
    public static Post(url:string,data:any,call:(result:any)=>void,timeout:number=5000):HttpClient{
        let _http = new HttpClient(url, call, 'POST',timeout);
        _http.send(data);
        return _http;
    };

    public static Get(url:string,data:any,call:(result:any)=>void,timeout:number=5000):HttpClient{
        let _http = new HttpClient(url, call, 'GET',timeout);
        _http.send(data);
        return _http;
    };

    public static request(url:string,cb:(result:any)=>void,mode:string='POST',timeout:number=5000):void{
        if (Util.isEmptyStr(url) || url.indexOf('http://') !== 0){
            cc.error('Wrong URL.');
            return ;
        }

        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = timeout;
        if (mode === 'POST'){
            xhr.open('POST', url,true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        }else{
            xhr.open('GET',url, true);
            cc.sys.isNative && xhr.setRequestHeader('Accept-Encoding','text/html;charset=UTF-8');
        }
    };
};

export class HttpClient{
    private _dnsSvrAdd:string;
    private _timeout:number;
    private _callback:(code:number, data?:any)=>void;
    private _xhr:XMLHttpRequest;
    private _mode:string;
    private _httpHand:any;
    constructor(url:string,call:(data?:any)=>void,mode:string,timeout:number=3000){
        this._dnsSvrAdd = url;
        this._callback = call;
        this._timeout=timeout;
        this._xhr = null;
        this._mode = mode;
    };

    public send(data:string|Object):void{
        let _stringify = ()=>{
            if (typeof data === 'string') 
                return data;

            if (typeof data === 'object'){
                let str = '';
                for (let key in data) {
                    let item = data[key];
                    let line = key + '=' + item;
                    if (str) str += '&' + line; else  str += line;
                };
                return str;
            }

            return '';
        };

        this.connect(_stringify());
    };

    public close():void{
        if (!Util.isInvalid(this._xhr)) {
            this._xhr.abort();
            this._xhr = null;
        }

        if (!Util.isInvalid(this._httpHand)) {
            clearTimeout(this._httpHand);
            this._httpHand = null;
        }
    };

    public connect(data:string):boolean{
        if (Util.isEmptyStr(this._dnsSvrAdd)) {
            cc.error('HttpClient need server addr');
            setTimeout(this._connectFailed.bind(this), 0);
            return false;
        }

        let _finish = function(code:number, data:any) {
            this._xhr = null;
            clearTimeout(this._httpHand);
            this._httpHand = null;
            if (code == 200)
                this._connectSucceed(data);
            else
                this._connectFailed(code);
        }.bind(this);

        let onerror = function onerror() {
            clearTimeout(this._httpHand);
            this._httpHand = null;
            _finish(408);
        }.bind(this);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (()=>{
            if (xhr.readyState === 4) {
                if (xhr.status === 200)
                    _finish(200,  xhr.responseText);
                else if (xhr.status != 0)
                    _finish(xhr.status);
            }
        }).bind(this);

        xhr.onerror = onerror;
        xhr.ontimeout = onerror;

        this._httpHand = setTimeout(()=>{
            xhr.abort();
            this.connect(data);
        }, this._timeout);

        this._xhr = xhr;
        if (this._mode == 'POST') {
            xhr.open(this._mode, this._dnsSvrAdd, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://babaliuliu.com');
            cc.sys.isNative && xhr.setRequestHeader('Accept-Encoding', 'text/html;charset=UTF-8');

            xhr.send(data);
        } else if (this._mode == 'GET') {
            let newUrl = this._dnsSvrAdd + data;
            xhr.open(this._mode, newUrl, true);
            cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
            xhr.send();
        }

        return true;
    };

    private _connectFailed(code:number):void{
        this._callback && this._callback(null);
    };
    private _connectSucceed(data:any):void{
        this._callback && this._callback(data);
    };
};

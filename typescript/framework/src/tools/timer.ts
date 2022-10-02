/**
 * 使用cocos schedule
    setTimeout 不能同步游戏事件的调度，非必要情况下还是不用
 */
class CTimer{
    private _maps:any={};
    private _addMaps:any = {};
    private _count:number=1;
    private _isUpdate:boolean=false;
    private _isLockChanged:boolean =false;
    private _removeList:Array<any>=new Array<any>();
    private _instanceId:string = '';
    private _localTime:number = 0;

    private static _instance:CTimer = null;
    public static getInstance():CTimer{
        if (CTimer._instance === null)
            CTimer._instance = new CTimer();

        return CTimer._instance;
    };

    public init():CTimer{
        //cocos 需要识别
        this._instanceId = 'Timer' + (Math.floor(Math.random() * 1000000));
        //this.resume();
        return this;
    };

    public pause():void{
        if (this._isUpdate) {
            this._isUpdate = false;
            cc.director.getScheduler().unscheduleUpdate(this);
        }
    };

    public resume():void{
        if (!this._isUpdate) {
            this._isUpdate = true;
            cc.director.getScheduler().scheduleUpdate(this, 1, false);
        }
    };

    public update(dt:number):void{
        this._isLockChanged = true;
        for (var i in this._maps) {
            var tt = this._maps[i];
            tt.delayTime -= dt;
            if (tt.delayTime <= 0) {
                if (tt.callback) {
                    try {
                        tt.callback();
                    } catch (error) {
                        cc.error(error);
                        window.onerror("Timer Error: " + error, "Timer", 0, 0, error);
                    }

                }
                this._removeList.push(i);
            }
        };
        this._isLockChanged = false;

        while (this._removeList.length > 0) {
            var k = this._removeList.shift();
            delete this._maps[k];
        }

        if (Object.keys(this._addMaps).length > 0) {
            cc.js.mixin(this._maps, this._addMaps);
            cc.js.clear(this._addMaps);
        }
        this._tryFinishTimer();
    };

    //开始一个timer
    public start(name:string, call_back:()=>void, delayTime?:number):string{
        if (typeof call_back === 'undefined') {
            cc.warn('Timer start: callback is null.');
            return '';
        };

        delayTime = delayTime || 0;
        name = name || ''+this._count++;

        var tt = {
            'delayTime': delayTime,
            'callback': call_back,
        };

        this._isLockChanged ? this._addMaps[name] = tt : this._maps[name] = tt;
        this.resume();
        return name;
    };

    public stop(name:string):void{
        name in this._addMaps && delete this._addMaps[name];

        if (this._isLockChanged) {
            if (name in this._maps) {
                this._maps[name].callback = null;
                this._removeList.push(name);
            }
        } else {
            name in this._maps && delete this._maps[name];
            this._tryFinishTimer();
        }
    };

    private _tryFinishTimer():void{
        Object.keys(this._maps).length === 0 && this.pause();
    };

    public stopAll():void{
        cc.js.clear(this._maps);
    };

    public getLocalTime(isNumber:boolean = true):any{
        let _time = (new Date()).getTime();
        return isNumber ? _time : _time.toString();
    };

};

export const Timer:CTimer = CTimer.getInstance();
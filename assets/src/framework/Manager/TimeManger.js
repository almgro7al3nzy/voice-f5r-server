// TimeManger 

let TimeManger = cc.Class({
	_serverTimeStamp:null,//服务器时间戳
	// 获取当前时间戳(毫秒) cc.js.getCurrentTime()
	getCurrentTime : function(){
	    return new Date().getTime();
	},
	// 当前时间转成这样的格式[09:34:02:00] cc.js.getLogTime()
	getLogTime : function(){
	    return (new Date()).Format("hh:mm:ss.S");
	},
	//获取服务器的时间
	getServerTime:function(){
	    // var mill = this._serverTimeStamp + new Date().getTime();
	    var d = new Date(this._serverTimeStamp);
	    return d.Format("hh:mm:ss");
	},
	//服务器时间戳
	setServerTimeStamp:function(timestamp){
        if(this._serverTimeStamp===null)
        {
            this._serverTimeStamp = timestamp
        }
        else
        {
            var pre = Math.abs(this._serverTimeStamp)
            var now = Math.abs(timestamp)
            if(now<pre)//采用绝对值更小的一方有利于提高时间差的精确度
            {
                this._serverTimeStamp = timestamp
            }
        }
    },
    getServerTimeStamp:function(){
        return this._serverTimeStamp;
    },

    // timeScale 默认是1.0 大于加速 小于减速
    setTimeScale: function (timeScale) {
        cc.director.getScheduler().setTimeScale(timeScale);
    },
    getTimeScale: function () {
        return cc.director.getScheduler().getTimeScale();
    },

    // schedule 
 	_maps:{},
    _addMaps:{},
    _count:1,
    _isUpdate:false,
    _isLockChanged:false,
    _removeList:[],
    pause:function(){
        if (this._isUpdate) {
            this._isUpdate = false;
            cc.director.getScheduler().unscheduleUpdate(this);
        }
    },
    resume:function(){
        if (!this._isUpdate) {
            this._isUpdate = true;
            cc.director.getScheduler().scheduleUpdate(this, cc.Scheduler.PRIORITY_NON_SYSTEM, false);
        }
    },
    update(dt){
        this._isLockChanged = true;
        for (var i in this._maps) {
            var tt = this._maps[i];
            tt.delaytime -= dt;
            if (tt.delaytime <= 0) {
                if (tt.callback) {
                    try {
                        tt.callback();
                    } catch (error) {
                        cc.error(error);
                        window.onerror("TimeManger Error: " + error, "TimeManger", 0, 0, error);
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
    },
    //开始
    start(name, callback, delaytime){
        if (typeof callback === 'undefined') {
            cc.warn('TimeManger start: callback is null.');
            return null;
        };
        delaytime = delaytime || 0;
        name = name || ''+this._count++;

        var tt = {
            'delaytime': delaytime,
            'callback': callback,
        };

        this._isLockChanged ? this._addMaps[name] = tt : this._maps[name] = tt;
        this.resume();
        return name;
    },
    stop(name){
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
    },
    _tryFinishTimer(){
        Object.keys(this._maps).length === 0 && this.pause();
    },
    stopAll(){
        cc.js.clear(this._maps);
    },

});

window.GTimeMgr = TimeManger;
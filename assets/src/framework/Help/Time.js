cc.Node.maxTouchNum = 1;
cc.Node.touchNum = 0;
var __dispatchEvent__ = cc.Node.prototype.dispatchEvent;
cc.Node.prototype.dispatchEvent = function (event) {
switch (event.type) {
case 'touchstart':
if (cc.Node.touchNum < cc.Node.maxTouchNum) {
cc.Node.touchNum++;
cc.Node.touchNum = cc.Node.touchNum > 1 ? 1 : cc.Node.touchNum
this._canTouch = true;
__dispatchEvent__.call(this, event);
}
break;
case 'touchmove':
if (!this._canTouch && cc.Node.touchNum < cc.Node.maxTouchNum) {
this._canTouch = true;
cc.Node.touchNum++;
cc.Node.touchNum = cc.Node.touchNum > 1 ? 1 : cc.Node.touchNum
}

if (this._canTouch) {
__dispatchEvent__.call(this, event);
}

break;
case 'touchend':
if (this._canTouch) {
this._canTouch = false;
cc.Node.touchNum--;
cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum
__dispatchEvent__.call(this, event);
}
break;
case 'touchcancel':
if (this._canTouch) {
this._canTouch = true;
cc.Node.touchNum--;
cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum
 __dispatchEvent__.call(this, event);
}
break;
default:
__dispatchEvent__.call(this, event);
}
};

var __onPostActivated__ = cc.Node.prototype._onPostActivated;
cc.Node.prototype._onPostActivated = function (active) {
if(!active && this._canTouch){
this._canTouch = false;
cc.Node.touchNum--;
cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum
}
__onPostActivated__.call(this,active);
};

var __onPreDestroy__ = cc.Node.prototype._onPreDestroy;
cc.Node.prototype._onPreDestroy = function () {
if(this._canTouch){
this._canTouch = false;
cc.Node.touchNum--;
cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum
}
__onPreDestroy__.call(this);
};
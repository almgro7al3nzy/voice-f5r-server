// 查询的基类
cc.Class({
    name: "BaseQuery",
    ctor: function () {
        this._cb = arguments[0];
    },
    finish: function (...arg) {
        if (this._cb) {
            this._cb(...arg)
        }
    }
});
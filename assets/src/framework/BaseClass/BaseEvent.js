// BaseEvent
// 事件基类
cc.Class({
    name: "BaseEvent",
    extends: cc.EventTarget,
    /**
     * 设置完成回调
     * @param cb
     */
    setFinish: function (cb) {
        this._cb = cb
    },
    /**
     * 完成
     */
    finish() {
        if (this._cb) {
            this._cb(arguments);
        }
    },
    /**
     * 注册事件监听
     * @param message
     * @param callback
     * @param target
     * @param useCapture
     */
    addEventListener: function (message, callback, target, useCapture) {
        this.on(message, callback, target, useCapture)
    },
    //删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
    deleteEventListener: function (message, callback, target, useCapture) {
        this.off(message, callback, target, useCapture)
    },
    //注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
    addOnceEventListener: function (message, callback, target, useCapture) {
        this.once(message, callback, target, useCapture)
    },
    /**
     * @param target
     * 删除当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。
     * 这个函数无法删除当前 EventTarget 的所有事件监听器，也无法删除 target 参数所注册的所有事件监听器。
     * 这个函数只能删除 target 参数在当前 EventTarget 上注册的所有事件监听器。
     */
    removeTargetEvent: function (target) {
        this.targetOff(target)
    },
    /**
     * 发送事件
     * @param message
     * @param detail
     * 该对象直接发送事件， 这种方法不会对事件传播到任何其他对象。
     */
    emitEvent: function (message, detail) {
        this.emit(message, detail)
    },
    /*
    // 分发事件到事件流中。
    dispatchEvent = function (event) {
        this.emit(message, detail)
    };
    */
});
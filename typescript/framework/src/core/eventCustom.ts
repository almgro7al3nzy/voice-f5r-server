/**
 * 自定义事件系统
 */

import { Util } from "../tools/utils";

//
class CEventCustom {
    private static _instance:CEventCustom = null;
    private _eventTarget:cc.EventTarget = new cc.EventTarget();

    public static getInstance():CEventCustom{
        if (CEventCustom._instance === null)
            CEventCustom._instance = new CEventCustom();

        return CEventCustom._instance;
    }

    /**
     * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
     * @param eventKey 
     * @param cb 
     * @param target  When the target object is empty, when the same message is registered, the previous object will be overwritten.
     */
    public on(eventKey:string,cb:(...args:any[])=>void,target?:cc.Component|cc.EventTarget):void{
        if (Util.isEmptyStr(eventKey) || typeof cb !== 'function'){
            cc.warn('EventCustom on: eventKey or callFun is invalid.');
            return ;
        }

        Util.isInvalid(target) && (target = cc.game);

        if (target instanceof cc.Component)
            target = target.node;

        let _call = (event:cc.Event.EventCustom)=>{
            let _params = event.detail;
            cb(_params[0],_params[1],_params[2],_params[3],_params[4]);
        };

        if (target instanceof cc.Node){
            this.off(eventKey, target);
            target['customEvent'] = target['customEvent'] || {};
            target['customEvent'][eventKey] = _call;
        }
        
        this._eventTarget.on(eventKey,_call,target,true);
    };

    /**
     * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身
     * @param eventKey 
     * @param cb 
     * @param target 
     */
    public once(eventKey:string,cb:(...args:any[])=>void,target?:cc.Component|cc.EventTarget):void{
        if (Util.isEmptyStr(eventKey) || typeof cb !== 'function') {
            cc.warn('EventCustom once: eventKey or cb is invalid.');
            return;
        };

        if (target instanceof cc.Component) 
            target = target.node;

        let _onceFunc = (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any)=>{
            cb(arg1,arg2,arg3,arg4,arg5);
        };

        this._eventTarget.once(eventKey, _onceFunc, target);
    };

    /**
     * 通过事件名发送自定义事件
     * @param eventKey 
     * @param args args.legth <=5
     */
    public emit(eventKey:string,...args:any[]):void{
        if (Util.isEmptyStr(eventKey)) {
            cc.warn('EventCustom emit: eventKey is empty.');
            return;
        };

        let _event = new cc.Event.EventCustom(eventKey,true);
        _event.detail = args;

        // Event.AT_TARGET
        _event.eventPhase = cc.Event.AT_TARGET;
        _event.target = _event.currentTarget = this._eventTarget;

        this._eventTarget.dispatchEvent(_event);
    };

    /**
     * 注销一个对象上的某个事件，或注销该对象上的所有事件
     * @param eventObj eventObj=string, The target object can not be null
     * @param target  eventObj != string, The target object can be null
     */
    public off(eventObj:string|cc.Node|cc.Component,target:cc.Component|cc.EventTarget):void{
        if (typeof eventObj === 'string') {
            if (Util.isInvalid(target)) {
                cc.warn('[WARN]EventCuston.off:The target object is invalid.');
                return ;
            }
            
            //关闭某个节点上这个事件的监听
            if (target instanceof cc.Component)
                target = target.node;

            if (target['customEvent']) {
                let callback = target['customEvent'][eventObj];
                if (callback) {
                    delete target['customEvent'][eventObj];
                    this._eventTarget.off(eventObj, callback, target);
                }
            }
        } else if (eventObj instanceof cc.Node)
            this._eventTarget.targetOff(eventObj);
        else if (eventObj instanceof cc.Component)
            this._eventTarget.targetOff(eventObj.node);
    };
};

//export const EventCuston:Object = CEventCuston.getInstance();
export const EventCustom = CEventCustom.getInstance();
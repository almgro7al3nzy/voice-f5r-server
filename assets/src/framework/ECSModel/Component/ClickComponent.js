// ClickComponent Button
// 防止多次点击
"use strict";
cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "自定义/ClickComponent",
    },
    properties: {
        safeTime: {
            default: 0.5,
            tooltip: "按钮保护时间，指定间隔内只能点击一次."
        }
    },
    start(){
        let button = this.getComponent(cc.Button);
        if (!button){
            return;
        }

        this.__clickEvents = button.clickEvents;
        this.__button = button;
        this.__bClick = false;

        this.node.on('click', ()=>{
            if(this.__bClick)return;
            this.__button.clickEvents = [];
            this.__bClick = true;
            this.scheduleOnce((dt)=>{
                this.__bClick = false;
                this.__button.clickEvents = this.__clickEvents;
            }, this.safeTime);
            /*
            // mark: 这种方式会导致快速点击按钮时触摸穿透（按钮禁用时不再接受触摸事件）
            let autoGrey = button.enableAutoGrayEffect;
            button.enableAutoGrayEffect = false;
            button.interactable = false;
            this.scheduleOnce((dt)=>{
                button.enableAutoGrayEffect = autoGrey;
                button.interactable = true;
            }, this.safeTime);
            */
        }, this);
    }
});
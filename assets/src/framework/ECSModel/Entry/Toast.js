//Toast
cc.Class({
    extends: cc.Component,

    properties: {
        _content:null,
    },

    // use this for initialization
    onLoad: function () {
        if(H2O == null){
            return;
        }
        this._content = this.root["content"];
        this._toast.active = false;
        H2O.toast = this;
    },
    show:function(content,bDon$tAction){
        this._toast.active = true;
        this._content.string = content;
        if(!bDon$tAction){
            this.node.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0,100)), 
            	cc.callFunc(()=>{
            		this.node.active = false;
            		this.node.y = 0;
            	})));
        }
    },
    
    onDestory:function(){
        if(H2O){
            H2O.toast = null;    
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
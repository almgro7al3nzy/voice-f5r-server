cc.Class({
    extends: cc.Component,
    properties: {
        // target:cc.Node,
        // sprite:cc.SpriteFrame,
        // checkedSprite:cc.SpriteFrame,
        bgNode:cc.Node,
        checkedNod:cc.Node,
        checked:false,
        groupId:-1,
    },
    onLoad: function () {
        
    },

    refresh(){
        // var targetSprite = this.target.getComponent(cc.Sprite);
        if(this.checked){
            // targetSprite.spriteFrame = this.checkedSprite;
            this.bgNode.active = false;
            this.checkedNod.active = true;
        }
        else{
            // targetSprite.spriteFrame = this.sprite;
            this.bgNode.active = true;
            this.checkedNod.active = false;
        }
    },
    
    check(value){
        this.checked = value;
        this.refresh();
    },
    
    onClicked:function(){
        XMQ.RadioGroups.check(this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onEnable: function () {
        if(XMQ.RadioGroups == null){
            var RadioGroup = require("XMQRadioGroup");
            XMQ.RadioGroups = new RadioGroup();
            XMQ.RadioGroups.init();
        }
        XMQ.RadioGroups.add(this);
        this.refresh();
    },
    onDisable:function(){
        if(XMQ.RadioGroups){
            XMQ.RadioGroups.del(this);            
        }
    }
});


/////////////////
cc.Class({
    extends: cc.Component,
    properties: {
        _groups:null
    },
    init() {
        this._groups = {};
    },
    
    add(radioButton){
        var groupId = radioButton.groupId; 
        var buttons = this._groups[groupId];
        if(buttons == null){
            buttons = [];
            this._groups[groupId] = buttons; 
        }
        buttons.push(radioButton);
    },
    
    del(radioButton){
        var groupId = radioButton.groupId;
        var buttons = this._groups[groupId];
        if(buttons == null){
            return; 
        }
        var idx = buttons.indexOf(radioButton);
        if(idx != -1){
            buttons.splice(idx,1);            
        }
        if(buttons.length == 0){
            delete this._groups[groupId]   
        }
    },
    
    check(radioButton){
        var groupId = radioButton.groupId;
        var buttons = this._groups[groupId];
        if(buttons == null){
            return; 
        }
        for(var i = 0; i < buttons.length; ++i){
            var btn = buttons[i];
            if(btn == radioButton){
                btn.check(true);
            }else{
                btn.check(false);
            }
        }        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

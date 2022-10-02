// 弹出警告 Alert
cc.Class({
    extends: cc.Component,

    properties: {
        _alert:null,
        _btnOK:null,
        _btnCancel:null,
        _title:null,
        _content:null,
        _onOk:null,
        _onCancel:null,
    },

    // use this for initialization
    onLoad: function () {
        if(H2O == null){
            return;
        }
        this._alert = this.root["alert"];
        this._title = this.root["title"];
        this._content = this.root["content"];
        this._btnOK = this.root["btn_ok"];
        this._btnCancel = this.root["btn_cancel"];
        
        H2O.utils.addClickEvent(this._btnOK,this.node,"Alert","onBtnClicked");
        H2O.utils.addClickEvent(this._btnCancel,this.node,"Alert","onBtnClicked");
        
        this._alert.active = false;
        H2O.alert = this;
    },
    
    onBtnClicked:function(event){
        if(event.target.name == "btn_ok"){
            if(this._onOk){
                this._onOk();
            }
        }
        if(event.target.name == "btn_cancel"){
            if(this._onCancel){
                this._onCancel();
            }
        }
        this._alert.active = false;
        this._onOk = null;
        this._onCancel = null;
    },
    
    show:function(title,content,onOk,needCancel,onCancel){
        this._alert.active = true;
        this._onOk = onOk;
        this._onCancel = onCancel;
        this._title.string = title;
        this._content.string = content;
        if(needCancel){
            this._btnCancel.active = true;
            this._btnOK.x = -150;
            this._btnCancel.x = 150;
        }
        else{
            this._btnCancel.active = false;
            this._btnOK.x = 0;
        }
    },
    
    onDestory:function(){
        if(H2O){
            H2O.alert = null;    
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

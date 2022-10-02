import {LGModel} from "../logic/littleGameModel";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACMsgBox")
export default class ACMsgBox extends cc.Component {
    @property(cc.Label)
    public content: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.setParam(LGModel.msgBoxContent,LGModel.msgBoxFunOk,LGModel.msgBoxFunNo,LGModel.msgBoxFunClose);
    }

    hidePage(){
        LGModel.msgBoxContent = null;
        LGModel.msgBoxFunOk = null;
        LGModel.msgBoxFunNo = null;
        LGModel.msgBoxFunClose = null;
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }

    // update (dt) {}
    setParam(msgText, funOk, funNo, funClose) {
        this._funOk = funOk;
        this._funNo = funNo;
        this._funCo = funClose;
        this.content.string = msgText;
    }
    onPageBack() {
        if (typeof(this._funCo) === "function")
            this._funCo();
        this.hidePage();
        this.node.destroy();
    }
    onBtnOk() {
        if (typeof(this._funOk) === "function")
            this._funOk();
        this.hidePage();
        this.node.destroy();
    }
    onBtnNo() {
        if (typeof(this._funNo) === "function")
            this._funNo();
        this.hidePage();
        this.node.destroy();
    },
}

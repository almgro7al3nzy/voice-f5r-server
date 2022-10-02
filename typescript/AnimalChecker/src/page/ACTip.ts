/* 
* ACTip
* 消息提示条
*/
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACTip")
export default class ACTip extends cc.Component {

    @property(cc.Label)
    public content: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hidePage();
    }

    start () {

    }

    hidePage(){
        this.node.active = false;
    }

    showPage(msg){
        if(msg){
            this.content.string = msg;
        }
        this.node.active = true;
        this.scheduleOnce(this.hidePage,1.5);
    }

    setParam(msg){
        this.showPage(msg);
    }

    // update (dt) {}
}

/* 
* ACWait
* 斗兽棋比赛等待对方进桌
*/
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACWait")
export default class ACWait extends cc.Component {
    @property(cc.Node)
    public douzi: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.douziScr = this.douzi.getComponent("beanNode");
        this.douziScr.stopAction();
    }

    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }

    isDouziActing() {
        return this.douziScr.isAction();
    },
    actDouzi() {
        this.node.active = true;
        this.douziScr.startAction();
    },
    stopDouzi() {
        this.douziScr.stopAction();
        this.node.active = false;
    },

    // update (dt) {}
}

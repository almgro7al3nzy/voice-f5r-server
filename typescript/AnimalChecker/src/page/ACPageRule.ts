/* 
* ACPageRule
* 斗兽棋游戏规则界面
*/
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACPageRule")
export default class ACPageRule extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    hidePage(){
        this.node.active = false;
        this.node.destroy();
    }

    showPage(){
        this.node.active = true;
    }


    // update (dt) {}
}

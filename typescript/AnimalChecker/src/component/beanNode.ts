const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/Component/beanNode")
export default class BeanNode extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    start () {
        this.startAction();
    }

    startAction(){
        this._isAction = true;
        this.node.active = true;
        if (!this.node._initBornPostion) {
            this.node._initBornPostion = true;
            this.node._bornX = this.node.x;
            this.node._bornY = this.node.y;
        }
        this.node.x = this.node._bornX;
        this.node.y = this.node._bornY;
        this.node.scaleY = 1;
        let fpsAni = 25; //动画一秒钟的帧数
        this.node.runAction(cc.repeatForever(cc.sequence(
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(-21, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.1)),
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(-10, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.155)),
            cc.spawn(cc.moveBy(2/fpsAni, cc.v2(0, -17.2)), cc.scaleTo(4/fpsAni, 1, 1.06)),
            cc.scaleTo(4/fpsAni, 1, 1),
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(21, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.1)),
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(10, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.155)),
            cc.spawn(cc.moveBy(2/fpsAni, cc.v2(0, -17.2)), cc.scaleTo(4/fpsAni, 1, 1.06)),
            cc.scaleTo(4/fpsAni, 1, 1),
        )));
    },
    stopAction(){
        this._isAction = false;
        this.node.stopAllActions();
        this.node.active = false;
    },
    isAction(){
        return this._isAction;
    },

    // update (dt) {}
}

import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACGuide")
export default class ACGuide extends cc.Component {
    @property(cc.Node)
    public shou: cc.Node = null;

    @property(cc.Node)
    public quan: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._actFinger();
        this._actCircle();
    }

    start () {

    }

    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }

    // update (dt) {}
    _actFinger() {
        this.shou.runAction(cc.repeatForever(cc.sequence(
            cc.rotateTo(5/LGConfig.AniFps, -22.2),
            cc.delayTime(1/LGConfig.AniFps),
            cc.rotateTo(5/LGConfig.AniFps, 0),
        )));
    };
    _actCircle() {
        this.quan.opacity = 0;
        this.quan.scale = 1/3;
        this.quan.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(2/LGConfig.AniFps),
            cc.spawn(
                cc.fadeIn(3/LGConfig.AniFps),
                cc.scaleTo(3/LGConfig.AniFps, 1),
            ),
            cc.delayTime(1/LGConfig.AniFps),
            cc.spawn(
                cc.fadeOut(0),
                cc.scaleTo(0, 1/3),
            ),
            cc.delayTime(5/LGConfig.AniFps),
        )));
    };
}

import {LGModel} from "../logic/littleGameModel";
import {LGTools} from "../logic/littleGameTool";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACMsgTip")
export default class ACMsgTip extends cc.Component {
    @property(cc.Label)
    public content: cc.Label = null;

    onLoad () {
        this.setParam(LGModel.msgTipContent);
        LGTools.callMoveBy(this.node, 2, cc.v2(0, 100), ()=>{
            LGModel.msgTipContent = null;
            this.node.destroy()
        });
    }
    setParam(msgText) {
        this.content.string = msgText;
    }
}

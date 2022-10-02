import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACMain")
export default class ACMain extends cc.Component {
    @property(cc.Node)
    public myGrid: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.myGridSrc = this.myGrid.getComponent("ACGrid");
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
    updateAllGrid() {
        this.myGridSrc.updateGrids();
    };

    doTurnChess(pos, num) {
        let item = this.myGridSrc.findItemByPos(pos);
        if (!item) return;
        this.myGridSrc.openItem(item, num);
    },
    doMoveChess(fromPos, toPos) {
        this.myGridSrc.moveItemToPos(this.myGridSrc.findItemByPos(fromPos), toPos);
    },
    doEatChess(fromPos, toPos) {
        this.myGridSrc.item1EatItem2(this.myGridSrc.findItemByPos(fromPos), this.myGridSrc.findItemByPos(toPos), toPos);
    },
    // 自己回合 提示所有能操作的棋子
    promptAllCando(who, delay) {
        if (LGModel.getMainSvrSeatId()===who) {
            if (delay>0) {
                LGTools.callDelay(this.node, delay, ()=>{
                    this.myGridSrc.lightAllCanDo();
                });
            } else {
                this.myGridSrc.lightAllCanDo();
            }
        } else {
            this.myGridSrc.clearAlllight();
        }
    },
}

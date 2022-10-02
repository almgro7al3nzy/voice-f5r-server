/*
* ACDoTip
* 斗兽棋页面之回合提示
*/
const {ccclass, property, menu} = cc._decorator;
import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
@ccclass
@menu("AnimalChecker/page/ACDoTip")
export default class ACDoTip extends cc.Component {

    @property(cc.Node)
    public myRes: cc.Node = null;

    @property(cc.Node)
    public redNode: cc.Node = null;

    @property(cc.Node)
    public blueNode: cc.Node = null;

    @property(cc.Node)
    public myCampNode: cc.Node = null;

    @property(cc.Node)
    public enemyCampNode: cc.Node = null;

    @property([cc.SpriteFrame])
    public roundRes: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.redNode.opacity = 0;
        this.blueNode.opacity = 0;
        this.myCampNode.opacity = 0;
        this.enemyCampNode.opacity = 0;
        this.myResSrc = this.myRes.getComponent("ACChessRes");
    }

    start () {
    }

    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }

    update (dt) {

    }

    updateAllState() {
        this.myCampNode.opacity = 0;
        this.enemyCampNode.opacity = 0;
        if (LGModel.roomData.game_status>LGConfig.GameStatus.Wait) {
            this._setBolByWho(LGModel.roomData.action_position);
            if (this._isMe) {
                this.myCampNode.opacity = 255;
                this._setCampColor(this.myCampNode);
            } else {
                this.enemyCampNode.opacity = 255;
                this._setCampColor(this.enemyCampNode);
            }
        }
    },
    // showNum: 定义undefined/0两个动画都显示 1只显示阵营动画 2只显示中间动画
    showTip(who, delay, showNum) {
        this._setBolByWho(who, showNum);
        if (delay>0) {
            LGTools.callDelay(this.node, delay, this._actTip.bind(this));
        } else {
            this._actTip();
        }
    },
    _setBolByWho(who, showNum) {
        this._isRed = who === LGConfig.CampType.Red;
        this._isMe = who === LGModel.getMainSvrSeatId();
        this._showNum = showNum;
    },
    _actTip() {
        if (this._showNum!==1) {
            this._isRed ? this._actRedOrBlue(this.redNode, false) : this._actRedOrBlue(this.blueNode, true);
        }
        if (this._showNum!==2) {
            this._isMe ? this._actCampMeOrEnemy(this.myCampNode, this.enemyCampNode) : this._actCampMeOrEnemy(this.enemyCampNode, this.myCampNode);
        }
    },
    _actRedOrBlue(node, moveToLeft) {
        node.stopAllActions();
        this._rebackAnchor(node);
        node.opacity = 0;
        node.scaleX = 1/19;
        this._setSPFRound(node);
        node.runAction(cc.sequence(
            cc.spawn(cc.fadeIn(5/LGConfig.AniFps), cc.scaleTo(5/LGConfig.AniFps, 1, 1)),
            cc.moveBy(7/LGConfig.AniFps, cc.v2(moveToLeft ? -15 : 15, 0)),
            cc.callFunc(()=>{
                this._changeAnchor(node);
                let frameSize = cc.view.getFrameSize();
                let goalX = frameSize.width*0.5+node.width;
                let moveX = moveToLeft ? -goalX : goalX;
                node.runAction(cc.spawn(cc.moveTo(3/LGConfig.AniFps, cc.v2(moveX, node.y)), cc.scaleTo(3/LGConfig.AniFps, 1/19, 1)));
            }),
        ));
    },
    _rebackAnchor(node) {
        if (LGTools.isInvalid(node._bornX)) {
            node._bornX = node.x;
            node._bornAnchorX = node.anchorX;
        }
        node.x = node._bornX;
        node.anchorX = node._bornAnchorX;
        LGTools.updateAllWidget(node);
    },
    _changeAnchor(node) {
        let nextAnchorX = node._bornAnchorX>0.5 ? 0 : 1;
        node.x = node._bornX+(nextAnchorX-node._bornAnchorX)*node.width;
        node.anchorX = nextAnchorX;
        LGTools.updateAllWidget(node);
    },
    _setSPFRound(node) {
        node.getChildByName("whoRound").getComponent(cc.Sprite).spriteFrame = this.roundRes[this._isMe ? 0 : 1];
    },
    _setCampColor(node) {
        node.getChildByName("bg").color = this.myResSrc.colorCamp[this._isRed ? 0 : 1];
    },
    _actCampMeOrEnemy(node, nodeNo) {
        this._setCampColor(node);
        nodeNo.opacity = 0;
        node.opacity = 255;
        node.scaleX = 0.05;
        node.stopAllActions();
        node.runAction(cc.scaleTo(5/LGConfig.AniFps, 1));
    },
}

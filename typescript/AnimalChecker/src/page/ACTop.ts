import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACTop")
export default class ACTop extends cc.Component {
    @property(cc.Node)
    public myRes: cc.Node = null;

    @property(cc.Sprite)
    public spWhoAmI: cc.Sprite = null;

    @property({type:[cc.SpriteFrame],tooltip:"我是xx:依次为红、蓝"})
    public spfWhoAmI: cc.SpriteFrame[] = [];

    @property(cc.Node)
    public vsNode: cc.Node = null;

    @property(cc.Node)
    public clockNode: cc.Node = null;

    @property(cc.Label)
    public dueTimeLabel: cc.Label = null;

    @property(cc.Node)
    public topMe: cc.Node = null;

    @property(cc.Node)
    public topEnemy: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.myResSrc = this.myRes.getComponent("ACChessRes");
        this.selfNodeSrc = this.topMe.getComponent("roleNode");
        this.selfEnemySrc = this.topEnemy.getComponent("roleNode");
        this.hideAllState();
    }
    start() {
        this._dueTime = 0;
        this._bolUpdateLabel = false;
    }
    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }

    // update (dt) {}
    setSelfNodeInfo(data){
        this.selfNodeSrc.setRoleData(data);
    };
    setOtherNodeInfo(data){
        this.selfEnemySrc.setRoleData(data);
    };
    initRoleInfo(){
        this.setSelfNodeInfo(LGModel.roomSelfRoleInfo);
        this.setOtherNodeInfo(LGModel.roomOtherRoleInfo);
    };
   
    update(dt) {
        if (this._bolUpdateLabel) {
            this._setTimeForLabel();
        }
    };
    hideAllState() {
        this.spWhoAmI.spriteFrame = null;
        this.vsNode.opacity = 0;
        this.clockNode.opacity = 0;
        this._bolUpdateLabel = false;
    };
    updateAllState() {
        let isStart = LGModel.roomData.game_status>LGConfig.GameStatus.Wait;
        this.spWhoAmI.spriteFrame = isStart ? this.spfWhoAmI[LGModel.getMainSvrSeatId()] : null;
        this.vsNode.opacity = isStart ? 255 : 0;
        this.clockNode.opacity = isStart ? 255 : 0;
        this._setHeadFrameColor(this.topMe, LGModel.getMainSvrSeatId());
        this._setHeadFrameColor(this.topEnemy, 1-LGModel.getMainSvrSeatId());
    };
    actWhenStart(dueTime, callBack) {
        this._actMyCamp();
        this._actVSAndClock();
        this.showClockTime(dueTime);
        if ("function"===typeof callBack) {
            LGTools.callDelay(this.node, 4/LGConfig.AniFps, callBack);
        }
    };
    showClockTime(dueTime) {
        this._dueTime = dueTime*1000;
        this._bolUpdateLabel = true;
        this._setTimeForLabel();
    };

    _actMyCamp() {
        this.spWhoAmI.spriteFrame = this.spfWhoAmI[LGModel.getMainSvrSeatId()];
        this.spWhoAmI.node.scale = 3.5;
        this.spWhoAmI.node.runAction(cc.scaleTo(4/LGConfig.AniFps, 1));
    };
    _actVSAndClock() {
        this.vsNode.runAction(cc.fadeIn(4/LGConfig.AniFps));
        this.clockNode.runAction(cc.fadeIn(4/LGConfig.AniFps));
    };
    _setTimeForLabel() {
        let time = LGTools.getCountDown(this._dueTime, LGTools.getLocalTime());
        this.dueTimeLabel.string = time;
    };
    _setHeadFrameColor(node, who) {
        node.getChildByName("head").getChildByName("frame").color = this.myResSrc.colorCamp[who===LGConfig.CampType.Red ? 0 : 1];
    };
}

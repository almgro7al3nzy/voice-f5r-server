import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
import { Logic } from "../../../../../framework/src/logic/logic";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACOverCenter")
export default class ACOverCenter extends cc.Component {
    @property(cc.Node)
    public roleRed: cc.Node = null;

    @property(cc.Node)
    public roleBlue: cc.Node = null;

    @property(cc.RichText)
    public progressRich: cc.RichText = null;

    @property(cc.ProgressBar)
    public progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    public levelLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.roleRedSrc = this.roleRed.getComponent("roleNode");
        this.roleBlueSrc = this.roleBlue.getComponent("roleNode");
        this._initData();
        this._showOldData();
        this._actIfAddCurScore();
        this._actIfLevelup();
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
    _initData() {
        let myOldInfo = LGModel.roomSelfRoleInfo;
        let myNewInfo = null;
        let otherInfo = null;
        if(LGModel.gameOverInfo.FailPlayer[1].OpenID === Logic.OpenId){
            myNewInfo = LGModel.gameOverInfo.FailPlayer[1];
            myNewInfo.ShowHat = false;
            myNewInfo.AddScore = '-10000';
            myNewInfo.AddGold = '-10000';
        }else {
            otherInfo = LGModel.gameOverInfo.FailPlayer[1];
            otherInfo.ShowHat = false;
            otherInfo.AddScore = '-10000';
            otherInfo.AddGold = '-10000';
            };
        if(LGModel.gameOverInfo.SuccPlayer[1].OpenID === Logic.OpenId){
            myNewInfo = LGModel.gameOverInfo.SuccPlayer[1];
            myNewInfo.ShowHat = true;
            myNewInfo.AddScore = '+10000';
            myNewInfo.AddGold = '+10000'
        }else {
            otherInfo = LGModel.gameOverInfo.SuccPlayer[1];
            otherInfo.ShowHat = true;
            otherInfo.AddScore = '+10000';
            otherInfo.AddGold = '+10000';
            };

        let mySeatId = LGModel.getMainSvrSeatId();
        if(mySeatId===LGConfig.CampType.Red){
            this.roleRedSrc.setRoleData(myNewInfo);
            this.roleBlueSrc.setRoleData(otherInfo);
        }else{
            this.roleRedSrc.setRoleData(otherInfo);
            this.roleBlueSrc.setRoleData(myNewInfo); 
        }

        this._oldLevel = LGTools.randomInt(0, 20);
        this._newLevel = this._oldLevel;
        this._oldCurScore = 30;
        this._newCurScore = this._oldCurScore;
        this._oldMaxScore = 50;
        this._newMaxScore = this._oldMaxScore;

        let num = LGModel.roomData.over_num;
        let mysvrId = LGModel.getMainSvrSeatId();
        if ((num===LGConfig.OverType.Red && mysvrId===LGConfig.CampType.Red) || (num===LGConfig.OverType.Blue && mysvrId===LGConfig.CampType.Blue)) {
            // 我赢了
            this._newCurScore = 40;
            this._newLevel += LGTools.randomInt(0, 1);
            if (this._newLevel>this._oldLevel) {
                // 有升级
                this._newMaxScore = 60;
            }
        }
    };
    _showOldData() {
        this.levelLabel.string = `LV.${this._oldLevel}`;
        this._setProgress(this._oldCurScore, this._oldMaxScore);
    };
    _setProgress(cur, max) {
        this.progressBar.progress = cur/max;
        this.progressRich.string = `<color=#CA1EB1>${cur}</c><color=#000000>/${max}</color>`
    };
    _actIfAddCurScore() {
        if (this._newLevel===this._oldLevel && this._newCurScore>this._oldCurScore) {
            this._actProgress(this._oldCurScore, this._newCurScore, Math.max(1, Math.floor(this._oldMaxScore*0.1)), this._oldMaxScore);
        }
    };
    _actIfLevelup() {
        // 25帧开始跑
        if (this._newLevel>this._oldLevel) {
            LGTools.callDelay(this.node, 24/LGConfig.AniFps, () => {
                this._actProgress(this._oldCurScore, this._oldMaxScore, Math.max(1, Math.floor(this._oldMaxScore*0.1)), this._oldMaxScore, ()=>{
                    this._actProgress(0, this._newCurScore, Math.max(1, Math.floor(this._newMaxScore*0.1)), this._newMaxScore);
                    this._actLabelLevel();
                });
            });
        }
    };
    _actProgress(cur, max, add, progressMax, callEnd) {
        this._tempCur = cur;
        LGTools.callScheduler(this.progressBar.node, 1/LGConfig.AniFps, () => {
            this._tempCur+=add;
            if (this._tempCur>max) {
                this._tempCur = max;
            }
            this._setProgress(this._tempCur, progressMax);
            if (this._tempCur===max) {
                this.progressBar.node.stopAllActions();
                typeof callEnd === "function" && callEnd();
            }
        });
    };
    _actLabelLevel() {
        // 4帧完成动画 有变动的数字下去 新数字从上面掉回原位
        // 分成三部分: 不变的 变前 变后
        let changeNo = "LV.";
        let changeBf = "";
        let changeAf = "";
        let strOld = this._oldLevel.toString();
        let strNew = this._newLevel.toString();
        let i = 0;
        let charO = "";
        let charN = "";
        while (++i) {
            charO = strOld.charAt(i-1);
            charN = strNew.charAt(i-1);
            if (charO===charN) {
                changeNo += charO;
            } else {
                changeBf += charO;
                changeAf += charN;
            }
            if (charO.length===0 && charN.length===0) {
                break;
            }
        }
        this.levelLabel.string = changeNo;
        this._cloneAndActLabel(changeBf, false);
        this._cloneAndActLabel(changeAf, true);
    };
    _cloneAndActLabel(char, isAfter) {
        if (char.length===0) {
            return;
        }
        let labelNode = this.levelLabel.node;
        let moveH = labelNode.height*1.5;
        let node = cc.instantiate(labelNode);
        node.x = labelNode.x+labelNode.width;
        node.y = labelNode.y;
        node.parent = labelNode.parent;
        node.getComponent(cc.Label).string = char;
        if (isAfter) {
            node.y += moveH;
            node.opacity = 0;
            node.runAction(cc.spawn(
                cc.fadeIn(4/LGConfig.AniFps),
                cc.moveBy(4/LGConfig.AniFps, cc.v2(0, -moveH)),
            ));
        } else {
            node.opacity = 255;
            node.runAction(cc.spawn(
                cc.fadeOut(4/LGConfig.AniFps),
                cc.moveBy(4/LGConfig.AniFps, cc.v2(0, -moveH)),
            ));
        }
    };
}

import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
import {LGAudio} from "../logic/littleGameAudio";
import {LGListener} from "../logic/littleGameListener";
import { Logic } from "../../../../../framework/src/logic/logic";
import { EventMessage } from "../../../../../framework/src/events";
import { EventCustom } from "../../../../../framework/src/core/eventCustom";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACMarryPlayer")
export default class ACMarryPlayer extends cc.Component {
    @property(cc.Node)
    public role1: cc.Node = null;

    @property(cc.Node)
    public role2: cc.Node = null;

    @property([cc.Node])
    public role1PosNode: cc.Node[] = [];

    @property([cc.Node])
    public role2PosNode: cc.Node[] = [];

    @property(cc.Label)
    public title: cc.Label = null;

    @property(cc.Label)
    public slogan: cc.Label = null;

    @property(cc.Label)
    public tips: cc.Label = null;

    @property(cc.Node)
    public circle: cc.Node = null;

    @property(cc.Node)
    public statuVs: cc.Node = null;

    @property(cc.Node)
    public statuSuccess: cc.Node = null;

    @property(cc.Node)
    public statuFail: cc.Node = null;

    @property(cc.Node)
    public statuIng: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.role1Src = this.role1.getComponent("roleNode");
        this.role2Src = this.role2.getComponent("roleNode");
        this._changeStatu(0);
        this.role2Src.setRoleData(Logic.userInfo[1]);
        let self = this;
        // 匹配结果
        EventCustom.on('S2GWS_PlayerChooseGameMode',(data)=>{
            self.scheduleOnce(function(){
                if(data.RoomUID !== null){
                    LGModel.roomUID = data.RoomUID;
                    let players = data.MatchPlayer[data.RoomUID].RoomPlayerMap;
                    for (let key in players) {
                        if (players.hasOwnProperty(key)) {
                            let element = players[key];
                            if(key !== Logic.OpenId){
                                self.role1Src.setRoleData(element);
                                LGModel.roomOtherRoleInfo = element;
                            }else if(key === Logic.OpenId){
                                LGModel.roomSelfRoleInfo = element;
                            }
                        }
                    }
                    self._changeStatu(2);
                }
            },1);
        },self);
        EventCustom.on('S2GWS_QuitMatch',(data)=>{
            self.scheduleOnce(function(){
                if(data.ResultID === 1){// 1表示成功； 0：表示失败
                    //进入大厅
                    EventCustom.emit(EventMessage.EXIT_SUB_GAME_SCENE);
                    return
                }
                // 提示失败
            },0.5);
        },self);
    }
    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }
    // update (dt) {}

    onClickReturn(){
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_QuitMatch',{});
    };
    _connectEnterGame(){
        LGListener.requestAC_enterRoom();
        this.node.destroy();
    };
    _changeStatu(statu){
        let _hideCircle = ()=>{
            this.circle.stopAllActions();
            this.circle.active = false;
        };
        switch (statu) {
            case 0:{        // 匹配阶段
                this.statuVs.active = false;
                this.statuSuccess.active = false;
                this.statuFail.active = false;
                this.statuIng.active = true;
                this.circle.active = true;
                this.circle.runAction(cc.repeatForever(cc.rotateBy(1/LGConfig.AniFps, 5)));
                break ;
            }
            case 1:{ // 匹配成功
                this.statuVs.active = true;
                this.statuSuccess.active = false;
                this.statuFail.active = false;
                this.statuIng.active = false;
                _hideCircle();
                this.statuVs.scale = 3;
                this.statuVs.opacity = 30;
                let self = this;
                this.statuVs.runAction(cc.sequence(cc.delayTime(1/LGConfig.AniFps),
                        cc.spawn(cc.fadeIn(15/LGConfig.AniFps),cc.scaleTo(15/LGConfig.AniFps,1)),
                        cc.callFunc(()=>{self._changeStatu(2);})));
                break ;
            }
            case 2:{ //
                this.statuVs.active = false;
                this.statuSuccess.active = true;
                this.statuFail.active = false;
                this.statuIng.active = false;
                _hideCircle();
                this.role1Src.flyToNode(this.role1PosNode);
                this.role2Src.flyToNode(this.role2PosNode);
                this.scheduleOnce(this._connectEnterGame,2);
                break ;
            }
            case 3:{ // 匹配失败
                this.statuVs.active = false;
                this.statuIng.active = false;
                this.statuSuccess.active = false;
                this.statuFail.active = true;
                _hideCircle();
                EventCustom.emit(EventMessage.SHOW_SIMPLE_TIPS_MSG,LGConfig.TIP_MATCH_FAIL_RETRUN);
                LGModel.msgTipContent = LGConfig.TIP_MATCH_FAIL_RETRUN;
                LGTools.openPage("games/AnimalChecker/res/prefabs/ACMsgTip");
                let self = this;
                this.scheduleOnce(function(){
                    this.node.destroy();
                },3);
            }
        }
    }
}

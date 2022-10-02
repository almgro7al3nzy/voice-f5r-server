import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
import {LGAudio} from "../logic/littleGameAudio";
import {LGListener} from "../logic/littleGameListener";
import {ACGuideManager} from "./ACGuideManager";
import { EventMessage } from "../../../../../framework/src/events";
import { EventCustom } from "../../../../../framework/src/core/eventCustom";
const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACGame")
export default class ACGame extends cc.Component {
    @property(cc.Prefab)
    public ACMain: cc.Prefab = null;

    @property(cc.Prefab)
    public ACDoTip: cc.Prefab = null;

    @property(cc.Prefab)
    public ACWait: cc.Prefab = null;

    @property(cc.Prefab)
    public ACTop: cc.Prefab = null;

    @property(cc.Prefab)
    public ACTip: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._addPrefabs();
        this.registerEvent();
        LGTools.callDelay(this.node, 0.1, this.initSceneWithData.bind(this));
        ACGuideManager.init();
    }
    
    start () {

    }
    onDisable(){
        this.unregisterEvent();
    }
    // 注册
    public registerEvent(){
        LGTools.addNodeEventListener("ACGetRoomNews", this.onGetRoomNews, this);
        LGTools.addNodeEventListener("ACGetRoomEvent", this.onGetRoomEvent, this);
        LGTools.addNodeEventListener("ACRecvRoomData", this.initSceneWithData, this);
        LGTools.addNodeEventListener("ClickLeaveScene", this.onSceneBack, this);
    };
    // 取消注册
    public unregisterEvent(){
        LGTools.removeNodeEventListener("ACGetRoomNews", this.onGetRoomNews, this);
        LGTools.removeNodeEventListener("ACGetRoomEvent", this.onGetRoomEvent, this);
        LGTools.removeNodeEventListener("ACRecvRoomData", this.initSceneWithData, this);
        LGTools.removeNodeEventListener("ClickLeaveScene", this.onSceneBack, this);
    };
    _addPrefabs() {
        if (this.ACMain) {
            let node = cc.instantiate(this.ACMain);
            this.node.addChild(node);
            this._ACMain = node.getComponent("ACMain");
        }
        if (this.ACDoTip) {
            let node = cc.instantiate(this.ACDoTip);
            this.node.addChild(node);
            this._ACDoTip = node.getComponent("ACDoTip");
        }
        if (this.ACWait) {
            let node = cc.instantiate(this.ACWait);
            this.node.addChild(node);
            this._ACWait = node.getComponent("ACWait");
        }
        if (this.ACTop) {
            let node = cc.instantiate(this.ACTop);
            this.node.addChild(node);
            this._ACTop = node.getComponent("ACTop");
        }
        if (this.ACTip) {
            let node = cc.instantiate(this.ACTip);
            this.node.addChild(node);
            this._ACTip = node.getComponent("ACTip");
        }
    }

    initSceneWithData() {
        LGTools.dispatchNodeEvent("ACCloseOverPage");
        this._ACMain.updateAllGrid();
        this._ACTop.initRoleInfo();
        this._ACTop.updateAllState();
        this._ACDoTip.updateAllState();
    };

    onSceneBack() {
        let parent = cc.find("Canvas/gameNode");
        let children = parent.children;
        for (var i = 0; i < children.length; i++) {
            children[i].removeFromParent();
        }
        parent.removeAllChildren();
        parent.destroyAllChildren();
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_QuitMatch',{});
        EventCustom.emit(EventMessage.EXIT_SUB_GAME_SCENE);
    };
    onGetRoomNews(msg) {
        if (msg && msg.length>0) {
            this._ACTip.showTip(msg);
        }
    };
    showTip(action,delay,num){
        this._ACDoTip.showTip(action, delay, num);
    };
    onGetRoomEvent(data) {
        // 再处理当前操作
        let status = LGModel.roomData.game_status;
        switch (status) {
            case LGConfig.GameStatus.Wait:
                if (!this._ACWait.isDouziActing()) {
                    this._ACWait.actDouzi();
                }
                break;
            case LGConfig.GameStatus.Start:
                let self = this;
                if (LGTools.isValid(data.game_status)) {
                    this._ACWait.stopDouzi();
                    LGModel.pageStartCallBack = ()=>{
                        self._ACTop.actWhenStart(data.action_dead_line, ()=>{
                            self._onStart(data, 0);
                        });
                    };
                    LGTools.openPage("games/AnimalChecker/res/prefabs/ACPageStart");
                } else {
                    self._onStart(data, 1);
                }
                break;
            case LGConfig.GameStatus.Settlement:
                if (LGTools.isValid(data.game_status)) {
                    let delayTip = this._doDealPlayerAction(data);
                    LGTools.callDelay(this.node, delayTip, this._PopOverUI.bind(this));
                }
                break;
            default:
                break;
        }
    };
    _onStart(data, showNum) {
        let delayTip = this._doDealPlayerAction(data);
        this._ACMain.promptAllCando(data.action_position, delayTip);
        this._ACDoTip.showTip(data.action_position, delayTip, showNum);
        this._ACTop.showClockTime(data.action_dead_line);
    };
    _doDealPlayerAction(data) {
        let delayTip = 0;
        if (data.player_action) {
            let at = data.player_action.action;
            switch (at) {
                case LGConfig.ActionType.Open:
                    delayTip = LGConfig.timeOpenDelay;
                    this._ACMain.doTurnChess(data.player_action.list_data[0], data.player_action.list_data[1]);
                    break;
                case LGConfig.ActionType.Move:
                    delayTip = LGConfig.timeMoveDelay;
                    this._ACMain.doMoveChess(data.player_action.list_data[0], data.player_action.list_data[1]);
                    break;
                case LGConfig.ActionType.Eat:
                    delayTip = LGConfig.timeEatDelay;
                    this._ACMain.doEatChess(data.player_action.list_data[0], data.player_action.list_data[1]);
                    break;
                default:
                    break;
            }
        }
        return delayTip;
    };
    _PopOverUI() {
        let str = "ACOverSame";
        let num = LGModel.roomData.over_num;
        if (num===LGConfig.OverType.Ping) {
            str = "ACOverSame";
        } else if (num===LGConfig.OverType.Red) {
            if (LGModel.getMainSvrSeatId()===LGConfig.CampType.Red) {
                str = "ACOverSuccess";
            } else {
                str = "ACOverFail";
            }
        } else if (num===LGConfig.OverType.Blue) {
            if (LGModel.getMainSvrSeatId()===LGConfig.CampType.Red) {
                str = "ACOverFail";
            } else {
                str = "ACOverSuccess";
            }
        }
        LGTools.openPage("games/AnimalChecker/res/prefabs/"+str);
    };
}

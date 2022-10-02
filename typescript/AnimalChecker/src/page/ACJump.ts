/* 
* ACJump
* 斗兽棋跳转
*/
import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
import {LGListener} from "../logic/littleGameListener";
import { EventMessage } from "../../../../../framework/src/events";
import { EventCustom } from "../../../../../framework/src/core/eventCustom";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACJump")
export default class ACJump extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    BtnHeadClicked(event){
        let userId = event.target._userId;
        cc.log("userId", userId);
    }
    /**
     * 认输
     */
    btnRenshu () {
        LGModel.msgBoxContent = LGConfig.TIP_GIVEUP;
        LGModel.msgBoxFunOk = () => {
            LGListener.requestAC_Action(LGConfig.ActionType.Giveup);
        };
        LGModel.msgBoxFunNo = null;
        LGModel.msgBoxFunClose = null;
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACMsgBox");
    }
    /**
     * 帮助
     */
    btnHelp() {
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACPageRule");
    }
    /**
     * 炫耀分享
     */
    btnShare () {
    }
    /**
     * 再来一局
     */
    btnAgain () {
        let parent = cc.find("Canvas/gameNode");
        let children = parent.children;
        for (var i = 0; i < children.length; i++) {
            children[i].removeFromParent();
        }
        parent.removeAllChildren();
        parent.destroyAllChildren();
        LGTools.dispatchNodeEvent("ACCloseOverPage");
        let roomId = cc.sys.localStorage.getItem("GameRoomID");
        let roomType = cc.sys.localStorage.getItem("GameRoomType");
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACMarryPlayer")
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_PlayerChooseGameMode',{Itype:roomType,RoomID:''+roomId});
    }
    /**
     * 退出场景(有提示框)
     */
    btnLeaveSceneWithMsgBox () {
        LGModel.msgBoxContent = LGConfig.TIP_EXIT_AC;
        LGModel.msgBoxFunOk = () => {
            LGListener.requestAC_Action(LGConfig.ActionType.Giveup);
        };
        LGModel.msgBoxFunNo = null;
        LGModel.msgBoxFunClose = null;
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACMsgBox");
    }
    /**
     * 退出场景
     */
    btnLeaveScene () {
        LGTools.dispatchNodeEvent("ClickLeaveScene");
    }
}

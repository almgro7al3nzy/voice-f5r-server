/**
 * 新手指引
 */
import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
class GuideManager{
    private static _instance:GuideManager = null;
    public static getInstance():GuideManager{
        if (GuideManager._instance === null)
            GuideManager._instance = new GuideManager();
        return GuideManager._instance;
    };
    public init() {
        GuideManager._instance._tipEat = !!cc.sys.localStorage.getItem("ACIsGuideEat"); //是否指引过吃棋
        GuideManager._instance._tipMove = !!cc.sys.localStorage.getItem("ACIsGuideMove"); //是否指引过行棋
        GuideManager._instance._tipOpen = !!cc.sys.localStorage.getItem("ACIsGuideOpen"); //是否指引过翻棋
        GuideManager._instance._guideWho = 0; //当前在指引谁。定义:0没指引 1eat 2move 3open
    },
    //标记指引成功//
    public guideEatSuccess() {
        if (GuideManager._instance._guideWho===1) {
            GuideManager._instance._tipEat = true;
            cc.sys.localStorage.setItem("ACIsGuideEat", true);
        }
    };
    public guideMoveSuccess() {
        if (GuideManager._instance._guideWho===2) {
            GuideManager._instance._tipMove = true;
            cc.sys.localStorage.setItem("ACIsGuideMove", true);
        }
    };
    public guideOpenSuccess() {
        if (GuideManager._instance._guideWho===3) {
            GuideManager._instance._tipOpen = true;
            cc.sys.localStorage.setItem("ACIsGuideOpen", true);
        }
    };
    //检测指引//
    public checkGuideEat(pos) {
        GuideManager._instance._guideWho = 0;
        if (GuideManager._instance._tipEat) {
            return false;
        }
        return LGTools.haveEatChessByPos(LGModel.roomData.chess_data, pos);
    };
    public checkGuideMove(pos) {
        GuideManager._instance._guideWho = 0;
        if (GuideManager._instance._tipMove) {
            return false;
        }
        // 吃棋>行棋
        if (LGTools.haveEatChessByPos(LGModel.roomData.chess_data, pos)) {
            return false;
        }
        return LGTools.canMoveThisPos(LGModel.roomData.chess_data, pos);
    };
    public checkGuideOpen() {
        GuideManager._instance._guideWho = 0;
        if (GuideManager._instance._tipOpen) {
            return false;
        }
        return LGTools.haveNoOpenChess(LGModel.roomData.chess_data);
    };
    //返回指引位置//
    public getGuideEatPos(pos) {
        GuideManager._instance._guideWho = 1;
        let chessData = LGModel.roomData.chess_data;
        let aryPosNum = LGTools.findAllCanEatByPos(chessData, pos, chessData[pos]);
        // 若同时出现2个及两个以上可吃的棋子时，则，按照食物链的大小顺序进行提示吃棋
        if (aryPosNum.length>1) {
            aryPosNum.sort((infoA, infoB) => {
                return infoA.num%10-infoB.num%10;
            });
        }
        return aryPosNum[0].pos;
    };
    public getGuideMovePos(pos) {
        GuideManager._instance._guideWho = 2;
        let aryToPos = LGTools.findAllMoveBlankByPos(LGModel.roomData.chess_data, pos);
        // 有多个可移动的空地时,排除有威胁的位置;还有多个则随机
        if (aryToPos.length>1) {
            let newAry = [];
            let chessData = LGModel.roomData.chess_data;
            let chessNum = chessData[pos];
            for (let i = 0; i < aryToPos.length; i++) {
                if (!LGTools.willBeEatenIfGoThere(chessData, aryToPos[i], chessNum)) {
                    newAry.push(aryToPos[i]);
                }
            }
            if (newAry.length===0) {
                newAry = aryToPos;
            }
            if (newAry.length>1) {
                return newAry[LGTools.randomInt(0, newAry.length-1)];
            }
            return newAry[0];
        }
        return aryToPos[0];
    };
    public getGuideOpenPos() {
        GuideManager._instance._guideWho = 3;
        // 随机提示一个可翻的棋子
        let blank = LGTools.findNoOpenChess(LGModel.roomData.chess_data);
        return blank[LGTools.randomInt(0, blank.length-1)];
    },

};
export const ACGuideManager:GuideManager = GuideManager.getInstance();
import { ResMgr } from "../../../../../framework/src/core/resourcesMgr";
import { EventCustom } from "../../../../../framework/src/core/eventCustom";
import { EventMessage , EventSocket } from "../../../../../framework/src/events";
import { Logic } from "../../../../../framework/src/logic/logic";
import {LGTools} from "./littleGameTool";
import {LGModel} from "./littleGameModel";
import {LGConfig} from "./littleGameConfig";
/**
 * 小游戏监听
 */
class Listener{
    private static _instance:Listener = null;
    private static _isReg:boolean = false;
    public static getInstance():Listener{
        if (Listener._instance === null)
            Listener._instance = new Listener();
        return Listener._instance;
    };
    //发送数据到服务器
    public sendMsgToSvr(cmd,data){
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,cmd,{
            PlayerUID:_info.uid,
            PlayerName:_info.name,
            HeadUrl:_info.head,
            Constellation:_info.constellation,
            PlayerSchool:_info.school,
            Sex:''+_info.sex
        });
    };
    // 注册
    public registerEvent(){
        EventCustom.on("S2GWS_PlayerGameInit", Listener._instance.recvAC_enterRoom, cc.game._persistNode);
        EventCustom.on("S2GWS_PlayerRelinkGame", Listener._instance.recvtAC_GameRelink, cc.game._persistNode);
        EventCustom.on("S2GWS_PlayerStirChess", Listener._instance.ntcAC_ChessOpen, cc.game._persistNode);
        EventCustom.on("S2GWS_PlayerMoveChess", Listener._instance.ntcAC_ChessMove, cc.game._persistNode);
        EventCustom.on("BroadCast_GameOver", Listener._instance.ntcAC_GameOver, cc.game._persistNode);
        EventCustom.on("BroadCast_GameHint", Listener._instance.ntcAC_GameHint, cc.game._persistNode);
       
    };
    // 取消注册
    public unregisterEvent(){
        EventCustom.off("S2GWS_PlayerGameInit", cc.game._persistNode);
        EventCustom.off("S2GWS_PlayerRelinkGame", cc.game._persistNode);
        EventCustom.off("S2GWS_PlayerStirChess", cc.game._persistNode);
        EventCustom.off("S2GWS_PlayerMoveChess", cc.game._persistNode);
        EventCustom.off("BroadCast_GameOver", cc.game._persistNode);
        EventCustom.off("BroadCast_GameHint", cc.game._persistNode);
    };
    //发送带房间UID的消息
    public _sendWithOpenRoomID(cmd:string, data:Object):void{
        data = data || {};
        data.RoomUID = LGModel.roomUID;
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,cmd, data);
    };
    //////转换//////
    /**
     *  转换位置概念
     *  客户端pos:用数字0到15表示 如下:
     *    12,13,14,15
     *    8 ,9 ,10,11
     *    4 ,5 ,6 ,7
     *    0 ,1 ,2 ,3
     *  服务端pos:二位数组x,y 用string表示如下:
     *    [0,0],[1,0],[2,0],[3,0]
     *    [0,1],[1,1],[2,1],[3,1]
     *    [0,2],[1,2],[2,2],[3,2]
     *    [0,3],[1,3],[2,3],[3,3]
     */
    public _transPosC2S(clientPos) {
        let cx = clientPos%4;
        let cy = Math.floor(clientPos/4);
        let sy = 3-cy;
        return `${cx},${sy}`;
    };
    public _transPosS2C(serverPos) {
        let ary = serverPos.split(",");
        return Listener._instance._transPosXYS2C(parseInt(ary[0]), parseInt(ary[1]));
    };
    public _transPosXYS2C(sx, sy) {
        let cy = 3-sy;
        return sx+cy*4;
    };
    /**
     *  转换棋子数字概念
     *  客户端num:
     *    定义个位数数字8-1表示 象>狮>虎>豹>狼>狗>猫>鼠
     *    定义十位数数字0-1表示 红、蓝阵营
     *    最终定义数字:0未翻开 1-8和11-18表示棋子 -1表示没有棋子
     *  服务端num
     *    0表示空 1-8 A方，9-16 B方 17 未翻牌
     *    1大象 2狮子 3老虎 4豹子 5狼 6狗 7猫 8老鼠
     */
    public _transNumS2C(serverNum) {
        if (serverNum===0) {
            return LGConfig.NoChess;
        } else if (serverNum<=8) {
            return 9-serverNum;
        } else if (serverNum>8) {
            return 27-serverNum;
        }
    };
    /**
     * 获取to在from的方位
     * 服务器定义:移动的方向: UP==1, DOWN==2, LEFT==3, RIGHT==4
     */
    public _getMoveDir(clientFromPos, clientToPos) {
        // 向上
        if (clientToPos===clientFromPos+4) {
            return 1;
        }
        // 向下
        if (clientToPos===clientFromPos-4) {
            return 2;
        }
        // 向左
        if (clientToPos===clientFromPos-1) {
            return 3;
        }
        // 向右
        if (clientToPos===clientFromPos+1) {
            return 4;
        }
    };
    /**
     * 转换棋盘数据
     */
    public _transChessDataS2C(data) {
        data.chess_data = [];
        for (let x = 0; x < data.ChessBoard.length; x++) {
            let list = data.ChessBoard[x];
            for (let y = 0; y < list.length; y++) {
                data.chess_data[Listener._instance._transPosXYS2C(x, y)] = Listener._instance._transNumS2C(list[y]);
            }
        }
    };
    /**
     * 初始客户端棋盘数据
     */
    public _initChessData(data) {
        data.chess_data = [];
        for (let i = 0; i < 16; i++) {
            data.chess_data[i] = LGConfig.NoOpen;
        }
    };
    /**
     * 转换重连进桌数据
     */
    public _transRelinkRoomDataS2C(data) {
        data.mySvrSeatId = data.SeatNum; //服务器座位id定义:
        // 根据服务器一些信息得知客户端当前游戏状态
        data.game_status = LGConfig.GameStatus.Start;
        Listener._instance._transChessDataS2C(data);
    };
    /**
     * 转换进桌数据
     */
    public _transInitRoomDataS2C(data) {
        data.roundCnt = 0
        data.mySvrSeatId = data.SeatNum; //服务器座位id定义:
        data.game_status = LGConfig.GameStatus.Wait;
        Listener._instance._initChessData(data);
        // 默认让SeatNum为0者开始操作
        LGTools.callDelay(cc.game._persistNode, 1, Listener._instance.enterStart);
    },
    public enterStart() {
        LGModel.roomData.roundCnt = 0;
        Listener._instance.ntcAC_RoomEvent({
            game_status: LGConfig.GameStatus.Start,
            action_position: 0,
            action_dead_line: Math.floor((LGTools.getLocalTime() + 30000)/1000),
        });
    };
    public enterSettlement(overNum) {
        Listener._instance.ntcAC_RoomEvent({
            game_status: LGConfig.GameStatus.Settlement,
            over_num: overNum,
        });
    };
    // 判断游戏结束
    public judgeGameOver(isEat) {
        if (isEat) {
            LGModel.roomData.roundCnt = 0;
        } else {
            LGModel.roomData.roundCnt++;
        }
        // 玩家若在7个回合内未进行吃子，则出现提示
        if (LGModel.roomData.roundCnt>=14) {
            Listener._instance.ntcAC_GameHint();
        }
        // 10回合未吃子则系统判平局
        if (LGModel.roomData.roundCnt>=20) {
            return LGConfig.OverType.Ping; //平局
        }
        let mySeatId = LGModel.getMainSvrSeatId();
        let chessData = LGModel.roomData.chess_data;
        let over = LGConfig.OverType.No;
        for (let i = 0; i < chessData.length; i++) {
            if (chessData[i]===LGConfig.NoOpen) {
                return over;
            }
        }
        let camps = LGTools.separateChessByCamp(chessData, mySeatId);
        if (camps[0].length===0 && camps[1].length===0) {
            over = LGConfig.OverType.Ping; //平局
        } else if (camps[0].length===0) {
            //当前行动方输
            over = mySeatId===LGConfig.CampType.Blue ? LGConfig.OverType.Red : LGConfig.OverType.Blue;
        } else if (camps[1].length===0) {
            //当前行动方胜
            over = mySeatId===LGConfig.CampType.Red ? LGConfig.OverType.Red : LGConfig.OverType.Blue;
        }
        if (over>LGConfig.OverType.No) {
            LGTools.callDelay(cc.game._persistNode, 1, ()=>{
                Listener._instance.enterSettlement(over);
            });
        }
    };
//////转换end//////

    // 进入游戏房间
    public requestAC_enterRoom() {
        Listener._instance._sendWithOpenRoomID("C2GWS_PlayerGameInit");
    };
    public recvAC_enterRoom(data) {
        Listener._instance._transInitRoomDataS2C(data);
        Listener._instance._enterACScene(data);
    };
    // 重新链接游戏
    public requestAC_GameRelink() {
        Listener._instance._sendWithOpenRoomID("C2GWS_PlayerRelinkGame");
    };
    public recvtAC_GameRelink(data) {
        Listener._instance._transRelinkRoomDataS2C(data);
        Listener._instance._enterACScene(data);
    };
    public _enterACScene(data) {
        LGModel.initACRoomData(data);
        LGTools.dispatchNodeEvent("ACRecvRoomData");
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACGame");
    };
    // 在我的行动时间内 发起行动指令(在 message Result 中返回发送结果)
    public requestAC_Action(action, posFrom, posTo) {
        switch (action) {
            case LGConfig.ActionType.Open:
                Listener._instance._sendWithOpenRoomID("C2GWS_PlayerStirChess", {StirPos: Listener._instance._transPosC2S(posFrom)});
                break;
            case LGConfig.ActionType.Move:
            case LGConfig.ActionType.Eat:
                Listener._instance._sendWithOpenRoomID("C2GWS_PlayerMoveChess", {OldPos: Listener._instance._transPosC2S(posFrom), MoveDir: Listener._instance._getMoveDir(posFrom, posTo)});
                break;
            case LGConfig.ActionType.Giveup:
                Listener._instance._sendWithOpenRoomID("C2GWS_PlayerGiveUp");
                break;
            default:
                break;
        }
    };
    // 通知房间事件 当玩家做出行动或者其他因素，收到的数据
    public ntcAC_RoomEvent(data) {
        LGModel.dealACEventData(data);
        LGTools.dispatchNodeEvent("ACGetRoomEvent", data)
    };
    // 广播翻棋
    public ntcAC_ChessOpen(data) {
        cc.log(data);
        let who = LGModel.roomData.action_position;
        let pos = Listener._instance._transPosS2C(data.StirPos);
        let num = Listener._instance._transNumS2C(data.ChessNum);
        Listener._instance.ntcAC_RoomEvent({
            action_position: 1-who,
            action_dead_line: Math.floor((LGTools.getLocalTime() + 30000)/1000),
            player_action: LGTools.getACAction(who, LGConfig.ActionType.Open, [pos, num]),
        });
    };
    // 广播行棋或吃棋
    public ntcAC_ChessMove(data) {
        let who = LGModel.roomData.action_position;
        let fromPos = Listener._instance._transPosS2C(data.OldPos);
        let totoPos = Listener._instance._transPosS2C(data.NewPos);
        let action = LGModel.isGridNoChess(totoPos) ? LGConfig.ActionType.Move : LGConfig.ActionType.Eat;
        Listener._instance.ntcAC_RoomEvent({
            action_position: 1-who,
            action_dead_line: Math.floor((LGTools.getLocalTime() + 30000)/1000),
            player_action: LGTools.getACAction(who, action, [fromPos, totoPos]),
        });
    };
    // 广播游戏结束
    public ntcAC_GameOver(data) {
        cc.log(data);
        LGModel.gameOverInfo = data;
        let over = LGConfig.OverType.No;
        let mySeatId = LGModel.getMainSvrSeatId();
        if(data.FailPlayer[1].OpenID === Logic.OpenId){
            over = mySeatId===LGConfig.CampType.Blue ? LGConfig.OverType.Red : LGConfig.OverType.Blue;
        }
        if(data.SuccPlayer[1].OpenID === Logic.OpenId){
            over = mySeatId===LGConfig.CampType.Red ? LGConfig.OverType.Red : LGConfig.OverType.Blue;
        }
        if(data.IsDraw){
            over = LGConfig.OverType.Ping;
        }
        Listener._instance.enterSettlement(over);
    };
    // 广播游戏提示
    ntcAC_GameHint(data) {
        LGTools.dispatchNodeEvent("ACGetRoomNews", "十回合未吃子则系统判平局")
    };

};
export const LGListener:Listener = Listener.getInstance();
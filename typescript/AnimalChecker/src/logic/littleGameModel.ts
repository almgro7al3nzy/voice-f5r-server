/**
 * 小游戏数据模板
 */
import {LGTools} from "./littleGameTool";
import {LGConfig} from "./littleGameConfig";
class Model{
    private static _instance:Model = null;
    public static getInstance():Model{
        if (Model._instance === null)
            Model._instance = new Model();
        return Model._instance;
    };
    //////////////////////数据//////////////////////
    public roomUID:string = null;//房间UID
    public roomOtherRoleInfo:Object = null;//房间类的另一个玩家
    public roomSelfRoleInfo:Object = null;//房间类的自己的信息
    public gameOverInfo:Object = null;//结算数据
    public lastData:Object = null;//保存的上一把游戏房间数据
    public reqLeave:boolean = false;//是否请求离开
    public roomData:Object = null;//游戏房间数据
    /////////////////////玩家座位相关////////////////
    // 客户端座位是0、1
    // 服务器座位是0、1
    // 但不论自己真实位置在哪，坐下后视角要在客户端的0，故转换
    //获取主视角座位对应的服务器座位(0~1)
    public getMainSvrSeatId():number {
        return Model._instance.roomData.mySvrSeatId;
    },
    public getClientSeatId(svrId:number):number {
        let mainSeatId = Model._instance.getMainSvrSeatId();
        return (svrId + 2 - mainSeatId) % 2;
    },
    // 当前是否该我操作
    public isMainHandling():boolean {
        return Model._instance.roomData.action_position === Model._instance.getMainSvrSeatId();
    },
    /////////////////////房间事件相关////////////////
    public initACRoomData(data) {
        Model._instance.roomData = data;
        Model._instance.clearSign();
    };
    // 处理房间事件数据
    public dealACEventData(data) {
        if (LGTools.isInvalid(Model._instance.roomData))
            return;
        let status = LGTools.isValid(data.game_status) ? data.game_status : Model._instance.roomData.game_status;
        Model._instance.roomData.game_status = status;
        switch (status) {
            case LGConfig.GameStatus.Wait:
                break;
            case LGConfig.GameStatus.Start:
                if (LGTools.isValid(data.game_status)) {
                    Model._instance.initChessData();
                }
                Model._instance.roomData.player_action = data.player_action;
                Model._instance.roomData.action_position = data.action_position;
                Model._instance.roomData.action_dead_line = data.action_dead_line;
                Model._instance.clearSign();
                Model._instance._dealPlayerAction(data);
                break;
            case LGConfig.GameStatus.Settlement:
                if (LGTools.isValid(data.game_status)) {
                    Model._instance.roomData.player_action = data.player_action;
                    Model._instance.roomData.over_num = data.over_num;
                    Model._instance.clearSign();
                    Model._instance._dealPlayerAction(data);
                }
                break;
            default:
                break;
        }
    };
    public _dealPlayerAction(data) {
        if (data.player_action) {
            let at = data.player_action.action;
            switch (at) {
                case LGConfig.ActionType.Open:
                    Model._instance.openOneChess(data.player_action.list_data);
                    break;
                case LGConfig.ActionType.Move:
                    Model._instance.moveOneChess(data.player_action.list_data);
                    break;
                case LGConfig.ActionType.Eat:
                    Model._instance.eatOneChess(data.player_action.list_data);
                    break;
                default:
                    break;
            }
        }
    };
    /////////////////////棋局数据相关////////////////
    public initChessData() {
        Model._instance.roomData.chess_data = [];
        for (let i = 0; i < 16; i++) {
            Model._instance.roomData.chess_data[i] = LGConfig.NoOpen;
        }
    };
    public openOneChess(listData) {
        Model._instance.roomData.chess_data[listData[0]] = listData[1];
    };
    public moveOneChess(listData) {
        let fromPos = listData[0];
        let toPos = listData[1];
        Model._instance.roomData.chess_data[toPos] = Model._instance.roomData.chess_data[fromPos];
        Model._instance.roomData.chess_data[fromPos] = LGConfig.NoChess;
    };
    public eatOneChess(listData) {
        let fromPos = listData[0];
        let toPos = listData[1];
        let fromNum = Model._instance.roomData.chess_data[fromPos];
        let toNum = Model._instance.roomData.chess_data[toPos];
        let result = LGTools.getEatResult(fromNum, toNum);
        if (result>0) {
            Model._instance.roomData.chess_data[toPos] = result===2 ? LGConfig.NoChess : fromNum;
            Model._instance.roomData.chess_data[fromPos] = LGConfig.NoChess;
        } else if (LGTools.getEatResult(toNum, fromNum)>0) {
            // 自杀
            Model._instance.roomData.chess_data[fromPos] = LGConfig.NoChess;
        }
    };
    // 这个棋子是否没有翻开
    public isChessNoOpen(pos) {
        return Model._instance.roomData.chess_data[pos] === LGConfig.NoOpen;
    };
    // 这个格子是否没有棋子
    public isGridNoChess(pos) {
        return Model._instance.roomData.chess_data[pos] === LGConfig.NoChess;
    };
    // 这个棋子是不是我的
    public isChessBelongToMe(pos) {
        let num = Model._instance.roomData.chess_data[pos];
        if (LGTools.isValid(num) && num!==LGConfig.NoOpen && num!==LGConfig.NoChess) {
            return Model._instance.getMainSvrSeatId()===Math.floor(num/10);
        }
        return false;
    };
    /////////////////////棋局数据相关////////////////
    // 清楚标记
    public clearSign() {
        Model._instance._moveFrom = -1;
        Model._instance._moveTo = -1;
    };
    public canMove() {
        if (!(Model._instance._moveFrom>=0 && Model._instance._moveFrom<=15)) {
            return false;
        }
        if (!(Model._instance._moveTo>=0 && Model._instance._moveTo<=15)) {
            return false;
        }
        if (!Model._instance.isChessBelongToMe(Model._instance._moveFrom)) {
            return false;
        }
        if (Model._instance.isChessNoOpen(Model._instance._moveTo)) {
            return false;
        }
        if (Model._instance.isGridNoChess(Model._instance._moveTo)) {
            return true;
        } else if (!Model._instance.isChessBelongToMe(Model._instance._moveTo)) {
            // 如果to有棋子 必须是敌方
            return true;
        }
        return false;
    };
    public getMoveData() {
        return [Model._instance._moveFrom, Model._instance._moveTo];
    };
    //已经被标记为from
    public isSignedFrom(pos) {
        return Model._instance._moveFrom===pos;
    };
    // 标记这个棋子为from
    public signFromChess(pos) {
        Model._instance._moveFrom = pos;
        Model._instance._moveTo = -1;
    };
    // 标记这个棋子为to
    public signToChess(pos) {
        if (Model._instance._moveFrom<0) {
            return;
        }
        // to必须在from的上下左右格
        Model._instance._moveTo = -1;
        if (LGTools.isGridNeighbour(Model._instance._moveFrom, pos)) {
            Model._instance._moveTo = pos;
        }
    };


    /////////////////////////////////////////////
    //没有提过打开界面传递数据的接口 彳亍放界面相关数据或者函数
    public msgBoxContent = null; //提示内容
    public msgBoxFunOk = null;   //ok回调
    public msgBoxFunNo = null;   //no取消回调
    public msgBoxFunClose = null;//close关闭回调
    public pageStartCallBack = null;//pageStart界面close关闭回调
    public msgTipContent = null;//misTip content类容

};
export const LGModel:Model = Model.getInstance();
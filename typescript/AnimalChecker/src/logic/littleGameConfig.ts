/**
 * 小游戏枚举配置
 */
class _Config{
    private static _instance:_Config = null;
    public static getInstance():_Config{
        if (_Config._instance === null)
            _Config._instance = new _Config();
        return _Config._instance;
    };
    public AnimalChecker:number = 10001;//游戏标识
    public timeOpenDelay:number = 0.2; //翻棋后延时多久弹出tip
    public timeMoveDelay:number = 0.6; //行棋后延时多久弹出tip
    public timeEatDelay:number = 0.6; //吃棋后延时多久弹出tip
    public timeMoveOnce:number = 0.5; //行棋所用时间
    public timeShowTip:number = 1; //提示展现时间
    public AniFps:number = 25;//统一动画帧
    public NoOpen:number = 0; //定义0表示未翻开
    public NoChess:number = -1; //定义-1表示没有棋子
    //牌局状态
    public GameStatus:cc.Enum = cc.Enum({
        Wait: 0, //等待
        Start: 1, //开局
        Settlement: 2, //结算
    });
    //操作类型
    public ActionType:cc.Enum = cc.Enum({
        Open: 1, //翻棋
        Move: 2, //行棋
        Eat: 3, //吃棋
        Giveup: 4, //认输
    });
    //阵营类型
    public CampType:cc.Enum = cc.Enum({
        Red: 0, //红
        Blue: 1, //蓝
    });
    //结束类型
    public OverType:cc.Enum = cc.Enum({
        No: 0, //未结束
        Ping: 1, //平局
        Red: 2, //红胜
        Blue: 3, //蓝胜
    });
    //格子信息描述
    public GridInfo:cc.Enum = cc.Enum({
        None: 0, //没有路
        NoChess: 1, //没有棋子的空格子
        NoOpen: 2, //没翻开的格子
        Teammate: 3, //自己人
        EnemyYes: 4, //能吃的敌人
        EnemyNo: 5, //不能吃的敌人
    });
    /////////////////////////////////////////////////////////////
    // 多语言配置先放在这里，后面有需要再调整
    public TIP_GIVEUP:string = "确认认输，你将输掉比赛";
    public TIP_EXIT_AC:sting = "退出本局记为认输，是否退出？";

};
export const LGConfig:_Config = _Config.getInstance();
/**
 * 非游戏协议定义
 * 协议体数据详见
 * https://dc.gaijiawang.org/svn/game/%E8%84%89%E8%B1%86%E7%AB%9E%E6%8A%80%E5%A4%A7%E5%8E%85/%E7%A8%8B%E5%BA%8F%E6%96%87%E6%A1%A3/%E5%8D%8F%E8%AE%AE/GateWay.go
 */

export const Protocol = {
    Gateway_cmd:{                           // 网关子协议命令
        HeartBeat:3,                        // 心跳协议
        Relink:4,                           // 断线重连
        Main:6,                             // 网关主协议命令
	    Logout:13,                          // 玩家登出
    },

    BroadCast_cmd:{                               // 广播协议
        BroadCast_GameOver:19,                    // 邮件结束
        BroadCast_GameHint:20,
        Broadcast_NoticePlayerEmail:27,           // 邮件通知
        Broadcast_MsgNoticePlayer:28,             // 消息通知
    },

    Hall_cmd:{
        C2GWS_PlayerLogin:1,                 // C2GWS_PlayerLogin == 1 登陆协议
        S2GWS_PlayerLogin:2,                 // S2GWS_PlayerLogin == 2

        // 邮件系统
        C2GWS_GetPlayerEmailList:23,         // C2GWS_GetPlayerEmailList == 23   获取邮件列表
        S2GWS_GetPlayerEmailList:24,         // S2GWS_GetPlayerEmailList == 24

        C2GWS_ReadOrDelPlayerEmail:25,       // C2GWS_ReadOrDelPlayerEmail == 25   读取或者删除
        S2GWS_ReadOrDelPlayerEmail:26        // S2GWS_ReadOrDelPlayerEmail == 26
    },

    Game_cmd:{
        C2GWS_PlayerChooseGame:5,            // C2GWS_PlayerChooseGame == 5  // 玩家选择游戏
        S2GWS_PlayerChooseGame:6,            // S2GWS_PlayerChooseGame == 6
        C2GWS_PlayerChooseGameMode:7,        // C2GWS_PlayerChooseGameMode == 7  // 玩家选择游戏模式
        S2GWS_PlayerChooseGameMode:8,        // S2GWS_PlayerChooseGameMode == 8
        C2GWS_PlayerGameInit:9,              // C2GWS_PlayerGameInit == 9  // 匹配成功后，客户端下发获取初始化牌型
        S2GWS_PlayerGameInit:10,             // S2GWS_PlayerGameInit == 10
        C2GWS_QuitMatch:11,                  // C2GWS_QuitMatch == 11 退出协议
        S2GWS_QuitMatch:12,                  // S2GWS_QuitMatch == 12
    },

    SubGame_cmd:{
        /**子游戏协议附加块 */
    }
};


function find<T>(arr:Object,val:T):any{
    if (arr !== null && arr !== undefined && arr instanceof Object)
        for (let k in arr) if (arr[k] === val) return k;

    return '';
};

// 通过key获取id
export function protocolKeyById(key:string,outside?:Object):number{
    if (outside !== null && outside !== undefined){
        if (outside.hasOwnProperty(key))
            return outside[key];
    }

    for (let k in Protocol){
        let _subs = Protocol[k];
        if (_subs.hasOwnProperty(key))
            return _subs[key];
    }

    cc.log(key+' is an undefined protocol.');
    return -1;
};
// 通过id获取key
export function protocolIdByKey(id:number,outside?:Object):string{
    let _key = find(outside,id);
    if (_key.length > 0) return _key;

    for (let k in Protocol){
        _key = find(Protocol[k],id);
        if (_key.length > 0) return _key;
    }
    cc.log(id+' is an undefined protocol.');
    return undefined;
};
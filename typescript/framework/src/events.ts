export const EventSocket={
    SOCKET_HEART_BEAT:'socket_heart_beat',                      // 心跳
    SOCKET_CONNECTED:'socket_connected',                        // 网络连接
    SOCKET_RECEIVE:'socket_receive',                            // 网络接收
    SOCKET_ERROR:'socket_error',                                // 网络错误
    SOCKET_CLOSE:'socket_close',                                // 连接关闭
    SOCKET_ENTER_ROOM:'socket_enter_room',                      // 进入房间
};

export const EventMessage={
    UPDATE_USER_INFO:'update_user_info',                        // 更新用户基础信息
    UPDATE_USER_MATCH_INFO:'update_user_match_info',            // 更新用户比赛信息
    UPDATE_USER_BACKPACK_INFO:'update_user_backpack_info',      // 更新用户背包信息
    UPDATE_USER_MAIL_INFO:'update_user_mail_info',              // 更新邮件背包信息
    ENTER_SUB_GAME_SCENE:'enter_sub_game_scene',                // 进入子游戏大厅
    EXIT_SUB_GAME_SCENE:'exit_sub_game_scene',                  // 离开子游戏大厅
    SEND_MSG_TO_SVR:'send_msg_to_svr',                          // protocol'name;userdata;block:true or false.default false.
    RECEIVE_MSG_BY_SVR: 'receive_msg_by_svr',                   // 接收到一条服务器消息
    CONNECT_EVENT:'socket_connect_event',                       // 网络连接事件
    INIT_SUB_GAME_BEGIN:'init_sub_game_begin',                  // 初始化子游戏开始
    INIT_SUB_GAME_END:'init_sub_game_end',                      // 初始化子游戏结束
    PLAY_GAME_BEGIN:'play_game_begin',                          // 开始游戏(进入游戏房间)
    PLAY_GAME_END:'play_game_end',                              // 游戏结束(离开游戏房间)
    SHOW_SIMPLE_TIPS_MSG:'show_simple_tips_msg',                // 展示一条简单tips
    INSET_SUB_PROTOCOL:'inset_sub_protocol',                    // 插入子协议
    REMOVE_SUB_PROTOCOL:'remove_sub_protocol',                  // 移除子协议
    SHOW_RED_DOT:'show_red_dot',                                // 显示小红点
    HIDE_RED_DOT:'hide_red_dot',                                // 隐藏小红点
}
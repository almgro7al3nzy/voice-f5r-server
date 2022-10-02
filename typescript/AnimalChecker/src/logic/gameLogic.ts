export const SubGameCmd = {
	C2GWS_PlayerStirChess:14,  // C2GWS_PlayerStirChessProto2 == 14   玩家翻棋子
	S2GWS_PlayerStirChess:15,  // S2GWS_PlayerStirChessProto2 == 15
	C2GWS_PlayerMoveChess:16,  // C2GWS_PlayerMoveChessProto2 == 16   玩家移动
	S2GWS_PlayerMoveChess:17,  // S2GWS_PlayerMoveChessProto2 == 17
	C2GWS_PlayerGiveUp:18,     // C2GWS_PlayerGiveUpProto2 == 18  玩家放弃、认输
	BroadCast_GameOver:19,     // BroadCast_GameOverProto2 == 19  广播玩家游戏结束
	BroadCast_GameHint:20,     // BroadCast_GameHintProto2 == 20  广播玩家第七个回合没有吃
	C2GWS_PlayerRelinkGame:21, // C2GWS_PlayerRelinkGameProto2 == 21  玩家重新链接游戏
	S2GWS_PlayerRelinkGame:22  // S2GWS_PlayerRelinkGameProto2 == 22
};

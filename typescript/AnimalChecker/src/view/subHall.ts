import { EventCustom } from "../../../../../framework/src/core/eventCustom";
import { EventMessage } from "../../../../../framework/src/events";
import { Protocol } from "../../../../../framework/src/core/socket/protocol";
import { Logic } from "../../../../../framework/src/logic/logic";
import { Util } from "../../../../../framework/src/tools/utils";
import { TableView } from "../../../../../framework/src/tools/tableView";
import { SubGameCmd } from "../logic/gameLogic";
import {LGTools} from "../logic/littleGameTool";
import {LGConfig} from "../logic/littleGameConfig";
import {LGListener} from "../logic/littleGameListener";
const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu("视图脚本/子游戏大厅")
export default class SubHall extends cc.Component {
    @property(cc.SpriteAtlas)
    public sprAtlas: cc.SpriteAtlas = null;

    @property(TableView)
    public tableView: TableView = null;

    @property(cc.Node)
    public imgHead: cc.Node = null;

    @property(cc.Label)
    public lblLv: cc.Label = null;

    @property(cc.Label)
    public lblWinCount: cc.Label = null;

    @property(cc.Label)
    public lblRank: cc.Label = null;

    @property(cc.Prefab)
    public firendsRank: cc.Prefab = null;

    @property(cc.RichText)
    public rtName: cc.RichText = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Protocol.SubGame_cmd = SubGameCmd;
        LGListener.registerEvent();
        let _name_html = '<color=#000000>%s</color><img src=\'gender_%d\'/>';
        let _user = Logic.userInfo[1];
        this.rtName.string = Util.format(_name_html,_user.Name,_user.Sex);
        this.lblLv.string = ''+_user.VIP_Lev;
        this.lblRank.string = ''+_user.group_rank;
        this.lblWinCount.string = ''+_user.MasonryNum;

        let script = this.imgHead.getComponent("loadImage");
        script && script.setAvatar(_user.HeadURL);

        // 好友排行数据下发
        let self = this;
        // 初始化子游戏，即请求房间数据
        // EventCustom.on(EventMessage.INIT_SUB_GAME_BEGIN,()=>{
        //     EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_PlayerEntryGame',{GameID:LGConfig.AnimalChecker});
        // },this);
        //这里协议被修改了，暂时不知道后面再调整吧
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_PlayerEntryGame',{GameID:LGConfig.AnimalChecker});
        // 服务器下发的房间列表数据
        EventCustom.on('S2GWS_PlayerEntryGame',(data)=>{
            let _roomList = {
                10001100:{RoomID:10001100,Prop:'3002|1000',Level:1,Des:'新手场',Recovery:'3002|1000',WinProp:'3002|150',Index:0,IconPath:'huodongbiaoqian'},
                10001101:{RoomID:10001101,Prop:'3002|1000',Level:5,Des:'新手场',Recovery:'3002|1000',WinProp:'3002|150',Index:1,IconPath:'huodongbiaoqian'},
                10001102:{RoomID:10001102,Prop:'3002|1000',Level:10,Des:'新手场',Recovery:'3002|1000',WinProp:'3002|150',Index:2,IconPath:'huodongbiaoqian'},
                10001103:{RoomID:10001103,Prop:'3002|1000',Level:20,Des:'新手场',Recovery:'3002|1000',WinProp:'3002|150',Index:3,IconPath:'huodongbiaoqian'},
                10002100:{RoomID:10002100,Prop:'3002|1000',Level:21,Des:'新手场',Recovery:'3002|1000',WinProp:'3002|150',Index:4,IconPath:'huodongbiaoqian'},
            };
            self._initRoomList(_roomList);//(data.RoomList);
            // EventCustom.emit(EventMessage.INIT_SUB_GAME_END,true,self.node);
        },this);
    }
    onDisable(){
        LGListener.unregisterEvent();
    }
    start () {

    }
    onReturnClicket() {
        EventCustom.emit(EventMessage.EXIT_SUB_GAME_SCENE);
    };

    onHelpClicket() {
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACPageRule");
    };

    onQuickStartClicket() {
        this._marryActor(LGConfig.AnimalChecker,'2');
    };

    onLookupClicket() {
        LGTools.openPage(this.firendsRank);
    },

    onItemClicket(sender, customData) {
        let _clickData = JSON.parse(customData);
        this._marryActor(_clickData.RoomID,'1');
    };

    _initRoomList(roomList){
        let _cfg = {
            bgImg:'diban_',
            titleImg:'img_1V1_',
            unlock:'dengjidiban_',
            colors:['#349a4a','#0e6b5d','#1f6696','#1a4691']
        };

        let _condition = '<color=%s>入场金币:  </c><img src=\'jinbi_%d\'/><color=%s>  %s</color>';
        let _array = [];
        for (let k in roomList) _array.push(roomList[k]);//_array.push(Utils.obj2Json(roomList[k]));
        _array.sort((a,b)=>{
            if (a.Index !== b.Index)
                return a.Index - b.Index;
        })
        this.tableView.setSources(_array,(node,data,index)=>{
            if (!Util.isInvalid(node) && !Util.isInvalid(data)){
                let _str = data.Prop.split('|');
                let _prop = {id:parseInt(_str[0]),count:parseInt(_str[1])};
                let _coins = Util.format(_condition,_cfg.colors[index],index,_cfg.colors[index],Util.formatNumber(parseInt(_prop.count)));
                node.getComponent(cc.Sprite).spriteFrame = this.sprAtlas.getSpriteFrame(_cfg.bgImg+index);
                node.getChildByName('imgFlag').getComponent(cc.Sprite).spriteFrame = this.sprAtlas.getSpriteFrame(data.IconPath);
                node.getChildByName('imgTitle').getComponent(cc.Sprite).spriteFrame = this.sprAtlas.getSpriteFrame(_cfg.titleImg+index);
                node.getChildByName('imgUnlock').getComponent(cc.Sprite).spriteFrame = this.sprAtlas.getSpriteFrame(_cfg.unlock+index);
                node.getChildByName('lblCondition').getComponent(cc.RichText).string = _coins;
                node.getChildByName('lblunlock').getComponent(cc.Label).string = 'lv.'+data.Level;
                node.getComponent(cc.Button).clickEvents[0].customEventData = JSON.stringify(data);
            }
        });
    },

    _marryActor(roomId,playType){
        cc.sys.localStorage.setItem("GameRoomID", roomId);
        cc.sys.localStorage.setItem("GameRoomType", playType);
        EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_PlayerChooseGameMode',{Itype:playType,RoomID:''+roomId});
        LGTools.openPage("games/AnimalChecker/res/prefabs/ACMarryPlayer");
    };
}

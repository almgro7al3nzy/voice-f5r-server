import { Logic } from "../logic/logic";
import { Util } from "../tools/utils";
import Language from "../tools/language";
import { ResMgr } from "../core/resourcesMgr";
import { EventCustom } from "../core/eventCustom";
import { EventMessage } from "../events";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallScene extends cc.Component {

    @property(cc.Node)
    userNode: cc.Node = null;
    @property(cc.Node)
    exchangeNode: cc.Node = null;
    @property(cc.Node)
    gamesNode: cc.Node = null;
    @property(cc.Node)
    matchsNode: cc.Node = null;
    @property(cc.PageView)
    pageView: cc.PageView = null;
    @property(cc.PageView)
    bannerView: cc.PageView = null;

    onLoad () {
        let self = this;
        // 注册事件监听
        // 初始化角色信息
        self._initUserInfo();
        // 初始化广告页面
        self._initBanner();
        // 初始化兑换列表
        self._initExchangeGoods();
        // 初始化休闲游戏列表
        self._initGames();
        // 初始化大奖赛列表信息
        self._initMatchs();
    };

    start () {
    };

    onClickLogout(){};

    onClickUser(){};

    onClickAdd(sender, customData){};

    onClickModule(sender, customData){};

    onClickMore(sender, customData){};

    onClickPage(sender, customData){};

    onClickGames(sender, customData){
        Util.printObject(JSON.parse(customData));
        let _info = JSON.parse(customData);
        ResMgr.enterScene(ResMgr.getCfg('Scenes/game/name'),()=>{
            EventCustom.emit(EventMessage.ENTER_SUB_GAME_SCENE,_info);
        });
    };

    _initUserInfo(){};

    _initExchangeGoods(){};

    _initGames(){
        let _gameLists = Logic.gameList;
        if (Util.isInvalid(_gameLists)){
            cc.log('games is empty.');
            return ;
        }

        for (let i = 0; i < 3; ++i){
            let _item = this.gamesNode.getChildByName('btnGame0'+i);
            if (Util.isValid(_item)){
                let _info:any = _gameLists[i];
                let _isActive:boolean = false;
                 if (Util.isValid(_info) && Util.isValid(_info))
                    _isActive = _info.Flag > 0 && (_info.EndTime > _info.StartTime);
                _item.active = _isActive;
                if (!_isActive) continue;
                let _names = _info.Name.split('|');
                _item.getChildByName('lblName').getComponent(cc.Label).string = _names[0];
                Language.setLable(_item.getChildByName('lblNum').getComponent(cc.Label),'playeGame',_info.Number);
                let _btn = _item.getComponent(cc.Button);
                ResMgr.getRes('framework/gamesIcons/'+_info.IconPath,(img:cc.Texture2D)=>{
                    let _spr = new cc.SpriteFrame();
                    _spr.setTexture(img);
                    _btn.getComponent(cc.Sprite).spriteFrame = _spr;
                });
                _btn.clickEvents[0].customEventData = JSON.stringify(_info);
            }
        }

        //_gameLists
    };

    _initMatchs(){};

    _initBanner(){};
}

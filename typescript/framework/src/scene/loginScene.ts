import { Util, Environment } from "../tools/utils";
import { EventCustom } from "../core/eventCustom";
import { EventMessage } from "../events";
import { Http } from "../core/socket/http";
import { ResMgr} from "../core/resourcesMgr";
import DES from "../core/thirdlibs/des";
import { Logic } from "../logic/logic";
import Language from "../tools/language";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginScene extends cc.Component {

    @property(cc.Sprite)
    imgLoading: cc.Sprite = null;

    @property(cc.Label)
    lblLoading: cc.Label = null;

    @property(cc.Label)
    lblTitle: cc.Label = null;

    @property(cc.Label)
    lblTips: cc.Label = null;

    @property(cc.Label)
    lblVersion: cc.Label = null;

    @property({tooltip: '系统常驻节点，挂接一些比较特殊的全局事件'})
    permanentNode:cc.Node = null;

    private _hallCfg:any = null;

    onLoad () {
        cc.debug.setDisplayStats(false);
        let parent = this.permanentNode;
        parent.zIndex = cc.macro.MAX_ZINDEX;
        cc.game.addPersistRootNode(parent);
        cc.game._persistNode = parent;

        this.lblTips.string = '';
        this.lblTitle.string = '';
        this.imgLoading.node.active=false;
        
        let self = this;
        EventCustom.on('S2GWS_PlayerLogin', (userInfo:Object)=>{
            if (Util.isValid(userInfo)){
                ResMgr.enterScene(self._hallCfg.name,()=>{
                    // 销毁登陆后，后台开启资源预下载
                });
            }
        },this);
    }

    start () {
        let self = this;
        self.imgLoading.node.active=true;
        self.imgLoading.node.runAction(cc.repeatForever(cc.rotateBy(0.1,30)));
        ResMgr.preload(['framework/config','framework/language'],(data:Array<any>)=>{
            self._hallCfg = ResMgr.getCfg('Scenes/hall');
            if (Util.isInvalid(self._hallCfg)){
                cc.error('get hall config is error.');
                return ;
            }
            Language.init();
            Language.setLable(self.lblTitle,'AppName');
            Language.setLable(self.lblTips,'loadingRes');
            self.scheduleOnce(self._hotUpdate.bind(this),2);
        });
    }

    // 热更
    _hotUpdate(){
        let self = this;
        if (Util.isEmptyStr(ResMgr.getCfg('updateUrl'))){
            // 预加载大厅
            ResMgr.preloadScene(self._hallCfg.name,self._hallCfg.preloads,()=>{
                // 建立http网关连接，获取服务器信息
                let _gatway:string = ResMgr.getCfg('gatwayAdd');
                if (!Util.isEmptyStr(_gatway)){
                    let _data = 'GolangLtdDT?'+encodeURI('Protocol=8&Protocol2=1&login_os='+Util.getRunEnvironment());
                    Http.Get(_gatway, _data, (data:any)=>{
                        if (Util.isValid(data)){
                            let _result = JSON.parse(DES.decodeBase64(data));
                            if (Util.isValid(_result)){
                                Logic.setProperty(0,_result.GateWayST);
                                Logic.setProperty(1,_result.PlayerST);
                                Logic.setProperty(2,_result.GameListNew);
                                Logic.setProperty(3,_result.BannerList);
                                Logic.token = _result.Tocken;
                                self.scheduleOnce(function(){
                                    let _info = Logic.userInfo;
                                    EventCustom.emit(EventMessage.SEND_MSG_TO_SVR,'C2GWS_PlayerLogin',{
                                        PlayerUID:_info.uid,
                                        PlayerName:_info.name,
                                        HeadUrl:_info.head,
                                        Constellation:_info.constellation,
                                        PlayerSchool:_info.school,
                                        Sex:''+_info.sex
                                    });
                                }.bind(this),1);
                            }
                        }
                    });
                } else {
                    ResMgr.enterScene(self._hallCfg,()=>{
                        // 直接触发进入大厅
                    });
                }
            });
        } else {
            // 走热更流程
            let _env:Environment = Util.getRunEnvironment();
            if (_env === Environment.ENV_APP_ANDROID){
                // 添加android热更流程
            } else if (_env === Environment.ENV_APP_IOS){
                // 添加ios热更流程
            }
        }
    }

    // update (dt) {}
}

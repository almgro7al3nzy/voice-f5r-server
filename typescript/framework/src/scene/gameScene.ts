import { Util } from "../tools/utils";
import { EventCustom } from "../core/eventCustom";
import { EventMessage } from "../events";
import Language from "../tools/language";
import { ResMgr } from "../core/resourcesMgr";
import { Protocol } from "../core/socket/protocol";
const {ccclass, property} = cc._decorator;
const ERROR_WAIT_TIME = 5; // 错误提示显示时间5秒
const OVER_TIME_BREAK = 10; // 超时自动返回大厅时间
@ccclass
export default class SubGameScene extends cc.Component {

    // 加载loading节点
    @property(cc.Node)
    loadingNode: cc.Node = null;

    // 游戏game节点
    @property(cc.Node)
    gameNode: cc.Node = null;

    // 游戏game节点
    @property(cc.Node)
    subHallNode: cc.Node = null;

    // 子大厅节点
    @property(cc.RichText)
    rtTips:cc.RichText = null;

    // 游戏game节点
    @property(cc.Node)
    actionNode: cc.Node = null;

    @property(cc.Sprite)
    imgAction: cc.Sprite = null;
    private _isOvertime:boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rtTips.node.zIndex = 0x2048;
        this.rtTips.node.active = true;
        this.rtTips.node.opacity = 0;
        this.rtTips.string = '';
        this.actionNode.active = false;

        let self = this;
        self.scheduleOnce(function(){
            self._isOvertime && self._returnHall();
        }.bind(this),OVER_TIME_BREAK);

        EventCustom.on(EventMessage.ENTER_SUB_GAME_SCENE,(data:any)=>{
            let _loadEnd = ()=>{
                // 请求房间列表
                self.imgAction.node.stopAllActions();
                self.loadingNode.active = false;
                self._isOvertime = false;
                ResMgr.showOrHideRes(true,'games/'+data.ResPath+'/res/view/subHall',self.subHallNode);
            };

            if (data.IsPortrait !== 1){
                self.actionNode.rotation = 90;
                self.actionNode.position = cc.v2(0,0);
            }
            
            self.actionNode.active = true;
            self._runLoadAction();
            let _startIndex = data.ResPath.lastIndexOf(".");
            let _fileType = _startIndex >= 0 ? data.ResPath.substring(_startIndex+1, data.ResPath.length).toLowerCase():'';
            if (_fileType === '')
                ResMgr.preloadDir('games/'+data.ResPath+'/res',_loadEnd);
            else
                ResMgr.preloadFiles(data.ResPath,()=>{
                    // zip文件，需要解压处理
                    _loadEnd();
                });
        },this);

        EventCustom.on(EventMessage.EXIT_SUB_GAME_SCENE,this._returnHall.bind(this),this);
    }

    start () {
    }

    _returnHall(){
        this.imgAction.node.stopAllActions();
        Protocol.SubGame_cmd = {}; // 卸载游戏协议
        ResMgr.enterScene(ResMgr.getCfg('Scenes/hall/name'),()=>{
            // 销毁操作
        });
    };

    _runLoadAction(){
        let fpsAni = 25; //动画一秒钟的帧数
        this.imgAction.node.runAction(cc.repeatForever(cc.sequence(
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(-21, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.1)),
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(-10, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.155)),
            cc.spawn(cc.moveBy(2/fpsAni, cc.v2(0, -17.2)), cc.scaleTo(4/fpsAni, 1, 1.06)),
            cc.scaleTo(4/fpsAni, 1, 1),
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(21, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.1)),
            cc.spawn(cc.moveBy(4/fpsAni, cc.v2(10, 8.6)), cc.scaleTo(4/fpsAni, 1, 1.155)),
            cc.spawn(cc.moveBy(2/fpsAni, cc.v2(0, -17.2)), cc.scaleTo(4/fpsAni, 1, 1.06)),
            cc.scaleTo(4/fpsAni, 1, 1),
        )));
    };
}

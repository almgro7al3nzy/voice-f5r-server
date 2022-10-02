import { Logic } from "../../../../../framework/src/logic/logic";
import { Util } from "../../../../../framework/src/tools/utils";
import { TableView } from "../../../../../framework/src/tools/tableView";
import {LGTools} from "../logic/littleGameTool";
const {ccclass, property} = cc._decorator;
@ccclass
export default class FrindRank extends cc.Component {
   @property(cc.SpriteAtlas)
    public sprAtlas: cc.SpriteAtlas = null;

    @property(TableView)
    public tableView: TableView = null;

    @property(cc.Sprite)
    public imgHead: cc.Sprite = null;

    @property(cc.Label)
    public lblLv: cc.Label = null;

    @property(cc.Label)
    public lblName: cc.Label = null;

    @property(cc.Label)
    public lblWinCount: cc.Label = null;

    @property(cc.Label)
    public lblRank: cc.Label = null;

    @property(cc.Node)
    public nodeList: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let _user = Logic.userInfo[1];
        this.lblName.string = _user.Name;
        this.lblRank.string = ''+_user.group_rank;
        this.lblLv.string = ''+_user.VIP_Lev;
        this.lblWinCount.string = ''+10;
        let script = this.imgHead.node.getComponent("loadImage");
        script && script.setAvatar(_user.HeadURL);
    }

    start () {
        let _datas = new Array();
		for (let i=1; i < 21; ++i){
			_datas.push({
				Name:'春暖花开_'+i,
				Rank:i,
				Winns:100-i,
				HeadUrl:'http://xmqvip1-1253933147.file.myqcloud.com/ugc/images/2018/04/16/152387637868832h.jpg'
			});
		}
		let self = this;
		this.tableView.setSources(_datas,(node,data,index)=>{
			if (!Util.isInvalid(node) && !Util.isInvalid(data)){
				let _rank = node.getChildByName('imgRank');
				_rank.active = data.Rank < 4;
				_rank.active && (_rank.getComponent(cc.Sprite).spriteFrame = self.sprAtlas.getSpriteFrame('jiangpai_'+(data.Rank-1)));
				node.getChildByName('lblRank').getComponent(cc.Label).string = ''+data.Rank;
				node.getChildByName('lblName').getComponent(cc.Label).string = data.Name;
				node.getChildByName('lblWins').getComponent(cc.Label).string = ''+data.Winns;
				let _scr = node.getChildByName('imgHeadMask').getChildByName('imgHead').getComponent("loadImage");
				_scr && _scr.setAvatar(data.HeadUrl);
			}
		});
    }
    onReturnClicket() {
        LGTools.closePage(this.node);
    }
}

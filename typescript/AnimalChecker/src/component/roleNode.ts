import {LGTools} from "../logic/littleGameTool";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/Component/RoleNode")
export default class RoleNode extends cc.Component {
    @property(cc.Node)
    public avatar: cc.Node = null;

    @property(cc.Label)
    public nickname: cc.Label = null;

    @property(cc.Label)
    public school: cc.Label = null;

    @property(cc.Label)
    public gold: cc.Label = null;

    @property(cc.Label)
    public addScore: cc.Label = null;

    @property(cc.Label)
    public addGold: cc.Label = null;

    @property(cc.Node)
    public winHat: cc.Node = null;

    @property(cc.Sprite)
    public sex: cc.Sprite = null;

    @property([cc.SpriteFrame])
    public sexRes: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    start () {
    }

    // update (dt) {}
     setRoleData(data){
        if(LGTools.isInvalid(data))return;
        // 人头
        if(cc.isValid(this.avatar) && LGTools.isValid(data.HeadURL) ){
            this.scriptAvatar = this.avatar.getComponent("loadImage");
            this.scriptAvatar.setAvatar(data.HeadURL);
        }
        // 性别
        if(cc.isValid(this.sex) && LGTools.isValid(data.Sex) ){
            this.sex.spriteFrame = this.sexRes[data.Sex];
        }
        // 名称
        if(cc.isValid(this.nickname) && LGTools.isValid(data.Name) ){
            this.nickname.string = LGTools.cutShort(data.Name, 6);　
        }
        // 学校
        if(cc.isValid(this.school) && LGTools.isValid(data.PlayerSchool) ){
            this.school.string = data.PlayerSchool;　
        }
        // 金币
        if(cc.isValid(this.gold) && LGTools.isValid(data.CoinNum) ){
            this.gold.string = data.CoinNum;　
        }
        // +分数
        if(cc.isValid(this.addScore) && LGTools.isValid(data.AddScore) ){
            this.addScore.string = data.AddScore;　
        }
        // +金币
        if(cc.isValid(this.addGold) && LGTools.isValid(data.AddGold) ){
            this.addGold.string = data.AddGold;　
        }
        // 戴帽子
        if(cc.isValid(this.winHat) && LGTools.isValid(data.ShowHat) ){
            this.winHat.active = data.ShowHat;　
        }
    }

    flyToPos(positions){
        if(positions.length<= 0)return;
        let act = [];
        for (let i = 0; i < positions.length; i++) {
            let pos = positions[i];
            act.push(cc.moveTo(0.5,pos));
        }
        this.node.runAction(cc.sequence(act));
    }
    flyToNode(nodes){
        let pos = [];
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            pos.push(element.getPosition());
        }
        this.flyToPos(pos);
    }
}

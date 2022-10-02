import {LGTools} from "../logic/littleGameTool";
const {ccclass, property} = cc._decorator;

@ccclass
export class ACOverBase extends cc.Component {
    @property(cc.Prefab)
    public overCenter: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        LGTools.addNodeEventListener("ACCloseOverPage", this._closeSelf, this);
        this._addCenterPrefab();
    }

    start () {

    }

    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }
    _closeSelf(){
        this.node.destroy();
    }

    // update (dt) {}
    _addCenterPrefab() {
        if (this.overCenter) {
            let node = cc.instantiate(this.overCenter);
            this.node.addChild(node);
            this._myCenter = node.getComponent("ACOverCenter");
        }
    }
}

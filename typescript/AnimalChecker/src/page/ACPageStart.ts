/*
* ACPageStart
* 斗兽棋比赛开始界面
*/
import {LGModel} from "../logic/littleGameModel";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACPageStart")
export default class ACPageStart extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.setParam(LGModel.pageStartCallBack);
    }

    hidePage(){
        this.node.active = false;
    }

    showPage(){
        this.node.active = true;
    }

    destroyPage(){
        "function"===typeof this._callback && this._callback();
        LGModel.pageStartCallBack = null;
        this.node.destroy();
    }

    setParam(callback){
        if(callback)
        this._callback = callback;
    }

    // update (dt) {}
}

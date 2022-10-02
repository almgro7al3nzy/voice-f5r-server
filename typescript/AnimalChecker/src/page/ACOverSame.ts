import { ACOverBase } from "./ACOverBase";
import {LGAudio} from "../logic/littleGameAudio";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACOverSame")
export default class ACOverSame extends ACOverBase {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        LGAudio.youPing();
    }
    // update (dt) {}
}

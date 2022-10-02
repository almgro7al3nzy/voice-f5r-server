import { ACOverBase } from "./ACOverBase";
import {LGTools} from "../logic/littleGameTool";
import {LGAudio} from "../logic/littleGameAudio";
import {LGConfig} from "../logic/littleGameConfig";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACOverSuccess")
export default class ACOverSuccess extends ACOverBase {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        this.playEffectLevelup();
        LGAudio.youWin();
    }
    // update (dt) {}
    playEffectLevelup() {
        LGTools.createPrefab("games/AnimalChecker/res/prefabs/ACAniLevelup", (node)=>{
            if (node) {
                this.node.addChild(node)
                LGTools.callDelay(node, 56/LGConfig.AniFps, function () {
                    node.destroy();
                });
            }
        });
    }
}

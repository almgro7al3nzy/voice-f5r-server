import {LGTools} from "../logic/littleGameTool";
import {LGModel} from "../logic/littleGameModel";
import {LGConfig} from "../logic/littleGameConfig";
import {LGAudio} from "../logic/littleGameAudio";
import {LGListener} from "../logic/littleGameListener";
import {ACGuideManager} from "./ACGuideManager";
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACGrid")
export default class ACGrid extends cc.Component {
    @property(cc.Prefab)
    public aniSmoke: cc.Prefab = null;

    @property(cc.Prefab)
    public aniGuide: cc.Prefab = null;

    @property(cc.Node)
    public myRes: cc.Node = null;

    @property(cc.Graphics)
    public myGraphic: cc.Graphics = null;

    @property(cc.Node)
    public gridParent: cc.Node = null;

    @property(cc.Node)
    public gridItem: cc.Node = null;

    @property(cc.Node)
    public arrowNode: cc.Node = null;

    @property({tooltip:"路的竖向宽度"})
    public roadVertical: cc.Integer = 0;
    
    @property({tooltip:"路的横向宽度"})
    public roadHorizontal: cc.Integer = 0;
    
    @property({tooltip:"圆角矩形的宽度"})
    public roundW: cc.Integer = 0;
    
    @property({tooltip:"圆角矩形的高度"})
    public roundH: cc.Integer = 0;
    
    @property({tooltip:"圆角矩形的圆度"})
    public roundR: cc.Integer = 0;
     
    @property({type:[cc.Integer],tooltip:"格子的坐标X列表(由小到大)"})
    public listPosX: cc.Integer[] = [];

    @property({type:[cc.Integer],tooltip:"格子的坐标Y列表(由小到大)"})
    public listPosY: cc.Integer[] = [];
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.myResSrc = this.myRes.getComponent("ACChessRes");
        this._gridPool = new cc.NodePool();
        this._gridPool.put(this.gridItem);
        this._drawGridRoad(3, '#dcfeb0');
        this._drawGridRoad(2, '#cbf694');
        this._drawGridRoad(1, '#b9e189');
        this._drawGridRoad(0, '#b9e189');
        this.createGrids();
    }
    onDestroy(){
        this._gridPool.clear();
    }
    start () {

    }
    hidePage(){
        this.node.active = false;
    }
    showPage(){
        this.node.active = true;
    }

    // update (dt) {}
    createGrids() {
        this._clearAllTipNode();
        this._removeGrids();
        for (let i = 0; i < this.listPosX.length; i++) {
            for (let j = this.listPosY.length-1; j >= 0 ; j--) {
                this._addOneGrid(i, j);
            }
        }
    };
    updateGrids() {
        if (this._needCreateGrid()) {
            this.createGrids();
        }
        let chessData = LGModel.roomData.chess_data;
        let children = this.gridParent.children;
        for (let i = children.length - 1; i >= 0; i--) {
            this._setItemNum(children[i], chessData[this._getPosByIJ(children[i])]);
        }
    };
    // 判断是否需要重新创建所有的格子
    _needCreateGrid() {
        let bol = false;
        let children = this.gridParent.children;
        // 先判断个数
        if (children.length!==this.listPosX.length*this.listPosY.length) {
            bol = true;
        }
        // 再遍历看看是否都没有翻开
        if (!bol) {
            for (let i = 0; i < children.length; i++) {
                if (children[i]._open) {
                    bol = true;
                    break;
                }
            }
        }
        return bol;
    };
    findItemByPos(pos) {
        let item = null;
        let gridX = pos%4;
        let gridY = Math.floor(pos/4);
        let children = this.gridParent.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i]._gridI===gridX && children[i]._gridJ===gridY) {
                item = children[i];
                break;
            }
        }
        return item;
    };
    moveItemToPos(item, pos, callBack) {
        if (!item) return;
        if (!callBack) {
            ACGuideManager.guideMoveSuccess();
            this._clearAllTipNode();
        }
        let i = pos%4;
        let j = Math.floor(pos/4);
        item.zIndex = 1;
        item.scale = 1;
        item.stopAllActions();
        item.runAction(cc.sequence(
            cc.spawn(
                cc.jumpTo(7/LGConfig.AniFps, cc.v2(this.listPosX[i], this.listPosY[j]), 32, 1),
                cc.sequence(
                    cc.scaleTo(4/LGConfig.AniFps, 1.2),
                    cc.scaleTo(3/LGConfig.AniFps, 1),
                ),
            ),
            // cc.moveTo(XMQ.AIDE.AC.timeMoveOnce, cc.v2(this.listPosX[i], this.listPosY[j])),
            cc.callFunc(function() {
                item.zIndex = 0;
                item._gridI = i;
                item._gridJ = j;
                if (typeof callBack === "function") {
                    callBack();
                } else {
                    LGAudio.move();
                }
            }),
        ));
    };
    item1EatItem2(item1, item2, pos) {
        ACGuideManager.guideEatSuccess();
        this._clearAllTipNode();
        if (!item1) return;
        if (!item2) return;
        this.moveItemToPos(item1, pos, ()=> {
            // 从数据上看这个位置有没有棋子了 没有就表明本次吃是抵消
            this._addSmoke(pos);
            if (LGModel.isGridNoChess(pos)) {
                this._removeOneGrid(item1);
                this._removeOneGrid(item2);
            } else {
                let beEatenItem = item2;
                let num = LGModel.roomData.chess_data[pos];
                let camp = Math.floor(num/10);
                if (camp===item2._myCamp) {
                    beEatenItem = item1;
                }
                beEatenItem.runAction(cc.sequence(
                    cc.scaleTo(2/LGConfig.AniFps, 0),
                    cc.fadeOut(2/LGConfig.AniFps),
                    cc.callFunc(()=>{
                        this._removeOneGrid(beEatenItem);
                    }),
                ));
            }
            LGAudio.eat();
        })
    };
    _addSmoke(pos) {
        let i = pos%4;
        let j = Math.floor(pos/4);
        let item = cc.instantiate(this.aniSmoke);
        item.x = this.listPosX[i];
        item.y = this.listPosY[j];
        this.node.addChild(item);
        LGTools.callDelay(item, 16/LGConfig.AniFps, function () {
            item.destroy();
        });
    };
    _setItemNum(item, num) {
        if (num<=0) {
            return;
        }
        this._setOpenState(item, true);
        let camp = Math.floor(num/10);
        let animal = num%10;
        let floor = item.getChildByName("block").getChildByName("floor");
        item._myCamp = camp;
        floor.active = true;
        floor.getComponent(cc.Sprite).spriteFrame = this.myResSrc.bgCamp[camp];
        floor.getChildByName("animal").getComponent(cc.Sprite).spriteFrame = this.myResSrc.animalSPF[animal-1];
        floor.getChildByName("text").getComponent(cc.Sprite).spriteFrame = this.myResSrc[camp===LGConfig.CampType.Red ? "textSPFRed" : "textSPFBlue"][animal-1];
    };
    openItem(item, num) {
        ACGuideManager.guideOpenSuccess();
        this._clearAllTipNode();
        this._setItemNum(item, num);
        let floor = item.getChildByName("block").getChildByName("floor");
        floor.scale = 1/14;
        floor.opacity = 0;
        floor.runAction(cc.spawn(
            cc.scaleTo(4/LGConfig.AniFps, 1),
            cc.fadeIn(4/LGConfig.AniFps),
        ));
        LGTools.callDelay(floor, 4/LGConfig.AniFps, function () {
            LGAudio.animalSpeak(num%10);
        });
    };
    clearAlllight() {
        let children = this.gridParent.children;
        for (let i = 0; i < children.length; i++) {
            children[i].getChildByName("light").active = false;
        }
    };
    lightAllCanDo() {
        let mySvrId = LGModel.getMainSvrSeatId();
        let children = this.gridParent.children;
        for (let i = 0; i < children.length; i++) {
            let item = children[i];
            if (item._open) {
                // 我的棋子中可以移动或者可以吃的
                if (mySvrId===item._myCamp && LGTools.canMoveOrEatThisPos(LGModel.roomData.chess_data, this._getPosByIJ(item))) {
                    item.getChildByName("light").active = true;
                }
            } else {
                // 所有没翻开的可以操作
                item.getChildByName("light").active = true;
            }
        }
        this._checkMyOpenGuide();
    };

    onClickItem(event) {
        if (!this._checkIsMyHandler()) {
            return;
        }
        let pos = this._getPosByIJ(event.target);
        // 这个棋子是否没有翻开
        if (LGModel.isChessNoOpen(pos)) {
            LGListener.requestAC_Action(LGConfig.ActionType.Open, pos);
            return;
        }
        // 这个棋子是不是我的
        if (LGModel.isChessBelongToMe(pos)) {
            if (!LGModel.isSignedFrom(pos)) {
                LGModel.signFromChess(pos);
                this._selectItem(event.target);
            }
        } else {
            LGModel.signToChess(pos);
        }
        this._moveOrEatChess();
    };
    onClickRoad(event) {
        if (!this._checkIsMyHandler()) {
            return;
        }
        if (!this._getClickGridInRoad(event)) {
            return;
        }
        LGModel.signToChess(this.roadPos);
        this._moveOrEatChess();
    };
    // 当前是否该我操作
    _checkIsMyHandler() {
        if (!LGModel.isMainHandling()) {
            let node = cc.find("Canvas/gameNode/ACGame");
            if(node){
                let ACGame = node.getComponent("ACGame");
                ACGame.showTip(LGModel.roomData.action_position, 0, 2);
            }
            return false;
        }
        return true;
    },
    _moveOrEatChess() {
        if (!LGModel.canMove()) {
            return;
        }
        let data = LGModel.getMoveData();
        if (LGModel.isGridNoChess(data[1])) {
            LGListener.requestAC_Action(LGConfig.ActionType.Move, data[0], data[1]);
        } else {
            LGListener.requestAC_Action(LGConfig.ActionType.Eat, data[0], data[1]);
        }
    };
    // 自己这一排以及往下的竖向道路
    _drawGridRoad(tagY, colorStr) {
        let minY = tagY-1;
        var g = this.myGraphic;
        let w = this.listPosX[this.listPosX.length-1] - this.listPosX[0];
        let h = minY>=0 ? this.listPosY[tagY] - this.listPosY[minY] : 0;
        g.fillColor = g.fillColor.fromHEX(colorStr);
        // 画竖向道路
        if (h>0) {
            for (let i = 0; i < this.listPosX.length; i++) {
                g.rect(this.listPosX[i]-this.roadVertical*0.5, this.listPosY[minY]-this.roadHorizontal*0.5, this.roadVertical, h+this.roadHorizontal);
            }
        }
        // 画横向道路
        let startX = this.listPosX[0]-this.roadVertical*0.5;
        for (let i = Math.max(0, minY); i <= tagY; i++) {
            g.rect(startX, this.listPosY[i]-this.roadHorizontal*0.5, w+this.roadVertical, this.roadHorizontal);
        }
        // 画圆角矩形
        for (let i = 0; i < this.listPosX.length; i++) {
            g.roundRect(this.listPosX[i]-this.roundW*0.5, this.listPosY[tagY]-this.roundH*0.5, this.roundW, this.roundH, this.roundR);
        }
        g.stroke();
        g.fill();
    };
    _addOneGrid(i, j) {
        let item = null;
        if (this._gridPool.size() > 1) {
            item = this._gridPool.get();
        } else {
            item = cc.instantiate(this.gridItem);
        }
        item.x = this.listPosX[i];
        item.y = this.listPosY[j];
        item.zIndex = 0;
        item._gridI = i;
        item._gridJ = j;
        item.scale = 1;
        item.opacity = 255;
        this._setOpenState(item, false);
        let block = item.getChildByName("block");
        block.y = 0;
        item.getChildByName("light").active = false;
        block.getChildByName("floor").active = false;
        this.gridParent.addChild(item);
    };
    _setOpenState(item, bol) {
        item._open = bol;
        item.height = this.myResSrc.heights[bol ? 1 : 0];
        item.anchorY = this.myResSrc.anchorYs[bol ? 1 : 0];
    };
    _removeGrids() {
        let children = this.gridParent.children;
        for (let i = children.length - 1; i >= 0; i--) {
            this._removeOneGrid(children[i]);
        }
    };
    _removeOneGrid(item) {
        this._gridPool.put(item);
    };
    _getClickGridInRoad(event) {
        let clickI = -1;
        let clickJ = -1;
        let location = event.touch.getLocation();
        let frameSize = cc.view.getFrameSize();
        let x = location.x-frameSize.width*0.5-this.node.x;
        let y = location.y-frameSize.height*0.5-this.node.y;
        let w = this.roundW*0.5;
        let h = this.roundH*0.5;
        for (let i = 0; i < this.listPosX.length; i++) {
            if (x>=this.listPosX[i]-w && x<=this.listPosX[i]+w) {
                clickI = i;
                break;
            }
        }
        for (let i = 0; i < this.listPosY.length; i++) {
            if (y>=this.listPosY[i]-h && y<=this.listPosY[i]+h) {
                clickJ = i;
                break;
            }
        }
        if (clickI>=0 && clickJ>=0) {
            this.roadPos = clickI+clickJ*4;
            return true;
        }
        return false;
    };
    _getPosByIJ(item) {
        return item._gridI+item._gridJ*4;
    };
    _setSelectY(y) {
        if (this._curSelectedItem) {
            this._curSelectedItem.getChildByName("block").y = y;
        }
    };
    _selectItem(item) {
        this._clearAllTipNode();
        this._curSelectedItem = item;
        this._setSelectY(10);
        this._setArrow(item);
        this._checkMyMoveOrEatGuide(this._getPosByIJ(item));
    };
    _clearSelectedItem() {
        this.arrowNode.active = false;
        this._setSelectY(0);
        this._curSelectedItem = null;
    };
    _setArrow(item) {
        this.arrowNode.active = true;
        this.arrowNode.x = this.listPosX[item._gridI];
        this.arrowNode.y = this.listPosY[item._gridJ];
        let chessData = LGModel.roomData.chess_data;
        let pos = this._getPosByIJ(item);
        let list = LGTools.getAllDirectionMoveOrEatThisPos(chessData, pos, chessData[pos]);
        this._updateArrowInfo(this.arrowNode.getChildByName("top"), list[0], 0, 10);
        this._updateArrowInfo(this.arrowNode.getChildByName("down"), list[1], 0, -10);
        this._updateArrowInfo(this.arrowNode.getChildByName("left"), list[2], -10, 0);
        this._updateArrowInfo(this.arrowNode.getChildByName("right"), list[3], 10, 0);
    };
    _updateArrowInfo(node, infoNum, offX, offY) {
        if (infoNum===LGConfig.GridInfo.None || infoNum===LGConfig.GridInfo.NoOpen || infoNum===LGConfig.GridInfo.Teammate) {
            node.active = false;
        } else if (infoNum===LGConfig.GridInfo.NoChess || infoNum===LGConfig.GridInfo.EnemyYes) {
            node.active = true;
            node.getComponent(cc.Sprite).spriteFrame = this.myResSrc.arrowSPF[0];
        } else if (infoNum===LGConfig.GridInfo.EnemyNo) {
            node.active = true;
            node.getComponent(cc.Sprite).spriteFrame = this.myResSrc.arrowSPF[1];
        }
        if (node.active) {
            this._actArrow(node, offX, offY);
        }
    };
    _actArrow(node, offX, offY) {
        if (LGTools.isInvalid(node._bornX)) {
            node._bornX = node.x;
            node._bornY = node.y;
        }
        node.x = node._bornX;
        node.y = node._bornY;
        node.stopAllActions();
        node.runAction(cc.repeatForever(cc.sequence(
            cc.moveBy(3/LGConfig.AniFps, cc.v2(offX, offY)),
            cc.moveBy(3/LGConfig.AniFps, cc.v2(-offX, -offY)),
        )));
    };
    _clearAllTipNode() {
        this._clearSelectedItem();
        this._removeGuideAnimation();
    };
    _removeGuideAnimation() {
        if (this._guideNode) {
            this._guideNode.removeFromParent();
            this._guideNode = null;
        }
    };
    _addGuideAnimation(pos) {
        let i = pos%4;
        let j = Math.floor(pos/4);
        let item = cc.instantiate(this.aniGuide);
        item.x = this.listPosX[i];
        item.y = this.listPosY[j];
        this.node.addChild(item);
        this._guideNode = item;
    };
    // 翻棋指引
    _checkMyOpenGuide() {
        if (ACGuideManager.checkGuideOpen()) {
            this._addGuideAnimation(ACGuideManager.getGuideOpenPos());
        }
    };
    // 行棋或吃棋指引(吃棋>行棋)
    _checkMyMoveOrEatGuide(pos) {
        if (ACGuideManager.checkGuideEat(pos)) {
            this._addGuideAnimation(ACGuideManager.getGuideEatPos(pos));
        } else if (ACGuideManager.checkGuideMove(pos)) {
            this._addGuideAnimation(ACGuideManager.getGuideMovePos(pos));
        }
    };


}

/**
 * 小游戏的一些方法
 */
import {LGConfig} from "./littleGameConfig";
import {LGModel} from "./littleGameModel";
import { ResMgr } from "../../../../../framework/src/core/resourcesMgr";
import { Util } from "../../../../../framework/src/tools/utils";
class Tools{
    private static _instance:Tools = null;
    public static getInstance():Tools{
        if (Tools._instance === null)
            Tools._instance = new Tools();
        return Tools._instance;
    };
    public callDelay(node,delay,callback){
        let del = cc.delayTime(delay);
        let cal = cc.callFunc(callback);
        let seq = cc.sequence(del, cal);
        node.runAction(seq);
    };
    public callScheduler(node, delay, func){
        let del = cc.delayTime(delay);
        let cal = cc.callFunc(func);
        let seq = cc.sequence(del, cal);
        return node.runAction(cc.repeatForever(seq));
    };
    public callMoveBy(node, delay, pos, func) {
        let del = cc.moveBy(delay, pos);
        let cal = cc.callFunc(func);
        let seq = cc.sequence(del, cal);
        node.runAction(seq)
    };
    public updateAllWidget(node){
        let children = node.children;
        for (var i = 0; i < children.length; i++) {
            let wgt = children[i].getComponent(cc.Widget);
            if (wgt) {
                wgt.updateAlignment();
            }
        }
    };
    public isValid(obj){
        return obj !== null && obj !== undefined;
    };
    public isInvalid(obj){
        return !Tools._instance.isValid(obj);
    };
    public randomInt(minNum:number, maxNum:number):number{
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    };
    public getLocalTime(){
        return (new Date()).getTime();
    };
    public getCountDown(dueTime:number, curTime:number):number {
        let off = dueTime - curTime;
        if (off <= 0)
            return 0;
        return Math.floor(off / 1000);
    };
    public openPage(pageName){
        let parent = cc.find("Canvas/gameNode");
        ResMgr.showOrHideRes(true,pageName,parent);
    };
    public closePage(pageName){
        ResMgr.showOrHideRes(false,pageName);
    };
    public cutShort(str:string,long:number):string{
        return Util.subUTF8Str(str,long);
    };
    public createPrefab(resPath,cb){
        cc.loader.loadRes(resPath, (err, prefab) => {
            let node = null;
            if (err) {
                cc.error("[createPrefab]",err);
            } else {
                node = cc.instantiate(prefab);
            }
            if (cb) {
                cb(node);
            }
        });
    };
    addNodeEventListener(message, callback, target, useCapture) {
        cc.director.on(message, callback, target, useCapture)
    };
    dispatchNodeEvent(message, detail) {
        cc.director.emit(message, detail)
    };
    removeNodeEventListener(message,callback,target,useCapture){
       cc.director.off(message, callback, target, useCapture);
    }
    //////////////////////////////////////////////
    //游戏相关算法辅助工具
    // 创建一局棋
    public createChessData(chessData, openData) {
        // 定义个位数数字8-1表示 象>狮>虎>豹>狼>狗>猫>鼠
        // 定义十位数数字0-1表示 红、蓝阵营
        // 最终定义数字:0未翻开 1-8和11-18表示棋子 -1表示没有棋子
        let all = [];
        for (let i = 0; i <= 1; i++) {
            for (let j = 1; j <= 8; j++) {
                all.push(i*10+j);
            }
        }
        // 定义数字0到15表示 4*4的格子
        for (let i = 0; i < 16; i++) {
            chessData[i] = LGConfig.NoOpen;
            openData[i] = all.splice(Tools._instance.randomInt(0, all.length-1), 1)[0];
        }
    };
    // 把棋子分成两个阵营，依次为我的和敌方的
    public separateChessByCamp(chessData, curSvrSeat) {
        let list1 = [];
        let list2 = [];
        let num = 0;
        for (let i = 0; i < chessData.length; i++) {
            num = chessData[i];
            if (num!==LGConfig.NoOpen && num!==LGConfig.NoChess) {
                if (curSvrSeat===Math.floor(num/10)) {
                    list1.push(i);
                } else {
                    list2.push(i);
                }
            }
        }
        return [list1, list2];
    };
    // 找出一个可以吃的棋子信息
    public getCanEatOne(chessData, myCamp, enemyCamp) {
        let ret = null;
        let eatPos = 0;
        for (let i = 0; i < myCamp.length; i++) {
            eatPos = myCamp[i];
            let beEatenPos = Tools._instance._getCanEatPosFromList(chessData, eatPos, chessData[eatPos], enemyCamp);
            if (beEatenPos>=0) {
                ret = [eatPos, beEatenPos];
                break;
            }
        }
        return ret;
    };
    // 找出全部可以吃的棋子信息
    public getCanEatAll(chessData, myCamp, enemyCamp) {
        let ret = [];
        let eatPos = 0;
        for (let i = 0; i < myCamp.length; i++) {
            eatPos = myCamp[i];
            let beEatenPos = Tools._instance._getCanEatPosFromList(chessData, eatPos, chessData[eatPos], enemyCamp);
            if (beEatenPos>=0) {
                ret.push([eatPos, beEatenPos]);
            }
        }
        return ret;
    };
    // 找出全部可以移动的棋子信息
    public getAllCanMove(chessData, myCamp) {
        let list = [];
        for (let i = 0; i < myCamp.length; i++) {
            if (Tools._instance._getCanMovePos(chessData, myCamp[i])>=0) {
                list.push(myCamp[i]);
            }
        }
        return list;
    };
    // 找出全部没有翻开的棋子
    public findNoOpenChess(chessData) {
        let list = [];
        for (let i = 0; i < chessData.length; i++) {
            if (chessData[i]===LGConfig.NoOpen) {
                list.push(i);
            }
        }
        return list;
    };
    // 找出要移动的棋子:从可移动的所有棋子中找出马上要被吃且能逃走的
    public findOneMoveChessWillBeEaten(chessData, campMove, enemy) {
        let ret = null;
        let beEatenList = Tools._instance.findAllMoveChessWillBeEaten(chessData, campMove, enemy);
        if (beEatenList.length>0) {
            // 在这里找出能逃走的那个
            for (let i = 0; i < beEatenList.length; i++) {
                let posEscape = Tools._instance._getEscapePos(chessData, beEatenList[i], enemy);
                if (posEscape>=0) {
                    ret = [beEatenList[i], posEscape];
                    break;
                }
            }
        }
        return ret;
    };
    // 找出要移动的棋子:从可移动的所有棋子中找出所有马上要被吃的
    public findAllMoveChessWillBeEaten(chessData, campMove, enemy) {
        let list = [];
        for (let i = 0; i < campMove.length; i++) {
            if (Tools._instance._willBeEatenFromList(chessData, campMove[i], chessData[campMove[i]], enemy)) {
                list.push(campMove[i]);
            }
        }
        return list;
    };
    // 找出要移动的棋子:尝试走一步后就可以吃别人的
    public findMoveChessIfMoveOnceCanEat(chessData, campMove, enemy) {
        let ret = null;
        for (let i = 0; i < campMove.length; i++) {
            let posWillEat = Tools._instance._getWillEatPos(chessData, campMove[i], enemy);
            if (posWillEat>=0) {
                ret = [campMove[i], posWillEat];
                break;
            }
        }
        return ret;
    };
    // 找出要移动的棋子:尝试走一步后就可以吃多个别人的
    public findMoveChessIfMoveOnceCanEatMany(chessData, campMove) {
        let ret = null;
        for (let i = 0; i < campMove.length; i++) {
            let posWillEatMany = Tools._instance._getWillEatPosMany(chessData, campMove[i]);
            if (posWillEatMany>=0) {
                ret = [campMove[i], posWillEatMany];
                break;
            }
        }
        return ret;
    };
    // 找出要移动的棋子:随便散散步啦
    public findMoveChessTakeAWalk(chessData, campMove) {
        let ret = null;
        if (campMove.length>0) {
            let select = campMove.length>1 ? Tools._instance.randomInt(0, campMove.length-1) : 0;
            let posTo = Tools._instance._getCanMovePos(chessData, campMove[select]);
            ret = [campMove[select], posTo];
        }
        return ret;
    };
    // 是否有没有翻开的棋子
    public haveNoOpenChess(chessData) {
        for (let i = 0; i < chessData.length; i++) {
            if (chessData[i]===LGConfig.NoOpen) {
                return true;
            }
        }
        return false;
    };
    // 这个位置是否有可吃的棋子
    public haveEatChessByPos(chessData, pos) {
        let num = chessData[pos];
        let typeCamp = Math.floor(num/10);
        let camps = Tools._instance.separateChessByCamp(chessData, typeCamp);
        let beEatenPos = Tools._instance._getCanEatPosFromList(chessData, pos, num, camps[1]);
        return beEatenPos>=0;
    };
    // 这个位置是否可以移动
    public canMoveThisPos(chessData, pos) {
        return Tools._instance._getCanMovePos(chessData, pos)>=0;
    };

    // 从pos位置num棋子找出可以吃的位置
    public _getCanEatPosFromList(chessData, pos, num, enemy) {
        let retPos = -1;
        for (let i = 0; i < enemy.length; i++) {
            if (Tools._instance.isGridNeighbour(pos, enemy[i]) && Tools._instance.getEatResult(num, chessData[enemy[i]])>0) {
                retPos = enemy[i];
                break;
            }
        }
        return retPos;
    };
    // 判断如果走到那里会不会被吃
    public willBeEatenIfGoThere(chessData, pos, num) {
        let mytypecamp = Math.floor(num/10);
        return this._walkUpDownLeftRight(pos, (to)=>{
            let toNum = chessData[to];
            if (toNum===LGConfig.NoChess || toNum===LGConfig.NoOpen || mytypecamp===Math.floor(toNum/10)) {
                return false;
            }
            return Tools._instance.getEatResult(toNum, num)>0;
        })>=0;
    };
    // 从pos位置num棋子找出即将要吃我的位置
    public _willBeEatenFromList(chessData, pos, num, enemy) {
        for (let i = 0; i < enemy.length; i++) {
            if (Tools._instance.isGridNeighbour(pos, enemy[i]) && Tools._instance.getEatResult(chessData[enemy[i]], num)>0) {
                return true;
            }
        }
        return false;
    };
    // 从from位置可以移动到那里(只找到一个即可)
    public _getCanMovePos(chessData, from) {
        return Tools._instance._walkUpDownLeftRight(from, (to)=>{
            return chessData[to]===LGConfig.NoChess;
        })
    };
    // 从from位置可以逃走到那里(只找到一个即可)
    public _getEscapePos(chessData, from, enemy) {
        return Tools._instance._walkUpDownLeftRight(from, (to)=>{
            // 如果to是空地 并且 从from移动到to后不会被吃掉
            if (chessData[to]===LGConfig.NoChess && !Tools._instance._willBeEatenFromList(chessData, to, chessData[from], enemy)) {
                return true;
            }
            return false;
        })
    },
    // 从from位置走到to位置可以吃别人(只找到一个即可)
    public _getWillEatPos(chessData, from, enemy) {
        return Tools._instance._walkUpDownLeftRight(from, (to)=>{
            // 如果to是空地 并且 从from移动到to后不会被吃掉且可以吃别人
            if (chessData[to]===LGConfig.NoChess &&
                !Tools._instance._willBeEatenFromList(chessData, to, chessData[from], enemy) &&
                Tools._instance._getCanEatPosFromList(chessData, to, chessData[from], enemy)>=0) {
                return true;
            }
            return false;
        })
    };
    // 从from位置走到to位置可以吃多个别人
    public _getWillEatPosMany(chessData, from) {
        return Tools._instance._walkUpDownLeftRight(from, (to)=>{
            // 如果to是空地 并且 从from移动到to后不会被吃掉且可以吃多个别人
            if (chessData[to]===LGConfig.NoChess &&
                !Tools._instance.willBeEatenIfGoThere(chessData, to, chessData[from]) &&
                Tools._instance.findAllCanEatByPos(chessData, to, chessData[from]).length>1) {
                return true;
            }
            return false;
        })
    };
    public _walkUpDownLeftRight(pos, fun) {
        // 向上
        if (pos<12 && fun(pos+4)) {
            return pos+4;
        }
        // 向下
        if (pos>3 && fun(pos-4)) {
            return pos-4;
        }
        // 向左
        if (pos%4>0 && fun(pos-1)) {
            return pos-1;
        }
        // 向右
        if (pos%4<3 && fun(pos+1)) {
            return pos+1;
        }
        return -1;
    };
    public _walkReturnListUpDownLeftRight(pos, fun) {
        // 向上
        if (pos<12) {
            fun(true, pos+4);
        } else {
            fun(false);
        }
        // 向下
        if (pos>3) {
            fun(true, pos-4);
        } else {
            fun(false);
        }
        // 向左
        if (pos%4>0) {
            fun(true, pos-1);
        } else {
            fun(false);
        }
        // 向右
        if (pos%4<3) {
            fun(true, pos+1);
        } else {
            fun(false);
        }
    };
    // 在这个位置是否可以移动或者吃
    public canMoveOrEatThisPos(chessData, from) {
        return this._walkUpDownLeftRight(from, (to)=>{
            let toNum = chessData[to];
            if (toNum===LGConfig.NoChess) {
                return true;
            }
            if (toNum===LGConfig.NoOpen) {
                return false;
            }
            let camp = Math.floor(toNum/10);
            let mySvrId = LGModel.getMainSvrSeatId();
            if (camp===mySvrId) {
                return false;
            }
            if (Tools._instance.getEatResult(chessData[from], toNum)>0) {
                return true;
            }
            return false;
        })>=0;
    };
    // 依次返回上下左右的移动信息
    public getAllDirectionMoveOrEatThisPos(chessData, fromPos, fromNum) {
        let list = [];
        let typeCamp = Math.floor(fromNum/10);
        Tools._instance._walkReturnListUpDownLeftRight(fromPos, (bol, to)=>{
            if (!bol) {
                list.push(LGConfig.GridInfo.None);
                return;
            }
            let toNum = chessData[to];
            if (toNum===LGConfig.NoChess) {
                list.push(LGConfig.GridInfo.NoChess);
                return;
            }
            if (toNum===LGConfig.NoOpen) {
                list.push(LGConfig.GridInfo.NoOpen);
                return;
            }
            if (typeCamp===Math.floor(toNum/10)) {
                list.push(LGConfig.GridInfo.Teammate);
                return;
            }
            if (Tools._instance.getEatResult(fromNum, toNum)>0) {
                list.push(LGConfig.GridInfo.EnemyYes);
                return;
            }
            list.push(LGConfig.GridInfo.EnemyNo);
        });
        return list;
    };
    // 找出这个位置所有可吃的棋子
    public findAllCanEatByPos(chessData, fromPos, fromNum) {
        let ret = [];
        let list = Tools._instance.getAllDirectionMoveOrEatThisPos(chessData, fromPos, fromNum);
        if (list[0]===LGConfig.GridInfo.EnemyYes)
            ret.push({pos: fromPos+4, num: chessData[fromPos+4]});
        if (list[1]===LGConfig.GridInfo.EnemyYes)
            ret.push({pos: fromPos-4, num: chessData[fromPos-4]});
        if (list[2]===LGConfig.GridInfo.EnemyYes)
            ret.push({pos: fromPos-1, num: chessData[fromPos-1]});
        if (list[3]===LGConfig.GridInfo.EnemyYes)
            ret.push({pos: fromPos+1, num: chessData[fromPos+1]});
        return ret;
    };
    // 找出这个位置所有可移动的空地
    public findAllMoveBlankByPos(chessData, fromPos) {
        let ret = [];
        let list = Tools._instance.getAllDirectionMoveOrEatThisPos(chessData, fromPos, chessData[fromPos]);
        if (list[0]===LGConfig.GridInfo.NoChess)
            ret.push(fromPos+4);
        if (list[1]===LGConfig.GridInfo.NoChess)
            ret.push(fromPos-4);
        if (list[2]===LGConfig.GridInfo.NoChess)
            ret.push(fromPos-1);
        if (list[3]===LGConfig.GridInfo.NoChess)
            ret.push(fromPos+1);
        return ret;
    };
    // 两个格子是否是相邻的(from必须在to的上下左右位置)(0-15)
    public isGridNeighbour(from:number, to:number):boolean {
        if ((to<12 && to+4===from) || (to>3 && to-4===from) || (to%4>0 && to-1===from) || (to%4<3 && to+1===from)) {
            return true;
        }
        return false;
    };
    // 返回动物1吃动物2结果(定义0表示不能吃 1可以吃 2吃了会抵消)
    // 定义个位数数字8-1表示 象>狮>虎>豹>狼>狗>猫>鼠 (鼠可以吃象 相同动物会抵消)
    getEatResult(num1:number, num2:number):number{
        let ret = 0;
        let animal1 = num1%10;
        let animal2 = num2%10;
        if (animal1>animal2) {
            if (animal1===8 && animal2===1) {
                return ret;
            }
            ret = 1;
        } else if (animal1===animal2) {
            ret = 2;
        } else if (animal1===1 && animal2===8) {
            ret = 1;
        }
        return ret;
    };
    //斗兽棋模拟操作
    public getACAction(chairId, action, data) {
        return {
            sign: LGConfig.AnimalChecker,
            chair_id: Tools._instance.isValid(chairId) ? chairId : LGModel.getMainSvrSeatId(),
            action: action || 0,
            list_data: data,
        }
    };
    
};
export const LGTools:Tools = Tools.getInstance();
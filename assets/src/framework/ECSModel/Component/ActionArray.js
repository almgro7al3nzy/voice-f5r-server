"use strict";
// ActionArray 动画列表
let fps = 25; //动画一秒钟的帧数

// 从屏幕外的哪个方向进来
let screenEnum = cc.Enum({
    top: 0,
    down: 1,
    left: 2,
    right: 3,
});

let callDelay= function(node, time, func){
    let del = cc.delayTime(time);
    let cal = cc.callFunc(func);
    let seq = cc.sequence(del, cal);
    node.runAction(seq);
}

// 当scale需要赋值且node上有widget组件时 需要延后一帧执行赋值
let doWidgetDelayAction = function (node, runCall) {
    if (node.getComponent(cc.Widget)) {
        callDelay(node, 1/fps, runCall);
    } else {
        runCall();
    }
}

// 统一方法:多段的动作 isRepeat 默认false
let doSegmentAction = function (node, segments,isRepeat) {
    let actions = [];
    for (let i = 0; i < segments.length; i++) {
        segments[i].convertActionToAry(actions);
    }
    if (actions.length>1) {
    	if(isRepeat){
    		node.runAction(cc.repeatForever(cc.sequence(actions)));
    	}else{
    		node.runAction(cc.sequence(actions));
    	}
    } else if (actions.length===1) {
        node.runAction(actions[0]);
    }
}
// 缩放变化构造
let baseScaleTo = cc.Class({
    name: "baseScaleTo",
    properties: {
        delay: {
            default: 0,
            tooltip: "延迟多少帧后开始变化(0不延迟)"
        },
        time: {
            default: 5,
            tooltip: "本次变化所需帧数"
        },
        scaleX: {
            default: 1,
            tooltip: "x轴变为float"
        },
        scaleY: {
            default: 1,
            tooltip: "y轴变为float"
        },
    },
    convertActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fps));
        }
        ary.push(cc.scaleTo(this.time/fps, this.scaleX, this.scaleY));
    },
});

// 透明度变化构造
let baseFadeTo = cc.Class({
    name: "baseFadeTo",
    properties: {
        delay: {
            default: 0,
            tooltip: "延迟多少帧后开始变化(0不延迟)"
        },
        time: {
            default: 5,
            tooltip: "本次变化所需帧数"
        },
        opacity: {
            default: 0,
            tooltip: "透明度变为(0-255)"
        },
    },
    convertActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fps));
        }
        ary.push(cc.fadeTo(this.time/fps, this.opacity));
    },
});

// 位移变化构造MoveBy
let baseMoveBy = cc.Class({
    name: "baseMoveBy",
    properties: {
        delay: {
            default: 0,
            tooltip: "延迟多少帧后开始变化(0不延迟)"
        },
        time: {
            default: 5,
            tooltip: "本次变化所需帧数"
        },
        offX: {
            default: 0,
            tooltip: "坐标X增量"
        },
        offY: {
            default: 0,
            tooltip: "坐标Y增量"
        },
    },
    convertActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fps));
        }
        ary.push(cc.moveBy(this.time/fps, cc.v2(this.offX, this.offY)));
    },
});

// 位移变化构造MoveTo
let baseMoveTo = cc.Class({
    name: "baseMoveTo",
    properties: {
        delay: {
            default: 0,
            tooltip: "延迟多少帧后开始变化(0不延迟)"
        },
        time: {
            default: 5,
            tooltip: "本次变化所需帧数"
        },
        toX: {
            default: 0,
            tooltip: "到坐标X"
        },
        toY: {
            default: 0,
            tooltip: "到坐标Y"
        },
    },
    convertActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fps));
        }
        ary.push(cc.moveTo(this.time/fps, cc.v2(this.toX, this.toY)));
    },
});

// 旋转变化构造RotateBy
let baseRotateBy = cc.Class({
    name: "baseRotateBy",
    properties: {
        delay: {
            default: 0,
            tooltip: "延迟多少帧后开始变化(0不延迟)"
        },
        time: {
            default: 5,
            tooltip: "本次变化所需帧数"
        },
        rotateAngle: {
            default: 0,
            tooltip: "旋转度数"
        },
    },
    convertActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fps));
        }
        ary.push(cc.rotateBy(this.time/fps, this.rotateAngle));
    },
});

// 旋转变化构造RotateTo
let baseRotateTo = cc.Class({
    name: "baseRotateTo",
    properties: {
        delay: {
            default: 0,
            tooltip: "延迟多少帧后开始变化(0不延迟)"
        },
        time: {
            default: 5,
            tooltip: "本次变化所需帧数"
        },
        rotateAngle: {
            default: 0,
            tooltip: "旋转度数"
        },
    },
    convertActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fps));
        }
        ary.push(cc.rotateTo(this.time/fps, this.rotateAngle));
    },
});

module.exports = {
	mutiScaleTo : {
		name : "mutiScaleTo",
        describe: "多段缩放ScaleTo",
        properties: {
            startScaleX: {
                default: 0.5,
                tooltip: "起始倍数X"
            },
            startScaleY: {
                default: 0.5,
                tooltip: "起始倍数Y"
            },
            segments: {
                type: baseScaleTo,
                default: [],
                tooltip: "每一段的变化"
            },
            isRepeat:{
            	// type: cc.Boolean,
            	default : false,
            	tooltip: "是否开启循环",
            },
        },
        run(node) {
            doWidgetDelayAction(node, ()=>{
                node.scaleX = this.startScaleX;
                node.scaleY = this.startScaleY;
                doSegmentAction(node, this.segments,this.isRepeat);
            })
        },
    },
    mutiFadeTo:{
    	name : "mutiFadeTo",
        describe: "多段透明度FadeTo",
        properties: {
            startOpacity: {
                type: cc.Integer,
                default: 255,
                tooltip: "起始透明度"
            },
            segments: {
                type: baseFadeTo,
                default: [],
                tooltip: "每一段的变化"
            },
            isRepeat:{
            	// type: cc.Boolean,
            	default : false,
            	tooltip: "是否开启循环",
            },
        },
        run(node) {
            node.opacity = this.startOpacity;
            doSegmentAction(node, this.segments,this.isRepeat);
        },
    },
    mutiMoveBy:{
    	name : "mutiMoveBy",
        describe: "多段位移MoveBy",
        properties: {
            segments: {
                type: baseMoveBy,
                default: [],
                tooltip: "每一段的变化"
            },
            isRepeat:{
            	// type: cc.Boolean,
            	default : false,
            	tooltip: "是否开启循环",
            },
        },
        run(node) {
            doSegmentAction(node, this.segments,this.isRepeat);
        },
    },
    mutiMoveTo:{
    	name : "mutiMoveTo",
        describe: "多段位移MoveTo",
        properties: {
            segments: {
                type: baseMoveTo,
                default: [],
                tooltip: "每一段的变化"
            },
            isRepeat:{
            	// type: cc.Boolean,
            	default : false,
            	tooltip: "是否开启循环",
            },
        },
        run(node) {
            doSegmentAction(node, this.segments,this.isRepeat);
        },
    },
    mutiRotateBy:{
    	name : "mutiRotateBy",
        describe: "多段旋转RotateBy",
        properties: {
            startRotate: {
                type: cc.Float,
                default: 0,
                tooltip: "起始角度"
            },
            segments: {
                type: baseRotateBy,
                default: [],
                tooltip: "每一段的变化"
            },
            isRepeat:{
            	// type: cc.Boolean,
            	default : false,
            	tooltip: "是否开启循环",
            },
        },
        run(node) {
            node.rotation = this.startRotate;
            doSegmentAction(node, this.segments,this.isRepeat);
        },
    },
    mutiRotateTo:{
    	name : "mutiRotateTo",
        describe: "多段旋转RotateTo",
        properties: {
            startRotate: {
                type: cc.Float,
                default: 0,
                tooltip: "起始角度"
            },
            segments: {
                type: baseRotateTo,
                default: [],
                tooltip: "每一段的变化"
            },
            isRepeat:{
            	// type: cc.Boolean,
            	default : false,
            	tooltip: "是否开启循环",
            },
        },
        run(node) {
            node.rotation = this.startRotate;
            doSegmentAction(node, this.segments,this.isRepeat);
        },
    },
    flyInWindow:{
     	name: "flyInWindow",
        describe: "从屏幕外回到原位",
        properties: {
            direction: {
                type: screenEnum,
                default: screenEnum.top,
                tooltip: "从哪个方向进来"
            },
            delay: {
                default: 0,
                tooltip: "多少帧后开始移动"
            },
            time: {
                default: 5,
                tooltip: "经过多少帧后回到原位"
            },
        },
        run(node) {
            node._oldX = node.x;
            node._oldY = node.y;
            let frameSize = cc.view.getFrameSize();
            if (this.direction===screenEnum.top) {
                node.y = frameSize.height*0.5+node.height*node.anchorY;
            } else if (this.direction===screenEnum.down) {
                node.y = -frameSize.height*0.5-node.height*(1-node.anchorY);
            } else if (this.direction===screenEnum.left) {
                node.x = -frameSize.width*0.5-node.width*(1-node.anchorX);
            } else if (this.direction===screenEnum.right) {
                node.x = frameSize.width*0.5+node.width*node.anchorX;
            }
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.moveTo(this.time/fpsAni, cc.v2(node._oldX, node._oldY)),
            ));
        },
    },
    flyOutWindow:{
    	name: "flyOutWindow",
        describe: "从原位到屏幕外",
        properties: {
            direction: {
                type: screenEnum,
                default: screenEnum.top,
                tooltip: "往哪个方向出去"
            },
            delay: {
                default: 0,
                tooltip: "多少帧后开始移动"
            },
            time: {
                default: 5,
                tooltip: "经过多少帧后到屏幕外"
            },
        },
        run(node) {
            let x = node.x;
            let y = node.y;
            let frameSize = cc.view.getFrameSize();
            if (this.direction===screenEnum.top) {
                y = frameSize.height*0.5+node.height*node.anchorY;
            } else if (this.direction===screenEnum.down) {
                y = -frameSize.height*0.5-node.height*(1-node.anchorY);
            } else if (this.direction===screenEnum.left) {
                x = -frameSize.width*0.5-node.width*(1-node.anchorX);
            } else if (this.direction===screenEnum.right) {
                x = frameSize.width*0.5+node.width*node.anchorX;
            }
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.moveTo(this.time/fpsAni, cc.v2(x, y)),
            ));
        },
    },
    delayCall:{
    	name : "delayCall",
        describe: "延迟回调",
        properties: {
            delay: {
                default: 0,
                tooltip: "多少帧后开始回调"
            },
            callEvents: {
                type: cc.Component.EventHandler,
                default: [],
                tooltip: "回调事件"
            },
        },
        run(node) {
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.callFunc(()=>{
                    cc.Component.EventHandler.emitEvents(this.callEvents);
                }),
            ));
        },
    },
    delayPlayParticle:{
    	name : "delayPlayParticle",
        describe: "延迟播放粒子特效",
        properties: {
            delay: {
                default: 0,
                tooltip: "多少帧后开始播放"
            },
        },
        run(node) {
            this._myNode = node;
            if (this.delay>0) {
                callDelay(node, this.delay/fpsAni, this._act.bind(this));
            } else {
                this._act();
            }
        },
        _act() {
            let ps = this._myNode.getComponent(cc.ParticleSystem);
            if (ps) {
                ps.resetSystem();
            }
        }
    },
}
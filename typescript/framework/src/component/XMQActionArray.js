// XMQActionArray
// 自定义的动作列表
// 一个动画必须的字段:describe run 可选:properties
// 注意:动画增加必须在最后加 不要插入 会影响编辑器内已经调好的动画
let fpsAni = 25; //动画一秒钟的帧数
// 从屏幕外的哪个方向进来
let screenEnum = cc.Enum({
    top: 0,
    down: 1,
    left: 2,
    right: 3,
});

let callDelay = function(node, time, func) {
    let del = cc.delayTime(time);
    let cal = cc.callFunc(func);
    let seq = cc.sequence(del, cal);
    node.runAction(seq);
};

// 当scale需要赋值且node上有widget组件时 需要延后一帧执行赋值
let setScaleWithWidget = function (node, runCall) {
    if (node.getComponent(cc.Widget)) {
        callDelay(node, 1/fpsAni, runCall);
    } else {
        runCall();
    }
}
// 统一方法:多段的动作
let commonRunParagraphs = function (node, paragraphs) {
    let actions = [];
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].setActionToAry(actions);
    }
    if (actions.length>1) {
        node.runAction(cc.sequence(actions));
    } else if (actions.length===1) {
        node.runAction(actions[0]);
    }
}
// 缩放变化构造
let structureScaleTo = cc.Class({
    name: "structureScaleTo",
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
    setActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fpsAni));
        }
        ary.push(cc.scaleTo(this.time/fpsAni, this.scaleX, this.scaleY));
    },
});
// 透明度变化构造
let structureFadeTo = cc.Class({
    name: "structureFadeTo",
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
    setActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fpsAni));
        }
        ary.push(cc.fadeTo(this.time/fpsAni, this.opacity));
    },
});
// 位移变化构造MoveBy
let structureMoveBy = cc.Class({
    name: "structureMoveBy",
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
    setActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fpsAni));
        }
        ary.push(cc.moveBy(this.time/fpsAni, cc.v2(this.offX, this.offY)));
    },
});
// 位移变化构造MoveTo
let structureMoveTo = cc.Class({
    name: "structureMoveTo",
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
    setActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fpsAni));
        }
        ary.push(cc.moveTo(this.time/fpsAni, cc.v2(this.toX, this.toY)));
    },
});
// 旋转变化构造RotateBy
let structureRotateBy = cc.Class({
    name: "structureRotateBy",
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
    setActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fpsAni));
        }
        ary.push(cc.rotateBy(this.time/fpsAni, this.rotateAngle));
    },
});
// 旋转变化构造RotateTo
let structureRotateTo = cc.Class({
    name: "structureRotateTo",
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
    setActionToAry(ary) {
        if (this.delay>0) {
            ary.push(cc.delayTime(this.delay/fpsAni));
        }
        ary.push(cc.rotateTo(this.time/fpsAni, this.rotateAngle));
    },
});


module.exports = [
    {
        describe: "动画ForeverRotateBy",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟多少帧后开始转。0不延迟"
            },
            rotateTime: {
                default: 5,
                tooltip: "旋转一次所需帧数"
            },
            rotateAngle: {
                default: 360,
                tooltip: "旋转一次所转角度"
            },
        },
        run(node) {
            this._myNode = node;
            if (this.delay===0) {
                this._act();
            } else {
                callDelay(node, this.delay/fpsAni, this._act.bind(this));
            }
        },
        _act() {
            this._myNode.runAction(cc.repeatForever(cc.rotateBy(this.rotateTime/fpsAni, this.rotateAngle)));
        },
    },

    {
        describe: "ForeverMoveBy",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟多少帧后开始永动。0不延迟"
            },
            time1: {
                default: 5,
                tooltip: "移动出去所需帧数"
            },
            time2: {
                default: 5,
                tooltip: "移动回来所需帧数"
            },
            offX: {
                default: 5,
                tooltip: "位移坐标x"
            },
            offY: {
                default: 5,
                tooltip: "位移坐标y"
            },
        },
        run(node) {
            this._myNode = node;
            if (this.delay===0) {
                this._act();
            } else {
                callDelay(node, this.delay/fpsAni, this._act.bind(this));
            }
        },
        _act() {
            this._myNode.runAction(cc.repeatForever(cc.sequence(
                cc.moveBy(this.time1/fpsAni, cc.v2(this.offX, this.offY)),
                cc.moveBy(this.time2/fpsAni, cc.v2(-this.offX, -this.offY))
            )));
        },
    },

    {
        describe: "透明度0 从某处 回到正常位置透明度100",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "经过帧数"
            },
            boolChangeX: {
                default: true,
                tooltip: "坐标x是否赋值为startX"
            },
            boolChangeY: {
                default: true,
                tooltip: "坐标y是否赋值为startY"
            },
            startX: {
                default: 0,
                tooltip: "起始坐标x"
            },
            startY: {
                default: 0,
                tooltip: "起始坐标y"
            },
        },
        run(node) {
            if (!node.oldY) {
                node.oldX = node.x;
                node.oldY = node.y;
            }
            node.x = this.boolChangeX ? this.startX : node.oldX;
            node.y = this.boolChangeY ? this.startY : node.oldY;
            node.opacity = 0;
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.spawn(cc.moveTo(this.time/fpsAni, cc.v2(node.oldX, node.oldY)), cc.fadeIn(this.time/fpsAni)),
            ));
        },
    },

    {
        describe: "飘带 延迟delay帧，开始做Y轴缩放 time1 帧到scaleY1  time2到 scaleY2",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            boolScaleX: {
                default: false,
                tooltip: "x轴是否缩放"
            },
            actBeforeScaleX: {
                default: 0,
                tooltip: "做动画前x轴缩放值"
            },
            boolScaleY: {
                default: false,
                tooltip: "y轴是否缩放"
            },
            actBeforeScaleY: {
                default: 0,
                tooltip: "做动画前y轴缩放值"
            },
            time1: {
                default: 5,
                tooltip: "经过时间1帧数"
            },
            scaleX1: {
                default: 1,
                tooltip: "x轴缩放值"
            },
            scaleY1: {
                default: 1,
                tooltip: "y轴缩放值"
            },
            time2: {
                default: 5,
                tooltip: "经过时间2帧数"
            },
            scaleX2: {
                default: 1,
                tooltip: "x轴缩放值"
            },
            scaleY2: {
                default: 1,
                tooltip: "y轴缩放值"
            },
        },
        run(node) {
            if (!node.oldScaleX) {
                node.oldScaleX = node.scaleX;
            }
            if (!node.oldScaleY) {
                node.oldScaleY = node.scaleY;
            }
            node.opacity = 0;
            setScaleWithWidget(node, ()=>{
                node.opacity = 255;
                node.scaleX = this.boolScaleX ? this.actBeforeScaleX: node.oldScaleX;
                node.scaleY = this.boolScaleY ? this.actBeforeScaleY: node.oldScaleY;
                node.runAction(cc.sequence(
                    cc.delayTime(this.delay/fpsAni),
                    cc.scaleTo(this.time1/fpsAni, this.scaleX1, this.scaleY1),
                    cc.scaleTo(this.time2/fpsAni, this.scaleX2, this.scaleY2),
                ));
            })
        },
    },

    {
        describe: "缩小xx倍透明度0 到xx帧 正常大小透明度100",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "经过帧数"
            },
            startScale: {
                default: 0.5,
                tooltip: "起始倍数"
            },
        },
        run(node) {
            node.opacity = 0;
            setScaleWithWidget(node, ()=>{
                node.scale = this.startScale;
                node.runAction(cc.sequence(
                    cc.delayTime(this.delay/fpsAni),
                    cc.spawn(cc.scaleTo(this.time/fpsAni, 1), cc.fadeIn(this.time/fpsAni)),
                ));
            })
        },
    },

    {
        describe: "从xx帧透明度0% 到xx帧透明度100%",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "出现帧数"
            },
        },
        run(node) {
            node.opacity = 0;
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.fadeIn(this.time/fpsAni),
            ));
        },
    },

    {
        describe: "旋转:从xx帧旋转xx度透明度0 到xx帧旋转xx度透明度100 到xx帧正常",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            time1: {
                default: 5,
                tooltip: "第一个旋转所需帧数"
            },
            time2: {
                default: 5,
                tooltip: "旋转到正常所需帧数"
            },
            rotate1: {
                default: 30,
                tooltip: "起始旋转度数"
            },
            rotate2: {
                default: -30,
                tooltip: "掉头旋转度数"
            },
        },
        run(node) {
            node.opacity = 0;
            node.rotation = this.rotate1;
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.spawn(cc.rotateTo(this.time1/fpsAni, this.rotate2), cc.fadeIn(this.time1/fpsAni)),
                cc.rotateTo(this.time2/fpsAni, 0),
            ));
        },
    },

    {
        describe: "显示移动 从xx帧透明度0% 到xx帧透明度100%并移动xx位置",
        properties: {
            delay: {
                default: 1,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "出现移动帧数"
            },
            moveX: {
                default: 0,
                tooltip: "移动X距离"
            },
            moveY: {
                default: 0,
                tooltip: "移动Y距离"
            }
        },
        run(node) {
            node.x = node.x - this.moveX;
            node.y = node.y - this.moveY;
            node.opacity = 0;
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.spawn(cc.fadeIn(this.time/fpsAni),
                    cc.moveTo(this.time/fpsAni,node.x+this.moveX,node.y+this.moveY)),
            ));
        },
    },

    {
        describe: "显示缩放 从xx帧透明度0% 到xx帧透明度100%并缩放XY倍",
        properties: {
            delay: {
                default: 1,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "出现缩放帧数"
            },
            scaleX: {
                default: 1,
                tooltip: "开始缩放X"
            },
            scaleEndX: {
                default: 1,
                tooltip: "结束缩放X"
            },
            scaleY: {
                default: 1,
                tooltip: "开始缩放Y"
            },
            scaleEndY: {
                default: 1,
                tooltip: "结束缩放Y"
            }
        },
        run(node) {
            node.opacity = 0;
            setScaleWithWidget(node, ()=>{
                node.scaleX = this.scaleX;
                node.scaleY = this.scaleY;
                node.runAction(cc.sequence(
                    cc.delayTime(this.delay/fpsAni),
                    cc.spawn(cc.fadeIn(this.time/fpsAni),
                        cc.scaleTo(this.time/fpsAni,this.scaleEndX,this.scaleEndY)),
                ));
            })
        },
    },

    {
        describe: "旋转(循环):经过xx帧旋转xx度，经过xx帧又回来",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            time1: {
                default: 5,
                tooltip: "旋转出去所需帧数"
            },
            time2: {
                default: 5,
                tooltip: "旋转回来所需帧数"
            },
            rotateAngle: {
                default: 10,
                tooltip: "旋转出去度数"
            },
        },
        run(node) {
            this._myNode = node;
            if (this.delay===0) {
                this._act();
            } else {
                callDelay(node, this.delay/fpsAni, this._act.bind(this));
            }
        },
        _act() {
            this._myNode.runAction(cc.repeatForever(cc.sequence(
                cc.rotateBy(this.time1/fpsAni, this.rotateAngle),
                cc.rotateBy(this.time2/fpsAni, -this.rotateAngle),
            )));
        },
    },

    {
        describe: "来回缩放Q谭效果 从xx帧缩放 到xx帧缩放循环",
        properties: {
            delay: {
                default: 1,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "缩放帧数"
            },
            scaleStartX: {
                default: 1,
                tooltip: "开始缩放X"
            },
            scaleEndX: {
                default: 1,
                tooltip: "结束缩放X"
            },
            scaleStartY: {
                default: 1,
                tooltip: "开始缩放Y"
            },
            scaleEndY: {
                default: 1,
                tooltip: "结束缩放Y"
            }
        },
        run(node) {
            node.runAction(cc.sequence(
                cc.delayTime(this.delay/fpsAni),
                cc.callFunc(()=>{
                    setScaleWithWidget(node, ()=>{
                        node.scaleX = this.scaleStartX;
                        node.scaleY = this.scaleStartY;
                        node.runAction(cc.repeatForever(cc.sequence(
                            cc.scaleTo(this.time/fpsAni,this.scaleEndX,this.scaleEndY),
                            cc.scaleTo(this.time/fpsAni,this.scaleStartX,this.scaleStartY),
                        )));
                    })
                })
            ));
        },
    },
    {
        describe: "旋转缩放:从xx帧旋转xx度透明度0缩放x 到xx帧旋转xx度透明度100缩放x",
        properties: {
            delay: {
                default: 0,
                tooltip: "延迟帧数"
            },
            time: {
                default: 5,
                tooltip: "所需帧数"
            },
            rotate1: {
                default: 0,
                tooltip: "起始旋转度数"
            },
            rotate2: {
                default: 0,
                tooltip: "旋转后度数"
            },
            scale1: {
                default: 1,
                tooltip: "缩放前"
            },
            scale2: {
                default: 1,
                tooltip: "缩放后"
            },
        },
        run(node) {
            node.opacity = 0;
            node.rotation = this.rotate1;
            setScaleWithWidget(node, ()=>{
                node.scale = this.scale1;
                node.runAction(cc.sequence(
                    cc.delayTime(this.delay/fpsAni),
                    cc.spawn(cc.fadeIn(this.time/fpsAni),
                        cc.rotateTo(this.time/fpsAni, this.rotate2),
                        cc.scaleTo(this.time/fpsAni,this.scale2)),
                ));
            })
        },
    },

    {
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
            paragraphs: {
                type: structureScaleTo,
                default: [],
                tooltip: "每一段的变化"
            },
        },
        run(node) {
            setScaleWithWidget(node, ()=>{
                node.scaleX = this.startScaleX;
                node.scaleY = this.startScaleY;
                commonRunParagraphs(node, this.paragraphs);
            })
        },
    },

    {
        describe: "多段透明度FadeTo",
        properties: {
            startOpacity: {
                type: cc.Integer,
                default: 255,
                tooltip: "起始透明度"
            },
            paragraphs: {
                type: structureFadeTo,
                default: [],
                tooltip: "每一段的变化"
            },
        },
        run(node) {
            node.opacity = this.startOpacity;
            commonRunParagraphs(node, this.paragraphs);
        },
    },

    {
        describe: "多段位移MoveBy",
        properties: {
            paragraphs: {
                type: structureMoveBy,
                default: [],
                tooltip: "每一段的变化"
            },
        },
        run(node) {
            commonRunParagraphs(node, this.paragraphs);
        },
    },

    {
        describe: "多段位移MoveTo",
        properties: {
            paragraphs: {
                type: structureMoveTo,
                default: [],
                tooltip: "每一段的变化"
            },
        },
        run(node) {
            commonRunParagraphs(node, this.paragraphs);
        },
    },

    {
        describe: "多段旋转rotateBy",
        properties: {
            startRotate: {
                type: cc.Float,
                default: 0,
                tooltip: "起始角度"
            },
            paragraphs: {
                type: structureRotateBy,
                default: [],
                tooltip: "每一段的变化"
            },
        },
        run(node) {
            node.rotation = this.startRotate;
            commonRunParagraphs(node, this.paragraphs);
        },
    },

    {
        describe: "多段旋转rotateTo",
        properties: {
            startRotate: {
                type: cc.Float,
                default: 0,
                tooltip: "起始角度"
            },
            paragraphs: {
                type: structureRotateTo,
                default: [],
                tooltip: "每一段的变化"
            },
        },
        run(node) {
            node.rotation = this.startRotate;
            commonRunParagraphs(node, this.paragraphs);
        },
    },

    {
        describe: "hide一段时间后show(hide和show当帧就会执行)",
        properties: {
            delay: {
                default: 5,
                tooltip: "多少帧后show"
            },
        },
        run(node) {
            node.runAction(cc.sequence(
                cc.hide(),
                cc.delayTime(this.delay/fpsAni),
                cc.show(),
            ));
        },
    },

    {
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

    {
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

    {
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

    {
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
];
// MaskComponent
// 低版本橡皮檫 高版本还没有尝试

cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "自定义/MaskComponent",
    },
    properties: {
    },
    onLoad() {
        this.render = cc.RenderTexture.create(1334, 750);
        this.node._sgNode.addChild(this.render);
        this.render.begin();
        //纯色填充
        this.bgDrawNode = new cc.DrawNode();
        this.bgDrawNode.setDrawColor(new cc.Color(0, 100, 0, 255));
        this.bgDrawNode.drawRect(cc.v2(0, 0), cc.v2(1334, 750), new cc.Color(50, 200, 50, 255), 10);
        this.bgDrawNode.visit();
        this.render.end();
        this.bgDrawNode.release();
        //擦除Node
        this.eraserDrawNode = new cc.DrawNode();
        this.eraserDrawNode.setBlendFunc(cc.macro.ZERO,cc.macro.ONE_MINUS_SRC_ALPHA);
        //触摸擦除
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (touch) => {
            cc.log("TOUCH_START");
            var touchLocation = touch.getLocation();
            //清除下DrawNode，否则会使DrawVert数目暴增
            this.eraserDrawNode.clear();
            this.eraserDrawNode.drawDot(
                touchLocation,//位置
                50,//半径
                new cc.Color(255, 255, 255, 255)
            );
            this.render.begin();
            this.eraserDrawNode.visit();
            this.render.end();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_START, (touch) => {
            cc.log("TOUCH_START");
            var touchLocation = touch.getLocation();
            // let data = {}
            // this.render.readPixels(data,touchLocation.x,touchLocation.y,10,10);
            // cc.log(data)
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, (touch) => {
            cc.log("TOUCH_START");
            var touchLocation = touch.getLocation();
        }, this);  
    },
});

/*///////////////////////////////////////////////////*
// test
// test
let R = 100,ex = 200,ey = 200;
let points=[
    cc.p(ex + R*Math.cos(Math.PI/2),ey + R*Math.sin(Math.PI/2)),
    cc.p(ex - R*Math.cos(Math.PI*1/10),ey + R*Math.sin(Math.PI*1/10)),
    cc.p(ex - R*Math.cos(Math.PI*3/10),ey - R*Math.sin(Math.PI*3/10)),
    cc.p(ex + R*Math.cos(Math.PI*3/10),ey - R*Math.sin(Math.PI*3/10)),
    cc.p(ex + R*Math.cos(Math.PI*1/10),ey + R*Math.sin(Math.PI*1/10)),
]
console.log(points)

//  var angle = cc.pToAngle(36) / Math.PI * 180;

cc.Class({
    extends: cc.Component,

    properties: {
        mScrollView: {
            default: null,
            type: cc.ScrollView
        },
        mTempleItem: cc.Node,
        mGraphicsNode : cc.Node,
    },
    onLoad() {
        this.ripples = [];
        this.cricle = [];
        this.initGraphics();
        this.initScroll();

        this.initEvent();
        this.addRipple();
    },
    initEvent(){
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                this.addRipple();
                cc.log("[console:]========>> begin");
                return true;
            },
            onTouchMoved: function (touch, event) {
                cc.log("[console:]========>> move");
                return true;
            },
            onTouchEnded: () => {
                cc.log("[console:]========>> ended");
                this.input = false;
            }
        }, this.node);
    },
    onTouchBegan(touch,event){
        cc.log("[console:]========>> begin");
        this.mouse = touch.getLocation();
        this.addRipple();
        return true;
    },
    onTouchMoved(touch,event){
        cc.log("[console:]========>> move");
        return true;
    },
    onTouchEnd(touch,event){
        cc.log("[console:]========>> ended");
    },

    initGraphics(){
        this.graphics = this.mGraphicsNode.getComponent(cc.Graphics);
    },
    initScroll(){
        this._pi=[0,Math.PI/6,Math.PI/2,Math.PI*5/6,Math.PI,Math.PI*7/6,Math.PI*3/2,Math.PI*11/6];
        this.content = this.mScrollView.content;
        for(let i=0;i<100;i++){
            let item =  cc.instantiate(this.mTempleItem);
            let num = item.getChildByName("num")
            num.getComponent(cc.Label).string = i;
            item.x = 200 +i*180;
            // item.y = Math.sin(this._pi[i%8])*250;
            item.y = Math.sin(Math.PI/4*i)*250;
            this.content.width += 200;
            this.content.addChild(item);
        }
    },
    OnBtnRigthClick(event){
        cc.log(this.mScrollView.getMaxScrollOffset())
        this.mScrollView.scrollToOffset(cc.p(-1144, 0), 2);
        cc.log(this.mScrollView.getContentPosition())
    },
    OnBtnLeftClick(event){
        cc.log(this.mScrollView.getMaxScrollOffset())
        this.mScrollView.scrollToOffset(cc.p(1144, 0), 2);
        cc.log(this.mScrollView.getContentPosition())
    },
    update(dt){
        let ripples = this.ripples;
        for(var i = 0; i < ripples.length; i++) {
            var ripple = ripples[i];
            ripple.reactivity += 5;
            ripple.fade -= 0.05;
            ripple.time += dt;
            ripple.r +=10;
            ripple.theta ++;
            if(ripple.fade <= 0.0)
                ripples.splice(i, 1);
        }

        let cricle = this.cricle;
        for(var i=0;i< cricle.length;i++){
            var c = cricle[i];
            c.t += dt;
            c.x = c.x1 + c.r*Math.sin(c.t);
            c.y = c.y1 + c.r*Math.cos(c.t);
        }
        this.render();
    },
    render(){
        let ripples = this.ripples;
        let graphics = this.graphics;
        graphics.clear();
        for(var i = 0; i < ripples.length; i++) {
            var ripple = ripples[i];
            let fillColor = cc.hexToColor('#ffff00');
            fillColor.a = ripple.fade * 255;
            graphics.fillColor = fillColor;
            graphics.circle(ripple.x, ripple.y, ripple.reactivity);
            graphics.fill();
        }
        let cricle = this.cricle;
        for(var i=0;i< cricle.length;i++){
            var c = cricle[i];
            let fillColor = cc.hexToColor('#ff00ff');
            graphics.fillColor = fillColor;
            graphics.circle(c.x, c.y, 10);
            graphics.fill();
        }

        if(ripples.length>0){
            let fillColor = cc.hexToColor('#00ffff');
            graphics.fillColor = fillColor;
            graphics.moveTo(ripples[0].x,ripples[0].y);
            for(var i = 1; i < ripples.length; i++) {
                var ripple = ripples[i];
                graphics.lineTo(ripple.x, ripple.y);
            }
            graphics.close();
            graphics.stroke();
            graphics.fill();
        }

        if(ripples.length>0){
            let fillColor = cc.hexToColor('#00ff00');
            graphics.fillColor = fillColor;
            graphics.moveTo(ex + ripples[0].r*Math.cos(Math.PI/2),ey + ripples[0].r*Math.sin(Math.PI*1/2));
            graphics.lineTo(ex - ripples[0].r*Math.cos(Math.PI*1/10),ey + ripples[0].r*Math.sin(Math.PI*1/10));
            graphics.lineTo(ex - ripples[0].r*Math.cos(Math.PI*3/10),ey - ripples[0].r*Math.sin(Math.PI*3/10));
            graphics.lineTo(ex + ripples[0].r*Math.cos(Math.PI*3/10),ey - ripples[0].r*Math.sin(Math.PI*3/10));
            graphics.lineTo(ex + ripples[0].r*Math.cos(Math.PI*1/10),ey + ripples[0].r*Math.sin(Math.PI*1/10));
            graphics.close();
            graphics.stroke();
            graphics.fill();
        }
    },
    addRipple(){
        this.input = true;
        for(let i=0;i<5;i++){
            this.ripples.push({
                x: points[i].x,
                y: points[i].y,
                reactivity: 0,
                fade: 1.0,
                r: 0,
                theta: 0,
            });
        }

        this.cricle.push({
            x: 0,
            y: 0,
            x1: 100,
            y1: 100,
            r: 50,
            t:0,
        });

        // let graphics = this.graphics;
        // graphics.clear();
        // let fillColor = cc.hexToColor('#ffffff');
        // graphics.lineWidth = 10;
        // graphics.fillColor = fillColor;
        // let R = Math.randomInt(100,200);
        // // graphics.circle(R, R, R);
        // for(let i=0;i<5;i++){
        //     graphics.circle(points[i].x, points[i].y, 10);
        // }
        // graphics.stroke();
        // graphics.fill();
    },
});
*////////////////////////////////////////////////////////////////////
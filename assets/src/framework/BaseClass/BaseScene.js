// BaseScene
// 场景基类
cc.Class({
	extends: cc.Component,
	
	properties:{
        adapterNode: {
            type: cc.Node,
            default: null,
            tooltip: "适配节点(不要在节点上加widget,会使得代码适配被覆盖)",
        },
		prefabs: {
			type: cc.Prefab,
			default: [],
			tooltip: "场景中其他prefad",
		},
	},
	// 子类onLoad this._super()
	onLoad(){
        GUtil.addNodeEventListener("ClickLeaveScene", this._onPresseBack, this);
        this._autoAdapter();
        this._addPrefabs();
        this._addVersionLabel('');
	},
    __preload: function () {
        if(!CC_EDITOR) {
           cc.log(`[scene]preload: ${this.__classname__}`);
        }
    },
    // 子类onEnable this._super()
    onEnable: function () {
        if(!CC_EDITOR) {
           cc.log(`[scene]onEnable: ${this.__classname__}`);
        }
    },
    // 子类onDisable this._super()
    onDisable: function () {
        if(!CC_EDITOR) {
           cc.log(`[scene]onDisable: ${this.__classname__}`);
        }
    },
   
	// 按钮事件
	_onKeyPressed(event){
		//还回
		// if (event.keyCode === cc.macro.KEY.back || event.keyCode === cc.macro.KEY.escape) {
        if (event.keyCode === cc.macro.KEY.back) {
			this._onPresseBack();
		}
	},
	//还回
	_onPresseBack(){
        if (this.onExitScene) {
            this.onExitScene();
        }
	},
    // 适配
    // canvs 画布
    // orientation 适配方案 游戏启动时预设的适配 cc.macro.ORIENTATION_LANDSCAPE or cc.macro.ORIENTATION_PORTRAIT
    // 默认设置 横屏 ORIENTATION_LANDSCAPE
    // adapterNode 适配时使用的节点 用于旋转 适配根节点(一般情况下为空，在需要旋转屏幕时存在)
    _autoAdapter: function(canvs,orientation,adapterNode){
        let canvs = this.node.getComponent(cc.Canvas);
        let orientation = cc.macro.ORIENTATION_LANDSCAPE;
        let adapterNode = this.adapterNode;
        //交换宽高
        function _swapSize(size){
            let w = size.width;
            size.width = size.height;
            size.height = w;
        };
        //
        function _widgetNode(canvs,node){
            if (node === null) {
                return;
            }
            if (node.needAdjust) {
                node.width = canvs.node.height;
                node.height = canvs.node.width;
            } else {
                node.width = canvs.node.width;
                node.height = canvs.node.height;
            } 
        };
        // 旋转屏幕(仅在windows上测试时真的旋转)
        // canvs 画布
        // orientation 启动方向
        // adapterNode 适配节点
        // designOrientation 设计方向
        // designSize 设计大小
        // frameSize frame 大小
        function _adjustOrientation(canvs,orientation,adapterNode,designOrientation,designSize,frameSize){
            if (cc.sys.os === "Windows") {
                cc.view.setDesignResolutionSize(designSize.width, designSize.height);
                cc.view.setFrameSize(frameSize.height, frameSize.width);
                cc.view.setOrientation(designOrientation);
            } else {
                // 真机上并不旋转屏幕 只把根节点旋转即可
                if (adapterNode === null) {
                    cc.error("adapterNode is null when orientation rotate need set node");
                    return
                }
                let bol = false;
                let rotate = 0;
                if (orientation === cc.macro.ORIENTATION_LANDSCAPE && designOrientation === cc.macro.ORIENTATION_PORTRAIT) {
                    bol = true;
                    rotate = -90;
                } else if (orientation === cc.macro.ORIENTATION_PORTRAIT && designOrientation === cc.macro.ORIENTATION_LANDSCAPE) {
                    bol = true;
                    rotate = 90;
                }
                if (bol) {
                    // 首先把 Canvas 的设计分辨率互换
                    // 其次把 根节点 旋转
                    canvs.designResolution = cc.size(designSize.height, designSize.width);
                    adapterNode.rotation = rotate;
                    adapterNode.needAdjust = true;
                }
            }
        };

        // 粗暴的根据画布的尺寸来区分当前画布设计为横屏还是竖屏
        // let designSize = cc.size(canvs.designResolution.width, canvs.designResolution.height);
        let designSize = canvs.designResolution;
        let designOrientation = cc.macro.ORIENTATION_PORTRAIT;//竖屏
        if (designSize.width > designSize.height) {
            designOrientation = cc.macro.ORIENTATION_LANDSCAPE; //横屏
        }
        // 粗暴的根据尺寸来区分现在设备处于横屏还是竖屏
        // let viewSize = cc.view.getFrameSize();
        // let frameSize = cc.size(viewSize.width, viewSize.height);
        let frameSize = cc.view.getFrameSize();
        let frameOrientation = cc.macro.ORIENTATION_PORTRAIT;
        if (frameSize.width > frameSize.height) {
            frameOrientation = cc.macro.ORIENTATION_LANDSCAPE;
        }
        if (frameOrientation !== designOrientation) {
            _adjustOrientation(canvs, orientation, adapterNode, designOrientation, designSize, frameSize);
        }
        // 与启动方向不一致时，交换一下
        if (orientation === cc.macro.ORIENTATION_LANDSCAPE) {
            if (designOrientation === cc.macro.ORIENTATION_PORTRAIT) {
                _swapSize(designSize);
            }
            if (frameOrientation === cc.macro.ORIENTATION_PORTRAIT) {
                _swapSize(frameSize);
            }
        } else {
            if (designOrientation === cc.macro.ORIENTATION_LANDSCAPE) {
                _swapSize(designSize);
            }
            if (frameOrientation === cc.macro.ORIENTATION_LANDSCAPE) {
                _swapSize(frameSize);
            }
        }
        // 适配方案(留黑边方案)
        if (designSize.width / designSize.height > frameSize.width / frameSize.height) {
            canvs.fitWidth = true;
            canvs.fitHeight = false;
        } else {
            canvs.fitWidth = false;
            canvs.fitHeight = true;
        }
        _widgetNode(canvs, adapterNode);

        //常驻节点适配
        let persistNode = GPersistNode;
        if ("undefined" !== typeof persistNode && persistNode.isValid) {
            persistNode.rotation = this.node.rotation;
            persistNode.width = this.node.width;
            persistNode.height = this.node.height;
            persistNode.x = persistNode.rotation!==0 ? persistNode.height*0.5 : persistNode.width*0.5;
            persistNode.y = persistNode.rotation!==0 ? persistNode.width*0.5 : persistNode.height*0.5;
        }
    },
    // 将prefab上的脚本给场景脚本直接使用
    _addPrefabs: function () {
        for (let i = 0; i < this.prefabs.length; i++) {
            if (this.prefabs.hasOwnProperty(i) && this.prefabs[i]) {
                let node = cc.instantiate(this.prefabs[i]);
                cc.director.getScene().__pageRootNode.addChild(node);
                this[`_${node._name}`] = node.getComponent(node._name);
            }
        }
    },
    // 添加版本文本
    _addVersionLabel(version) {
        let parent = this.node;
        let nodeLabel = new cc.Node();
        let label = nodeLabel.addComponent(cc.Label);
        label.fontSize = 20;
        label.lineHeight = 20;
        label.string = version;
        nodeLabel.opacity = 150;
        nodeLabel.anchorX = 1;
        nodeLabel.anchorY = 0;
        nodeLabel.x = parent.width*0.5;
        nodeLabel.y = -parent.height*0.5;
        nodeLabel.color = nodeLabel.color.fromHEX('#960096');
        parent.addChild(nodeLabel, 99);
    },
})
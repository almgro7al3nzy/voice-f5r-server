//累计登陆视图控制器
var VO = {
    DragVO : {//扡动事件
        offset : {x:0, y:0},
        startPoint : {x:0, y:0},
        isDrag : false//是否是拖动
    }
};
//加载资源枚举
var SourceTypeEnum = cc.Enum({
    'Asset' : 1,
    'RawAsset' : 2
});
cc.Class({
    extends: cc.Component,
    properties: {
        //所有预置的引用
        perfabMaps : {
            default:{}
        },
        //所有图片帧的引用
        spriteFrameMaps:{
            default:{}
        },
        //所有图集的引用
        spriteAtlasMaps:{
            default:{}
        },
        //所有地图引用
        tiledMapAssetMaps:{
            default:{}
        },
    },
    onLoad: function () {
        this.cityMap = {}
    },
    onExit:function(){
        cc.log("onexit")
    },
    preload:function(cb) {
        var list = [
            ['test/big', cc.TiledMapAsset],
        ];
        this.preloadArray(list, function(is, per){
            if (is) cb();
        })
    },

    setNodePosition:function(x, y){
        this.node.setPosition(x - 480, y - 320)
    },
    getNodePosition:function (argument) {
        var _p = this.node.getPosition()
        _p.x += 480
        _p.y += 320
        return _p
    },
    getMapSize:function(){
        var size = this.node.getComponent(cc.TiledMap).getMapSize()
        var tieldSize = this.node.getComponent(cc.TiledMap).getTileSize()
        var mapSize = cc.size(size.width * tieldSize.width, size.height * tieldSize.height)
        return mapSize
    },
    start:function(){
        var self = this
        // this.cityNode.setPosition(0, 0)
        this.preload(function(){
            // cc.director.setDisplayStats(true)
            self.initTouchEvent()
            var tmxAsset = self.getTmxAsset('big')
            self.node.getComponent(cc.TiledMap).tmxAsset = tmxAsset
            //特效层
            self.showTilesAtDisplayPoint(cc.v2(480, 320))
        })
    },

    //取得地图处于屏幕正中间的点
    //地图anchor 0, 0.5
    getDisplayCenterPoint:function(){
        var size = this.getMapSize()
        var anchor = this.node.getAnchorPoint()
        var point = this.getNodePosition()
        var scale = this.node.getScale()
        var p = cc.v2((480 - point.x) / scale, (320 - point.y) / scale )
        p.x = parseInt(p.x)
        p.y = parseInt(p.y)
        // cc.log("getDisplayCenterPoint", size, anchor, point, scale, p.x, p.y)
        return p
    },

    getMapFullSize:function(){
        var size = this.node.getComponent(cc.TiledMap).getMapSize()
        var tieldSize = this.node.getComponent(cc.TiledMap).getTileSize()
        return cc.size(size.width * tieldSize.width, size.height * tieldSize.height)
    },

    //处理地图拖动相关
    initTouchEvent:function(){
        var self = this
        // 添加单点触摸事件监听器
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                cc.log('Touch Began: ' , event);
                self.drag = cc.instantiate(VO.DragVO)
                var startPoint = cc.instantiate(touches.getLocation())
                var mapStartPoint = self.node.getPosition()
                self.drag.startPoint = startPoint
                self.drag.offset.x = mapStartPoint.x - startPoint.x;
                self.drag.offset.y = mapStartPoint.y - startPoint.y;
                return true; //这里必须要写 return true 
            },
            onTouchMoved: function (touches, event) {
                // cc.log('Touch Moved: ' + event);
                var point = touches.getLocation()
                if (point.sub(self.drag.startPoint).mag() > 2) {//是移动
                    self.drag.isDrag = true
                    var p = cc.v2(point.x + self.drag.offset.x, point.y + self.drag.offset.y)
                    self.node.setPosition(p)
                }
            },
            onTouchEnded: function (touches, event) {
               // cc.log('Touch Ended: ' + event);
                if (self.drag.isDrag) {
                    self.onPositionChange(touches.getLocation())
                } else {
                    
                }
            },
            onTouchCancelled: function (touches, event) {
               // cc.log('Touch Cancelled: ' + event);
                if (self.drag.isDrag) {
                    self.onPositionChange(touches.getLocation())
                }
            }
        }
        // 绑定单点触摸事件
        cc.eventManager.addListener(listener, this.node);
    },

    onPositionChange:function(p){
         this.showTilesAtDisplayPoint(cc.v2(480, 320))
    },

    //地图中心点0 0.5的坐标取对应点所在xy
    getTileXYByInMapPosition:function(p){
        var tieldSize = this.node.getComponent(cc.TiledMap).getTileSize()
        var mapSize = this.node.getComponent(cc.TiledMap).getMapSize()
        var TileW = tieldSize.width
        var TileH = tieldSize.height
        var N = p.x/TileW - p.y/TileH
        var M = p.x/TileW + p.y/TileH
        var x = N
        var y = mapSize.height - M
        // cc.log("getTileXYByInMapPosition", p, x, y)
        x = parseInt(x)
        y = parseInt(y)
        return cc.v2(x, y)
    },

    //取得外部某点相对于地图0,0.5的距离
    getDisplayPointToMapZeroHalf:function(p)
    {
        var fullSize = this.getMapFullSize()
        var anchor = this.node.getAnchorPoint()
        var mp = this.getNodePosition()
        var scale = this.node.getScale()
        var _x = (fullSize.width * anchor.x - mp.x + p.x) / scale;
        var _y = (fullSize.height * anchor.y - mp.y + p.y - fullSize.height / 2) / scale;
        var off = cc.v2(0, 0)//转换的坐标不知道为什么存在一点稳定的偏移 先添加常规偏移量解决
        _x += off.x/scale
        _y += off.y/scale
        return cc.v2(_x, _y)
    },
    //根据屏幕坐标显示格子
    showTilesAtDisplayPoint:function (p) {
         var mapPosition = this.getDisplayPointToMapZeroHalf(p)
         var tileP = this.getTileXYByInMapPosition(mapPosition)
         this.showTilesAtMapPoint(tileP.x, tileP.y)
    },

    //显示指定xy的格子 即周围正负3的格子
    //移除超过x y 多少的格子
    showTilesAtMapPoint:function(x, y){
        cc.log("showTilesAtMapPoint", x, y)
        var layers = this.node.getComponent(cc.TiledMap).getLayers()
        for (var i in layers) {
            // layers[i].setupTilesBeyondPos(cc.v2(x, y), 11)
        }
    },

    close:function(){
    },

    //////////////////
    //预加载
    //list array
    preloadArray : function(list, cb)
    {
        var total = list.length
        var _t = 0
        var self = this;
        var type = '';
        var url = "";
        for (var i in list) {
            url = list[i][0];
            type = list[i][1];
            this.loadLocalRes(url, type, function (err, res) {
                _t++;
                if (_t == total) return cb(true, 100);
                cb(false, parseInt(100 * _t / total))
            })
        }
    },
    //加载预制资源
    //image.png/image, prefab, anim
    //url:View/UI/DarkMaskLayer 对应 /assert/resource/View/UI/DarkMaskLayer
    //如果有图集图片等包函在预制中则会被同步加载
    loadLocalRes:function(url, type, cb){
        // cc.log("loadAsset", url)
        var self = this;
        cc.loader.loadRes(url, type, function (err, res) {
            // cc.log("loadAsset cb", url, err, res)
            if (err) return cb(err, res);
            if (res instanceof cc.Prefab) {
                self.perfabMaps[res._name] = res;
            } else if (res instanceof cc.SpriteFrame) {
                self.spriteFrameMaps[res._name] = res
            } else if (res instanceof cc.SpriteAtlas) {
                self.spriteAtlasMaps[res._name] = res
            } else if (res instanceof cc.TiledMapAsset) {
                self.tiledMapAssetMaps[res._name] = res
            }
            cb(false, res)
        });
    },
    //加载图片图集等资源文件
    //加载plist会自动加载对应的Png 
    //url 写法 textures/combat_enveffect_bosswarn.plist 对应 asset/resource/textures/combat_enveffect_bosswarn.plist
    loadRawAsset:function(url, cb){
        cc.loader.loadRes(url, function (err, spriteFrame) {
            cc.log("combat_enveffect_bosswarn done", err, spriteFrame)
            cb(err, spriteFrame)
        });
    },
    
    //在当前场影弹出一个tip提示
    tip : function(message){
        cc.log("diaplay.tip", "message")
        var prefabNme = 'View/UI/tip'
        this.loadPerfab(prefabNme, function(err, prefab){
            if (err) return cc.assert(err, prefabNme+'加载失败');
            var viewNode = cc.instantiate(prefab);
            var label = viewNode.getComponentInChildren(cc.Label)
            label.string = message
            // require('GM').getRunningSceneMediator().node.addChild(viewNode, 30)
            // cc.director.getScene().addChild(viewNode)
            // self.node.addChild(viewNode)
            // self.pushView(viewNode);
        })
    },
    //UI锁定
    uiLock : function(message){
        var self = this;
        if(!message)
        {
            message = "";
        }
        var prefabNme = 'View/UILock/UILock'
        this.loadPerfab(prefabNme, function(err, prefab){
            if (err) return cc.assert(err, prefabNme+'加载失败');
            self.viewNode = cc.instantiate(prefab);
            var label = self.viewNode.getChildByName("message").getComponent(cc.Label);
            label.string = message
            // require('GM').getRunningSceneMediator().node.addChild(self.viewNode, 30)
            // cc.director.getScene().addChild(viewNode)
            // self.node.addChild(viewNode)
            // self.pushView(viewNode);
        })
        
    },
    uiUnLock:function(){
      var self = this;
        if(!this.viewNode)
        {
            setTimeout(function(){
                 self.uiUnLock();
            },200);
          
            return;
        }
        // require('GM').getRunningSceneMediator().node.removeChild(this.viewNode)
    }, 
    loadPerfab : function(perfabName, cb){
        if (this.perfabMaps[perfabName]) return cb(false, this.perfabMaps[perfabName])
        var self = this;
        this.load(perfabName, cc.Prefab,function(err, prefab){
            if (err) return cb(err);
            self.perfabMaps[perfabName] = prefab;
            cb(false, prefab)
        })
    },
    getPrefab : function(perfabName){
        return this.perfabMaps[perfabName]
    },
    getSpriteFrame:function(frameName){
        if (this.spriteFrameMaps[frameName]) return this.spriteFrameMaps[frameName];
        for (var atlasName in this.spriteAtlasMaps) {
            var atlas = this.spriteAtlasMaps[atlasName]
            if (atlas.getSpriteFrame(frameName)) return atlas.getSpriteFrame(frameName);
        }
        cc.assert(false, "frameName:"+frameName+'不存在');
    },
    getTmxAsset:function(tmxName){
        if (this.tiledMapAssetMaps[tmxName]) return this.tiledMapAssetMaps[tmxName];
        return false
    },
});
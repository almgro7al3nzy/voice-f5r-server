/**
 * !#en The Page View Direction
 * !#zh 页面视图滚动类型
 * @enum PageView.Direction
 */
var Direction = cc.Enum({
    /**
     * !#en Horizontal scroll.
     * !#zh 水平滚动
     * @property {Number} Horizontal
     */
    Horizontal: 0,
    /**
     * !#en Vertical scroll.
     * !#zh 垂直滚动
     * @property {Number} Vertical
     */
    Vertical: 1
});

/**
 * !#en The Page View LRUDDirection
 * !#zh 页面视图滚动方向类型
 */
var LRUDDirection = cc.Enum({
    /**
     * !#zh 顺时针
     */
    Obey: 1,
    /**
     * !#zh 逆时针
     */
    Opposite: -1
});

/**
 * !#en Enum for ScrollView event type.
 * !#zh 滚动视图事件类型
 * @enum PageView.EventType
 */
var EventType = cc.Enum({
    /**
     * !#en The page turning event
     * !#zh 翻页事件
     * @property {Number} PAGE_TURNING
     */
    PAGE_TURNING: 0

});
var PageCount = 3;
var EPSILON = 1e-4;
var getTimeInMilliseconds = function() {
    var currentTime = new Date();
    return currentTime.getMilliseconds();
};

var pageView = cc.Class({
    // name : "ADPageView",
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "自定义/ADComponent",
    },
    ctor: function () {
        this._curPageIdx = 0;
        this._pages = []; //数据
        this.pages = [];   //界面
        this._curPage0Idx = 0;
        this._autoScrolling = false;
        this._autoScrollTotalTime = 0;
        this._autoScrollAccumulatedTime = 0;
        this._isScrollEndedWithThresholdEventFired = false;
        this._autoScrollSub = 0;
        this._autoScrollStartPos = cc.p(0,0);
    },
    properties: {
        /**
         * !#en The page view direction
         * !#zh 页面视图滚动类型
         * @property {PageView.Direction} direction
         */
        direction: {
            default: Direction.Horizontal,
            type: Direction,
            tooltip: CC_DEV && 'i18n:COMPONENT.pageview.direction',
            notify: function() {
                this._syncScrollDirection();
            }
        },
        /**
         * !#en The page view l r u d direction
         * !#zh 页面视图滚动方向类型
         */
        lrudDirection: {
            default: LRUDDirection.Obey,
            type: LRUDDirection,
            tooltip: CC_DEV && '顺时针逆时针',
        },
        /**
         * !#en
         * The scroll threshold value, when drag exceeds this value,
         * release the next page will automatically scroll, less than the restore
         * !#zh 滚动临界值，默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原。
         * @property {Number} scrollThreshold
         */
        scrollThreshold: {
            default: 0.5,
            type: cc.Float,
            slide: true,
            range: [0, 1, 0.01],
            tooltip: CC_DEV && 'i18n:COMPONENT.pageview.scrollThreshold'
        },

        /**
         * !#en
         * Auto page turning velocity threshold. When users swipe the PageView quickly,
         * it will calculate a velocity based on the scroll distance and time,
         * if the calculated velocity is larger than the threshold, then it will trigger page turning.
         * !#zh
         * 快速滑动翻页临界值。
         * 当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值，
         * 该值与此临界值相比较，如果大于临界值，则进行自动翻页。
         * @property {Number} autoPageTurningThreshold
         */
        autoPageTurningThreshold: {
            default: 100,
            type: cc.Float,
            tooltip: CC_DEV && 'i18n:COMPONENT.pageview.autoPageTurningThreshold'
        },
        /**
         * !#zh 页面视图是否自动滚动
         */
        autoScrollPage: {
            default: false,
            // type: cc.Boolean,
            tooltip: "页面视图是否自动滚动"
        },
        /**
         * !#zh 页面视图是自动滚动相隔时间
         */
        autoScrollPageTime: {
            default: 1,
            type: cc.Float,
            slide: true,
            range: [1, 30, 0.5],
            tooltip: CC_DEV && '页面视图是自动滚动相隔时间 1-30s'
        },
        /**
         * !#en The Page View Indicator
         * !#zh 页面视图指示器组件
         * @property {PageViewIndicator} indicator
         */
        indicator: {
            default: null,
            type: cc.PageViewIndicator,
            tooltip: CC_DEV && 'i18n:COMPONENT.pageview.indicator',
            notify:  function() {
                if (this.indicator) {
                    this.indicator.setPageView(this);
                }
            }
        },
        /**
         * !#en The time required to turn over a page. unit: second
         * !#zh 每个页面翻页时所需时间。单位：秒
         * @property {Number} pageTurningSpeed
         */
        pageTurningSpeed: {
            default: 0.3,
            type: cc.Float,
            tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageTurningSpeed'
        },

        /**
         * !#en PageView events callback
         * !#zh 滚动视图的事件回调函数
         * @property {Component.EventHandler[]} pageEvents
         */
        pageEvents: {
            default: [],
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageEvents'
        },
        /**
        * pages 控制滚动三个page 
        */
        pageNode: {
            default: undefined,
            type: cc.Node,
            tooltip: CC_DEV && 'page node',
        },
        // pages: {
        //     default: [],
        //     type: cc.Node,
        //     tooltip: CC_DEV && 'page node',
        // },
        pagePrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: "page 的prefab",
            notify:  function() {
                if (this.pagePrefab) {
                    this._initPagePrefab();
                }
            }
        },
    },
    statics: {
        Direction: Direction,
        EventType: EventType,
        PageCount: PageCount
    },
    __preload: function () {
        this.node.on('size-changed', this._updateAllPagesSize, this);
        this._initPosition();
        this._initPagePrefab();
    },
    onEnable: function () {
        if(!CC_EDITOR) {
            this._registerEvent();
            this.node.on('scroll-ended-with-threshold', this._dispatchPageTurningEvent, this);
            this._startInterval();
        }
    },
    onDisable: function () {
        if(!CC_EDITOR) {
            this._unregisterEvent();
            this.node.off('scroll-ended-with-threshold', this._dispatchPageTurningEvent, this);
            this.node.off('size-changed', this._updateAllPagesSize, this);
            this._stopInterval();
        }
    },
    onLoad() {
        this._initPages();
        if (this.indicator) {
            this.indicator.setPageView(this);
        }
    },
    /**
     * !#en Returns all pages of pageview
     * !#zh 返回视图中的所有页面
     * @method getPages
     * @returns {Node[]}
     */
    getPages: function () {
        return this._pages;
    },
    /**
     * !#en Returns current page index
     * !#zh 返回当前页面索引
     * @method getCurrentPageIndex
     * @returns {Number}
     */
    getCurrentPageIndex: function () {
        return this._curPageIdx;
    },
    /**
     * !#en Set current page index
     * !#zh 设置当前页面索引
     * @method setCurrentPageIndex
     * @param {Number} index
     */
    setCurrentPageIndex: function (index) {
        this.scrollToPage(index, false);
    },
    setPagesData(pageData){
        this._pages = pageData;
        this._updateIndicator();
        this.showPageNode();
        this.scrollToPage(1,0);
    },
    removeAllPagesData: function () {
        this.hidePageNode();
        this._pages.length = 0;
        this._updateIndicator();
    },
    hidePageNode(){
        this.pageNode.active = false;
    },
    showPageNode(){
        this.pageNode.active = true;
    },
    /**
     * !#en Scroll PageView to index.
     * !#zh 滚动到指定页面
     * @method scrollToPage
     * @param {Number} idx index of page.
     * @param {Number} timeInSecond scrolling time
     */
    scrollToPage: function (idx, timeInSecond) {
        if(this._pages.length <= 0)return;
        idx = (idx + this._pages.length) % this._pages.length;
        timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
        let sub = idx - this._curPageIdx;
        this._calculatePage0Index(idx);
        this._curPageIdx = idx;
        this._scrollTo(timeInSecond,sub);

        if (this.indicator) {
            this.indicator._changedState();
        }
    },
    _calculatePage0Index(idx){
        let self = this;
        var selfAdd = function(){
            self._curPage0Idx = (self._curPage0Idx + 1 + PageCount) % PageCount;
        }
        var selfSub = function(){
            self._curPage0Idx = (self._curPage0Idx - 1 + PageCount) % PageCount;
        }
        if(this._curPageIdx !== idx){
            let len = Math.abs(idx - this._curPageIdx);
            let isA = this._curPageIdx < idx;
            for(let i=0;i<len;i++){
                isA ? selfAdd() : selfSub();
            }
        }
    },
    _scrollTo(timeInSecond,sub){
        if (timeInSecond) {
            this._startAutoScroll(timeInSecond,sub);
        } else {
            this._updatePages();
        }
    },
    _startAutoScroll(timeInSecond,sub){
        this._autoScrolling = true;
        this._autoScrollTotalTime = timeInSecond;
        this._autoScrollAccumulatedTime = 0;
        this._isScrollEndedWithThresholdEventFired = false;
        this._autoScrollSub = sub;
        this._autoScrollStartPos = cc.pSub(this.pages[this._curPage0Idx].position,this.pages[this._curPage0Idx]._xy );
    },
    _getTargetDelta(){
        var width=0,height=0;
        if (this.direction === Direction.Horizontal) {
            width = this.node.width;
        }
        else if (this.direction === Direction.Vertical) {
            height = this.node.height;            
        }
        
        if((this._autoScrollSub > 0&&Math.abs(this._autoScrollSub) !== this._pages.length -1) ||(this._autoScrollSub < 0 && Math.abs(this._autoScrollSub) === this._pages.length -1) ){
            width = -width;
            height = -height;   
        }
        return cc.p(width,height);
    },
    _processAutoScrolling(dt){
        if(this._autoScrollSub === 0){
            this._autoScrolling = false;
            return;
        }
        this._autoScrollAccumulatedTime += dt;
        var percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
        var targetDelta = this._getTargetDelta();
        var movePos = cc.pAdd( cc.pMult( cc.pSub(targetDelta,this._autoScrollStartPos) , percentage),this._autoScrollStartPos);

        var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
        if (percentage >= 1 || cc.pFuzzyEqual(movePos, targetDelta, 10)) {
            reachedEnd = true;
        }
        if(reachedEnd && !this._isScrollEndedWithThresholdEventFired) {
            this._dispatchEvent('scroll-ended-with-threshold');
            this._isScrollEndedWithThresholdEventFired = true;
        }
        this._moveChildren(movePos);
        if (reachedEnd) {
            this._autoScrolling = false;
            this._updatePages();
        }
    },
    _updatePages(){
        let indexs = this._getShowIndex(this._curPageIdx);
        let positions = this._getPagePosition();
        for(let i=0;i<PageCount;i++){
            this.pages[i].position = positions[i];
            this.pages[i]._xy = positions[i];
            this.pages[i].getComponent("ADPage").setPageName(indexs[i]);
        }
    },
    _moveChildren(position){
        if(this._pages.length <= 0)return;
        if (this.direction === Direction.Horizontal) {
            if(Math.abs(position.x) > this.node.width){
                position.x = position.x > 0 ?this.node.width:-this.node.width;
            }
            for(let i=0;i<PageCount;i++){
                this.pages[i].position.x = this.pages[i]._xy.x + position.x;
                this.pages[i].x = this.pages[i]._xy.x + position.x;
            }
        }
        else if (this.direction === Direction.Vertical) {
            if(Math.abs(position.y) > this.node.height){
                position.y = position.y > 0 ?this.node.height:-this.node.height;
            }
            for(let i=0;i<PageCount;i++){
                this.pages[i].position.y = this.pages[i]._xy.y + position.y;
                this.pages[i].y = this.pages[i]._xy.y + position.y;

                
            }
        }
    },

    _syncScrollDirection: function () {
        this.horizontal = this.direction === Direction.Horizontal;
        this.vertical = this.direction === Direction.Vertical;
    },
    // 刷新页面视图
    _updateIndicator: function () {
        var indicatorCount = this._pages.length;

        if (this._curPageIdx >= indicatorCount) {
            this._curPageIdx = indicatorCount === 0 ? 0 : indicatorCount - 1;
        }

        // 刷新 indicator 信息与状态
        if (this.indicator) {
            this.indicator._refresh();
        }
    },
    _initPagePrefab: function(){
        let positions = this._getPagePosition();
        for (var i = 0; i < PageCount; i++) {
            this.pages[i] = cc.instantiate(this.pagePrefab);
            this.pages[i].position = positions[i];
            this.pageNode.addChild(this.pages[i]);
        }
    },
    // 刷新所有页面的大小
    _updateAllPagesSize: function () {
        if(!this.pagePrefab)return;
        var locPages = this.pages;
        var selfSize = this.node.getContentSize();
        for (var i = 0, len = locPages.length; i < len; i++) {
            locPages[i].setContentSize(selfSize);
        }
       
    },
    // 初始化页面
    _initPages: function () {
        this._syncScrollDirection();
        this._updateIndicator();
        this._startInterval();
    },
    _initPosition(){
        this._verticalPosition = [];
        this._horizontalPosition = [];
        this._horizontalPosition[0] = [cc.p(0,0),cc.p(this.node.width,0),cc.p(-this.node.width,0)];
        this._horizontalPosition[1] = [cc.p(this.node.width,0),cc.p(-this.node.width,0),cc.p(0,0)];
        this._horizontalPosition[2] = [cc.p(-this.node.width,0),cc.p(0,0),cc.p(this.node.width,0)];
        this._verticalPosition[0] = [cc.p(0,0),cc.p(0,this.node.height),cc.p(0,-this.node.height)];
        this._verticalPosition[1] = [cc.p(0,this.node.height),cc.p(0,-this.node.height),cc.p(0,0)];
        this._verticalPosition[2] = [cc.p(0,-this.node.height),cc.p(0,0),cc.p(0,this.node.height)];
    },
    _dispatchPageTurningEvent: function () {
        cc.Component.EventHandler.emitEvents(this.pageEvents, this, EventType.PAGE_TURNING);
        this.node.emit('page-turning', this);
    },
    // 是否超过自动滚动临界值
    _isScrollable: function (offset, index, nextIndex) {
        if(index !== nextIndex){
            if (this.direction === Direction.Horizontal) {
                return Math.abs(offset.x) >= Math.abs(this.node.width) * this.scrollThreshold;
            }
            else if (this.direction === Direction.Vertical) {
                return Math.abs(offset.y) >= Math.abs(this.node.height) * this.scrollThreshold;
            }
        }
        return false;
    },
    // 快速滑动
    _isQuicklyScrollable: function (touchMoveVelocity) {
        if (this.direction === Direction.Horizontal) {
            if (Math.abs(touchMoveVelocity.x) > this.autoPageTurningThreshold) {
                return true;
            }
        }
        else if (this.direction === Direction.Vertical) {
            if (Math.abs(touchMoveVelocity.y) > this.autoPageTurningThreshold) {
                return true;
            }
        }
        return false;
    },
    // get three index by idx
    _getShowIndex: function (idx) {
        var ret = [];
        var l = [];
        l[0] = [2,0,1];
        l[1] = [1,2,0];
        l[2] = [0,1,2];

        ret[l[this._curPage0Idx][0]] = (idx-1+this._pages.length)%this._pages.length;
        ret[l[this._curPage0Idx][1]] = idx;
        ret[l[this._curPage0Idx][2]] = (idx+1+this._pages.length)%this._pages.length;
        return ret;
    },
    // page position
    _getPagePosition(){
        if (this.direction === Direction.Horizontal) {
           return this._horizontalPosition[this._curPage0Idx];
        }
        else if (this.direction === Direction.Vertical) {
            return this._verticalPosition[this._curPage0Idx];
        }
    },
    // direction add sub
    _getDragDirection: function (moveOffset) {
        if (this.direction === Direction.Horizontal) {
            if (moveOffset.x === 0) { return 0; }
            return (moveOffset.x > 0 ? 1 : -1);
        }
        else if (this.direction === Direction.Vertical) {
            // 由于滚动 Y 轴的原点在在右上角所以应该是小于 0
            if (moveOffset.y === 0) { return 0; }
            return (moveOffset.y < 0 ? 1 : -1);
        }
    },
    
    //private methods
    _registerEvent: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
    },

    _unregisterEvent: function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
        this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
    },

     _handleReleaseLogic: function(touch) {
        var moveOffset = cc.pSub(this._touchBeganPosition, this._touchEndPosition);
        var index = this._curPageIdx, nextIndex = index + this._getDragDirection(moveOffset);
        var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);
        nextIndex =  (nextIndex + this._pages.length) % this._pages.length;
        if (nextIndex < this._pages.length) {
            if (this._isScrollable(moveOffset, index, nextIndex)) {
                this.scrollToPage(nextIndex, timeInSecond);
                return;
            }
            else {
                if (this._isQuicklyScrollable(moveOffset)) {
                    this.scrollToPage(nextIndex, timeInSecond);
                    return;
                }
            }
        }
        this.scrollToPage(index, 0);
    },

    _onTouchBegan: function (event, captureListeners) {
        this._stopInterval();
        this._touchBeganPosition = event.touch.getLocation();
    },

    _onTouchMoved: function (event, captureListeners) {
        this._touchMovePosition = event.touch.getLocation();
        this._moveChildren( cc.pSub(this._touchMovePosition , this._touchBeganPosition));
    },

    _onTouchEnded: function (event, captureListeners) {
        this._touchEndPosition = event.touch.getLocation();
        this._handleReleaseLogic(event.touch);
        this._startInterval();
    },

    _onTouchCancelled: function (event, captureListeners) {
        this._touchEndPosition = event.touch.getLocation();
        this._handleReleaseLogic(event.touch);
        this._startInterval();
    },

    _onMouseWheel: function (event, captureListeners) { },
    
    _dispatchEvent: function(event) {
        this.node.emit(event, this);
    },

    _startInterval(){
        if(this.autoScrollPage){
            if(this._scrollInterval) clearInterval(this._scrollInterval);
            this._scrollInterval = setInterval(()=>{
                this.scrollToPage(this._curPageIdx+this.lrudDirection,this.pageTurningSpeed);
            }, this.autoScrollPageTime*1000);
        }
    },
    _stopInterval(){
        if(this._scrollInterval) clearInterval(this._scrollInterval);
    },

    update: function(dt) {
        if (this._autoScrolling) {
            this._processAutoScrolling(dt);
        }
    }
    

    
});
// ListViewComponent
// 处理list view 消耗 问题
cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "自定义/ListViewComponent",
    },
    properties: {
        // item template to instantiate other items
        itemTemplate: { 
            default: null,
            type: cc.Node,
            tooltip: CC_DEV && '模块 list item model',
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView,
            tooltip: CC_DEV && '列表 scrollview',
        },
        // how many items we actually spawn
        spawnCount: {
        	default: 20,
        	type: cc.Integer,
            range: [20, 100, 1],
            tooltip: CC_DEV && '多少个item 滚动',
        }, 
        // how many items we need for the whole list
        totalCount: {
        	default: 100,
        	type: cc.Integer,
            tooltip: CC_DEV && '最多多少个item 滚动',
        },
        // space between each item
        spacing: {
        	default: 0,
        	type: cc.Integer,
            tooltip: CC_DEV && 'item之间的空隙',
        }, 
        // when item is away from bufferZone, we relocate it
        bufferZone: {
        	default: 0,
        	type: cc.Integer,
            tooltip: CC_DEV && '缓存多少个',
        }, 
    },
    ctor: function () {
        
    },
    onLoad(){
        this.content = this.scrollView.content;
        // array to store spawned items
        this.items = []; 
    	this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        // use this variable to detect if we are scrolling up or down
        this.lastContentPosY = 0;
    },
    setScrollData(data){
        this.scrollDataList = data;
    },
    // init 
    initialize: function () {
        // get total content height
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing;
    	for (let i = 0; i < this.spawnCount; ++i) { 
    		// spawn items, we only need to do this once
            let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		item.getComponent(item._name).updateItem(i, this.scrollDataList[i]);
            this.items.push(item);
    	}
    },
    // item 是否在scrollView 里面
    // get item position in scrollview's node space
    getPositionInView: function (item) { 
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    addItem: function() {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount + 1;
    },

    removeItem: function() {
        if (this.totalCount - 1 < this.spawnCount) {
            cc.error("can't remove item less than "+this.spawnCount);
            return;
        }
        this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount - 1;
    },
    update: function(dt) {
        this.updateTimer += dt;
        // we don't need to do the math every frame
        if (this.updateTimer < this.updateInterval) return; 
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        // scrolling direction
        let isDown = this.scrollView.content.y < this.lastContentPosY; 
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset );
                    let item = items[i].getComponent(item._name);
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(i, this.scrollDataList[itemId]);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].setPositionY(items[i].y - offset );
                    let item = items[i].getComponent(item._name);
                    let itemId = item.itemID + items.length;
                    item.updateItem(i, this.scrollDataList[itemId]);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    },

});
/**
 * 目前仅实现单列多行
 */

const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu("自定义控件/TableView")
export class TableView extends cc.ScrollView {

    @property({type:cc.Node,tooltip: "item节点，与itemPrefab互斥"})
    itemNode:cc.Node = null;

    @property({type:cc.Prefab,tooltip: "item预制体，与itemNode互斥"})
    itemPrefab:cc.Prefab = null;

    @property({type:cc.Integer,tooltip: "行数"})
    row:number = 0;

    @property({type:cc.Integer,tooltip: "列数。暂时未实现多列功能"})
    readonly column:number = 1;

    @property({type:cc.Integer,tooltip: "item顶偏移"})
    marginTop:number = 0;

    @property({type:cc.Integer,tooltip: "item底偏移"})
    marginBottom:number = 0;

    @property({type:cc.Integer,tooltip: "间距"})
    margin:number = 0;
    
    @property({tooltip: "是否打开item上动画"})
    itemAction:boolean = false;

    private _itemHeight:number = 0;
    private _listItem:Array<cc.Node> = new Array<cc.Node>();
    private _firstIndex:number = 0;
    private _firstIndexMax:number = 0;
    private _dataSources:Array<any> = new Array<any>();
    private _callback:(item:cc.Node,data:any,index:number)=>void = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad(){
        let itemNode = this.itemNode || cc.instantiate(this.itemPrefab);
        if (itemNode === null){
            cc.error('TableView item is null.');
            return ;
        }

        itemNode.active = false;
        this._itemHeight = itemNode.getContentSize().height;
        let _itemHeightHalf = this._itemHeight/2;
        /** 计算出view能装下多少个item */
        let viewSize = this.node.getContentSize();
        let content = this.content;

        let height = this.marginTop;
        while (true){
            if (height > viewSize.height) break;

            let node = cc.instantiate(itemNode);
            node.x = 0;
            node.y = -height - _itemHeightHalf;
            node.setParent(content);
            this._listItem.push(node);
            height += this._itemHeight + this.margin;
        }

        itemNode.y = -height - _itemHeightHalf;
        itemNode.setParent(content);
        this._listItem.push(itemNode);
        
        let _ventHandler = new cc.Component.EventHandler();
        _ventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        _ventHandler.component = "TableView";// 这个是代码文件名
        _ventHandler.handler = "_onScrollEvent";
        //_ventHandler.customEventData = "";
        this.scrollEvents[0] = _ventHandler;
    }

    public setSources(datas:Array<any>,cb:(item:cc.Node,data:any,index:number)=>void){
        this._callback = cb||function(item:cc.Node,data:any,index:number){};
        this.reload(datas);
    }

    public reload(datas:Array<any>){
        /** 计算最大_firstIndexMax */
        let num = Math.ceil((this.node.getContentSize().height - this.marginTop - this.marginBottom + this.margin) / (this._itemHeight+this.margin));
        this._firstIndexMax = datas.length - num - 1;

        this._dataSources = datas.slice(0);
        if(this._listItem.length  == 0)return;
        this._listItem.forEach((it:cc.Node, index:number) => {
            if (index < this._dataSources.length){
                it.active = true;
                this._updateItem(it, index);
            }else it.active = false;
        });

        this.content.height = this.marginTop + this.marginBottom + this._itemHeight * this._dataSources.length + this.margin * (this._dataSources.length - 1);
        
        if (this.itemAction){
            this._listItem.forEach((item:cc.Node, index:number) => {
                if (index < this._dataSources.length){
                    item.scaleX = 0;
                    item.runAction(cc.scaleTo(0.2+(0.04*index), 1).easing(cc.easeSineOut()));
                }
            });
        }
    }


    private _updateItem(node:cc.Node, index:number){
        let _data:any = this._dataSources[index];
        this._callback && this._callback(node,_data,index);
    }

    private _onScrollEvent(scrollview, eventType){
        let content = this.content;
        let viewHeight = this.node.getContentSize().height;
        let contentY = content.y;
        
        /** 判断第1个元素 和 倒数第1个元素的位置 */
        /** 上边界 */
        let _itemHeightHalf = this._itemHeight/2;

        /** 头插入 */
        while(this._firstIndex > 0 && this._listItem[0].y + this.marginTop + _itemHeightHalf < -contentY){
            let last = this._listItem.pop();
            last.y = this._listItem[0].y + this._itemHeight + this.margin;
            this._listItem.unshift(last);
            this._firstIndex--;
            this._updateItem(last, this._firstIndex);
        }

        /** 尾插入 */
        while(this._firstIndex < this._firstIndexMax && this._listItem[this._listItem.length-1].y - _itemHeightHalf - this.marginBottom > -contentY - viewHeight){
            let first = this._listItem.shift();
            first.y = this._listItem[this._listItem.length-1].y - this._itemHeight - this.margin;
            this._listItem.push(first);
            this._firstIndex++;
            this._updateItem(first, this._firstIndex+this._listItem.length-1);
        }
    }
}

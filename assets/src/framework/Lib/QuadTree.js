/**
 * QuadTree object.
 *
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * ----+----
 *  2  |  3
 *     |
 */

/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global Node, BoundsNode */

/*
    The MIT License

    Copyright (c) 2011 Mike Chambers

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/


/**
* A QuadTree implementation in JavaScript, a 2d spatial subdivision algorithm.
* @module QuadTree
**/

(function () {
    "use strict";

    /****************** QuadTree ****************/

    /**
    * QuadTree data structure.
    * @class QuadTree
    * @constructor
    * @param {Object} An object representing the bounds of the top level of the QuadTree. The object 
    * should contain the following properties : x, y, width, height
    * @param {Boolean} pointQuad Whether the QuadTree will contain points (true), or items with bounds 
    * (width / height)(false). Default value is false.
    * @param {Number} maxDepth The maximum number of levels that the quadtree will create. Default is 4.
    * @param {Number} maxChildren The maximum number of children that a node can contain before it is split into sub-nodes.
    **/
    function QuadTree(bounds, pointQuad, maxDepth, maxChildren) {
        var node;
        if (pointQuad) {

            node = new Node(bounds, 0, maxDepth, maxChildren);
        } else {
            node = new BoundsNode(bounds, 0, maxDepth, maxChildren);
        }

        this.root = node;
    }

    /**
    * The root node of the QuadTree which covers the entire area being segmented.
    * @property root
    * @type Node
    **/
    QuadTree.prototype.root = null;


    /**
    * Inserts an item into the QuadTree.
    * @method insert
    * @param {Object|Array} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y 
    * properties that represents its position in 2D space.
    **/
    QuadTree.prototype.insert = function (item) {
        if (item instanceof Array) {
            var len = item.length;

            var i;
            for (i = 0; i < len; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.insert(item);
        }
    };

    /**
    * Clears all nodes and children from the QuadTree
    * @method clear
    **/
    QuadTree.prototype.clear = function () {
        this.root.clear();
    };

    /**
    * Retrieves all items / points in the same node as the specified item / point. If the specified item
    * overlaps the bounds of a node, then all children in both nodes will be returned.
    * @method retrieve
    * @param {Object} item An object representing a 2D coordinate point (with x, y properties), or a shape
    * with dimensions (x, y, width, height) properties.
    **/
    QuadTree.prototype.retrieve = function (item) {
        //get a copy of the array of items
        var out = this.root.retrieve(item).slice(0);
        return out;
    };

    /************** Node ********************/


    function Node(bounds, depth, maxDepth, maxChildren) {
        this._bounds = bounds;
        this.children = [];
        this.nodes = [];

        if (maxChildren) {
            this._maxChildren = maxChildren;
        }

        if (maxDepth) {
            this._maxDepth = maxDepth;
        }

        if (depth) {
            this._depth = depth;
        }
    }

    //subnodes
    Node.prototype.nodes = null;
    Node.prototype._classConstructor = Node;

    //children contained directly in the node
    Node.prototype.children = null;
    Node.prototype._bounds = null;

    //read only
    Node.prototype._depth = 0;

    Node.prototype._maxChildren = 4;
    Node.prototype._maxDepth = 4;

    Node.TOP_LEFT = 0;
    Node.TOP_RIGHT = 1;
    Node.BOTTOM_LEFT = 2;
    Node.BOTTOM_RIGHT = 3;


    Node.prototype.insert = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

            this.nodes[index].insert(item);

            return;
        }

        this.children.push(item);

        var len = this.children.length;
        if (!(this._depth >= this._maxDepth) &&
                len > this._maxChildren) {
            
            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    };

    Node.prototype.retrieve = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

            return this.nodes[index].retrieve(item);
        }

        return this.children;
    };

    Node.prototype._findIndex = function (item) {
        var b = this._bounds;
        var left = (item.x > b.x + b.width / 2) ? false : true;
        var top = (item.y > b.y + b.height / 2) ? false : true;

        //top left
        var index = Node.TOP_LEFT;
        if (left) {
            //left side
            if (!top) {
                //bottom left
                index = Node.BOTTOM_LEFT;
            }
        } else {
            //right side
            if (top) {
                //top right
                index = Node.TOP_RIGHT;
            } else {
                //bottom right
                index = Node.BOTTOM_RIGHT;
            }
        }

        return index;
    };


    Node.prototype.subdivide = function () {
        var depth = this._depth + 1;

        var bx = this._bounds.x;
        var by = this._bounds.y;

        //floor the values
        var b_w_h = (this._bounds.width / 2); //todo: Math.floor?
        var b_h_h = (this._bounds.height / 2);
        var bx_b_w_h = bx + b_w_h;
        var by_b_h_h = by + b_h_h;

        //top left
        this.nodes[Node.TOP_LEFT] = new this._classConstructor({
            x: bx,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);

        //top right
        this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);

        //bottom left
        this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
            x: bx,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);


        //bottom right
        this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);
    };

    Node.prototype.clear = function () {
        this.children.length = 0;

        var len = this.nodes.length;
        
        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    };
    

    /******************** BoundsQuadTree ****************/

    function BoundsNode(bounds, depth, maxChildren, maxDepth) {
        Node.call(this, bounds, depth, maxChildren, maxDepth);
        this._stuckChildren = [];
    }

    BoundsNode.prototype = new Node();
    BoundsNode.prototype._classConstructor = BoundsNode;
    BoundsNode.prototype._stuckChildren = null;

    //we use this to collect and conctenate items being retrieved. This way
    //we dont have to continuously create new Array instances.
    //Note, when returned from QuadTree.retrieve, we then copy the array
    BoundsNode.prototype._out = [];

    BoundsNode.prototype.insert = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            //todo: make _bounds bounds
            if (item.x >= node._bounds.x &&
                    item.x + item.width <= node._bounds.x + node._bounds.width &&
                    item.y >= node._bounds.y &&
                    item.y + item.height <= node._bounds.y + node._bounds.height) {
                
                this.nodes[index].insert(item);
                
            } else {
                this._stuckChildren.push(item);
            }

            return;
        }

        this.children.push(item);

        var len = this.children.length;

        if (!(this._depth >= this._maxDepth) &&
                len > this._maxChildren) {
            
            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    };

    BoundsNode.prototype.getChildren = function () {
        return this.children.concat(this._stuckChildren);
    };

    BoundsNode.prototype.retrieve = function (item) {
        var out = this._out;
        out.length = 0;
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            if (item.x >= node._bounds.x &&
                    item.x + item.width <= node._bounds.x + node._bounds.width &&
                    item.y >= node._bounds.y &&
                    item.y + item.height <= node._bounds.y + node._bounds.height) {
                
                out.push.apply(out, this.nodes[index].retrieve(item));
            } else {
                //Part of the item are overlapping multiple child nodes. For each of the overlapping nodes, return all containing objects.

                if (item.x <= this.nodes[Node.TOP_RIGHT]._bounds.x) {
                    if (item.y <= this.nodes[Node.BOTTOM_LEFT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.TOP_LEFT].getAllContent());
                    }
                    
                    if (item.y + item.height > this.nodes[Node.BOTTOM_LEFT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.BOTTOM_LEFT].getAllContent());
                    }
                }
                
                if (item.x + item.width > this.nodes[Node.TOP_RIGHT]._bounds.x) {//position+width bigger than middle x
                    if (item.y <= this.nodes[Node.BOTTOM_RIGHT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.TOP_RIGHT].getAllContent());
                    }
                    
                    if (item.y + item.height > this.nodes[Node.BOTTOM_RIGHT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.BOTTOM_RIGHT].getAllContent());
                    }
                }
            }
        }

        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);

        return out;
    };

    //Returns all contents of node.
    BoundsNode.prototype.getAllContent = function () {
        var out = this._out;
        if (this.nodes.length) {
            
            var i;
            for (i = 0; i < this.nodes.length; i++) {
                this.nodes[i].getAllContent();
            }
        }
        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);
        return out;
    };

    BoundsNode.prototype.clear = function () {

        this._stuckChildren.length = 0;

        //array
        this.children.length = 0;

        var len = this.nodes.length;

        if (!len) {
            return;
        }

        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        //array
        this.nodes.length = 0;

        //we could call the super clear function but for now, im just going to inline it
        //call the hidden super.clear, and make sure its called with this = this instance
        //Object.getPrototypeOf(BoundsNode.prototype).clear.call(this);
    };

    window.GQuadTree = QuadTree;

}());



/*
    使用方法
    main.ts
const {ccclass, property} = cc._decorator;
@ccclass
export default class Main extends cc.Component {
    @property(cc.Node)
    public nodeFab: cc.Node = null;
    private nodes: Array<cc.Node> = [];
    private tree: GQuadTree<cc.Node> = null;
    start () {
        var bounds = {
            x: -375,
            y: -667,
            width: 750,
            height: 1334
        }
        this.tree = new GQuadTree(bounds, true);

        //生成2000个随机节点
        for (let i = 0; i < 2000; i++) {
            let newNode = cc.instantiate(this.nodeFab);
            newNode.x = Math.floor(Math.random() * 750) - 750/2;
            newNode.y = Math.floor(Math.random() * 1334) - 1334/2;
            this.node.addChild(newNode);
            this.nodes.push(newNode);
            let size =  Math.floor(Math.random() * 10) + 10;
            newNode.width = size;
            newNode.height = size;
        }
        this.tree.insert(this.nodes);
        window.TreeMgr = this.tree;
    }
    updateTree(){
        this.tree.clear();
        this.tree.insert(this.nodes);
    };
    update (dt) {
        this.updateTree();
    }
}
    nodeFab.ts
const {ccclass, property} = cc._decorator;
@ccclass
export default class blockFab extends cc.Component {
    onLoad () {
        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    };
    _x=1;
    _y=1; 
    start () {
        var collider = this.node.getComponent(cc.BoxCollider);
        collider.size = this.node.getContentSize();
        collider.world.aabb.width = this.node.getContentSize().width;
        collider.world.aabb.height = this.node.getContentSize().height;
    };
    onCollisionEnter(other, self) {
        this.node.color = cc.Color.RED;
    };
    onCollisionStay(other,self) {
    };
    onCollisionExit() {
        this.node.color = cc.Color.WHITE;
    };
    update (dt) {
        let speed = Math.random()*10;
        if(this.node.x > 375){
            this._x = -1;
        }
         if(this.node.x < -375){
            this._x = 1;
        }
        if(this.node.y > 667){
            this._y = -1;
        }
        if(this.node.y < -667){
            this._y = 1;
        }
        this.node.x += this._x*speed;
        this.node.y += this._y*speed;

        var arr = TreeMgr.retrieve(this.node);
        let selfBoxCollider = this.node.getComponent(cc.BoxCollider);
        var selfAabb = selfBoxCollider.world.aabb;
        selfAabb.x = this.node.x;
        selfAabb.y = this.node.y;
        for (var i = 0; i < arr.length; ++i)
        {
            if(arr[i] === this.node)continue;
            let otherBoxCollider = arr[i].getComponent(cc.BoxCollider);
            var otherAabb = otherBoxCollider.world.aabb;
            if(cc.Intersection.rectRect(selfAabb, otherAabb)){
                this.onCollisionEnter(otherBoxCollider,selfBoxCollider);
                break;
            }
            else{
                this.onCollisionExit();
            }
        }
    };
    onDisable () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }
}

*/


/*
    摄像机的使用
    放大缩小地铁 移动摄像机 和截屏
    属性说明：
    cullingMask：将决定这个摄像机用来渲染场景的哪些部分 这是在ccc中定义的分组。
    zoomRatio：指定摄像机的缩放比例, 值越大显示的图像越大。
    clearFlags：指定渲染摄像机时需要做的清除操作。
    Color当指定了摄像机需要清除颜色的时候，摄像机会使用设定的背景色来清除场景。
    depth摄像机深度，用于决定摄像机的渲染顺序。值越大，则摄像机越晚被渲染。
    Texture如果设置了 targetTexture，那么摄像机渲染的内容不会输出到屏幕上，而是会渲染到 targetTexture 上。

    事例：
    多点触摸控制缩放，单点触摸移动，连续两次截屏
    先定义分组 项目-设置-分组 增加分组 actor
    创建三个节点 根节点root分组定义为actor 在root下挂一个精灵节点 创建相机节点
    设置主相机 cullingMask 不包含 actor
    设置自定义相机 cullingMask 包含 actor
    创建脚本 
    cc.Class({
        extends: cc.Component,
        properties: {
            canvas: cc.Node,
            camera: {
                default: null,
                type: cc.Node
            },
            root: {
                default: null,
                type: cc.Node
            },
        },
        // use this for initialization
        onLoad: function () {
            var self = this, parent = this.node.parent;
            self.clickTime = null;
            self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
                    if(self.clickTime){
                        let deltaTime = new Data().getTime() - self.clickTime;
                        if(deltaTime <500){
                            //截屏见demo
                            /*
                            let texture = new cc.RenderTexture();
                            let gl = cc.game._renderContext;
                            texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
                            this.camera.targetTexture = texture;
                            this.texture = texture;
                            this.camera.render();
                            let data = this.texture.readPixels();
                            //* /
                        }else{
                            self.clickTime = new Data().getTime();
                        }
                    }else{
                        self.clickTime = new Data().getTime();
                    }

                },self.node);

            self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                var touches = event.getTouches();
                if (touches.length >= 2) {
                    var touch1 = touches[0], touch2 = touches[1];
                    var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                    var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
                    var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
                    //缩放
                    var distance = touchPoint1.sub(touchPoint2);
                    var delta = delta1.sub(delta2);
                    var scale = 1;
                    let camera = self.camera.getComponent(cc.Camera);
                    if (Math.abs(distance.x) > Math.abs(distance.y)) {
                        scale = (distance.x + delta.x) / distance.x * camera.zoomRatio;
                    }
                    else {
                        scale = (distance.y + delta.y) / distance.y * camera.zoomRatio;
                    }
                    camera.zoomRatio = scale < 0.1 ? 0.1 : scale;
                }
                else{
                    var touch1 = touches[0];
                    var delta = touch1.getDelta();
                    self.camera.x -= delta.x;
                    self.camera.y -= delta.y;
                    // self.camera.position.add(delta);
                    // let camera = self.camera.getComponent(cc.Camera);
                    // camera.zoomRatio ++;
                }
            }, self.node);
        },
        
        setMacroCulling: function (enable) {
            if (cc.macro.ENABLE_CULLING === enable || CC_JSB) return;
            cc.macro.ENABLE_CULLING = enable;
            cc.renderer.childrenOrderDirty = true;
        },
    });

*/
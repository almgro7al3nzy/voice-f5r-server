// NestedPageView 嵌套的pageview pageview + scrollview 滚动处理
///////////////////////////////////////////////////////////////
// 由下向上处理 
const Current = cc.Enum({
	DefaultEvent : 0,
	DealEvent : 1,
	PageEvent : 2,
	ScrollEvent : 3,
});//0 初始状态 1 处理事件 2 pageview滚动 3 scrollview滚动
cc.Class({
    extends: cc.PageView,
    editor: CC_EDITOR && {
        menu: '自定义/NestedPageViewComponent',
        help: 'i18n:COMPONENT.help_url.pageview',
        inspector: 'packages://inspector/inspectors/comps/ccpageview.js',
        executeInEditMode: false
    },
    ctor: function () {
        this._whoDispatchEvent = Current.DefaultEvent; 
    },
    // 标记某节点，使得点击它或者它的子节点时，不会触发pageView和scrollView的滑动
    // 也可以直接在外给节点增加标记 node.ignoreInnerEvent = true
    signNodeIgnoreEvent: function (node) {
        node.ignoreInnerEvent = true;
    },
    clearNodeSign: function (node) {
        node.ignoreInnerEvent = false;
    },
    _deelWhoDispatchEvent: function (touch) {
        if (!touch) {
            return;
        }
        if (this._whoDispatchEvent !== Current.DealEvent) {
            return;
        }
        let deltaMove = cc.pSub(touch.getLocation(), touch.getStartLocation());
        let off = Math.abs(deltaMove.x) - Math.abs(deltaMove.y);
        if (off===0) {
            return;
        }
        let isPageSuccess = false;
        if (off>0) {
            // 水平方向移动的更多
            isPageSuccess = this.direction===cc.PageView.Direction.Horizontal;
        } else {
            // 竖直方向移动的更多
            isPageSuccess = this.direction===cc.PageView.Direction.Vertical;
        }
        if (isPageSuccess) {
            this._whoDispatchEvent = Current.PageEvent;
        } else {
            this._whoDispatchEvent = Current.ScrollEvent;
        }
    },
    // 判断是否需要处理事件
    _hasNeetDeelEvent(event, captureListeners) {
        if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return false;
        // 点击对象是不滑动对象 不争夺
        if (event.target.ignoreInnerEvent) {
            return false;
        }
        // 捕获列表里有不滑动对象 不争夺
        if (captureListeners) {
            for (let i = 0; i < captureListeners.length; i++) {
                if (captureListeners[i].ignoreInnerEvent) {
                    return false;
                }
            }
        }
        // 点击对象是ViewGroup 争夺
        if(event.target.getComponent(cc.ViewGroup)) {
            return true;
        }
        // 捕获列表里有ViewGroup 争夺
        if (captureListeners) {
            for (let i = 0; i < captureListeners.length; i++) {
                if(captureListeners[i].getComponent(cc.ViewGroup)) {
                    return true;
                }
            }
        }
        return false;
    },
    //重写方法
    _onTouchBegan: function (event, captureListeners) {
        this._whoDispatchEvent = Current.DefaultEvent;
        if (this._hasNeetDeelEvent(event, captureListeners)) {
            this._whoDispatchEvent = Current.DealEvent;
        } 
        this._super(event, captureListeners);
    },
    _onTouchMoved: function (event, captureListeners) {
        this._deelWhoDispatchEvent(event.touch);
        // 如果争夺结果是 滑动pageView 那么这个事件就没有传下去的必要 且能有效避免嵌套滑动事件保错的问题。
        if (this._whoDispatchEvent===Current.PageEvent) {
            event.stopPropagation();
        }
        this._super(event, captureListeners);
    },
    // 返回true时pageView会不滑动
    _hasNestedViewGroup: function (event, captureListeners) {
        if (event.eventPhase === cc.Event.CAPTURING_PHASE) {
            if (this._whoDispatchEvent>Current.DefaultEvent) {
                return this._whoDispatchEvent===Current.ScrollEvent; //如果scroll胜 pageView不滑动
            } else {
                // 有些node 忽略事件
                // 点击对象是不滑动对象 pageView不滑动
                if (event.target.ignoreInnerEvent) {
                    return true;
                }
                // 捕获列表里有不滑动对象 pageView不滑动
                if (captureListeners) {
                    for (let i = 0; i < captureListeners.length; i++) {
                        if (captureListeners[i].ignoreInnerEvent) {
                            return true;
                        }
                    }
                }
            }
        }
        return this._super(event, captureListeners);
    },
});

///////////////////////////////////////////////////////////////
// 由下往上处理 这个不建议用，因为scorllvew将处在中间层
/*
cc.Class({
    extends: cc.ViewGroup,
    properties: {
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        cancelInnerEvents: {
            default: true,
            animatable: false,
        }
    },

    // use this for initialization
    onLoad: function () {
        let arr = cc.director.getScene().getChildByName('Canvas').getComponentsInChildren(cc.PageView);
        if (arr.length > 0) this.pageView = arr[0];
        this.direction = null;
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
    },

    //this is for nested scrollview
    _hasNestedViewGroup: function (event, captureListeners) {
        if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;
        if (!this.direction) return false;
        if(this.direction === "pageview_move")return false;
        if (captureListeners) {
            //captureListeners are arranged from child to parent
            for (var i = 0; i < captureListeners.length; ++i) {
                var item = captureListeners[i];
                if (this.node === item) {
                    if (event.target.getComponent(cc.ViewGroup)) {
                        return true;
                    }
                    return false;
                }
                if (item.getComponent(cc.ViewGroup)) {
                    return true;
                }
            }
        }
        return false;
    },

    //This is for Scrollview as children of a Button
    _stopPropagationIfTargetIsMe: function (event) {
        if (event.eventPhase === cc.Event.AT_TARGET && event.target === this.node) {
            event.stopPropagation();
        }
    },

    _checkStatu(touch){
        if (!touch) {
            return;
        }
        if (this.direction) {
            return;
        }
        let delta = touch.getDelta();
        if ((Math.abs(delta.x) > 5 || Math.abs(delta.y) > 5) && !this.direction) {
            this.direction = Math.abs(delta.x) > Math.abs(delta.y) ? "pageview_move" : "scrollview_move";
        }
    },

    // touch event handler
    _onTouchBegan: function (event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;
        var touch = event.touch;
        if (this.node) {
            if (this.pageView) {
                this.pageView._handlePressLogic(touch);
            }

            if (this.scrollView) {
                this.scrollView._handlePressLogic(touch);
            }
        }
        this._touchMoved = false;
        this._stopPropagationIfTargetIsMe(event);
    },

    _onTouchMoved: function (event, captureListeners) {
        var touch = event.touch;
        this._checkStatu(touch);
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;
        event.stopPropagation();
        if (this.node) {
            this._handleMoveLogic(touch);
        }
        // Do not prevent touch events in inner nodes
        if (!this.cancelInnerEvents) {
            return;
        }
        var deltaMove = cc.pSub(touch.getLocation(), touch.getStartLocation());

        //FIXME: touch move delta should be calculated by DPI.
        if (cc.pLength(deltaMove) > 7) {
            if (!this._touchMoved && event.target !== this.node) {
                // Simulate touch cancel for target node
                var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
                cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
                cancelEvent.touch = event.touch;
                cancelEvent.simulate = true;
                event.target.dispatchEvent(cancelEvent);
                this._touchMoved = true;
            }
        }

        this._stopPropagationIfTargetIsMe(event);
    },

    _onTouchEnded: function (event, captureListeners) {
        this.direction = null;
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;
        var touch = event.touch;
        if (this.node) {
            this._handleReleaseLogic(touch);
        }

        if (this.pageView) {
            this.pageView._dispatchEvent('touch-up');
        }

        if (this.scrollView) {
            this.scrollView._dispatchEvent('touch-up');
        }

        if (this._touchMoved) {
            event.stopPropagation();
        } else {
            this._stopPropagationIfTargetIsMe(event);
        }
    },

    _onTouchCancelled: function (event, captureListeners) {
        this.direction = null;
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;
        // Filte touch cancel event send from self
        if (!event.simulate) {
            var touch = event.touch;
            if (this.node) {
                this._handleReleaseLogic(touch);
            }
        }

        this._stopPropagationIfTargetIsMe(event);
    },

    _clampDelta: function (delta) {
        let x = Math.abs(delta.x);
        let y = Math.abs(delta.y);
        if (x < y) {
            delta.x = 0;
        } else {
            delta.y = 0;
        }

        return delta;
    },

    _handleMoveLogic: function (touch) {
        let deltaMove = this._clampDelta(touch.getDelta());
        if (this.direction === "pageview_move") {
            if (this.pageView) {
                this.pageView._processDeltaMove(deltaMove);
            }
        } else {
            if (this.scrollView) {
                this.scrollView._processDeltaMove(deltaMove);
            }
        }
    },

    _handleReleaseLogic: function (touch) {
        if (this.pageView) {
            this.pageView._handleReleaseLogic(touch);
        }
        if (this.scrollView) {
            this.scrollView._handleReleaseLogic(touch)
        }
    },
});
*/
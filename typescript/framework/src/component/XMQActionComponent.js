// XMQActionComponent
// 自定义的动作组件(使得常用的动作直接在编辑器里选择即可)

// 动作
let aryActions = require("XMQActionArray");
// (动态组装)下拉选择列表
let selectList = {
    unknown: 0, //默认未知动画(占位用的)
}
for (let i = 0; i < aryActions.length; i++) {
    selectList[aryActions[i].describe] = i+1;
}

// (动态组装)属性
let paramName = "paramAct";
let myProperties = {
    actionTags: {
        type: cc.Enum(selectList),
        default: [],
        tooltip: "多个动画",
    },
}
for (let i = 0; i < aryActions.length; i++) {
    let key = i+1;
    let obj = aryActions[i];
    let describe = obj.describe;
    delete obj.describe; //汉字描述删掉
    obj.name = obj.name || "XMQAni"+key; //给这个类一个名字
    let actClass = cc.Class(obj);
    myProperties[paramName+key] = {
        type: actClass,
        default: null,
        displayName: describe,
        visible() {
            let bol = false;
            for (let j = 0; j < this.actionTags.length; j++) {
                if (this.actionTags[j]==key) {
                    bol = true;
                    break;
                }
            }
            if (bol) {
                if (!this[paramName+key]) {
                    this[paramName+key] = new actClass;
                }
                bol = typeof obj.properties !== "undefined" && obj.properties !==null;
            }
            return bol;
        }
    };
};
// 组件
cc.Class({
    extends: cc.Component,
    properties: myProperties,
    onLoad() {
        for (let i = 0; i < this.actionTags.length; i++) {
            this[paramName+this.actionTags[i]].run(this.node);
        }
    }
});
// ActionComponent
// 自定义的动作组件
// 一个节点不能挂相同的动画 
// 动作
let actionAry = require("ActionArray");

var getActionObj = function(index) {
    let array = Object.values(actionAry);
    return array[index];
};

let actionEnum = {
    unknown: 0, //默认没有动画(占位用的)
};
let keyArray = Object.keys(actionAry);
keyArray.forEach((name, index) => actionEnum[name] = index+1);
actionEnum = cc.Enum(actionEnum);

let classProperties = {
	actionTags: {
		type: actionEnum,
		default: [],
		tooltip: "多个动画",
	},
}
for (let key in keyArray) {
	// Editor.log(key)
	let obj = getActionObj(key);
	let describe = obj.describe;
    delete obj.describe; //汉字描述删掉
	let actClass = cc.Class(obj);
	classProperties[obj.name] ={
		type: actClass,
		default: null,
		displayName: describe,
		visible() {
		    let bol = false;
			for (let j = 0; j < this.actionTags.length; j++) {
                if (this.actionTags[j] === parseInt(key)+1) {
                    bol = true;
                    break;
                }
            }
		    if (bol) {
		        if (!this[obj.name]) {
		            this[obj.name] = new actClass;
		        }
		        bol = true;
		    }
		    return bol;
		}
	}
};
// 组件
cc.Class({
    extends: cc.Component,
    properties: classProperties,
    editor: CC_EDITOR && {
        menu: "自定义/ActionComponent",
    },
    onLoad() {
        for (let index in this.actionTags) {
            this[actionEnum[this.actionTags[index]]].run(this.node);
        }
    },
});
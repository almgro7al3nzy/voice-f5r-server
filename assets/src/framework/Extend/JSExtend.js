// js原生扩展
/////////////////////////////////////////////////////////////
// Date function extend
/////////////////////////////////////////////////////////////

/*对Date的扩展，将 Date 转化为指定格式的String
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* 例子： 
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
*/
(function(){
	if (Date.prototype.Format == null) {
	    Date.prototype.Format = function (fmt) {
	        let o = {
	            "M+": this.getMonth() + 1, 	//月份 
	            "d+": this.getDate(), 		//日 
	            "h+": this.getHours(), 		//小时 
	            "m+": this.getMinutes(), 	//分 
	            "s+": this.getSeconds(), 	//秒 
	            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	            "S": this.getMilliseconds() //毫秒 
	        };
	        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (let k in o)
	            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    };
	}
}());


/////////////////////////////////////////////////////////////
// Math function extend
/////////////////////////////////////////////////////////////

/*
* Math.randomInt(min,max)
* @param min 最小值
* @param max 最大值
* return 随机min到max的值
*/
Math.randomInt = function(min,max){
	return parseInt(Math.random() * (max - min + 1)+ min,10);
};

/*
* Math.randomStrings(n)
* @param n 位数
* return 随机n位数字字符串
*/
Math.randomStrings = function(n){
	let ret ='';
	for (var i = n - 1 ; i >= 0; i--) {
		let r = Math.floor(Math.random()*10);
		ret += r;
	}
	return ret;
};


/////////////////////////////////////////////////////////////
// js function extend
/////////////////////////////////////////////////////////////
var js = cc.js;
/*
* cc.js.andBit(num,bit)
* @param num 数字
* @param bit 位
* return bit位清零
*/
js.subBit = function(num,bit){
	let sub = num & bit;
	return sub > 0 ? num - sub : num;
};

/*
* cc.js.isUndefined(obj)
* @param obj 对象 object
* return true false
*/
js.isUndefined = function(obj){
	return typeof obj === 'undefined' ;
};

/*
* cc.js.isNull(value)
* @param value
* return true false
*/
js.isNull = function(value){
	return value === null ;
};

/*
* cc.js.isFunction(func)
* @param func 函数
* return true false
*/
js.isFunction = function(func){
	return !this.isNull(func) && typeof func === 'function';
};

/*
* cc.js.isArray(arr)
* @param arr 数组
* return true false
*/
js.isArray = function(arr){
	return !this.isNull(arr) && typeof arr instanceof Array;
};

/*
* cc.js.isObject(obj)
* @param obj 对象 object
* return true false
*/
js.isObject = function(obj){
	return  !this.isNull(obj) && typeof obj === 'Object';
};

// js.isUnAarryObject = function(){
// 	return  !this.isNull(obj) && typeof obj === 'Object' && !this.isArray(obj) ;
// };

/*
* cc.js.isNullObject(obj)
* @param obj 对象 object
* return true false
*/
js.isNullObject = function(obj){
	if(this.isObject(obj)){
		var arr = Object.keys(obj);
        return arr.length === 0;
	}
	return true;
};

/*
* cc.js.isValid(value)
* @param value 
* return true false
*/
// js.isValid = function (value) {
//     return !this.isUndefined(value) && !this.isNull(value);
// };
//有效
js.isValid = function (value) {
    return !(value === null || value === undefined || value === NaN);
};
//无效
js.isInvalid = function(value){
    return (value === null || value === undefined || value === NaN);
};

/*
* cc.js.dump(obj,des)
* @param obj 
* @param des 
* return string
*/
js._dump = function(obj,des){
	let str = des != null ? des + "=" : " ";
    if (!this.isObject(obj)) {
        return str + obj;
    }
    let _dump = function (o, sb) {
        str += "{";
        let haveValue = false
        let newsb = sb + "    "
        for (let key in o) {
            let value = o[key];
            if (this.isFunction(value))break;
            haveValue = true
            str += "\n" + newsb + key + ": "
            if (this.isObject((value))) 
                _dump(value, newsb);
            else
                str += value + ',';
        }
        if (haveValue)
            str += "\n" + sb + "},";
        else
            str += "},";
    };
    _dump(obj, "");
    return str
};

js.dump = function (obj, des) {
    var str = this._dump(obj, des)
    console.log(str);
    return str;
};

// 获取当前时间戳(毫秒) GTimeMgr.getCurrentTime()
js.getCurrentTime = function(){
    return new Date().getTime();
};
// 当前时间转成这样的格式[09:34:02:00] GTimeMgr.getLogTime()
js.getLogTime = function(){
    return (new Date()).Format("hh:mm:ss.S");
};
// 替换转换的类型
js.replace= function(...args){
    let arr = [].slice.call(arguments),
    fmt = arr.shift(),
    i = 0;
    return fmt.replace(/%(\w)?(\d)?([dfsx])/ig, (_, a, b, c)=>{
        let s = b ? new Array(b - 0 + 1).join(a || "") : "";
        if (c == "d") s += parseInt(arr[i++]);
        if (c == "f") s += parseFloat(arr[i++]);
        else if (c == "s") s += arr[i++];
        return b ? s.slice(b * -1) : s;
    })
};

// 去除protobuf协议中的Undefined和空的{}、[]
js.clearUndefinedAndEmptyTable = function(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            if (typeof value === "undefined") {
                delete obj[key];
            } else if (cc.js.isTable(value)) {
                if (this.isArray(value) && value.length===0) {
                    delete obj[key];
                } else if (this.isObject(value) && Object.keys(value).length===0) {
                    delete obj[key];
                } else {
                    this.clearUndefinedAndEmptyTable(value);
                }
            }
        }
    }
};
// 克隆一个对象({}或[])
js.cloneTable = function (obj) {
    if (!this.isTable(obj))
        return obj;
    let newObj = this.newTable(obj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = this.cloneTable(obj[key]);
        }
    }
    return newObj;
};
js.newTable = function (obj) {
    if (this.isArray(obj)) {
        return [];
    } else if (this.isObject(obj)) {
        return {};
    }
    return null;
};
// 检查object有没有某个key(没有就赋值为{})并返回value
js.checkKeyAndSetObj = function (obj, key) {
    if (this.isInvalid(obj[key]))
        obj[key] = {};
    return obj[key];
};
// 检查object有没有某个key(没有就赋值为[])并返回value
js.checkKeyAndSetAry = function (obj, key) {
    if (this.isInvalid(obj[key]))
        obj[key] = [];
    return obj[key];
};
// 检查并返回布尔值
js.checkBool = function (bol) {
    if ("boolean" !== typeof bol)
        return false;
    return bol;
};
// 检查并返回数字
js.checkNumber = function (num) {
    if ("number" !== typeof num)
        return 0;
    return num;
};
// 检查并返回字符串
js.checkString = function (str) {
    if ("string" !== typeof str)
        return "";
    return str;
};
// 是不是空字符串
js.isEmptyStr = function(str){
    if (this.isInvalid(str))
        return true;
    return str.length < 1;
};


/**
 * 剪短字符串
 * @param str
 * @param long(汉字长度)
 * @returns {string}
 */
js.cutString = function (str, long) {
    let lenMax = long * 2;
    let lenCur = 0;
    let emojiI = 0; //粗暴的只处理成由两个len组成的emoji
    let strI = str.length;
    let endI = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 0xA000) {
            emojiI++;
            endI = 1;
            if (emojiI%2===0) {
                // 是emoji(也当成一个汉字长度处理)
                lenCur += 2;
                endI = lenCur > lenMax ? 0 : 2;
            }
        } else if (str.charCodeAt(i) > 255) {
            // 是汉字
            lenCur += 2;
            emojiI = 0;
            endI = 1;
        } else {
            lenCur++;
            emojiI = 0;
            endI = 1;
        }
        if (lenCur === lenMax) {
            strI = i + 1;
            break;
        } else if (lenCur > lenMax) {
            strI = emojiI%2===0 ? i-1 : i;
            break;
        }
    }
    return strI < str.length ? str.substr(0, strI - endI) + "…" : str;
};
/*
* 数字转换 
* num 数字
* useChinese 使用中文
* dot 小数点后多少位
*/
js.formatNumber = function(num,useChinese,dotCount){
    if (this.isEmptyStr(num)) return '';
    let dividend = 10000; 
    if (num <= dividend) return ''+num;
    let en = ['W','Y','WY'];
    let zh = ['万', '亿', '万亿'];
    let units = en;        
    if(useChinese){
        units = zh;
    }
    let decimal = 2;
    if(dotCount)decimal = dotCount;

    let _str = '';
    let curentUnit = units[0]; //转换单位 
    let _strLen = (tempNum)=>{ 
        let _strNum = tempNum.toString(); 
        let _index = _strNum.indexOf("."); 
        let _newNum = _strNum; 
        if(_index!=-1) _newNum = _strNum.substring(0,_index); 
        return _newNum.length
    }
    
    for (let i = 0; i <4; i++) { 
        curentUnit = units[i] 
        if(_strLen(num)<5)
            break; 
        num = num / dividend; 
        _str = num.toFixed(decimal)+curentUnit;
    }
    return _str;
};
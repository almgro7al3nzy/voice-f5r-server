/**
 * http调用 get post
 */
var http = {
    name: "http",
    extends: require("BaseEvent"),
    /**
     * @param path file
     * @param data
     * @param handler
     * @param extraUrl other url
     * @param isPost post get request
     * use : sendRequest("web",{id:1},()=>{ doFunction },"www.eaiting.com",false);
     */
    sendRequest: function (path,data,handler,extraUrl,isPost) {
    	dispatchNodeEvent("showNetWait");
        if(extraUrl === null){
            extraUrl = cc.sys.localStorage.getItem("GateWayAddress") || H2O.GATE_DEFAULT_GATEWAY_ADDRESS;
        }
        //创建xhr
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var str = "?";
        for(var k in data){
            if(str != "?"){
                str += "&";
            }
            str += k + "=" + data[k];
        }
        if(data === null || data.length === 0 ){
            str = "";
        }
        var requestURL = extraUrl + path + encodeURI(str);
        //设置发送方式和地址
        if(isPost){
            xhr.open("POST", extraUrl);
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://baidu.com');
        }else{
            xhr.open("GET",requestURL, true);
            if (cc.sys.isNative){
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
        }
        //超时重试机制
        let retryFunc = function () {
            this.sendRequest(path,data,handler,extraUrl,isPost);
        }.bind(this);
        let timer = setTimeout(function () {
            xhr.hasRetried = true;
            xhr.abort();
            console.log('[http:] timeout');
            retryFunc();
        }, 5000);
        //回调处理
        xhr.onreadystatechange = function () {
            // console.log("onreadystatechange");
            clearTimeout(timer);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                console.log("[HTTPS] response from [" + xhr.responseURL + "] data [", xhr.responseText, "]");
                var ret = null;
                var crypto = require("Crypto");
                try {
                    if(isPost){
                        ret = JSON.parse(xhr.responseText);
                    }else{
                        data = JSON.parse(crypto.decodeBase64(xhr.responseText));
                        ret = {
                            code: 0,
                            data: data
                        };
                    }
                } catch (e) {
                    console.log("err:" + e);
                    ret = {
                        code: -1,
                        msg: e
                    };
                }
                dispatchNodeEvent("hideNetTips");
                if (handler) {
                    handler(ret);
                }
                handler = null;
            }
            else if (xhr.readyState === 4) {
                if (xhr.hasRetried) {
                    return;
                }
                console.log('[http:] readystate == 4' + ', status:' + xhr.status);
                setTimeout(function () {
                    retryFunc();
                }, 5000);
            }
            else {
                console.log('[http:] readystate:' + xhr.readyState + ', status:' + xhr.status);
            }
        };

        //开始发送数据
        try {
            if(isPost){
                let requestData = JSON.stringify(data);
                console.log("[HTTPS] Post: requestURL", requestData);
                xhr.send(requestData);
            }else{
                console.log("[HTTPS] Get: requestURL",requestURL);
                xhr.send();
            }
        }
        catch (e) {
            setTimeout(retryFunc, 200);
        }
    },
};

H2O.GHttp = http;
module.exports = http;
// Crypto
// 加解密模块

module.exports = {
    /**
     * aes cbc 加密
     * @param aeskey
     * @param aesiv
     * @param data
     * @returns {null}
     */
    aes_enc_cbc: function (aeskey, aesiv, data) {
        //数据的合法性检测
        if (!data) return null;
        if (typeof data === 'object') {
            try {
                data = JSON.stringify(data);
            } catch (e) {
            }
        }
        //加密的key
        let key = CryptoJS.enc.Utf8.parse(aeskey);
        //加密的key
        let iv = CryptoJS.enc.Utf8.parse(aesiv);
        //aes加密后生成的对象
        let encryptedObj = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
        ;
        //把生成的加密对象转换为字符串
        return encryptedObj.ciphertext.toString(CryptoJS.enc.Base64);
    },
    /**
     * aes cbc 解密
     * @param aeskey
     * @param aesiv
     * @param data
     * @returns {null}
     */
    aes_dec_cbc: function (aeskey, aesiv, data) {
        //数据合法性检测
        if (!data) return null;
        //加密的key
        let key = CryptoJS.enc.Utf8.parse(aeskey);
        //加密的key
        let iv = CryptoJS.enc.Utf8.parse(aesiv);
        //解密后的对象
        let result = CryptoJS.AES.decrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        //获得解密后的字符串
        let decData = result.toString(CryptoJS.enc.Utf8);
        return decData
    },
      // private property
    _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encodeBase64 : function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while(i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if(isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if(isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    // public method for decoding
    decodeBase64 : function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while(i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if(enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if(enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode : function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for(var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if(c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode : function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while(i < utftext.length) {
            c = utftext.charCodeAt(i);
            if(c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    unescapeString : function(string){
        var retString = unescape(this.decodeBase64(string));
        return retString;
    },
    escapeString : function(string){
        var retString = this.encodeBase64(escape(string)) ;
        return retString;
    },

    decodeString: function(string){
        return unescape(cc.Codec.Base64.decode(string));
    },
    decodeAsArray: function(string){
        return unescape(cc.Codec.Base64.decodeAsArray(string));
    },
}
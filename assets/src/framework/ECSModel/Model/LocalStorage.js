const METHOD = {
    GET : 0,
    SET : 1,
    REMOVE : 2,
    CLEAR : 3
};
let _localStorageFactory = function(method, key, value) {
    if(localStorage) {
        switch(method) {
            case METHOD.GET:
                return cc.sys.localStorage.getItem(key);
            case METHOD.SET:
                cc.sys.localStorage.setItem(key, value);
                break;
            case METHOD.REMOVE:
                cc.sys.localStorage.removeItem(key);
                break;
            case METHOD.CLEAR:
                cc.sys.localStorage.clear();
                break;
        }
        return true;
    }
    return false;
};
let LocalStorage = {
    getItem : function(type, key) {
        var item = JSON.parse(_localStorageFactory(METHOD.GET, type));
        if(item) {
            return item[key];
        }
        return null;
    },
    setItem : function(type, key, value) {
        var item = JSON.parse(_localStorageFactory(METHOD.GET, type));
        if(!item) {
            _localStorageFactory(METHOD.SET, type, '{"' + key + '": ' + JSON.stringify(value) + '}');
        } else {
            item[key] = value;
            _localStorageFactory(METHOD.SET, type, JSON.stringify(item));
        }
    },
    removeItem : function(type, key) {
        var items = _localStorageFactory(METHOD.GET, type);
        delete items[key];
        _localStorageFactory(METHOD.SET, type, items);
    },
    clear : function(type) {
        _localStorageFactory(METHOD.REMOVE, type);
    },
    clearAll : function() {
        _localStorageFactory(METHOD.CLEAR);
    }
};
window.GLocalStorage = LocalStorage;
module.exports = LocalStorage;
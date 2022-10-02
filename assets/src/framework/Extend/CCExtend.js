/**
 * 通过资源实例化预制对象
 * @param resPath   资源字符串
 * @param cb    回调函数返回
 */
cc.createPrefab = function (resPath, cb) {
    cc.loader.loadRes(resPath, (err, prefab) => {
        let node = null;
        if (err) {
            cc.error(`[createPrefab] ${err.message || err}`);
        } else {
            node = cc.instantiate(prefab);
        }
        if (cb) {
            cb(node);
        }
    });
};
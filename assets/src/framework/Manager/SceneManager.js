// SceneManager 
let SceneManager = {
	//场景默认勾选了自动销毁 因此不需要缓存或者销毁
	//打开场景
	openScene: function(sceneName,loading,callback){
		// console.time("==============>openScene=" + sceneName);
		if(loading){
			//loadingScene 默认加载的进度场景
			this.enterScene("LoadingScene", () => {
                this.preloadScene(sceneName, () => {
                    this.enterScene(sceneName, callback);
                });
            });
            return;
		}
		this.enterScene(sceneName,callback);
		// console.timeEnd("==============>openScene="　+　sceneName);
	},
	//预加载场景
	preloadScene(sceneName,callback){
		cc.director.preloadScene(sceneName, () => {
           "function" === typeof callback && callback();
        });
	},
	//进入场景
	enterScene: function(sceneName,callback){
		cc.director.loadScene(sceneName, () => {
            cc.director.getScene().name = sceneName; //name属性时有时无 为保证有 主动再赋值一下
            "function" === typeof callback && callback();
        });
	},
	// 给当前运行的场景加scheduleUpdate
	// startTimer(){
		// cc.director.getScene()
	// },
};

window.GSceneMgr = SceneManager;
let PageManager = {
    pageList: [],
    cachePageList: [],
    openPage(page,pageData,callBack){
    	let pageName=null,pageDir=null;
    	if (page && typeof page === 'object') {
	        pageName = page.pageName;
	        pageDir = page.pageDir;
	    }
    	for (var i = 0; i < PageManager.cachePageList.length; i++) {
	        var temp = PageManager.cachePageList[i];
	        if (temp && temp.name === pageName) {
	            temp.active = true;
	            temp._pageData = pageData || {};
	            temp.parent = cc.Canvas.instance.node;
	            PageManager.pageList.push(temp);
	            PageManager.cachePageList.splice(i, 1);

	            var pageScript = temp.getComponent("basePage");
		        if(pageScript)pageScript.playPageIn();
	            if(callBack)callBack(temp);
	            return;
	        }
	    }
	    cc.loader.loadRes(pageDir, function(err, prefab) {
	        if (err) {
	            cc.error(err.message || err);
	            return;
	        }

	        var temp = cc.instantiate(prefab);
	        temp._pageData = pageData || {};
	        temp.parent = cc.Canvas.instance.node;
	        PageManager.pageList.push(temp);
	        var pageScript = temp.getComponent("basePage");
	        if(pageScript)pageScript.playPageIn();
	        if(callBack)callBack(temp);
	    });
    },
    closePage(page,callBack){
    	let pageName=null;
    	if (page && typeof page === 'object') {
	        pageName = page.name || page.node.name;
	    }else if(page && typeof page === 'string'){
	    	pageName = page;
	    }else{
	    	cc.assert("closePage page is error ",page);
	    	return;
	    }
    	for (var i = PageManager.pageList.length - 1; i >= 0; i--) {
	        var temp = PageManager.pageList[i];
	        if (temp && temp.name === pageName) {
	            temp.active = false;
	            temp.removeFromParent(true);
	            PageManager.cachePageList.push(temp);
	            PageManager.pageList.splice(i, 1);
	            var pageScript = temp.getComponent("basePage");
		        if(pageScript)pageScript.playPageOut();
	            if(callBack)callBack();
	            return;
	        }
	    }
    },
    //force
    forceDestroyPage(page,callBack){
    	let pageName=null;
    	if (page && typeof page === 'object') {
	        pageName = page.name || page.node.name;
	    }else if(page && typeof page === 'string'){
	    	pageName = page;
	    }else{
	    	cc.assert("forceDestroy page is error ",page);
	    	return;
	    }
    	for (var i = PageManager.pageList.length - 1; i >= 0; i--) {
	        var temp = PageManager.pageList[i];
	        if (temp && temp.name === pageName) {
	            temp.active = false;
	            temp.removeFromParent(true);
	            PageManager.pageList.splice(i, 1);
	            var pageScript = temp.getComponent("basePage");
		        if(pageScript)pageScript.playPageOut();
		        temp.destroy();
	            if(callBack)callBack();
	            return;
	        }
	    }
    },
    findPage(pageName){
    	for (var i = PageManager.pageList.length - 1; i >= 0; i--) {
	        var temp = PageManager.pageList[i];
	        if (temp && temp.name === pageName) {
	            return temp;
	        }
	    }
    },
    closeAllPage(callBack){
    	for (var i = PageManager.pageList.length - 1; i >= 0; i--) {
	        var temp = PageManager.pageList[i];
	        temp.active = false;
	        temp.removeFromParent(true);
            PageManager.cachePageList.push(temp);
            PageManager.pageList.splice(i, 1);
            if(callBack)callBack();
	    }
    },
};

window.GPageMgr = PageManager;
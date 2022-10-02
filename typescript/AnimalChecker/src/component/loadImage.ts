const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/Component/LoadImage")
export default class LoadImage extends cc.Component {
    @property(cc.Sprite)
    public avatar: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this._setupSpriteFrame();
    }
    start () {

    }
    _setupSpriteFrame(){
        if(cc.isValid(this) && this._spriteFrame ){
            this.avatar.spriteFrame = this._spriteFrame;    
        }
    }
    setAvatar(avatar){
        var self = this;
        if(avatar){
            this.loadImage(avatar,function (spriteFrame) {
                self._spriteFrame = spriteFrame;
                self._setupSpriteFrame();
            });   
        }
    }
    loadImage(url,callback){
        cc.loader.load(url,function (err,tex) {
            if(tex){
                var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
                callback(spriteFrame);
            }else{
                console.error("loadImage error",err);
            }
        });
    }
    // update (dt) {}
}

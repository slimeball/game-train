/**
 * Created by sunzg on 14-7-31.
 */
var ImgBtn = (function (_super) {
    __extends(ImgBtn, _super);
    function ImgBtn() {
        _super.call(this);
    }
    var d = __define,c=ImgBtn,p=c.prototype;
    p.createBtn = function (upData, downData, dispatcher) {
        this._downImg = new egret.Bitmap();
        this._upImg = new egret.Bitmap();
        this._downImg.texture = downData;
        this._upImg.texture = upData;
        this.touchEnabled = true;
        this._dispatcher = dispatcher;
        this.addChild(this._downImg);
        this.addChild(this._upImg);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
    };
    p.downHandler = function (evt) {
        this._downImg.visible = true;
        this._upImg.visible = false;
    };
    p.upHandler = function (evt) {
        this._downImg.visible = false;
        this._upImg.visible = true;
    };
    p.touchTapHandler = function (evt) {
        this._dispatcher.dispatchEventWith("startGame");
    };
    return ImgBtn;
}(egret.Sprite));
egret.registerClass(ImgBtn,'ImgBtn');

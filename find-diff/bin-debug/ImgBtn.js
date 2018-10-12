var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ImgBtn = (function (_super) {
    __extends(ImgBtn, _super);
    function ImgBtn() {
        return _super.call(this) || this;
    }
    ImgBtn.prototype.createBtn = function (upData, downData, dispatcher) {
        this._btnPressUp = new egret.Bitmap();
        this._btnPressDown = new egret.Bitmap();
        this._btnPressUp.texture = upData;
        this._btnPressDown.texture = downData;
        this.touchEnabled = true;
        this._dispatcher = dispatcher;
        this.addChild(this._btnPressUp);
        this.addChild(this._btnPressDown);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downFunc, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upFunc, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.upFunc, this);
    };
    ImgBtn.prototype.downFunc = function () {
        this._btnPressDown.visible = true;
        this._btnPressUp.visible = false;
    };
    ImgBtn.prototype.upFunc = function () {
        this._btnPressDown.visible = false;
        this._btnPressUp.visible = true;
    };
    return ImgBtn;
}(egret.Sprite));
__reflect(ImgBtn.prototype, "ImgBtn");
//# sourceMappingURL=ImgBtn.js.map
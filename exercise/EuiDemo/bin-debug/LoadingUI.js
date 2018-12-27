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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.bgImg = new egret.Bitmap();
        this.bgImg.texture = RES.getRes('loading_jpg');
        this.addChild(this.bgImg);
        this.loadingImg = new egret.Bitmap();
        this.loadingImg.texture = RES.getRes('loading2_png');
        this.loadingImg.anchorOffsetX = this.loadingImg.width / 2;
        this.loadingImg.anchorOffsetY = this.loadingImg.height / 2;
        this.loadingImg.x = this.width / 2;
        this.loadingImg.y = this.height / 2;
        this.addChild(this.loadingImg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.height / 2 - this.textField.height / 2;
        this.textField.width = 480;
        this.textField.height = 20;
        this.textField.size = 14;
        this.textField.textAlign = "center";
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    LoadingUI.prototype.update = function () {
        this.loadingImg.rotation += 5;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var per = Math.floor((current / total) * 100);
        this.textField.text = per + '%';
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map
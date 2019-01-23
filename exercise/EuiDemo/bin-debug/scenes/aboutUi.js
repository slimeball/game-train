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
var aboutUi = (function (_super) {
    __extends(aboutUi, _super);
    function aboutUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        return _this;
    }
    aboutUi.prototype.handleUi = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvent.EVT_CLOSE_ABOUT);
        }, this);
        this.aboutText.text = 'this is about me me me. Noah Jesus';
    };
    aboutUi.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return aboutUi;
}(eui.Component));
__reflect(aboutUi.prototype, "aboutUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=aboutUi.js.map
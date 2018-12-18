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
var HomeUi = (function (_super) {
    __extends(HomeUi, _super);
    function HomeUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.handleUi, _this);
        _this.skinName = '/resource/custom_skins/HomeUi.exml';
        return _this;
    }
    HomeUi.prototype.handleUi = function () {
    };
    return HomeUi;
}(eui.Component));
__reflect(HomeUi.prototype, "HomeUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HomeUi.js.map
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
var playerUi = (function (_super) {
    __extends(playerUi, _super);
    function playerUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        _this.skinName = '/resource/custom_skins/playerUi.exml';
        return _this;
    }
    playerUi.prototype.handleUi = function () {
        var _this = this;
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvent.EVT_RETURN);
        }, this);
    };
    return playerUi;
}(eui.Component));
__reflect(playerUi.prototype, "playerUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=playerUi.js.map
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
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(text, size, color) {
        var _this = _super.call(this) || this;
        var logo = new egret.TextField();
        logo.text = text;
        logo.size = size;
        logo.textColor = color;
        _this.addChild(logo);
        return _this;
    }
    return Logo;
}(egret.Sprite));
__reflect(Logo.prototype, "Logo");
//# sourceMappingURL=Logo.js.map
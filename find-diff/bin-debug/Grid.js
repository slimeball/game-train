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
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._type = 0;
        _this._imgIco = new egret.Bitmap();
        _this.addChild(_this._imgIco);
        return _this;
    }
    Grid.prototype.touchTapHandler = function (evt) {
        this._dispatcher.dispatchEventWith("GridTouchTap", true);
    };
    Grid.prototype.reset = function (index, type, data, scale) {
        this._imgIco.texture = data;
        this._imgIco.scaleX = scale;
        this._imgIco.scaleY = scale;
        this._type = type;
    };
    return Grid;
}(egret.DisplayObjectContainer));
__reflect(Grid.prototype, "Grid");
//# sourceMappingURL=Grid.js.map
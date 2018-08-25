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
var fighter;
(function (fighter) {
    var Airplane = (function (_super) {
        __extends(Airplane, _super);
        function Airplane() {
            var _this = _super.call(this) || this;
            _this.bmp = fighter.createBitmapByName('f1_png');
            _this.addChild(_this.bmp);
            return _this;
        }
        return Airplane;
    }(egret.DisplayObjectContainer));
    fighter.Airplane = Airplane;
    __reflect(Airplane.prototype, "fighter.Airplane");
})(fighter || (fighter = {}));
//# sourceMappingURL=fighter.js.map
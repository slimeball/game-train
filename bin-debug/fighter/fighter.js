var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var fighter;
(function (fighter) {
    var Airplane = /** @class */ (function (_super) {
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
})(fighter || (fighter = {}));

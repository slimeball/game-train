var fighter;
(function (fighter) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        return Utils;
    }());
    fighter.Utils = Utils;
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    fighter.createBitmapByName = createBitmapByName;
})(fighter || (fighter = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fighter;
(function (fighter) {
    var Bullet = (function () {
        function Bullet() {
        }
        return Bullet;
    }());
    fighter.Bullet = Bullet;
    __reflect(Bullet.prototype, "fighter.Bullet");
})(fighter || (fighter = {}));

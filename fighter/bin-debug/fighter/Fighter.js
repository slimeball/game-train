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
    var Aircraft = (function (_super) {
        __extends(Aircraft, _super);
        function Aircraft(texture, fireDelay) {
            var _this = _super.call(this) || this;
            _this.blood = 10;
            _this.fireDelay = fireDelay;
            _this.bmp = fighter.createBitmapByName('f1_png');
            _this.addChild(_this.bmp);
            _this.fireTimer = new egret.Timer(fireDelay);
            return _this;
            // this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
        }
        Aircraft.produceAircraft = function (textureName, fireDelay) {
            if (fighter.Aircraft.cacheDirt[textureName] == null) {
                fighter.Aircraft.cacheDirt[textureName] = [];
                var dict = fighter.Aircraft.cacheDirt[textureName];
                var theFighter = void 0;
                if (dict.length > 0) {
                    theFighter = dict.pop();
                }
                else {
                    theFighter = new fighter.Aircraft(RES.getRes(textureName), fireDelay);
                }
                theFighter.blood = 10;
                return theFighter;
            }
        };
        Aircraft.reclaimAircraft = function (theFighter, textureName) {
            if (fighter.Aircraft.cacheDirt[textureName] == null) {
                fighter.Aircraft.cacheDirt[textureName] = [];
                var dict = fighter.Aircraft.cacheDirt[textureName];
                if (dict.indexOf(theFighter) == -1) {
                    dict.push(theFighter);
                }
            }
        };
        Aircraft.prototype.fire = function () {
            this.fireTimer.start();
        };
        Aircraft.prototype.stopFire = function () {
            this.fireTimer.stop();
        };
        Aircraft.cacheDirt = {};
        return Aircraft;
    }(egret.DisplayObjectContainer));
    fighter.Aircraft = Aircraft;
    __reflect(Aircraft.prototype, "fighter.Aircraft");
})(fighter || (fighter = {}));
//# sourceMappingURL=Fighter.js.map
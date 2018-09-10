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
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.myBullet = [];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameContainer.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        GameContainer.prototype.createGameScene = function () {
            // background 
            this.bg = new fighter.BgMap();
            this.addChild(this.bg);
            this.bg.start();
            // start button
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.startBtn = fighter.createBitmapByName('btn_start_png');
            this.startBtn.x = (this.stageW - this.startBtn.width) / 2;
            this.startBtn.y = (this.stageH - this.startBtn.height) / 2;
            this.startBtn.touchEnabled = true;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            // touch down start button
            this.addChild(this.startBtn);
            // add fighter to stage
            this.playerFighter = new fighter.Aircraft(RES.getRes('f1_png'), 100);
            this.playerFighter.y = this.stageH - this.playerFighter.height - 50;
            this.playerFighter.x = (this.stageW / 2) - (this.playerFighter.width / 2);
            this.addChild(this.playerFighter);
        };
        GameContainer.prototype.gameStart = function () {
            this.removeChild(this.startBtn);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.touchEnabled = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.updateView, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.playerFighter.addEventListener('keydown', this.ctrlLeft, this);
            // this.playerFighter.fire();
            // this.playerFighter.addEventListener('createBullet', this.createbulletHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.createbulletHandler, this);
        };
        GameContainer.prototype.touchHandler = function (evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                this.playerFighter.x = evt.localX - this.playerFighter.width;
            }
        };
        GameContainer.prototype.createbulletHandler = function (evt) {
            var bullet;
            // if (evt.target == this.playerFighter) {
            for (var i = 0; i < 2; i++) {
                bullet = fighter.Bullet.produceBullet('b1_png');
                bullet.x = this.playerFighter.x + this.playerFighter.width / 2;
                bullet.y = this.playerFighter.y - this.playerFighter.height;
                this.addChildAt(bullet, this.numChildren - 1);
                this.myBullet.push(bullet);
            }
            // }
        };
        GameContainer.prototype.ctrlLeft = function (evt) {
            console.log(evt);
        };
        GameContainer.prototype.updateView = function (evt) {
            var bullet;
            var bulletLen = this.myBullet.length;
            for (var i = 0; i < bulletLen; i++) {
                bullet = this.myBullet[i];
                bullet.y -= this.myBullet[i].height;
            }
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    fighter.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "fighter.GameContainer");
})(fighter || (fighter = {}));
//# sourceMappingURL=GameContainer.js.map
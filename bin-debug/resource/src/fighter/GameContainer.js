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
            this.playeFighter = new fighter.Airplane(RES.getRes('f1_png'), 100);
            this.playeFighter.y = this.stageH - this.playeFighter.height - 50;
            this.playeFighter.x = (this.stageW / 2) - (this.playeFighter.width / 2);
            this.addChild(this.playeFighter);
        };
        GameContainer.prototype.gameStart = function () {
            this.removeChild(this.startBtn);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        };
        GameContainer.prototype.touchHandler = function (evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                this.playeFighter.x = evt.localX;
            }
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    fighter.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "fighter.GameContainer");
})(fighter || (fighter = {}));

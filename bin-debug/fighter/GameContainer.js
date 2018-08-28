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
    var GameContainer = /** @class */ (function (_super) {
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
            this.playeFighter = new fighter.Airplane();
            this.playeFighter.y = this.stageH - this.playeFighter.height - 50;
            this.playeFighter.x = (this.stageW / 2) - (this.playeFighter.width / 2);
            this.addChild(this.playeFighter);
        };
        GameContainer.prototype.gameStart = function () {
            egret.log(2);
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
})(fighter || (fighter = {}));

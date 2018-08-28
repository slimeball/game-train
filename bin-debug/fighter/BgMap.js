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
    var BgMap = /** @class */ (function (_super) {
        __extends(BgMap, _super);
        function BgMap() {
            var _this = _super.call(this) || this;
            _this.speed = 2;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BgMap.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture = RES.getRes('bg_jpg');
            this.textureHeight = texture.textureHeight;
            this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1;
            this.bmpArr = [];
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = fighter.createBitmapByName("bg_jpg");
                bgBmp.y = this.textureHeight * i - (this.textureHeight * this.rowCount - this.stageH);
                bgBmp.width = this.stageW;
                this.bmpArr.push(bgBmp);
                this.addChild(bgBmp);
            }
        };
        BgMap.prototype.enterFrame = function (event) {
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = this.bmpArr[i];
                bgBmp.y += this.speed;
                if (bgBmp.y > this.stageH) {
                    bgBmp.y = this.bmpArr[0].y - this.textureHeight;
                    this.bmpArr.pop();
                    this.bmpArr.unshift(bgBmp);
                }
            }
        };
        BgMap.prototype.start = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        BgMap.prototype.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        return BgMap;
    }(egret.DisplayObjectContainer));
    fighter.BgMap = BgMap;
})(fighter || (fighter = {}));

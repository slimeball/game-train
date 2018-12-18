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
var BlockGraphics = (function (_super) {
    __extends(BlockGraphics, _super);
    function BlockGraphics() {
        var _this = _super.call(this) || this;
        _this.colorArr = ['0x000000', '0xffffff', '0xcccccc', '0xff0000'];
        _this._canTouch = false;
        _this.init();
        return _this;
    }
    BlockGraphics.prototype.init = function () {
        this.touchEnabled = true;
        this.width = GameData.getBlockWidth();
        this.height = GameData.getBlockHeight();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.blockClick, this);
    };
    BlockGraphics.prototype.drawBlock = function (canTouch) {
        if (canTouch === void 0) { canTouch = false; }
        this._canTouch = canTouch;
        this.graphics.clear();
        if (canTouch) {
            this.graphics.beginFill(this.colorArr[0]);
        }
        else {
            this.graphics.beginFill(this.colorArr[1]);
        }
        this.graphics.lineStyle(1, 0);
        this.graphics.drawRect(0, 0, GameData.getBlockWidth(), GameData.getBlockHeight());
        this.graphics.endFill();
    };
    BlockGraphics.prototype.blockClick = function (evt) {
        this.graphics.clear();
        if (this._canTouch) {
            this.graphics.beginFill(this.colorArr[2]);
        }
        else {
            this.graphics.beginFill(this.colorArr[3]);
        }
        this.graphics.lineStyle(1, 0);
        this.graphics.drawRect(0, 0, GameData.getBlockWidth(), GameData.getBlockHeight());
        this.graphics.endFill();
        var evtObj;
        if (this._canTouch) {
            evtObj = new GameEvent(GameEvent.GAME_HIT);
        }
        else {
            evtObj = new GameEvent(GameEvent.GAME_OVER);
        }
        this.dispatchEvent(evtObj);
    };
    return BlockGraphics;
}(egret.Shape));
__reflect(BlockGraphics.prototype, "BlockGraphics");
//# sourceMappingURL=BlockGraphics.js.map
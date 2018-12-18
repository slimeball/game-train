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
var BlockGroup = (function (_super) {
    __extends(BlockGroup, _super);
    function BlockGroup() {
        var _this = _super.call(this) || this;
        _this._isTouch = false;
        _this.init();
        return _this;
    }
    BlockGroup.prototype.init = function () {
        this._boxArr = [];
        for (var i = 0; i < GameData.column; i++) {
            var box = new BlockGraphics();
            this._boxArr.push(box);
            box.addEventListener(GameEvent.GAME_HIT, this.gameHit, this);
            box.addEventListener(GameEvent.GAME_OVER, this.gameOver, this);
            this.addChild(box);
            box.x = GameData.getBlockWidth() * i;
        }
    };
    BlockGroup.prototype.createOne = function () {
        this._isTouch = false;
        var touchIndex = Math.floor(Math.random() * 4);
        var len = this._boxArr.length;
        for (var i = 0; i < len; i++) {
            if (i === touchIndex) {
                this._boxArr[i].drawBlock(true);
            }
            else {
                this._boxArr[i].drawBlock(false);
            }
        }
    };
    BlockGroup.prototype.gameHit = function (evt) {
        if (!this._isTouch) {
            this._isTouch = true;
            var evtObj = new GameEvent(GameEvent.GAME_HIT);
            this.dispatchEvent(evtObj);
        }
    };
    BlockGroup.prototype.gameOver = function (evt) {
        var evtObj = new GameEvent(GameEvent.GAME_OVER);
        this.dispatchEvent(evtObj);
    };
    return BlockGroup;
}(egret.Sprite));
__reflect(BlockGroup.prototype, "BlockGroup");
//# sourceMappingURL=BlockGroup.js.map
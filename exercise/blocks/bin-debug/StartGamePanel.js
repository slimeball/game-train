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
var StartGamePanel = (function (_super) {
    __extends(StartGamePanel, _super);
    function StartGamePanel() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    StartGamePanel.prototype.init = function () {
        this._bg = new egret.Shape();
        this._bg.graphics.beginFill(0);
        this._bg.graphics.drawRect(0, 0, GameData.getStageWidth(), GameData.getStageHeight());
        this._bg.graphics.endFill();
        this.addChild(this._bg);
        this._startBtn = new egret.TextField();
        this._startBtn.text = 'START';
        this._startBtn.size = 50;
        this._startBtn.x = (GameData.getStageWidth() - this._startBtn.width) / 2;
        this._startBtn.y = (GameData.getStageHeight() - this._startBtn.height) / 2;
        this.addChild(this._startBtn);
        this._startBtn.touchEnabled = true;
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
    };
    StartGamePanel.prototype.click = function (evt) {
        var evtObj = new GameEvent(GameEvent.GAME_START);
        this.dispatchEvent(evtObj);
    };
    return StartGamePanel;
}(egret.Sprite));
__reflect(StartGamePanel.prototype, "StartGamePanel");
//# sourceMappingURL=StartGamePanel.js.map
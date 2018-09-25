var StartGamePanel = (function (_super) {
    __extends(StartGamePanel, _super);
    function StartGamePanel() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=StartGamePanel,p=c.prototype;
    p.init = function () {
        this._background = new egret.Shape();
        this._background.graphics.beginFill(0);
        this._background.graphics.drawRect(0, 0, GameData.getStageWidth(), GameData.getStageHeight());
        this._background.graphics.endFill();
        this.addChild(this._background);
        this._startBtn = new egret.TextField();
        this._startBtn.text = "开始";
        this._startBtn.size = 50;
        this._startBtn.x = 180;
        this._startBtn.y = 200;
        this.addChild(this._startBtn);
        this._startBtn.touchEnabled = true;
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
    };
    p.click = function (evt) {
        var event = new GameEvent(GameEvent.GAME_START);
        this.dispatchEvent(event);
    };
    return StartGamePanel;
})(egret.Sprite);
egret.registerClass(StartGamePanel,'StartGamePanel');

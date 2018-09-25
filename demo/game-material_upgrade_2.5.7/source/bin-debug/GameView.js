var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GameView,p=c.prototype;
    p.init = function () {
        this._boxGroups = [];
        var len = GameData.row + 1;
        for (var i = 0; i < len; i++) {
            var boxg = new BoxGroup();
            this._boxGroups.push(boxg);
            this.addChild(boxg);
            boxg.addEventListener(GameEvent.GAME_OVER, this.gameOver, this);
            boxg.addEventListener(GameEvent.GAME_HIT, this.gamehit, this);
        }
        /*
        this.scoreText = new egret.TextField();
        this.scoreText.textColor = 0xff0000;
        this.scoreText.bold = true;
        this.scoreText.size = 100;
        */
        this.scoreText = new egret.BitmapText();
        this.scoreText.font = RES.getRes("number_fnt");
        this.scoreText.x = 180;
        this.scoreText.y = 50;
        this.scoreText.text = String(0);
        this.addChild(this.scoreText);
    };
    p.startgame = function () {
        this.scoreText.text = String(0);
        var len = GameData.row + 1;
        for (var i = 0; i < len; i++) {
            this._boxGroups[i].create();
            this._boxGroups[i].y = 0 - GameData.getBoxHeight() * (1 + i); //GameData.getStageHeight()-GameData.getBoxHeight()*(1+i);
        }
    };
    //移动
    p.move = function () {
        var len = GameData.row + 1;
        for (var i = 0; i < len; i++) {
            this._boxGroups[i].y += GameData.speed;
        }
        for (i = 0; i < len; i++) {
            if (this._boxGroups[i].y >= GameData.getStageHeight()) {
                if (!this._boxGroups[i].isHit) {
                    this.gameOver();
                    return;
                }
                if (i == 0) {
                    this._boxGroups[i].y = this._boxGroups[4].y - GameData.getBoxHeight();
                }
                else {
                    this._boxGroups[i].y = this._boxGroups[i - 1].y - GameData.getBoxHeight();
                }
                this._boxGroups[i].create();
            }
        }
    };
    p.gameOver = function (evt) {
        if (evt === void 0) { evt = null; }
        var event = new GameEvent(GameEvent.GAME_OVER);
        this.dispatchEvent(event);
    };
    p.gamehit = function (evt) {
        GameData.setScore(GameData.getScore() + 1);
        this.scoreText.text = String(GameData.getScore());
    };
    return GameView;
})(egret.Sprite);
egret.registerClass(GameView,'GameView');

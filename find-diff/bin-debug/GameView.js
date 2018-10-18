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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        // layout count
        _this._gridLvArr = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9];
        //  face index mark
        _this._gridTypeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        // visible result text
        _this._scoreLvDes = ["无药可救", "重度脸盲", "中度脸盲", "轻度脸盲", "顿足捶胸", "手疾眼快", "火眼金睛"];
        // ????
        _this._scoreLv = [21, 31, 41, 51, 56, 60];
        // total time mark
        _this._totalTime = 30 * 1000;
        // ???
        _this._runTime = 0;
        // current level
        _this._currentLv = 0;
        _this._space = 13.5;
        _this._row = 3;
        _this._column = 3;
        return _this;
    }
    GameView.prototype.createGame = function (res) {
        this._res = res;
        // init start button
        this._startBtn = new ImgBtn();
        this._startBtn.createBtn(this._res.getTexture('start1'), this._res.getTexture('start2'));
        this.addChild(this._startBtn);
        this._startBtn.x = (egret.MainContext.instance.stage.stageWidth - this._startBtn.width) / 2;
        this._startBtn.y = (egret.MainContext.instance.stage.stageHeight - this._startBtn.height) / 2;
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        // init restart button
        this._restartBtn = new ImgBtn();
        this._restartBtn.createBtn(this._res.getTexture("restart1"), this._res.getTexture("restart2"), this);
        this._restartBtn.x = (egret.MainContext.instance.stage.stageWidth - this._restartBtn.width) / 2;
        this._restartBtn.y = (egret.MainContext.instance.stage.stageHeight - this._restartBtn.height) / 2;
        this._restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        // init first page doll
        this._dollPic = new egret.Bitmap();
        this._dollPic.texture = this._res.getTexture('zxh');
        this.addChild(this._dollPic);
        this._dollPic.x = (egret.MainContext.instance.stage.stageWidth - this._dollPic.width) / 2;
        this._dollPic.y = (egret.MainContext.instance.stage.stageHeight - this._dollPic.height) / 3;
        // this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        // init grid container
        this._gridContainer = new egret.Sprite();
        this._gridContainer.width = egret.MainContext.instance.stage.stageWidth;
        this._gridContainer.height = this._gridContainer.width;
        this._gridContainer.y = this._gridContainer.width / 3;
        this._gridContainer.x = 0;
        this._gridContainer.graphics.beginFill(0xffffff);
        this._gridContainer.graphics.drawRect(0, 0, this._gridContainer.width, this._gridContainer.height);
        this._gridContainer.graphics.endFill();
        this.initGridPool();
    };
    GameView.prototype.destoryGrids = function () {
        while (this._gridContainer.numChildren) {
            this._gridPool.push(this._gridContainer.removeChildAt(0));
        }
    };
    GameView.prototype.getGrid = function (index, type, posX, posY) {
        var grid = this._gridPool.shift();
        var dataName = type.toString();
        var data = this._res.getTexture(dataName);
        grid.width = this._size;
        grid.height = this._size;
        var scale = this._size / 142;
        grid.x = (posX + 1) * this._space + posX * this._size;
        grid.y = (posY + 1) * this._space + posY * this._size;
        grid._dispatcher = this;
        grid.reset(index, type, data, scale);
        return grid;
    };
    /**
     * according level randomly get current type of face, another face and * position
     */
    GameView.prototype.getDifTypeAndPos = function (lv) {
        var typelen = this._gridTypeArr.length;
        var type = Math.floor(Math.random() * typelen + 1);
        var anotherType = Math.floor(Math.random() * typelen + 1);
        if (type == anotherType) {
            anotherType = type == 1 ? 2 : type - 1;
        }
        var pos = Math.floor(Math.random() * lv * lv + 1);
        this._difPos = pos;
        return [type, anotherType, pos];
    };
    GameView.prototype.createGrids = function (gridLv) {
        this.destoryGrids();
        this._row = gridLv;
        this._column = gridLv;
        this._size = (this.width - (gridLv + 1) * this._space) / gridLv;
        var diffArr = this.getDifTypeAndPos(gridLv);
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._column; j++) {
                var index = this._row * i + j + 1;
                var grid = void 0;
                if (index == diffArr[2]) {
                    grid = this.getGrid(index, diffArr[1], j, i);
                }
                else {
                    grid = this.getGrid(index, diffArr[0], j, i);
                }
                this._gridContainer.addChild(grid);
                grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gridTouchTapHandler, this);
            }
        }
    };
    GameView.prototype.getGridLv = function (lv) {
        if (lv > this._gridLvArr.length - 1) {
            return 9;
        }
        return this._gridLvArr[lv];
    };
    GameView.prototype.nextGirdLv = function () {
        this.createGrids(this.getGridLv(this._currentLv));
    };
    GameView.prototype.gridTouchTapHandler = function (evt) {
        if (evt.target._index == this._difPos) {
            this._currentLv++;
            this.nextGirdLv();
        }
        else {
            this.gameOver();
        }
    };
    /**
     * initialize grid pool
     */
    GameView.prototype.initGridPool = function () {
        this._gridPool = [];
        for (var i = 0; i < 81; i++) {
            var grid = new Grid();
            this._gridPool.push(grid);
        }
    };
    /**
     * game start
     */
    GameView.prototype.startGame = function () {
        try {
            this.removeChild(this._startBtn);
            this.removeChild(this._dollPic);
        }
        catch (e) { }
        this.addChild(this._gridContainer);
        this.createGrids(this.getGridLv(this._currentLv));
    };
    GameView.prototype.gameOver = function () {
        this.removeChild(this._gridContainer);
        this.addChild(this._restartBtn);
    };
    GameView.prototype.restartGame = function () {
        this.removeChild(this._restartBtn);
        this.startGame();
    };
    return GameView;
}(egret.DisplayObjectContainer));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map
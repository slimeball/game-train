/**
 * Created by sunzg on 14-7-31.
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this._gridLvArr = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9];
        this._gridTypeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        this._scoreLvDes = ["无药可救", "重度脸盲", "中度脸盲", "轻度脸盲", "顿足捶胸", "手疾眼快", "火眼金睛"];
        this._scoreLv = [21, 31, 41, 51, 56, 60];
        this._score = 0;
        this._totalTime = 30 * 1000;
        this._runTime = 0;
        this._currentLv = 0;
        this._zxh = new egret.Bitmap();
        this.__title = "测测你有脸盲症吗！";
        this.__desc = "你以为你躲起来就找不到你了吗，没有用的！";
        this.__iconLink = "http://egret-game.b0.upaiyun.com/icons/10000007.jpg";
        this._space = 13.5;
        this._row = 3;
        this._line = 3;
        this._shareView = new egret.Sprite();
        this._shareLabel = new egret.gui.Label();
        this._shareTip = new egret.Bitmap();
        this._shareTipLabel = new egret.gui.Label();
        //this.addEventListener("startGame",this.startGame,this);
        //this.addEventListener("restartGame",this.restartGame,this);
        //this.addEventListener("GridTouchTap",this.gridTouchTapHandler,this);
    }
    var d = __define,c=GameView,p=c.prototype;
    p.createGame = function (res) {
        var logo = new Logo("Powered by Egret FrameWork", 20, 0x000000);
        logo.x = 110;
        logo.y = 635;
        this.addChild(logo);
        var _self = this;
        RES.getResByUrl("resource/assets/fx1.png", function (data) {
            _self._shareImgtDown = data;
        }, this);
        RES.getResByUrl("resource/assets/fx2.png", function (data) {
            _self._shareImgtUp = data;
        }, this);
        RES.getResByUrl("resource/assets/shareTip.png", function (data) {
            this._shareTip.texture = data;
        }, this);
        ShareUtils.setShareInfo(this.__title, this.__desc, this.__iconLink);
        this._res = res;
        this._startBtn = new ImgBtn();
        this._startBtn.x = 85;
        this._startBtn.y = 385;
        this._startBtn.createBtn(this._res.getTexture("start1"), this._res.getTexture("start2"), this);
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.firstStartGame, this);
        this._zxh.texture = this._res.getTexture("zxh");
        this._restartBtn = new ImgBtn();
        this._restartBtn.createBtn(this._res.getTexture("restart1"), this._res.getTexture("restart2"), this);
        this._restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this._restartBtn.x = 85;
        this._restartBtn.y = 385;
        this._moreBtn = new ImgBtn();
        this._moreBtn.createBtn(this._res.getTexture("more1"), this._res.getTexture("more2"), this);
        this._moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.more, this);
        this._moreBtn.x = 85;
        this._moreBtn.y = 500;
        this._gameDesLable1 = new egret.gui.Label();
        this._gameDesLable1.text = "茫茫人海中";
        this._gameDesLable1.x = 175;
        this._gameDesLable1.y = 70;
        this._gameDesLable2 = new egret.gui.Label();
        this._gameDesLable2.text = "你的小伙伴在哪里？";
        this._gameDesLable2.x = 126;
        this._gameDesLable2.y = 120;
        this._lvDesLable = new egret.gui.Label();
        this._lvDesLable.text = "";
        this._lvDesLable.size = 30;
        this._lvDesLable.x = 20;
        this._lvDesLable.y = 320;
        this._scoreLaber = new egret.gui.Label();
        this._scoreLaber.text = "得分：" + this._score.toString();
        this._scoreLaber.x = 30;
        this._scoreLaber.y = 35;
        this._timeLabel = new egret.gui.Label();
        this._timeLabel.x = 220;
        this._timeLabel.y = 35;
        this._timeLabel.text = "60";
        this._gridContainer = new egret.Sprite();
        this._gridContainer.y = 140;
        this._gridContainer.x = 0;
        this._gridContainer.width = 480;
        this._gridContainer.height = 480;
        this._gridContainer.graphics.beginFill(0xffffff);
        this._gridContainer.graphics.drawRect(0, 0, this._gridContainer.width, this._gridContainer.height);
        this._gridContainer.graphics.endFill();
        this.initGameStartView();
        this.initGridPool();
    };
    p.initGameStartView = function () {
        this.addChild(this._gameDesLable1);
        this.addChild(this._gameDesLable2);
        this.addChild(this._startBtn);
        this.addChild(this._moreBtn);
        this._zxh.x = 195;
        this._zxh.y = 200;
        this.addChild(this._zxh);
    };
    p.initGridPool = function () {
        this._gridPool = [];
        for (var i = 0; i < 81; i++) {
            var grid = new Grid();
            this._gridPool.push(grid);
        }
    };
    p.firstStartGame = function (evt) {
        this.removeChild(this._gameDesLable1);
        this.removeChild(this._gameDesLable2);
        this.removeChild(this._startBtn);
        this.removeChild(this._zxh);
        this.removeChild(this._moreBtn);
        this.startGame();
    };
    p.startGame = function () {
        this.addChild(this._scoreLaber);
        this.addChild(this._timeLabel);
        this.addChild(this._gridContainer);
        this.createGrids(this.getGridLv(this._currentLv));
        egret.Ticker.getInstance().register(this.loop, this);
    };
    p.getGridLv = function (lv) {
        if (lv > this._gridLvArr.length - 1)
            return 9;
        return this._gridLvArr[lv];
    };
    p.createGrids = function (gridLv) {
        this.destroyGrids();
        this._row = gridLv;
        this._line = gridLv;
        this._size = (this.width - (gridLv + 1) * this._space) / gridLv;
        var difArr = this.getDifTypeAndPos(gridLv);
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._line; j++) {
                var index = this._row * i + j + 1;
                if (index == difArr[2]) {
                    var grid = this.getGrid(index, difArr[1], j, i, true);
                }
                else {
                    var grid = this.getGrid(index, difArr[0], j, i);
                }
                this._gridContainer.addChild(grid);
                grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gridTouchTapHandler, this);
            }
        }
    };
    p.destroyGrids = function () {
        while (this._gridContainer.numChildren) {
            this._gridPool.push(this._gridContainer.removeChildAt(0));
        }
    };
    p.gridTouchTapHandler = function (evt) {
        console.log(evt.target);
        if (evt.target._index == this._difPos) {
            this._currentLv++;
            this._score++;
            this._scoreLaber.text = "得分：" + this._score.toString();
            this.nextGirdLv();
        }
    };
    p.nextGirdLv = function () {
        this.createGrids(this.getGridLv(this._currentLv));
    };
    p.getDifTypeAndPos = function (lv) {
        var typelg = this._gridTypeArr.length;
        var type = Math.floor(Math.random() * typelg + 1);
        var diftype = Math.floor(Math.random() * typelg + 1);
        if (type == diftype)
            diftype = type == 1 ? 2 : type - 1;
        var pos = Math.floor(Math.random() * lv * lv + 1);
        this._difPos = pos;
        return [type, diftype, pos];
    };
    p.getGrid = function (index, type, posX, posY, b) {
        var grid = this._gridPool.shift();
        var dataName = type.toString();
        var data = this._res.getTexture(dataName);
        grid.width = this._size;
        grid.height = this._size;
        var scale = this._size / 142;
        //        if(b)scale=scale*1.2;
        grid.x = (posX + 1) * this._space + posX * this._size;
        grid.y = (posY + 1) * this._space + posY * this._size;
        grid._dispatcher = this;
        grid.reset(index, type, data, scale);
        return grid;
    };
    p.loop = function (spaceTime) {
        this._runTime = this._runTime + spaceTime;
        if (this._runTime > this._totalTime) {
            egret.Ticker.getInstance().unregister(this.loop, this);
            this.gameOver();
        }
        var tipTime = Math.floor((this._totalTime - this._runTime) / 1000);
        this._timeLabel.text = tipTime.toString();
    };
    p.gameOver = function () {
        this.getLvDesByScore(this._score);
        this.initGameOverView();
    };
    p.getLvDesByScore = function (score) {
        //        for(var i:number=0;i<this._scoreLv.length;i++){
        //            if(score<this._scoreLv[i]){
        //                this._lvDesLable.text=this._scoreLvDes[i];
        //                return;
        //            }
        //        }
        //        this._lvDesLable.text=this._scoreLvDes[6];
        this.__num = Math.floor(Math.random() * 7);
        this._lvDesLable.text = "我闯过了" + score + "关，被认定为" + this._scoreLvDes[this.__num];
    };
    p.initGameOverView = function () {
        this._shareGameBtn = new ImgBtn();
        this._shareGameBtn.createBtn(this._shareImgtUp, this._shareImgtDown, this);
        this._shareGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareGame, this);
        this._shareGameBtn.x = 85;
        this._shareGameBtn.y = 500;
        this.removeChild(this._timeLabel);
        this.removeChild(this._scoreLaber);
        this.removeChild(this._gridContainer);
        this._zxh.x = 195;
        this._zxh.y = 120;
        this.addChild(this._zxh);
        this.addChild(this._lvDesLable);
        this.addChild(this._restartBtn);
        this.addChild(this._shareGameBtn);
        this.__title = "测测你有脸盲症吗！";
        this.__desc = "我闯过了" + this._score + "关，被认定为" + this._scoreLvDes[this.__num] + "，不服来试试！";
        ShareUtils.setShareInfo(this.__title, this.__desc, this.__iconLink);
    };
    p.restartGame = function (evt) {
        if (this._shareView.parent)
            this.removeChild(this._shareView);
        this._runTime = 0;
        this._score = 0;
        this._currentLv = 0;
        this._scoreLaber.text = "得分：" + "0";
        this._timeLabel.text = "60";
        this.removeChild(this._lvDesLable);
        this.removeChild(this._zxh);
        this.removeChild(this._restartBtn);
        this.removeChild(this._shareGameBtn);
        this.startGame();
    };
    p.showShareView = function () {
        this._shareView.width = this.stage.stageWidth;
        this._shareView.height = this.stage.stageHeight;
        this._shareView.graphics.clear();
        this._shareView.graphics.beginFill(0x555555, 0.5);
        this._shareView.graphics.drawRect(0, 0, this._shareView.width, this._shareView.height);
        this._shareView.graphics.endFill();
        this._shareView.touchEnabled = true;
        this._shareTip.x = this._shareView.width - 150;
        this._shareTip.y = 0;
        this._shareView.addChild(this._shareTip);
        this._shareTipLabel.text = "分享到朋友圈";
        this._shareTipLabel.y = 60;
        this._shareTipLabel.x = 200;
        this._shareTipLabel.size = 25;
        this._shareView.addChild(this._shareTipLabel);
        this._shareView.addChild(this._lvDesLable);
        this.addChild(this._shareView);
        this.__title = "测测你有脸盲症吗！";
        this.__desc = "我闯过了" + this._score + "关，被认定为" + this._scoreLvDes[this.__num] + "，不服来试试！";
        ShareUtils.shareToWeChat();
        this._shareView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeShareView, this);
    };
    p.shareGame = function (evt) {
        if (ShareUtils.isInWeChat()) {
            this.showShareView();
        }
        else {
            ShareUtils.shareToU9();
        }
    };
    p.removeShareView = function (event) {
        if (this._shareView.parent)
            this.removeChild(this._shareView);
        this.addChild(this._lvDesLable);
    };
    p.more = function () {
        ShareUtils.moreGame();
    };
    return GameView;
}(egret.DisplayObjectContainer));
egret.registerClass(GameView,'GameView');

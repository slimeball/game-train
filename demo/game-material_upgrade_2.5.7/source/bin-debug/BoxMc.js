var BoxMc = (function (_super) {
    __extends(BoxMc, _super);
    function BoxMc() {
        _super.call(this);
        this._canTouch = false;
        this.init();
    }
    var d = __define,c=BoxMc,p=c.prototype;
    p.init = function () {
        this.touchEnabled = true;
        this.width = GameData.getBoxWidth();
        this.height = GameData.getBoxHeight();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
        this.width = GameData.getBoxWidth();
        this.height = GameData.getBoxHeight();
        this.graphics.beginFill(0xcccccc);
        this.graphics.lineStyle(1, 0);
        this.graphics.drawRect(0, 0, GameData.getBoxWidth(), GameData.getBoxHeight());
        this.graphics.endFill();
        var data = RES.getRes("mcdata_json");
        var tex = RES.getRes("mcdata_png");
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip();
        this.mc.y = 20;
        this.addChild(this.mc);
    };
    //绘制内容
    //参数表示当前方块是否可以备点击
    p.drawBox = function (canTouch) {
        if (canTouch === void 0) { canTouch = false; }
        this._canTouch = canTouch;
        if (canTouch) {
            this.mc.movieClipData = this.mcf.generateMovieClipData("mc2");
        }
        else {
            this.mc.movieClipData = this.mcf.generateMovieClipData("mc1");
        }
        this.mc.play(-1);
    };
    //当前方块被点击后的响应事件
    p.click = function (evt) {
        if (this._canTouch) {
            this.mc.movieClipData = this.mcf.generateMovieClipData("mc3");
            this.mc.play(-1);
        }
        var event;
        if (!this._canTouch) {
            event = new GameEvent(GameEvent.GAME_OVER);
        }
        else {
            event = new GameEvent(GameEvent.GAME_HIT);
        }
        this.dispatchEvent(event);
    };
    return BoxMc;
})(egret.Sprite);
egret.registerClass(BoxMc,'BoxMc');

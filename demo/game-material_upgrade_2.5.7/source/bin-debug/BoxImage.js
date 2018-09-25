var BoxImage = (function (_super) {
    __extends(BoxImage, _super);
    function BoxImage(texture) {
        if (texture === void 0) { texture = null; }
        _super.call(this, texture);
        this._canTouch = false;
        this.init();
    }
    var d = __define,c=BoxImage,p=c.prototype;
    p.init = function () {
        this.touchEnabled = true;
        this.width = GameData.getBoxWidth();
        this.height = GameData.getBoxHeight();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
        this.width = GameData.getBoxWidth();
        this.height = GameData.getBoxHeight();
    };
    //绘制内容
    //参数表示当前方块是否可以备点击
    p.drawBox = function (canTouch) {
        if (canTouch === void 0) { canTouch = false; }
        this._canTouch = canTouch;
        if (canTouch) {
            this.texture = RES.getRes("woman2");
        }
        else {
            this.texture = RES.getRes("woman1");
        }
    };
    //当前方块被点击后的响应事件
    p.click = function (evt) {
        if (this._canTouch) {
            this.texture = RES.getRes("woman3");
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
    return BoxImage;
})(egret.Bitmap);
egret.registerClass(BoxImage,'BoxImage');

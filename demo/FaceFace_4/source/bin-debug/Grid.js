/**
 * Created by sunzg on 14-7-31.
 */
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        _super.call(this);
        this._index = 0;
        this._type = 0;
        this._imgIco = new egret.Bitmap();
        this.touchEnabled = true;
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        this.addChild(this._imgIco);
    }
    var d = __define,c=Grid,p=c.prototype;
    p.touchTapHandler = function (evt) {
        this._dispatcher.dispatchEventWith("GridTouchTap", true);
    };
    p.reset = function (index, type, data, scale) {
        this._imgIco.texture = data;
        this._imgIco.scaleX = scale;
        this._imgIco.scaleY = scale;
        this._index = index;
        this._type = type;
    };
    return Grid;
}(egret.DisplayObjectContainer));
egret.registerClass(Grid,'Grid');

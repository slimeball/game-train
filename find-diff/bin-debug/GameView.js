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
        // ????
        _this._gridLvArr = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9];
        // ????
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
        return _this;
    }
    return GameView;
}(egret.DisplayObjectContainer));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map
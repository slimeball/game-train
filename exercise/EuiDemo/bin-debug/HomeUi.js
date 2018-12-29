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
var HomeUi = (function (_super) {
    __extends(HomeUi, _super);
    function HomeUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        _this.skinName = '/resource/custom_skins/HomeUi.exml';
        return _this;
    }
    HomeUi.prototype.handleUi = function () {
        var _this = this;
        var btnList = [this.btnPlayer, this.btnHeros, this.btnInventory, this.btnAbout];
        btnList.forEach(function (element) {
            element.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btnHanlder, _this);
        });
        this.imgBg.source = 'commonBg_jpg';
    };
    HomeUi.prototype.btnHanlder = function (evt) {
        console.log(evt.currentTarget.name);
        switch (true) {
            case true:
                break;
            case true:
                break;
        }
    };
    HomeUi.prototype.switchSence = function (senceName) {
        console.log(senceName);
    };
    return HomeUi;
}(eui.Component));
__reflect(HomeUi.prototype, "HomeUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HomeUi.js.map
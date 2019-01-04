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
        this.imgBg.source = 'homeBg_jpg';
    };
    HomeUi.prototype.backHome = function () {
        this._backCurrentPrev = this._currentPage = GamePages.HOME;
        this.imgBg.source = 'homeBg_jpg';
    };
    HomeUi.prototype.btnHanlder = function (evt) {
        this._backCurrentPrev = this._currentPage;
        // 匹配点击的按钮对象，切换页面并传递资源组名
        switch (evt.currentTarget) {
            case this.btnPlayer:
                this._currentPage = GamePages.PLAYER;
                break;
            case this.btnHeros:
                this._currentPage = GamePages.HEROS;
                break;
        }
        this.dispatchEventWith(GameEvent.EVT_LOAD_PAGE, false, this._currentPage);
    };
    HomeUi.prototype.switchSence = function (senceName) {
        var _this = this;
        switch (senceName) {
            case GamePages.PLAYER:
                if (!this._playerUI) {
                    this._playerUI = new playerUi;
                    this._playerUI.addEventListener(GameEvent.EVT_RETURN, function () {
                        if (_this._focusedUI.parent) {
                            _this._focusedUI.parent.removeChild(_this._focusedUI);
                        }
                        _this.backHome();
                    }, this);
                }
                this.imgBg.source = 'commonBg_jpg';
                this._focusedUI = this._playerUI;
                break;
        }
        this.addChildAt(this._focusedUI, this.getChildIndex(this.imgBg) + 1);
    };
    return HomeUi;
}(eui.Component));
__reflect(HomeUi.prototype, "HomeUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HomeUi.js.map
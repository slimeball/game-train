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
        // 添加eui事件，加载完成后执行的方法
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        // 指定皮肤为
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
    HomeUi.prototype.resetFocus = function () {
        if (this._focusedScene) {
            if (this._focusedScene.parent) {
                this._focusedScene.parent.removeChild(this._focusedScene);
            }
            this._focusedScene = null;
        }
        if (this._btnFocused != null) {
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
            this._btnFocused = null;
        }
    };
    HomeUi.prototype.btnHanlder = function (evt) {
        // 当前场景则不作处理
        if (evt.currentTarget == this._btnFocused) {
            return;
        }
        // 如果已有选择的，去掉焦点
        if (this._btnFocused) {
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
        }
        // 删掉上一个场景
        if (this._focusedScene && this._focusedScene.parent) {
            this._focusedScene.parent.removeChild(this._focusedScene);
        }
        this._btnFocused = evt.currentTarget;
        // 选中后禁用按钮，使用禁用按钮皮肤在皮肤里设置状态背景
        this._btnFocused.enabled = false;
        this._focusedScene = null;
        this._backCurrentPrev = this._currentPage;
        // 匹配点击的按钮对象，切换页面并传递资源组名
        switch (this._btnFocused) {
            case this.btnPlayer:
                this._currentPage = GamePages.PLAYER;
                break;
            case this.btnHeros:
                this._currentPage = GamePages.HEROS;
                break;
            case this.btnInventory:
                this._currentPage = GamePages.INVENTORY;
                break;
            case this.btnAbout:
                this._currentPage = GamePages.ABOUT;
        }
        this.dispatchEventWith(GameEvent.EVT_LOAD_PAGE, false, this._currentPage);
    };
    HomeUi.prototype.switchScene = function (sceneName) {
        var _this = this;
        switch (sceneName) {
            case GamePages.PLAYER:
                if (!this._playerUI) {
                    this._playerUI = new playerUi;
                    this._playerUI.addEventListener(GameEvent.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.backHome();
                    }, this);
                }
                this.imgBg.source = 'commonBg_jpg';
                this._focusedScene = this._playerUI;
                break;
            case GamePages.HEROS:
                if (!this._heroUI) {
                    this._heroUI = new herosUi;
                    this._heroUI.addEventListener(GameEvent.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.backHome();
                    }, this);
                }
                this.imgBg.source = 'commonBg_jpg';
                this._focusedScene = this._heroUI;
                break;
            case GamePages.INVENTORY:
                if (!this._inventoryUI) {
                    this._inventoryUI = new inventoryUi;
                    this._inventoryUI.addEventListener(GameEvent.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.backHome();
                    }, this);
                }
                this.imgBg.source = 'commonBg_jpg';
                this._focusedScene = this._inventoryUI;
                break;
            case GamePages.ABOUT:
                if (!this._aboutUi) {
                    this._aboutUi = new aboutUi;
                    this._aboutUi.addEventListener(GameEvent.EVT_CLOSE_ABOUT, function () {
                        _this.resetFocus();
                        switch (_this._backCurrentPrev) {
                            case GamePages.PLAYER:
                                _this.btnPlayer.selected = true;
                                _this.btnPlayer.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                            case GamePages.HEROS:
                                _this.btnHeros.selected = true;
                                _this.btnHeros.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                            case GamePages.INVENTORY:
                                _this.btnInventory.selected = true;
                                _this.btnInventory.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                        }
                    }, this);
                }
                this._focusedScene = this._aboutUi;
                break;
        }
        this.addChildAt(this._focusedScene, this.getChildIndex(this.imgBg) + 1);
    };
    return HomeUi;
}(eui.Component));
__reflect(HomeUi.prototype, "HomeUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HomeUi.js.map
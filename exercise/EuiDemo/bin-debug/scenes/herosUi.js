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
var herosUi = (function (_super) {
    __extends(herosUi, _super);
    function herosUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        _this.skinName = '/resource/custom_skins/herosUi.exml';
        return _this;
    }
    herosUi.prototype.handleUi = function () {
        var _this = this;
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvent.EVT_RETURN);
        }, this);
        var heroList = [
            { icon: "heros01_png", heroName: "伊文捷琳", comment: "评价：樱桃小丸子", checked: true },
            { icon: "heros02_png", heroName: "亚特伍德", comment: "评价：离了我你不行的", checked: false },
            { icon: "heros03_png", heroName: "伊妮德", comment: "评价：猴子请来的逗比", checked: false },
            { icon: "heros04_png", heroName: "鲁宾", comment: "评价：我勒个去", checked: false },
            { icon: "heros05_png", heroName: "威弗列德", comment: "评价：这货碉堡了", checked: false },
            { icon: "heros06_png", heroName: "史帝文", comment: "评价：咖啡不加糖", checked: false },
            { icon: "heros07_png", heroName: "哈瑞斯", comment: "评价：猪一样的队友", checked: false }
        ];
        this.listHeros.dataProvider = new eui.ArrayCollection(heroList);
        this.listHeros.itemRenderer = heroUiListSkin;
    };
    herosUi.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return herosUi;
}(eui.Component));
__reflect(herosUi.prototype, "herosUi", ["eui.UIComponent", "egret.DisplayObject"]);
var heroUiListSkin = (function (_super) {
    __extends(heroUiListSkin, _super);
    function heroUiListSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'HeroUiListSkin';
        return _this;
    }
    heroUiListSkin.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.cb.addEventListener(egret.Event.CHANGE, function () {
            _this.data.checked = _this.cb.selected;
        }, this);
    };
    return heroUiListSkin;
}(eui.ItemRenderer));
__reflect(heroUiListSkin.prototype, "heroUiListSkin");
//# sourceMappingURL=herosUi.js.map
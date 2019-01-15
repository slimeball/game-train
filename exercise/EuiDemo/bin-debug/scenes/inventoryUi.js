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
var inventoryUi = (function (_super) {
    __extends(inventoryUi, _super);
    function inventoryUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        return _this;
        // this.skinName = '/resource/custom_skins/inventoryUi.exml'
    }
    inventoryUi.prototype.handleUi = function () {
        var _this = this;
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvent.EVT_RETURN);
        }, this);
        var inventoryData = [
            { picture: "goods01_png", goodsName: "魔法石", property: "法力加成 +3" },
            { picture: "goods02_png", goodsName: "诅咒娃娃", property: "咒术加成 +3" },
            { picture: "goods03_png", goodsName: "万圣戒指", property: "敏捷加成 +3" },
            { picture: "goods04_png", goodsName: "斗篷", property: "耐力加成 +3" },
            { picture: "goods05_png", goodsName: "鹅毛笔", property: "精神加成 +3" },
            { picture: "goods06_png", goodsName: "血滴子", property: "嗜血加成 +3" },
            { picture: "goods07_png", goodsName: "屠龙刀", property: "力量加成 +5" }
        ];
        this.inventoryList.dataProvider = new eui.ArrayCollection(inventoryData);
        this.inventoryList.itemRenderer = inventoryListSkin;
    };
    inventoryUi.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return inventoryUi;
}(eui.Component));
__reflect(inventoryUi.prototype, "inventoryUi", ["eui.UIComponent", "egret.DisplayObject"]);
var inventoryListSkin = (function (_super) {
    __extends(inventoryListSkin, _super);
    function inventoryListSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'inventoryUiListSkin';
        return _this;
    }
    inventoryListSkin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return inventoryListSkin;
}(eui.ItemRenderer));
__reflect(inventoryListSkin.prototype, "inventoryListSkin");
//# sourceMappingURL=inventoryUi.js.map
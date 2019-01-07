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
var playerUi = (function (_super) {
    __extends(playerUi, _super);
    function playerUi() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.handleUi, _this);
        _this.skinName = '/resource/custom_skins/playerUi.exml';
        return _this;
    }
    playerUi.prototype.handleUi = function () {
        var _this = this;
        console.log(1);
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvent.EVT_RETURN);
        }, this);
        var skillList = [
            { icon: "skillIcon01_png", name: "旋龙幻杀" },
            { icon: "skillIcon02_png", name: "魔魂天咒" },
            { icon: "skillIcon03_png", name: "天魔舞" },
            { icon: "skillIcon04_png", name: "痴情咒" },
            { icon: "skillIcon05_png", name: "无间寂" },
            { icon: "skillIcon06_png", name: "霸天戮杀" },
            { icon: "skillIcon07_png", name: "灭魂狂飙" }
        ];
        this.listSkin.itemRendererSkinName = 'equipSkin';
        this.listSkin.dataProvider = new eui.ArrayCollection(skillList);
    };
    playerUi.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.scrListSkills.horizontalScrollBar = null;
    };
    return playerUi;
}(eui.Component));
__reflect(playerUi.prototype, "playerUi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=playerUi.js.map
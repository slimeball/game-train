var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 游戏页名称，与资源组名称一致
var GamePages = (function () {
    function GamePages() {
    }
    GamePages.HOME = 'home';
    GamePages.PLAYER = 'player';
    GamePages.HEROS = 'heros';
    GamePages.INVENTORY = 'inventory';
    GamePages.ABOUT = 'about';
    return GamePages;
}());
__reflect(GamePages.prototype, "GamePages");
//# sourceMappingURL=GamePages.js.map
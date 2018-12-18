var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageConfig = (function () {
    function PageConfig() {
    }
    PageConfig.HOME = 'home';
    PageConfig.PFILE = 'pfile';
    PageConfig.HEROS = 'heros';
    PageConfig.INVENTORY = 'inventory';
    PageConfig.ABOUT = 'about';
    return PageConfig;
}());
__reflect(PageConfig.prototype, "PageConfig");
//# sourceMappingURL=PageConfig.js.map
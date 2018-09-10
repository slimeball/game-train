/**
 * Created by sunzg on 14-8-1.
 */
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(txt, size, color) {
        _super.call(this);
        var logo = new egret.gui.Label();
        logo.text = txt;
        logo.size = size;
        logo.textColor = color;
        this.addChild(logo);
    }
    var d = __define,c=Logo,p=c.prototype;
    return Logo;
}(egret.Sprite));
egret.registerClass(Logo,'Logo');

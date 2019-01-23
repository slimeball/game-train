var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvent = (function () {
    function GameEvent() {
    }
    GameEvent.EVT_RETURN = "EVT_RETURN";
    GameEvent.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    GameEvent.EVT_CLOSE_ABOUT = "EVT_CLOSE_ABOUT";
    return GameEvent;
}());
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map
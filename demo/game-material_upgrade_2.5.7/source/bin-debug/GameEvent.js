var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GameEvent,p=c.prototype;
    GameEvent.GAME_OVER = "game_over_event";
    GameEvent.GAME_HIT = "game_hit_event";
    GameEvent.GAME_START = "game_start_event";
    return GameEvent;
})(egret.Event);
egret.registerClass(GameEvent,'GameEvent');

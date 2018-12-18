var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        GameData.row = GameData.getStageWidth() / GameData.getBlockWidth();
    }
    GameData.getScore = function () {
        return GameData.score;
    };
    GameData.getBlockWidth = function () {
        if (GameData.blockWidth === 0) {
            GameData.blockWidth = egret.MainContext.instance.stage.stageWidth / GameData.column;
        }
        return GameData.blockWidth;
    };
    GameData.getBlockHeight = function () {
        if (GameData.blockHeight === 0) {
            GameData.blockHeight = egret.MainContext.instance.stage.stageHeight / GameData.row;
        }
        return GameData.blockHeight;
    };
    GameData.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    GameData.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    GameData.score = 0;
    GameData.row = 5;
    GameData.column = 4;
    GameData.speed = 10;
    GameData.blockWidth = 0;
    GameData.blockHeight = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map
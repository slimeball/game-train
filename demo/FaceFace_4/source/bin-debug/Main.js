/**
 * Created by sunzg on 14-7-31.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        //window["EgretRuntimeBridgeInit"]();
        ShareUtils.onEnterGame();
    }
    var d = __define,c=Main,p=c.prototype;
    p.addToStage = function (evt) {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.stage.removeChild(this.loadingView);
            this.createGameScene();
        }
    };
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.createGameScene = function () {
        console.log(RES.getRes("sprites_json"));
        this._res = RES.getRes("sprites_json");
        var bitmap = new egret.Bitmap();
        bitmap.texture = this._res.getTexture("bg");
        this.addChild(bitmap);
        this.initGame();
    };
    p.initGame = function () {
        this._gameView = new GameView();
        this._gameView._res = this._res;
        this._gameView.width = this.stage.stageWidth;
        this._gameView.height = this.stage.stageHeight;
        this._gameView.createGame(this._res);
        this.addChild(this._gameView);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');

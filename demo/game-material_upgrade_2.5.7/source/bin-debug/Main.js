var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    /*
        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.init();
        }
        */
    p.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configcomplete, this);
    };
    p.configcomplete = function (evt) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configcomplete, this);
        RES.loadGroup("res");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.rescomplete, this);
    };
    p.rescomplete = function (evt) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.rescomplete, this);
        this.init();
    };
    p.init = function () {
        this.gv = new GameView();
        this.addChild(this.gv);
        this.gv.addEventListener(GameEvent.GAME_OVER, this.gameover, this);
        this.timer = new egret.Timer(20, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timers, this);
        this.gameoverPanel = new GameOverPanel();
        this.gameoverPanel.addEventListener(GameEvent.GAME_START, this.startgame, this);
        this.startgamePanel = new StartGamePanel();
        this.startgamePanel.addEventListener(GameEvent.GAME_START, this.startgame, this);
        this.addChild(this.startgamePanel);
    };
    p.timers = function () {
        this.gv.move();
    };
    p.gameover = function (evt) {
        this.timer.stop();
        this.gameoverPanel.update();
        this.addChild(this.gameoverPanel);
    };
    p.startgame = function (evt) {
        GameData.speed = 10;
        GameData.setScore(0);
        this.gv.startgame();
        if (this.startgamePanel.parent) {
            this.removeChild(this.startgamePanel);
        }
        if (this.gameoverPanel.parent) {
            this.removeChild(this.gameoverPanel);
        }
        this.timer.start();
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,'Main');

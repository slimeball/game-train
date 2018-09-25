class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

/*
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }
    */



    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configcomplete,this);
    }
    private configcomplete(evt:RES.ResourceEvent)
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configcomplete,this);
        RES.loadGroup("res");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.rescomplete,this);
    }

    private scoreText:egret.BitmapText;
    private rescomplete(evt:RES.ResourceEvent)
    {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.rescomplete,this);

        this.init();
    }


    private gv:GameView ;
    private timer:egret.Timer;
    private gameoverPanel:GameOverPanel;
    private startgamePanel:StartGamePanel;

    private init():void
    {
        this.gv = new GameView();
        this.addChild(this.gv);
        this.gv.addEventListener(GameEvent.GAME_OVER, this.gameover,this);
        this.timer = new egret.Timer(20,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timers, this);

        this.gameoverPanel = new GameOverPanel();
        this.gameoverPanel.addEventListener(GameEvent.GAME_START,this.startgame,this);

        this.startgamePanel = new StartGamePanel();
        this.startgamePanel.addEventListener(GameEvent.GAME_START, this.startgame, this);
        this.addChild(this.startgamePanel);
    }

    private timers()
    {
        this.gv.move();
    }

    private gameover(evt:GameEvent):void
    {
        this.timer.stop();
        this.gameoverPanel.update();
        this.addChild(this.gameoverPanel);
    }

    private startgame(evt:GameEvent):void
    {
        GameData.speed = 10;
        GameData.setScore(0);
        this.gv.startgame();
        if(this.startgamePanel.parent)
        {
            this.removeChild(this.startgamePanel);
        }
        if(this.gameoverPanel.parent)
        {
            this.removeChild(this.gameoverPanel);
        }
        this.timer.start();
    }
}



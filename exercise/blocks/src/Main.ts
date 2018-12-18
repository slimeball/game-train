class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        this.loadResource();
        this.init();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    private gv:GameView;
    private gameStart:StartGamePanel;
    private init(): void {
        this.gv = new GameView();
        this.addChild(this.gv);
        this.gameStart = new StartGamePanel();
        this.gameStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gamebegin , this);
        this.addChild(this.gameStart);
        // let a = new BlockGroup();
        // this.addChild(a);
        // a.createOne()
    }

    private gamebegin(): void{
        this.gv.gamestart();
        this.removeChild(this.gameStart);
    }
}
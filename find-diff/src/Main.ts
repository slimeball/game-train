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

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json");
        await platform.login();
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

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */

    private _gameView: GameView;
    public _res: egret.SpriteSheet;

    private createGameScene() {
        this._res = RES.getRes('Sprites_json');
        let bitmap: egret.Bitmap = new egret.Bitmap();
        bitmap.texture = this._res.getTexture('bg');
        bitmap.width = this.stage.stageWidth;
        bitmap.height = this.stage.stageHeight;
        this.addChild(bitmap);
        this.initGame();
    }


    private initGame(): void {
        this._gameView = new GameView();
        this._gameView._res = this._res;
        this._gameView.width = this.stage.stageWidth;
        this._gameView.height = this.stage.stageHeight;
        this._gameView.createGame(this._res);
        this.addChild(this._gameView);
    }
}
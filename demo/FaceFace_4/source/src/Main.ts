/**
 * Created by sunzg on 14-7-31.
 */
class Main extends egret.DisplayObjectContainer{

    private loadingView:LoadingUI;
    public _res:egret.SpriteSheet;
    public _gameView:GameView;

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        //window["EgretRuntimeBridgeInit"]();
        ShareUtils.onEnterGame();
    }

    public addToStage(evt:egret.Event){
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.stage.removeChild(this.loadingView);
            this.createGameScene();
        }
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private createGameScene():void{
        console.log(RES.getRes("sprites_json"));
        this._res=RES.getRes("sprites_json");
        var bitmap:egret.Bitmap=new egret.Bitmap();

        bitmap.texture=this._res.getTexture("bg");
        this.addChild(bitmap);
        this.initGame();
    }

    public initGame(){
        this._gameView=new GameView();
        this._gameView._res=this._res;
        this._gameView.width=this.stage.stageWidth;
        this._gameView.height=this.stage.stageHeight;
        this._gameView.createGame(this._res);
        this.addChild(this._gameView);
    }
}

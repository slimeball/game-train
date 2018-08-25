class Main extends egret.DisplayObjectContainer {
  private loadingView: LoadingUI;
  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }
  private onAddToStage() {
    this.loadingView = new LoadingUI();
    this.stage.addChild(this.loadingView);
    RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    RES.loadConfig('resource/default.res.json', 'resource/');
  }
  private onConfigComplete(event: RES.ResourceEvent): void {
    RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    RES.loadGroup("preload");
  }
  private onResourceLoadComplete(event: RES.ResourceEvent): void {
    if (event.groupName === 'preload') {
      this.stage.removeChild(this.loadingView);
      RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
      RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
      let GameContainer: fighter.GameContainer = new fighter.GameContainer();

      this.addChild(GameContainer);
    }
  }
  private onResourceProgress(event: RES.ResourceEvent): void {
    if (event.groupName === 'onProgress') {
      this.loadingView.onProgress(event.itemsLoaded, event.itemsTotal);
    }
  }
}
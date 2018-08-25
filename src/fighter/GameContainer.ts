namespace fighter {
  export class GameContainer extends egret.DisplayObjectContainer {
    private startBtn: egret.Bitmap;
    private stageW: number;
    private stageH: number;
    private bg: fighter.BgMap;
    private playeFighter: fighter.Airplane;
    public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.createGameScene();
    }

    private createGameScene() {
      // background
      this.bg = new fighter.BgMap();
      this.addChild(this.bg);
      this.bg.start();
      // start button
      this.stageW = this.stage.stageWidth;
      this.stageH = this.stage.stageHeight;
      this.startBtn = fighter.createBitmapByName('btn_start_png');
      this.startBtn.x = (this.stageW - this.startBtn.width) / 2;
      this.startBtn.y = (this.stageH - this.startBtn.height) / 2;
      this.startBtn.touchEnabled = true;
      this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
      // touch down start button
      this.addChild(this.startBtn);
      // add fighter to stage
      this.playeFighter = new fighter.Airplane();
      this.playeFighter.y = this.stageH - this.playeFighter.height - 50;
      this.playeFighter.x = (this.stageW / 2) - (this.playeFighter.width / 2);
      this.addChild(this.playeFighter);
    }

    private gameStart(): void {
      this.removeChild(this.startBtn);
      this.touchEnabled=true;
      this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
    }

    public touchHandler(evt: egret.TouchEvent): void {
      if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
        this.playeFighter.x =evt.localX;
      }
    }
  }
}
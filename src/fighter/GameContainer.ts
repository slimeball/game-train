namespace fighter {
  export class GameContainer extends egret.DisplayObjectContainer {
    private startBtn: egret.Bitmap;
    private stageW: number;
    private stageH: number;
    private bg: fighter.BgMap;
    private playerFighter: fighter.Aircraft;
    private myBullet: fighter.Bullet[] = [];
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
      this.playerFighter = new fighter.Aircraft(RES.getRes('f1_png'), 100);
      this.playerFighter.y = this.stageH - this.playerFighter.height - 50;
      this.playerFighter.x = (this.stageW / 2) - (this.playerFighter.width / 2);
      this.addChild(this.playerFighter);
    }

    private gameStart(): void {
      this.removeChild(this.startBtn);
      this.touchEnabled = true;
      this.addEventListener(egret.Event.ENTER_FRAME, this.updateView, this);
      this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
      this.playerFighter.fire();
      this.addEventListener('createBullet', this.bulletHandler, this);
    }

    public touchHandler(evt: egret.TouchEvent): void {
      if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
        this.playerFighter.x = evt.localX - this.playerFighter.width;
      }
    }
    public bulletHandler(evt: egret.Event): void {
      let bullet: fighter.Bullet;
      if (evt.target == this.playerFighter) {
        for (let i: number = 0; i < 2; i++) {
          bullet = fighter.Bullet.produceBullet('b1_png');
          bullet.x = this.playerFighter.x;
          bullet.y = this.playerFighter.y + this.playerFighter.height;
        }
      }
    }

    public updateView(evt: egret.Event): void {
      let bullet: fighter.Bullet;
      let bulletLen:number = this.myBullet.length;
      for (let i = 0; i < bulletLen; i++) {
        bullet = this.myBullet[i];
        bullet.y -= this.myBullet[i].height;
      }
    }
  }
}
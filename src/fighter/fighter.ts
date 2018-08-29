namespace fighter {
  export class Aircraft extends egret.DisplayObjectContainer {
    private static cacheDirt: Object = {};

    private bmp: egret.Bitmap;
    private fireDelay: number;
    private fireTimer: egret.Timer;
    private blood: number = 10;

    public constructor(texture: egret.Texture, fireDelay: number) {
      super();
      this.fireDelay = fireDelay;
      this.bmp = fighter.createBitmapByName('f1_png')
      this.addChild(this.bmp);
      this.fireTimer = new egret.Timer(fireDelay);
      this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }
    public static produceAircraft(textureName: string, fireDelay: number): any {
      if (fighter.Aircraft.cacheDirt[textureName] == null) {
        fighter.Aircraft.cacheDirt[textureName] = [];
        let dict: fighter.Aircraft[] = fighter.Aircraft.cacheDirt[textureName];
        let theFighter: fighter.Aircraft;
        if (dict.length > 0) {
          theFighter = dict.pop();
        } else {
          theFighter = new fighter.Aircraft(RES.getRes(textureName), fireDelay);
        }
        theFighter.blood = 10;
        return theFighter;
      }
    }
    public static reclaimAircraft(theFighter: fighter.Aircraft, textureName: string) {
      if (fighter.Aircraft.cacheDirt[textureName] == null) {
        fighter.Aircraft.cacheDirt[textureName] = [];
        let dict: fighter.Aircraft[] = fighter.Aircraft.cacheDirt[textureName];
        if (dict.indexOf(theFighter) == -1) {
          dict.push(theFighter);
        }
      }
    }
    public fire(): void {
      this.fireTimer.start();
    }
    public stopFire(): void {
      this.fireTimer.stop();
    }
    private createBullet(evt: egret.TimerEvent): void {
      this.dispatchEventWith("createBullet");
    }
  }
}

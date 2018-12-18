namespace fighter {
  export class Airplane extends egret.DisplayObjectContainer {
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
    public static produce(textureName: string, fireDelay: number): any {
      if (fighter.Airplane.cacheDirt[textureName] == null) {
        fighter.Airplane.cacheDirt[textureName] = [];
        let dict: fighter.Airplane[] = fighter.Airplane.cacheDirt[textureName];
        let theFighter: fighter.Airplane;
        if (dict.length > 0) {
          theFighter = dict.pop();
        } else {
          theFighter = new fighter.Airplane(RES.getRes(textureName), fireDelay);
        }
        theFighter.blood = 10;
        return theFighter;
      }
    }
    public static reclaim(theFighter: fighter.Airplane, textureName: string) {
      if (fighter.Airplane.cacheDirt[textureName] == null) {
        fighter.Airplane.cacheDirt[textureName] = [];
        let dict: fighter.Airplane[] = fighter.Airplane.cacheDirt[textureName];
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

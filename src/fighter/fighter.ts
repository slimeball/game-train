namespace fighter {
  export class Airplane extends egret.DisplayObjectContainer {
    private bmp: egret.Bitmap;

    public constructor() {
      super();
      this.bmp = fighter.createBitmapByName('f1_png')
      this.addChild(this.bmp);
    }
  }
}

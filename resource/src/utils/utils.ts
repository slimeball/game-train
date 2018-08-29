namespace fighter {
  export class Utils {
    // public createBitmapByName(name: string): egret.Bitmap {
    //   let result: egret.Bitmap = new egret.Bitmap();
    //   let texture: egret.Texture = RES.getRes(name);
    //   result.texture = texture;
    //   return result;
    // }
  }
  export function createBitmapByName(name: string): egret.Bitmap {
    let result: egret.Bitmap = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);  
    result.texture = texture;
    return result;
  }
}
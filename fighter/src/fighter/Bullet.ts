namespace fighter {
	/**
	 * bullet 
	 * method
	 */
	export class Bullet extends egret.Bitmap {
		public textureName: string;
		private static cacheDict: Object = {}
		public static produceBullet(textureName: string): any {
			if (fighter.Bullet.cacheDict[textureName] == null) {
				fighter.Bullet.cacheDict[textureName] = [];
			}
			let dict: fighter.Bullet[] = fighter.Bullet.cacheDict[textureName];
			let bullet: fighter.Bullet;
			if (dict.length > 0) {
				bullet = dict.pop();
			} else {
				bullet = new fighter.Bullet(RES.getRes(textureName), textureName);
			}
			return bullet;
		}

		public static reclaimBullet (bullet:fighter.Bullet): void {
			let textureName: string = bullet.textureName;
			if(fighter.Bullet.cacheDict[textureName] == null){
				fighter.Bullet.cacheDict[textureName] = [];
			}
			let dict:fighter.Bullet[] = fighter.Bullet.cacheDict[textureName];
			if(dict.indexOf(bullet) == -1){
				dict.push(bullet);
			}
		}

		public constructor(texture: egret.Texture, textureName: string) {
			super(texture);
			this.textureName = textureName;
		}
	}
}
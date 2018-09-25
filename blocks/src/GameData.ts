class GameData {
	private static score: number = 0;
	public static row: number = 5;
	public static column: number = 4;
	public static speed: number = 10;
	private static blockWidth: number = 0;
	private static blockHeight: number = 0;
	constructor(){
		GameData.row = GameData.getStageWidth()/GameData.getBlockWidth();
	}
	public static getScore(): number {
		return GameData.score;
	}

	public static getBlockWidth(): number {
		if (GameData.blockWidth === 0) {
			GameData.blockWidth = egret.MainContext.instance.stage.stageWidth / GameData.column;
		}
		return GameData.blockWidth;
	}

	public static getBlockHeight(): number {
		if (GameData.blockHeight === 0) {
			GameData.blockHeight = egret.MainContext.instance.stage.stageHeight / GameData.row;
		}
		return GameData.blockHeight;
	}

	public static getStageWidth(): number {
		return egret.MainContext.instance.stage.stageWidth;
	}

	public static getStageHeight(): number {
		return egret.MainContext.instance.stage.stageHeight;
	}
}
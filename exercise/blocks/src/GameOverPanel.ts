class GameOverPanel extends egret.Sprite {
	public constructor() {
		super();
		this.init();
	}

	private _bg: egret.Shape;
	private _score: egret.TextField;
	private _tryagainBtn: egret.TextField;

	private init(): void {
		this._bg = new egret.Shape();
		this._bg.graphics.beginFill(0);
		this._bg.graphics.drawRect(0, 0, GameData.getStageWidth(), GameData.getStageHeight());
		this._bg.graphics.endFill();
		this.addChild(this._bg);
	}
}
class GameView extends egret.DisplayObjectContainer {

	public constructor() {
		super();
		this.init();
	}

	private _blockGroup: Array<BlockGroup>;

	private init(): void {
		this._blockGroup = [];
		let len: number = GameData.row + 1;
		for (let i: number = 0; i < len; i++) {
			let boxg: BlockGroup = new BlockGroup();
			this._blockGroup.push(boxg);
			this.addChild(boxg);
			boxg.addEventListener(GameEvent.GAME_OVER, this.gameOver, this);
			boxg.addEventListener(GameEvent.GAME_HIT, this.gamehit, this);
		}
	}
	public gamestart(): void {
		let len: number = GameData.row + 1;
		for (let i: number = 0; i < len; i++) {
			this._blockGroup[i].createOne();
			this._blockGroup[i].y = GameData.getBlockHeight() * i;
		}
	}

	public move() {
		let len: number = GameData.row + 1;
		for (let i:number = 0; i < len; i++) {
			this._blockGroup[i].y += GameData.getBlockHeight();
			if (this._blockGroup[i].y >= GameData.getStageHeight()) {
				if (i === 0) {
					this._blockGroup[i].y = 0;
				}
				this._blockGroup[i].createOne();
			}
		}
	}

	private gameOver(evt: GameEvent = null): void {
		var event: GameEvent = new GameEvent(GameEvent.GAME_OVER);
		this.dispatchEvent(event);
	}

	private gamehit(evt: GameEvent): void {
		this.move();
		// GameData.setScore(GameData.getScore() + 1);
		// this.scoreText.text = String(GameData.getScore());
	}

}
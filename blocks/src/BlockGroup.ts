class BlockGroup extends egret.Sprite {
	public constructor() {
		super();
		this.init();
	}

	private _boxArr: Array<BlockGraphics>;

	private init(): void {
		this._boxArr = [];
		for (let i: number = 0; i < GameData.column; i++) {
			let box: BlockGraphics = new BlockGraphics();
			this._boxArr.push(box);
			box.addEventListener(GameEvent.GAME_HIT, this.gameHit, this);
			box.addEventListener(GameEvent.GAME_OVER, this.gameOver, this);
			this.addChild(box);
			box.x = GameData.getBlockWidth() * i;
		}
	}

	private _isTouch = false;
	public createOne(): void {
		this._isTouch = false;
		let touchIndex: number = Math.floor(Math.random() * 4);
		let len: number = this._boxArr.length;
		for (let i: number = 0; i < len; i++) {
			if(i === touchIndex) {
				this._boxArr[i].drawBlock(true);
			} else {
				this._boxArr[i].drawBlock(false);
			}
		}
	}

	private gameHit (evt: GameEvent):void {
		if(!this._isTouch){
			this._isTouch = true;
			let evtObj = new GameEvent(GameEvent.GAME_HIT);
			this.dispatchEvent(evtObj);
		}
	}

	private gameOver (evt: GameEvent):void {
		let evtObj = new GameEvent(GameEvent.GAME_OVER);
		this.dispatchEvent(evtObj);
	}
}
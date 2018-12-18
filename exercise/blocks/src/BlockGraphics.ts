class BlockGraphics extends egret.Shape {
	private colorArr: Array<any> = ['0x000000', '0xffffff', '0xcccccc', '0xff0000'];
	public constructor() {
		super();
		this.init();
	}

	private init() {
		this.touchEnabled = true;
		this.width = GameData.getBlockWidth();
		this.height = GameData.getBlockHeight();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.blockClick, this);
	}

	private _canTouch: boolean = false;

	public drawBlock(canTouch: boolean = false) {
		this._canTouch = canTouch;
		this.graphics.clear();
		if (canTouch) {
			this.graphics.beginFill(this.colorArr[0]);
		} else {
			this.graphics.beginFill(this.colorArr[1]);
		}
		this.graphics.lineStyle(1, 0);
		this.graphics.drawRect(0, 0, GameData.getBlockWidth(), GameData.getBlockHeight());
		this.graphics.endFill();
	}

	private blockClick(evt: egret.TouchEvent): void {
		this.graphics.clear();
		if(this._canTouch) {
			this.graphics.beginFill(this.colorArr[2]);
		} else {
			this.graphics.beginFill(this.colorArr[3]);
		}
		this.graphics.lineStyle(1, 0);
		this.graphics.drawRect(0,0,GameData.getBlockWidth(),GameData.getBlockHeight());
		this.graphics.endFill();
		let evtObj: GameEvent;
		if(this._canTouch){
			evtObj = new GameEvent(GameEvent.GAME_HIT);
		} else {
			evtObj = new GameEvent(GameEvent.GAME_OVER);
		}
		this.dispatchEvent(evtObj);
	}
}
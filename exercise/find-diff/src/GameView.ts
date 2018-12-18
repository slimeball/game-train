class GameView extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}
	// layout count
	public _gridLvArr: Array<number> = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9];
	//  face index mark
	public _gridTypeArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	// visible result text
	public _scoreLvDes: string[] = ["无药可救", "重度脸盲", "中度脸盲", "轻度脸盲", "顿足捶胸", "手疾眼快", "火眼金睛"];
	// ????
	public _scoreLv: Array<number> = [21, 31, 41, 51, 56, 60];
	// resource object
	public _res: egret.SpriteSheet;
	// start button
	public _startBtn;
	// restart button
	private _restartBtn;
	// doll pic
	public _dollPic: egret.Bitmap;
	// ???
	public _scoreLaber;
	// total time mark
	public _totalTime: number = 30 * 1000;
	// ???
	public _runTime: number = 0;
	// ???
	public _timeLabel;
	// current level
	public _currentLv: number = 0;
	// grid container
	public _gridContainer: egret.Sprite;
	// grid pool
	public _gridPool: Array<Grid>;

	public createGame(res: egret.SpriteSheet) {
		this._res = res;
		// init start button
		this._startBtn = new ImgBtn();
		this._startBtn.createBtn(this._res.getTexture('start1'), this._res.getTexture('start2'));
		this.addChild(this._startBtn);
		this._startBtn.x = (egret.MainContext.instance.stage.stageWidth - this._startBtn.width) / 2;
		this._startBtn.y = (egret.MainContext.instance.stage.stageHeight - this._startBtn.height) / 2;
		this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
		// init restart button
		this._restartBtn = new ImgBtn();
		this._restartBtn.createBtn(this._res.getTexture("restart1"), this._res.getTexture("restart2"), this);
		this._restartBtn.x = (egret.MainContext.instance.stage.stageWidth - this._restartBtn.width) / 2;
		this._restartBtn.y = (egret.MainContext.instance.stage.stageHeight - this._restartBtn.height) / 2;
		this._restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
		// init first page doll
		this._dollPic = new egret.Bitmap();
		this._dollPic.texture = this._res.getTexture('zxh');
		this.addChild(this._dollPic);
		this._dollPic.x = (egret.MainContext.instance.stage.stageWidth - this._dollPic.width) / 2;
		this._dollPic.y = (egret.MainContext.instance.stage.stageHeight - this._dollPic.height) / 3;
		// this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
		// init grid container
		this._gridContainer = new egret.Sprite();
		this._gridContainer.width = egret.MainContext.instance.stage.stageWidth;
		this._gridContainer.height = this._gridContainer.width;
		this._gridContainer.y = this._gridContainer.width / 3;
		this._gridContainer.x = 0;
		this._gridContainer.graphics.beginFill(0xffffff);
		this._gridContainer.graphics.drawRect(0, 0, this._gridContainer.width, this._gridContainer.height);
		this._gridContainer.graphics.endFill();

		this.initGridPool();
	}

	private destoryGrids() {
		while (this._gridContainer.numChildren) {
			this._gridPool.push(<Grid>this._gridContainer.removeChildAt(0));
		}
	}

	private getGrid(index: number, type: number, posX: number, posY: number): any {
		let grid: Grid = this._gridPool.shift();
		let dataName: string = type.toString();
		let data: egret.Texture = this._res.getTexture(dataName);
		grid.width = this._size;
		grid.height = this._size;
		var scale: number = this._size / 142;
		grid.x = (posX + 1) * this._space + posX * this._size;
		grid.y = (posY + 1) * this._space + posY * this._size;
		grid._dispatcher = this;
		grid.reset(index, type, data, scale);
		return grid;
	}
	/**
	 * according level randomly get current type of face, another face and * position
	 */
	private getDifTypeAndPos(lv: number) {
		let typelen: number = this._gridTypeArr.length;
		let type: number = Math.floor(Math.random() * typelen + 1);
		let anotherType: number = Math.floor(Math.random() * typelen + 1);
		if (type == anotherType) {
			anotherType = type == 1 ? 2 : type - 1;
		}
		let pos: number = Math.floor(Math.random() * lv * lv + 1);
		this._difPos = pos;
		return [type, anotherType, pos];
	}

	private _space: number = 13.5;
	private _row: number = 3;
	private _column: number = 3;
	private _size: number;
	// another face position
	private _difPos: number;
	private createGrids(gridLv: number): void {
		this.destoryGrids();
		this._row = gridLv;
		this._column = gridLv;
		this._size = (this.width - (gridLv + 1) * this._space) / gridLv;
		let diffArr: Array<any> = this.getDifTypeAndPos(gridLv);
		for (let i: number = 0; i < this._row; i++) {
			for (let j: number = 0; j < this._column; j++) {
				let index = this._row * i + j + 1;
				let grid: Grid;
				if (index == diffArr[2]) {
					grid = this.getGrid(index, diffArr[1], j, i);
				} else {
					grid = this.getGrid(index, diffArr[0], j, i);
				}
				this._gridContainer.addChild(grid);
				grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gridTouchTapHandler, this);
			}
		}
	}

	private getGridLv(lv: number): any {
		if (lv > this._gridLvArr.length - 1) {
			return 9;
		}
		return this._gridLvArr[lv];
	}

	private nextGirdLv(): void {
		this.createGrids(this.getGridLv(this._currentLv));
	}

	private gridTouchTapHandler(evt: egret.TouchEvent): void {
		if (evt.target._index == this._difPos) {
			this._currentLv++;
			this.nextGirdLv();
		} else {
			this.gameOver();
		}
	}

	/**
	 * initialize grid pool
	 */
	private initGridPool() {
		this._gridPool = [];
		for (let i: number = 0; i < 81; i++) {
			let grid: Grid = new Grid();
			this._gridPool.push(grid);
		}
	}
	/**
	 * game start
	 */
	public startGame(): void {
		try {
			this.removeChild(this._startBtn);
			this.removeChild(this._dollPic);
		} catch (e) { }
		this.addChild(this._gridContainer);
		this.createGrids(this.getGridLv(this._currentLv));
	}

	private gameOver(): void {
		this.removeChild(this._gridContainer);
		this.addChild(this._restartBtn);
	}
	private restartGame(): void {
		this.removeChild(this._restartBtn);
		this.startGame();
	}
}
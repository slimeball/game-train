class GameView extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}
	// ????
	public _gridLvArr: Array<number> = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9];
	// ????
	public _gridTypeArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	// visible result text
	public _scoreLvDes: string[] = ["无药可救", "重度脸盲", "中度脸盲", "轻度脸盲", "顿足捶胸", "手疾眼快", "火眼金睛"];
	// ????
	public _scoreLv: Array<number> = [21, 31, 41, 51, 56, 60];
	// resource object
	public _res: egret.SpriteSheet;
	// start button
	public _startBtn;
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
	// public _gridPool:Array<Grid>;
	
}
class Grid extends egret.DisplayObjectContainer {
	public _index: number = 0;
	private _type: number = 0;
	private _imgIco: egret.Bitmap;
	public _dispatcher:egret.EventDispatcher;

	public constructor() {
		super();
		this._imgIco = new egret.Bitmap();
		this.addChild(this._imgIco);
	}

	public touchTapHandler(evt:egret.TouchEvent){
			this._dispatcher.dispatchEventWith("GridTouchTap",true);
	}

	public reset(index: number, type: number, data: any, scale: number): void {
		this._imgIco.texture = data;
		this._imgIco.scaleX = scale;
		this._imgIco.scaleY = scale;
		this._type = type;
	}
}
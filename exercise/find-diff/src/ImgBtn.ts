class ImgBtn extends egret.Sprite {
	public constructor() {
		super();
	}

	private _btnPressDown: egret.Bitmap;
	private _btnPressUp: egret.Bitmap;
	private _dispatcher: egret.EventDispatcher;

	public createBtn(upData: any, downData: any, dispatcher: egret.DisplayObject) {
		this._btnPressUp = new egret.Bitmap();
		this._btnPressDown = new egret.Bitmap();
		this._btnPressUp.texture = upData;
		this._btnPressDown.texture = downData;
		this.touchEnabled = true;
		this._dispatcher = dispatcher;
		this.addChild(this._btnPressUp);
		this.addChild(this._btnPressDown);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downFunc, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upFunc, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.upFunc, this);
	}

	private downFunc(): void {
		this._btnPressDown.visible = true;
		this._btnPressUp.visible = false;
	}

	private upFunc():void {
		this._btnPressDown.visible = false;
		this._btnPressUp.visible = true;
	}
}
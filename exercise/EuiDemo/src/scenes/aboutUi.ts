class aboutUi extends eui.Component implements  eui.UIComponent {
	private btnClose: eui.Button;
	private aboutText: eui.Label;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
	}

	private handleUi():void{
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.dispatchEventWith(GameEvent.EVT_CLOSE_ABOUT);
		}, this)
		this.aboutText.text = 'this is about me me me. Noah Jesus';
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}
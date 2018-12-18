class HomeUi extends eui.Component implements eui.UIComponent {
	private _pageFocused: string;
	private imgBg:eui.Image;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
		this.skinName = '/resource/custom_skins/HomeUi.exml';
	}
	private btnPlayer: eui.ToggleButton;
	private btnHeros: eui.ToggleButton;
	private btnInventory: eui.ToggleButton;
	private btnAbout: eui.ToggleButton;

	private handleUi(): void {
		this.btnPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHanlder, this);
		this.imgBg.source = 'commonBg_jpg';
	}
	private btnHanlder():void{
		// alert(1)
	}
}
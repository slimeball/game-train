class HomeUi extends eui.Component implements eui.UIComponent {
	private _pageFocused: string;
	private imgBg: eui.Image;

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
		let btnList = [this.btnPlayer, this.btnHeros, this.btnInventory, this.btnAbout];
		btnList.forEach(element => {
			element.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHanlder, this);
		});
		this.imgBg.source = 'commonBg_jpg';
	}
	private btnHanlder(evt: egret.TouchEvent): void {
		console.log(evt.currentTarget.name);
		// switch(true){
		// 	case true:
		// 		break;
		// 	case true:
		// 		break;
		// }
		this.dispatchEventWith(GameEvent.EVT_LOAD_PAGE, false, evt.currentTarget.name);
	}

	public switchSence(senceName: string): void {
		console.log(senceName);
		
	}
}
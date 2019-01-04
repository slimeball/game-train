class playerUi extends eui.Component implements eui.UIComponent {
	private btnReturn: eui.Button;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
		this.skinName = '/resource/custom_skins/playerUi.exml';
	}
	private handleUi(): void {
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.dispatchEventWith(GameEvent.EVT_RETURN);
		}, this)
	}
}
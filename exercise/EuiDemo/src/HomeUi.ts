class HomeUi extends eui.Component implements eui.UIComponent {
	private _pageFocused: string;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.handleUi, this);
		this.skinName = '/resource/custom_skins/HomeUi.exml';
	}
	private handleUi(): void {

	}
}
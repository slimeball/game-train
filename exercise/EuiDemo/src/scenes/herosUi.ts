class herosUi extends eui.Component implements eui.UIComponent {
	private btnReturn: eui.Button;
	private btnConfirm: eui.Button;
	private listHeros: eui.List;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
		this.skinName = '/resource/custom_skins/herosUi.exml';
	}

	private handleUi(): void {
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEventWith(GameEvent.EVT_RETURN);
		}, this)
		// 确认按钮事件
		this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			
		}, this)
		let heroList: Array<Object> = [
			{ icon: "heros01_png", heroName: "伊文捷琳", comment: "评价：樱桃小丸子", checked: true },
			{ icon: "heros02_png", heroName: "亚特伍德", comment: "评价：离了我你不行的", checked: false },
			{ icon: "heros03_png", heroName: "伊妮德", comment: "评价：猴子请来的逗比", checked: false },
			{ icon: "heros04_png", heroName: "鲁宾", comment: "评价：我勒个去", checked: false },
			{ icon: "heros05_png", heroName: "威弗列德", comment: "评价：这货碉堡了", checked: false },
			{ icon: "heros06_png", heroName: "史帝文", comment: "评价：咖啡不加糖", checked: false },
			{ icon: "heros07_png", heroName: "哈瑞斯", comment: "评价：猪一样的队友", checked: false }
		];
		this.listHeros.dataProvider = new eui.ArrayCollection(heroList);
		this.listHeros.itemRenderer = heroUiListSkin;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

}

class heroUiListSkin extends eui.ItemRenderer {
	private cb: eui.CheckBox;

	public constructor() {
		super();
		this.skinName = 'HeroUiListSkin';
	}

	protected createChildren(): void {
		super.createChildren();
		this.cb.addEventListener(egret.Event.CHANGE, () => {
			this.data.checked = this.cb.selected;
		}, this)
	}
}
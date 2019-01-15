class inventoryUi extends eui.Component implements eui.UIComponent {
	private btnReturn: eui.Button;
	private inventoryList: eui.List;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
		this.skinName = '/resource/custom_skins/inventoryUi.exml'
	}

	private handleUi(): void {
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEventWith(GameEvent.EVT_RETURN);
		}, this)

		let inventoryData: Array<Object> = [
			{ picture: "goods01_png", goodsName: "魔法石", property: "法力加成 +3" },
			{ picture: "goods02_png", goodsName: "诅咒娃娃", property: "咒术加成 +3" },
			{ picture: "goods03_png", goodsName: "万圣戒指", property: "敏捷加成 +3" },
			{ picture: "goods04_png", goodsName: "斗篷", property: "耐力加成 +3" },
			{ picture: "goods05_png", goodsName: "鹅毛笔", property: "精神加成 +3" },
			{ picture: "goods06_png", goodsName: "血滴子", property: "嗜血加成 +3" },
			{ picture: "goods07_png", goodsName: "屠龙刀", property: "力量加成 +5" }
		];

		this.inventoryList.dataProvider = new eui.ArrayCollection(inventoryData);
		this.inventoryList.itemRenderer = inventoryListSkin;

	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}
}

class inventoryListSkin extends eui.ItemRenderer{
	public constructor(){
		super();
		this.skinName = 'inventoryUiListSkin';
	}
	protected childrenCreated(): void {
		super.childrenCreated();
	}
}
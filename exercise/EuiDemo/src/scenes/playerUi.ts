class playerUi extends eui.Component implements eui.UIComponent {
	private btnReturn: eui.Button;
	private listSkills: eui.List;
	private scrListSkills: eui.Scroller;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
	}
	private handleUi(): void {
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEventWith(GameEvent.EVT_RETURN);
		}, this)

		let skillList: Array<Object> = [
			{ icon: "skillIcon01_png", name: "旋龙幻杀" },
			{ icon: "skillIcon02_png", name: "魔魂天咒" },
			{ icon: "skillIcon03_png", name: "天魔舞" },
			{ icon: "skillIcon04_png", name: "痴情咒" },
			{ icon: "skillIcon05_png", name: "无间寂" },
			{ icon: "skillIcon06_png", name: "霸天戮杀" },
			{ icon: "skillIcon07_png", name: "灭魂狂飙" }
		];
		this.listSkills.itemRendererSkinName = 'equipSkin';
		this.listSkills.dataProvider = new eui.ArrayCollection(skillList);
	}
	protected createChildren(): void {
		super.createChildren();
		this.scrListSkills.horizontalScrollBar = null;
	}
}
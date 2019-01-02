class HomeUi extends eui.Component implements eui.UIComponent {
	private _pageFocused: string;
	private imgBg: eui.Image;
	private _currentPage: string;
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
		// 匹配点击的按钮对象，切换页面并传递资源组名
		switch(evt.currentTarget){
			case this.btnPlayer:
				this._currentPage = GamePages.PLAYER;
				break;
			case this.btnHeros:
				this._currentPage = GamePages.HEROS;
				break;
		}
		this.dispatchEventWith(GameEvent.EVT_LOAD_PAGE, false, this._currentPage);
	}

	private _playerUI: playerUi;
	private _focusedUI: eui.Component;
	public switchSence(senceName: string): void {
		switch(senceName){
			case GamePages.PLAYER:
					if(! this._playerUI){
						this._playerUI = new playerUi();
						this._focusedUI = this._playerUI;
					}
				break;
		}

		this.addChildAt(this._focusedUI, this.getChildIndex(this.imgBg)+1);
	}
}
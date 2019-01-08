class HomeUi extends eui.Component implements eui.UIComponent {
	private imgBg: eui.Image; // 背景图片的标记，与主场景的背景图id一致
	private _currentPage: string; // 当前场景的标记
	private _backCurrentPrev: string; // 用以处理关于弹出窗返回上一个场景
	private _btnFocused: eui.ToggleButton;
	public constructor() {
		super();
		// 添加eui事件，加载完成后执行的方法
		this.addEventListener(eui.UIEvent.COMPLETE, this.handleUi, this);
		// 指定皮肤为
		this.skinName = '/resource/custom_skins/HomeUi.exml';
	}
	// 各个按钮与id名一致
	private btnPlayer: eui.ToggleButton;
	private btnHeros: eui.ToggleButton;
	private btnInventory: eui.ToggleButton;
	private btnAbout: eui.ToggleButton;

	private handleUi(): void {
		let btnList = [this.btnPlayer, this.btnHeros, this.btnInventory, this.btnAbout];
		btnList.forEach(element => {
			element.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHanlder, this);
		});
		this.imgBg.source = 'homeBg_jpg';
	}

	private backHome(): void {
		this._backCurrentPrev = this._currentPage = GamePages.HOME;
		this.imgBg.source = 'homeBg_jpg';
	}

	private resetFocus():void{
		if(this._focusedScene){
			if(this._focusedScene.parent){
				this._focusedScene.parent.removeChild(this._focusedScene);
			}
			this._focusedScene = null;
		}
		if(this._btnFocused != null){
			this._btnFocused.selected = false;
			this._btnFocused.enabled = true;
			this._btnFocused = null;
		}
	}

	private btnHanlder(evt: egret.TouchEvent): void {
		// 当前场景则不作处理
		if (evt.currentTarget == this._btnFocused) {
			return;
		}
		// 如果已有选择的，去掉焦点
		if (this._btnFocused) {
			this._btnFocused.selected = false;
			this._btnFocused.enabled = true;
		}
		// 删掉上一个场景
		if (this._focusedScene && this._focusedScene.parent) {
			this._focusedScene.parent.removeChild(this._focusedScene);
		}

		this._btnFocused = evt.currentTarget;
		// 选中后禁用按钮，使用禁用按钮皮肤在皮肤里设置状态背景
		this._btnFocused.enabled = false;
		this._focusedScene = null;
		this._backCurrentPrev = this._currentPage;
		// 匹配点击的按钮对象，切换页面并传递资源组名
		switch (this._btnFocused) {
			case this.btnPlayer:
				this._currentPage = GamePages.PLAYER;
				break;
			case this.btnHeros:
				this._currentPage = GamePages.HEROS;
				break;
		}
		this.dispatchEventWith(GameEvent.EVT_LOAD_PAGE, false, this._currentPage);
	}

	private _playerUI: playerUi; // 玩家场景
	private _heroUI: herosUi; // 英雄场景
	private _focusedScene: eui.Component; // 当前场景的实例
	public switchScene(sceneName: string): void {
		switch (sceneName) {
			case GamePages.PLAYER:
				if (!this._playerUI) {
					this._playerUI = new playerUi;
					this._playerUI.addEventListener(GameEvent.EVT_RETURN, () => {
						this.resetFocus();
						this.backHome();
					}, this)
				}
				this.imgBg.source = 'commonBg_jpg';
				this._focusedScene = this._playerUI;
				break;
			case GamePages.HEROS:
				if(!this._heroUI) {
					this._heroUI = new herosUi;
					this._heroUI.addEventListener(GameEvent.EVT_RETURN, () => {
						this.resetFocus();
						this.backHome();
					}, this)
				}
				this.imgBg.source = 'commonBg_jpg';
				this._focusedScene = this._heroUI;
				break;
		}

		this.addChildAt(this._focusedScene, this.getChildIndex(this.imgBg) + 1);
	}
}
class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private loadingView: LoadingUI;

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        await this.loadTheme();
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            this.loadingView = new LoadingUI();
            await RES.loadGroup("loading");
            this.stage.addChild(this.loadingView);
            await RES.loadGroup("preload", 0, this.loadingView);
            this.stage.removeChild(this.loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
            // 监听资源加载完成
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSourceDone, this);
        })
    }

    private onSourceDone(evt: RES.ResourceEvent): void {
        // 根据加载的资源组不同进行不同处理
        switch (evt.groupName) {
            case 'loading':
                if (this.loadingView.parent) {
                    this.stage.removeChild(this.loadingView);
                }
                break;
            case 'home':
                break;
            default:
                this.pageLoader(evt.groupName);
                break;
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    private HomeUi: HomeUi;
    
    // 根据组名加载不同资源
    private loadPage(pageName: string): void {
        switch(pageName){
            case GamePages.PLAYER:
                RES.loadGroup(GamePages.PLAYER);
            break;
            case GamePages.HEROS:
                RES.loadGroup(GamePages.HEROS);
        }
    }

    private pageLoader(name: string): void {
        if(name !== 'home'){
            this.HomeUi.switchScene(name);
        }
    }

    protected createGameScene(): void {
        this.HomeUi = new HomeUi();
        this.HomeUi.addEventListener(GameEvent.EVT_LOAD_PAGE, (evt:egret.Event)=>{
            this.loadPage(evt.data);
        }, this);
        this.addChild(this.HomeUi);
    }
}

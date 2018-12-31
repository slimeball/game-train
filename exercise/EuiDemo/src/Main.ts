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

    private loadingView = new LoadingUI();

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("loading");
            this.stage.addChild(this.loadingView);
            this.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigDone, this)
            await this.loadTheme();
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
        })
    }

    private onConfigDone(evt: RES.ResourceEvent): void {
        this.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigDone, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onSourceDone, this);
    }

    private onSourceDone(evt: RES.ResourceEvent):void{
        switch(evt.groupName){
            case 'loading':
                if(this.loadingView.parent){
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
    protected createGameScene(): void {
        this.addChild(this.HomeUi);
    }

    private loadPage(pageName: string):void{
        
    }

    private pageLoader(name: string):void {
        this.HomeUi = new HomeUi();
        this.HomeUi.switchSence(name);
    }
}

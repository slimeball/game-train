class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.createView();
    }

    private _bg: egret.Shape;
    private textField: egret.TextField;
    private logopic:egret.Bitmap;
    
    private createView(): void {
        // loading page background
        this._bg = new egret.Shape();
        this._bg.graphics.beginFill(0x003765);
        this._bg.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        this._bg.graphics.endFill();
        this.addChild(this._bg);
        // loading persent text
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    }

    public onProgress(current: number, total: number): void {
        this.logopic = new egret.Bitmap();
        let logotexture: egret.Texture = RES.getRes('loading_gif');
        this.logopic.texture = logotexture;
        this.addChild(this.logopic);
        this.textField.text = `LOADING...${current}/${total}`;
    }
}

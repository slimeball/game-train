class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this)
    }

    private textField: egret.TextField;
    private bgImg: egret.Bitmap;
    private loadingImg: egret.Bitmap;

    private createView(): void {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;

        this.bgImg = new egret.Bitmap();
        this.bgImg.texture = RES.getRes('loading_jpg');
        this.addChild(this.bgImg);

        this.loadingImg = new egret.Bitmap();
        this.loadingImg.texture = RES.getRes('loading2_png');
        this.loadingImg.anchorOffsetX = this.loadingImg.width / 2;
        this.loadingImg.anchorOffsetY = this.loadingImg.height / 2;
        this.loadingImg.x = this.width / 2;
        this.loadingImg.y = this.height / 2;
        this.addChild(this.loadingImg);

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.height / 2 - this.textField.height / 2;
        this.textField.width = 480;
        this.textField.height = 20;
        this.textField.size = 14;
        this.textField.textAlign = "center";
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private update() {
        this.loadingImg.rotation += 5;
    }

    public onProgress(current: number, total: number): void {
        let per = Math.floor((current / total) * 100);
        this.textField.text = per + '%';
    }
}

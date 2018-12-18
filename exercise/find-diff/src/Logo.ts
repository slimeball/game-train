class Logo extends egret.Sprite{
	public constructor(text: string, size:number, color:any) {
		super();
		let logo:egret.TextField = new egret.TextField();
		logo.text = text;
		logo.size = size;
		logo.textColor = color;
		this.addChild(logo);
	}
}
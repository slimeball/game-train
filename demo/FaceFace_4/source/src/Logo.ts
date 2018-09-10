/**
 * Created by sunzg on 14-8-1.
 */
class Logo extends egret.Sprite{

    public constructor(txt:string,size:number,color:number){
        super();
        var logo:egret.gui.Label=new egret.gui.Label();
        logo.text=txt;
        logo.size=size;
        logo.textColor=color;
        this.addChild(logo);
    }
}
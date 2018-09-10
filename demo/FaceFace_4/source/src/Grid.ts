/**
 * Created by sunzg on 14-7-31.
 */
class Grid extends egret.DisplayObjectContainer{

    public _index:number=0;
    public _type:number=0;
    public _imgIco:egret.Bitmap;
    public _dispatcher:egret.EventDispatcher;

    constructor(){
        super();
        this._imgIco=new egret.Bitmap();
        this.touchEnabled=true;
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        this.addChild(this._imgIco);
    }

    public touchTapHandler(evt:egret.TouchEvent){
        this._dispatcher.dispatchEventWith("GridTouchTap",true);
    }

    public reset(index:number,type:number,data:any,scale:number){
        this._imgIco.texture=data;
        this._imgIco.scaleX=scale;
        this._imgIco.scaleY=scale;
        this._index=index;
        this._type=type;
    }

}

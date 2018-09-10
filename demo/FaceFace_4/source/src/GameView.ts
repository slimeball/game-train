/**
 * Created by sunzg on 14-7-31.
 */
class GameView extends egret.DisplayObjectContainer{

    public _gridLvArr:number[]=[2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,8,8,9];
    public _gridTypeArr:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    public _scoreLvDes:string[]=["无药可救","重度脸盲","中度脸盲","轻度脸盲","顿足捶胸","手疾眼快","火眼金睛"];
    public _scoreLv:Array<number>=[21,31,41,51,56,60];

    public _res:egret.SpriteSheet;
    public _startBtn:ImgBtn;
    public _score:number=0;
    public _scoreLaber:egret.gui.Label;
    public _totalTime:number=30*1000;
    public _runTime:number=0;
    public _timeLabel:egret.gui.Label;

    public _currentLv:number=0;
    public _gridContainer:egret.Sprite;
    public _gridPool:Array<Grid>;

    public _restartBtn:ImgBtn;
    public _moreBtn:ImgBtn;

    public _gameDesLable1:egret.gui.Label;
    public _gameDesLable2:egret.gui.Label;
    public _lvDesLable:egret.gui.Label;

    public _zxh:egret.Bitmap=new egret.Bitmap();

    public _shareGameBtn:ImgBtn;
    public _shareImgtDown:egret.Texture;
    public _shareImgtUp:egret.Texture;

    public __title:string="测测你有脸盲症吗！";
    public __desc:string="你以为你躲起来就找不到你了吗，没有用的！";
    public __iconLink:string="http://egret-game.b0.upaiyun.com/icons/10000007.jpg";

    public constructor(){
        super();
        //this.addEventListener("startGame",this.startGame,this);
        //this.addEventListener("restartGame",this.restartGame,this);
        //this.addEventListener("GridTouchTap",this.gridTouchTapHandler,this);
    }

    public createGame(res:egret.SpriteSheet){

        var logo:Logo=new Logo("Powered by Egret FrameWork",20,0x000000);
        logo.x=110;
        logo.y=635;
        this.addChild(logo);

        var _self=this;
        RES.getResByUrl("resource/assets/fx1.png",function(data:any){
            _self._shareImgtDown=data;
        },this);

        RES.getResByUrl("resource/assets/fx2.png",function(data:any){
            _self._shareImgtUp=data;
        },this);

        RES.getResByUrl("resource/assets/shareTip.png",function(data:any){
            this._shareTip.texture=data;
        },this);

        ShareUtils.setShareInfo(this.__title,this.__desc,this.__iconLink);

        this._res=res;
        this._startBtn=new ImgBtn();
        this._startBtn.x=85;
        this._startBtn.y=385;
        this._startBtn.createBtn(this._res.getTexture("start1"),this._res.getTexture("start2"),this);
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.firstStartGame,this);

        this._zxh.texture=this._res.getTexture("zxh");

        this._restartBtn=new ImgBtn();
        this._restartBtn.createBtn(this._res.getTexture("restart1"),this._res.getTexture("restart2"),this);
        this._restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this);
        this._restartBtn.x=85;
        this._restartBtn.y=385;

        this._moreBtn=new ImgBtn();
        this._moreBtn.createBtn(this._res.getTexture("more1"),this._res.getTexture("more2"),this);
        this._moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.more,this);
        this._moreBtn.x=85;
        this._moreBtn.y=500;

        this._gameDesLable1=new egret.gui.Label();
        this._gameDesLable1.text="茫茫人海中";
        this._gameDesLable1.x=175;
        this._gameDesLable1.y=70;

        this._gameDesLable2=new egret.gui.Label();
        this._gameDesLable2.text="你的小伙伴在哪里？";
        this._gameDesLable2.x=126;
        this._gameDesLable2.y=120;

        this._lvDesLable=new egret.gui.Label();
        this._lvDesLable.text="";
        this._lvDesLable.size=30;
        this._lvDesLable.x=20;
        this._lvDesLable.y=320;

        this._scoreLaber=new egret.gui.Label();
        this._scoreLaber.text="得分："+this._score.toString();
        this._scoreLaber.x=30;
        this._scoreLaber.y=35;

        this._timeLabel=new egret.gui.Label();
        this._timeLabel.x=220;
        this._timeLabel.y=35;
        this._timeLabel.text="60";

        this._gridContainer=new egret.Sprite();
        this._gridContainer.y=140;
        this._gridContainer.x=0;
        this._gridContainer.width=480;
        this._gridContainer.height=480;
        this._gridContainer.graphics.beginFill(0xffffff);
        this._gridContainer.graphics.drawRect(0,0,this._gridContainer.width,this._gridContainer.height);
        this._gridContainer.graphics.endFill();

        this.initGameStartView();
        this.initGridPool();

    }

    public initGameStartView(){
        this.addChild(this._gameDesLable1);
        this.addChild(this._gameDesLable2);
        this.addChild(this._startBtn);
        this.addChild(this._moreBtn);
        this._zxh.x=195;
        this._zxh.y=200;
        this.addChild(this._zxh);
    }

    public initGridPool(){
        this._gridPool=[];
        for(var i:number=0;i<81;i++){
            var grid:Grid=new Grid();
            this._gridPool.push(grid);
        }
    }

    public firstStartGame(evt:any){
        this.removeChild(this._gameDesLable1);
        this.removeChild(this._gameDesLable2);
        this.removeChild(this._startBtn);
        this.removeChild(this._zxh);
        this.removeChild(this._moreBtn);
        this.startGame();
    }

    public startGame(){
        this.addChild(this._scoreLaber);
        this.addChild(this._timeLabel);
        this.addChild(this._gridContainer);
        this.createGrids(this.getGridLv(this._currentLv));
        egret.Ticker.getInstance().register(this.loop,this);
    }

    public getGridLv(lv:number){
        if(lv>this._gridLvArr.length-1)return 9;
        return this._gridLvArr[lv];
    }

    public _space:number=13.5;
    public _row:number=3;
    public _line:number=3;
    public _size:number;
    public _difPos:number;
    public createGrids(gridLv:number){
        this.destroyGrids();
        this._row=gridLv;
        this._line=gridLv;
        this._size=(this.width-(gridLv+1)*this._space)/gridLv;
        var difArr:Array<any>=this.getDifTypeAndPos(gridLv);
        for(var i:number=0;i<this._row;i++){
            for(var j:number=0;j<this._line;j++){
                var index=this._row*i+j+1;
                if(index==difArr[2]){
                    var grid:Grid=this.getGrid(index,difArr[1],j,i,true);
                }else{
                    var grid:Grid=this.getGrid(index,difArr[0],j,i);
                }
                this._gridContainer.addChild(grid);
                grid.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gridTouchTapHandler,this);
            }
        }

    }

    public destroyGrids(){
        while(this._gridContainer.numChildren){
            this._gridPool.push(<Grid>this._gridContainer.removeChildAt(0));
        }
    }

    public gridTouchTapHandler(evt:egret.TouchEvent){
        console.log(evt.target);
        if(evt.target._index==this._difPos){
            this._currentLv++;
            this._score++;
            this._scoreLaber.text="得分："+this._score.toString();
            this.nextGirdLv();
        }
    }

    public nextGirdLv(){
        this.createGrids(this.getGridLv(this._currentLv));
    }

    public getDifTypeAndPos(lv:number){
        var typelg:number=this._gridTypeArr.length;
        var type:number=Math.floor(Math.random()*typelg+1);
        var diftype:number=Math.floor(Math.random()*typelg+1);
        if(type==diftype)diftype=type==1?2:type-1;
        var pos:number=Math.floor(Math.random()*lv*lv+1);
        this._difPos=pos;
        return [type,diftype,pos];
    }

    public getGrid(index:number,type:number,posX:number,posY:number,b?:boolean){
        var grid:Grid=this._gridPool.shift();
        var dataName:string=type.toString();
        var data:egret.Texture=this._res.getTexture(dataName);
        grid.width=this._size;
        grid.height=this._size;
        var scale:number=this._size/142;
//        if(b)scale=scale*1.2;
        grid.x=(posX+1)*this._space+posX*this._size;
        grid.y=(posY+1)*this._space+posY*this._size;
        grid._dispatcher=this;
        grid.reset(index,type,data,scale);
        return grid;
    }

    public loop(spaceTime:number){
        this._runTime=this._runTime+spaceTime;
        if(this._runTime>this._totalTime){
            egret.Ticker.getInstance().unregister(this.loop,this);
            this.gameOver();
        }
        var tipTime:number=Math.floor((this._totalTime-this._runTime)/1000);
        this._timeLabel.text=tipTime.toString();
    }

    public gameOver(){
        this.getLvDesByScore(this._score);
        this.initGameOverView();
    }

    public __num:number;
    public getLvDesByScore(score:number){
//        for(var i:number=0;i<this._scoreLv.length;i++){
//            if(score<this._scoreLv[i]){
//                this._lvDesLable.text=this._scoreLvDes[i];
//                return;
//            }
//        }
//        this._lvDesLable.text=this._scoreLvDes[6];
        this.__num=Math.floor(Math.random()*7);
        this._lvDesLable.text="我闯过了"+score+"关，被认定为"+this._scoreLvDes[this.__num];
    }

    public initGameOverView(){

        this._shareGameBtn=new ImgBtn();
        this._shareGameBtn.createBtn(this._shareImgtUp,this._shareImgtDown,this);
        this._shareGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareGame,this);
        this._shareGameBtn.x=85;
        this._shareGameBtn.y=500;

        this.removeChild(this._timeLabel);
        this.removeChild(this._scoreLaber);
        this.removeChild(this._gridContainer);
        this._zxh.x=195;
        this._zxh.y=120;
        this.addChild(this._zxh);
        this.addChild(this._lvDesLable);
        this.addChild(this._restartBtn);
        this.addChild(this._shareGameBtn);

        this.__title="测测你有脸盲症吗！";
        this.__desc="我闯过了"+this._score+"关，被认定为"+this._scoreLvDes[this.__num]+"，不服来试试！";
        ShareUtils.setShareInfo(this.__title,this.__desc,this.__iconLink);
    }

    public restartGame(evt:any){
        if(this._shareView.parent)this.removeChild(this._shareView);
        this._runTime=0;
        this._score=0;
        this._currentLv=0;
        this._scoreLaber.text="得分："+"0";
        this._timeLabel.text="60";
        this.removeChild(this._lvDesLable);
        this.removeChild(this._zxh);
        this.removeChild(this._restartBtn);
        this.removeChild(this._shareGameBtn);
        this.startGame();
    }

    public _shareView:egret.Sprite=new egret.Sprite();
    public _shareLabel:egret.gui.Label=new egret.gui.Label();
    public _shareTip:egret.Bitmap=new egret.Bitmap();
    public _shareTipLabel:egret.gui.Label=new egret.gui.Label();

    public showShareView(){
        this._shareView.width=this.stage.stageWidth;
        this._shareView.height=this.stage.stageHeight;
        this._shareView.graphics.clear();
        this._shareView.graphics.beginFill(0x555555,0.5);
        this._shareView.graphics.drawRect(0,0,this._shareView.width,this._shareView.height);
        this._shareView.graphics.endFill();
        this._shareView.touchEnabled=true;
        this._shareTip.x=this._shareView.width-150;
        this._shareTip.y=0;
        this._shareView.addChild(this._shareTip);
        this._shareTipLabel.text="分享到朋友圈";
        this._shareTipLabel.y=60;
        this._shareTipLabel.x=200;
        this._shareTipLabel.size=25;
        this._shareView.addChild(this._shareTipLabel);
        this._shareView.addChild(this._lvDesLable);
        this.addChild(this._shareView);
        this.__title="测测你有脸盲症吗！";
        this.__desc="我闯过了"+this._score+"关，被认定为"+this._scoreLvDes[this.__num]+"，不服来试试！";
        ShareUtils.shareToWeChat();
        this._shareView.addEventListener(egret.TouchEvent.TOUCH_TAP,this.removeShareView,this);

    }

    public shareGame(evt:any):void{
        if(ShareUtils.isInWeChat()){
            this.showShareView();
        }else{
            ShareUtils.shareToU9();
        }
    }

    public removeShareView(event:egret.TouchEvent){
        if(this._shareView.parent)this.removeChild(this._shareView);
        this.addChild(this._lvDesLable);
    }

    public more(){
        ShareUtils.moreGame();
    }
}

var BoxGroup = (function (_super) {
    __extends(BoxGroup, _super);
    function BoxGroup() {
        _super.call(this);
        this._isHit = false; //本行是否被击中
        this.init();
    }
    var d = __define,c=BoxGroup,p=c.prototype;
    p.init = function () {
        this._boxs = [];
        for (var i = 0; i < GameData.column; i++) {
            var box = new BoxGraphics();
            this._boxs.push(box);
            box.addEventListener(GameEvent.GAME_HIT, this.boxhit, this);
            box.addEventListener(GameEvent.GAME_OVER, this.boxGameOver, this);
            this.addChild(box);
            box.x = GameData.getBoxWidth() * i;
        }
    };
    /*
        //位图方式
        private _boxs:Array<BoxImage>;
        private init():void
        {
            this._boxs = [];
            for(var i:number=0;i<GameData.column;i++)
            {
                var box:BoxImage = new BoxImage();
                this._boxs.push(box);
                box.addEventListener(GameEvent.GAME_HIT, this.boxhit, this);
                box.addEventListener(GameEvent.GAME_OVER, this.boxGameOver, this);
                this.addChild(box);
                box.x = GameData.getBoxWidth()*i;
            }
        }
    */
    /*
        //mc方式
        private _boxs:Array<BoxMc>;
        private init():void
        {
            this._boxs = [];
            for(var i:number=0;i<GameData.column;i++)
            {
                var box:BoxMc = new BoxMc();
                this._boxs.push(box);
                box.addEventListener(GameEvent.GAME_HIT, this.boxhit, this);
                box.addEventListener(GameEvent.GAME_OVER, this.boxGameOver, this);
                this.addChild(box);
                box.x = GameData.getBoxWidth()*i;
            }
        }
    */
    //创建一行新的box
    p.create = function () {
        this._isHit = false;
        var touchIndex = Math.floor(Math.random() * 4);
        var len = this._boxs.length;
        for (var i = 0; i < len; i++) {
            if (i == touchIndex) {
                this._boxs[i].drawBox(true);
            }
            else {
                this._boxs[i].drawBox();
            }
        }
    };
    d(p, "isHit"
        ,function () {
            return this._isHit;
        }
    );
    p.boxhit = function (evt) {
        if (!this._isHit) {
            this._isHit = true;
            var event = new GameEvent(GameEvent.GAME_HIT);
            this.dispatchEvent(event);
        }
    };
    p.boxGameOver = function (evt) {
        var event = new GameEvent(GameEvent.GAME_OVER);
        this.dispatchEvent(event);
    };
    return BoxGroup;
})(egret.Sprite);
egret.registerClass(BoxGroup,'BoxGroup');

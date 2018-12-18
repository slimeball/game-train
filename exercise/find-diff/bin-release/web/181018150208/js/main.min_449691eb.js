var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,r){return new(i||(i=Promise))(function(n,s){function o(t){try{h(r.next(t))}catch(e){s(e)}}function a(t){try{h(r["throw"](t))}catch(e){s(e)}}function h(t){t.done?n(t.value):new i(function(e){e(t.value)}).then(o,a)}h((r=r.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return r([t,e])}}function r(i){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,s&&(o=s[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(s,i[1])).done)return o;switch(s=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,s=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(o=h.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){h.label=i[1];break}if(6===i[0]&&h.label<o[1]){h.label=o[1],o=i;break}if(o&&h.label<o[2]){h.label=o[2],h.ops.push(i);break}o[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(r){i=[6,r],s=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,s,o,a,h={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},GameView=function(t){function e(){var e=t.call(this)||this;return e._gridLvArr=[2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,8,8,9],e._gridTypeArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14],e._scoreLvDes=["无药可救","重度脸盲","中度脸盲","轻度脸盲","顿足捶胸","手疾眼快","火眼金睛"],e._scoreLv=[21,31,41,51,56,60],e._totalTime=3e4,e._runTime=0,e._currentLv=0,e._space=13.5,e._row=3,e._column=3,e}return __extends(e,t),e.prototype.createGame=function(t){this._res=t,this._startBtn=new ImgBtn,this._startBtn.createBtn(this._res.getTexture("start1"),this._res.getTexture("start2")),this.addChild(this._startBtn),this._startBtn.x=(egret.MainContext.instance.stage.stageWidth-this._startBtn.width)/2,this._startBtn.y=(egret.MainContext.instance.stage.stageHeight-this._startBtn.height)/2,this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this),this._restartBtn=new ImgBtn,this._restartBtn.createBtn(this._res.getTexture("restart1"),this._res.getTexture("restart2"),this),this._restartBtn.x=(egret.MainContext.instance.stage.stageWidth-this._restartBtn.width)/2,this._restartBtn.y=(egret.MainContext.instance.stage.stageHeight-this._restartBtn.height)/2,this._restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this),this._dollPic=new egret.Bitmap,this._dollPic.texture=this._res.getTexture("zxh"),this.addChild(this._dollPic),this._dollPic.x=(egret.MainContext.instance.stage.stageWidth-this._dollPic.width)/2,this._dollPic.y=(egret.MainContext.instance.stage.stageHeight-this._dollPic.height)/3,this._gridContainer=new egret.Sprite,this._gridContainer.width=egret.MainContext.instance.stage.stageWidth,this._gridContainer.height=this._gridContainer.width,this._gridContainer.y=this._gridContainer.width/3,this._gridContainer.x=0,this._gridContainer.graphics.beginFill(16777215),this._gridContainer.graphics.drawRect(0,0,this._gridContainer.width,this._gridContainer.height),this._gridContainer.graphics.endFill(),this.initGridPool()},e.prototype.destoryGrids=function(){for(;this._gridContainer.numChildren;)this._gridPool.push(this._gridContainer.removeChildAt(0))},e.prototype.getGrid=function(t,e,i,r){var n=this._gridPool.shift(),s=e.toString(),o=this._res.getTexture(s);n.width=this._size,n.height=this._size;var a=this._size/142;return n.x=(i+1)*this._space+i*this._size,n.y=(r+1)*this._space+r*this._size,n._dispatcher=this,n.reset(t,e,o,a),n},e.prototype.getDifTypeAndPos=function(t){var e=this._gridTypeArr.length,i=Math.floor(Math.random()*e+1),r=Math.floor(Math.random()*e+1);i==r&&(r=1==i?2:i-1);var n=Math.floor(Math.random()*t*t+1);return this._difPos=n,[i,r,n]},e.prototype.createGrids=function(t){this.destoryGrids(),this._row=t,this._column=t,this._size=(this.width-(t+1)*this._space)/t;for(var e=this.getDifTypeAndPos(t),i=0;i<this._row;i++)for(var r=0;r<this._column;r++){var n=this._row*i+r+1,s=void 0;s=n==e[2]?this.getGrid(n,e[1],r,i):this.getGrid(n,e[0],r,i),this._gridContainer.addChild(s),s.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gridTouchTapHandler,this)}},e.prototype.getGridLv=function(t){return t>this._gridLvArr.length-1?9:this._gridLvArr[t]},e.prototype.nextGirdLv=function(){this.createGrids(this.getGridLv(this._currentLv))},e.prototype.gridTouchTapHandler=function(t){t.target._index==this._difPos?(this._currentLv++,this.nextGirdLv()):this.gameOver()},e.prototype.initGridPool=function(){this._gridPool=[];for(var t=0;81>t;t++){var e=new Grid;this._gridPool.push(e)}},e.prototype.startGame=function(){try{this.removeChild(this._startBtn),this.removeChild(this._dollPic)}catch(t){}this.addChild(this._gridContainer),this.createGrids(this.getGridLv(this._currentLv))},e.prototype.gameOver=function(){this.removeChild(this._gridContainer),this.addChild(this._restartBtn)},e.prototype.restartGame=function(){this.removeChild(this._restartBtn),this.startGame()},e}(egret.DisplayObjectContainer);__reflect(GameView.prototype,"GameView");var Grid=function(t){function e(){var e=t.call(this)||this;return e._index=0,e._type=0,e._imgIco=new egret.Bitmap,e.touchEnabled=!0,e.addChild(e._imgIco),e}return __extends(e,t),e.prototype.touchTapHandler=function(t){this._dispatcher.dispatchEventWith("GridTouchTap",!0)},e.prototype.reset=function(t,e,i,r){this._imgIco.texture=i,this._imgIco.scaleX=r,this._imgIco.scaleY=r,this._index=t,this._type=e},e}(egret.DisplayObjectContainer);__reflect(Grid.prototype,"Grid");var ImgBtn=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.createBtn=function(t,e,i){this._btnPressUp=new egret.Bitmap,this._btnPressDown=new egret.Bitmap,this._btnPressUp.texture=t,this._btnPressDown.texture=e,this.touchEnabled=!0,this._dispatcher=i,this.addChild(this._btnPressUp),this.addChild(this._btnPressDown),this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.downFunc,this),this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.upFunc,this),this.addEventListener(egret.TouchEvent.TOUCH_END,this.upFunc,this)},e.prototype.downFunc=function(){this._btnPressDown.visible=!0,this._btnPressUp.visible=!1},e.prototype.upFunc=function(){this._btnPressDown.visible=!1,this._btnPressUp.visible=!0},e}(egret.Sprite);__reflect(ImgBtn.prototype,"ImgBtn");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this._bg=new egret.Shape,this._bg.graphics.beginFill(14181),this._bg.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight),this._bg.graphics.endFill(),this.addChild(this._bg),this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.logopic=new egret.Bitmap;var i=RES.getRes("loading_gif");this.logopic.texture=i,this.addChild(this.logopic),this.textField.text="LOADING..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Logo=function(t){function e(e,i,r){var n=t.call(this)||this,s=new egret.TextField;return s.text=e,s.size=i,s.textColor=r,n.addChild(s),n}return __extends(e,t),e}(egret.Sprite);__reflect(Logo.prototype,"Logo");var Main=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){egret.lifecycle.addLifecycleListener(function(t){t.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return t=e.sent(),[4,platform.login()];case 3:return e.sent(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,RES.loadGroup("preload",0,t)];case 2:return i.sent(),this.stage.removeChild(t),[3,4];case 3:return e=i.sent(),console.error(e),[3,4];case 4:return[2]}})})},e.prototype.createGameScene=function(){this._res=RES.getRes("Sprites_json");var t=new egret.Bitmap;t.texture=this._res.getTexture("bg"),t.width=this.stage.stageWidth,t.height=this.stage.stageHeight,this.addChild(t),this.initGame()},e.prototype.initGame=function(){this._gameView=new GameView,this._gameView._res=this._res,this._gameView.width=this.stage.stageWidth,this._gameView.height=this.stage.stageHeight,this._gameView.createGame(this._res),this.addChild(this._gameView)},e}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);
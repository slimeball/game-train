/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.logoUrl = "resource/assets/loading_logo.png";
        this.bgUrl = "resource/assets/loading_bg.jpg";
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        this.w = 480;
        //        this.h = document.documentElement.clientHeight;
        if (egret.MainContext.instance.stage.scaleMode == egret.StageScaleMode.NO_BORDER) {
            this.h = document.documentElement.clientHeight * (480 / document.documentElement.clientWidth);
        }
        else {
            this.h = 800;
        }
        this.textField = new egret.TextField();
        this.textField.y = 500;
        this.textField.textColor = 0x333333;
        this.textField.size = 23;
        this.textField.width = this.w;
        this.textField.height = 100;
        this.textField.fontFamily = "Black";
        this.textField.textAlign = "center";
        this.textField_power = new egret.TextField();
        this.textField_power.y = this.h * 0.9;
        this.textField_power.textColor = 0x333333;
        this.textField_power.width = this.w;
        this.textField_power.height = 100;
        this.textField_power.size = 20;
        this.textField_power.text = "Powered by Egret Engine";
        this.textField_power.fontFamily = "Black";
        this.textField_power.textAlign = "center";
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.logoUrl));
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bgUrl));
        this.bg = new egret.Bitmap();
        this.logo = new egret.Bitmap();
        this.uiContainer = new egret.DisplayObjectContainer();
        this.addChild(this.uiContainer);
        this.addChild(this.logo);
        this.addChildAt(this.bg, 0);
        this.addChild(this.textField);
        this.addChild(this.textField_power);
    };
    p.onComplete = function (e) {
        var urlLoader = e.target;
        var texture = urlLoader.data;
        if (urlLoader._request.url == this.bgUrl) {
            this.bg.texture = texture;
            this.bg.scaleX = this.w / 640;
            this.bg.scaleY = this.h / 960;
        }
        else if (urlLoader._request.url == this.logoUrl) {
            this.logo.texture = texture;
            this.logo.anchorOffsetX = this.logo.width * 0.5;
            this.logo.anchorOffsetY = this.logo.height * 0.5;
            this.logo.x = this.w / 2;
            this.logo.y = this.h / 2 - 60;
            this.logo.scaleX = this.logo.scaleY = this.h / 960;
            this.textField.y = this.logo.y + 100;
        }
    };
    p.setProgress = function (current, total) {
        var num = Math.floor((current / total) * 100);
        this.textField.text = "游戏加载中�??" + num + "%";
    };
    p.onLoadComplete = function (callback, thisObj) {
        //        callback.call(thisObj);
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
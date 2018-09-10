/**
 * Created by lcj on 14-8-5.
 */
var ShareUtils = (function () {
    function ShareUtils() {
    }
    var d = __define,c=ShareUtils,p=c.prototype;
    ShareUtils.moreGame = function () {
        // window.open("http://edn.egret.com/cn/list/example/id/13", "_self");
    };
    ShareUtils.shareToWeChat = function () {
        //if (window.hasOwnProperty("WeixinApi")) {
        //    WeixinApi.ready(function (api:WeixinApi) {
        //        var info:WeixinShareInfo = new WeixinShareInfo();
        //        info.title = ShareUtils.shareTitle;
        //        info.desc = ShareUtils.shareDesc;
        //        info.link = window.location.href;
        //        info.imgUrl = ShareUtils.shareImgUrl;//"http://egret-game.b0.upaiyun.com/icons/10000005.jpg";
        //        api.shareToFriend(info);
        //        api.shareToTimeline(info);
        //    })
        //}
    };
    ShareUtils.shareToU9 = function () {
        var url = location.href;
        if (location.search == "") {
            url += "?channel=weixin";
        }
        else {
            url += "&channel=weixin";
        }
        url = encodeURIComponent(url);
        var a = "123";
        var msg = encodeURIComponent(ShareUtils.shareDesc);
        var uid = ShareUtils.getUid();
        var link = "u9time://share?" + "uid=" + uid + "&game_url=" + url + "&a=" + a + "&msg=" + msg;
        if (!uid) {
            link = "u9time://share?" + "&game_url=" + url + "&a=" + a + "&msg=" + msg;
        }
        location.href = link;
    };
    ShareUtils.setShareInfo = function (title, desc, imgUrl) {
        ShareUtils.shareTitle = title;
        ShareUtils.shareDesc = desc;
        ShareUtils.shareImgUrl = imgUrl;
        ShareUtils.shareToWeChat();
    };
    ShareUtils.isInWeChat = function () {
        var ua = window.navigator.userAgent;
        return ua.indexOf("MicroMessenger") != -1;
    };
    ShareUtils.isInU9 = function () {
        var ua = window.navigator.userAgent;
        return ua.indexOf("EgretRuntime") != -1 && ua.indexOf("yoyo") != -1;
    };
    ShareUtils.findLocationProperty = function (key) {
        if (this.hasOwnProperty("location")) {
            var search = location.search;
            if (search == "") {
                return null;
            }
            search = search.slice(1);
            var searchArr = search.split("&");
            var length = searchArr.length;
            for (var i = 0; i < length; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        else if (false) {
        }
        return null;
    };
    ShareUtils.getUid = function () {
        return ShareUtils.findLocationProperty("uid");
    };
    ShareUtils.onEnterGame = function () {
        var appId = ShareUtils.findLocationProperty("app_id");
        var gameId = ShareUtils.findLocationProperty("game_id");
        var deviceId = ShareUtils.findLocationProperty("device_id");
        if (appId && gameId) {
            if (!deviceId) {
                deviceId = egret.localStorage.getItem("device_id");
                if (!deviceId) {
                    deviceId = Math.random();
                }
            }
            egret.localStorage.setItem("device_id", deviceId);
            var url = "http://statistics.egret-labs.org/api.php?app_id=" + appId + "&game_id=" + gameId + "&device_id=" + deviceId;
            var channel = ShareUtils.findLocationProperty("channel");
            if (channel && ShareUtils.isInWeChat()) {
                url += "&channel=" + channel;
            }
            if (url) {
                var urlLoader = new egret.URLLoader();
                urlLoader.load(new egret.URLRequest(url));
            }
        }
    };
    return ShareUtils;
}());
egret.registerClass(ShareUtils,'ShareUtils');

/**
 * Created by lcj on 14-8-5.
 */
class ShareUtils {
    public static moreGame():void {
           // window.open("http://edn.egret.com/cn/list/example/id/13", "_self");
    }

    public static shareToWeChat():void {
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
    }

    public static shareToU9():void {
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
    }

    public static shareTitle:string;
    public static shareDesc:string;
    public static shareImgUrl:string;

    public static setShareInfo(title:string, desc:string,imgUrl:string):void {
        ShareUtils.shareTitle = title;
        ShareUtils.shareDesc = desc;
        ShareUtils.shareImgUrl=imgUrl;
        ShareUtils.shareToWeChat();
    }

    public static isInWeChat():boolean {
        var ua:string = window.navigator.userAgent;
        return ua.indexOf("MicroMessenger") != -1;
    }

    private static isInU9():boolean {
        var ua:string = window.navigator.userAgent;
        return ua.indexOf("EgretRuntime") != -1 && ua.indexOf("yoyo") != -1;
    }

    private static findLocationProperty(key:string):string {
        if (this.hasOwnProperty("location")) {
            var search = location.search;
            if (search == "") {
                return null;
            }
            search = search.slice(1);
            var searchArr = search.split("&");
            var length = searchArr.length;
            for (var i:number = 0; i < length; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        else if (false) {//todo

        }
        return null;
    }

    private static getUid():string {
        return ShareUtils.findLocationProperty("uid");
    }

    public static onEnterGame():void {
        var appId:string = ShareUtils.findLocationProperty("app_id");
        var gameId:string = ShareUtils.findLocationProperty("game_id");
        var deviceId:string = ShareUtils.findLocationProperty("device_id");
        if (appId && gameId) {
            if (!deviceId) {
                deviceId = egret.localStorage.getItem("device_id");
                if (!deviceId) {
                    deviceId = <any>Math.random();
                }
            }
            egret.localStorage.setItem("device_id",deviceId);
            var url:string = "http://statistics.egret-labs.org/api.php?app_id=" + appId + "&game_id=" + gameId + "&device_id=" + deviceId;
            var channel = ShareUtils.findLocationProperty("channel");
            if (channel && ShareUtils.isInWeChat()) {
                url += "&channel=" + channel;
            }

            if (url) {
                var urlLoader = new egret.URLLoader();
                urlLoader.load(new egret.URLRequest(url));
            }
        }
    }
}
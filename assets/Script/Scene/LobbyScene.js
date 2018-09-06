// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        headImage: cc.Sprite,
        id: cc.Label,
        nickName: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        //头像
        var remoteUrl = GLB.userInfo.avatar;
        cc.loader.load(remoteUrl, function (err, texture) {
            self.headImage.spriteFrame = new cc.SpriteFrame(texture);
        });
        //id
        self.id.string = GLB.userInfo.userid;
        //昵称
        self.nickName.string = GLB.userInfo.nickname;
        //提示登录成功
        Tools.tips.show('登录成功。');
    },

    start () {

    },

    // update (dt) {},
});

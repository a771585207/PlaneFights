// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var TipsTools = {
    //初始化
    init: function(){
        var self = this;
        this.node = new cc.Node();
        this.node.opacity = 0;
        cc.director.getScene().addChild(this.node);
        //加载预制资源
        cc.loader.loadRes('LoadingNode', function(errorMessage, loadedResource){
            //检查资源加载
            if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
            self.loadedResource = loadedResource;
            var loadedNode = cc.instantiate(loadedResource);
            loadedNode.setPosition(cc.visibleRect.width / 2, cc.visibleRect.height / 2);
            loadedNode.name = 'LoadingNode';
            self.node.addChild(loadedNode);
            var label = loadedNode.getChildByName('Tips');
            //label.string = '';
        });
    },
    //显示
    show: function(str, needBlackBG){
        if (!this.node._children && this.loadedResource) {
            this.node = new cc.Node();
            this.node.opacity = 0;
            cc.director.getScene().addChild(this.node);

            var loadedNode = cc.instantiate(this.loadedResource);
            loadedNode.setPosition(cc.visibleRect.width / 2, cc.visibleRect.height / 2);
            loadedNode.name = 'LoadingNode';
            this.node.addChild(loadedNode);
        }
        var loadingNode = this.node.getChildByName('LoadingNode');
        if (loadingNode) {
            var label = loadingNode.getChildByName('Tips').getComponent(cc.Label);
            label.string = str;
            var bg1 = loadingNode.getChildByName('bg1');
            if (needBlackBG) {
                bg1.visible = true;
            }
            else{
                bg1.visible = false;
            }
        }
        this.node.stopAllActions();
        this.node.opacity = 255;
        this.node.parent = cc.director.getScene()
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(1)));
        // var self = this;
        // this.node = new cc.Node();
        // this.node.setPosition(cc.visibleRect.width / 2, cc.visibleRect.height / 2);
        // cc.director.getScene().addChild(this.node);
        // //加载背景
        // cc.loader.loadRes('bottom_tip_bg', cc.SpriteFrame,function(err,spriteFrame){
        //     var bg = self.node.addComponent(cc.Sprite);
        //     bg.spriteFrame = spriteFrame;
        // });
        // //加载提示
        // var tips = self.node.addComponent(cc.Label);
        // tips.string = str;
        // this.node.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.removeSelf(true)));
    },
};
module.exports = TipsTools;
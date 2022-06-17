const {ccclass, property} = cc._decorator;

@ccclass
export default class cancel extends cc.Component {
    @property(cc.Node)
    shopManager: cc.Node = null;

    onLoad () {
        this.shopManager=cc.find("Canvas/shopManager");
        let cancelBTN = new cc.Component.EventHandler();
        cancelBTN.target = this.node;
        cancelBTN.component = "cancel";
        cancelBTN.handler = "reply";
        cc.find("Canvas/confirm/cancel").getComponent(cc.Button).clickEvents.push(cancelBTN);
    }

    reply(){
        this.shopManager.getComponent("shopManager").equipClean();
        this.node.parent.destroy();
    }
}

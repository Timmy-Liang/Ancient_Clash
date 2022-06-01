const {ccclass, property} = cc._decorator;

@ccclass
export default class ok extends cc.Component {
    @property(cc.Node)
    shopManager: cc.Node = null;

    onLoad () {
        
        this.shopManager=cc.find("Canvas/shopManager");

        let okBTN = new cc.Component.EventHandler();
        okBTN.target = this.node;
        okBTN.component = "ok";
        okBTN.handler = "reply";
        
        cc.find("Canvas/confirm/ok").getComponent(cc.Button).clickEvents.push(okBTN);
    }

    reply(){
        cc.log("I'm ok");
        this.shopManager.getComponent("shopManager").equip_buy();
        this.node.parent.destroy();
    }
}

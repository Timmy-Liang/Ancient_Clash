const {ccclass, property} = cc._decorator;

@ccclass
export default class next extends cc.Component {
    @property(cc.Node)
    shopManager: cc.Node = null;

    @property(cc.Prefab)
    confirmPrefabs: cc.Prefab = null;

    onLoad () {
        this.shopManager=cc.find("Canvas/shopManager");
        let nextBTN = new cc.Component.EventHandler();
        nextBTN.target = this.node;
        nextBTN.component = "next";
        nextBTN.handler = "BTN_Click";
        this.node.getComponent(cc.Button).interactable=false;
        cc.find("Canvas/next").getComponent(cc.Button).clickEvents.push(nextBTN);
    }

    start(){
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event)=>{
            if(!this.shopManager.getComponent("shopManager").check_buttonshow()){
                this.node.getComponent(cc.Button).interactable=true;
            }
        }, this)

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, (event)=>{
            this.node.getComponent(cc.Button).interactable=false;
        }, this)
    }

    BTN_Click(){
        cc.log("hello");
        
        if(!this.shopManager.getComponent("shopManager").check_buttonshow()){
            let confirm= cc.instantiate(this.confirmPrefabs);
            confirm.getComponent("confirm").init(this.node, 3);
            this.shopManager.getComponent("shopManager").readyNext();
        }
        
    }
}

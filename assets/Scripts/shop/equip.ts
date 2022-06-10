const {ccclass, property} = cc._decorator;

@ccclass
export default class equip extends cc.Component {
    @property(cc.Node)
    shopManager: cc.Node = null;

    @property(cc.Prefab)
    confirmPrefabs: cc.Prefab = null;

    @property(cc.Prefab)
    dataBoxPrefabs: cc.Prefab = null;
 
    @property()
    Type: string="";

    @property()
    Price: number=0;

    @property()
    Atk: number=0;

    @property()
    Def: number=0;

    @property()
    Hp: number=0;

    @property()
    Spd: number=0;

    @property()
    Tag: number=0;

    private dataShow: boolean= false;

    onLoad () {
        this.shopManager=cc.find("Canvas/shopManager");
        let equipBTN = new cc.Component.EventHandler();
        equipBTN.target = this.node;
        equipBTN.component = "equip";
        equipBTN.handler = "BTN_Click";
        this.node.getComponent(cc.Button).interactable=false;
    }

    start(){
        var dataBox;
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event)=>{
            if(!this.dataShow){
                if(!this.shopManager.getComponent("shopManager").check_buttonshow()) {
                    cc.log("nothing show, be true")
                    this.node.getComponent(cc.Button).interactable=true;
                }
                this.dataShow=true;
                dataBox= cc.instantiate(this.dataBoxPrefabs);
                dataBox.getComponent("dataBox").init(this.node, this.Atk, this.Def, this.Hp, this.Spd);
            }
        }, this)

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, (event)=>{
            cc.log("out of button, be false")
            this.node.getComponent(cc.Button).interactable=false;
            if(this.dataShow){
                this.dataShow=false;
                dataBox.destroy();
            }
        }, this)
    }

    BTN_Click(){
        if(!this.shopManager.getComponent("shopManager").check_buttonshow()){
            this.shopManager.getComponent("shopManager").equip_update(this.Type, this.Price, this.Atk, this.Def, this.Hp, this.Tag);
            let confirm= cc.instantiate(this.confirmPrefabs);
            confirm.getComponent("confirm").init(this.node.parent, this.Tag);
        }
    }
}

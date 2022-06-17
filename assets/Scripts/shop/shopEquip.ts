const {ccclass, property} = cc._decorator;

@ccclass
export default class shopEquip extends cc.Component {
    @property(cc.Node)
    shopManager: cc.Node = null;

    @property(cc.Prefab)
    confirmPrefabs: cc.Prefab = null;

    @property(cc.Prefab)
    dataBoxPrefabs: cc.Prefab = null;

    @property()
    type: string="";

    @property()
    equipName: string="";

    private dataShow: boolean= false;
    private tag: number= 0;

    onLoad () {
        this.shopManager=cc.find("Canvas/shopManager");
        let equipBTN = new cc.Component.EventHandler();
        equipBTN.target = this.node;
        equipBTN.component = "shopEquip";
        equipBTN.handler = "BTN_Click";
        this.node.getComponent(cc.Button).interactable=false;
    }

    start(){
        this.tag=this.node.parent.getComponent("shop").getTag();

        var dataBox;
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event)=>{
            if(!this.dataShow){
                if(!this.shopManager.getComponent("shopManager").check_buttonshow()) {
                    this.node.getComponent(cc.Button).interactable=true;
                }
                this.dataShow=true;

                let tem=JSON.parse(cc.sys.localStorage.getItem(this.node.name));
                dataBox= cc.instantiate(this.dataBoxPrefabs);
                dataBox.getComponent("dataBox").init(this.node, tem.atk, tem.def, tem.hp, tem.spd);

                //dataBox= cc.instantiate(this.dataBoxPrefabs);
                //dataBox.getComponent("dataBox").init(this.node, 1,1,1,1);
            }
        }, this)

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, (event)=>{
            this.node.getComponent(cc.Button).interactable=false;
            if(this.dataShow){
                this.dataShow=false;
                dataBox.destroy();
            }
        }, this)
        
    }

    BTN_Click(){
        if(!this.shopManager.getComponent("shopManager").check_buttonshow()){
            this.shopManager.getComponent("shopManager").equipBuy(this.tag, this.type, this.equipName);
            let confirm= cc.instantiate(this.confirmPrefabs);
            cc.log(this.tag, confirm)
            confirm.getComponent("confirm").init(this.node.parent, this.tag);
        }
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class playerEquip extends cc.Component {
    @property(cc.Node)
    shopManager: cc.Node = null;

    @property(cc.Prefab)
    confirmPrefabs: cc.Prefab = null;

    @property(cc.Prefab)
    dataBoxPrefabs: cc.Prefab = null;

    private dataShow: boolean= false;
    private tag: number= 0;
    private type="";
    private equipName="";

    onLoad () {
        this.shopManager=cc.find("Canvas/shopManager");
        let equipBTN = new cc.Component.EventHandler();
        equipBTN.target = this.node;
        equipBTN.component = "playerEquip";
        equipBTN.handler = "BTN_Click";
        this.node.getComponent(cc.Button).interactable=false;
    }

    start(){
        var dataBox;
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event)=>{
            if(!this.dataShow){
                //ATK, DEF, HP, SPD
                if(!this.shopManager.getComponent("shopManager").check_buttonshow()) {
                    this.node.getComponent(cc.Button).interactable=true;
                }
                this.dataShow=true;
                let tem=JSON.parse(cc.sys.localStorage.getItem(this.node.name));
                dataBox= cc.instantiate(this.dataBoxPrefabs);
                dataBox.getComponent("dataBox").init(this.node, tem.atk, tem.def, tem.hp, tem.spd);
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
            this.shopManager.getComponent("shopManager").equipSell(this.tag, this.type, this.equipName);
            let confirm= cc.instantiate(this.confirmPrefabs);
            confirm.getComponent("confirm").init(this.node, this.tag);
        }
    }

    init(node:cc.Node, tag, type, name, x, y){
        this.node.parent=node.parent;
        this.tag=tag;
        this.type=type;
        this.equipName=name;
        this.node.position=cc.v3(x, y);
        //this.node.position=this.node.position.addSelf(this.node.parent.position);
    }
}

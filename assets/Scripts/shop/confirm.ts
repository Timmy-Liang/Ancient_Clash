const {ccclass, property} = cc._decorator;
 
@ccclass
export default class money extends cc.Component {
    private temEquip;

    init(node: cc.Node, equipName, tag, tradeType){
        this.node.parent=node.parent;
        let label=this.node.getChildByName("Label");
        let price;
        if(equipName) price=JSON.parse(cc.sys.localStorage.getItem(equipName)).price;

        if(tag==1) {
            if(tradeType=="buy"){
                this.node.position=cc.v3(-300, 40);
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, -300, 60);
                });
                label.getComponent(cc.Label).string="Do you want to pay "+price+" dollar for it?";
            }
            else if(tradeType=="sell"){
                this.node.position=cc.v3(-450, -170);
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, -450, -150);
                });
                label.getComponent(cc.Label).string="Do you want to sell it for "+ Math.floor(price*0.7)+" dollar?";
            }
        }

        else if(tag==2) {
            if(tradeType=="buy"){
                this.node.position=cc.v3(350, 40)
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, 350, 60);
                });
                label.getComponent(cc.Label).string="Do you want to pay "+price+" dollar for it?";
            }
            else if(tradeType=="sell"){
                this.node.position=cc.v3(430, -170)
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, 430, -150);
                });
                label.getComponent(cc.Label).string="Do you want to sell it for "+ Math.floor(price*0.7)+" dollar?";
            }
        }

        else {
            cc.log("debug?")
            this.node.position=cc.v3(0, 0);
            label.y-=50;
            label.getComponent(cc.Label).string="Are you both ready?";
        }
    }

    equipClean(){
        if(this.temEquip) this.temEquip.destroy();
    }
}
 
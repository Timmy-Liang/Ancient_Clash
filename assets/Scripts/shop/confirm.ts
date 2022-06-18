const {ccclass, property} = cc._decorator;
 
@ccclass
export default class money extends cc.Component {
    private temEquip;

    init(node: cc.Node, equipName, tag, tradeType){
        this.node.parent=node.parent;
        if(tag==1) {
            if(tradeType=="buy"){
                this.node.position=cc.v3(-300, 40);
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, -300, 120);
                });
            }
            else if(tradeType=="sell"){
                this.node.position=cc.v3(-450, -170);
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, -450, -60);
                });
            }
        }

        else if(tag==2) {
            if(tradeType=="buy"){
                this.node.position=cc.v3(350, 40)
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, 350, 120);
                });
            }
            else if(tradeType=="sell"){
                this.node.position=cc.v3(430, -170)
                var self=this;
                cc.loader.loadRes("equipPrefabs/"+equipName, function (err, prefab) {
                    self.temEquip = cc.instantiate(prefab);
                    self.temEquip.getComponent("playerEquip").init(self.node, 1, "weapon", equipName, 430, -60);
                });
            }
        }
        else this.node.position=cc.v3(0, 0);
    }

    equipClean(){
        if(this.temEquip) this.temEquip.destroy();
    }
}
 
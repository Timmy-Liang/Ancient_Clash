const {ccclass, property} = cc._decorator;
 
@ccclass
export default class money extends cc.Component {
    init(node: cc.Node, ATK, DEF, HP, SPD){
        cc.log("step 3");
        this.node.parent=node.parent;
        this.node.position=cc.v3(140, 100);
        this.node.position=this.node.position.addSelf(node.position);

        this.node.getChildByName("data").getComponent(cc.Label).string="ATK: "+ATK+"\n\n" + "DEF: "+DEF+"\n\n" + "HP: "+HP+"\n\n" + "SPD: "+SPD;
    }

}
 
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class money extends cc.Component {
    init(node: cc.Node, tag, type, ATK, DEF, HP, SPD){
        this.node.parent=node.parent;
        if(tag==1){
            if(type=="shop") this.node.position=cc.v3(140, -50);
            else if (type=="player") this.node.position=cc.v3(140, 100);
        }
        else if (tag==2){
            if(type=="shop") this.node.position=cc.v3(-140, -50);
            else if (type=="player") this.node.position=cc.v3(-140, 100);
        }
        this.node.position=this.node.position.addSelf(node.position);

        this.node.getChildByName("data").getComponent(cc.Label).string="ATK: "+ATK+"\n" + "DEF: "+DEF+"\n" + "HP: "+HP+"\n" + "SPD: "+SPD;
    }

}
 
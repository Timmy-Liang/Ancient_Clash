const {ccclass, property} = cc._decorator;
 
@ccclass
export default class money extends cc.Component {

    init(node: cc.Node, tag){
        this.node.parent=node.parent;

        if(tag==1) this.node.position=cc.v3(0, 300);
        else if(tag==2) this.node.position=cc.v3(300, 0)
        else this.node.position=cc.v3(300, 300);
        
    }

}
 
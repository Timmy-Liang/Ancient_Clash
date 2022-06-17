const {ccclass, property} = cc._decorator;
 
@ccclass
export default class shop extends cc.Component {
    private tag: number=0;

    init(node: cc.Node, tag, x, y){
        this.node.parent=node.parent;
        this.tag=tag;
        if(this.tag==1) this.node.position=cc.v3(-400, 0);
        else this.node.position=cc.v3(400, 0)
        cc.log("shop tag: ", this.tag)

    }

    getTag(){
        return this.tag;
    }
}
 
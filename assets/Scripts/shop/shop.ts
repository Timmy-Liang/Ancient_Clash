const {ccclass, property} = cc._decorator;
 
@ccclass
export default class shop extends cc.Component {
    private tag: number=0;

    init(node: cc.Node, tag){
        this.node.parent=node.parent;
        this.tag=tag;
        if(this.tag==1) this.node.position=cc.v3(-400, 200);
        else {
            this.node.position=cc.v3(360, 200);
            this.node.getChildByName("equipTable").x+=600;
        }
    }
    getTag(){
        return this.tag;
    }
}

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class equipBg extends cc.Component {
    init(node:cc.Node, x, y){
        this.node.parent=node.parent;
        this.node.position=cc.v3(x, y);
    }
}

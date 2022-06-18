const {ccclass, property} = cc._decorator;
 
@ccclass
export default class playerShopping extends cc.Component {
    private anim: cc.Animation = null;
    private tag: number=0;

    init(node:cc.Node, job, tag){
        this.node.parent=node.parent;
        this.tag=tag;

        this.anim = this.getComponent(cc.Animation);
        if(job=="archer") this.anim.play('archerStanding');
        else if(job=="knight") this.anim.play('knightStanding');
        else if(job=="slinger") this.anim.play('slingerStanding');
        else if(job=="warrior") this.anim.play('warriorStanding');

        if(this.tag==1) this.node.position=cc.v3(-450, -280);
        else this.node.position=cc.v3(450, -280);

    }
}
 
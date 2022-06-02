
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    //default: player()
    update (dt) {
        let new_x=cc.find("Canvas/player2/player").x+960;
        if(new_x>1280) this.node.x=1280;
        else if(new_x<640) this.node.x=640;
        else this.node.x=new_x;

        let new_y=cc.find("Canvas/player2/player").y;
        if(new_y>640) this.node.y=640;
        else if (new_y<-640) this.node.y=-640;
        else this.node.y=new_y;

    }
}

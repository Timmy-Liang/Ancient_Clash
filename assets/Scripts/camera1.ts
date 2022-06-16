
const {ccclass, property} = cc._decorator;

@ccclass
export default class camera1 extends cc.Component {
    //default: player()
    
    @property(cc.Node)
    private player1: cc.Node = null;

    update () {
        let new_x = this.player1.x - 960;
        if(new_x > -640) new_x = -640;
        else if(new_x < -1920) new_x = -1920;

        let new_y = this.player1.y;
        if(new_y > 640) new_y = 640;
        else if (new_y < -640) new_y = -640;

        this.node.setPosition(cc.v2(new_x, new_y))

    }
}

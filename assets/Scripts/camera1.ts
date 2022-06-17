import player from './player'
const {ccclass, property} = cc._decorator;

@ccclass
export default class camera1 extends cc.Component {
    //default: player()
    
    private player1: cc.Node = null;

    onLoad() {
        this.player1 = cc.find("Canvas/player1/player");
    }

    update () {
        let new_x = this.player1.x - 960;
        if(new_x > -850) new_x = -850;
        else if(new_x < -1920) new_x = -1920;

        let new_y = this.player1.y;
        if(new_y > 530) new_y = 530;
        else if (new_y < -530) new_y = -530;

        this.node.setPosition(cc.v2(new_x, new_y))

    }
}

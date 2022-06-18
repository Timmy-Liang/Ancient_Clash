
const { ccclass, property } = cc._decorator;

@ccclass
export default class camera2 extends cc.Component {
    //default: player()
    private player2: cc.Node = null;

    onLoad() {

    }

    start() {
        try {
            let job = JSON.parse(cc.sys.localStorage.getItem("p2")).job;
            if (job)
                this.player2 = cc.find("Canvas/player2/" + job);
        }
        catch {

        }
    }

    update(dt) {
        let new_x = this.player2.x + 960;
        if (new_x > 1920) new_x = 1920;
        else if (new_x < 850) new_x = 850;

        let new_y = this.player2.y;
        if (new_y > 530) new_y = 530;
        else if (new_y < -530) new_y = -530;

        this.node.setPosition(cc.v2(new_x, new_y));
    }
}

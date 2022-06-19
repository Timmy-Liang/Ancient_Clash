// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class leaderboard extends cc.Component {

    
    label: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.label=cc.find("Canvas/board/view/content/item").getComponent(cc.Label);
        this.label.string="Timothy   111 111 \n Mandy"
    }

    start () {

    }
    backToStart(){
        cc.director.loadScene("start");
    }

    // update (dt) {}
}

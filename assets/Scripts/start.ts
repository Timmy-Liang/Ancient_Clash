// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class start extends cc.Component {

    @property(cc.Node)
    select: cc.Node = null;
    @property(cc.Node)
    shade1: cc.Node = null;
    @property(cc.Node)
    shade2: cc.Node = null;
    start () {

    }
    changetoselect2V2(){
        this.select.active=true;
    }
    playerswitch1(customEventData: string){ 
        this.shade1.active=true;
        this.shade2.active=false;
    
    }
    playerswitch2(){
        this.shade1.active=false;
        this.shade2.active=true;
        
    }
    gamestart(){
        cc.director.loadScene("game");
    }

    // update (dt) {}
}

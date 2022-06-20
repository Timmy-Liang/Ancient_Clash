// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    private winnername: string = null;
    private winID:number=0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        cc.audioEngine.stopMusic();
        let playerdata=JSON.parse(cc.sys.localStorage.getItem("playerdata"))
        if(cc.sys.localStorage.getItem("winstate")=="winner1"){
            this.winID=playerdata.p1id;
            this.label.string=(playerdata.p1name+"\nWON");
        }
        else{
            this.winID=playerdata.p2id;
            this.label.string=(playerdata.p2name+"\nWON");
        }
        
    }
    backhome(){
        cc.director.loadScene("start");
    }
    // update (dt) {}
}

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

    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let userdata=JSON.parse(cc.sys.localStorage.getItem("userdata"))
        if(cc.sys.localStorage.getItem("winstate")=="winner1"){
            this.label.string=(userdata.p1name+"\nWON");
        }
        else{
            this.label.string=(userdata.p2name+"\nWON");
        }
    }
    backhome(){
        cc.director.loadScene("start");
    }
    // update (dt) {}
}

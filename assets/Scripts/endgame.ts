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
    private loseID:number=0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        let user = firebase.auth().currentUser;
        cc.audioEngine.stopMusic();
        let playerdata=JSON.parse(cc.sys.localStorage.getItem("playerdata"))
        if(cc.sys.localStorage.getItem("winstate")=="winner1"){
            this.winID=playerdata.p1id;
            this.loseID=playerdata.p2id;
            this.label.string=(playerdata.p1name+"\nWON");
            
            let ref1 = firebase.database().ref("account_data/" + user.uid+"/userdata/user"+this.winID.toString());
            var info1;
            ref1.once('value').then(function(snapshot){
                info1=snapshot.val();
                ref1.set({
                    name:info1.name,
                    wincount:info1.wincount+1,
                    totalcount:info1.totalcount+1,
                })
            });

            let ref2 = firebase.database().ref("account_data/" + user.uid+"/userdata/user"+this.loseID.toString());
            var info2;
            ref2.once('value').then(function(snapshot){
                info2=snapshot.val();
                ref2.set({
                    name:info2.name,
                    wincount:info2.wincount,
                    totalcount:info2.totalcount+1,
                })
            });
        }
        else{
            this.winID=playerdata.p2id;
            this.loseID=playerdata.p1id;
            this.label.string=(playerdata.p2name+"\nWON");
            
            let ref2 = firebase.database().ref("account_data/" + user.uid+"/userdata/user"+this.winID.toString());
            var info1;
            ref2.once('value').then(function(snapshot){
                info2=snapshot.val();
                ref2.set({
                    name:info2.name,
                    wincount:info2.wincount+1,
                    totalcount:info2.totalcount+1,
                })
            });

            let ref1 = firebase.database().ref("account_data/" + user.uid+"/userdata/user"+this.loseID.toString());
            var info1;
            ref1.once('value').then(function(snapshot){
                info1=snapshot.val();
                ref1.set({
                    name:info1.name,
                    wincount:info1.wincount,
                    totalcount:info1.totalcount+1,
                })
            });
        }
        
    }
    backhome(){
        cc.director.loadScene("start");
    }
    // update (dt) {}
}

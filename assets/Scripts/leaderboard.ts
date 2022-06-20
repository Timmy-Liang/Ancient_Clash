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
        
        this.label.string="111";
        
    }

    start () {
        let user = firebase.auth().currentUser;
        let ref = firebase.database().ref("account_data/" + user.uid+"/userdata");
            var info;
            var str;
            var rate1,rate2,rate3,rate4;
            ref.once('value', (snapshot) => {
                info=snapshot.val();
                rate1=(info.user1.totalcount==0)?0:Math.floor( 100*info.user1.wincount/info.user1.totalcount );
                rate2=(info.user2.totalcount==0)?0:Math.floor( 100*info.user2.wincount/info.user2.totalcount );
                rate3=(info.user3.totalcount==0)?0:Math.floor( 100*info.user3.wincount/info.user3.totalcount );
                rate4=(info.user4.totalcount==0)?0:Math.floor( 100*info.user4.wincount/info.user4.totalcount );
                console.log(("name        rate       games\n"+
                info.user1.name.toString()+"   "+rate1.toString()+"   "+info.user1.totalcount.toString()+
                info.user2.name.toString()+"   "+rate2.toString()+"   "+info.user2.totalcount.toString()+
                info.user3.name.toString()+"   "+rate3.toString()+"   "+info.user3.totalcount.toString()+
                info.user4.name.toString()+"   "+rate4.toString()+"   "+info.user4.totalcount.toString() ));
            }).then(e => {
                this.label.string=("name        rate       games\n"+
                info.user1.name.toString()+"   "+rate1.toString()+"    "+info.user1.totalcount.toString()+"\n"+
                info.user2.name.toString()+"   "+rate2.toString()+"    "+info.user2.totalcount.toString()+"\n"+
                info.user3.name.toString()+"   "+rate3.toString()+"    "+info.user3.totalcount.toString()+"\n"+
                info.user4.name.toString()+"   "+rate4.toString()+"    "+info.user4.totalcount.toString() )
                console.log(this.label.string);
            })
                

                //
                
                
    }
    backToStart(){
        cc.director.loadScene("start");
    }

    // update (dt) {}
}

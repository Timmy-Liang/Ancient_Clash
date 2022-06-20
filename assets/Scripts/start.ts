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
    @property(cc.Prefab)
    archerPrefab: cc.Prefab=null ;
    @property(cc.Prefab)
    warrierPrefab: cc.Prefab=null ;
    @property(cc.Prefab)
    slingerPrefab: cc.Prefab=null ;
    @property(cc.Prefab)
    knightPrefab: cc.Prefab=null ;

    @property(cc.Node)
    chara1: cc.Node = null;
    @property(cc.Node)
    chara2: cc.Node = null;
    p1: cc.Node = null;
    p2: cc.Node = null;
    p1name:cc.Label=null;
    p2name:cc.Label=null;
    p1id:number=0;//1 to 4
    p2id:number=0;

    p1charaname:string=null;
    p2charaname:string=null;
    user1name:string=null;
    user2name:string=null;
    user3name:string=null;
    user4name:string=null;
    twoplayBtn: cc.Node = null;
    boardBtn: cc.Node = null;
    start () {
        this.select.active=false;
        //this.playBGM();
    }
    /*playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }*/
    onLoad(): void {
        //firebase
        /*let user = firebase.auth().currentUser;
        let ref = firebase.database().ref("account_data/" + user.uid);
        var info;
        ref.once('value').then(function(snapshot){
            info=snapshot.val();
        });
        cc.sys.localStorage.setItem("account_data",JSON.stringify(info));
        */
        this.p1=cc.instantiate(this.archerPrefab);
        this.p1.parent = this.chara1;
        this.p1.position = cc.v3(0, 0);
        this.p2=cc.instantiate(this.archerPrefab);
        this.p2.parent = this.chara2;
        this.p2.position = cc.v3(0, 0);
        this.p1charaname="archer";
        this.p2charaname="archer";
        this.equipInit();
        //test data
        let user1={
            name:"Danny",
            wincount:0,
            totalcount:0
        };
        let user2={
            name:"Daniel",
            wincount:0,
            totalcount:0
        };
        let user3={
            name:"Mandy",
            wincount:0,
            totalcount:0
        };
        let user4={
            name:"Timothy",
            wincount:0,
            totalcount:0
        };
        let userdata={
            user1:user1,
            user2:user2,
            user3:user3,
            user4:user4
        }
        var info={
            uid: "usercre.user.uid",
            email: "email",
            userdata:userdata
        }
        //test data
        this.user1name="Danny";
        this.user2name="Daniel";
        this.user3name="Mandy";
        this.user4name="Timothy";
        cc.sys.localStorage.setItem("account_data",JSON.stringify(info));
        this.p1name=cc.find("Canvas/select_character/P1/name").getComponent(cc.Label);
        this.p2name=cc.find("Canvas/select_character/P2/name").getComponent(cc.Label);
        this.p1name.string="";
        this.p2name.string="";

        this.twoplayBtn=cc.find("Canvas/2v2Btn");
        this.boardBtn=cc.find("Canvas/leaderboard");

    }
    changetoselect2V2(){
        this.twoplayBtn.active=false;
        this.boardBtn.active=false;
        this.select.active=true;
    }
    toLeaderboard(){
        cc.director.loadScene("leaderboard");
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
        console.log("start...");
        //寫入cc.sys.localstorage
        //if()
        if(this.p1id==0||this.p2id==0||this.p1id==this.p2id) {
            alert("please select the player name");
        }
        else{
            let playerdata={
                p1name:this.p1name.string,
                p2name:this.p2name.string,
                p1id:this.p1id,
                p2id:this.p2id
            }
            let p1_Data= this.dataInit(this.p1charaname);
            let p2_Data= this.dataInit(this.p2charaname);
            cc.sys.localStorage.setItem('playerdata',JSON.stringify(playerdata));
            cc.sys.localStorage.setItem('p1', JSON.stringify(p1_Data));
            cc.sys.localStorage.setItem('p2', JSON.stringify(p2_Data));
            cc.sys.localStorage.setItem('level', "1");
            cc.find("Canvas/loading_bg").active = true;
            cc.audioEngine.stopMusic();
            console.log("start to load");

            cc.director.loadScene("level1");
        }
        
    }

    btnArcherPressed(){
        if(this.shade1.active==true){
            this.p1.destroy();
            this.p1=cc.instantiate(this.archerPrefab);
            this.p1.parent = this.chara1;
            this.p1.position = cc.v3(0, 0);
            this.p1charaname="archer";
        }
        else{
            this.p2.destroy();
            this.p2=cc.instantiate(this.archerPrefab);
            this.p2.parent = this.chara2;
            this.p2.position = cc.v3(0, 0);
            this.p2charaname="archer";
        }
    }
    btnKnightPressed(){
        if(this.shade1.active==true){
            this.p1.destroy();
            this.p1=cc.instantiate(this.knightPrefab);
            this.p1.parent = this.chara1;
            this.p1.position = cc.v3(0, 0);
            this.p1charaname="knight";
        }
        else{
            this.p2.destroy();
            this.p2=cc.instantiate(this.knightPrefab);
            this.p2.parent = this.chara2;
            this.p2.position = cc.v3(0, 0);
            this.p2charaname="knight";
        }
    }
    btnSlingertPressed(){
        if(this.shade1.active==true){
            this.p1.destroy();
            this.p1=cc.instantiate(this.slingerPrefab);
            this.p1.parent = this.chara1;
            this.p1.position = cc.v3(0, 0);
            this.p1charaname="slinger";
        }
        else{
            this.p2.destroy();
            this.p2=cc.instantiate(this.slingerPrefab);
            this.p2.parent = this.chara2;
            this.p2.position = cc.v3(0, 0);
            this.p2charaname="slinger";
        }
    }
    btnWarriorPressed(){
        if(this.shade1.active==true){
            this.p1.destroy();
            this.p1=cc.instantiate(this.warrierPrefab);
            this.p1.parent = this.chara1;
            this.p1.position = cc.v3(0, 0);
            this.p1charaname="warrior";
        }
        else{
            this.p2.destroy();
            this.p2=cc.instantiate(this.warrierPrefab);
            this.p2.parent = this.chara2;
            this.p2.position = cc.v3(0, 0);
            this.p2charaname="warrior";
        }
    }
    userBtn(event,customeventdata){
        if(this.shade1.active){
            if(customeventdata[0]==1){
                this.p1id=1;
                this.p1name.string=this.user1name;
            }
            else if(customeventdata[0]==2){
                this.p1id=2;
                this.p1name.string=this.user2name;
            }
            else if(customeventdata[0]==3){
                this.p1id=3;
                this.p1name.string=this.user3name;
            }
            else if(customeventdata[0]==4){
                this.p1id=4;
                this.p1name.string=this.user4name;
            }
            
        }
        else{
            if(customeventdata[0]==1){
                this.p2id=1;
                this.p2name.string=this.user1name;
            }
            else if(customeventdata[0]==2){
                this.p2id=2;
                this.p2name.string=this.user2name;
            }
            else if(customeventdata[0]==3){
                this.p2id=3;
                this.p2name.string=this.user3name;
            }
            else if(customeventdata[0]==4){
                this.p2id=4;
                this.p2name.string=this.user4name;
            }
        }
        
    }
    dataInit(name){
        let data={
            job: name,
            atk: 0,
            def: 0,
            hp: 0,
            spd: 0,
            money: 0,
            armor: "",
            boots: "boots1",
            weapon: ""
        }
        if(name=="archer"){
            data.atk=8;
            data.def=2;
            data.hp=30;
            data.spd=3.5;
            data.weapon="crossBow1";
            data.armor="archerArmor1";
        }
        else if(name=="slinger"){
            data.atk=15;
            data.def=4;
            data.hp=30;
            data.spd=2.5;
            data.weapon="sling1";
            data.armor="slingerArmor1";
        }
        else if(name=="knight"){
            data.atk=7;
            data.def=10;
            data.hp=50;
            data.spd=2.5;
            data.weapon="sword1";
            data.armor="knightArmor1";
        }
        else if(name=="warrior"){
            data.atk=12;
            data.def=2;
            data.hp=30;
            data.spd=3;
            data.weapon="sword1";
            data.armor="warriorArmor1";
        }
        return data;
    }

    equipInit(){
        //---armor data
        let archerArmor1={
            atk: 0,
            def: 3,
            hp: 10,
            spd: 0,
            price: 10
        }
        let archerArmor3={
            atk: 0,
            def: 5,
            hp: 18,
            spd: 0,
            price: 20
        }
        let archerArmor4={
            atk: 0,
            def: 7,
            hp: 22,
            spd: 0.5,
            price: 30
        }
        let archerArmor5={
            atk: 0,
            def: 10,
            hp: 25,
            spd: 0.5,
            price: 40
        }
        let knightArmor1={
            atk: 0,
            def: 5,
            hp: 15,
            spd: 0,
            price: 10
        }
        let knightArmor2={
            atk: 0,
            def: 8,
            hp: 25,
            spd: 0,
            price: 20
        }
        let knightArmor3={
            atk: 0,
            def: 12,
            hp: 30,
            spd: 0,
            price: 30
        }
        let knightArmor4={
            atk: 0,
            def: 16,
            hp: 40,
            spd: 0.5,
            price: 40
        }
        let slingerArmor1={
            atk: 0,
            def: 3,
            hp: 10,
            spd: 0,
            price: 10
        }
        let slingerArmor2={
            atk: 0,
            def: 4,
            hp: 22,
            spd: 0,
            price: 20
        }
        let slingerArmor3={
            atk: 0,
            def: 5,
            hp: 28,
            spd: 0.5,
            price: 30
        }
        let slingerArmor4={
            atk: 0,
            def: 8,
            hp: 35,
            spd: 0.5,
            price: 40
        }
        let warriorArmor1={
            atk: 0,
            def: 3,
            hp: 10,
            spd: 0,
            price: 10
        }
        let warriorArmor2={
            atk: 0,
            def: 5,
            hp: 15,
            spd: 0,
            price: 20
        }
        let warriorArmor3={
            atk: 0,
            def: 10,
            hp: 25,
            spd: 0.5,
            price: 30
        }
        let warriorArmor4={
            atk: 0,
            def: 16,
            hp: 35,
            spd: 1,
            price: 40
        }

        //---boots data
        let boots1={
            atk: 0,
            def: 1,
            hp: 0,
            spd: 0.5,
            price: 10
        }
        let boots2={
            atk: 0,
            def: 3,
            hp: 10,
            spd: 0.5,
            price: 20
        }
        let boots3={
            atk: 0,
            def: 5,
            hp: 15,
            spd: 1,
            price: 30
        }
        let boots4={
            atk: 0,
            def: 4,
            hp: 15,
            spd: 1,
            price: 40
        }
        let boots5={
            atk: 0,
            def: 5,
            hp: 10,
            spd: 0.5,
            price: 25
        }
        let boots6={
            atk: 0,
            def: 10,
            hp: 15,
            spd: 1,
            price: 40
        }
        let boots7={
            atk: 0,
            def: 2,
            hp: 12,
            spd: 0.5,
            price: 20
        }
        let boots8={
            atk: 0,
            def: 7,
            hp: 20,
            spd: 1,
            price: 35
        }

        //---weapon data
        let crossBow1={
            atk: 4,
            def: 0,
            hp: 0,
            spd: 0,
            price: 10
        }
        let crossBow2={
            atk: 7,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let crossBow3={
            atk: 10,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let crossBow5={
            atk: 12,
            def: 0,
            hp: 0,
            spd: 0,
            price: 40
        }
        let sword1={
            atk: 6,
            def: 0,
            hp: 0,
            spd: 0,
            price: 10
        }
        let sword2={
            atk: 12,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let sword3={
            atk: 18,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let sword4={
            atk: 24,
            def: 0,
            hp: 0,
            spd: 0,
            price: 40
        }
        let sword5={
            atk: 10,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let sword6={
            atk: 15,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let sword7={
            atk: 19,
            def: 0,
            hp: 0,
            spd: 0,
            price: 40
        }
        let sling1={
            atk: 7,
            def: 0,
            hp: 0,
            spd: 0,
            price: 10
        }
        let sling2={
            atk: 14,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let sling3={
            atk: 21,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let sling4={
            atk: 28,
            def: 0,
            hp: 0,
            spd: 0,
            price: 40
        }

        cc.sys.localStorage.setItem('archerArmor1', JSON.stringify(archerArmor1));
        cc.sys.localStorage.setItem('archerArmor3', JSON.stringify(archerArmor3));
        cc.sys.localStorage.setItem('archerArmor4', JSON.stringify(archerArmor4));
        cc.sys.localStorage.setItem('archerArmor5', JSON.stringify(archerArmor5));
        cc.sys.localStorage.setItem('knightArmor1', JSON.stringify(knightArmor1));
        cc.sys.localStorage.setItem('knightArmor2', JSON.stringify(knightArmor2));
        cc.sys.localStorage.setItem('knightArmor3', JSON.stringify(knightArmor3));
        cc.sys.localStorage.setItem('knightArmor4', JSON.stringify(knightArmor4));
        cc.sys.localStorage.setItem('slingerArmor1', JSON.stringify(slingerArmor1));
        cc.sys.localStorage.setItem('slingerArmor2', JSON.stringify(slingerArmor2));
        cc.sys.localStorage.setItem('slingerArmor3', JSON.stringify(slingerArmor3));
        cc.sys.localStorage.setItem('slingerArmor4', JSON.stringify(slingerArmor4));
        cc.sys.localStorage.setItem('warriorArmor1', JSON.stringify(warriorArmor1));
        cc.sys.localStorage.setItem('warriorArmor2', JSON.stringify(warriorArmor2));
        cc.sys.localStorage.setItem('warriorArmor3', JSON.stringify(warriorArmor3));
        cc.sys.localStorage.setItem('warriorArmor4', JSON.stringify(warriorArmor4));
        
        cc.sys.localStorage.setItem('boots1', JSON.stringify(boots1));
        cc.sys.localStorage.setItem('boots2', JSON.stringify(boots2));
        cc.sys.localStorage.setItem('boots3', JSON.stringify(boots3));
        cc.sys.localStorage.setItem('boots4', JSON.stringify(boots4));
        cc.sys.localStorage.setItem('boots5', JSON.stringify(boots5));
        cc.sys.localStorage.setItem('boots6', JSON.stringify(boots6));
        cc.sys.localStorage.setItem('boots7', JSON.stringify(boots7));
        cc.sys.localStorage.setItem('boots8', JSON.stringify(boots8));

        cc.sys.localStorage.setItem('crossBow1', JSON.stringify(crossBow1));
        cc.sys.localStorage.setItem('crossBow2', JSON.stringify(crossBow2));
        cc.sys.localStorage.setItem('crossBow3', JSON.stringify(crossBow3));
        cc.sys.localStorage.setItem('crossBow5', JSON.stringify(crossBow5));
        cc.sys.localStorage.setItem('sword1', JSON.stringify(sword1));
        cc.sys.localStorage.setItem('sword2', JSON.stringify(sword2));
        cc.sys.localStorage.setItem('sword3', JSON.stringify(sword3));
        cc.sys.localStorage.setItem('sword4', JSON.stringify(sword4));
        cc.sys.localStorage.setItem('sword5', JSON.stringify(sword5));
        cc.sys.localStorage.setItem('sword6', JSON.stringify(sword6));
        cc.sys.localStorage.setItem('sword7', JSON.stringify(sword7));
        cc.sys.localStorage.setItem('sling1', JSON.stringify(sling1));
        cc.sys.localStorage.setItem('sling2', JSON.stringify(sling2));
        cc.sys.localStorage.setItem('sling3', JSON.stringify(sling3));
        cc.sys.localStorage.setItem('sling4', JSON.stringify(sling4));
        let tem=true;
        cc.sys.localStorage.setItem('equipInit', JSON.stringify(tem));
        console.log("equip init!")
    }
    closeCharSel(){
        this.twoplayBtn.active=true;
        this.boardBtn.active=true;
        this.select.active=false;
    }
    // update (dt) {}
}

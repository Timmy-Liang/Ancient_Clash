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
    p1charaname:string=null;
    p2charaname:string=null;
    
    
    start () {
        this.select.active=false;
        //this.playBGM();
    }
    /*playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }*/
    onLoad(): void {
        this.p1=cc.instantiate(this.archerPrefab);
        this.p1.parent = this.chara1;
        this.p1.position = cc.v3(0, 0);
        this.p2=cc.instantiate(this.archerPrefab);
        this.p2.parent = this.chara2;
        this.p2.position = cc.v3(0, 0);
        this.p1charaname="archer";
        this.p2charaname="archer";
        let equipText=JSON.parse(cc.sys.localStorage.getItem("equipInit"));
        if(!equipText) this.equipInit();

    }
    changetoselect2V2(){
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
        let p1_Data= this.dataInit(this.p1charaname);
        let p2_Data= this.dataInit(this.p2charaname);

        cc.sys.localStorage.setItem('p1', JSON.stringify(p1_Data));
        cc.sys.localStorage.setItem('p2', JSON.stringify(p2_Data));
        cc.sys.localStorage.setItem('level', "1");
        cc.find("Canvas/tmp_bg").active = true;
        cc.audioEngine.stopMusic();
        console.log("start to load");
        cc.director.loadScene("level1");
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
            data.atk=10;
            data.def=2;
            data.hp=30;
            data.spd=5;
            data.weapon="crossBow1";
            data.armor="archerArmor1";
        }
        else if(name=="slinger"){
            data.atk=15;
            data.def=4;
            data.hp=30;
            data.spd=3;
            data.weapon="sling1";
            data.armor="slingerArmor1";
        }
        else if(name=="knight"){
            data.atk=7;
            data.def=10;
            data.hp=50;
            data.spd=4;
            data.weapon="sword1";
            data.armor="knightArmor1";
        }
        else if(name=="warrior"){
            data.atk=12;
            data.def=2;
            data.hp=30;
            data.spd=4;
            data.weapon="sword1";
            data.armor="warriorArmor1";
        }
        return data;
    }

    equipInit(){
        //---armor data
        let archerArmor1={
            atk: 0,
            def: 1,
            hp: 1,
            spd: 1,
            price: 10
        }
        let archerArmor3={
            atk: 0,
            def: 3,
            hp: 3,
            spd: 3,
            price: 30
        }
        let archerArmor4={
            atk: 0,
            def: 4,
            hp: 4,
            spd: 4,
            price: 40
        }
        let archerArmor5={
            atk: 0,
            def: 5,
            hp: 5,
            spd: 5,
            price: 50
        }
        let knightArmor1={
            atk: 0,
            def: 1,
            hp: 1,
            spd: 1,
            price: 10
        }
        let knightArmor2={
            atk: 0,
            def: 2,
            hp: 2,
            spd: 2,
            price: 20
        }
        let knightArmor3={
            atk: 0,
            def: 3,
            hp: 3,
            spd: 3,
            price: 30
        }
        let knightArmor4={
            atk: 0,
            def: 4,
            hp: 4,
            spd: 4,
            price: 40
        }
        let slingerArmor1={
            atk: 0,
            def: 1,
            hp: 1,
            spd: 1,
            price: 10
        }
        let slingerArmor2={
            atk: 0,
            def: 2,
            hp: 2,
            spd: 2,
            price: 20
        }
        let slingerArmor3={
            atk: 0,
            def: 3,
            hp: 3,
            spd: 3,
            price: 30
        }
        let slingerArmor4={
            atk: 0,
            def: 4,
            hp: 4,
            spd: 4,
            price: 40
        }
        let warriorArmor1={
            atk: 0,
            def: 1,
            hp: 1,
            spd: 1,
            price: 10
        }
        let warriorArmor2={
            atk: 0,
            def: 2,
            hp: 2,
            spd: 2,
            price: 20
        }
        let warriorArmor3={
            atk: 0,
            def: 3,
            hp: 3,
            spd: 3,
            price: 30
        }
        let warriorArmor4={
            atk: 0,
            def: 4,
            hp: 4,
            spd: 4,
            price: 40
        }

        //---boots data
        let boots1={
            atk: 0,
            def: 1,
            hp: 1,
            spd: 1,
            price: 10
        }
        let boots2={
            atk: 0,
            def: 2,
            hp: 2,
            spd: 2,
            price: 20
        }
        let boots3={
            atk: 0,
            def: 3,
            hp: 3,
            spd: 3,
            price: 30
        }
        let boots4={
            atk: 0,
            def: 4,
            hp: 4,
            spd: 4,
            price: 40
        }
        let boots5={
            atk: 0,
            def: 5,
            hp: 5,
            spd: 5,
            price: 50
        }
        let boots6={
            atk: 0,
            def: 6,
            hp: 6,
            spd: 6,
            price: 60
        }
        let boots7={
            atk: 0,
            def: 7,
            hp: 7,
            spd: 7,
            price: 70
        }
        let boots8={
            atk: 0,
            def: 8,
            hp: 8,
            spd: 8,
            price: 80
        }

        //---weapon data
        let crossBow1={
            atk: 10,
            def: 0,
            hp: 0,
            spd: 0,
            price: 10
        }
        let crossBow2={
            atk: 20,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let crossBow3={
            atk: 30,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let crossBow5={
            atk: 50,
            def: 0,
            hp: 0,
            spd: 0,
            price: 50
        }
        let sword1={
            atk: 10,
            def: 0,
            hp: 0,
            spd: 0,
            price: 10
        }
        let sword2={
            atk: 20,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let sword3={
            atk: 30,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let sword4={
            atk: 40,
            def: 0,
            hp: 0,
            spd: 0,
            price: 40
        }
        let sword5={
            atk: 50,
            def: 0,
            hp: 0,
            spd: 0,
            price: 50
        }
        let sword6={
            atk: 60,
            def: 0,
            hp: 0,
            spd: 0,
            price: 60
        }
        let sword7={
            atk: 70,
            def: 0,
            hp: 0,
            spd: 0,
            price: 70
        }
        let sling1={
            atk: 10,
            def: 0,
            hp: 0,
            spd: 0,
            price: 10
        }
        let sling2={
            atk: 20,
            def: 0,
            hp: 0,
            spd: 0,
            price: 20
        }
        let sling3={
            atk: 30,
            def: 0,
            hp: 0,
            spd: 0,
            price: 30
        }
        let sling4={
            atk: 40,
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
    }
    closeCharSel(){
        this.select.active=false;
    }
    // update (dt) {}
}

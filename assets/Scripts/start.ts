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
        console.log("start...");
        //寫入cc.sys.localstorage
        let p1_Data= {
            job: this.p1charaname,
            atk: 10,
            def: 10,
            hp: 10,
            spd: 10,
            money: 1000,
            armor: "archerArmor1",
            boots: "boots1",
            weapon: "crossBow1"
        }
    
        let p2_Data={
            job: this.p2charaname,
            atk: 10,
            def: 10,
            hp: 10,
            spd: 10,
            money: 1000,
            armor: "archerArmor1",
            boots: "boots1",
            weapon: "crossBow1"
        }
        cc.sys.localStorage.setItem('p1', JSON.stringify(p1_Data));
        cc.sys.localStorage.setItem('p2', JSON.stringify(p2_Data));
        cc.sys.localStorage.setItem('level', "1");
        cc.find("Canvas/tmp_bg").active = true;
        cc.audioEngine.stopMusic();
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

    // update (dt) {}
}

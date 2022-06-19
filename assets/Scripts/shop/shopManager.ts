const {ccclass, property} = cc._decorator;

@ccclass
export default class shopManager extends cc.Component {
    
    @property(cc.Prefab)
    archerShop: cc.Prefab = null;
    @property(cc.Prefab)
    knightShop: cc.Prefab = null;
    @property(cc.Prefab)
    slingerShop: cc.Prefab = null;
    @property(cc.Prefab)
    warriorShop: cc.Prefab = null;

    @property(cc.Prefab)
    playerShopping: cc.Prefab = null;
    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;
    private ButtonShow: boolean= false;
    private BothReady: boolean= false;
    private Buy: boolean= false;
    private Sell: boolean= false;

    private type: string="";
    private equipName: string="";
    private price: number=0;
    private atk: number=0;
    private def: number=0;
    private hp: number=0;
    private tag: number=0;

    private p1;
    private p1_Icon;
    private p1_Weapon;
    private p1_Boots;
    private p1_Armor;
    private p1_Label;

    private p2;
    private p2_Icon;
    private p2_Weapon;
    private p2_Boots;
    private p2_Armor;
    private p2_Label;

    private equipBg;
    /*
    p1_Data= {
        job: "slinger",
        atk: 10,
        def: 10,
        hp: 10,
        spd: 10,
        money: 1000,
        armor: "slingerArmor1",
        boots: "boots1",
        weapon: "sling1"
    }
    p2_Data={
        job: "warrior",
        atk: 10,
        def: 10,
        hp: 10,
        spd: 10,
        money: 1000,
        armor: "warriorArmor1",
        boots: "boots1",
        weapon: "sword1"
    }
    */

    onLoad(){
        //cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1_Data));
        //cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2_Data));

        let equipText=JSON.parse(cc.sys.localStorage.getItem("equipInit"));
        if(!equipText) this.equipInit();

        var sth=this;
        cc.loader.loadRes("equipPrefabs/equipBg", function (err, prefab) {
            sth.equipBg = cc.instantiate(prefab);
            sth.equipBg.getComponent("equipBg").init(sth.node, -350, -270);
            sth.equipBg = cc.instantiate(prefab);
            sth.equipBg.getComponent("equipBg").init(sth.node, 330, -270);
            sth.equipBg = cc.instantiate(prefab);
            sth.equipBg.getComponent("equipBg").init(sth.node, -560, -245);
            sth.equipBg = cc.instantiate(prefab);
            sth.equipBg.getComponent("equipBg").init(sth.node, 545, -245);
            sth.equipBg = cc.instantiate(prefab);
            sth.equipBg.getComponent("equipBg").init(sth.node, -520, -370);
            sth.equipBg = cc.instantiate(prefab);
            sth.equipBg.getComponent("equipBg").init(sth.node, 480, -370);
        });

        //-----------------p1 initialize---------------//
        this.p1=JSON.parse(cc.sys.localStorage.getItem("p1"));
        console.log("shop p1: ", this.p1);
        this.p1_Label=cc.find("Canvas/p1_Label").getComponent(cc.Label);
        this.labelUpdate(1);

        if(this.p1.job=="archer"){
            let p1_Shop=cc.instantiate(this.archerShop);
            p1_Shop.getComponent("shop").init(this.node, 1);
        }
        else if(this.p1.job=="knight"){
            let p1_Shop=cc.instantiate(this.knightShop);
            p1_Shop.getComponent("shop").init(this.node, 1);
        }
        else if(this.p1.job=="slinger"){
            let p1_Shop=cc.instantiate(this.slingerShop);
            p1_Shop.getComponent("shop").init(this.node, 1);
        }
        else if(this.p1.job=="warrior"){
            let p1_Shop=cc.instantiate(this.warriorShop);
            p1_Shop.getComponent("shop").init(this.node, 1);
        }

        this.p1_Icon=cc.instantiate(this.playerShopping);
        this.p1_Icon.getComponent("playerShopping").init(this.node, this.p1.job, 1);

        this.weaponGenerate(1, this.p1.weapon);
        this.armorGenerate(1, this.p1.armor);
        this.bootsGenerate(1, this.p1.boots);
        
        //-----------------p2 initialize---------------//
        this.p2=JSON.parse(cc.sys.localStorage.getItem("p2"));
        console.log("shop p1: ", this.p1);
        this.p2_Label=cc.find("Canvas/p2_Label").getComponent(cc.Label);
        this.labelUpdate(2);

        if(this.p2.job=="archer"){
            let p2_Shop=cc.instantiate(this.archerShop);
            p2_Shop.getComponent("shop").init(this.node, 2);
        }
        else if(this.p2.job=="knight"){
            let p2_Shop=cc.instantiate(this.knightShop);
            p2_Shop.getComponent("shop").init(this.node, 2);
        }
        else if(this.p2.job=="slinger"){
            let p2_Shop=cc.instantiate(this.slingerShop);
            p2_Shop.getComponent("shop").init(this.node, 2);
        }
        else if(this.p2.job=="warrior"){
            let p2_Shop=cc.instantiate(this.warriorShop);
            p2_Shop.getComponent("shop").init(this.node, 2);
        }

        this.p2_Icon=cc.instantiate(this.playerShopping);
        this.p2_Icon.getComponent("playerShopping").init(this.node, this.p2.job, 2);
        
        this.weaponGenerate(2, this.p2.weapon);
        this.armorGenerate(2, this.p2.armor);
        this.bootsGenerate(2, this.p2.boots);
    }
    start(){
        this.playBGM();
    }
    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
    endBGM(){
        cc.audioEngine.stopMusic();
    }
    equipBuy(tag, type, equipName){
        this.Buy=true;
        this.ButtonShow=true;

        this.tag=tag;
        this.type=type;
        this.equipName=equipName;
    }
    equipSell(tag, type, equipName){
        this.Sell=true;
        this.ButtonShow=true;

        this.tag=tag;
        this.type=type;
        this.equipName=equipName;
    }
    
    readyNext(){
        this.BothReady=true;
        this.ButtonShow=true;
    }

    equipClean(){
        this.Buy=false;
        this.Sell=false;
        this.BothReady=false;
        this.ButtonShow=false;
    }
   
    OK(){
        if(this.Buy){
            this.Buy=false;
            let temPrice=JSON.parse(cc.sys.localStorage.getItem(this.equipName)).price;

            if(this.tag==1 && this.p1.money>=temPrice) {
                this.p1.money-=temPrice;
                cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));

                if(this.type=="weapon") {
                    if(this.p1.weapon!="") this.weaponSell(this.tag, this.p1.weapon);
                    this.weaponGenerate(this.tag, this.equipName);
                }
                else if(this.type=="armor") {
                    if(this.p1.armor!="")this.armorSell(this.tag, this.p1.armor);
                    this.armorGenerate(this.tag, this.equipName);
                }
                else if(this.type=="boots") {
                    if(this.p1.boots!="")this.bootsSell(this.tag, this.p1.boots);
                    this.bootsGenerate(this.tag, this.equipName);
                }
                this.labelUpdate(this.tag);
            }
            else if(this.tag==2 && this.p2.money>=temPrice) {
                this.p2.money-=temPrice;
                cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));

                if(this.type=="weapon") {
                    if(this.p2.weapon!="") this.weaponSell(this.tag, this.p2.weapon);
                    this.weaponGenerate(this.tag, this.equipName);
                }
                else if(this.type=="armor") {
                    if(this.p2.armor!="") this.armorSell(this.tag, this.p2.armor);
                    this.armorGenerate(this.tag, this.equipName);
                }
                else if(this.type=="boots") {
                    if(this.p2.boots!="") this.bootsSell(this.tag, this.p2.boots);
                    this.bootsGenerate(this.tag, this.equipName);
                }
                this.labelUpdate(this.tag);
            }
            else return;
        } 

        else if(this.Sell){
            this.Sell=false;
            if(this.type=="weapon") this.weaponSell(this.tag, this.equipName);
            else if(this.type=="armor") this.armorSell(this.tag, this.equipName);
            else if(this.type=="boots") this.bootsSell(this.tag, this.equipName);
            this.labelUpdate(this.tag);
        }

        else if(this.BothReady){
            this.BothReady=false;
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            this.nextLevel();
        }
        this.ButtonShow=false;
    }
   
    check_buttonshow(){
        return this.ButtonShow;
    }

    labelUpdate(tag){
        if(tag==1){
            let tem = JSON.parse(cc.sys.localStorage.getItem('p1'));
            if(tem.weapon){
                let weaponTem=JSON.parse(cc.sys.localStorage.getItem(tem.weapon));
                tem.atk+=weaponTem.atk;
            }
            if(tem.boots){
                let bootsTem=JSON.parse(cc.sys.localStorage.getItem(tem.boots));
                tem.def+=bootsTem.def;
                tem.hp+=bootsTem.hp;
                tem.spd+=bootsTem.spd;

            }
            if(tem.armor){
                let armorTem=JSON.parse(cc.sys.localStorage.getItem(tem.armor));
                tem.def+=armorTem.def;
                tem.hp+=armorTem.hp;
                tem.spd+=armorTem.spd;
            }
            this.p1_Label.string=
            "ATK: "+tem.atk+"\n"
            +"DEF: "+tem.def+"\n"
            +"HP: " + tem.hp+"\n"
            +"SPD: "+ tem.spd+"\n"
            +"Money: "+tem.money;
        }
        else if(tag==2){
            let tem = JSON.parse(cc.sys.localStorage.getItem('p2'));
            if(tem.weapon){
                let weaponTem=JSON.parse(cc.sys.localStorage.getItem(tem.weapon));
                tem.atk+=weaponTem.atk;
            }
            if(tem.boots){
                let bootsTem=JSON.parse(cc.sys.localStorage.getItem(tem.boots));
                tem.def+=bootsTem.def;
                tem.hp+=bootsTem.hp;
                tem.spd+=bootsTem.spd;
            }
            if(tem.armor){
                let armorTem=JSON.parse(cc.sys.localStorage.getItem(tem.armor));
                tem.def+=armorTem.def;
                tem.hp+=armorTem.hp;
                tem.spd+=armorTem.spd;
            }
            this.p2_Label.string=
            "ATK: "+tem.atk+"\n"
            +"DEF: "+tem.def+"\n"
            +"HP: " + tem.hp+"\n"
            +"SPD: "+ tem.hp+"\n"
            +"Money: "+tem.money;
        }
    }

    weaponGenerate(tag, weapon){
        if(tag==1){
            this.p1.weapon=weapon;
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            var self=this;
            cc.loader.loadRes("equipPrefabs/"+weapon, function (err, prefab) {
                self.p1_Weapon = cc.instantiate(prefab);
                self.p1_Weapon.getComponent("playerEquip").init(self.node, 1, "weapon", weapon, -350, -270);
            });
            this.labelUpdate(tag);
        }
        else if(tag==2){
            this.p2.weapon=weapon;
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            var self=this;
            cc.loader.loadRes("equipPrefabs/"+weapon, function (err, prefab) {
                self.p2_Weapon = cc.instantiate(prefab);
                self.p2_Weapon.getComponent("playerEquip").init(self.node, 2, "weapon", weapon, 330, -270);
            });
            this.labelUpdate(tag);
        }
    }
    weaponSell(tag, equipName){
        if(tag==1){
            this.p1.weapon="";
            this.p1.money+=Math.floor(JSON.parse(cc.sys.localStorage.getItem(equipName)).price*0.7);
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            this.p1_Weapon.destroy();
            this.labelUpdate(tag);
        }
        else if(tag==2){
            this.p2.weapon="";
            this.p2.money+=Math.floor(JSON.parse(cc.sys.localStorage.getItem(equipName)).price*0.7);
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            this.p2_Weapon.destroy();
            this.labelUpdate(tag);
        }
    }

    armorGenerate(tag, armor){
        if(tag==1){
            this.p1.armor=armor;
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            var self=this;
            cc.loader.loadRes("equipPrefabs/"+armor, function (err, prefab) {
                self.p1_Armor = cc.instantiate(prefab);
                self.p1_Armor.getComponent("playerEquip").init(self.node, 1, "armor", armor, -560, -245);
            });
            this.labelUpdate(tag);
        }
        else if(tag==2){
            this.p2.armor=armor;
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            var self=this;
            cc.loader.loadRes("equipPrefabs/"+armor, function (err, prefab) {
                self.p2_Armor = cc.instantiate(prefab);
                self.p2_Armor.getComponent("playerEquip").init(self.node, 2, "armor", armor, 545, -245);
            });
            this.labelUpdate(tag);
        }
    }
    armorSell(tag, equipName){
        if(tag==1){
            this.p1.armor="";
            this.p1.money+=Math.floor(JSON.parse(cc.sys.localStorage.getItem(equipName)).price*0.7);
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            this.p1_Armor.destroy();
            this.labelUpdate(tag);
        }
        else if(tag==2){
            this.p2.armor="";
            this.p2.money+=Math.floor(JSON.parse(cc.sys.localStorage.getItem(equipName)).price*0.7);
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            this.p2_Armor.destroy();
            this.labelUpdate(tag);
        }
    }

    bootsGenerate(tag, boots){
        if(tag==1){
            this.p1.boots=boots;
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            var self=this;
            cc.loader.loadRes("equipPrefabs/"+boots, function (err, prefab) {
                self.p1_Boots = cc.instantiate(prefab);
                self.p1_Boots.getComponent("playerEquip").init(self.node, 1, "boots", boots, -520, -370);
            });
            this.labelUpdate(tag);
        }
        else if(tag==2){
            this.p2.boots=boots;
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            var self=this;
            cc.loader.loadRes("equipPrefabs/"+boots, function (err, prefab) {
                self.p2_Boots = cc.instantiate(prefab);
                self.p2_Boots.getComponent("playerEquip").init(self.node, 2, "boots", boots, 480, -370);
            });
            this.labelUpdate(tag);
        }
    }
    bootsSell(tag, equipName){
        if(tag==1){
            this.p1.boots="";
            this.p1.money+=Math.floor(JSON.parse(cc.sys.localStorage.getItem(equipName)).price*0.7);
            cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1));
            this.p1_Boots.destroy();
            this.labelUpdate(tag);
        }
        else if(tag==2){
            this.p2.boots="";
            this.p2.money+=Math.floor(JSON.parse(cc.sys.localStorage.getItem(equipName)).price*0.7);
            cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));
            this.p2_Boots.destroy();
            this.labelUpdate(tag);
        }
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
      nextLevel() {
        this.endBGM();
        let level = parseInt(cc.sys.localStorage.getItem("level"));
        let nextLevel = level + 1;
        if (nextLevel == 5) {
            //over all level
            //enter player flighting mode
            cc.find("tmp_bg").active = true;
            this.scheduleOnce(()=>{
                cc.director.loadScene("pk");
            }, 0.2);
        } 
        else {
            cc.find("tmp_bg").active = true;
           cc.sys.localStorage.setItem("level", nextLevel.toString());
           this.scheduleOnce(()=>{
            cc.director.loadScene("level" + nextLevel.toString());
           }, 0.2);
        }
      }
}
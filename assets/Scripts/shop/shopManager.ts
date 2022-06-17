const {ccclass, property} = cc._decorator;

@ccclass
export default class shopManager extends cc.Component {
    
    @property(cc.Prefab)
    archerShop: cc.Prefab = null;

    @property(cc.Prefab)
    slingerShop: cc.Prefab = null;

    @property(cc.Prefab)
    playerShopping: cc.Prefab = null;

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

    //-------------------------texting data-------------------------//
    p1_Data= {
        job: "archer",
        atk: 10,
        def: 10,
        hp: 10,
        spd: 10,
        money: 1000,
        armor: "archerArmor1",
        boots: "boots1",
        weapon: "crossBow1"
    }

    p2_Data={
        job: "archer",
        atk: 10,
        def: 10,
        hp: 10,
        spd: 10,
        money: 1000,
        armor: "archerArmor1",
        boots: "boots1",
        weapon: "crossBow1"
    }

    archerArmor1={
        atk: 0,
        def: 1,
        hp: 1,
        spd: 1,
        price: 10
    }
    archerArmor3={
        atk: 0,
        def: 3,
        hp: 3,
        spd: 3,
        price: 30
    }
    archerArmor4={
        atk: 0,
        def: 4,
        hp: 4,
        spd: 4,
        price: 40
    }
    archerArmor5={
        atk: 0,
        def: 5,
        hp: 5,
        spd: 5,
        price: 50
    }

    boots1={
        atk: 0,
        def: 1,
        hp: 1,
        spd: 1,
        price: 10
    }
    boots2={
        atk: 0,
        def: 2,
        hp: 2,
        spd: 2,
        price: 20
    }
    boots3={
        atk: 0,
        def: 3,
        hp: 3,
        spd: 3,
        price: 30
    }

    crossBow1={
        atk: 10,
        def: 0,
        hp: 0,
        spd: 0,
        price: 10
    }
    crossBow2={
        atk: 20,
        def: 0,
        hp: 0,
        spd: 0,
        price: 20
    }
    crossBow3={
        atk: 30,
        def: 0,
        hp: 0,
        spd: 0,
        price: 30
    }
    crossBow5={
        atk: 50,
        def: 0,
        hp: 0,
        spd: 0,
        price: 50
    }
    
    //-------------------------texting data-------------------------//


    onLoad(){
        cc.sys.localStorage.setItem('p1', JSON.stringify(this.p1_Data));
        cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2_Data));
        cc.sys.localStorage.setItem('archerArmor1', JSON.stringify(this.archerArmor1));
        cc.sys.localStorage.setItem('archerArmor3', JSON.stringify(this.archerArmor3));
        cc.sys.localStorage.setItem('archerArmor4', JSON.stringify(this.archerArmor4));
        cc.sys.localStorage.setItem('archerArmor5', JSON.stringify(this.archerArmor5));
        cc.sys.localStorage.setItem('boots1', JSON.stringify(this.boots1));
        cc.sys.localStorage.setItem('boots2', JSON.stringify(this.boots2));
        cc.sys.localStorage.setItem('boots3', JSON.stringify(this.boots3));
        cc.sys.localStorage.setItem('crossBow1', JSON.stringify(this.crossBow1));
        cc.sys.localStorage.setItem('crossBow2', JSON.stringify(this.crossBow2));
        cc.sys.localStorage.setItem('crossBow3', JSON.stringify(this.crossBow3));
        cc.sys.localStorage.setItem('crossBow5', JSON.stringify(this.crossBow5));
        

        //-----------------p1 initialize---------------//
        
        this.p1=JSON.parse(cc.sys.localStorage.getItem("p1"));
        this.p1_Label=cc.find("Canvas/p1_Label").getComponent(cc.Label);
        this.labelUpdate(1);

        if(this.p1.job=="archer"){
            let p1_Shop=cc.instantiate(this.archerShop);
            cc.log("debug: p1_shop")
            p1_Shop.getComponent("shop").init(this.node, 1);
        }

        this.p1_Icon=cc.instantiate(this.playerShopping);
        this.p1_Icon.getComponent("playerShopping").init(this.node, this.p1.job, 1);

        this.weaponGenerate(1, this.p1.weapon);
        this.armorGenerate(1, this.p1.armor);
        this.bootsGenerate(1, this.p1.boots);
        
        //-----------------p2 initialize---------------//
        this.p2=JSON.parse(cc.sys.localStorage.getItem("p2"));
        this.p2_Label=cc.find("Canvas/p2_Label").getComponent(cc.Label);
        this.labelUpdate(2);

        if(this.p2.job=="archer"){
            let p2_Shop=cc.instantiate(this.archerShop);
            p2_Shop.getComponent("shop").init(this.node, 2);
        }

        this.p2_Icon=cc.instantiate(this.playerShopping);
        this.p2_Icon.getComponent("playerShopping").init(this.node, this.p2.job, 2);
        
        this.weaponGenerate(2, this.p2.weapon);
        this.armorGenerate(2, this.p2.armor);
        this.bootsGenerate(2, this.p2.boots);
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
                    this.weaponSell(this.tag, this.p1.weapon);
                    this.weaponGenerate(this.tag, this.equipName);
                }
                else if(this.type=="armor") {
                    this.armorSell(this.tag, this.p1.armor);
                    this.armorGenerate(this.tag, this.equipName);
                }
                else if(this.type=="boots") {
                    this.bootsSell(this.tag, this.p1.boots);
                    this.bootsGenerate(this.tag, this.equipName);
                }
                this.labelUpdate(this.tag);
            }
            else if(this.tag==2 && this.p2.money>=temPrice) {
                this.p2.money-=temPrice;
                cc.sys.localStorage.setItem('p2', JSON.stringify(this.p2));

                if(this.type=="weapon") {
                    this.weaponSell(this.tag, this.p2.weapon);
                    this.weaponGenerate(this.tag, this.equipName);
                }
                else if(this.type=="armor") {
                    this.armorSell(this.tag, this.p2.armor);
                    this.armorGenerate(this.tag, this.equipName);
                }
                else if(this.type=="boots") {
                    this.bootsSell(this.tag, this.p2.boots);
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
            cc.director.loadScene("game");
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
            +"SPD: "+ tem.hp+"\n"
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
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class shopManager extends cc.Component {
    private ButtonShow: boolean= false;
    private BothReady: boolean= false;
    private Empty: boolean= true;
    private Type: string="";
    private Price: number=0;
    private Atk: number=0;
    private Def: number=0;
    private Hp: number=0;
    private Tag: number=0;




    equip_update(Type, Price, Atk, Def, Hp, Tag){
        this.Empty=false;
        this.Type=Type;
        this.Price=Price;
        this.Atk=Atk;
        this.Def=Def;
        this.Hp=Hp;
        this.Tag=0;
        this.ButtonShow=true;
    }

    equip_clean(){
        cc.log("clean~")
        this.Empty=true;
        this.BothReady=false;
        this.ButtonShow=false;
        /*
        this.Type="";
        this.Price=0;
        this.Atk=0;
        this.Def=0;
        this.Hp=0;
        this.Tag=0;
        */
    }

    equip_buy(){
        this.ButtonShow=false;
        if(!this.Empty){
            cc.log("buy~")
        } else if(this.BothReady){
            //change scene
        }
    }

    ready_next(){
        this.BothReady=true;
        this.ButtonShow=true;
    }

    check_buttonshow(){
        return this.ButtonShow;
    }
}
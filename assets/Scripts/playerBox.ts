const {ccclass, property} = cc._decorator;
 
@ccclass
export default class playerBox extends cc.Component {
    init(node: cc.Node, name){
        this.node.parent=node.parent;
        this.node.x=this.node.parent.x;
        this.node.y=this.node.parent.y;
        let sth=this.node.getChildByName("data").getComponent(cc.Label);
        if(name=="archer"){
            sth.string="遠程攻擊，像風一樣的男子。\n"+"技能:百步穿楊";
        }
        else if(name=="knight"){
            sth.string="近戰攻擊，以自身的防禦力為豪。\n" + "技能:固若金湯";
        }
        else if(name=="slinger"){
            sth.string="遠程攻擊，瞬間輸出之冠\n" + "技能:石破天驚";
        }
        else if(name=="warrier"){
            sth.string="近戰攻擊，唯愛玉石俱焚\n"+"技能:背水一戰";
        }
    }

}
 
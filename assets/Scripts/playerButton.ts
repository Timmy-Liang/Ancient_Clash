const {ccclass, property} = cc._decorator;

@ccclass
export default class playerButton extends cc.Component {
    @property(cc.Prefab)
    playerBoxPrefabs: cc.Prefab = null;

    private playerBox;
    private show: boolean=false;

    start(){
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event)=>{
            if(!this.show){
                this.show=true;
                this.playerBox= cc.instantiate(this.playerBoxPrefabs);
                this.playerBox.getComponent("playerBox").init(this.node, this.node.name);
            }
        }, this)

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, (event)=>{
            if(this.show){
                this.show=false;
                this.playerBox.destroy();
            }
        }, this)
        
    }
}

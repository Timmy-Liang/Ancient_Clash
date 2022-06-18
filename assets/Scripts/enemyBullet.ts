// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class enemyBullet extends cc.Component {


    private bulletSpeed: number = 5;

    private initPosOffset: number = 32;

    private speedX: number = 0;
    private speedY: number = 0;


    public init(node: cc.Node, targetDirection: string, targetAngle: number) {
        this.setInitPos(node, targetDirection);
        this.speedX = Math.cos(targetAngle * Math.PI / 180);
        this.speedY = Math.sin(targetAngle * Math.PI / 180);
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 3)
    }

    //this function sets the bullet's initial position when it is reused.
    setInitPos(node: cc.Node, targetDirection: string) {
        this.node.parent = node.parent;
        switch (targetDirection) {
            case 'N':
                this.node.setPosition(cc.v2(0, this.initPosOffset));
                break;
            case 'S':
                this.node.setPosition(cc.v2(0, -1 * this.initPosOffset));
                break;
            case 'E':
                this.node.setPosition(cc.v2(this.initPosOffset, 0));
                break;
            case 'W':
                this.node.setPosition(cc.v2(-1 * this.initPosOffset, 0));
                break;
        }
        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position

    update (dt) {
        this.node.x += this.bulletSpeed * this.speedX;
        this.node.y += this.bulletSpeed * this.speedY;
    }

    //detect collision with enemies
    onBeginContact(contact, self, other) {
        if(other.tag == 1){
            this.unscheduleAllCallbacks();
            this.node.destroy();
            return;
        }
        

    }
}

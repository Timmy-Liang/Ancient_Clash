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

    private damage: number=10;

    private isTriggered = false;


    public init(node: cc.Node, targetDirection: string, targetAngle: number) {
        console.log("bullet init!");
        this.setInitPos(node, targetDirection);
        this.speedX = Math.cos(targetAngle * Math.PI / 180);
        this.speedY = Math.sin(targetAngle * Math.PI / 180);
        if (node.name == 'archerEnemy'){
            this.node.angle = targetAngle + 135;
        }
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 3)
    }

    //this function sets the bullet's initial position when it is reused.
    setInitPos(node: cc.Node, targetDirection: string) {
        this.node.parent = node.parent.parent;
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
        if(this.isTriggered)
            return;
        if(other.tag == 2 || other.tag == 3) { // hit enemy or bullet
            contact.disabled = true;
            return;
        }
        if(other.tag == 1){
            other.node.getComponent('player').lifeDamage(this.damage);
            this.isTriggered = true;
        }
        this.unscheduleAllCallbacks();
        this.node.destroy();
        return;
    }
}

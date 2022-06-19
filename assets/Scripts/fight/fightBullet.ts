// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class fightBullet extends cc.Component {

    private bulletManager = null;

    private bulletSpeed: number = 40;

    private initPosOffset: number = 60;

    private damage: number = 1;
    private owner: number = 0;

    private speedX: number = 0;
    private speedY: number = 0;

    public isTriggered = false; // I add this to make the bullet kill one enemy at a time.

    // when created, the bullet need to be placed at correct position and play animation.
    public init(node: cc.Node, targetDirection: string, targetAngle: number, atk: number, owner: number) {
        this.setInitPos(node, targetDirection);
        //this.bulletMove()
        this.speedX = Math.cos(targetAngle * Math.PI / 180);
        this.speedY = Math.sin(targetAngle * Math.PI / 180);
        this.damage=atk;
        this.owner = owner;
        this.scheduleOnce(() => {
            this.bulletManager.put(this.node);
        }, 1);
        if(node.name == 'archer'){
            this.node.angle =  targetAngle + 135
        }
        
    }

    // this function is called when the bullet manager calls "get" API.
    reuse(bulletManager) {
        this.bulletManager = bulletManager;

        this.isTriggered = false;
    }

    //this function sets the bullet's initial position when it is reused.
    setInitPos(node: cc.Node, targetDirection: string) {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
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
            case 'NE':
                this.node.setPosition(cc.v2(this.initPosOffset, this.initPosOffset));
                break;
            case 'NW':
                this.node.setPosition(cc.v2(-1 * this.initPosOffset, this.initPosOffset));
                break;
            case 'SW':
                this.node.setPosition(cc.v2(-1 * this.initPosOffset, -1 * this.initPosOffset));
                break;
            case 'SE':
                this.node.setPosition(cc.v2(this.initPosOffset, -1 * this.initPosOffset));
                break;

        }
        //this.node.setPosition(cc.v2(128, 70));
        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position

    update (dt) {
        this.node.x += this.bulletSpeed * this.speedX;
        this.node.y += this.bulletSpeed * this.speedY;
    }

    //detect collision with enemies
    onBeginContact(contact, self, other) {
        if(other.tag == 3) { // hit bullet
            contact.disabled = true;
            return;
        }
        if(other.tag == 1){ // hit player
            let index = parseInt(other.node.parent.name.slice(-1));
            if(index != this.owner)
                other.node.getComponent('fightPlayer').lifeDamage(this.damage)
            else {
                contact.disabled = true;
                return;
            }
        }
        this.node.stopAllActions();

        this.unscheduleAllCallbacks();

        this.scheduleOnce(() => {
            this.bulletManager.put(this.node);
        }, 0.03); // for better animation effect, I delay 0.1s when bullet hits the enemy
    }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class bullet extends cc.Component {

    private targetPosition: cc.Vec2 = cc.v2(0, 0);

    private bulletManager = null;

    public isTriggered = false; // I add this to make the bullet kill one enemy at a time.

    // when created, the bullet need to be placed at correct position and play animation.
    public init(node: cc.Node, targetPosition: cc.Vec2, targetDirection: string) {
        this.setInitPos(node, targetDirection);
        this.bulletMove()
        this.targetPosition = targetPosition;
    }

    // this function is called when the bullet manager calls "get" API.
    reuse(bulletManager) {
        this.bulletManager = bulletManager;

        this.isTriggered = false;
    }

    //this function sets the bullet's initial position when it is reused.
    setInitPos(node: cc.Node, targetDirection: string) {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        this.node.setPosition(cc.v2(0, 0));
        //this.node.setPosition(cc.v2(128, 70));
        this.node.position = this.node.position.addSelf(node.position);
    }

    //make the bullet move from current position
    bulletMove() {

        let moveDir = cc.moveTo(0.2, this.targetPosition);

        // move bullet to 500 far from current position in 0.8s

        let finished = cc.callFunc(() => {
            this.bulletManager.put(this.node);
        });

        // after playing animation, the bullet move 0.8s and destroy itself(put back to the bullet manager)
        this.scheduleOnce(() => {
            this.node.runAction(cc.sequence(moveDir, finished));
        });
    }

    //detect collision with enemies
    onBeginContact(contact, selt, other) {
        if(other.tag == 1){
            contact.disabled = true;
            return;
        }
        this.node.stopAllActions();

        this.unscheduleAllCallbacks();

        this.scheduleOnce(() => {
            this.bulletManager.put(this.node);
        }, 0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
    }
}

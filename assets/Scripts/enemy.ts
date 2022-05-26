// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component {

    
    private detectRange: number = 20;
    private attackRange: number = 5;
    private attackCooldown: number = 1;
    private moveSpeed: number = 5;
    private tracingPlayer: boolean = false;

    private wanderVelocity = cc.Vec2.ZERO;
    private moveDuration = 1.0;
    private waitDuration = 0.5;
    private nextWaitTime = 0;
    private nextMoveTime = 0;
    private waitRandomFactor = 0.1;

    onLoad () {

    }

    start () {

    }

    wandering(dt: number) {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        if(currentTime >= this.nextMoveTime){
            this.nextWaitTime = currentTime + this.moveDuration;
            this.nextMoveTime = this.nextWaitTime + this.waitDuration * (1.0 + this.waitRandomFactor * (Math.random() * 2.0 -1.0));
            this.wanderVelocity = randomPointOnUnitCircle();
        }
    }

    tracing(dt: number) {

    }

    update (dt) {
        if(!this.tracing) {
            this.wandering(dt);
        }
        else {
            this.tracing(dt);
        }
    }
}


function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
}
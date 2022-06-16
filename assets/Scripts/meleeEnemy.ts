// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import player from './player'
import pathFinding from './pathFinding'
const { ccclass, property } = cc._decorator;

@ccclass
export default class meleeEnemy extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    private detectRange: number = 200;
    private attackRange: number = 5;
    private attackCooldown: number = 1;
    private moveSpeed: number = 40;
    public tracingPlayer: boolean = false;

    private moveDir: cc.Vec2 = cc.Vec2.ZERO;
    private moveDuration = 2.0;
    private waitDuration = 2;
    private nextWaitTime = 0;
    private nextMoveTime = 0;
    private waitRandomFactor = 0.1;

    private enemyHP = 5;

    onLoad() {

    }

    start() {

    }

    wandering(dt: number) {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        if (currentTime >= this.nextMoveTime) {
            this.nextWaitTime = currentTime + this.moveDuration;
            this.nextMoveTime = this.nextWaitTime + this.waitDuration * (1.0 + this.waitRandomFactor * (Math.random() * 2.0 - 1.0));
            this.moveDir = randomPointOnUnitCircle();
        }
        if (currentTime < this.nextWaitTime) {
            this.node.x += this.moveDir.x * this.moveSpeed * dt;
            this.node.y += this.moveDir.y * this.moveSpeed * dt;
        }
    }

    tracing(dt: number) {
        let tmp = [];
        let targetPos: cc.Vec2 = cc.v2(0, 0)
        if(this.tracingPlayer) {
            targetPos = this.target.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        let nodePath = this.node.getComponent('pathFinding').pathFindingAlgo(targetPos);
        if (nodePath.length >= 6) {
            for (let i = 1; i <= 5; i++) {
                tmp.push(cc.moveBy(0.1, nodePath[i][0] * 16, nodePath[i][1] * 16 * -1));
            }
        }
        else {
            for (let i = 1; i < nodePath.length; i++) {
                tmp.push(cc.moveBy(0.1, nodePath[i][0] * 16, nodePath[i][1] * 16 * -1));

            }
        }

        if (tmp) {
            if(tmp.length >= 2)
                this.node.runAction(cc.sequence(tmp));
        }
    }

    detectRangePlayer() {
        //console.log(this.node.position.sub(this.player1.node.position).mag())
        if (this.node.convertToWorldSpaceAR(cc.v2(0, 0)).sub(this.target.convertToWorldSpaceAR(cc.v2(0, 0))).mag() < this.detectRange) {
            this.moveSpeed = 200;
            this.tracingPlayer = true;
        }


        return 0;
    }

    update(dt) {
        let currentTime = cc.director.getTotalTime() / 1000.0;

        if (!this.tracingPlayer) {
            this.wandering(dt);
            this.detectRangePlayer();
        }
        else {
            if (currentTime >= this.nextMoveTime) {
                this.nextMoveTime = currentTime + 0.5;
                this.tracing(dt);
            }
        }

    }

    onBeginContact(contact, self, other){
        if(other.node.name == 'player') {
        }
        else if (other.node.name == 'bullet') {
            this.enemyHP--;
            if(this.enemyHP <= 0) {
                this.node.active = false;
                this.node.destroy();
            }
        }
    }
}


function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
};
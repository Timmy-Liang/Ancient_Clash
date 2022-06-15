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
export default class enemy extends cc.Component {

    @property(player)
    player1: player = null;

    @property(player)
    player2: player = null;

    @property(cc.Node)
    mapNode: cc.Node = null

    private detectRange: number = 200;
    private attackRange: number = 5;
    private attackCooldown: number = 1;
    private moveSpeed: number = 40;
    public tracingPlayer: number = 0;

    private moveDir: cc.Vec2 = cc.Vec2.ZERO;
    private moveDuration = 2.0;
    private waitDuration = 2;
    private nextWaitTime = 0;
    private nextMoveTime = 0;
    private waitRandomFactor = 0.1;

    private path: Array<cc.Vec2> = null;

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
        this.path = [];
        let tmp = [];
        let targetPos: cc.Vec2 = cc.v2(0, 0)
        if (this.tracingPlayer == 1)
            targetPos = this.player1.node.convertToWorldSpaceAR(cc.v2(0, 0));
        else
            targetPos = this.player2.node.convertToWorldSpaceAR(cc.v2(0, 0));
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
        if (this.node.convertToWorldSpaceAR(cc.v2(0, 0)).sub(this.player1.node.convertToWorldSpaceAR(cc.v2(0, 0))).mag() < this.detectRange) {
            this.moveSpeed = 200;
            this.tracingPlayer = 1;
        }
        if (this.node.convertToWorldSpaceAR(cc.v2(0, 0)).sub(this.player2.node.convertToWorldSpaceAR(cc.v2(0, 0))).mag() < this.detectRange) {
            this.tracingPlayer = 2;
            this.moveSpeed = 200;
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
                console.log('tracing');
            }
        }

    }
}


function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
}
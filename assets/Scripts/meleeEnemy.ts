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
    private gameManager: cc.Node = null;

    private target: cc.Node = null;

    private detectRange: number = 200;
    private attackRange: number = 5;
    private attackCooldown: number = 1;
    private moveSpeed: number = 40;
    public tracingPlayer: boolean = false;

    private setPathCooldown: number = 0.5;
    private traceCooldown: number = 0.1;
    private traceSpeed: number = 160;
    private traceDifficulty: number = 1;
    private tracePath: Array<Array<number>> = [];

    private moveDir: cc.Vec2 = cc.Vec2.ZERO;
    private moveDuration: number = 2.0;
    private waitDuration: number = 2;
    private nextWaitTime: number = 0;
    private nextMoveTime: number = 0;
    private nextTraceTime: number = 0;
    private waitRandomFactor: number = 0.1;

    private enemyLife: number = 5;

    private enemyMaxLife: number = 5;

    private enemyLifeProgress: cc.Node = null;

    private anim: cc.Animation = null;

    private animateState = null;

    private attacking = null

    onLoad() {
    }

    start() {
        this.gameManager = cc.find("gameManager");
        let index = this.node.parent.name.slice(-1);
        try {
            let job = JSON.parse(cc.sys.localStorage.getItem("p" + index)).job;
            if (job) {
                this.target = cc.find("Canvas/player" + index).getChildByName(job);
            }
        }
        catch {

        }

        this.enemyLifeProgress = this.node.getChildByName('lifeBar');
        this.anim = this.getComponent(cc.Animation);
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

    setPath() {
        let tmp = [];
        let targetPos: cc.Vec2 = cc.v2(0, 0)
        if (this.tracingPlayer) {
            targetPos = this.target.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        this.tracePath = this.node.getComponent('pathFinding').pathFindingAlgo(targetPos);

    }

    detectRangePlayer() {
        //console.log(this.node.position.sub(this.player1.node.position).mag())
        if (this.node.convertToWorldSpaceAR(cc.v2(0, 0)).sub(this.target.convertToWorldSpaceAR(cc.v2(0, 0))).mag() < this.detectRange) {
            this.moveSpeed = 200;
            this.tracingPlayer = true;
        }
        return 0;
    }

    enemyWalkAnimation() {
        if (this.attacking)
            return;
        if (this.moveDir.x > 0) {
            if (this.animateState == null || this.animateState.name != 'walkRight')
                this.animateState = this.anim.play('walkRight');
        }
        else if (this.moveDir.x < 0) {
            if (this.animateState == null || this.animateState.name != 'walkLeft')
                this.animateState = this.anim.play('walkLeft');
        }
        else if (this.moveDir.y > 0) {
            if (this.animateState == null || this.animateState.name != 'walkUp')
                this.animateState = this.anim.play('walkUp');
        }
        else if (this.moveDir.y < 0) {
            if (this.animateState == null || this.animateState.name != 'walkDown')
                this.animateState = this.anim.play('walkDown');
        }
        else {
            this.animateState = null
            this.anim.stop();
        }

    }

    enemyAttackAnimation() {
        this.anim.stop();
        this.attacking = true;
        if (this.moveDir.x > 0) {
            this.animateState = this.anim.play('attackRight');
        }
        else if (this.moveDir.x < 0) {
            this.animateState = this.anim.play('attackLeft');
        }
        else if (this.moveDir.y > 0) {
            this.animateState = this.anim.play('attackUp');
        }
        else if (this.moveDir.y < 0) {
            this.animateState = this.anim.play('attackDown');
        }
        this.anim.on('finished', (e) => {
            this.attacking = false;
        })
    }

    enemyHurt(hp: number) {
        this.enemyLife -= hp;
        this.enemyLifeProgress.getComponent(cc.ProgressBar).progress = this.enemyLife / this.enemyMaxLife;
        if (this.enemyLife <= 0) {
            this.gameManager.getComponent("gamerManager").enemyReduce(this.node.x);
            this.node.active = false;
            this.node.destroy();
        }
    }

    update(dt) {
        let currentTime = cc.director.getTotalTime() / 1000.0;

        if (!this.tracingPlayer) {
            this.wandering(dt);
            this.detectRangePlayer();
        }
        else {
            if (currentTime >= this.nextTraceTime) {
                this.nextTraceTime = currentTime + this.setPathCooldown;
                this.setPath();
                this.nextMoveTime = currentTime;
            }
            if (currentTime >= this.nextMoveTime) {
                if (this.tracePath.length > 0) {
                    let nextStep = this.tracePath.pop();
                    this.moveDir = cc.v2(nextStep[0], nextStep[1] * -1)
                    this.nextMoveTime = currentTime + this.traceCooldown;
                }
            }

            this.node.x += this.moveDir.x * this.traceSpeed * dt;
            this.node.y += this.moveDir.y * this.traceSpeed * dt;
        }
        this.enemyWalkAnimation();
    }

    onBeginContact(contact, self, other) {
        if (other.node.name == 'player') {
            this.enemyAttackAnimation();
            other.node.getComponent(player).lifeDamage(1);
        }
        else if (other.node.name == 'bullet') {
            this.enemyHurt(1);
        }
    }

    onPreSolve(contact, self, other) {
        if (this.attacking)
            return;
        if (other.node.name == 'player') {
            this.enemyAttackAnimation();
            other.node.getComponent(player).lifeDamage(1);
        }
    }


}


function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
};
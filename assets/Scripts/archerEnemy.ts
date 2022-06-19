// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import player from './player'
import enemyBullet from './enemyBullet'
const {ccclass, property} = cc._decorator;

@ccclass
export default class archerEnemy extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;
    @property(cc.AudioClip)
    attackSound: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    killedSound: cc.AudioClip = null;
    private gameManager: cc.Node = null;

    private target: cc.Node = null;

    private detectRange: number = 300;
    private attackRange: number = 5;
    private attackCooldown: number = 2;
    private nextAttackTime: number = 0;
    
    private moveSpeed: number = 70;
    private moveDir: cc.Vec2 = cc.Vec2.ZERO;
    private moveDuration: number = 2.0;
    private waitDuration: number = 2;
    private nextWaitTime: number = 0;
    private nextMoveTime: number = 0;
    private nextTraceTime: number = 0;
    private waitRandomFactor: number = 0.1;

    private enemyLife: number = 85;
    private enemyMaxLife: number = 85;
    private enemyLifeProgress: cc.Node = null;

    private anim: cc.Animation = null;
    private animateState = null;

    private attacking: boolean = false
    private aiming: boolean = false;
    private targetDirection: string = '';
    private targetAngle: number = 0;
    private targetPosition: cc.Vec2 = cc.v2(0, 0);

    private damage: number = 10;
    

    onLoad() {
        
    }

    start() {
        this.gameManager=cc.find("gameManager");
        let index = this.node.parent.name.slice(-1);
        try {
            let job = JSON.parse(cc.sys.localStorage.getItem("p" + index)).job;
            console.log("JOB " + job)
            if(job)
                this.target = cc.find("Canvas/player" + index).getChildByName(job);  
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

    detectRangePlayer() {
        if (this.node.convertToWorldSpaceAR(cc.v2(0, 0)).sub(this.target.convertToWorldSpaceAR(cc.v2(0, 0))).mag() < this.detectRange) {
            this.aiming = true;
        }
        else {
            this.aiming = false;
        }
        return 0;
    }

    enemyWalkAnimation() {
        if (this.attacking || this.aiming)
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
        cc.audioEngine.playEffect(this.attackSound,false);
        if (this.targetDirection == 'E') {
            this.animateState = this.anim.play('attackRight');
        }
        else if (this.targetDirection == 'W') {
            this.animateState = this.anim.play('attackLeft');
        }
        else if (this.targetDirection == 'N') {
            this.animateState = this.anim.play('attackUp');
        }
        else if (this.targetDirection == 'S') {
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
            cc.audioEngine.playEffect(this.killedSound,false);
            this.node.active = false;
            if(this.node.parent.name=="enemy1")this.gameManager.getComponent("gamerManager").addcoin(1,15);
            else if(this.node.parent.name=="enemy2")this.gameManager.getComponent("gamerManager").addcoin(2,15);
            this.gameManager.getComponent("gamerManager").enemyReduce(this.node.x);
            this.node.destroy();
        }
    }

    createBullet () {
        let bullet = cc.instantiate(this.bulletPrefab);
        let currentPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        this.targetPosition = this.target.convertToWorldSpaceAR(cc.v2(0, 0))
        this.targetAngle = calcAngleDegrees(this.targetPosition.x - currentPos.x, this.targetPosition.y - currentPos.y);
        if (this.targetAngle < 45 && this.targetAngle >= -45) {
            this.targetDirection = 'E';
        }
        else if (this.targetAngle < 135 && this.targetAngle >= 45) {
            this.targetDirection = 'N'
        }
        else if (this.targetAngle < 225 && this.targetAngle >= 135) {
            this.targetDirection = 'W';
        }
        else{
            this.targetDirection = 'S';
        }
        bullet.getComponent('enemyBullet').init(this.node, this.targetDirection, this.targetAngle);

    }

    update(dt) {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        this.detectRangePlayer();
        if (!this.aiming) {
            this.wandering(dt);
        }
        else {
            if(currentTime >= this.nextAttackTime) {
                this.nextAttackTime = currentTime + this.attackCooldown;
                this.createBullet();
                this.enemyAttackAnimation();
            }
        }
        this.enemyWalkAnimation();
    }

    onBeginContact(contact, self, other) {
        if (other.tag == 1) {
            other.node.getComponent(player).lifeDamage(this.damage);
        }
    }
}


function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}


function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
};
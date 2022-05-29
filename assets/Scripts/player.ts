// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const { ccclass, property } = cc._decorator;

@ccclass
export default class player extends cc.Component {

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    private moveDir: string = 'S';

    private speed: number = 250;

    private anim: cc.Animation = null;

    private animateState = null;

    private maxBullet: number = 5;

    private bulletPool: cc.NodePool = null;

    private nextAttackTime: number = 0;

    private nextReloadTime: number = 0;

    private attackCooldown: number = 0.2;

    private reloadCooldown: number = 5;


    private tmp;

    onLoad () {
        this.bulletPool = new cc.NodePool('bullet');
        this.anim = this.getComponent(cc.Animation);
    }

    start() {
        for(let i: number = 0; i < this.maxBullet; i++) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }

    }

    playerMoveDir(dir: string) {
        this.moveDir = dir;
    }

    playerMove(dt: number) {

        switch (this.moveDir) {
            case 'N':
                this.node.y += this.speed * dt;
                break;
            case 'S':
                this.node.y -= this.speed * dt;
                break;
            case 'E':
                this.node.x += this.speed * dt;
                break;
            case 'W':
                this.node.x -= this.speed * dt;
                break;
            case 'NE':
                this.node.x += this.speed * dt;
                this.node.y += this.speed * dt;
                break;
            case 'NW':
                this.node.x -= this.speed * dt;
                this.node.y += this.speed * dt;
                break;
            case 'SW':
                this.node.x -= this.speed * dt;
                this.node.y -= this.speed * dt;
                break;
            case 'SE':
                this.node.x += this.speed * dt;
                this.node.y -= this.speed * dt;
                break;

        }
    }

    playerAnimation() {
        switch (this.moveDir) {
            case 'N':
                if(this.animateState == null || this.animateState.name != 'playerWalkN')
                    this.animateState = this.anim.play('playerWalkN');
                break;
            case 'S':
                if(this.animateState == null || this.animateState.name != 'playerWalkS')
                    this.animateState = this.anim.play('playerWalkS');
                break;
            case 'E':
                if(this.animateState == null || this.animateState.name != 'playerWalkE')
                    this.animateState = this.anim.play('playerWalkE');
                break;
            case 'W':
                if(this.animateState == null || this.animateState.name != 'playerWalkW')
                    this.animateState = this.anim.play('playerWalkW');
                break;
            case 'NE':
                if(this.animateState == null || this.animateState.name != 'playerWalkNE')
                    this.animateState = this.anim.play('playerWalkNE');
                break;
            case 'NW':
                if(this.animateState == null || this.animateState.name != 'playerWalkNW')
                    this.animateState = this.anim.play('playerWalkNW');
                break;
            case 'SW':
                if(this.animateState == null || this.animateState.name != 'playerWalkSW')
                    this.animateState = this.anim.play('playerWalkSW');
                break;
            case 'SE':
                if(this.animateState == null || this.animateState.name != 'playerWalkSE')
                    this.animateState = this.anim.play('playerWalkSE');
                break;
            default:
                this.anim.stop();
                break;
        }
    }

    playerAttack() {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        if(currentTime >= this.nextAttackTime){
            this.nextAttackTime = currentTime + this.attackCooldown;
            this.createBullet();
        }
    }   

    createBullet() {
        let bullet = null;
        if (this.bulletPool.size() > 0){
            bullet = this.bulletPool.get(this.bulletPool);
        }

        if(bullet != null)
            bullet.getComponent('bullet').init(this.node);
    }

    update(dt) {
               
        this.playerMove(dt);
        this.playerAnimation();
        
    }
}

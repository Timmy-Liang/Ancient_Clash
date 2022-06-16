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
    
    private attacking: boolean = false;

    private enemys: cc.Node = null;

    private enemyCount: number = 0;

    private targetPosition: cc.Vec2 = cc.v2(0, 0);

    private targetDirection: string = '';

    private nextTraceTime: number = 0;

    private traceCooldown: number = 0.5;

    private life: number = 10;

    private lifeMax: number = 10;

    private lifeprogress: cc.Node = null;


    onLoad () {
        this.bulletPool = new cc.NodePool('bullet');
        this.anim = this.getComponent(cc.Animation);
        this.lifeprogress = this.node.getChildByName('lifeBar');
        this.enemys = cc.find("Canvas/enemy");
        this.enemyCount = this.enemys.childrenCount;
    }

    start() {
        for(let i: number = 0; i < this.maxBullet; i++) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
        if (this.lifeprogress == null) cc.log("fail");
        else this.lifeprogress.getComponent(cc.ProgressBar).progress = 1;
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

    playerWalkAnimation() {
        if(this.attacking)
            return; 
            
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

    playerAttackAnimation() {
        let angle = calcAngleDegrees(this.targetPosition.x - this.node.x, this.targetPosition.y - this.node.y);
        if(angle < 157.5 && angle >= 112.5){
            this.targetDirection = 'NW';
        }
        else if(angle < 112.5 && angle >= 67.5) {
            this.targetDirection = 'N'
        }
        else if(angle < 67.5 && angle >= 22.5) {
            this.targetDirection = 'NE';
        }
        else if(angle < 22.5 && angle >= -22.5) {
            this.targetDirection = 'E';
        }
        else if(angle < -22.5 && angle >= -67.5){
            this.targetDirection = 'SE';
        }
        else if(angle < -67.5 && angle >= -112.5){
            this.targetDirection = 'S';
        }
        else if(angle < -112.5 && angle >= -157.5) {
            this.targetDirection = 'SW';
        }
        else{
            this.targetDirection = 'W';
        }
        this.anim.stop();
        this.attacking = true;
        this.animateState = this.anim.play('playerAttack' + this.targetDirection);
        this.anim.on('finished', (e) =>{
            this.attacking = false;
        })
    }

    playerAttack() {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        if(currentTime >= this.nextAttackTime){
            this.nextAttackTime = currentTime + this.attackCooldown;
            this.createBullet();
            this.playerAttackAnimation();
        }
    }   

    createBullet() {
        let bullet = null;
        if (this.bulletPool.size() > 0){
            bullet = this.bulletPool.get(this.bulletPool);
        }

        if(bullet != null)
            bullet.getComponent('bullet').init(this.node, this.targetPosition, this.targetDirection);
    }
    
    traceEnemy() {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        if(currentTime >= this.nextTraceTime){
            this.nextTraceTime = currentTime + this.traceCooldown;
            let nextTargetDistance = 9007199254740992; // INT_MAX
            let nextTargetPosition = cc.v2(0, 0);
            this.enemyCount = this.enemys.childrenCount;
            for(let i = 0; i < this.enemyCount; i++){
                let enemyPos = this.enemys.children[i].convertToWorldSpaceAR(cc.v3(0, 0, 0));
                let currentPos = this.node.convertToWorldSpaceAR(cc.v3(0, 0, 0));
                let currentDistance = currentPos.sub(enemyPos).mag();
                if(currentDistance < nextTargetDistance) {
                    nextTargetDistance = currentDistance;
                    nextTargetPosition = cc.v2(enemyPos.x, enemyPos.y);
                }
            }
            this.targetPosition = nextTargetPosition;
        }
    }

    lifeDamage(damage: number) {
        if (this.life > 0) this.life -= damage;
    }

    update(dt) {
        this.playerMove(dt);
        this.playerWalkAnimation();
        this.traceEnemy();
        this.lifeprogress.getComponent(cc.ProgressBar).progress = this.life/this.lifeMax;
    }
}


function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}
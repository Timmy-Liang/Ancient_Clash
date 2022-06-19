const { ccclass, property } = cc._decorator;

@ccclass
export default class player extends cc.Component {

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private powerBulletprefab: cc.Prefab = null;

    private moveDir: string = 'S';
    private aimDir: cc.Vec2 = cc.v2(0, 0);
    private speed: number = 250;

    private anim: cc.Animation = null;
    private animateState = null;

    private maxBullet: number = 5;
    private bulletPool: cc.NodePool = null;
    private powerBulletpool: cc.NodePool = null;
    private nextAttackTime: number = 0;
    private nextReloadTime: number = 0;
    private attackCooldown: number = 0.5;
    private powerCooltime: number= 5;
    private reloadCooldown: number = 5;
    private attackRange: number = 300;
    private attacking: boolean = false;
    private rangeTarget: object = {};

    private powerCooldown: boolean = false;

    private enemys: cc.Node = null;
    private enemyCount: number = 0;
    private targetPosition: cc.Vec2 = cc.v2(0, 0);
    private targetDirection: string = '';
    private targetAngle: number = 0;

    private life: number = 10;
    private lifeMax: number = 10;
    private lifeprogress: cc.Node = null;
    private powerprogress: cc.Node = null;
    private colorOfpower: cc.Node= null;

    private characterName: string = 'archer';
    private characterTag: number = 0;


    onLoad() {
        this.bulletPool = new cc.NodePool('bullet');
        this.powerBulletpool= new cc.NodePool('powerBullet');
        this.anim = this.getComponent(cc.Animation);
        this.lifeprogress = this.node.getChildByName('lifeBar');
        this.powerprogress = this.node.getChildByName('powerBar');
        this.colorOfpower= this.powerprogress.getChildByName('bar');
        let index = this.node.parent.name.slice(-1);
        this.enemys = cc.find("Canvas/enemy" + index);
        this.enemyCount = this.enemys.childrenCount;
        try {
            let currentCharacter = JSON.parse(cc.sys.localStorage.getItem("p" + index)).job;
            if (currentCharacter) {
                this.characterName = currentCharacter;
                switch (currentCharacter) {
                    case 'archer':
                        this.characterTag = 0;
                        break;
                    case 'slinger':
                        this.characterTag = 1;
                        break;
                    case 'warrior':
                        this.characterTag = 2;
                        break;
                    case 'knight':
                        this.characterTag = 3;
                        break;
                }
            }
        }
        catch {

        };
    }

    start() {
        for (let i: number = 0; i < this.maxBullet; i++) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
        let powerBullet= cc.instantiate(this.powerBulletprefab);
        this.powerBulletpool.put(powerBullet);

        if (this.lifeprogress == null) cc.log("fail");
        else this.lifeprogress.getComponent(cc.ProgressBar).progress = 1;
        this.powerprogress.getComponent(cc.ProgressBar).progress = 1;
        this.colorOfpower.color=new cc.Color(0, 255, 80);
    }

    playerMoveDir(dir: string) {
        this.moveDir = dir;
    }

    playerMove(dt: number) {
        switch (this.moveDir) {
            case 'N':
                this.aimDir = cc.v2(0, 1)
                this.node.y += this.speed * dt;
                break;
            case 'S':
                this.aimDir = cc.v2(0, -1)
                this.node.y -= this.speed * dt;
                break;
            case 'E':
                this.aimDir = cc.v2(1, 0)
                this.node.x += this.speed * dt;
                break;
            case 'W':
                this.aimDir = cc.v2(-1, 0)
                this.node.x -= this.speed * dt;
                break;
            case 'NE':
                this.aimDir = cc.v2(1, 1)
                this.node.x += this.speed * dt;
                this.node.y += this.speed * dt;
                break;
            case 'NW':
                this.aimDir = cc.v2(-1, 1)
                this.node.x -= this.speed * dt;
                this.node.y += this.speed * dt;
                break;
            case 'SW':
                this.aimDir = cc.v2(-1, -1)
                this.node.x -= this.speed * dt;
                this.node.y -= this.speed * dt;
                break;
            case 'SE':
                this.aimDir = cc.v2(1, -1)
                this.node.x += this.speed * dt;
                this.node.y -= this.speed * dt;
                break;

        }
    }

    playerWalkAnimation() {
        if (this.attacking)
            return;

        switch (this.moveDir) {
            case 'N':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkN')
                    this.animateState = this.anim.play(this.characterName + 'WalkN');
                break;
            case 'S':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkS')
                    this.animateState = this.anim.play(this.characterName + 'WalkS');
                break;
            case 'E':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkE')
                    this.animateState = this.anim.play(this.characterName + 'WalkE');
                break;
            case 'W':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkW')
                    this.animateState = this.anim.play(this.characterName + 'WalkW');
                break;
            case 'NE':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkNE')
                    this.animateState = this.anim.play(this.characterName + 'WalkNE');
                break;
            case 'NW':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkNW')
                    this.animateState = this.anim.play(this.characterName + 'WalkNW');
                break;
            case 'SW':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkSW')
                    this.animateState = this.anim.play(this.characterName + 'WalkSW');
                break;
            case 'SE':
                if (this.animateState == null || this.animateState.name != this.characterName + 'WalkSE')
                    this.animateState = this.anim.play(this.characterName + 'WalkSE');
                break;
            default:
                this.animateState = null
                this.anim.stop();
                break;
        }
    }

    playerAttackAnimation() {
        this.anim.stop();
        this.attacking = true;
        this.animateState = this.anim.play(this.characterName + 'Attack' + this.targetDirection);
        this.anim.on('finished', (e) => {
            this.attacking = false;
        })
    }

    playerAttack() {
        this.traceEnemy();
        let currentTime = cc.director.getTotalTime() / 1000.0;
        if (currentTime >= this.nextAttackTime) {
            this.nextAttackTime = currentTime + this.attackCooldown;
            if(this.characterTag == 0 || this.characterTag == 1){
                this.createBullet();
            }
            else{ 
                this.meleeAttack();
            }
            this.playerAttackAnimation();
        }
    }

    playerPower() {
        if (!this.powerCooldown) {
            this.powerCooldown = true;
            this.powerprogress.getComponent(cc.ProgressBar).progress=0;
            this.colorOfpower.color=new cc.Color(25, 95, 25);
            if(this.characterTag==0){
                this.schedule(() => {
                    this.traceEnemy();
                    this.createBullet();
                    this.playerAttackAnimation();
                }, 0.2, 4)
            }
            else if(this.characterTag==1){
                this.traceEnemy();
                let powerBullet=null;
                if(this.powerBulletpool.size()>0) powerBullet=this.powerBulletpool.get(this.powerBulletpool); 
                if(powerBullet != null) powerBullet.getComponent('powerBullet').init(this.node, this.targetDirection, this.targetAngle);

                this.playerAttackAnimation();
            }

            else if(this.characterTag==2){
                this.attackCooldown=0.25;
                this.node.color=new cc.Color(248, 86, 86);
                this.scheduleOnce(() => {
                    this.attackCooldown=0.5;
                    this.node.color=new cc.Color(255, 255, 255);
                }, 2.5)
            }

            else if(this.characterTag==3){
                this.node.color=new cc.Color(134, 250, 255);
                this.scheduleOnce(() => {
                    this.node.color=new cc.Color(255, 255, 255);
                }, 2.5)
            }
            this.scheduleOnce(() => {
                this.setPowerCooldown(0);
                this.colorOfpower.color=new cc.Color(0, 255, 80);
            }, this.powerCooltime)
        }
    }

    setPowerCooldown(num) {
        if (!num) this.powerCooldown = false;
    }

    createBullet() {
        let bullet = null;
        if (this.bulletPool.size() > 0) {
            console.log("HERE")
            bullet = this.bulletPool.get(this.bulletPool);
        }

        if (bullet != null)
            bullet.getComponent('bullet').init(this.node, this.targetDirection, this.targetAngle);
    }

    meleeAttack() {
        for(var prop in this.rangeTarget) {
            let currentPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
            let enemyPosition = this.rangeTarget[prop];
            let nextTargetAngle = calcAngleDegrees(enemyPosition.x - currentPosition.x, enemyPosition.y - currentPosition.y)
            if(nextTargetAngle < this.targetAngle + 22.5 && nextTargetAngle > (this.targetAngle - 22.5) % 360){ // ERROR 
                let currentEnemy = this.enemys.children[prop]
                console.log(currentEnemy.name);
                currentEnemy.getComponent(currentEnemy.name).enemyHurt(1);
            }
                
        }
    }

    traceEnemy() {
        let nextTargetDistance = 9007199254740992; // INT_MAX
        let nextTargetPosition = cc.v2(0, 0);
        let currentPos = this.node.convertToWorldSpaceAR(cc.v3(0, 0, 0));
        this.enemyCount = this.enemys.childrenCount;
        for (let i = 0; i < this.enemyCount; i++) {
            let enemyPos = this.enemys.children[i].convertToWorldSpaceAR(cc.v3(0, 0, 0));
            let currentDistance = currentPos.sub(enemyPos).mag();
            if (currentDistance < nextTargetDistance) {
                nextTargetDistance = currentDistance;
                nextTargetPosition = cc.v2(enemyPos.x, enemyPos.y);
            }
            if (currentDistance <= this.attackRange) {
                this.rangeTarget[i] = cc.v2(enemyPos.x, enemyPos.y)
            }
        }

        let diff = cc.v2(nextTargetPosition.x - currentPos.x, nextTargetPosition.y - currentPos.y)
        if (diff.mag() > this.attackRange)
            this.targetPosition = cc.v2(currentPos.x + this.aimDir.x * this.attackRange, currentPos.y + this.aimDir.y * this.attackRange);
        else 
            this.targetPosition = nextTargetPosition;
        
        this.targetAngle = calcAngleDegrees(this.targetPosition.x - currentPos.x, this.targetPosition.y - currentPos.y);
        if (this.targetAngle < 157.5 && this.targetAngle >= 112.5) {
            this.targetDirection = 'NW';
        }
        else if (this.targetAngle < 112.5 && this.targetAngle >= 67.5) {
            this.targetDirection = 'N'
        }
        else if (this.targetAngle < 67.5 && this.targetAngle >= 22.5) {
            this.targetDirection = 'NE';
        }
        else if (this.targetAngle < 22.5 && this.targetAngle >= -22.5) {
            this.targetDirection = 'E';
        }
        else if (this.targetAngle < -22.5 && this.targetAngle >= -67.5) {
            this.targetDirection = 'SE';
        }
        else if (this.targetAngle < -67.5 && this.targetAngle >= -112.5) {
            this.targetDirection = 'S';
        }
        else if (this.targetAngle < -112.5 && this.targetAngle >= -157.5) {
            this.targetDirection = 'SW';
        }
        else {
            this.targetDirection = 'W';
        }
    }

    lifeDamage(damage: number) {
        if (this.life > 0) this.life -= damage;
    }

    update(dt) {
        this.playerMove(dt);
        this.playerWalkAnimation();
        this.lifeprogress.getComponent(cc.ProgressBar).progress = this.life / this.lifeMax;
        if(this.powerCooldown) this.powerprogress.getComponent(cc.ProgressBar).progress+=dt/this.powerCooltime;
    }
}


function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}
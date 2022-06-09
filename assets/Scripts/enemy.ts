import player from './player'
const { ccclass, property } = cc._decorator;

@ccclass
export default class enemy extends cc.Component {
  @property(player)
  player1: player = null;

  @property(player)
  player2: player = null;


  private detectRange: number = 100;
  private attackRange: number = 5;
  private attackCooldown: number = 1;
  private moveSpeed: number = 40;
  private tracingPlayer: number = 0;

  private moveDir: cc.Vec2 = cc.Vec2.ZERO;
  private moveDuration = 2.0;
  private waitDuration = 1.5;
  private nextWaitTime = 0;
  private nextMoveTime = 0;
  private waitRandomFactor = 0.1;

  private life = 5;
 
  onLoad() {
    
  }

  start() {
  }

  wandering(dt: number) {
    let currentTime = cc.director.getTotalTime() / 1000.0;
    if (currentTime >= this.nextMoveTime) {
      this.nextWaitTime = currentTime + this.moveDuration;
      this.nextMoveTime =
        this.nextWaitTime +
        this.waitDuration *
          (1.0 + this.waitRandomFactor * (Math.random() * 2.0 - 1.0));
      this.moveDir = randomPointOnUnitCircle();
    }
    if (currentTime < this.nextWaitTime) {
      this.node.x += this.moveDir.x * this.moveSpeed * dt;
      this.node.y += this.moveDir.y * this.moveSpeed * dt;
    }
  }

  tracing(dt: number) {
    let _dir: cc.Vec3 = cc.v3(0, 0, 0);
    if (this.tracingPlayer == 1)
      _dir = this.player1.node.position.sub(this.node.position).normalize();
    else _dir = this.player2.node.position.sub(this.node.position).normalize();
    this.moveDir = cc.v2(_dir.x, _dir.y);

    this.node.x += this.moveDir.x * this.moveSpeed * dt;
    this.node.y += this.moveDir.y * this.moveSpeed * dt;
  }

  detectRangePlayer() {
    if (
      this.node.position.sub(this.player1.node.position).mag() <
      this.detectRange
    ) {
      this.moveSpeed = 200;
      this.tracingPlayer = 1;
    }
    if (
      this.node.position.sub(this.player2.node.position).mag() <
      this.detectRange
    ) {
      this.tracingPlayer = 2;
      this.moveSpeed = 200;
    }

    return 0;
  }
  
 
  update(dt) {
    if (!this.tracingPlayer) {
      this.wandering(dt);
      this.detectRangePlayer();
    } else {
      this.tracing(dt);
    }
  }
}


function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
}
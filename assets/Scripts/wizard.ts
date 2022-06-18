import player from './player'
const { ccclass, property } = cc._decorator;

@ccclass
export default class wizard extends cc.Component {
  @property(cc.Prefab)
  targetRegion: cc.Prefab = null;
  @property(cc.Prefab)
  fire: cc.Prefab = null;
  @property(cc.Node)
  gameManager: cc.Node = null;


  private player: cc.Node = null;
  private map: cc.Node = null;
  private moveSpeed: number = 40;
  public tracingPlayer: boolean = false;

  private moveDir: cc.Vec2 = cc.Vec2.ZERO;
  private moveDuration: number = 2.0;
  private waitDuration: number = 2;
  private nextWaitTime: number = 0;
  private nextMoveTime: number = 0;
  private waitRandomFactor: number = 0.1;

  private wizardLife: number = 10;
  private wizardMaxLife: number = 5;
  private wizardLifeProgress: cc.Node = null;
  private target: cc.Node = null;

  private targetRange: number = 5;
  private targetGenerate;
  private damage: number = 5;
  
  onLoad() {
    this.gameManager=cc.find("gameManager");
    let index = this.node.parent.name.slice(-1);
    //let job = JSON.parse(cc.sys.localStorage.getItem("p" + index)).job;
    //if (!job) job = "archer";
    let job = "archer";
    this.player = cc.find("Canvas/player" + index).getChildByName(job);
    this.map = cc.find("Canvas/map1_" + index);
    this.wizardLifeProgress = this.node.getChildByName("lifeBar");
  }
  start() {
    this.targetGenerate = () => {
      this.generateTargetRegion();
    };

    this.schedule(this.targetGenerate, 10);
  }

  generateTargetRegion() {
    this.target = cc.instantiate(this.targetRegion);
    let pos;
    this.target.scale = this.targetRange;
    this.target.parent = this.map;

    let choosenX = 1700 - (this.targetRange - 1) * 190;
    let choosenY = 1700 - (this.targetRange - 1) * 190;
    pos = cc.v2(
      100 + (this.targetRange - 1) * 95 + Math.floor(Math.random() * choosenX),
      100 + (this.targetRange - 1) * 95 + Math.floor(Math.random() * choosenY)
    );
    this.target.setPosition(pos);

    this.scheduleOnce(() => {
      if (this.isInCycle(this.target)) {
        //console.log("yes");
        this.player.getComponent("player").lifeDamage(this.damage);
        this.explosion(pos);
      }
      this.target.destroy();
    }, 4);
  }
  explosion(pos: number) {
    let fire = cc.instantiate(this.fire);
    fire.scale = this.targetRange;
    fire.parent = this.map;

    fire.setPosition(pos);
    this.scheduleOnce(() => {
      fire.destroy();
    }, 1.1);
  }

  isInCycle(target: cc.Node) {
    let radius = 75 * this.targetRange;
    //(px-tx)^2 + (py-ty)^2 <= r^2
    let targetPos = target.convertToWorldSpaceAR(cc.v2(0, 0));
    let playerPos = this.player.convertToWorldSpaceAR(cc.v2(0, 0));
    let w = playerPos.x - targetPos.x;
    let h = playerPos.y - targetPos.y;
    if (w * w + h * h <= radius * radius) return true;
    else return false;
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

  onBeginContact(contact, self, other) {
    if (other.node.name == "bullet") {
      this.wizardLife--;
      this.wizardLifeProgress.getComponent(cc.ProgressBar).progress =
        this.wizardLife / this.wizardMaxLife;
      if (this.wizardLife <= 0) {
        this.gameManager.getComponent("gamerManager").enemyReduce(this.node.x);
        this.node.active = false;
        if (this.target != null) this.target.destroy();
        this.node.destroy();
      }
    }
  }

  update(dt) {
    if (this.wizardLife <= 0) {
      this.unschedule(this.targetGenerate);
    }
    this.wandering(dt);
  }
}

function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
};

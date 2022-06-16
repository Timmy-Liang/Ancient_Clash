const { ccclass, property } = cc._decorator;

@ccclass
export default class wizard extends cc.Component {
  @property(cc.Prefab)
  targetRegion: cc.Prefab = null;
  @property(cc.Prefab)
  fire: cc.Prefab = null;
  @property(cc.Node)
  player: cc.Node = null;
  @property(cc.Node)
  map: cc.Node = null;

  private wizardLife: number = 10;
  private targetRange: number = 3; //recommand : 1<= range <= 6
  private targetGenerate;

  // onLoad () {}

  start() {
    this.targetGenerate = () => {
      this.generateTargetRegion();
    };

    this.schedule(this.targetGenerate, 10);
  }

  generateTargetRegion() {
    let target = cc.instantiate(this.targetRegion);
    let pos;
    target.scale = this.targetRange;
    target.parent = this.map;
    
    let choosenX = 1655 - (this.targetRange- 1) * 224;
    let choosenY = 1775 - (this.targetRange - 1) * 160;
    pos = cc.v2(
      130 + (this.targetRange - 1) * 112 + Math.floor(Math.random() * choosenX),
      60 + (this.targetRange - 1) * 80 + Math.floor(Math.random() * choosenY)
    );
    target.setPosition(pos);

    this.scheduleOnce(() => {
      this.explosion(pos);
      target.destroy();
    }, 4.8);
  }
  explosion(pos: number) {
    let fire = cc.instantiate(this.fire);
    fire.scale = this.targetRange;
    fire.parent = this.map;
    
    fire.setPosition(pos);
    this.scheduleOnce(() => {
      fire.destroy();
    }, 3.2);
  }
  update(dt) {
    if (this.wizardLife <= 0) {
       this.unschedule(this.targetGenerate);
    }
  }
}

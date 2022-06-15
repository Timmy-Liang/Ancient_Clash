const { ccclass, property } = cc._decorator;

@ccclass
export default class wizard extends cc.Component {
  @property(cc.Prefab)
  targetRegion: cc.Prefab = null;
  @property(cc.Prefab)
  fire: cc.Prefab = null;

  private wizardLeft;
  private wizardRight;

  coolTime: number = 10;
  range: number = 3; //recommand: 1 <= range <= 6
  die1: boolean = false;
  die2: boolean = false;

  // onLoad () {}

  start() {
    this.wizardLeft = () => {
      this.generateTargetRegion(false);
    };
    this.wizardRight = () => {
      this.generateTargetRegion(true);
    };

    this.schedule(this.wizardLeft, 10);
    this.schedule(this.wizardRight, 10);
  }

  generateTargetRegion(dir: boolean) {
    let targetL = cc.instantiate(this.targetRegion);
    let pos;
    targetL.scale = this.range;
    if (dir == false) {
      targetL.parent = cc.find("Canvas/map1_1");
    } else {
      targetL.parent = cc.find("Canvas/map1_2");
    }
    let choosenX = 1655 - (this.range - 1) * 224;
    let choosenY = 1775 - (this.range - 1) * 160;
    pos = cc.v2(
      130 + (this.range - 1) * 112 + Math.floor(Math.random() * choosenX),
      60 + (this.range - 1) * 80 + Math.floor(Math.random() * choosenY)
    );
    targetL.setPosition(pos);

    this.scheduleOnce(() => {
      this.explosion(dir, pos);
      targetL.destroy();
    }, 4.8);
  }
  explosion(mapIndex: boolean, pos: number) {
    let fire = cc.instantiate(this.fire);
    fire.scale = this.range;
    if (mapIndex == false) {
      fire.parent = cc.find("Canvas/map1_1");
    } else {
      fire.parent = cc.find("Canvas/map1_2");
    }
    fire.setPosition(pos);
    this.scheduleOnce(() => {
      fire.destroy();
    }, 3.2);
  }
  update(dt) {
    if (this.die1) {
      this.unschedule(this.wizardLeft);
    }
    if (this.die2) {
      this.unschedule(this.wizardRight);
    }
  }
}

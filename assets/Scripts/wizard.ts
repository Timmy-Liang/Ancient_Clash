const {ccclass, property} = cc._decorator;

@ccclass
export default class wizard extends cc.Component {

    @property(cc.Prefab)
    targetRegion: cc.Prefab = null;
    @property(cc.Prefab)
    fire: cc.Prefab = null;

    private targetPos;
    private fireAni;
  // onLoad () {}

  start() {
      this.generateTargetL();
  }

  generateTargetL() {
    let targetL = cc.instantiate(this.targetRegion);
    targetL.parent = cc.find("Canvas/map1_1");
    this.targetPos = cc.v2(1450, 900);
    targetL.setPosition(this.targetPos);
    //targetL.setPosition(Math.floor(Math.random()*100), Math.floor(Math.random()*100));
    this.scheduleOnce(()=>{
        this.explosion();
        targetL.destroy();
    }, 4.8);
  }
  explosion(){
    let fire = cc.instantiate(this.fire);
    this.fireAni = fire.getComponents(cc.Animation);
    fire.parent = cc.find("Canvas/map1_1");
    fire.setPosition(this.targetPos);
    this.scheduleOnce(()=>{
        fire.destroy();
    }, 3.2);
    /*this.fireAni.once("finished", () => {
        fire.destroy();
    }, this);*/
  }
  // update (dt) {}
}

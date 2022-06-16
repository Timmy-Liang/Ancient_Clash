// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import player from './player'
const {ccclass, property} = cc._decorator;
const keyboardInput = {};


@ccclass
export default class gameManager extends cc.Component {
  @property(player)
  player1: player = null;

  @property(player)
  player2: player = null;

  @property(cc.TiledMap)
  mapLeft: cc.TiledMap = null;
  // set map anchor (0, 0)
  @property(cc.TiledMap)
  mapRight: cc.TiledMap = null;

  private pause: boolean = false;

  private physicManager: cc.PhysicsManager = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.physicManager = cc.director.getPhysicsManager();
    this.physicManager.enabled = true;
  }

  start() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    let tiledSize = this.mapLeft.getTileSize();
    let layer = this.mapLeft.getLayer("wall");
    let layerSize = layer.getLayerSize();
     //check each tiled
    let count = 0;
    for (let i = 0; i < layerSize.width; i++) {
      for (let j = 0; j < layerSize.height; j++) {
        let tiled = layer.getTiledTileAt(i, j, true);
        //console.log("checking " + i + " " + j );
        if (tiled.gid != 0) {
          tiled.node.group = "wall";

          let body = tiled.node.addComponent(cc.RigidBody);
          body.type = cc.RigidBodyType.Static;
          let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
          collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
          collider.size = tiledSize;
          collider.apply();
        }
      }
    }
    tiledSize = this.mapRight.getTileSize();
    layer = this.mapRight.getLayer("wall");
    layerSize = layer.getLayerSize();
     //check each tiled
     for (let i = 0; i < layerSize.width; i++) {
       for (let j = 0; j < layerSize.height; j++) {
         let tiled = layer.getTiledTileAt(i, j, true);
         //console.log("checking " + i + " " + j );
         if (tiled.gid != 0) {
           tiled.node.group = "wall";
           let body = tiled.node.addComponent(cc.RigidBody);
           body.type = cc.RigidBodyType.Static;
           let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
           collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
           collider.size = tiledSize;
           collider.apply();
         }
       }
     }
  }


  onKeyDown(event) {
    keyboardInput[event.keyCode] = 1;
    //this simulates the player got hurt"
    if (keyboardInput[cc.macro.KEY.v]) {
      this.player1.lifeDamage(2);
      console.log("v");
    }
    if (keyboardInput[cc.macro.KEY.n]) {
      this.player2.lifeDamage(2);
      console.log("n");
    }
    ///
  }

  onKeyUp(event) {
    keyboardInput[event.keyCode] = 0;
  }

  keyboardUpdate() {
    if (this.pause) return;
    this.player1.playerMoveDir("IDLE");
    this.player2.playerMoveDir("IDLE");
    if (keyboardInput[cc.macro.KEY.space]) this.player1.playerAttack();
    if (keyboardInput[cc.macro.KEY.s] && keyboardInput[cc.macro.KEY.d]) {
      this.player1.playerMoveDir("SE");
    } else if (keyboardInput[cc.macro.KEY.d] && keyboardInput[cc.macro.KEY.w]) {
      this.player1.playerMoveDir("NE");
    } else if (keyboardInput[cc.macro.KEY.w] && keyboardInput[cc.macro.KEY.a]) {
      this.player1.playerMoveDir("NW");
    } else if (keyboardInput[cc.macro.KEY.a] && keyboardInput[cc.macro.KEY.s]) {
      this.player1.playerMoveDir("SW");
    } else {
      if (keyboardInput[cc.macro.KEY.a]) {
        this.player1.playerMoveDir("W");
      } else if (keyboardInput[cc.macro.KEY.s]) {
        this.player1.playerMoveDir("S");
      } else if (keyboardInput[cc.macro.KEY.d]) {
        this.player1.playerMoveDir("E");
      } else if (keyboardInput[cc.macro.KEY.w]) {
        this.player1.playerMoveDir("N");
      }
    }

    if (keyboardInput[cc.macro.KEY.down] && keyboardInput[cc.macro.KEY.right]) {
      this.player2.playerMoveDir("SE");
    } else if (
      keyboardInput[cc.macro.KEY.right] &&
      keyboardInput[cc.macro.KEY.up]
    ) {
      this.player2.playerMoveDir("NE");
    } else if (
      keyboardInput[cc.macro.KEY.up] &&
      keyboardInput[cc.macro.KEY.left]
    ) {
      this.player2.playerMoveDir("NW");
    } else if (
      keyboardInput[cc.macro.KEY.left] &&
      keyboardInput[cc.macro.KEY.down]
    ) {
      this.player2.playerMoveDir("SW");
    } else {
      if (keyboardInput[cc.macro.KEY.up]) {
        this.player2.playerMoveDir("N");
      } else if (keyboardInput[cc.macro.KEY.down]) {
        this.player2.playerMoveDir("S");
      } else if (keyboardInput[cc.macro.KEY.right]) {
        this.player2.playerMoveDir("E");
      } else if (keyboardInput[cc.macro.KEY.left]) {
        this.player2.playerMoveDir("W");
      }
    }
  }

  update(dt) {
    this.keyboardUpdate();
  }
}

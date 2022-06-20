// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import fightPlayer from "./fightPlayer";
const { ccclass, property } = cc._decorator;
const keyboardInput = {};

@ccclass
export default class gameManager extends cc.Component {
    @property(cc.Prefab)
    archer: cc.Prefab = null;
    @property(cc.Prefab)
    warrior: cc.Prefab = null;
    @property(cc.Prefab)
    knight: cc.Prefab = null;
    @property(cc.Prefab)
    slinger: cc.Prefab = null;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;
    
    private player1: fightPlayer = null;
    private player2: fightPlayer = null;

    private map: cc.TiledMap = null;
    private pause: boolean = false;
    private physicManager: cc.PhysicsManager = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.resetKeyboard();
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.initPlayer();
        this.map = cc.find("Canvas/pkMap").getComponent(cc.TiledMap)
        //let level = cc.sys.localStorage.getItem("level");
    }

    start() {
        this.playBGM();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.initWall(this.map);
        
    }
    resetKeyboard () {
        keyboardInput[cc.macro.KEY.space] = 0;
        keyboardInput[cc.macro.KEY.m] = 0
        keyboardInput[cc.macro.KEY.s] = 0
        keyboardInput[cc.macro.KEY.d] = 0
        keyboardInput[cc.macro.KEY.w] = 0
        keyboardInput[cc.macro.KEY.a] = 0
        keyboardInput[cc.macro.KEY.forwardslash] = 0
        keyboardInput[cc.macro.KEY.period] = 0
        keyboardInput[cc.macro.KEY.up] = 0
        keyboardInput[cc.macro.KEY.down] = 0
        keyboardInput[cc.macro.KEY.right] = 0
        keyboardInput[cc.macro.KEY.left] = 0
    }

    playBGM(){
        cc.audioEngine.play(this.bgm, true, 0.5);
    }
    endBGM(){
        cc.audioEngine.stopMusic();
    }
    initPlayer() {
        let p1Info = JSON.parse(cc.sys.localStorage.getItem("p1"))
        var p1: cc.Node, p2: cc.Node;
        switch (p1Info.job) {
            case ('archer'):
                p1 = cc.instantiate(this.archer);
                break;
            case ('warrior'):
                p1 = cc.instantiate(this.warrior);
                break;
            case ('slinger'):
                p1 = cc.instantiate(this.slinger);
                break;
            case ('knight'):
                p1 = cc.instantiate(this.knight);
                break;
        
        }
        p1.parent = cc.find('Canvas/player1');
        p1.setPosition(cc.v2(-450, 0))

        let p2Info = JSON.parse(cc.sys.localStorage.getItem("p2"))
        switch (p2Info.job) {
            case ('archer'):
                p2 = cc.instantiate(this.archer);
                break;
            case ('warrior'):
                p2 = cc.instantiate(this.warrior);
                break;
            case ('slinger'):
                p2 = cc.instantiate(this.slinger);
                break;
            case ('knight'):
                p2 = cc.instantiate(this.knight);
                break;
        }
        p2.parent = cc.find('Canvas/player2');
        p2.setPosition(cc.v2(450, 0))
        this.player1 = p1.getComponent(fightPlayer);
        this.player2 = p2.getComponent(fightPlayer);
    }

    initWall(map: cc.TiledMap) {
        let tiledSize = map.getTileSize();
        let layer = map.getLayer("wall");
        let layerSize = layer.getLayerSize();
        //check each tiled
        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
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
    }

    onKeyUp(event) {
        keyboardInput[event.keyCode] = 0;
    }

    keyboardUpdate() {
        if (this.pause) return;
        this.player1.playerMoveDir("IDLE");
        this.player2.playerMoveDir("IDLE");
        if (keyboardInput[cc.macro.KEY.f]) this.player1.playerAttack();
        if (keyboardInput[cc.macro.KEY.g]) this.player1.playerPower();
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
        if (keyboardInput[cc.macro.KEY.forwardslash]) this.player2.playerAttack();
        if (keyboardInput[cc.macro.KEY.period]) this.player2.playerPower();
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

    gameOver(status: string) {
        this.endBGM();
        this.pause = true;
        if(status == 'winner1') {
            let winNode = cc.find("Canvas/Win");
            winNode.getComponent(cc.Label).string = "Player 1 Win"
            winNode.active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("endgame")
            }, 3)
        }
        else if(status == 'winner2') {
            let winNode = cc.find("Canvas/Win");
            winNode.getComponent(cc.Label).string = "Player 2 Win"
            winNode.active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("endgame")
            }, 3)
        }
    }

    update(dt) {
        this.keyboardUpdate();
    }


}

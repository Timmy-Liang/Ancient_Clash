// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import player from "./player";
const { ccclass, property } = cc._decorator;
const keyboardInput = {};

@ccclass
export default class gameManager extends cc.Component {
    @property(cc.Prefab)
    meleeEnemy: cc.Prefab = null;
    @property(cc.Prefab)
    wizard: cc.Prefab = null;
    @property(cc.Prefab)
    archer: cc.Prefab = null;

    private enemy: cc.Node = null;
    private player1: player = null;
    private player2: player = null;

    private mapLeft: cc.TiledMap = null;
    private mapRight: cc.TiledMap = null;

    private pause: boolean = false;
    private physicManager: cc.PhysicsManager = null;

    private meleeEnemyCount: number = 2;
    private archerEnemyCount: number = 1;
    private wizardCount: number = 1;
    

    private player1_restEnemy: number = 0;
    private player2_restEnemy: number = 0;

    private player1Character: string = 'archer';
    private player2Character: string = 'archer'

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.player1 = cc.find("Canvas/player1/" + this.player1Character).getComponent(player);
        this.player2 = cc.find("Canvas/player2/" + this.player2Character).getComponent(player);
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.mapLeft = cc.find("Canvas/map1_1").getComponent(cc.TiledMap);
        this.mapRight = cc.find("Canvas/map1_2").getComponent(cc.TiledMap);
        this.enemy = cc.find("Canvas/enemy");
        cc.director.getPhysicsManager().debugDrawFlags = 1;
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.initWall(this.mapLeft);
        this.initWall(this.mapRight);

        this.player1_restEnemy = this.meleeEnemyCount + this.wizardCount;
        this.player2_restEnemy = this.meleeEnemyCount + this.wizardCount;
        //i=1 for player1, i=2 for player2
        for (let i = 1; i < 3; i++) {
            this.initEnemies(i, this.meleeEnemyCount, this.wizardCount, this.archerEnemyCount);
        }
    }

    initWall(map: cc.TiledMap) {
        let tiledSize = map.getTileSize();
        let layer = map.getLayer("wall");
        let layerSize = layer.getLayerSize();
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

    initEnemies(index: number, meleeCount: number, wizardCount: number, archerEnemy: number) {
        for (let i = 0; i < meleeCount; i++) {
            this.initMelee(index);
        }
        for (let i = 0; i < wizardCount; i++) {
            this.initWizard(index);
        }
        for (let i = 0; i < archerEnemy; i++) {
            this.initArcher(index);
        }
    }

    initMelee(index: number) {
        let melee = cc.instantiate(this.meleeEnemy);
        melee.parent = cc.find("Canvas/enemy" + index);
        let pos;
        pos = cc.v2(-1820 + 1920 * (index - 1) + Math.floor(Math.random() * 1750), -875 + Math.floor(Math.random() * 1740));
        melee.setPosition(pos);
    }

    initWizard(index: number) {
        let wizard = cc.instantiate(this.wizard);
        wizard.parent = cc.find("Canvas/enemy" + index);
        let pos;
        pos = cc.v2(-1650 + 1920 * (index - 1) + Math.floor(Math.random() * 1570), -850 + Math.floor(Math.random() * 1700));
        wizard.setPosition(pos);
    }

    initArcher(index: number) {
        let archer = cc.instantiate(this.archer);
        archer.parent = cc.find("Canvas/enemy" + index);
        let pos;
        pos = cc.v2(-1820 + 1920 * (index - 1) + Math.floor(Math.random() * 1750), -875 + Math.floor(Math.random() * 1740));
        archer.setPosition(pos);
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

    enemyReduce(x) {
        if (x > 0) {
            this.player2_restEnemy -= 1;
            if (this.player2_restEnemy == 0) {

            }
        }
        else {
            this.player1_restEnemy -= 1;
            if (this.player1_restEnemy == 0) {
                cc.director.loadScene("shop");
            }
        }
    }
}

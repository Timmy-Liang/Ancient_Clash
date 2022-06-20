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
    archerEnemy: cc.Prefab = null;
    @property(cc.Prefab)
    wizard: cc.Prefab = null;

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
    private enemy: cc.Node = null;
    private player1: player = null;
    private player2: player = null;

    private mapLeft: cc.TiledMap = null;
    private mapRight: cc.TiledMap = null;

    private pause: boolean = false;
    private physicManager: cc.PhysicsManager = null;

    private meleeEnemyCount: number = 0;
    private archerEnemyCount: number = 0;
    private wizardCount: number = 0;

    private player1_restEnemy: number = 0;
    private player2_restEnemy: number = 0;

    private player1Job: string = "archer";
    private player2Job: string = "archer";

    private timer1: cc.Label = null;
    private timer2: cc.Label = null;
    private timeCounting;
    private timer: number = 0;
    private isTiming: boolean = false;
    private coin1: number = null;
    private coin2: number = null;
    private coin1label: cc.Label = null;
    private coin2label: cc.Label = null;

    private count1: cc.Label = null;
    private count2: cc.Label = null;

    private camera1: cc.Node = null;
    private camera2: cc.Node = null;

    private validEnemySpace: Array<Array<number>> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.resetKeyboard();
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.initPlayer();
        let level = cc.sys.localStorage.getItem("level");
        this.mapLeft = cc
            .find("Canvas/map" + level + "_1")
            .getComponent(cc.TiledMap);
        this.mapRight = cc
            .find("Canvas/map" + level + "_2")
            .getComponent(cc.TiledMap);
        this.enemy = cc.find("Canvas/enemy");

        this.timer = 120;
        this.timer1 = cc.find("Canvas/camera1/bar1/Timer").getComponent(cc.Label);
        this.timer2 = cc.find("Canvas/camera2/bar2/Timer").getComponent(cc.Label);

        this.coin1label = cc
            .find("Canvas/camera1/bar1/coin")
            .getComponent(cc.Label);
        this.coin2label = cc
            .find("Canvas/camera2/bar2/coin")
            .getComponent(cc.Label);
        this.count1 = cc
            .find("Canvas/camera1/RemainEnemy/count")
            .getComponent(cc.Label);
        this.count2 = cc
            .find("Canvas/camera2/RemainEnemy/count")
            .getComponent(cc.Label);

        this.coin1 = JSON.parse(cc.sys.localStorage.getItem("p1")).money;
        this.coin2 = JSON.parse(cc.sys.localStorage.getItem("p2")).money;
        this.coin1label.string = this.coin1.toString();
        this.coin2label.string = this.coin2.toString();

        this.camera1 = cc.find("Canvas/camera1");
        this.camera2 = cc.find("Canvas/camera2");
        
        this.meleeEnemyCount =  Math.floor(level*1.4)+2;
        this.archerEnemyCount = Math.floor(level*1.4)+1;
        this.wizardCount = Math.floor(level*1.4);
        
        //this.meleeEnemyCount =  Math.floor(level*1.5)+1;
        //this.archerEnemyCount = Math.floor(level*1.5);
        //this.wizardCount = Math.floor(level*1.5);
        //cc.director.getPhysicsManager().debugDrawFlags = 1;
    }

    start() {
        this.playBGM();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.initWall(this.mapLeft);
        this.initWall(this.mapRight);
        //i=1 for player1, i=2 for player2
        for (let i = 1; i < 3; i++) {
            this.initEnemies(
                i,
                this.meleeEnemyCount,
                this.wizardCount,
                this.archerEnemyCount
            );
        }
        this.timeCounting = () => {
            let t = this.timer - 1;
            if (t < 0) {
                if (this.player1_restEnemy > this.player2_restEnemy) {
                    this.gameOver("winner2");
                } else {
                    this.gameOver("winner1");
                }
            }
            this.updateTime(t);
        };
        if (this.isTiming == false) {
            this.isTiming = true;
            this.schedule(this.timeCounting, 1);
        }
    }

    resetKeyboard() {
        keyboardInput[cc.macro.KEY.f] = 0;
        keyboardInput[cc.macro.KEY.g] = 0
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

    playBGM() {
        cc.audioEngine.playMusic(this.bgm, true);
    }
    endBGM() {
        cc.audioEngine.stopMusic();
    }
    initPlayer() {
        let p1Info = JSON.parse(cc.sys.localStorage.getItem("p1"));
        var p1: cc.Node, p2: cc.Node;
        switch (p1Info.job) {
            case "archer":
                p1 = cc.instantiate(this.archer);
                break;
            case "warrior":
                p1 = cc.instantiate(this.warrior);
                break;
            case "slinger":
                p1 = cc.instantiate(this.slinger);
                break;
            case "knight":
                p1 = cc.instantiate(this.knight);
                break;
        }
        p1.parent = cc.find("Canvas/player1");
        p1.setPosition(cc.v2(335, -55));

        let p2Info = JSON.parse(cc.sys.localStorage.getItem("p2"));
        switch (p2Info.job) {
            case "archer":
                p2 = cc.instantiate(this.archer);
                break;
            case "warrior":
                p2 = cc.instantiate(this.warrior);
                break;
            case "slinger":
                p2 = cc.instantiate(this.slinger);
                break;
            case "knight":
                p2 = cc.instantiate(this.knight);
                break;
        }
        p2.parent = cc.find("Canvas/player2");
        p2.setPosition(cc.v2(335, -55));
        this.player1 = p1.getComponent(player);
        this.player2 = p2.getComponent(player);
    }
    updateTime(t) {
        this.timer = t;
        if (this.player1_restEnemy != 0) this.timer1.string = this.timer.toString();
        if (this.player2_restEnemy != 0) this.timer2.string = this.timer.toString();
    }
    addcoin(playernum, addnum) {
        //cc.log("addcoin");
        if (playernum == 1) {
            this.coin1 += addnum;
            this.coin1label.string = this.coin1.toString();
        } else {
            this.coin2 += addnum;
            this.coin2label.string = this.coin2.toString();
        }
    }
    initWall(map: cc.TiledMap) {
        let tiledSize = map.getTileSize();
        let layer = map.getLayer("wall");
        let layerSize = layer.getLayerSize();
        //check each tiled
        let dx = [1, -1, 0, 0, 1, -1, -1, 1]
        let dy = [0, 0, 1, -1, 1, 1, -1, -1];
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
                else {
                    let wallAround = false;
                    for(let idx = 0; idx < 8; idx++) {
                        if(wallAround)
                            break;
                        let nextX = i + dx[idx], nextY = j + dy[idx];
                        if(nextX < layerSize.width && nextX >= 0 && nextY < layerSize.height && nextY >= 0) {
                            wallAround = true;
                        }
                    }
                    if(!wallAround)
                        this.validEnemySpace.push([i, j]);
                }
            }
        }
    }

    initEnemies(
        index: number,
        meleeCount: number,
        wizardCount: number,
        archerCount: number
    ) {
        for (let i = 0; i < meleeCount; i++) {
            if (index == 1)
                this.player1_restEnemy++;
            else if (index == 2)
                this.player2_restEnemy++;
            this.initMelee(index);
        }
        for (let i = 0; i < wizardCount; i++) {
            if (index == 1)
                this.player1_restEnemy++;
            else if (index == 2)
                this.player2_restEnemy++;
            this.initWizard(index);
        }
        for (let i = 0; i < archerCount; i++) {
            if (index == 1)
                this.player1_restEnemy++;
            else if (index == 2)
                this.player2_restEnemy++;
            this.initArcher(index);
        }
        this.count1.string=this.player1_restEnemy.toString();
        this.count2.string=this.player2_restEnemy.toString();
    }

    initMelee(index: number) {
        let melee = cc.instantiate(this.meleeEnemy);
        melee.parent = cc.find("Canvas/enemy" + index);

        let length = this.validEnemySpace.length;
        var playerWorldPosition;
        if(index == 1) {
            playerWorldPosition = this.player1.node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        else{
            playerWorldPosition = this.player2.node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        while (true) {
            let nextValidIndex = this.randomValidSpace(length);
            let nextOffsetX = nextValidIndex[0], nextOffsetY = nextValidIndex[1];
            let nextX = -1920 + 1920 * (index - 1) + nextOffsetX * 16;
            let nextY = -960 + (120 - nextOffsetY) * 16;
            melee.setPosition(cc.v2(nextX, nextY));
            let nextEnemyWorldPosition = melee.convertToWorldSpaceAR(cc.v2(0, 0));
            if ((nextEnemyWorldPosition.sub(playerWorldPosition)).mag() > 350) {
                break;
            }
        }
        
    }

    initWizard(index: number) {
        let wizard = cc.instantiate(this.wizard);
        wizard.parent = cc.find("Canvas/enemy" + index);
        let length = this.validEnemySpace.length;
        var playerWorldPosition;
        if(index == 1) {
            playerWorldPosition = this.player1.node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        else{
            playerWorldPosition = this.player2.node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        while (true) {
            let nextValidIndex = this.randomValidSpace(length);
            let nextOffsetX = nextValidIndex[0], nextOffsetY = nextValidIndex[1];
            let nextX = -1920 + (index - 1) * 1920 + nextOffsetX * 16;
            let nextY = -960 + (120 - nextOffsetY) * 16;
            wizard.setPosition(cc.v2(nextX, nextY));
            let nextEnemyWorldPosition = wizard.convertToWorldSpaceAR(cc.v2(0, 0));
            if ((nextEnemyWorldPosition.sub(playerWorldPosition)).mag() > 350) {
                break;
            }
            
        }
    }

    initArcher(index: number) {
        let archerEnemy = cc.instantiate(this.archerEnemy);
        archerEnemy.parent = cc.find("Canvas/enemy" + index);
        let length = this.validEnemySpace.length;
        var playerWorldPosition;
        if(index == 1) {
            playerWorldPosition = this.player1.node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        else{
            playerWorldPosition = this.player2.node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        while (true) {
            let nextValidIndex = this.randomValidSpace(length);
            let nextOffsetX = nextValidIndex[0], nextOffsetY = nextValidIndex[1];
            let nextX = -1920 + 1920 * (index - 1) + nextOffsetX * 16;
            let nextY = -960 + (120 - nextOffsetY) * 16;
            archerEnemy.setPosition(cc.v2(nextX, nextY));
            let nextEnemyWorldPosition = archerEnemy.convertToWorldSpaceAR(cc.v2(0, 0));
            if ((nextEnemyWorldPosition.sub(playerWorldPosition)).mag() > 450) {
                break;
            }
            
        }
    }

    randomValidSpace(length: number) {
        while(true) {
            let index = Math.floor(Math.random() * length)
            let nextX = this.validEnemySpace[index][0];
            let nextY = this.validEnemySpace[index][1];
            if(nextX > 15 && nextX < 105 && nextY > 15 && nextY < 105)
                return this.validEnemySpace[index]
        }
    }

    onKeyDown(event) {
        keyboardInput[event.keyCode] = 1;
    }

    onKeyUp(event) {
        keyboardInput[event.keyCode] = 0;
    }

    keyboardUpdate() {
        this.player1.playerMoveDir("IDLE");
        this.player2.playerMoveDir("IDLE");
        if (this.pause) return;
        
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
        cc.sys.localStorage.setItem("winstate", status);
        if (status == "tie") {
            let sth = JSON.parse(cc.sys.localStorage.getItem("p1"));
            sth.money += this.coin1;
            cc.sys.localStorage.setItem("p1", JSON.stringify(sth));

            sth = JSON.parse(cc.sys.localStorage.getItem("p2"));
            sth.money += this.coin2;
            cc.sys.localStorage.setItem("p2", JSON.stringify(sth));

            this.camera1.active = false;
            this.camera2.active = false;
            cc.find("Canvas/loadingCamera").active = true;
            cc.find("Canvas/loading_bg").active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("shop");
            }, 0.3);
        } else if (status == "winner1") {
            cc.find("Canvas/camera1/Clean").active = false;
            cc.find("Canvas/camera2/Clean").active = false;
            cc.find("Canvas/camera1/Win").active = true;
            cc.find("Canvas/camera2/Lose").active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("endgame");
            }, 3);
        } else if (status == "winner2") {
            cc.find("Canvas/camera1/Clean").active = false;
            cc.find("Canvas/camera2/Clean").active = false;
            cc.find("Canvas/camera1/Lose").active = true;
            cc.find("Canvas/camera2/Win").active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("endgame");
            }, 3);
        }
    }

    update(dt) {
        this.keyboardUpdate();
    }

    enemyReduce(x) {
        if (x > 0) {
            this.player2_restEnemy -= 1;
            this.count2.string=this.player2_restEnemy.toString();
            if (this.player2_restEnemy == 0) {
                if (this.player1_restEnemy == 0) this.gameOver("tie");
                else {
                    cc.find("Canvas/camera2/Clean").active = true;
                    this.initEnemies(1, Math.floor(this.timer/35)+1, Math.floor(this.timer/48), Math.floor(this.timer/60));
                }
            }
        } else {
            this.player1_restEnemy -= 1;
            this.count1.string=this.player1_restEnemy.toString();
            if (this.player1_restEnemy == 0) {
                if (this.player2_restEnemy == 0) this.gameOver("tie");
                else {
                    cc.find("Canvas/camera1/Clean").active = true;
                    this.initEnemies(2, Math.floor(this.timer/35)+1, Math.floor(this.timer/48), Math.floor(this.timer/60));
                }
            }
        }
        // if (this.passControl == 3) {
        //     let sth = JSON.parse(cc.sys.localStorage.getItem("p1"));
        //     sth.money += this.coin1;
        //     cc.sys.localStorage.setItem("p1", JSON.stringify(sth));

        //     sth = JSON.parse(cc.sys.localStorage.getItem("p2"));
        //     sth.money += this.coin2;
        //     cc.sys.localStorage.setItem("p2", JSON.stringify(sth));
        //     //console.log("enter shop");
        //     this.camera1.active = false;
        //     this.camera2.active = false;
        //     cc.find("Canvas/loadingCamera").active = true;
        //     cc.find("Canvas/tmp_bg").active = true;
        //     this.endBGM();
        //     cc.director.loadScene("shop");
        // }
    }
}

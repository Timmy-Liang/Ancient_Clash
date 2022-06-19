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
   
    @property(cc.AudioClip)
    walkSound: cc.AudioClip = null;
    private enemy: cc.Node = null;
    private player1: player = null;
    private player2: player = null;

    private mapLeft: cc.TiledMap = null;
    private mapRight: cc.TiledMap = null;

    private pause: boolean = false;
    private physicManager: cc.PhysicsManager = null;

    private meleeEnemyCount: number = 1;
    private archerEnemyCount: number = 0;
    private wizardCount: number = 0;

    private player1_restEnemy: number = 0;
    private player2_restEnemy: number = 0;

    private player1Job: string = 'archer';
    private player2Job: string = 'archer';

    private timer1: cc.Label = null;
    private timer2: cc.Label = null;
    private timeCounting;
    private timer: number = 0;
    private isTiming: boolean = false;
    private coin1: number = null;
    private coin2: number = null;
    private coin1label: cc.Label = null;
    private coin2label: cc.Label = null;
    
    private passControl: number = 0;
    private camera1: cc.Node = null;
    private camera2: cc.Node = null;
    //1: player1 pass first
    //2: player2 pass first
    //3: both player pass

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.initPlayer();
        let level = cc.sys.localStorage.getItem("level");
        this.mapLeft = cc.find("Canvas/map" + level + "_1").getComponent(cc.TiledMap);
        this.mapRight = cc.find("Canvas/map" + level + "_2").getComponent(cc.TiledMap);
        this.enemy = cc.find("Canvas/enemy");
        
        this.timer=120;
        this.timer1= cc.find("Canvas/camera1/bar1/Timer").getComponent(cc.Label);
        this.timer2= cc.find("Canvas/camera2/bar2/Timer").getComponent(cc.Label);
        this.coin1label= cc.find("Canvas/camera1/bar1/coin").getComponent(cc.Label);
        this.coin2label= cc.find("Canvas/camera2/bar2/coin").getComponent(cc.Label);

        this.camera1 = cc.find("Canvas/camera1");
        this.camera2 = cc.find("Canvas/camera2");

        //cc.director.getPhysicsManager().debugDrawFlags = 1;
    }

    start() {
        this.playBGM();
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
        this.timeCounting = () => {
            let t=this.timer-1;
            if(t < 0) {
                if(this.player1_restEnemy > this.player2_restEnemy) {
                    this.gameOver("winner2");
                }
                else {
                    this.gameOver("winner1");
                }
            }
            this.updateTime(t);
        }
        if(this.isTiming==false){
            this.isTiming=true;
            this.schedule(this.timeCounting, 1);
        }
        
        
        
    }
    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
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
        p1.setPosition(cc.v2(335, -55))

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
        p2.setPosition(cc.v2(335, -55))
        this.player1 = p1.getComponent(player);
        this.player2 = p2.getComponent(player);
    }
    updateTime(t){
        this.timer=t;
        this.timer1.string=this.timer.toString();
        this.timer2.string=this.timer.toString();
    }
    addcoin(playernum,addnum){
        //cc.log("addcoin");
        if(playernum==1){
            this.coin1+=addnum;
            this.coin1label.string=this.coin1.toString();
        }
        else{
            this.coin2+=addnum;
            this.coin2label.string=this.coin2.toString();
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

    initEnemies(index: number, meleeCount: number, wizardCount: number, archerCount: number) {
        for (let i = 0; i < meleeCount; i++) {
            this.initMelee(index);
        }
        for (let i = 0; i < wizardCount; i++) {
            this.initWizard(index);
        }
        for (let i = 0; i < archerCount; i++) {
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
        let archerEnemy = cc.instantiate(this.archerEnemy);
        archerEnemy.parent = cc.find("Canvas/enemy" + index);
        let pos;
        pos = cc.v2(-1820 + 1920 * (index - 1) + Math.floor(Math.random() * 1750), -875 + Math.floor(Math.random() * 1740));
        archerEnemy.setPosition(pos);
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
        if (keyboardInput[cc.macro.KEY.m]) this.player1.playerPower();
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
        if(status == 'tie') {
            this.camera1.active = false;
            this.camera2.active = false;
            cc.find("Canvas/loadingCamera").active = true;
            cc.find("Canvas/tmp_bg").active = true;
            cc.director.loadScene("shop");
        }
        else if(status == 'winner1') {
            cc.find("Canvas/camera1/Clean").active = false;
            cc.find("Canvas/camera2/Clean").active = false;
            cc.find("Canvas/camera1/Win").active = true;
            cc.find("Canvas/camera2/Lose").active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("start")
            }, 3)
        }
        else if(status == 'winner2') {
            cc.find("Canvas/camera1/Clean").active = false;
            cc.find("Canvas/camera2/Clean").active = false;
            cc.find("Canvas/camera1/Lose").active = true;
            cc.find("Canvas/camera2/Win").active = true;
            this.scheduleOnce(() => {
                cc.director.loadScene("start")
            }, 3)
        }
    }

    update(dt) {
        this.keyboardUpdate();
    }

    enemyReduce(x) {
        if (x > 0) {
            this.player2_restEnemy -= 1;
            if (this.player2_restEnemy == 0) {
                if (this.player1_restEnemy == 0) {
                    this.gameOver('tie');
                }
                else {
                    cc.find("Canvas/camera2/Clean").active = true;
                }
            }
        }
        else {
            this.player1_restEnemy -= 1;
            if (this.player1_restEnemy == 0) {
                if(this.player2_restEnemy == 0){
                    this.gameOver('tie')
                }
                else {
                    cc.find("Canvas/camera1/Clean").active = true;
                }
            }
        }
    }
}

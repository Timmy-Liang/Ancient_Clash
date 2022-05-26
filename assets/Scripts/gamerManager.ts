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

    private pause : boolean = false;

    private physicManager: cc.PhysicsManager = null;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = 1;
    }

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event) {
        keyboardInput[event.keyCode] = 1;
    }

    onKeyUp(event) {
        keyboardInput[event.keyCode] = 0;
    }

    keyboardUpdate() {
        if (this.pause) return;
        this.player1.playerMoveDir('IDLE');
        this.player2.playerMoveDir('IDLE');
        if (keyboardInput[cc.macro.KEY.s] && keyboardInput[cc.macro.KEY.d] ) {
            this.player1.playerMoveDir('SE');
        }
        else if (keyboardInput[cc.macro.KEY.d] && keyboardInput[cc.macro.KEY.w]) {
            this.player1.playerMoveDir('NE');
        }
        else if (keyboardInput[cc.macro.KEY.w] && keyboardInput[cc.macro.KEY.a]) {
            this.player1.playerMoveDir('NW');
        }
        else if (keyboardInput[cc.macro.KEY.a] && keyboardInput[cc.macro.KEY.s]) {
            this.player1.playerMoveDir('SW');
        }
        else{
            if (keyboardInput[cc.macro.KEY.a]) {
                this.player1.playerMoveDir('W');
            }
            else if (keyboardInput[cc.macro.KEY.s]) {
                this.player1.playerMoveDir('S');
            }
            else if (keyboardInput[cc.macro.KEY.d]) {
                this.player1.playerMoveDir('E');
            }
            else if (keyboardInput[cc.macro.KEY.w]) {
                this.player1.playerMoveDir('N');
            }
        }

        if (keyboardInput[cc.macro.KEY.down] && keyboardInput[cc.macro.KEY.right] ) {
            this.player2.playerMoveDir('SE');
        }
        else if (keyboardInput[cc.macro.KEY.right] && keyboardInput[cc.macro.KEY.up]) {
            this.player2.playerMoveDir('NE');
        }
        else if (keyboardInput[cc.macro.KEY.up] && keyboardInput[cc.macro.KEY.left]) {
            this.player2.playerMoveDir('NW');
        }
        else if (keyboardInput[cc.macro.KEY.left] && keyboardInput[cc.macro.KEY.down]) {
            this.player2.playerMoveDir('SW');
        }
        else {
            if (keyboardInput[cc.macro.KEY.up]) {
                this.player2.playerMoveDir('N');
            }
            else if (keyboardInput[cc.macro.KEY.down]) {
                this.player2.playerMoveDir('S');
            }
            else if (keyboardInput[cc.macro.KEY.right]) {
                this.player2.playerMoveDir('E');
            }
            else if (keyboardInput[cc.macro.KEY.left]) {
                this.player2.playerMoveDir('W');
            }
        }
        

    }

    update (dt) {
        this.keyboardUpdate()
    }
}

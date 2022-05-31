"use strict";
cc._RF.push(module, '9e7e14agd9NuLW2mQVAqQh0', 'gamerManager');
// Scripts/gamerManager.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var keyboardInput = {};
var gameManager = /** @class */ (function (_super) {
    __extends(gameManager, _super);
    function gameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player1 = null;
        _this.player2 = null;
        _this.pause = false;
        _this.physicManager = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    gameManager.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = 1;
    };
    gameManager.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    gameManager.prototype.onKeyDown = function (event) {
        keyboardInput[event.keyCode] = 1;
    };
    gameManager.prototype.onKeyUp = function (event) {
        keyboardInput[event.keyCode] = 0;
    };
    gameManager.prototype.keyboardUpdate = function () {
        if (this.pause)
            return;
        this.player1.playerMoveDir('IDLE');
        this.player2.playerMoveDir('IDLE');
        if (keyboardInput[cc.macro.KEY.space])
            this.player1.playerAttack();
        if (keyboardInput[cc.macro.KEY.s] && keyboardInput[cc.macro.KEY.d]) {
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
        else {
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
        if (keyboardInput[cc.macro.KEY.down] && keyboardInput[cc.macro.KEY.right]) {
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
    };
    gameManager.prototype.update = function (dt) {
        this.keyboardUpdate();
    };
    __decorate([
        property(player_1.default)
    ], gameManager.prototype, "player1", void 0);
    __decorate([
        property(player_1.default)
    ], gameManager.prototype, "player2", void 0);
    gameManager = __decorate([
        ccclass
    ], gameManager);
    return gameManager;
}(cc.Component));
exports.default = gameManager;

cc._RF.pop();
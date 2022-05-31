
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/gamerManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2dhbWVyTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixtQ0FBNkI7QUFDdkIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBSXpCO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBcUdDO1FBakdHLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFXLElBQUksQ0FBQztRQUVmLFdBQUssR0FBYSxLQUFLLENBQUM7UUFFeEIsbUJBQWEsR0FBc0IsSUFBSSxDQUFDOztJQTBGcEQsQ0FBQztJQXZGRyx3QkFBd0I7SUFFeEIsNEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNsQyxxREFBcUQ7SUFDekQsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDVCxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hDLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRztZQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUNJLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUNJLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUNJLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUNHO1lBQ0EsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO2lCQUNJLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQztpQkFDSSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7aUJBQ0ksSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO1NBQ0o7UUFFRCxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUc7WUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFDSSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFDSSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFDSSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFDSTtZQUNELElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQztpQkFDSSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7aUJBQ0ksSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO2lCQUNJLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQztTQUNKO0lBR0wsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFoR0Q7UUFEQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQztnREFDTTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDO2dEQUNNO0lBUE4sV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXFHL0I7SUFBRCxrQkFBQztDQXJHRCxBQXFHQyxDQXJHd0MsRUFBRSxDQUFDLFNBQVMsR0FxR3BEO2tCQXJHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJ1xuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBrZXlib2FyZElucHV0ID0ge307XG5cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIFxuICAgIEBwcm9wZXJ0eShwbGF5ZXIpXG4gICAgcGxheWVyMTogcGxheWVyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShwbGF5ZXIpXG4gICAgcGxheWVyMjogcGxheWVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgcGF1c2UgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcbiAgICBcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZGVidWdEcmF3RmxhZ3MgPSAxO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGtleWJvYXJkSW5wdXRbZXZlbnQua2V5Q29kZV0gPSAxO1xuICAgIH1cblxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAga2V5Ym9hcmRJbnB1dFtldmVudC5rZXlDb2RlXSA9IDA7XG4gICAgfVxuXG4gICAga2V5Ym9hcmRVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhdXNlKSByZXR1cm47XG4gICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJNb3ZlRGlyKCdJRExFJyk7XG4gICAgICAgIHRoaXMucGxheWVyMi5wbGF5ZXJNb3ZlRGlyKCdJRExFJyk7XG4gICAgICAgIGlmKGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLnNwYWNlXSlcbiAgICAgICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJBdHRhY2soKTtcbiAgICAgICAgaWYgKGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLnNdICYmIGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLmRdICkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIxLnBsYXllck1vdmVEaXIoJ1NFJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkuZF0gJiYga2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkud10pIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJNb3ZlRGlyKCdORScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLnddICYmIGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLmFdKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllcjEucGxheWVyTW92ZURpcignTlcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5hXSAmJiBrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5zXSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIxLnBsYXllck1vdmVEaXIoJ1NXJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5hXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJNb3ZlRGlyKCdXJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5zXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJNb3ZlRGlyKCdTJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5kXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJNb3ZlRGlyKCdFJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS53XSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyMS5wbGF5ZXJNb3ZlRGlyKCdOJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkuZG93bl0gJiYga2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkucmlnaHRdICkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyLnBsYXllck1vdmVEaXIoJ1NFJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkucmlnaHRdICYmIGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLnVwXSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyLnBsYXllck1vdmVEaXIoJ05FJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkudXBdICYmIGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLmxlZnRdKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllcjIucGxheWVyTW92ZURpcignTlcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5sZWZ0XSAmJiBrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5kb3duXSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyLnBsYXllck1vdmVEaXIoJ1NXJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoa2V5Ym9hcmRJbnB1dFtjYy5tYWNyby5LRVkudXBdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIyLnBsYXllck1vdmVEaXIoJ04nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLmRvd25dKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIyLnBsYXllck1vdmVEaXIoJ1MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleWJvYXJkSW5wdXRbY2MubWFjcm8uS0VZLnJpZ2h0XSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyMi5wbGF5ZXJNb3ZlRGlyKCdFJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlib2FyZElucHV0W2NjLm1hY3JvLktFWS5sZWZ0XSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyMi5wbGF5ZXJNb3ZlRGlyKCdXJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIHRoaXMua2V5Ym9hcmRVcGRhdGUoKVxuICAgIH1cbn1cbiJdfQ==
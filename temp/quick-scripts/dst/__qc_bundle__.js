
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/bullet');
require('./assets/Scripts/enemy');
require('./assets/Scripts/gamerManager');
require('./assets/Scripts/player');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bec3eXqZSlO66PUx9KBHkrL', 'bullet');
// Scripts/bullet.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var bullet = /** @class */ (function (_super) {
    __extends(bullet, _super);
    function bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetPosition = cc.v2(0, 0);
        _this.bulletManager = null;
        _this.isTriggered = false; // I add this to make the bullet kill one enemy at a time.
        return _this;
    }
    // when created, the bullet need to be placed at correct position and play animation.
    bullet.prototype.init = function (node, targetPosition, targetDirection) {
        this.setInitPos(node, targetDirection);
        this.bulletMove();
        this.targetPosition = targetPosition;
    };
    // this function is called when the bullet manager calls "get" API.
    bullet.prototype.reuse = function (bulletManager) {
        this.bulletManager = bulletManager;
        this.isTriggered = false;
    };
    //this function sets the bullet's initial position when it is reused.
    bullet.prototype.setInitPos = function (node, targetDirection) {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        //this.node.setPosition(cc.v2(128, 70));
        this.node.position = this.node.position.addSelf(node.position);
    };
    //make the bullet move from current position
    bullet.prototype.bulletMove = function () {
        var _this = this;
        var moveDir = cc.moveTo(0.2, this.targetPosition);
        // move bullet to 500 far from current position in 0.8s
        var finished = cc.callFunc(function () {
            _this.bulletManager.put(_this.node);
        });
        // after playing animation, the bullet move 0.8s and destroy itself(put back to the bullet manager)
        this.scheduleOnce(function () {
            _this.node.runAction(cc.sequence(moveDir, finished));
        });
    };
    //detect collision with enemies
    bullet.prototype.onBeginContact = function (contact, selt, other) {
        var _this = this;
        if (other.tag == 1) {
            contact.disabled = true;
            return;
        }
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.bulletManager.put(_this.node);
        }, 0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
    };
    bullet = __decorate([
        ccclass
    ], bullet);
    return bullet;
}(cc.Component));
exports.default = bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2J1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQTZEQztRQTNEVyxvQkFBYyxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRDLG1CQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXRCLGlCQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsMERBQTBEOztJQXVEMUYsQ0FBQztJQXJERyxxRkFBcUY7SUFDOUUscUJBQUksR0FBWCxVQUFZLElBQWEsRUFBRSxjQUF1QixFQUFFLGVBQXVCO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsbUVBQW1FO0lBQ25FLHNCQUFLLEdBQUwsVUFBTSxhQUFhO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFFbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELHFFQUFxRTtJQUNyRSwyQkFBVSxHQUFWLFVBQVcsSUFBYSxFQUFFLGVBQXVCO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxvRkFBb0Y7UUFFcEgsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDRDQUE0QztJQUM1QywyQkFBVSxHQUFWO1FBQUEsaUJBY0M7UUFaRyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEQsdURBQXVEO1FBRXZELElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdkIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUdBQW1HO1FBQ25HLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtCQUErQjtJQUMvQiwrQkFBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLO1FBQW5DLGlCQVlDO1FBWEcsSUFBRyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBQztZQUNkLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyx1RUFBdUU7SUFDcEYsQ0FBQztJQTVEZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTZEMUI7SUFBRCxhQUFDO0NBN0RELEFBNkRDLENBN0RtQyxFQUFFLENBQUMsU0FBUyxHQTZEL0M7a0JBN0RvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBidWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSB0YXJnZXRQb3NpdGlvbjogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuXG4gICAgcHJpdmF0ZSBidWxsZXRNYW5hZ2VyID0gbnVsbDtcblxuICAgIHB1YmxpYyBpc1RyaWdnZXJlZCA9IGZhbHNlOyAvLyBJIGFkZCB0aGlzIHRvIG1ha2UgdGhlIGJ1bGxldCBraWxsIG9uZSBlbmVteSBhdCBhIHRpbWUuXG5cbiAgICAvLyB3aGVuIGNyZWF0ZWQsIHRoZSBidWxsZXQgbmVlZCB0byBiZSBwbGFjZWQgYXQgY29ycmVjdCBwb3NpdGlvbiBhbmQgcGxheSBhbmltYXRpb24uXG4gICAgcHVibGljIGluaXQobm9kZTogY2MuTm9kZSwgdGFyZ2V0UG9zaXRpb246IGNjLlZlYzIsIHRhcmdldERpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0SW5pdFBvcyhub2RlLCB0YXJnZXREaXJlY3Rpb24pO1xuICAgICAgICB0aGlzLmJ1bGxldE1vdmUoKVxuICAgICAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XG4gICAgfVxuXG4gICAgLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgYnVsbGV0IG1hbmFnZXIgY2FsbHMgXCJnZXRcIiBBUEkuXG4gICAgcmV1c2UoYnVsbGV0TWFuYWdlcikge1xuICAgICAgICB0aGlzLmJ1bGxldE1hbmFnZXIgPSBidWxsZXRNYW5hZ2VyO1xuXG4gICAgICAgIHRoaXMuaXNUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL3RoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYnVsbGV0J3MgaW5pdGlhbCBwb3NpdGlvbiB3aGVuIGl0IGlzIHJldXNlZC5cbiAgICBzZXRJbml0UG9zKG5vZGU6IGNjLk5vZGUsIHRhcmdldERpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBub2RlLnBhcmVudDsgLy8gZG9uJ3QgbW91bnQgdW5kZXIgdGhlIHBsYXllciwgb3RoZXJ3aXNlIGl0IHdpbGwgY2hhbmdlIGRpcmVjdGlvbiB3aGVuIHBsYXllciBtb3ZlXG4gICAgICAgIFxuICAgICAgICAvL3RoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MigxMjgsIDcwKSk7XG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbi5hZGRTZWxmKG5vZGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8vbWFrZSB0aGUgYnVsbGV0IG1vdmUgZnJvbSBjdXJyZW50IHBvc2l0aW9uXG4gICAgYnVsbGV0TW92ZSgpIHtcblxuICAgICAgICBsZXQgbW92ZURpciA9IGNjLm1vdmVUbygwLjIsIHRoaXMudGFyZ2V0UG9zaXRpb24pO1xuXG4gICAgICAgIC8vIG1vdmUgYnVsbGV0IHRvIDUwMCBmYXIgZnJvbSBjdXJyZW50IHBvc2l0aW9uIGluIDAuOHNcblxuICAgICAgICBsZXQgZmluaXNoZWQgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldE1hbmFnZXIucHV0KHRoaXMubm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFmdGVyIHBsYXlpbmcgYW5pbWF0aW9uLCB0aGUgYnVsbGV0IG1vdmUgMC44cyBhbmQgZGVzdHJveSBpdHNlbGYocHV0IGJhY2sgdG8gdGhlIGJ1bGxldCBtYW5hZ2VyKVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKG1vdmVEaXIsIGZpbmlzaGVkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vZGV0ZWN0IGNvbGxpc2lvbiB3aXRoIGVuZW1pZXNcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWx0LCBvdGhlcikge1xuICAgICAgICBpZihvdGhlci50YWcgPT0gMSl7XG4gICAgICAgICAgICBjb250YWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldE1hbmFnZXIucHV0KHRoaXMubm9kZSk7XG4gICAgICAgIH0sIDAuMSk7IC8vIGZvciBiZXR0ZXIgYW5pbWF0aW9uIGVmZmVjdCwgSSBkZWxheSAwLjFzIHdoZW4gYnVsbGV0IGhpdHMgdGhlIGVuZW15XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '734cf13gy1LP7FvtfHFr+av', 'player');
// Scripts/player.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var player = /** @class */ (function (_super) {
    __extends(player, _super);
    function player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.moveDir = 'S';
        _this.speed = 250;
        _this.anim = null;
        _this.animateState = null;
        _this.maxBullet = 5;
        _this.bulletPool = null;
        _this.nextAttackTime = 0;
        _this.nextReloadTime = 0;
        _this.attackCooldown = 0.2;
        _this.reloadCooldown = 5;
        _this.attacking = false;
        _this.enemys = null;
        _this.enemyCount = 0;
        _this.targetPosition = cc.v2(0, 0);
        _this.targetDirection = '';
        _this.nextTraceTime = 0;
        _this.traceCooldown = 0.5;
        return _this;
    }
    player.prototype.onLoad = function () {
        this.bulletPool = new cc.NodePool('bullet');
        this.anim = this.getComponent(cc.Animation);
        this.enemys = cc.find("Canvas/enemy");
        this.enemyCount = this.enemys.childrenCount;
    };
    player.prototype.start = function () {
        for (var i = 0; i < this.maxBullet; i++) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    };
    player.prototype.playerMoveDir = function (dir) {
        this.moveDir = dir;
    };
    player.prototype.playerMove = function (dt) {
        switch (this.moveDir) {
            case 'N':
                this.node.y += this.speed * dt;
                break;
            case 'S':
                this.node.y -= this.speed * dt;
                break;
            case 'E':
                this.node.x += this.speed * dt;
                break;
            case 'W':
                this.node.x -= this.speed * dt;
                break;
            case 'NE':
                this.node.x += this.speed * dt;
                this.node.y += this.speed * dt;
                break;
            case 'NW':
                this.node.x -= this.speed * dt;
                this.node.y += this.speed * dt;
                break;
            case 'SW':
                this.node.x -= this.speed * dt;
                this.node.y -= this.speed * dt;
                break;
            case 'SE':
                this.node.x += this.speed * dt;
                this.node.y -= this.speed * dt;
                break;
        }
    };
    player.prototype.playerWalkAnimation = function () {
        if (this.attacking)
            return;
        switch (this.moveDir) {
            case 'N':
                if (this.animateState == null || this.animateState.name != 'playerWalkN')
                    this.animateState = this.anim.play('playerWalkN');
                break;
            case 'S':
                if (this.animateState == null || this.animateState.name != 'playerWalkS')
                    this.animateState = this.anim.play('playerWalkS');
                break;
            case 'E':
                if (this.animateState == null || this.animateState.name != 'playerWalkE')
                    this.animateState = this.anim.play('playerWalkE');
                break;
            case 'W':
                if (this.animateState == null || this.animateState.name != 'playerWalkW')
                    this.animateState = this.anim.play('playerWalkW');
                break;
            case 'NE':
                if (this.animateState == null || this.animateState.name != 'playerWalkNE')
                    this.animateState = this.anim.play('playerWalkNE');
                break;
            case 'NW':
                if (this.animateState == null || this.animateState.name != 'playerWalkNW')
                    this.animateState = this.anim.play('playerWalkNW');
                break;
            case 'SW':
                if (this.animateState == null || this.animateState.name != 'playerWalkSW')
                    this.animateState = this.anim.play('playerWalkSW');
                break;
            case 'SE':
                if (this.animateState == null || this.animateState.name != 'playerWalkSE')
                    this.animateState = this.anim.play('playerWalkSE');
                break;
            default:
                this.anim.stop();
                break;
        }
    };
    player.prototype.playerAttackAnimation = function () {
        var _this = this;
        var angle = calcAngleDegrees(this.targetPosition.x - this.node.x, this.targetPosition.y - this.node.y);
        if (angle < 157.5 && angle >= 112.5) {
            this.targetDirection = 'NW';
        }
        else if (angle < 112.5 && angle >= 67.5) {
            this.targetDirection = 'N';
        }
        else if (angle < 67.5 && angle >= 22.5) {
            this.targetDirection = 'NE';
        }
        else if (angle < 22.5 && angle >= -22.5) {
            this.targetDirection = 'E';
        }
        else if (angle < -22.5 && angle >= -67.5) {
            this.targetDirection = 'SE';
        }
        else if (angle < -67.5 && angle >= -112.5) {
            this.targetDirection = 'S';
        }
        else if (angle < -112.5 && angle >= -157.5) {
            this.targetDirection = 'SW';
        }
        else {
            this.targetDirection = 'W';
        }
        this.anim.stop();
        this.attacking = true;
        this.animateState = this.anim.play('playerAttack' + this.targetDirection);
        this.anim.on('finished', function (e) {
            _this.attacking = false;
        });
    };
    player.prototype.playerAttack = function () {
        var currentTime = cc.director.getTotalTime() / 1000.0;
        if (currentTime >= this.nextAttackTime) {
            this.nextAttackTime = currentTime + this.attackCooldown;
            this.createBullet();
            this.playerAttackAnimation();
        }
    };
    player.prototype.createBullet = function () {
        var bullet = null;
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get(this.bulletPool);
        }
        if (bullet != null)
            bullet.getComponent('bullet').init(this.node, this.targetPosition, this.targetDirection);
    };
    player.prototype.traceEnemy = function () {
        var currentTime = cc.director.getTotalTime() / 1000.0;
        if (currentTime >= this.nextTraceTime) {
            this.nextTraceTime = currentTime + this.traceCooldown;
            var nextTargetDistance = 9007199254740992; // INT_MAX
            var nextTargetPosition = cc.v2(0, 0);
            for (var i = 0; i < this.enemyCount; i++) {
                var currentDistance = this.node.position.sub(this.enemys.children[i].position).mag();
                if (currentDistance < nextTargetDistance) {
                    nextTargetDistance = currentDistance;
                    nextTargetPosition = cc.v2(this.enemys.children[i].position.x, this.enemys.children[i].position.y);
                }
            }
            this.targetPosition = nextTargetPosition;
        }
    };
    player.prototype.update = function (dt) {
        this.playerMove(dt);
        this.playerWalkAnimation();
        this.traceEnemy();
    };
    __decorate([
        property(cc.Prefab)
    ], player.prototype, "bulletPrefab", void 0);
    player = __decorate([
        ccclass
    ], player);
    return player;
}(cc.Component));
exports.default = player;
function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUc1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQW1OQztRQWhOVyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUUvQixhQUFPLEdBQVcsR0FBRyxDQUFDO1FBRXRCLFdBQUssR0FBVyxHQUFHLENBQUM7UUFFcEIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsa0JBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixnQkFBVSxHQUFnQixJQUFJLENBQUM7UUFFL0Isb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFFM0Isb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFFM0Isb0JBQWMsR0FBVyxHQUFHLENBQUM7UUFFN0Isb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFFM0IsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLG9CQUFjLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdEMscUJBQWUsR0FBVyxFQUFFLENBQUM7UUFFN0IsbUJBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsbUJBQWEsR0FBVyxHQUFHLENBQUM7O0lBOEt4QyxDQUFDO0lBM0tHLHVCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMs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QUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUNwRixJQUFHLGVBQWUsR0FBRyxrQkFBa0IsRUFBRTtvQkFDckMsa0JBQWtCLEdBQUcsZUFBZSxDQUFDO29CQUNyQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0RzthQUNKO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUEvTUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDbUI7SUFIdEIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQW1OMUI7SUFBRCxhQUFDO0NBbk5ELEFBbU5DLENBbk5tQyxFQUFFLENBQUMsU0FBUyxHQW1OL0M7a0JBbk5vQixNQUFNO0FBc04zQixTQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDNUMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcml2YXRlIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHByaXZhdGUgbW92ZURpcjogc3RyaW5nID0gJ1MnO1xuXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gMjUwO1xuXG4gICAgcHJpdmF0ZSBhbmltOiBjYy5BbmltYXRpb24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBhbmltYXRlU3RhdGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtYXhCdWxsZXQ6IG51bWJlciA9IDU7XG5cbiAgICBwcml2YXRlIGJ1bGxldFBvb2w6IGNjLk5vZGVQb29sID0gbnVsbDtcblxuICAgIHByaXZhdGUgbmV4dEF0dGFja1RpbWU6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIG5leHRSZWxvYWRUaW1lOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBhdHRhY2tDb29sZG93bjogbnVtYmVyID0gMC4yO1xuXG4gICAgcHJpdmF0ZSByZWxvYWRDb29sZG93bjogbnVtYmVyID0gNTtcbiAgICBcbiAgICBwcml2YXRlIGF0dGFja2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBlbmVteXM6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBlbmVteUNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSB0YXJnZXRQb3NpdGlvbjogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuXG4gICAgcHJpdmF0ZSB0YXJnZXREaXJlY3Rpb246IHN0cmluZyA9ICcnO1xuXG4gICAgcHJpdmF0ZSBuZXh0VHJhY2VUaW1lOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSB0cmFjZUNvb2xkb3duOiBudW1iZXIgPSAwLjU7XG5cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuYnVsbGV0UG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnYnVsbGV0Jyk7XG4gICAgICAgIHRoaXMuYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuZW5lbXlzID0gY2MuZmluZChcIkNhbnZhcy9lbmVteVwiKTtcbiAgICAgICAgdGhpcy5lbmVteUNvdW50ID0gdGhpcy5lbmVteXMuY2hpbGRyZW5Db3VudDtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgZm9yKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5tYXhCdWxsZXQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKTtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0UG9vbC5wdXQoYnVsbGV0KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcGxheWVyTW92ZURpcihkaXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1vdmVEaXIgPSBkaXI7XG4gICAgfVxuXG4gICAgcGxheWVyTW92ZShkdDogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlRGlyKSB7XG4gICAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdORSc6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiBkdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ05XJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU1cnOlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IHRoaXMuc3BlZWQgKiBkdDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTRSc6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55IC09IHRoaXMuc3BlZWQgKiBkdDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVyV2Fsa0FuaW1hdGlvbigpIHtcbiAgICAgICAgaWYodGhpcy5hdHRhY2tpbmcpXG4gICAgICAgICAgICByZXR1cm47IFxuICAgICAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlRGlyKSB7XG4gICAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGVTdGF0ZSA9PSBudWxsIHx8IHRoaXMuYW5pbWF0ZVN0YXRlLm5hbWUgIT0gJ3BsYXllcldhbGtOJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RhdGUgPSB0aGlzLmFuaW0ucGxheSgncGxheWVyV2Fsa04nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYW5pbWF0ZVN0YXRlID09IG51bGwgfHwgdGhpcy5hbmltYXRlU3RhdGUubmFtZSAhPSAncGxheWVyV2Fsa1MnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGF0ZSA9IHRoaXMuYW5pbS5wbGF5KCdwbGF5ZXJXYWxrUycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgICAgICAgaWYodGhpcy5hbmltYXRlU3RhdGUgPT0gbnVsbCB8fCB0aGlzLmFuaW1hdGVTdGF0ZS5uYW1lICE9ICdwbGF5ZXJXYWxrRScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0YXRlID0gdGhpcy5hbmltLnBsYXkoJ3BsYXllcldhbGtFJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGVTdGF0ZSA9PSBudWxsIHx8IHRoaXMuYW5pbWF0ZVN0YXRlLm5hbWUgIT0gJ3BsYXllcldhbGtXJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RhdGUgPSB0aGlzLmFuaW0ucGxheSgncGxheWVyV2Fsa1cnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ05FJzpcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGVTdGF0ZSA9PSBudWxsIHx8IHRoaXMuYW5pbWF0ZVN0YXRlLm5hbWUgIT0gJ3BsYXllcldhbGtORScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0YXRlID0gdGhpcy5hbmltLnBsYXkoJ3BsYXllcldhbGtORScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnTlcnOlxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYW5pbWF0ZVN0YXRlID09IG51bGwgfHwgdGhpcy5hbmltYXRlU3RhdGUubmFtZSAhPSAncGxheWVyV2Fsa05XJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RhdGUgPSB0aGlzLmFuaW0ucGxheSgncGxheWVyV2Fsa05XJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTVyc6XG4gICAgICAgICAgICAgICAgaWYodGhpcy5hbmltYXRlU3RhdGUgPT0gbnVsbCB8fCB0aGlzLmFuaW1hdGVTdGF0ZS5uYW1lICE9ICdwbGF5ZXJXYWxrU1cnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGF0ZSA9IHRoaXMuYW5pbS5wbGF5KCdwbGF5ZXJXYWxrU1cnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1NFJzpcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGVTdGF0ZSA9PSBudWxsIHx8IHRoaXMuYW5pbWF0ZVN0YXRlLm5hbWUgIT0gJ3BsYXllcldhbGtTRScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0YXRlID0gdGhpcy5hbmltLnBsYXkoJ3BsYXllcldhbGtTRScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW0uc3RvcCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVyQXR0YWNrQW5pbWF0aW9uKCkge1xuICAgICAgICBsZXQgYW5nbGUgPSBjYWxjQW5nbGVEZWdyZWVzKHRoaXMudGFyZ2V0UG9zaXRpb24ueCAtIHRoaXMubm9kZS54LCB0aGlzLnRhcmdldFBvc2l0aW9uLnkgLSB0aGlzLm5vZGUueSk7XG4gICAgICAgIGlmKGFuZ2xlIDwgMTU3LjUgJiYgYW5nbGUgPj0gMTEyLjUpe1xuICAgICAgICAgICAgdGhpcy50YXJnZXREaXJlY3Rpb24gPSAnTlcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGUgPCAxMTIuNSAmJiBhbmdsZSA+PSA2Ny41KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldERpcmVjdGlvbiA9ICdOJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGUgPCA2Ny41ICYmIGFuZ2xlID49IDIyLjUpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RGlyZWN0aW9uID0gJ05FJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlIDwgMjIuNSAmJiBhbmdsZSA+PSAtMjIuNSkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXREaXJlY3Rpb24gPSAnRSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZSA8IC0yMi41ICYmIGFuZ2xlID49IC02Ny41KXtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RGlyZWN0aW9uID0gJ1NFJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlIDwgLTY3LjUgJiYgYW5nbGUgPj0gLTExMi41KXtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RGlyZWN0aW9uID0gJ1MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGUgPCAtMTEyLjUgJiYgYW5nbGUgPj0gLTE1Ny41KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldERpcmVjdGlvbiA9ICdTVyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RGlyZWN0aW9uID0gJ1cnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbS5zdG9wKCk7XG4gICAgICAgIHRoaXMuYXR0YWNraW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlU3RhdGUgPSB0aGlzLmFuaW0ucGxheSgncGxheWVyQXR0YWNrJyArIHRoaXMudGFyZ2V0RGlyZWN0aW9uKTtcbiAgICAgICAgdGhpcy5hbmltLm9uKCdmaW5pc2hlZCcsIChlKSA9PntcbiAgICAgICAgICAgIHRoaXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcGxheWVyQXR0YWNrKCkge1xuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBjYy5kaXJlY3Rvci5nZXRUb3RhbFRpbWUoKSAvIDEwMDAuMDtcbiAgICAgICAgaWYoY3VycmVudFRpbWUgPj0gdGhpcy5uZXh0QXR0YWNrVGltZSl7XG4gICAgICAgICAgICB0aGlzLm5leHRBdHRhY2tUaW1lID0gY3VycmVudFRpbWUgKyB0aGlzLmF0dGFja0Nvb2xkb3duO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdWxsZXQoKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXR0YWNrQW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9ICAgXG5cbiAgICBjcmVhdGVCdWxsZXQoKSB7XG4gICAgICAgIGxldCBidWxsZXQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5idWxsZXRQb29sLnNpemUoKSA+IDApe1xuICAgICAgICAgICAgYnVsbGV0ID0gdGhpcy5idWxsZXRQb29sLmdldCh0aGlzLmJ1bGxldFBvb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYnVsbGV0ICE9IG51bGwpXG4gICAgICAgICAgICBidWxsZXQuZ2V0Q29tcG9uZW50KCdidWxsZXQnKS5pbml0KHRoaXMubm9kZSwgdGhpcy50YXJnZXRQb3NpdGlvbiwgdGhpcy50YXJnZXREaXJlY3Rpb24pO1xuICAgIH1cbiAgICBcbiAgICB0cmFjZUVuZW15KCkge1xuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBjYy5kaXJlY3Rvci5nZXRUb3RhbFRpbWUoKSAvIDEwMDAuMDtcbiAgICAgICAgaWYoY3VycmVudFRpbWUgPj0gdGhpcy5uZXh0VHJhY2VUaW1lKXtcbiAgICAgICAgICAgIHRoaXMubmV4dFRyYWNlVGltZSA9IGN1cnJlbnRUaW1lICsgdGhpcy50cmFjZUNvb2xkb3duO1xuICAgICAgICAgICAgbGV0IG5leHRUYXJnZXREaXN0YW5jZSA9IDkwMDcxOTkyNTQ3NDA5OTI7IC8vIElOVF9NQVhcbiAgICAgICAgICAgIGxldCBuZXh0VGFyZ2V0UG9zaXRpb24gPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmVuZW15Q291bnQ7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREaXN0YW5jZSA9IHRoaXMubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5lbmVteXMuY2hpbGRyZW5baV0ucG9zaXRpb24pLm1hZygpXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudERpc3RhbmNlIDwgbmV4dFRhcmdldERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRUYXJnZXREaXN0YW5jZSA9IGN1cnJlbnREaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRhcmdldFBvc2l0aW9uID0gY2MudjIodGhpcy5lbmVteXMuY2hpbGRyZW5baV0ucG9zaXRpb24ueCwgdGhpcy5lbmVteXMuY2hpbGRyZW5baV0ucG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IG5leHRUYXJnZXRQb3NpdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLnBsYXllck1vdmUoZHQpO1xuICAgICAgICB0aGlzLnBsYXllcldhbGtBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy50cmFjZUVuZW15KCk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGNhbGNBbmdsZURlZ3JlZXMoeCwgeSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpICogMTgwIC8gTWF0aC5QSTtcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/enemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21e92XrQR1KC5am5+uTnqKr', 'enemy');
// Scripts/enemy.ts

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
var enemy = /** @class */ (function (_super) {
    __extends(enemy, _super);
    function enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player1 = null;
        _this.player2 = null;
        _this.detectRange = 100;
        _this.attackRange = 5;
        _this.attackCooldown = 1;
        _this.moveSpeed = 40;
        _this.tracingPlayer = 0;
        _this.moveDir = cc.Vec2.ZERO;
        _this.moveDuration = 2.0;
        _this.waitDuration = 1.5;
        _this.nextWaitTime = 0;
        _this.nextMoveTime = 0;
        _this.waitRandomFactor = 0.1;
        return _this;
    }
    enemy.prototype.onLoad = function () {
    };
    enemy.prototype.start = function () {
    };
    enemy.prototype.wandering = function (dt) {
        var currentTime = cc.director.getTotalTime() / 1000.0;
        if (currentTime >= this.nextMoveTime) {
            this.nextWaitTime = currentTime + this.moveDuration;
            this.nextMoveTime = this.nextWaitTime + this.waitDuration * (1.0 + this.waitRandomFactor * (Math.random() * 2.0 - 1.0));
            this.moveDir = randomPointOnUnitCircle();
        }
        if (currentTime < this.nextWaitTime) {
            this.node.x += this.moveDir.x * this.moveSpeed * dt;
            this.node.y += this.moveDir.y * this.moveSpeed * dt;
        }
    };
    enemy.prototype.tracing = function (dt) {
        var _dir = cc.v3(0, 0, 0);
        if (this.tracingPlayer == 1)
            _dir = this.player1.node.position.sub(this.node.position).normalize();
        else
            _dir = this.player2.node.position.sub(this.node.position).normalize();
        this.moveDir = cc.v2(_dir.x, _dir.y);
        this.node.x += this.moveDir.x * this.moveSpeed * dt;
        this.node.y += this.moveDir.y * this.moveSpeed * dt;
    };
    enemy.prototype.detectRangePlayer = function () {
        if (this.node.position.sub(this.player1.node.position).mag() < this.detectRange) {
            this.moveSpeed = 200;
            this.tracingPlayer = 1;
        }
        if (this.node.position.sub(this.player2.node.position).mag() < this.detectRange) {
            this.tracingPlayer = 2;
            this.moveSpeed = 200;
        }
        return 0;
    };
    enemy.prototype.update = function (dt) {
        if (!this.tracingPlayer) {
            this.wandering(dt);
            this.detectRangePlayer();
        }
        else {
            this.tracing(dt);
        }
    };
    __decorate([
        property(player_1.default)
    ], enemy.prototype, "player1", void 0);
    __decorate([
        property(player_1.default)
    ], enemy.prototype, "player2", void 0);
    enemy = __decorate([
        ccclass
    ], enemy);
    return enemy;
}(cc.Component));
exports.default = enemy;
function randomPointOnUnitCircle() {
    var angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2VuZW15LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLG1DQUE2QjtBQUN2QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQStFQztRQTVFRyxhQUFPLEdBQVcsSUFBSSxDQUFDO1FBR3ZCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFFZixpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUMxQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixvQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixlQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLGFBQU8sR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixrQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixzQkFBZ0IsR0FBRyxHQUFHLENBQUM7O0lBNERuQyxDQUFDO0lBMURHLHNCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQscUJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCx5QkFBUyxHQUFULFVBQVUsRUFBVTtRQUNoQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUN0RCxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FB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O1NBQ3BCO0lBQ0wsQ0FBQztJQTNFRDtRQURDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDOzBDQUNNO0lBR3ZCO1FBREMsUUFBUSxDQUFDLGdCQUFNLENBQUM7MENBQ007SUFOTixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBK0V6QjtJQUFELFlBQUM7Q0EvRUQsQUErRUMsQ0EvRWtDLEVBQUUsQ0FBQyxTQUFTLEdBK0U5QztrQkEvRW9CLEtBQUs7QUFrRjFCLFNBQVMsdUJBQXVCO0lBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW5lbXkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHBsYXllcilcbiAgICBwbGF5ZXIxOiBwbGF5ZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHBsYXllcilcbiAgICBwbGF5ZXIyOiBwbGF5ZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBkZXRlY3RSYW5nZTogbnVtYmVyID0gMTAwO1xuICAgIHByaXZhdGUgYXR0YWNrUmFuZ2U6IG51bWJlciA9IDU7XG4gICAgcHJpdmF0ZSBhdHRhY2tDb29sZG93bjogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIG1vdmVTcGVlZDogbnVtYmVyID0gNDA7XG4gICAgcHJpdmF0ZSB0cmFjaW5nUGxheWVyOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBtb3ZlRGlyOiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xuICAgIHByaXZhdGUgbW92ZUR1cmF0aW9uID0gMi4wO1xuICAgIHByaXZhdGUgd2FpdER1cmF0aW9uID0gMS41O1xuICAgIHByaXZhdGUgbmV4dFdhaXRUaW1lID0gMDtcbiAgICBwcml2YXRlIG5leHRNb3ZlVGltZSA9IDA7XG4gICAgcHJpdmF0ZSB3YWl0UmFuZG9tRmFjdG9yID0gMC4xO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICB3YW5kZXJpbmcoZHQ6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBjYy5kaXJlY3Rvci5nZXRUb3RhbFRpbWUoKSAvIDEwMDAuMDtcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IHRoaXMubmV4dE1vdmVUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRXYWl0VGltZSA9IGN1cnJlbnRUaW1lICsgdGhpcy5tb3ZlRHVyYXRpb247XG4gICAgICAgICAgICB0aGlzLm5leHRNb3ZlVGltZSA9IHRoaXMubmV4dFdhaXRUaW1lICsgdGhpcy53YWl0RHVyYXRpb24gKiAoMS4wICsgdGhpcy53YWl0UmFuZG9tRmFjdG9yICogKE1hdGgucmFuZG9tKCkgKiAyLjAgLSAxLjApKTtcbiAgICAgICAgICAgIHRoaXMubW92ZURpciA9IHJhbmRvbVBvaW50T25Vbml0Q2lyY2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDwgdGhpcy5uZXh0V2FpdFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMubW92ZURpci54ICogdGhpcy5tb3ZlU3BlZWQgKiBkdDtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMubW92ZURpci55ICogdGhpcy5tb3ZlU3BlZWQgKiBkdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYWNpbmcoZHQ6IG51bWJlcikge1xuICAgICAgICBsZXQgX2RpcjogY2MuVmVjMyA9IGNjLnYzKDAsIDAsIDApO1xuICAgICAgICBpZih0aGlzLnRyYWNpbmdQbGF5ZXIgPT0gMSlcbiAgICAgICAgICAgIF9kaXIgPSB0aGlzLnBsYXllcjEubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgX2RpciA9IHRoaXMucGxheWVyMi5ub2RlLnBvc2l0aW9uLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy52MihfZGlyLngsIF9kaXIueSk7XG5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5tb3ZlRGlyLnggKiB0aGlzLm1vdmVTcGVlZCAqIGR0O1xuICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLm1vdmVEaXIueSAqIHRoaXMubW92ZVNwZWVkICogZHQ7XG4gICAgfVxuXG5cbiAgICBkZXRlY3RSYW5nZVBsYXllcigpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5wbGF5ZXIxLm5vZGUucG9zaXRpb24pLm1hZygpIDwgdGhpcy5kZXRlY3RSYW5nZSl7XG4gICAgICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IDIwMDtcbiAgICAgICAgICAgIHRoaXMudHJhY2luZ1BsYXllciA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5wbGF5ZXIyLm5vZGUucG9zaXRpb24pLm1hZygpIDwgdGhpcy5kZXRlY3RSYW5nZSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNpbmdQbGF5ZXIgPSAyO1xuICAgICAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSAyMDA7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYWNpbmdQbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2FuZGVyaW5nKGR0KTtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0UmFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2luZyhkdCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gcmFuZG9tUG9pbnRPblVuaXRDaXJjbGUoKSB7XG4gICAgbGV0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgIHJldHVybiBuZXcgY2MuVmVjMihNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSk7XG59Il19
//------QC-SOURCE-SPLIT------


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
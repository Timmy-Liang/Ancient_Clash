
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
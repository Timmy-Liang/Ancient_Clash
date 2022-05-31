"use strict";
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
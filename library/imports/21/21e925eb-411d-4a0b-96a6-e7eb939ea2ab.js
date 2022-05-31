"use strict";
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
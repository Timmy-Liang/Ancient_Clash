
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
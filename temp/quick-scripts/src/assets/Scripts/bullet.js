"use strict";
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
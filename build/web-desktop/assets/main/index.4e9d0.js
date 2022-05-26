window.__require=function e(t,a,r){function o(i,c){if(!a[i]){if(!t[i]){var p=i.split("/");if(p=p[p.length-1],!t[p]){var s="function"==typeof __require&&__require;if(!c&&s)return s(p,!0);if(n)return n(p,!0);throw new Error("Cannot find module '"+i+"'")}i=p}var l=a[i]={exports:{}};t[i][0].call(l.exports,function(e){return o(t[i][1][e]||e)},l,l.exports,e,t,a,r)}return a[i].exports}for(var n="function"==typeof __require&&__require,i=0;i<r.length;i++)o(r[i]);return o}({enemy:[function(e,t,a){"use strict";cc._RF.push(t,"21e92XrQR1KC5am5+uTnqKr","enemy");var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])})(e,t)},function(e,t){function a(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),n=this&&this.__decorate||function(e,t,a,r){var o,n=arguments.length,i=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(n<3?o(i):n>3?o(t,a,i):o(t,a))||i);return n>3&&i&&Object.defineProperty(t,a,i),i};Object.defineProperty(a,"__esModule",{value:!0});var i=cc._decorator,c=i.ccclass,p=(i.property,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.detectRange=20,t.attackRange=5,t.attackCooldown=1,t.moveSpeed=5,t.tracingPlayer=!1,t.wanderVelocity=cc.Vec2.ZERO,t.moveDuration=1,t.waitDuration=.5,t.nextWaitTime=0,t.nextMoveTime=0,t.waitRandomFactor=.1,t}return o(t,e),t.prototype.onLoad=function(){},t.prototype.start=function(){},t.prototype.wandering=function(){var e,t=cc.director.getTotalTime()/1e3;t>=this.nextMoveTime&&(this.nextWaitTime=t+this.moveDuration,this.nextMoveTime=this.nextWaitTime+this.waitDuration*(1+this.waitRandomFactor*(2*Math.random()-1)),this.wanderVelocity=(e=Math.random()*Math.PI*2,new cc.Vec2(Math.cos(e),Math.sin(e))))},t.prototype.tracing=function(){},t.prototype.update=function(e){this.tracing?this.tracing(e):this.wandering(e)},n([c],t)}(cc.Component));a.default=p,cc._RF.pop()},{}],gamerManager:[function(e,t,a){"use strict";cc._RF.push(t,"9e7e14agd9NuLW2mQVAqQh0","gamerManager");var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])})(e,t)},function(e,t){function a(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),n=this&&this.__decorate||function(e,t,a,r){var o,n=arguments.length,i=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(n<3?o(i):n>3?o(t,a,i):o(t,a))||i);return n>3&&i&&Object.defineProperty(t,a,i),i};Object.defineProperty(a,"__esModule",{value:!0});var i=e("./player"),c=cc._decorator,p=c.ccclass,s=c.property,l={},y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.player1=null,t.player2=null,t.pause=!1,t.physicManager=null,t}return o(t,e),t.prototype.onLoad=function(){this.physicManager=cc.director.getPhysicsManager(),this.physicManager.enabled=!0,cc.director.getPhysicsManager().debugDrawFlags=1},t.prototype.start=function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},t.prototype.onKeyDown=function(e){l[e.keyCode]=1},t.prototype.onKeyUp=function(e){l[e.keyCode]=0},t.prototype.keyboardUpdate=function(){this.pause||(this.player1.playerMoveDir("IDLE"),this.player2.playerMoveDir("IDLE"),l[cc.macro.KEY.s]&&l[cc.macro.KEY.d]?this.player1.playerMoveDir("SE"):l[cc.macro.KEY.d]&&l[cc.macro.KEY.w]?this.player1.playerMoveDir("NE"):l[cc.macro.KEY.w]&&l[cc.macro.KEY.a]?this.player1.playerMoveDir("NW"):l[cc.macro.KEY.a]&&l[cc.macro.KEY.s]?this.player1.playerMoveDir("SW"):l[cc.macro.KEY.a]?this.player1.playerMoveDir("W"):l[cc.macro.KEY.s]?this.player1.playerMoveDir("S"):l[cc.macro.KEY.d]?this.player1.playerMoveDir("E"):l[cc.macro.KEY.w]&&this.player1.playerMoveDir("N"),l[cc.macro.KEY.down]&&l[cc.macro.KEY.right]?this.player2.playerMoveDir("SE"):l[cc.macro.KEY.right]&&l[cc.macro.KEY.up]?this.player2.playerMoveDir("NE"):l[cc.macro.KEY.up]&&l[cc.macro.KEY.left]?this.player2.playerMoveDir("NW"):l[cc.macro.KEY.left]&&l[cc.macro.KEY.down]?this.player2.playerMoveDir("SW"):l[cc.macro.KEY.up]?this.player2.playerMoveDir("N"):l[cc.macro.KEY.down]?this.player2.playerMoveDir("S"):l[cc.macro.KEY.right]?this.player2.playerMoveDir("E"):l[cc.macro.KEY.left]&&this.player2.playerMoveDir("W"))},t.prototype.update=function(){this.keyboardUpdate()},n([s(i.default)],t.prototype,"player1",void 0),n([s(i.default)],t.prototype,"player2",void 0),n([p],t)}(cc.Component);a.default=y,cc._RF.pop()},{"./player":"player"}],player:[function(e,t,a){"use strict";cc._RF.push(t,"734cf13gy1LP7FvtfHFr+av","player");var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])})(e,t)},function(e,t){function a(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),n=this&&this.__decorate||function(e,t,a,r){var o,n=arguments.length,i=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(n<3?o(i):n>3?o(t,a,i):o(t,a))||i);return n>3&&i&&Object.defineProperty(t,a,i),i};Object.defineProperty(a,"__esModule",{value:!0});var i=cc._decorator,c=i.ccclass,p=(i.property,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.moveDir="S",t.speed=250,t.anim=null,t.animateState=null,t}return o(t,e),t.prototype.start=function(){this.anim=this.getComponent(cc.Animation)},t.prototype.playerMoveDir=function(e){this.moveDir=e},t.prototype.playerMove=function(e){switch(this.moveDir){case"N":this.node.y+=this.speed*e;break;case"S":this.node.y-=this.speed*e;break;case"E":this.node.x+=this.speed*e;break;case"W":this.node.x-=this.speed*e;break;case"NE":this.node.x+=this.speed*e,this.node.y+=this.speed*e;break;case"NW":this.node.x-=this.speed*e,this.node.y+=this.speed*e;break;case"SW":this.node.x-=this.speed*e,this.node.y-=this.speed*e;break;case"SE":this.node.x+=this.speed*e,this.node.y-=this.speed*e}},t.prototype.playerAnimation=function(){switch(this.moveDir){case"N":null!=this.animateState&&"playerWalkN"==this.animateState.name||(this.animateState=this.anim.play("playerWalkN"));break;case"S":null!=this.animateState&&"playerWalkS"==this.animateState.name||(this.animateState=this.anim.play("playerWalkS"));break;case"E":null!=this.animateState&&"playerWalkE"==this.animateState.name||(this.animateState=this.anim.play("playerWalkE"));break;case"W":null!=this.animateState&&"playerWalkW"==this.animateState.name||(this.animateState=this.anim.play("playerWalkW"));break;case"NE":null!=this.animateState&&"playerWalkNE"==this.animateState.name||(this.animateState=this.anim.play("playerWalkNE"));break;case"NW":null!=this.animateState&&"playerWalkNW"==this.animateState.name||(this.animateState=this.anim.play("playerWalkNW"));break;case"SW":null!=this.animateState&&"playerWalkSW"==this.animateState.name||(this.animateState=this.anim.play("playerWalkSW"));break;case"SE":null!=this.animateState&&"playerWalkSE"==this.animateState.name||(this.animateState=this.anim.play("playerWalkSE"));break;default:this.anim.stop()}},t.prototype.update=function(e){this.playerMove(e),this.playerAnimation()},n([c],t)}(cc.Component));a.default=p,cc._RF.pop()},{}]},{},["enemy","gamerManager","player"]);
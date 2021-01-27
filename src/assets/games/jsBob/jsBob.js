/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_1 = __webpack_require__(/*! ./keyboard */ "./src/keyboard.ts");
const player_object_1 = __webpack_require__(/*! ./objects-bases/player-object */ "./src/objects-bases/player-object.ts");
const base_object_1 = __webpack_require__(/*! ./objects-bases/base-object */ "./src/objects-bases/base-object.ts");
const box_1 = __webpack_require__(/*! ./objects/box */ "./src/objects/box.ts");
const view = {
    width: 1024,
    height: 768
};
const keyboardService = keyboard_1.KeyboardService.instance;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width', String(view.width));
canvas.setAttribute('height', String(view.height));
const player = new player_object_1.PlayerObject(420, 600);
const floor = new box_1.Box(25, 700, 50, 925);
const box2 = new box_1.Box(75, 400, 50, 200, 'red');
const box3 = new box_1.Box(650, 650, 50, 300, 'green');
const box4 = new box_1.Box(700, 600, 50, 250, 'yellow');
const box1 = new box_1.Box(750, 550, 50, 200, 'cyan');
const objects = [box1, box2, floor, box3, box4, player];
const gravity = 1;
function updateObjects() {
    const physicalObjects = objects.filter(object => object.type === base_object_1.ObjectType.physical);
    const playerObjects = objects.filter(object => object.type === base_object_1.ObjectType.player);
    const dynamic = [...physicalObjects, ...playerObjects];
    dynamic.forEach(object => {
        object.update();
    });
    player.yd += gravity;
    dynamic.forEach(dObject => {
        //aabb
        const collidedWith = objects
            .filter(object => object !== dObject)
            //Todo find later if we only care about 1
            .filter(object => dObject.x < object.x + object.width &&
            dObject.x + dObject.width > object.x &&
            //
            dObject.y < object.y + object.height &&
            dObject.y + dObject.height > object.y);
        // console.log(a);
        // console.log(collidedWith.map(b => b['color']));
        dObject.onGround = false;
        if (collidedWith.length) {
            if (dObject.yd > 0) {
                dObject.onGround = true;
                dObject.yd = 0;
                dObject.y = collidedWith[0].y - dObject.height;
            }
            else if (dObject.yd < 0) {
                dObject.yd = 0;
                dObject.y = collidedWith[0].y + collidedWith[0].height;
            }
        }
    });
    // dynamic.forEach(object => {
    // player.onGround = false;
    // if (player.y + player.height >= 700) {
    //   player.y = 700 - player.height;
    //   player.yd = 0;
    //   player.onGround = true;
    // }
    // player.yd += player.onGround ? 0 : gravity;
    // console.log(player.onGround, player.yd);
    // });
}
function lockPlayerToView() {
    if (player.x > view.width) {
        player.x = -player.width;
    }
    else if (player.x + player.width < 0) {
        player.x = view.width;
    }
}
function clear() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, view.width, view.height);
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // ctx.fillRect(0, 0, view.width, view.height);
}
function tick() {
    clear();
    updateObjects();
    lockPlayerToView();
    objects.forEach(object => object.draw(ctx));
    window.requestAnimationFrame(tick);
}
tick();


/***/ }),

/***/ "./src/keyboard.ts":
/*!*************************!*\
  !*** ./src/keyboard.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class KeyboardService {
    constructor() {
        this.keyboardMap = {
            left: ['ArrowLeft', 'a'],
            right: ['ArrowRight', 'd'],
            jump: ['ArrowUp', 'w']
        };
        this.activeKeys = {};
        this.init();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    init() {
        Object.keys(this.keyboardMap).forEach(keyName => {
            this.activeKeys[keyName] = false;
        });
        window.addEventListener('keydown', e => {
            const keyName = this.getKeyName(e.key);
            if (keyName) {
                this.activeKeys[keyName] = true;
            }
        });
        window.addEventListener('keyup', e => {
            const keyName = this.getKeyName(e.key);
            if (keyName) {
                this.activeKeys[keyName] = false;
            }
        });
    }
    getKeyName(key) {
        return Object.keys(this.keyboardMap).find(name => this.keyboardMap[name].includes(key));
    }
    isKeyActive(key) {
        return this.activeKeys[key];
    }
}
exports.KeyboardService = KeyboardService;


/***/ }),

/***/ "./src/objects-bases/base-object.ts":
/*!******************************************!*\
  !*** ./src/objects-bases/base-object.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["static"] = 0] = "static";
    ObjectType[ObjectType["physical"] = 1] = "physical";
    ObjectType[ObjectType["player"] = 2] = "player";
})(ObjectType = exports.ObjectType || (exports.ObjectType = {}));
class BaseObject {
    constructor(x, y, height, width) {
        if (x != null) {
            this.x = x;
        }
        if (y != null) {
            this.y = y;
        }
        if (height != null) {
            this.height = height;
        }
        if (width != null) {
            this.width = width;
        }
    }
}
exports.BaseObject = BaseObject;


/***/ }),

/***/ "./src/objects-bases/physical-object.ts":
/*!**********************************************!*\
  !*** ./src/objects-bases/physical-object.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_object_1 = __webpack_require__(/*! ./base-object */ "./src/objects-bases/base-object.ts");
class PhysicalObject extends base_object_1.BaseObject {
    constructor() {
        super(...arguments);
        this.type = base_object_1.ObjectType.physical;
        this.xd = 0;
        this.yd = 0;
        this.onGround = false;
    }
    update() {
        this.y += this.yd;
        this.x += this.xd;
    }
    draw(ctx) { }
}
exports.PhysicalObject = PhysicalObject;


/***/ }),

/***/ "./src/objects-bases/player-object.ts":
/*!********************************************!*\
  !*** ./src/objects-bases/player-object.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const physical_object_1 = __webpack_require__(/*! ./physical-object */ "./src/objects-bases/physical-object.ts");
const keyboard_1 = __webpack_require__(/*! ../keyboard */ "./src/keyboard.ts");
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
const base_object_1 = __webpack_require__(/*! ./base-object */ "./src/objects-bases/base-object.ts");
class PlayerObject extends physical_object_1.PhysicalObject {
    constructor(x = 0, y = 0) {
        super(x, y);
        this.type = base_object_1.ObjectType.player;
        this.width = 32;
        this.height = 64;
        this.image = new Image(this.width, this.height);
        this.keyboardService = keyboard_1.KeyboardService.instance;
        this.jumpTime = 0;
        this.aniStep = 0;
        this.direction = 0;
        this.aX = 0;
        this.aY = 0;
        this.ld = 0;
        this.gutter = 16;
        this.image.src = './bobs2.gif';
        this.setImage('walk');
        this.setImage('idle');
    }
    setImage(action = 'idle') {
        // this.image.src = {
        //   idle: './bob.gif',
        //   walk: './bob_walk.gif'
        // }[action];
        this.action = action;
    }
    update() {
        if (this.keyboardService.isKeyActive('right') &&
            !this.keyboardService.isKeyActive('left')) {
            this.xd += this.onGround ? 1.5 : 0.5;
            this.setImage('walk');
            this.walkAnimation(true);
            this.ld = 0;
        }
        else if (!this.keyboardService.isKeyActive('right') &&
            this.keyboardService.isKeyActive('left')) {
            this.xd -= this.onGround ? 1.5 : 0.5;
            this.setImage('walk');
            this.walkAnimation(false);
            this.ld = 1;
        }
        else {
            this.xd *= this.onGround ? 0.7 : 0.9;
            this.setImage('idle');
            this.idleAnimation();
        }
        if (this.keyboardService.isKeyActive('jump')) {
            if (this.onGround) {
                this.yd -= 4;
                this.jumpTime = 16;
                this.jumpAnimation();
            }
            else if (this.jumpTime > 0 && this.yd < 0) {
                this.jumpAnimation();
                if (this.jumpTime % 4 === 0) {
                    // console.log(this.jumpTime);
                    this.yd -= 0.5 * this.jumpTime;
                }
                this.jumpTime--;
            }
            else {
                this.jumpTime = 0;
            }
        }
        else {
            this.jumpTime = 0;
        }
        //Clamp
        this.xd = util_1.clamp(this.xd, -15, 15);
        this.yd = util_1.clamp(this.yd, -20, 20);
        super.update();
    }
    idleAnimation() {
        this.aY = this.direction;
        this.aX = 0;
    }
    walkAnimation(right = true) {
        this.direction = right ? 0 : 1;
        this.aX = right ? 1 : 2;
        this.aY++;
        if (this.aY > 1) {
            this.aY = 0;
        }
    }
    jumpAnimation() {
        this.aX = 3;
        this.aY = this.ld;
        // this.aY++;
        // if (this.aniStep > 1) {
        //   this.aniStep = 0;
        // }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.aY * (this.width + this.gutter), this.aX * (this.height + this.gutter), this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    }
}
exports.PlayerObject = PlayerObject;


/***/ }),

/***/ "./src/objects-bases/static-object.ts":
/*!********************************************!*\
  !*** ./src/objects-bases/static-object.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_object_1 = __webpack_require__(/*! ./base-object */ "./src/objects-bases/base-object.ts");
class StaticObject extends base_object_1.BaseObject {
    constructor() {
        super(...arguments);
        this.type = base_object_1.ObjectType.static;
    }
    draw(ctx) { }
}
exports.StaticObject = StaticObject;


/***/ }),

/***/ "./src/objects/box.ts":
/*!****************************!*\
  !*** ./src/objects/box.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const static_object_1 = __webpack_require__(/*! ../objects-bases/static-object */ "./src/objects-bases/static-object.ts");
class Box extends static_object_1.StaticObject {
    constructor(x = 0, y = 0, height = 0, width = 0, color = 'blue') {
        super(x, y, height, width);
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
exports.Box = Box;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
exports.clamp = clamp;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9rZXlib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy1iYXNlcy9iYXNlLW9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy1iYXNlcy9waHlzaWNhbC1vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMtYmFzZXMvcGxheWVyLW9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy1iYXNlcy9zdGF0aWMtb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL2JveC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsOEVB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S0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLENBQUMsR0FBNkI7UUFDaEMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRjtBQVhELGtCQVdDOzs7Ozs7Ozs7Ozs7Ozs7QUNiRCxTQUFnQixLQUFLLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3pELE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNuRCxDQUFDO0FBRkQsc0JBRUMiLCJmaWxlIjoianNCb2IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEtleWJvYXJkU2VydmljZSB9IGZyb20gJy4va2V5Ym9hcmQnO1xyXG5pbXBvcnQgeyBjbGFtcCB9IGZyb20gJy4vdXRpbCc7XHJcbmltcG9ydCB7IFBsYXllck9iamVjdCB9IGZyb20gJy4vb2JqZWN0cy1iYXNlcy9wbGF5ZXItb2JqZWN0JztcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gJy4vb2JqZWN0cy1iYXNlcy9iYXNlLW9iamVjdCc7XHJcbmltcG9ydCB7IEJveCB9IGZyb20gJy4vb2JqZWN0cy9ib3gnO1xyXG5pbXBvcnQgeyBQaHlzaWNhbE9iamVjdCB9IGZyb20gJy4vb2JqZWN0cy1iYXNlcy9waHlzaWNhbC1vYmplY3QnO1xyXG5cclxuY29uc3QgdmlldyA9IHtcclxuICB3aWR0aDogMTAyNCxcclxuICBoZWlnaHQ6IDc2OFxyXG59O1xyXG5cclxuY29uc3Qga2V5Ym9hcmRTZXJ2aWNlID0gS2V5Ym9hcmRTZXJ2aWNlLmluc3RhbmNlO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XHJcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBTdHJpbmcodmlldy53aWR0aCkpO1xyXG5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcodmlldy5oZWlnaHQpKTtcclxuXHJcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXJPYmplY3QoNDIwLCA2MDApO1xyXG5jb25zdCBmbG9vciA9IG5ldyBCb3goMjUsIDcwMCwgNTAsIDkyNSk7XHJcbmNvbnN0IGJveDIgPSBuZXcgQm94KDc1LCA0MDAsIDUwLCAyMDAsICdyZWQnKTtcclxuXHJcbmNvbnN0IGJveDMgPSBuZXcgQm94KDY1MCwgNjUwLCA1MCwgMzAwLCAnZ3JlZW4nKTtcclxuY29uc3QgYm94NCA9IG5ldyBCb3goNzAwLCA2MDAsIDUwLCAyNTAsICd5ZWxsb3cnKTtcclxuXHJcbmNvbnN0IGJveDEgPSBuZXcgQm94KDc1MCwgNTUwLCA1MCwgMjAwLCAnY3lhbicpO1xyXG5cclxuY29uc3Qgb2JqZWN0cyA9IFtib3gxLCBib3gyLCBmbG9vciwgYm94MywgYm94NCwgcGxheWVyXTtcclxuXHJcbmNvbnN0IGdyYXZpdHkgPSAxO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlT2JqZWN0cygpIHtcclxuICBjb25zdCBwaHlzaWNhbE9iamVjdHMgPSBvYmplY3RzLmZpbHRlcihcclxuICAgIG9iamVjdCA9PiBvYmplY3QudHlwZSA9PT0gT2JqZWN0VHlwZS5waHlzaWNhbFxyXG4gICkgYXMgUGh5c2ljYWxPYmplY3RbXTtcclxuICBjb25zdCBwbGF5ZXJPYmplY3RzID0gb2JqZWN0cy5maWx0ZXIoXHJcbiAgICBvYmplY3QgPT4gb2JqZWN0LnR5cGUgPT09IE9iamVjdFR5cGUucGxheWVyXHJcbiAgKSBhcyBQbGF5ZXJPYmplY3RbXTtcclxuICBjb25zdCBkeW5hbWljID0gWy4uLnBoeXNpY2FsT2JqZWN0cywgLi4ucGxheWVyT2JqZWN0c107XHJcblxyXG4gIGR5bmFtaWMuZm9yRWFjaChvYmplY3QgPT4ge1xyXG4gICAgb2JqZWN0LnVwZGF0ZSgpO1xyXG4gIH0pO1xyXG4gIHBsYXllci55ZCArPSBncmF2aXR5O1xyXG5cclxuICBkeW5hbWljLmZvckVhY2goZE9iamVjdCA9PiB7XHJcbiAgICAvL2FhYmJcclxuICAgIGNvbnN0IGNvbGxpZGVkV2l0aCA9IG9iamVjdHNcclxuICAgICAgLmZpbHRlcihvYmplY3QgPT4gb2JqZWN0ICE9PSBkT2JqZWN0KVxyXG4gICAgICAvL1RvZG8gZmluZCBsYXRlciBpZiB3ZSBvbmx5IGNhcmUgYWJvdXQgMVxyXG4gICAgICAuZmlsdGVyKFxyXG4gICAgICAgIG9iamVjdCA9PlxyXG4gICAgICAgICAgZE9iamVjdC54IDwgb2JqZWN0LnggKyBvYmplY3Qud2lkdGggJiZcclxuICAgICAgICAgIGRPYmplY3QueCArIGRPYmplY3Qud2lkdGggPiBvYmplY3QueCAmJlxyXG4gICAgICAgICAgLy9cclxuICAgICAgICAgIGRPYmplY3QueSA8IG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCAmJlxyXG4gICAgICAgICAgZE9iamVjdC55ICsgZE9iamVjdC5oZWlnaHQgPiBvYmplY3QueVxyXG4gICAgICApO1xyXG4gICAgLy8gY29uc29sZS5sb2coYSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhjb2xsaWRlZFdpdGgubWFwKGIgPT4gYlsnY29sb3InXSkpO1xyXG4gICAgZE9iamVjdC5vbkdyb3VuZCA9IGZhbHNlO1xyXG4gICAgaWYgKGNvbGxpZGVkV2l0aC5sZW5ndGgpIHtcclxuICAgICAgaWYgKGRPYmplY3QueWQgPiAwKSB7XHJcbiAgICAgICAgZE9iamVjdC5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgZE9iamVjdC55ZCA9IDA7XHJcbiAgICAgICAgZE9iamVjdC55ID0gY29sbGlkZWRXaXRoWzBdLnkgLSBkT2JqZWN0LmhlaWdodDtcclxuICAgICAgfSBlbHNlIGlmIChkT2JqZWN0LnlkIDwgMCkge1xyXG4gICAgICAgIGRPYmplY3QueWQgPSAwO1xyXG4gICAgICAgIGRPYmplY3QueSA9IGNvbGxpZGVkV2l0aFswXS55ICsgY29sbGlkZWRXaXRoWzBdLmhlaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBkeW5hbWljLmZvckVhY2gob2JqZWN0ID0+IHtcclxuICAvLyBwbGF5ZXIub25Hcm91bmQgPSBmYWxzZTtcclxuXHJcbiAgLy8gaWYgKHBsYXllci55ICsgcGxheWVyLmhlaWdodCA+PSA3MDApIHtcclxuICAvLyAgIHBsYXllci55ID0gNzAwIC0gcGxheWVyLmhlaWdodDtcclxuICAvLyAgIHBsYXllci55ZCA9IDA7XHJcbiAgLy8gICBwbGF5ZXIub25Hcm91bmQgPSB0cnVlO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gcGxheWVyLnlkICs9IHBsYXllci5vbkdyb3VuZCA/IDAgOiBncmF2aXR5O1xyXG4gIC8vIGNvbnNvbGUubG9nKHBsYXllci5vbkdyb3VuZCwgcGxheWVyLnlkKTtcclxuICAvLyB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9ja1BsYXllclRvVmlldygpIHtcclxuICBpZiAocGxheWVyLnggPiB2aWV3LndpZHRoKSB7XHJcbiAgICBwbGF5ZXIueCA9IC1wbGF5ZXIud2lkdGg7XHJcbiAgfSBlbHNlIGlmIChwbGF5ZXIueCArIHBsYXllci53aWR0aCA8IDApIHtcclxuICAgIHBsYXllci54ID0gdmlldy53aWR0aDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xyXG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgdmlldy53aWR0aCwgdmlldy5oZWlnaHQpO1xyXG4gIC8vIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpJztcclxuICAvLyBjdHguZmlsbFJlY3QoMCwgMCwgdmlldy53aWR0aCwgdmlldy5oZWlnaHQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0aWNrKCkge1xyXG4gIGNsZWFyKCk7XHJcblxyXG4gIHVwZGF0ZU9iamVjdHMoKTtcclxuXHJcbiAgbG9ja1BsYXllclRvVmlldygpO1xyXG5cclxuICBvYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5kcmF3KGN0eCkpO1xyXG5cclxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xyXG59XHJcblxyXG50aWNrKCk7XHJcbiIsImludGVyZmFjZSBLZXlib2FyZE1hcCB7XHJcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBLZXlib2FyZEFjdGl2ZU1hcCB7XHJcbiAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBLZXlib2FyZFNlcnZpY2U7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZXlib2FyZE1hcDogS2V5Ym9hcmRNYXAgPSB7XHJcbiAgICBsZWZ0OiBbJ0Fycm93TGVmdCcsICdhJ10sXHJcbiAgICByaWdodDogWydBcnJvd1JpZ2h0JywgJ2QnXSxcclxuICAgIGp1bXA6IFsnQXJyb3dVcCcsICd3J11cclxuICB9O1xyXG5cclxuICBwcml2YXRlIGFjdGl2ZUtleXM6IEtleWJvYXJkQWN0aXZlTWFwID0ge307XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMua2V5Ym9hcmRNYXApLmZvckVhY2goa2V5TmFtZSA9PiB7XHJcbiAgICAgIHRoaXMuYWN0aXZlS2V5c1trZXlOYW1lXSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgY29uc3Qga2V5TmFtZSA9IHRoaXMuZ2V0S2V5TmFtZShlLmtleSk7XHJcbiAgICAgIGlmIChrZXlOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVLZXlzW2tleU5hbWVdID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleU5hbWUgPSB0aGlzLmdldEtleU5hbWUoZS5rZXkpO1xyXG4gICAgICBpZiAoa2V5TmFtZSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlS2V5c1trZXlOYW1lXSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0S2V5TmFtZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5rZXlib2FyZE1hcCkuZmluZChuYW1lID0+XHJcbiAgICAgIHRoaXMua2V5Ym9hcmRNYXBbbmFtZV0uaW5jbHVkZXMoa2V5KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0tleUFjdGl2ZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlS2V5c1trZXldO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBPYmplY3RUeXBlIHtcclxuICBzdGF0aWMsXHJcbiAgcGh5c2ljYWwsXHJcbiAgcGxheWVyXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlT2JqZWN0IHtcclxuICBhYnN0cmFjdCB0eXBlOiBPYmplY3RUeXBlO1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlciwgaGVpZ2h0PzogbnVtYmVyLCB3aWR0aD86IG51bWJlcikge1xyXG4gICAgaWYgKHggIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgfVxyXG4gICAgaWYgKHkgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG4gICAgaWYgKGhlaWdodCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYgKHdpZHRoICE9IG51bGwpIHtcclxuICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWJzdHJhY3QgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZU9iamVjdCwgT2JqZWN0VHlwZSB9IGZyb20gJy4vYmFzZS1vYmplY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBoeXNpY2FsT2JqZWN0IGV4dGVuZHMgQmFzZU9iamVjdCB7XHJcbiAgdHlwZSA9IE9iamVjdFR5cGUucGh5c2ljYWw7XHJcbiAgeGQ6IG51bWJlciA9IDA7XHJcbiAgeWQ6IG51bWJlciA9IDA7XHJcbiAgb25Hcm91bmQgPSBmYWxzZTtcclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy55ICs9IHRoaXMueWQ7XHJcbiAgICB0aGlzLnggKz0gdGhpcy54ZDtcclxuICB9XHJcbiAgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBQaHlzaWNhbE9iamVjdCB9IGZyb20gJy4vcGh5c2ljYWwtb2JqZWN0JztcclxuaW1wb3J0IHsgS2V5Ym9hcmRTZXJ2aWNlIH0gZnJvbSAnLi4va2V5Ym9hcmQnO1xyXG5pbXBvcnQgeyBjbGFtcCB9IGZyb20gJy4uL3V0aWwnO1xyXG5pbXBvcnQgeyBPYmplY3RUeXBlIH0gZnJvbSAnLi9iYXNlLW9iamVjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyT2JqZWN0IGV4dGVuZHMgUGh5c2ljYWxPYmplY3Qge1xyXG4gIHR5cGUgPSBPYmplY3RUeXBlLnBsYXllcjtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXIgPSAzMjtcclxuICBoZWlnaHQ6IG51bWJlciA9IDY0O1xyXG5cclxuICByZWFkb25seSBpbWFnZSA9IG5ldyBJbWFnZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgcmVhZG9ubHkga2V5Ym9hcmRTZXJ2aWNlID0gS2V5Ym9hcmRTZXJ2aWNlLmluc3RhbmNlO1xyXG4gIGp1bXBUaW1lID0gMDtcclxuICBhbmlTdGVwID0gMDtcclxuICBhY3Rpb247XHJcbiAgZGlyZWN0aW9uID0gMDtcclxuXHJcbiAgYVggPSAwO1xyXG4gIGFZID0gMDtcclxuICBsZCA9IDA7XHJcblxyXG4gIGd1dHRlciA9IDE2O1xyXG5cclxuICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcclxuICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnLi9ib2JzMi5naWYnO1xyXG4gICAgdGhpcy5zZXRJbWFnZSgnd2FsaycpO1xyXG4gICAgdGhpcy5zZXRJbWFnZSgnaWRsZScpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW1hZ2UoYWN0aW9uOiAnaWRsZScgfCAnd2FsaycgPSAnaWRsZScpIHtcclxuICAgIC8vIHRoaXMuaW1hZ2Uuc3JjID0ge1xyXG4gICAgLy8gICBpZGxlOiAnLi9ib2IuZ2lmJyxcclxuICAgIC8vICAgd2FsazogJy4vYm9iX3dhbGsuZ2lmJ1xyXG4gICAgLy8gfVthY3Rpb25dO1xyXG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMua2V5Ym9hcmRTZXJ2aWNlLmlzS2V5QWN0aXZlKCdyaWdodCcpICYmXHJcbiAgICAgICF0aGlzLmtleWJvYXJkU2VydmljZS5pc0tleUFjdGl2ZSgnbGVmdCcpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy54ZCArPSB0aGlzLm9uR3JvdW5kID8gMS41IDogMC41O1xyXG4gICAgICB0aGlzLnNldEltYWdlKCd3YWxrJyk7XHJcbiAgICAgIHRoaXMud2Fsa0FuaW1hdGlvbih0cnVlKTtcclxuICAgICAgdGhpcy5sZCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAhdGhpcy5rZXlib2FyZFNlcnZpY2UuaXNLZXlBY3RpdmUoJ3JpZ2h0JykgJiZcclxuICAgICAgdGhpcy5rZXlib2FyZFNlcnZpY2UuaXNLZXlBY3RpdmUoJ2xlZnQnKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMueGQgLT0gdGhpcy5vbkdyb3VuZCA/IDEuNSA6IDAuNTtcclxuICAgICAgdGhpcy5zZXRJbWFnZSgnd2FsaycpO1xyXG4gICAgICB0aGlzLndhbGtBbmltYXRpb24oZmFsc2UpO1xyXG4gICAgICB0aGlzLmxkID0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueGQgKj0gdGhpcy5vbkdyb3VuZCA/IDAuNyA6IDAuOTtcclxuICAgICAgdGhpcy5zZXRJbWFnZSgnaWRsZScpO1xyXG4gICAgICB0aGlzLmlkbGVBbmltYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5rZXlib2FyZFNlcnZpY2UuaXNLZXlBY3RpdmUoJ2p1bXAnKSkge1xyXG4gICAgICBpZiAodGhpcy5vbkdyb3VuZCkge1xyXG4gICAgICAgIHRoaXMueWQgLT0gNDtcclxuICAgICAgICB0aGlzLmp1bXBUaW1lID0gMTY7XHJcbiAgICAgICAgdGhpcy5qdW1wQW5pbWF0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5qdW1wVGltZSA+IDAgJiYgdGhpcy55ZCA8IDApIHtcclxuICAgICAgICB0aGlzLmp1bXBBbmltYXRpb24oKTtcclxuICAgICAgICBpZiAodGhpcy5qdW1wVGltZSAlIDQgPT09IDApIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuanVtcFRpbWUpO1xyXG4gICAgICAgICAgdGhpcy55ZCAtPSAwLjUgKiB0aGlzLmp1bXBUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmp1bXBUaW1lLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5qdW1wVGltZSA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuanVtcFRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQ2xhbXBcclxuICAgIHRoaXMueGQgPSBjbGFtcCh0aGlzLnhkLCAtMTUsIDE1KTtcclxuICAgIHRoaXMueWQgPSBjbGFtcCh0aGlzLnlkLCAtMjAsIDIwKTtcclxuXHJcbiAgICBzdXBlci51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIGlkbGVBbmltYXRpb24oKSB7XHJcbiAgICB0aGlzLmFZID0gdGhpcy5kaXJlY3Rpb247XHJcbiAgICB0aGlzLmFYID0gMDtcclxuICB9XHJcblxyXG4gIHdhbGtBbmltYXRpb24ocmlnaHQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHJpZ2h0ID8gMCA6IDE7XHJcbiAgICB0aGlzLmFYID0gcmlnaHQgPyAxIDogMjtcclxuICAgIHRoaXMuYVkrKztcclxuICAgIGlmICh0aGlzLmFZID4gMSkge1xyXG4gICAgICB0aGlzLmFZID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGp1bXBBbmltYXRpb24oKSB7XHJcbiAgICB0aGlzLmFYID0gMztcclxuICAgIHRoaXMuYVkgPSB0aGlzLmxkO1xyXG4gICAgLy8gdGhpcy5hWSsrO1xyXG4gICAgLy8gaWYgKHRoaXMuYW5pU3RlcCA+IDEpIHtcclxuICAgIC8vICAgdGhpcy5hbmlTdGVwID0gMDtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgIGN0eC5kcmF3SW1hZ2UoXHJcbiAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgIHRoaXMuYVkgKiAodGhpcy53aWR0aCArIHRoaXMuZ3V0dGVyKSxcclxuICAgICAgdGhpcy5hWCAqICh0aGlzLmhlaWdodCArIHRoaXMuZ3V0dGVyKSxcclxuICAgICAgdGhpcy53aWR0aCxcclxuICAgICAgdGhpcy5oZWlnaHQsXHJcbiAgICAgIE1hdGguZmxvb3IodGhpcy54KSxcclxuICAgICAgTWF0aC5mbG9vcih0aGlzLnkpLFxyXG4gICAgICB0aGlzLndpZHRoLFxyXG4gICAgICB0aGlzLmhlaWdodFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZU9iamVjdCwgT2JqZWN0VHlwZSB9IGZyb20gJy4vYmFzZS1vYmplY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRpY09iamVjdCBleHRlbmRzIEJhc2VPYmplY3Qge1xyXG4gIHR5cGUgPSBPYmplY3RUeXBlLnN0YXRpYztcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcblxyXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3RhdGljT2JqZWN0IH0gZnJvbSAnLi4vb2JqZWN0cy1iYXNlcy9zdGF0aWMtb2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBTdGF0aWNPYmplY3Qge1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgaGVpZ2h0ID0gMCwgd2lkdGggPSAwLCBjb2xvciA9ICdibHVlJykge1xyXG4gICAgc3VwZXIoeCwgeSwgaGVpZ2h0LCB3aWR0aCk7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgfVxyXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjbGFtcChudW06IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gbnVtIDw9IG1pbiA/IG1pbiA6IG51bSA+PSBtYXggPyBtYXggOiBudW07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
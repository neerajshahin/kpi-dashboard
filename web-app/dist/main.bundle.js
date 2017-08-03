var ac_main =
webpackJsonpac__name_([1],{

/***/ "./node_modules/angular2-perfect-scrollbar/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__("./node_modules/@angular/common/index.js"), __webpack_require__("./node_modules/@angular/core/index.js"));
	else if(typeof define === 'function' && define.amd)
		define("angular2-perfect-scrollbar", ["@angular/common", "@angular/core"], factory);
	else if(typeof exports === 'object')
		exports["angular2-perfect-scrollbar"] = factory(require("@angular/common"), require("@angular/core"));
	else
		root["angular2-perfect-scrollbar"] = factory(root["@angular/common"], root["@angular/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var cls = __webpack_require__(5);
var defaultSettings = __webpack_require__(15);
var dom = __webpack_require__(4);
var EventManager = __webpack_require__(12);
var guid = __webpack_require__(13);

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = _.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    cls.add(element, 'ps-focus');
  }

  function blur() {
    cls.remove(element, 'ps-focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var cls = __webpack_require__(5);
var dom = __webpack_require__(4);

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

var clone = exports.clone = function (obj) {
  if (!obj) {
    return null;
  } else if (obj.constructor === Array) {
    return obj.map(clone);
  } else if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = clone(original);
  for (var key in source) {
    result[key] = clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var cls = __webpack_require__(5);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateScroll = __webpack_require__(3);

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    cls.add(element, 'ps-active-x');
  } else {
    cls.remove(element, 'ps-active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    cls.add(element, 'ps-active-y');
  } else {
    cls.remove(element, 'ps-active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var instances = __webpack_require__(0);

var lastTop;
var lastLeft;

var createDOMEvent = function (name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (!lastTop) {
    lastTop = element.scrollTop;
  }

  if (!lastLeft) {
    lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top') {
    element.scrollTop = lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left') {
    element.scrollLeft = lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }

};


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
'use strict';

var DOM = {};

DOM.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;


/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
'use strict';

function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return Array.prototype.slice.apply(element.classList);
  } else {
    return element.className.split(' ');
  }
};


/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";
var PerfectScrollbarConfig = (function () {
    function PerfectScrollbarConfig(config) {
        if (config === void 0) { config = {}; }
        this.assign(config);
    }
    PerfectScrollbarConfig.prototype.assign = function (config) {
        if (config === void 0) { config = {}; }
        for (var key in config) {
            this[key] = config[key];
        }
    };
    return PerfectScrollbarConfig;
}());
exports.PerfectScrollbarConfig = PerfectScrollbarConfig;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Ps = __webpack_require__(11);
var core_1 = __webpack_require__(8);
var perfect_scrollbar_interfaces_1 = __webpack_require__(6);
var PerfectScrollbarComponent = (function () {
    function PerfectScrollbarComponent(elementRef, defaults, zone) {
        this.elementRef = elementRef;
        this.defaults = defaults;
        this.zone = zone;
        this.runInsideAngular = false;
    }
    PerfectScrollbarComponent.prototype.ngDoCheck = function () {
        if (this.elementRef.nativeElement.children) {
            var width = this.elementRef.nativeElement.offsetWidth;
            var height = this.elementRef.nativeElement.offsetHeight;
            var contentWidth = this.elementRef.nativeElement.children[0].offsetWidth;
            var contentHeight = this.elementRef.nativeElement.children[0].offsetHeight;
            if (width !== this.width || height !== this.height || contentWidth !== this.contentWidth || contentHeight !== this.contentHeight) {
                this.width = width;
                this.height = height;
                this.contentWidth = contentWidth;
                this.contentHeight = contentHeight;
                Ps.update(this.elementRef.nativeElement);
            }
        }
    };
    PerfectScrollbarComponent.prototype.ngOnDestroy = function () {
        Ps.destroy(this.elementRef.nativeElement);
    };
    PerfectScrollbarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var config = new perfect_scrollbar_interfaces_1.PerfectScrollbarConfig(this.defaults);
        config.assign(this.config);
        if (this.runInsideAngular) {
            Ps.initialize(this.elementRef.nativeElement, config);
        }
        else {
            this.zone.runOutsideAngular(function () {
                Ps.initialize(_this.elementRef.nativeElement, config);
            });
        }
    };
    PerfectScrollbarComponent.prototype.update = function () {
        Ps.update(this.elementRef.nativeElement);
    };
    PerfectScrollbarComponent.prototype.scrollTo = function (position) {
        this.elementRef.nativeElement.scrollTop = position;
        Ps.update(this.elementRef.nativeElement);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PerfectScrollbarComponent.prototype, "runInsideAngular", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PerfectScrollbarComponent.prototype, "config", void 0);
    PerfectScrollbarComponent = __decorate([
        core_1.Component({
            selector: 'perfect-scrollbar',
            template: '<div class="ps-content"><ng-content></ng-content></div>',
            styles: [__webpack_require__(10)],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                style: 'display: block; position: relative;'
            }
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ElementRef, perfect_scrollbar_interfaces_1.PerfectScrollbarConfig, core_1.NgZone])
    ], PerfectScrollbarComponent);
    return PerfectScrollbarComponent;
}());
exports.PerfectScrollbarComponent = PerfectScrollbarComponent;


/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var common_1 = __webpack_require__(26);
var core_1 = __webpack_require__(8);
var perfect_scrollbar_component_1 = __webpack_require__(7);
var perfect_scrollbar_interfaces_1 = __webpack_require__(6);
exports.PERFECT_SCROLLBAR_GUARD = new core_1.OpaqueToken('PERFECT_SCROLLBAR_GUARD');
exports.PERFECT_SCROLLBAR_CONFIG = new core_1.OpaqueToken('PERFECT_SCROLLBAR_CONFIG');
var PerfectScrollbarModule = (function () {
    function PerfectScrollbarModule(guard) {
    }
    PerfectScrollbarModule.forRoot = function (config) {
        return {
            ngModule: PerfectScrollbarModule,
            providers: [
                {
                    provide: exports.PERFECT_SCROLLBAR_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [
                        [
                            perfect_scrollbar_interfaces_1.PerfectScrollbarConfig,
                            new core_1.Optional(),
                            new core_1.SkipSelf()
                        ]
                    ]
                },
                {
                    provide: exports.PERFECT_SCROLLBAR_CONFIG,
                    useValue: config ? config : {}
                },
                {
                    provide: perfect_scrollbar_interfaces_1.PerfectScrollbarConfig,
                    useFactory: function (config) { return new perfect_scrollbar_interfaces_1.PerfectScrollbarConfig(config); },
                    deps: [
                        exports.PERFECT_SCROLLBAR_CONFIG
                    ]
                }
            ]
        };
    };
    PerfectScrollbarModule.forChild = function () {
        return {
            ngModule: PerfectScrollbarModule
        };
    };
    PerfectScrollbarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [perfect_scrollbar_component_1.PerfectScrollbarComponent],
            exports: [common_1.CommonModule, perfect_scrollbar_component_1.PerfectScrollbarComponent]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(exports.PERFECT_SCROLLBAR_GUARD)), 
        __metadata('design:paramtypes', [Object])
    ], PerfectScrollbarModule);
    return PerfectScrollbarModule;
}());
exports.PerfectScrollbarModule = PerfectScrollbarModule;
function provideForRootGuard(config) {
    if (config) {
        throw new Error("\n      Application called PerfectScrollbarModule.forRoot() twice.\n      For submodules use PerfectScrollbarModule.forChild() instead.\n    ");
    }
    return 'guarded';
}
exports.provideForRootGuard = provideForRootGuard;


/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = "/* perfect-scrollbar v0.6.14 */\n.ps-container{-ms-touch-action:auto;touch-action:auto;overflow:hidden !important;-ms-overflow-style:none}@supports (-ms-overflow-style: none){.ps-container{overflow:auto !important}}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.ps-container{overflow:auto !important}}.ps-container.ps-active-x>.ps-scrollbar-x-rail,.ps-container.ps-active-y>.ps-scrollbar-y-rail{display:block;background-color:transparent}.ps-container.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail{background-color:#eee;opacity:.9}.ps-container.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail>.ps-scrollbar-x{background-color:#999;height:11px}.ps-container.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail{background-color:#eee;opacity:.9}.ps-container.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail>.ps-scrollbar-y{background-color:#999;width:11px}.ps-container>.ps-scrollbar-x-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear, opacity .2s linear;-o-transition:background-color .2s linear, opacity .2s linear;-moz-transition:background-color .2s linear, opacity .2s linear;transition:background-color .2s linear, opacity .2s linear;bottom:0px;height:15px}.ps-container>.ps-scrollbar-x-rail>.ps-scrollbar-x{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;-moz-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;bottom:2px;height:6px}.ps-container>.ps-scrollbar-x-rail:hover>.ps-scrollbar-x,.ps-container>.ps-scrollbar-x-rail:active>.ps-scrollbar-x{height:11px}.ps-container>.ps-scrollbar-y-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear, opacity .2s linear;-o-transition:background-color .2s linear, opacity .2s linear;-moz-transition:background-color .2s linear, opacity .2s linear;transition:background-color .2s linear, opacity .2s linear;right:0;width:15px}.ps-container>.ps-scrollbar-y-rail>.ps-scrollbar-y{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;-moz-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;right:2px;width:6px}.ps-container>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y,.ps-container>.ps-scrollbar-y-rail:active>.ps-scrollbar-y{width:11px}.ps-container:hover.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail{background-color:#eee;opacity:.9}.ps-container:hover.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail>.ps-scrollbar-x{background-color:#999;height:11px}.ps-container:hover.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail{background-color:#eee;opacity:.9}.ps-container:hover.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail>.ps-scrollbar-y{background-color:#999;width:11px}.ps-container:hover>.ps-scrollbar-x-rail,.ps-container:hover>.ps-scrollbar-y-rail{opacity:.6}.ps-container:hover>.ps-scrollbar-x-rail:hover{background-color:#eee;opacity:.9}.ps-container:hover>.ps-scrollbar-x-rail:hover>.ps-scrollbar-x{background-color:#999}.ps-container:hover>.ps-scrollbar-y-rail:hover{background-color:#eee;opacity:.9}.ps-container:hover>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y{background-color:#999}\n"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = __webpack_require__(14);


/***/ },
/* 12 */
/***/ function(module, exports) {

"use strict";
'use strict';

var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;


/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var destroy = __webpack_require__(16);
var initialize = __webpack_require__(24);
var update = __webpack_require__(25);

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};


/***/ },
/* 15 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = {
  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipePropagation: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
  theme: 'default'
};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      if (e.metaKey) {
        deltaX = -i.contentWidth;
      } else if (e.altKey) {
        deltaX = -i.containerWidth;
      } else {
        deltaX = -30;
      }
      break;
    case 38: // up
      if (e.metaKey) {
        deltaY = i.contentHeight;
      } else if (e.altKey) {
        deltaY = i.containerHeight;
      } else {
        deltaY = 30;
      }
      break;
    case 39: // right
      if (e.metaKey) {
        deltaX = i.contentWidth;
      } else if (e.altKey) {
        deltaX = i.containerWidth;
      } else {
        deltaX = 30;
      }
      break;
    case 40: // down
      if (e.metaKey) {
        deltaY = -i.contentHeight;
      } else if (e.altKey) {
        deltaY = -i.containerHeight;
      } else {
        deltaY = -30;
      }
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      if (!window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  }

  if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var cls = __webpack_require__(5);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);

// Handlers
var handlers = {
  'click-rail': __webpack_require__(17),
  'drag-scrollbar': __webpack_require__(18),
  'keyboard': __webpack_require__(19),
  'wheel': __webpack_require__(20),
  'touch': __webpack_require__(23),
  'selection': __webpack_require__(22)
};
var nativeScrollHandler = __webpack_require__(21);

module.exports = function (element, userSettings) {
  userSettings = typeof userSettings === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = _.extend(i.settings, userSettings);
  cls.add(element, 'ps-theme-' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};


/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(7));
__export(__webpack_require__(6));
__export(__webpack_require__(9));


/***/ }
/******/ ]);
});
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/css-loader/index.js!./src/app/app.component.css":
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ },

/***/ "./node_modules/css-loader/index.js!./src/app/components/ui/footer/footer.component.css":
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".footer-wrapper{ \n    background-color: #333333;\n    display: flex;\n    display: -webkit-flex;\n    flex-wrap: wrap;\n    -webkit-flex-wrap: wrap;\n    justify-content: center;\n    -webkit-justify-content: center;\n    align-items: center;\n    -webkit-align-items: center;\n    height: 100px;\n    width: 100%;\n}\n.logo-container img{\n    height: 100%;\n    width: 100%;\n}\n.logo-container{\n    height: 55px;\n    width: 231px;\n}\n   ", ""]);

// exports


/***/ },

/***/ "./node_modules/css-loader/index.js!./src/app/components/ui/header/header.component.css":
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".container{\n    padding-left: 52px;\n    padding-right: 53px;\n}\n.navbar-site {\n    background-color: #fff;\n    border: 0px;\n    margin-bottom: 0px;\n    z-index: 1;\n    padding-top: 20px;\n    padding-bottom: 20px;\n}\n.navbar-header{\n    margin-right: 49px;\n    width: 186px;\n    margin-left: 0px;\n}\nimg.header-logo{\n    width: 100%;\n}", ""]);

// exports


/***/ },

/***/ "./node_modules/css-loader/index.js!./src/app/home/home.component.css":
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "/*styles for home content only*/", ""]);

// exports


/***/ },

/***/ "./node_modules/ng2-charts/components/charts/charts.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
/* tslint:disable-next-line */
var BaseChartDirective = (function () {
    function BaseChartDirective(element) {
        this.labels = [];
        this.options = {};
        this.chartClick = new core_1.EventEmitter();
        this.chartHover = new core_1.EventEmitter();
        this.initFlag = false;
        this.element = element;
    }
    BaseChartDirective.prototype.ngOnInit = function () {
        this.ctx = this.element.nativeElement.getContext('2d');
        this.cvs = this.element.nativeElement;
        this.initFlag = true;
        if (this.data || this.datasets) {
            this.refresh();
        }
    };
    BaseChartDirective.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            // Check if the changes are in the data or datasets
            if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
                this.chart.data.datasets = this.getDatasets();
                if (changes.hasOwnProperty('labels')) {
                    this.chart.data.labels = this.labels;
                }
                this.chart.update();
            }
            else {
                this.refresh();
            }
        }
    };
    BaseChartDirective.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
    };
    BaseChartDirective.prototype.getChartBuilder = function (ctx /*, data:Array<any>, options:any*/) {
        var _this = this;
        var datasets = this.getDatasets();
        var options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = function (active) {
                if (active && !active.length) {
                    return;
                }
                _this.chartHover.emit({ active: active });
            };
        }
        if (!options.onClick) {
            options.onClick = function (event, active) {
                _this.chartClick.emit({ event: event, active: active });
            };
        }
        var opts = {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: options
        };
        if (typeof Chart === 'undefined') {
            throw new Error('ng2-charts configuration issue: Embedding Chart.js lib is mandatory');
        }
        return new Chart(ctx, opts);
    };
    BaseChartDirective.prototype.getDatasets = function () {
        var _this = this;
        var datasets = void 0;
        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = this.data.map(function (data, index) {
                    return { data: data, label: _this.labels[index] || "Label " + index };
                });
            }
            else {
                datasets = [{ data: this.data, label: "Label 0" }];
            }
        }
        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets)
                .map(function (elm, index) {
                var newElm = Object.assign({}, elm);
                if (_this.colors && _this.colors.length) {
                    Object.assign(newElm, _this.colors[index]);
                }
                else {
                    Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
                }
                return newElm;
            });
        }
        if (!datasets) {
            throw new Error("ng-charts configuration error, \n      data or datasets field are required to render char " + this.chartType);
        }
        return datasets;
    };
    BaseChartDirective.prototype.refresh = function () {
        // if (this.options && this.options.responsive) {
        //   setTimeout(() => this.refresh(), 50);
        // }
        // todo: remove this line, it is producing flickering
        this.ngOnDestroy();
        this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
    };
    BaseChartDirective.defaultColors = [
        [255, 99, 132],
        [54, 162, 235],
        [255, 206, 86],
        [231, 233, 237],
        [75, 192, 192],
        [151, 187, 205],
        [220, 220, 220],
        [247, 70, 74],
        [70, 191, 189],
        [253, 180, 92],
        [148, 159, 177],
        [77, 83, 96]
    ];
    BaseChartDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'canvas[baseChart]' },] },
    ];
    /** @nocollapse */
    BaseChartDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    BaseChartDirective.propDecorators = {
        'data': [{ type: core_1.Input },],
        'datasets': [{ type: core_1.Input },],
        'labels': [{ type: core_1.Input },],
        'options': [{ type: core_1.Input },],
        'chartType': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'chartClick': [{ type: core_1.Output },],
        'chartHover': [{ type: core_1.Output },],
    };
    return BaseChartDirective;
}());
exports.BaseChartDirective = BaseChartDirective;
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function () { return '#fff'; }),
        pointBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointBorderColor: colors.map(function () { return '#fff'; }),
        pointHoverBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointHoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function (color) { return rgba(color, 1); }),
        hoverBackgroundColor: colors.map(function (color) { return rgba(color, 0.8); }),
        hoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param index
 * @returns {number[]|Color}
 */
function generateColor(index) {
    return BaseChartDirective.defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param count
 * @returns {Colors}
 */
function generateColors(count) {
    var colorsArr = new Array(count);
    for (var i = 0; i < count; i++) {
        colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
/**
 * Generate colors by chart type
 * @param chartType
 * @param index
 * @param count
 * @returns {Color}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}
var ChartsModule = (function () {
    function ChartsModule() {
    }
    ChartsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        BaseChartDirective
                    ],
                    exports: [
                        BaseChartDirective
                    ],
                    imports: []
                },] },
    ];
    /** @nocollapse */
    ChartsModule.ctorParameters = [];
    return ChartsModule;
}());
exports.ChartsModule = ChartsModule;


/***/ },

/***/ "./node_modules/ng2-charts/ng2-charts.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-charts/components/charts/charts.js"));


/***/ },

/***/ "./node_modules/ng2-cookies/cookie.js":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Class Cookie - Holds static functions to deal with Cookies
 */
var CookieService = (function () {
    function CookieService() {
    }
    /**
     * Checks the existence of a single cookie by it's name
     *
     * @param  {string} name Identification of the cookie
     * @returns existence of the cookie
     */
    CookieService.prototype.check = function (name) {
        if (typeof document === "undefined")
            return false; // Check if document exist avoiding issues on server side prerendering
        name = encodeURIComponent(name);
        var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
        var exists = regexp.test(document.cookie);
        return exists;
    };
    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    CookieService.prototype.get = function (name) {
        if (this.check(name)) {
            name = encodeURIComponent(name);
            var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            var result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        }
        else {
            return '';
        }
    };
    /**
     * Retrieves a a list of all cookie avaiable
     *
     * @returns Object with all Cookies
     */
    CookieService.prototype.getAll = function () {
        var cookies = {};
        // tslint:disable-next-line:triple-equals
        if (document.cookie && document.cookie != '') {
            var split = document.cookie.split(';');
            for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
                var s = split_1[_i];
                var currCookie = s.split('=');
                currCookie[0] = currCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
            }
        }
        return cookies;
    };
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now or at a specific date from a Date object. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     * @param  {boolean} secure If true, the cookie will only be available through a secured connection
     */
    CookieService.prototype.set = function (name, value, expires, path, domain, secure) {
        var cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
            }
            else {
                cookieStr += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieStr += 'secure;';
        }
        // console.log(cookieStr);
        document.cookie = cookieStr;
    };
    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    CookieService.prototype.delete = function (name, path, domain) {
        this.set(name, '', -1, path, domain);
    };
    /**
     * Delete all cookie avaiable
     */
    CookieService.prototype.deleteAll = function (path, domain) {
        var cookies = this.getAll();
        for (var _i = 0, _a = Object.keys(cookies); _i < _a.length; _i++) {
            var cookieName = _a[_i];
            this.delete(cookieName, path, domain);
        }
    };
    return CookieService;
}());
exports.CookieService = CookieService;
exports.Cookie = new CookieService();
//# sourceMappingURL=cookie.js.map

/***/ },

/***/ "./node_modules/ng2-cookies/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-cookies/cookie.js"));
__export(__webpack_require__("./node_modules/ng2-cookies/unmanagedCookie.js"));
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/ng2-cookies/ng2-cookies.js":
/***/ function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-cookies/src/services.js"));
var services = __webpack_require__("./node_modules/ng2-cookies/src/services.js");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    services: services
};
//# sourceMappingURL=ng2-cookies.js.map

/***/ },

/***/ "./node_modules/ng2-cookies/src/services.js":
/***/ function(module, exports, __webpack_require__) {

// Export all services
var cookie_1 = __webpack_require__("./node_modules/ng2-cookies/src/services/cookie.js");
exports.Cookie = cookie_1.Cookie;
//# sourceMappingURL=services.js.map

/***/ },

/***/ "./node_modules/ng2-cookies/src/services/cookie.js":
/***/ function(module, exports) {

/**
 * Class Cookie - Holds static functions to deal with Cookies
 */
var Cookie = (function () {
    function Cookie() {
    }
    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    Cookie.get = function (name) {
        var myWindow = window;
        name = myWindow.escape(name);
        var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
        var result = regexp.exec(document.cookie);
        return (result === null) ? null : myWindow.unescape(result[1]);
    };
    /**
     * Retrieves a a list of all cookie avaiable
     *
     * @returns Object with all Cookies
     */
    Cookie.getAll = function () {
        var cookies = {};
        if (document.cookie && document.cookie != '') {
            var split = document.cookie.split(';');
            for (var i = 0; i < split.length; i++) {
                var currCookie = split[i].split('=');
                currCookie[0] = currCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
            }
        }
        return cookies;
    };
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    Cookie.set = function (name, value, expires, path, domain) {
        var myWindow = window;
        var cookieStr = myWindow.escape(name) + '=' + myWindow.escape(value) + ';';
        if (expires) {
            var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
            cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        // console.log(cookieStr);
        document.cookie = cookieStr;
    };
    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    Cookie.delete = function (name, path, domain) {
        // If the cookie exists
        if (Cookie.get(name)) {
            Cookie.set(name, '', -1, path, domain);
        }
    };
    /**
     * Delete all cookie avaiable
     */
    Cookie.deleteAll = function (path, domain) {
        var cookies = Cookie.getAll();
        for (var cookieName in cookies) {
            Cookie.delete(cookieName, path, domain);
        }
    };
    return Cookie;
})();
exports.Cookie = Cookie;
//# sourceMappingURL=cookie.js.map

/***/ },

/***/ "./node_modules/ng2-cookies/unmanagedCookie.js":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Class UnmanagedCookieService - Holds static functions to deal with Cookies
 */
var UnmanagedCookieService = (function () {
    function UnmanagedCookieService() {
    }
    /**
     * Checks the existence of a single cookie by it's name
     *
     * @param  {string} name Identification of the cookie
     * @returns existence of the cookie
     */
    UnmanagedCookieService.prototype.check = function (name) {
        if (typeof document === "undefined")
            return false; // Check if document exist avoiding issues on server side prerendering
        var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
        var exists = regexp.test(document.cookie);
        return exists;
    };
    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    UnmanagedCookieService.prototype.get = function (name) {
        if (this.check(name)) {
            var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            var result = regexp.exec(document.cookie);
            return result[1];
        }
        else {
            return '';
        }
    };
    /**
     * Retrieves a a list of all cookie avaiable
     *
     * @returns Object with all Cookies
     */
    UnmanagedCookieService.prototype.getAll = function () {
        var cookies = {};
        // tslint:disable-next-line:triple-equals
        if (document.cookie && document.cookie != '') {
            var split = document.cookie.split(';');
            for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
                var s = split_1[_i];
                var currCookie = s.split('=');
                currCookie[0] = currCookie[0].replace(/^ /, '');
                cookies[currCookie[0]] = currCookie[1];
            }
        }
        return cookies;
    };
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now or at a specific date from a Date object. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     * @param  {boolean} secure If true, the cookie will only be available through a secured connection
     */
    UnmanagedCookieService.prototype.set = function (name, value, expires, path, domain, secure) {
        var cookieStr = name + '=' + value + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
            }
            else {
                cookieStr += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieStr += 'secure;';
        }
        // console.log(cookieStr);
        document.cookie = cookieStr;
    };
    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    UnmanagedCookieService.prototype.delete = function (name, path, domain) {
        this.set(name, '', -1, path, domain);
    };
    /**
     * Delete all cookie avaiable
     */
    UnmanagedCookieService.prototype.deleteAll = function (path, domain) {
        var cookies = this.getAll();
        for (var _i = 0, _a = Object.keys(cookies); _i < _a.length; _i++) {
            var cookieName = _a[_i];
            this.delete(cookieName, path, domain);
        }
    };
    return UnmanagedCookieService;
}());
exports.UnmanagedCookieService = UnmanagedCookieService;
exports.UnmanagedCookie = new UnmanagedCookieService();
//# sourceMappingURL=unmanagedCookie.js.map

/***/ },

/***/ "./node_modules/numeral/numeral.js":
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! @preserve
 * numeral.js
 * version : 1.5.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function() {

    /************************************
        Variables
    ************************************/

    var numeral,
        VERSION = '1.5.6',
        // internal storage for language config files
        languages = {},
        defaults = {
            currentLanguage: 'en',
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: '0,0'
        },
        options = {
            currentLanguage: defaults.currentLanguage,
            zeroFormat: defaults.zeroFormat,
            nullFormat: defaults.nullFormat,
            defaultFormat: defaults.defaultFormat
        },
        byteSuffixes = {
            bytes: ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            iec: ['B','KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        };


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral(number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, maxDecimals, roundingFunction, optionals) {
        var splitValue = value.toString().split('.'),
            minDecimals = maxDecimals - (optionals || 0),
            boundedPrecision,
            optionalsRegExp,
            power,
            output;

        // Use the smallest precision value possible to avoid errors from floating point representation
        if (splitValue.length === 2) {
          boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
        } else {
          boundedPrecision = minDecimals;
        }

        power = Math.pow(10, boundedPrecision);

        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(boundedPrecision);

        if (optionals > maxDecimals - boundedPrecision) {
            optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral(n, format, roundingFunction) {
        var output;

        if (n._value === 0 && options.zeroFormat !== null) {
            output = options.zeroFormat;
        } else if (n._value === null && options.nullFormat !== null) {
            output = options.nullFormat;
        } else {
            // figure out what kind of format we are dealing with
            if (format.indexOf('$') > -1) {
                output = formatCurrency(n, format, roundingFunction);
            } else if (format.indexOf('%') > -1) {
                output = formatPercentage(n, format, roundingFunction);
            } else if (format.indexOf(':') > -1) {
                output = formatTime(n, format);
            } else if (format.indexOf('b') > -1 || format.indexOf('ib') > -1) {
                output = formatBytes(n, format, roundingFunction);
            } else if (format.indexOf('o') > -1) {
                output = formatOrdinal(n, format, roundingFunction);
            } else {
                output = formatNumber(n._value, format, roundingFunction);
            }
        }

        return output;
    }

    function formatCurrency(n, format, roundingFunction) {
        var symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = '',
            spliceIndex,
            output;

        // check for space before or after currency
        if (format.indexOf(' $') > -1) {
            space = ' ';
            format = format.replace(' $', '');
        } else if (format.indexOf('$ ') > -1) {
            space = ' ';
            format = format.replace('$ ', '');
        } else {
            format = format.replace('$', '');
        }

        // format the number
        output = formatNumber(n._value, format, roundingFunction, false);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                output = output.split('');
                spliceIndex = 1;
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {
                    // the symbol appears before the "(" or "-"
                    spliceIndex = 0;
                }
                output.splice(spliceIndex, 0, languages[options.currentLanguage].currency.symbol + space);
                output = output.join('');
            } else {
                output = languages[options.currentLanguage].currency.symbol + space + output;
            }
        } else {
            if (output.indexOf(')') > -1) {
                output = output.split('');
                output.splice(-1, 0, space + languages[options.currentLanguage].currency.symbol);
                output = output.join('');
            } else {
                output = output + space + languages[options.currentLanguage].currency.symbol;
            }
        }

        return output;
    }

    function formatPercentage(n, format, roundingFunction) {
        var space = '',
            output,
            value = n._value * 100;

        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        } else {
            format = format.replace('%', '');
        }

        output = formatNumber(value, format, roundingFunction);

        if (output.indexOf(')') > -1) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatBytes(n, format, roundingFunction) {
        var output,
            suffixes = format.indexOf('ib') > -1 ? byteSuffixes.iec : byteSuffixes.bytes,
            value = n._value,
            suffix = '',
            power,
            min,
            max;

        // check for space before
        if (format.indexOf(' b') > -1 || format.indexOf(' ib') > -1) {
            suffix = ' ';
            format = format.replace(' ib', '').replace(' b', '');
        } else {
            format = format.replace('ib', '').replace('b', '');
        }

        for (power = 0; power <= suffixes.length; power++) {
            min = Math.pow(1024, power);
            max = Math.pow(1024, power + 1);

            if (value === null || value === 0 || value >= min && value < max) {
                suffix += suffixes[power];

                if (min > 0) {
                    value = value / min;
                }

                break;
            }
        }

        output = formatNumber(value, format, roundingFunction);

        return output + suffix;
    }

    function formatOrdinal(n, format, roundingFunction) {
        var output,
            ordinal = '';

        // check for space before
        if (format.indexOf(' o') > -1) {
            ordinal = ' ';
            format = format.replace(' o', '');
        } else {
            format = format.replace('o', '');
        }

        ordinal += languages[options.currentLanguage].ordinal(n._value);

        output = formatNumber(n._value, format, roundingFunction);

        return output + ordinal;
    }

    function formatTime(n) {
        var hours = Math.floor(n._value / 60 / 60),
            minutes = Math.floor((n._value - (hours * 60 * 60)) / 60),
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));

        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    function formatNumber(value, format, roundingFunction) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            abs,
            min,
            max,
            power,
            w,
            precision,
            thousands,
            d = '',
            neg = false;

        if (value === null) {
            value = 0;
        }

        abs = Math.abs(value);

        // see if we should use parentheses for negative number or if we should prefix with a sign
        // if both are present we default to parentheses
        if (format.indexOf('(') > -1) {
            negP = true;
            format = format.slice(1, -1);
        } else if (format.indexOf('+') > -1) {
            signed = true;
            format = format.replace(/\+/g, '');
        }

        // see if abbreviation is wanted
        if (format.indexOf('a') > -1) {
            // check if abbreviation is specified
            abbrK = format.indexOf('aK') >= 0;
            abbrM = format.indexOf('aM') >= 0;
            abbrB = format.indexOf('aB') >= 0;
            abbrT = format.indexOf('aT') >= 0;
            abbrForce = abbrK || abbrM || abbrB || abbrT;

            // check for space before abbreviation
            if (format.indexOf(' a') > -1) {
                abbr = ' ';
            }

            format = format.replace(new RegExp(abbr + 'a[KMBT]?'), '');

            if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                // trillion
                abbr = abbr + languages[options.currentLanguage].abbreviations.trillion;
                value = value / Math.pow(10, 12);
            } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                // billion
                abbr = abbr + languages[options.currentLanguage].abbreviations.billion;
                value = value / Math.pow(10, 9);
            } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                // million
                abbr = abbr + languages[options.currentLanguage].abbreviations.million;
                value = value / Math.pow(10, 6);
            } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                // thousand
                abbr = abbr + languages[options.currentLanguage].abbreviations.thousand;
                value = value / Math.pow(10, 3);
            }
        }


        if (format.indexOf('[.]') > -1) {
            optDec = true;
            format = format.replace('[.]', '.');
        }

        w = value.toString().split('.')[0];
        precision = format.split('.')[1];
        thousands = format.indexOf(',');

        if (precision) {
            if (precision.indexOf('[') > -1) {
                precision = precision.replace(']', '');
                precision = precision.split('[');
                d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
            } else {
                d = toFixed(value, precision.length, roundingFunction);
            }

            w = d.split('.')[0];

            if (d.indexOf('.') > -1) {
                d = languages[options.currentLanguage].delimiters.decimal + d.split('.')[1];
            } else {
                d = '';
            }

            if (optDec && Number(d.slice(1)) === 0) {
                d = '';
            }
        } else {
            w = toFixed(value, null, roundingFunction);
        }

        // format number
        if (w.indexOf('-') > -1) {
            w = w.slice(1);
            neg = true;
        }

        if (thousands > -1) {
            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[options.currentLanguage].delimiters.thousands);
        }

        if (format.indexOf('.') === 0) {
            w = '';
        }

        return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((abbr) ? abbr : '') + ((negP && neg) ? ')' : '');
    }


    /************************************
        Unformatting
    ************************************/

    // revert to number
    function unformatNumeral(n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            bytesMultiplier = false,
            power,
            value;

        if (string.indexOf(':') > -1) {
            value = unformatTime(string);
        } else {
            if (string === options.zeroFormat || string === options.nullFormat) {
                value = 0;
            } else {
                if (languages[options.currentLanguage].delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(languages[options.currentLanguage].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[options.currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[options.currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[options.currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[options.currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[options.currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[options.currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[options.currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[options.currentLanguage].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 1; power <= byteSuffixes.bytes.length; power++) {
                    bytesMultiplier = ((string.indexOf(byteSuffixes.bytes[power]) > -1) || (string.indexOf(byteSuffixes.iec[power]) > -1))? Math.pow(1024, power) : false;

                    if (bytesMultiplier) {
                        break;
                    }
                }

                // do some math to create our number
                value = bytesMultiplier ? bytesMultiplier : 1;
                value *= stringOriginal.match(thousandRegExp) ? Math.pow(10, 3) : 1;
                value *= stringOriginal.match(millionRegExp) ? Math.pow(10, 6) : 1;
                value *= stringOriginal.match(billionRegExp) ? Math.pow(10, 9) : 1;
                value *= stringOriginal.match(trillionRegExp) ? Math.pow(10, 12) : 1;
                // check for percentage
                value *= string.indexOf('%') > -1 ? 0.01 : 1;
                // check for negative number
                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;
                // remove non numbers
                value *= Number(string.replace(/[^0-9\.]+/g, ''));
                // round if we are talking about bytes
                value = bytesMultiplier ? Math.ceil(value) : value;
            }
        }

        n._value = value;

        return n._value;
    }
    function unformatTime(string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }


    /************************************
        Top Level Functions
    ************************************/

    numeral = function(input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (input === null) {
            input = null;
        } else if (!Number(input)) {
            input = numeral.fn.unformat(input);
        } else {
            input = Number(input);
        }

        return new Numeral(input);
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function(obj) {
        return obj instanceof Numeral;
    };


    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numeral.language = function(key, values) {
        if (!key) {
            return options.currentLanguage;
        }

        key = key.toLowerCase();

        if (key && !values) {
            if (!languages[key]) {
                throw new Error('Unknown language : ' + key);
            }

            options.currentLanguage = key;
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return numeral;
    };

    numeral.reset = function() {
        for (var property in defaults) {
            options[property] = defaults[property];
        }
    };

    // This function provides access to the loaded language data.  If
    // no arguments are passed in, it will simply return the current
    // global language object.
    numeral.languageData = function(key) {
        if (!key) {
            return languages[options.currentLanguage];
        }

        if (!languages[key]) {
            throw new Error('Unknown language : ' + key);
        }

        return languages[key];
    };

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    numeral.zeroFormat = function(format) {
        options.zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.nullFormat = function (format) {
        options.nullFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function(format) {
        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    numeral.validate = function(val, culture) {
        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            languageData,
            temp;

        //coerce val to string
        if (typeof val !== 'string') {
            val += '';
            if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //trim whitespaces from either sides
        val = val.trim();

        //if val is just digits return true
        if ( !! val.match(/^\d+$/)) {
            return true;
        }

        //if val is empty return false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numeral.languageData
        try {
            //check if the culture is understood by numeral. if not, default it to current language
            languageData = numeral.languageData(culture);
        } catch (e) {
            languageData = numeral.languageData(numeral.language());
        }

        //setup the delimiters and currency symbol based on culture/language
        _currSymbol = languageData.currency.symbol;
        _abbrObj = languageData.abbreviations;
        _decimalSep = languageData.delimiters.decimal;
        if (languageData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = languageData.delimiters.thousands;
        }

        // validating currency symbol
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

        //validating abbreviation symbol
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };

    /************************************
        Helpers
    ************************************/

    function loadLanguage(key, values) {
        languages[key] = values;
    }

    /************************************
        Floating-point helpers
    ************************************/

    // The floating-point helper functions and implementation
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

    // Production steps of ECMA-262, Edition 5, 15.4.4.21
    // Reference: http://es5.github.io/#x15.4.4.21
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
            'use strict';
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(this), len = t.length >>> 0, k = 0, value;

            if (arguments.length === 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }

                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        };
    }

    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function(prev, next) {
            var mp = multiplier(prev),
                mn = multiplier(next);
            return mp > mn ? mp : mn;
        }, -Infinity);
    }


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone: function() {
            return numeral(this);
        },

        format: function (inputString, roundingFunction) {
            return formatNumeral(this,
                inputString ? inputString : options.defaultFormat,
                roundingFunction !== undefined ? roundingFunction : Math.round
            );
        },

        unformat: function (inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') {
                return inputString;
            }

            return unformatNumeral(this, inputString ? inputString : options.defaultFormat);
        },

        value: function() {
            return this._value;
        },

        valueOf: function() {
            return this._value;
        },

        set: function(value) {
            this._value = Number(value);
            return this;
        },

        add: function(value) {
            var corrFactor = correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum + corrFactor * curr;
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract: function(value) {
            var corrFactor = correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum - corrFactor * curr;
            }
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
            return this;
        },

        multiply: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) * (curr * corrFactor) /
                    (corrFactor * corrFactor);
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) / (curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);
            return this;
        },

        difference: function(value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['numeral'] = numeral;
    }

    /*global define:false */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return numeral;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
}).call(this);


/***/ },

/***/ "./node_modules/rxjs/add/observable/of.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var of_1 = __webpack_require__("./node_modules/rxjs/observable/of.js");
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/catch.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var catch_1 = __webpack_require__("./node_modules/rxjs/operator/catch.js");
Observable_1.Observable.prototype.catch = catch_1._catch;
Observable_1.Observable.prototype._catch = catch_1._catch;
//# sourceMappingURL=catch.js.map

/***/ },

/***/ "./src/app/app.component.css":
/***/ function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./src/app/app.component.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ },

/***/ "./src/app/app.component.html":
/***/ function(module, exports) {

module.exports = "\n<header-component></header-component>\n<main class=\"main main-container main-container-padding container-fluid\">\n  <div class=\"col-lg-2 col-md-2 hidden-sm hidden-xs\">\n  </div>\n  <router-outlet></router-outlet>\n</main>\n\n<footer></footer>"

/***/ },

/***/ "./src/app/app.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular 2 decorators and services
 */
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var ng2_cookies_1 = __webpack_require__("./node_modules/ng2-cookies/index.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
// jQuery Typings will cause errors in Angular-Protractor,
// so we `require` it instead of importing.
var $ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    function App(router, route, appState) {
        this.router = router;
        this.route = route;
        this.appState = appState;
        this.logo = 'assets/img/logo-tfgi-c.png';
        this.name = 'Taylor & Francis Group';
        this.year = (new Date()).getFullYear();
        this.url = location.protocol + '//' + location.hostname
            + (location.port ? ':' + location.port : '') + '/';
        this.userInfo = {};
        this.isMobNavExpanded = false; //This flag is valid only for the mobile and tablet.
    }
    App.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
        console.log('Environment', "local");
        console.log('_token : ', ng2_cookies_1.Cookie.get('_token'));
    };
    App.prototype.onLogin = function (value) {
        window.location.href = value.value;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                __webpack_require__("./src/app/app.component.css")
            ],
            template: __webpack_require__("./src/app/app.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _c) || Object])
    ], App);
    return App;
    var _a, _b, _c;
}());
exports.App = App;


/***/ },

/***/ "./src/app/app.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
var angular2_perfect_scrollbar_1 = __webpack_require__("./node_modules/angular2-perfect-scrollbar/lib/index.js");
var ng2_charts_1 = __webpack_require__("./node_modules/ng2-charts/ng2-charts.js");
var PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = __webpack_require__("./src/app/environment.ts");
var app_routes_1 = __webpack_require__("./src/app/app.routes.ts");
var app_pipes_1 = __webpack_require__("./src/app/app.pipes.ts");
// App is our top level component
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var app_resolver_1 = __webpack_require__("./src/app/app.resolver.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var services_1 = __webpack_require__("./src/app/services/index.ts");
var home_1 = __webpack_require__("./src/app/home/index.ts");
var no_content_1 = __webpack_require__("./src/app/no-content/index.ts");
var no_reuse_page_base_1 = __webpack_require__("./src/app/no-reuse-page-base/index.ts");
var components_1 = __webpack_require__("./src/app/components/index.ts");
//To import Guard providers.
var guards_1 = __webpack_require__("./src/app/guards/index.js");
var APP_GUARDS = [guards_1.ActivateOnAccessToken];
var APP_COMPONENTS = [
    app_component_1.App,
    home_1.Home,
    no_content_1.NoContent,
    app_pipes_1.NumberFormat,
    no_reuse_page_base_1.ForwardPage,
].concat(components_1.COMPONENTS);
// Application wide providers
var APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat([
    app_service_1.AppState
]).concat(APP_GUARDS);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = hmr_1.createInputTransfer();
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.App],
            imports: [
                ng2_charts_1.ChartsModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true }),
                angular2_perfect_scrollbar_1.PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
            ],
            declarations: [APP_COMPONENTS],
            providers: [
                environment_1.ENV_PROVIDERS,
                APP_PROVIDERS,
                {
                    provide: services_1.ApiClient,
                    useFactory: function (backend, options) {
                        return new services_1.ApiClient(backend, options);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                }
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ApplicationRef !== 'undefined' && core_1.ApplicationRef) === 'function' && _a) || Object, (typeof (_b = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _b) || Object])
    ], AppModule);
    return AppModule;
    var _a, _b;
}());
exports.AppModule = AppModule;


/***/ },

/***/ "./src/app/app.pipes.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
//file name: remove-spaces.ts
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var numeral = __webpack_require__("./node_modules/numeral/numeral.js");
var NumberFormat = (function () {
    function NumberFormat() {
    }
    NumberFormat.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return numeral(value).format(args).toUpperCase();
    };
    NumberFormat = __decorate([
        core_1.Pipe({
            name: "numberFormat"
        }), 
        __metadata('design:paramtypes', [])
    ], NumberFormat);
    return NumberFormat;
}());
exports.NumberFormat = NumberFormat;


/***/ },

/***/ "./src/app/app.resolver.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
__webpack_require__("./node_modules/rxjs/add/observable/of.js");
var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return Observable_1.Observable.of({ res: 'I am data' });
    };
    DataResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataResolver);
    return DataResolver;
}());
exports.DataResolver = DataResolver;
// an array of services to resolve routes with data
exports.APP_RESOLVER_PROVIDERS = [
    DataResolver
];


/***/ },

/***/ "./src/app/app.routes.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var home_1 = __webpack_require__("./src/app/home/index.ts");
var no_content_1 = __webpack_require__("./src/app/no-content/index.ts");
exports.ROUTES = [
    { path: '', component: home_1.Home },
    { path: '**', component: no_content_1.NoContent }
];


/***/ },

/***/ "./src/app/app.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    AppState = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppState);
    return AppState;
}());
exports.AppState = AppState;


/***/ },

/***/ "./src/app/components/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/**
 * Export sub-modules so they can be imported from the dir path.
 */
var uiComponents = __webpack_require__("./src/app/components/ui/index.ts");
/**
 * @type {Array} Export array of modules.
 */
exports.COMPONENTS = [].concat(uiComponents.UI_COMPONENTS);
/**
 * _Explicitly_ export and declare the module.
 */
var ComponentsModule;
(function (ComponentsModule) {
    // Export sub-modules as properties of this module.
    ComponentsModule.ui = uiComponents;
})(ComponentsModule = exports.ComponentsModule || (exports.ComponentsModule = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComponentsModule;


/***/ },

/***/ "./src/app/components/ui/footer/footer.component.css":
/***/ function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./src/app/components/ui/footer/footer.component.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ },

/***/ "./src/app/components/ui/footer/footer.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"footer-wrapper\">\n  <a [routerLink]=\" ['./'] \" class=\"logo-container\"><img [src]=\"logo\" [alt]=\"name\"></a>\n</div>"

/***/ },

/***/ "./src/app/components/ui/footer/footer.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var FooterComponent = (function () {
    function FooterComponent() {
        this.logo = 'assets/img/t-f-white@2x.png';
        this.name = 'Taylor & Francis Group';
    }
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'footer',
            styles: [__webpack_require__("./src/app/components/ui/footer/footer.component.css")],
            template: __webpack_require__("./src/app/components/ui/footer/footer.component.html")
        }), 
        __metadata('design:paramtypes', [])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FooterComponent;


/***/ },

/***/ "./src/app/components/ui/footer/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/components/ui/footer/footer.component.ts"));


/***/ },

/***/ "./src/app/components/ui/header/header.component.css":
/***/ function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./src/app/components/ui/header/header.component.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ },

/***/ "./src/app/components/ui/header/header.component.html":
/***/ function(module, exports) {

module.exports = "<header>\n  <div class=\"navbar navbar-site alternate-nav\">\n    <div class=\"container\">\n      <div id='logo-image' class=\"navbar-header\">\n        <a [routerLink]=\" ['./'] \"> <img class=\"header-logo\" src=\"assets/img/t-f-new@2x.png\" alt=\"logo for taylor and francis\"></a>\n      </div>\n    </div>\n  </div>\n\n</header>"

/***/ },

/***/ "./src/app/components/ui/header/header.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
// Import RxJs required methods
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/operator/catch.js");
console.log('`Headers` component loaded asynchronously');
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: "header-component",
            template: __webpack_require__("./src/app/components/ui/header/header.component.html"),
            styles: [__webpack_require__("./src/app/components/ui/header/header.component.css")]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;


/***/ },

/***/ "./src/app/components/ui/header/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/components/ui/header/header.component.ts"));


/***/ },

/***/ "./src/app/components/ui/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/**
 * Export sub-modules so they can be imported from the dir path.
 */
var footer_1 = __webpack_require__("./src/app/components/ui/footer/index.ts");
exports.FooterComponent = footer_1.FooterComponent;
var header_1 = __webpack_require__("./src/app/components/ui/header/index.ts");
exports.HeaderComponent = header_1.HeaderComponent;
/**
 * @type {Array} Export array of modules.
 */
exports.UI_COMPONENTS = [
    exports.FooterComponent,
    exports.HeaderComponent
];
/**
 * _Explicitly_ export and declare the module.
 */
var UIComponentsModule;
(function (UIComponentsModule) {
    // Export sub-modules as properties of this module.
    UIComponentsModule.FooterComponent = exports.FooterComponent;
    UIComponentsModule.HeaderComponent = exports.HeaderComponent;
})(UIComponentsModule = exports.UIComponentsModule || (exports.UIComponentsModule = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UIComponentsModule;


/***/ },

/***/ "./src/app/environment.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// Angular 2
// rc2 workaround
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if (false) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateModuleRef = _decorateModuleRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();


/***/ },

/***/ "./src/app/guards/access-token.guard.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var ng2_cookies_1 = __webpack_require__("./node_modules/ng2-cookies/ng2-cookies.js");
var ActivateOnAccessToken = (function () {
    function ActivateOnAccessToken(router) {
        this.router = router;
    }
    ActivateOnAccessToken.prototype.canActivate = function () {
        if (ng2_cookies_1.Cookie.get('_token')) {
            return true;
        }
        else {
        }
    };
    ActivateOnAccessToken = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], ActivateOnAccessToken);
    return ActivateOnAccessToken;
    var _a;
}());
exports.ActivateOnAccessToken = ActivateOnAccessToken;


/***/ },

/***/ "./src/app/guards/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__access_token_guard__ = __webpack_require__("./src/app/guards/access-token.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__access_token_guard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__access_token_guard__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__access_token_guard__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(exports, key, function() { return __WEBPACK_IMPORTED_MODULE_0__access_token_guard__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ },

/***/ "./src/app/home/home.component.css":
/***/ function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./src/app/home/home.component.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ },

/***/ "./src/app/home/home.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"col-lg-12 col-sm-12 col-xs-12\">\n<div class=\"card-container\">\n  <h1 x-large class=\"sample-content\">Your Content Here</h1>\n\n  <div>\n    For material design components use the <a href=\"https://github.com/AngularClass/angular2-webpack-starter/tree/material2\"><b>material2</b></a> branch\n  </div>\n\n  <hr>\n\n  <div>\n    For hot module reloading run\n    <pre>npm run start:hmr</pre>\n  </div>\n\n  <hr>\n\n  <div>\n    <h4>Local State</h4>\n\n    <form (ngSubmit)=\"submitState(localState.value)\" autocomplete=\"off\">\n\n      <input\n        [value]=\"localState.value\"\n        (input)=\"localState.value = $event.target.value\"\n        placeholder=\"Submit Local State to App State\"\n        autofocus>\n\n      <button md-raised-button color=\"primary\">Submit Value</button>\n    </form>\n  \n    <pre>this.localState = {{ localState | json }}</pre>\n\n  </div>\n</div>\n</div>\n"

/***/ },

/***/ "./src/app/home/home.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var Home = (function () {
    // TypeScript public modifiers
    function Home(appState) {
        this.appState = appState;
        // Set our default values
        this.localState = { value: '' };
    }
    Home.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    };
    Home.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    Home = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'home'
            selector: 'home',
            // Our list of styles in our component. We may add more to compose many styles together
            styles: [__webpack_require__("./src/app/home/home.component.css")],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            template: __webpack_require__("./src/app/home/home.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object])
    ], Home);
    return Home;
    var _a;
}());
exports.Home = Home;


/***/ },

/***/ "./src/app/home/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/home/home.component.ts"));


/***/ },

/***/ "./src/app/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// App
__export(__webpack_require__("./src/app/app.module.ts"));


/***/ },

/***/ "./src/app/no-content/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/no-content/no-content.ts"));


/***/ },

/***/ "./src/app/no-content/no-content.component.scss":
/***/ function(module, exports) {

module.exports = "div.errorContainer {\n  text-align: center;\n  width: 100%;\n  font-family: 'Open Sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n"

/***/ },

/***/ "./src/app/no-content/no-content.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var NoContent = (function () {
    function NoContent() {
    }
    NoContent = __decorate([
        core_1.Component({
            selector: 'no-content',
            styles: [__webpack_require__("./src/app/no-content/no-content.component.scss")],
            template: "\n    <div class=\"errorContainer\">\n      <h1>404: page missing</h1>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NoContent);
    return NoContent;
}());
exports.NoContent = NoContent;


/***/ },

/***/ "./src/app/no-reuse-page-base/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/no-reuse-page-base/no-reuse-page-base.ts"));


/***/ },

/***/ "./src/app/no-reuse-page-base/no-reuse-page-base.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
//this compent is used to fix the issue https://github.com/angular/angular/issues/9811
//Related to Router where an click on the active route will not reload the component.
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var NoReusePageBase = (function () {
    function NoReusePageBase(router, route) {
        console.log("NoReusePageBase is loaded");
        var subscription = route.url.skip(1).subscribe(function (url) {
            console.log("NoReusePageBase forward before");
            subscription.unsubscribe();
            router.navigate(['/forward', { data: encodeURIComponent(JSON.stringify(url.map(function (v) { return v.path; }))) }], { skipLocationChange: true });
        });
    }
    return NoReusePageBase;
}());
exports.NoReusePageBase = NoReusePageBase;
var ForwardPage = (function () {
    function ForwardPage(router, route) {
        this.router = router;
        this.route = route;
    }
    ForwardPage.prototype.ngOnInit = function () {
        console.log("ForwardPage is loaded");
        this.router.navigate(JSON.parse(decodeURIComponent(this.route.snapshot.params['data'])), { skipLocationChange: true });
    };
    ForwardPage = __decorate([
        core_1.Component({
            template: ''
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object])
    ], ForwardPage);
    return ForwardPage;
    var _a, _b;
}());
exports.ForwardPage = ForwardPage;


/***/ },

/***/ "./src/app/services/api.client.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/add/operator/catch.js");
var ng2_cookies_1 = __webpack_require__("./node_modules/ng2-cookies/ng2-cookies.js");
var services_1 = __webpack_require__("./src/app/services/index.ts");
var ApiClient = (function (_super) {
    __extends(ApiClient, _super);
    function ApiClient(backend, options) {
        options.headers.set('Content-Type', 'application/json');
        _super.call(this, backend, options);
    }
    ApiClient.prototype.request = function (url, options) {
        var _this = this;
        return Observable_1.Observable.defer(function () {
            return _this.intercept(_super.prototype.request.call(_this, url, _this.getRequestOptionArgs(options)));
        }).retryWhen(function (errors) {
            return errors
                .mergeMap(function (error) { return (error.status != 401 && error.status != 403) ? Observable_1.Observable.throw(error) : Observable_1.Observable.of(error); })
                .delay(1000);
            // .take(2);
        });
    };
    ApiClient.prototype.get = function (url, options) {
        var _this = this;
        return Observable_1.Observable.defer(function () {
            // console.log("I AM A GET CALL");
            return _this.intercept(_super.prototype.get.call(_this, url, _this.getRequestOptionArgs(options)));
        }).retryWhen(function (errors) {
            return errors
                .mergeMap(function (error) { return (error.status != 401 && error.status != 403) ? Observable_1.Observable.throw(error) : Observable_1.Observable.of(error); })
                .delay(1000);
            // .take(2);
        });
    };
    ApiClient.prototype.post = function (url, body, options) {
        var _this = this;
        return Observable_1.Observable.defer(function () {
            // console.log("I AM A POST CALL");
            return _this.intercept(_super.prototype.post.call(_this, url, body, _this.getRequestOptionArgs(options)));
        }).retryWhen(function (errors) {
            return errors
                .mergeMap(function (error) { return (error.status != 401 && error.status != 403) ? Observable_1.Observable.throw(error) : Observable_1.Observable.of(error); })
                .delay(1000);
            // .take(2);
        });
    };
    ApiClient.prototype.put = function (url, body, options) {
        var _this = this;
        return Observable_1.Observable.defer(function () {
            // console.log("I AM A PUT CALL");
            return _this.intercept(_super.prototype.put.call(_this, url, body, _this.getRequestOptionArgs(options)));
        }).retryWhen(function (errors) {
            return errors
                .mergeMap(function (error) { return (error.status != 401 && error.status != 403) ? Observable_1.Observable.throw(error) : Observable_1.Observable.of(error); })
                .delay(1000);
            // .take(2);
        });
    };
    ApiClient.prototype.delete = function (url, options) {
        var _this = this;
        return Observable_1.Observable.defer(function () {
            // console.log("I AM A DELETE CALL");
            return _this.intercept(_super.prototype.delete.call(_this, url, _this.getRequestOptionArgs(options)));
        }).retryWhen(function (errors) {
            return errors
                .mergeMap(function (error) { return (error.status != 401 && error.status != 403) ? Observable_1.Observable.throw(error) : Observable_1.Observable.of(error); })
                .delay(1000);
            // .take(2);
        });
    };
    ApiClient.prototype.head = function (url, options) {
        var _this = this;
        return Observable_1.Observable.defer(function () {
            // console.log("I AM A HEAD CALL");
            return _this.intercept(_super.prototype.head.call(_this, url, _this.getRequestOptionArgs(options)));
        }).retryWhen(function (errors) {
            return errors
                .mergeMap(function (error) { return (error.status != 401 && error.status != 403) ? Observable_1.Observable.throw(error) : Observable_1.Observable.of(error); })
                .delay(1000);
            // .take(2);
        });
    };
    ApiClient.prototype.getRequestOptionArgs = function (options) {
        var token = ng2_cookies_1.Cookie.get('_token');
        var email = ng2_cookies_1.Cookie.get('email');
        var me = this;
        if (!options) {
            // let's make option object
            options = { headers: new http_1.Headers() };
        }
        //For testing the functionality
        //    if (ApiClient.temp) {
        options.headers.set('Authorization', " " + token);
        options.headers.set('Email', "" + email);
        //    }
        return options;
    };
    ApiClient.prototype.intercept = function (observable) {
        var me = this;
        var token = "";
        return observable.catch(function (initialError) {
            return Observable_1.Observable.throw(initialError);
        });
    };
    ApiClient.prototype.retryRequest = function (self, callback) {
        function checkFlag() {
            if (ApiClient.refreshingToken) {
                window.setTimeout(checkFlag, 1000); /* this checks the flag every 100 milliseconds*/
            }
            else {
                callback();
            }
        }
        checkFlag();
    };
    ApiClient.prototype.setAuthDetails = function (access_tokens) {
        console.log("Cookies are", ng2_cookies_1.Cookie.getAll());
        ng2_cookies_1.Cookie.set("_token", access_tokens.idtoken);
        ng2_cookies_1.Cookie.set("_refresh_token", access_tokens.idtoken);
        console.log("Cookies are", ng2_cookies_1.Cookie.getAll());
    };
    ApiClient.prototype.catchAuthError = function (self) {
        // we have to pass ApiClient's own instance here as `self`
        return function (res) {
            console.log("Your session seems to be expired.", res);
            ng2_cookies_1.Cookie.deleteAll('/');
            window.location.href = services_1.ApiService.BOOKS_WEBSITE_ENDPOINT;
            return Observable_1.Observable.throw(new Error("Your session seems to be expired"));
        };
    };
    ApiClient.refreshingToken = false;
    ApiClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.XHRBackend !== 'undefined' && http_1.XHRBackend) === 'function' && _a) || Object, (typeof (_b = typeof http_1.RequestOptions !== 'undefined' && http_1.RequestOptions) === 'function' && _b) || Object])
    ], ApiClient);
    return ApiClient;
    var _a, _b;
}(http_1.Http));
exports.ApiClient = ApiClient;


/***/ },

/***/ "./src/app/services/api.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ApiService = (function () {
    function ApiService() {
    }
    Object.defineProperty(ApiService, "BOOKS_WEBSITE_ENDPOINT", {
        get: function () {
            switch ("local") {
                case 'local': return 'http://localhost:3000/books';
                case 'dev': return 'https://dev.taylorfrancis.com/books/';
                case 'uat': return 'https://uat.taylorfrancis.com/books/';
                case 'prod': return 'https://www.taylorfrancis.com/books/';
                default: return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return ApiService;
}());
exports.ApiService = ApiService;


/***/ },

/***/ "./src/app/services/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/services/api.client.ts"));
__export(__webpack_require__("./src/app/services/api.service.ts"));


/***/ },

/***/ "./src/main.browser.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/index.js");
var environment_1 = __webpack_require__("./src/app/environment.ts");
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
/*
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = __webpack_require__("./src/app/index.ts");
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
        .then(environment_1.decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
// needed for hmr
// in prod this is replace for document ready
hmr_1.bootloader(main);


/***/ }

},["./src/main.browser.ts"]);
//# sourceMappingURL=main.map
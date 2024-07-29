/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Context.js":
/*!***************************!*\
  !*** ./src/js/Context.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Context)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/func */ "./src/js/core/func.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var Context = /*#__PURE__*/function () {
  /**
   * @param {jQuery} $note
   * @param {Object} options
   */
  function Context($note, options) {
    _classCallCheck(this, Context);
    this.$note = $note;
    this.memos = {};
    this.modules = {};
    this.layoutInfo = {};
    this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, {}, options);

    // init ui with options
    (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui = jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote.ui_template(this.options);
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.initialize();
  }

  /**
   * create layout and initialize modules and other resources
   */
  return _createClass(Context, [{
    key: "initialize",
    value: function initialize() {
      this.layoutInfo = this.ui.createLayout(this.$note);
      this._initialize();
      this.$note.hide();
      return this;
    }

    /**
     * destroy modules and other resources and remove layout
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroy();
      this.$note.removeData('summernote');
      this.ui.removeLayout(this.$note, this.layoutInfo);
    }

    /**
     * destory modules and other resources and initialize it again
     */
  }, {
    key: "reset",
    value: function reset() {
      var disabled = this.isDisabled();
      this.code(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].emptyPara);
      this._destroy();
      this._initialize();
      if (disabled) {
        this.disable();
      }
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      var _this = this;
      // set own id
      this.options.id = _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].uniqueId(jquery__WEBPACK_IMPORTED_MODULE_0___default().now());
      // set default container for tooltips, popovers, and dialogs
      this.options.container = this.options.container || this.layoutInfo.editor;

      // add optional buttons
      var buttons = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, this.options.buttons);
      Object.keys(buttons).forEach(function (key) {
        _this.memo('button.' + key, buttons[key]);
      });
      var modules = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, this.options.modules, (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).plugins || {});

      // add and initialize modules
      Object.keys(modules).forEach(function (key) {
        _this.module(key, modules[key], true);
      });
      Object.keys(this.modules).forEach(function (key) {
        _this.initializeModule(key);
      });
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      var _this2 = this;
      // destroy modules with reversed order
      Object.keys(this.modules).reverse().forEach(function (key) {
        _this2.removeModule(key);
      });
      Object.keys(this.memos).forEach(function (key) {
        _this2.removeMemo(key);
      });
      // trigger custom onDestroy callback
      this.triggerEvent('destroy', this);
    }
  }, {
    key: "code",
    value: function code(html) {
      var isActivated = this.invoke('codeview.isActivated');
      if (html === undefined) {
        this.invoke('codeview.sync');
        return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
      } else {
        if (isActivated) {
          this.invoke('codeview.sync', html);
        } else {
          this.layoutInfo.editable.html(html);
        }
        this.$note.val(html);
        this.triggerEvent('change', html, this.layoutInfo.editable);
      }
    }
  }, {
    key: "isDisabled",
    value: function isDisabled() {
      return this.layoutInfo.editable.attr('contenteditable') === 'false';
    }
  }, {
    key: "enable",
    value: function enable() {
      this.layoutInfo.editable.attr('contenteditable', true);
      this.invoke('toolbar.activate', true);
      this.triggerEvent('disable', false);
      this.options.editing = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      // close codeview if codeview is opend
      if (this.invoke('codeview.isActivated')) {
        this.invoke('codeview.deactivate');
      }
      this.layoutInfo.editable.attr('contenteditable', false);
      this.options.editing = false;
      this.invoke('toolbar.deactivate', true);
      this.triggerEvent('disable', true);
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent() {
      var namespace = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(arguments);
      var args = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].tail(_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].from(arguments));
      var callback = this.options.callbacks[_core_func__WEBPACK_IMPORTED_MODULE_1__["default"].namespaceToCamel(namespace, 'on')];
      if (callback) {
        callback.apply(this.$note[0], args);
      }
      this.$note.trigger('summernote.' + namespace, args);
    }
  }, {
    key: "initializeModule",
    value: function initializeModule(key) {
      var module = this.modules[key];
      module.shouldInitialize = module.shouldInitialize || _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].ok;
      if (!module.shouldInitialize()) {
        return;
      }

      // initialize module
      if (module.initialize) {
        module.initialize();
      }

      // attach events
      if (module.events) {
        _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].attachEvents(this.$note, module.events);
      }
    }
  }, {
    key: "module",
    value: function module(key, ModuleClass, withoutIntialize) {
      if (arguments.length === 1) {
        return this.modules[key];
      }
      this.modules[key] = new ModuleClass(this);
      if (!withoutIntialize) {
        this.initializeModule(key);
      }
    }
  }, {
    key: "removeModule",
    value: function removeModule(key) {
      var module = this.modules[key];
      if (module.shouldInitialize()) {
        if (module.events) {
          _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].detachEvents(this.$note, module.events);
        }
        if (module.destroy) {
          module.destroy();
        }
      }
      delete this.modules[key];
    }
  }, {
    key: "memo",
    value: function memo(key, obj) {
      if (arguments.length === 1) {
        return this.memos[key];
      }
      this.memos[key] = obj;
    }
  }, {
    key: "removeMemo",
    value: function removeMemo(key) {
      if (this.memos[key] && this.memos[key].destroy) {
        this.memos[key].destroy();
      }
      delete this.memos[key];
    }

    /**
     * Some buttons need to change their visual style immediately once they get pressed
     */
  }, {
    key: "createInvokeHandlerAndUpdateState",
    value: function createInvokeHandlerAndUpdateState(namespace, value) {
      var _this3 = this;
      return function (event) {
        _this3.createInvokeHandler(namespace, value)(event);
        _this3.invoke('buttons.updateCurrentStyle');
      };
    }
  }, {
    key: "createInvokeHandler",
    value: function createInvokeHandler(namespace, value) {
      var _this4 = this;
      return function (event) {
        event.preventDefault();
        var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
        _this4.invoke(namespace, value || $target.closest('[data-value]').data('value'), $target);
      };
    }
  }, {
    key: "invoke",
    value: function invoke() {
      var namespace = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(arguments);
      var args = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].tail(_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].from(arguments));
      var splits = namespace.split('.');
      var hasSeparator = splits.length > 1;
      var moduleName = hasSeparator && _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(splits);
      var methodName = hasSeparator ? _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].last(splits) : _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(splits);
      var module = this.modules[moduleName || 'editor'];
      if (!moduleName && this[methodName]) {
        return this[methodName].apply(this, args);
      } else if (module && module[methodName] && module.shouldInitialize()) {
        return module[methodName].apply(module, args);
      }
    }
  }]);
}();


/***/ }),

/***/ "./src/js/core/async.js":
/*!******************************!*\
  !*** ./src/js/core/async.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createImage: () => (/* binding */ createImage),
/* harmony export */   readFileAsDataURL: () => (/* binding */ readFileAsDataURL)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/**
 * @method readFileAsDataURL
 *
 * read contents of file as representing URL
 *
 * @param {File} file
 * @return {Promise} - then: dataUrl
 */
function readFileAsDataURL(file) {
  return jquery__WEBPACK_IMPORTED_MODULE_0___default().Deferred(function (deferred) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(new FileReader(), {
      onload: function onload(event) {
        var dataURL = event.target.result;
        deferred.resolve(dataURL);
      },
      onerror: function onerror(err) {
        deferred.reject(err);
      }
    }).readAsDataURL(file);
  }).promise();
}

/**
 * @method createImage
 *
 * create `<image>` from url string
 *
 * @param {String} url
 * @return {Promise} - then: $image
 */
function createImage(url) {
  return jquery__WEBPACK_IMPORTED_MODULE_0___default().Deferred(function (deferred) {
    var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<img>');
    $img.one('load', function () {
      $img.off('error abort');
      deferred.resolve($img);
    }).one('error abort', function () {
      $img.off('load').detach();
      deferred.reject($img);
    }).css({
      display: 'none'
    }).appendTo(document.body).attr('src', url);
  }).promise();
}

/***/ }),

/***/ "./src/js/core/dom.js":
/*!****************************!*\
  !*** ./src/js/core/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./func */ "./src/js/core/func.js");
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lists */ "./src/js/core/lists.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env */ "./src/js/core/env.js");




var NBSP_CHAR = String.fromCharCode(160);
var ZERO_WIDTH_NBSP_CHAR = "\uFEFF";

/**
 * @method isEditable
 *
 * returns whether node is `note-editable` or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function isEditable(node) {
  return node && jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).hasClass('note-editable');
}

/**
 * @method isControlSizing
 *
 * returns whether node is `note-control-sizing` or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function isControlSizing(node) {
  return node && jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).hasClass('note-control-sizing');
}

/**
 * @method makePredByNodeName
 *
 * returns predicate which judge whether nodeName is same
 *
 * @param {String} nodeName
 * @return {Function}
 */
function makePredByNodeName(nodeName) {
  nodeName = nodeName.toUpperCase();
  return function (node) {
    return node && node.nodeName.toUpperCase() === nodeName;
  };
}

/**
 * @method isText
 *
 *
 *
 * @param {Node} node
 * @return {Boolean} true if node's type is text(3)
 */
function isText(node) {
  return node && node.nodeType === 3;
}

/**
 * @method isElement
 *
 *
 *
 * @param {Node} node
 * @return {Boolean} true if node's type is element(1)
 */
function isElement(node) {
  return node && node.nodeType === 1;
}

/**
 * ex) br, col, embed, hr, img, input, ...
 * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
 */
function isVoid(node) {
  return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(node.nodeName.toUpperCase());
}
function isPara(node) {
  if (isEditable(node)) {
    return false;
  }

  // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
  return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
}
function isHeading(node) {
  return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
}
var isPre = makePredByNodeName('PRE');
var isLi = makePredByNodeName('LI');
function isPurePara(node) {
  return isPara(node) && !isLi(node);
}
var isTable = makePredByNodeName('TABLE');
var isData = makePredByNodeName('DATA');
function isInline(node) {
  return !isBodyContainer(node) && !isList(node) && !isHr(node) && !isPara(node) && !isTable(node) && !isBlockquote(node) && !isData(node);
}
function isList(node) {
  return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
}
var isHr = makePredByNodeName('HR');
function isCell(node) {
  return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
}
var isBlockquote = makePredByNodeName('BLOCKQUOTE');
function isBodyContainer(node) {
  return isCell(node) || isBlockquote(node) || isEditable(node);
}
var isAnchor = makePredByNodeName('A');
function isParaInline(node) {
  return isInline(node) && !!ancestor(node, isPara);
}
function isBodyInline(node) {
  return isInline(node) && !ancestor(node, isPara);
}
var isBody = makePredByNodeName('BODY');

/**
 * returns whether nodeB is closest sibling of nodeA
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @return {Boolean}
 */
function isClosestSibling(nodeA, nodeB) {
  return nodeA.nextSibling === nodeB || nodeA.previousSibling === nodeB;
}

/**
 * returns array of closest siblings with node
 *
 * @param {Node} node
 * @param {function} [pred] - predicate function
 * @return {Node[]}
 */
function withClosestSiblings(node, pred) {
  pred = pred || _func__WEBPACK_IMPORTED_MODULE_1__["default"].ok;
  var siblings = [];
  if (node.previousSibling && pred(node.previousSibling)) {
    siblings.push(node.previousSibling);
  }
  siblings.push(node);
  if (node.nextSibling && pred(node.nextSibling)) {
    siblings.push(node.nextSibling);
  }
  return siblings;
}

/**
 * blank HTML for cursor position
 * - [workaround] old IE only works with &nbsp;
 * - [workaround] IE11 and other browser works with bogus br
 */
var blankHTML = _env__WEBPACK_IMPORTED_MODULE_3__["default"].isMSIE && _env__WEBPACK_IMPORTED_MODULE_3__["default"].browserVersion < 11 ? '&nbsp;' : '<br>';

/**
 * @method nodeLength
 *
 * returns #text's text size or element's childNodes size
 *
 * @param {Node} node
 */
function nodeLength(node) {
  if (isText(node)) {
    return node.nodeValue.length;
  }
  if (node) {
    return node.childNodes.length;
  }
  return 0;
}

/**
 * returns whether deepest child node is empty or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function deepestChildIsEmpty(node) {
  do {
    if (node.firstElementChild === null || node.firstElementChild.innerHTML === '') break;
  } while (node = node.firstElementChild);
  return isEmpty(node);
}

/**
 * returns whether node is empty or not.
 *
 * @param {Node} node
 * @return {Boolean}
 */
function isEmpty(node) {
  var len = nodeLength(node);
  if (len === 0) {
    return true;
  } else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
    // ex) <p><br></p>, <span><br></span>
    return true;
  } else if (_lists__WEBPACK_IMPORTED_MODULE_2__["default"].all(node.childNodes, isText) && node.innerHTML === '') {
    // ex) <p></p>, <span></span>
    return true;
  }
  return false;
}

/**
 * padding blankHTML if node is empty (for cursor position)
 */
function paddingBlankHTML(node) {
  if (!isVoid(node) && !nodeLength(node)) {
    node.innerHTML = blankHTML;
  }
}

/**
 * find nearest ancestor predicate hit
 *
 * @param {Node} node
 * @param {Function} pred - predicate function
 */
function ancestor(node, pred) {
  while (node) {
    if (pred(node)) {
      return node;
    }
    if (isEditable(node)) {
      break;
    }
    node = node.parentNode;
  }
  return null;
}

/**
 * find nearest ancestor only single child blood line and predicate hit
 *
 * @param {Node} node
 * @param {Function} pred - predicate function
 */
function singleChildAncestor(node, pred) {
  node = node.parentNode;
  while (node) {
    if (nodeLength(node) !== 1) {
      break;
    }
    if (pred(node)) {
      return node;
    }
    if (isEditable(node)) {
      break;
    }
    node = node.parentNode;
  }
  return null;
}

/**
 * returns new array of ancestor nodes (until predicate hit).
 *
 * @param {Node} node
 * @param {Function} [optional] pred - predicate function
 */
function listAncestor(node, pred) {
  pred = pred || _func__WEBPACK_IMPORTED_MODULE_1__["default"].fail;
  var ancestors = [];
  ancestor(node, function (el) {
    if (!isEditable(el)) {
      ancestors.push(el);
    }
    return pred(el);
  });
  return ancestors;
}

/**
 * find farthest ancestor predicate hit
 */
function lastAncestor(node, pred) {
  var ancestors = listAncestor(node);
  return _lists__WEBPACK_IMPORTED_MODULE_2__["default"].last(ancestors.filter(pred));
}

/**
 * returns common ancestor node between two nodes.
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 */
function commonAncestor(nodeA, nodeB) {
  var ancestors = listAncestor(nodeA);
  for (var n = nodeB; n; n = n.parentNode) {
    if (ancestors.indexOf(n) > -1) return n;
  }
  return null; // difference document area
}

/**
 * listing all previous siblings (until predicate hit).
 *
 * @param {Node} node
 * @param {Function} [optional] pred - predicate function
 */
function listPrev(node, pred) {
  pred = pred || _func__WEBPACK_IMPORTED_MODULE_1__["default"].fail;
  var nodes = [];
  while (node) {
    if (pred(node)) {
      break;
    }
    nodes.push(node);
    node = node.previousSibling;
  }
  return nodes;
}

/**
 * listing next siblings (until predicate hit).
 *
 * @param {Node} node
 * @param {Function} [pred] - predicate function
 */
function listNext(node, pred) {
  pred = pred || _func__WEBPACK_IMPORTED_MODULE_1__["default"].fail;
  var nodes = [];
  while (node) {
    if (pred(node)) {
      break;
    }
    nodes.push(node);
    node = node.nextSibling;
  }
  return nodes;
}

/**
 * listing descendant nodes
 *
 * @param {Node} node
 * @param {Function} [pred] - predicate function
 */
function listDescendant(node, pred) {
  var descendants = [];
  pred = pred || _func__WEBPACK_IMPORTED_MODULE_1__["default"].ok;

  // start DFS(depth first search) with node
  (function fnWalk(current) {
    if (node !== current && pred(current)) {
      descendants.push(current);
    }
    for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
      fnWalk(current.childNodes[idx]);
    }
  })(node);
  return descendants;
}

/**
 * wrap node with new tag.
 *
 * @param {Node} node
 * @param {Node} tagName of wrapper
 * @return {Node} - wrapper
 */
function wrap(node, wrapperName) {
  var parent = node.parentNode;
  var wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<' + wrapperName + '>')[0];
  parent.insertBefore(wrapper, node);
  wrapper.appendChild(node);
  return wrapper;
}

/**
 * insert node after preceding
 *
 * @param {Node} node
 * @param {Node} preceding - predicate function
 */
function insertAfter(node, preceding) {
  var next = preceding.nextSibling;
  var parent = preceding.parentNode;
  if (next) {
    parent.insertBefore(node, next);
  } else {
    parent.appendChild(node);
  }
  return node;
}

/**
 * append elements.
 *
 * @param {Node} node
 * @param {Collection} aChild
 */
function appendChildNodes(node, aChild) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(aChild, function (idx, child) {
    // special case: appending a pure UL/OL to a LI element creates inaccessible LI element
    // e.g. press enter in last LI which has UL/OL-subelements
    // Therefore, if current node is LI element with no child nodes (text-node) and appending a list, add a br before
    if (isLi(node) && node.firstChild === null && isList(child)) {
      node.appendChild(create("br"));
    }
    node.appendChild(child);
  });
  return node;
}

/**
 * returns whether boundaryPoint is left edge or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isLeftEdgePoint(point) {
  return point.offset === 0;
}

/**
 * returns whether boundaryPoint is right edge or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isRightEdgePoint(point) {
  return point.offset === nodeLength(point.node);
}

/**
 * returns whether boundaryPoint is edge or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isEdgePoint(point) {
  return isLeftEdgePoint(point) || isRightEdgePoint(point);
}

/**
 * returns whether node is left edge of ancestor or not.
 *
 * @param {Node} node
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isLeftEdgeOf(node, ancestor) {
  while (node && node !== ancestor) {
    if (position(node) !== 0) {
      return false;
    }
    node = node.parentNode;
  }
  return true;
}

/**
 * returns whether node is right edge of ancestor or not.
 *
 * @param {Node} node
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isRightEdgeOf(node, ancestor) {
  if (!ancestor) {
    return false;
  }
  while (node && node !== ancestor) {
    if (position(node) !== nodeLength(node.parentNode) - 1) {
      return false;
    }
    node = node.parentNode;
  }
  return true;
}

/**
 * returns whether point is left edge of ancestor or not.
 * @param {BoundaryPoint} point
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isLeftEdgePointOf(point, ancestor) {
  return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
}

/**
 * returns whether point is right edge of ancestor or not.
 * @param {BoundaryPoint} point
 * @param {Node} ancestor
 * @return {Boolean}
 */
function isRightEdgePointOf(point, ancestor) {
  return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
}

/**
 * returns offset from parent.
 *
 * @param {Node} node
 */
function position(node) {
  var offset = 0;
  while (node = node.previousSibling) {
    offset += 1;
  }
  return offset;
}
function hasChildren(node) {
  return !!(node && node.childNodes && node.childNodes.length);
}

/**
 * returns previous boundaryPoint
 *
 * @param {BoundaryPoint} point
 * @param {Boolean} isSkipInnerOffset
 * @return {BoundaryPoint}
 */
function prevPoint(point, isSkipInnerOffset) {
  var node;
  var offset;
  if (point.offset === 0) {
    if (isEditable(point.node)) {
      return null;
    }
    node = point.node.parentNode;
    offset = position(point.node);
  } else if (hasChildren(point.node)) {
    node = point.node.childNodes[point.offset - 1];
    offset = nodeLength(node);
  } else {
    node = point.node;
    offset = isSkipInnerOffset ? 0 : point.offset - 1;
  }
  return {
    node: node,
    offset: offset
  };
}

/**
 * returns next boundaryPoint
 *
 * @param {BoundaryPoint} point
 * @param {Boolean} isSkipInnerOffset
 * @return {BoundaryPoint}
 */
function nextPoint(point, isSkipInnerOffset) {
  var node, offset;
  if (nodeLength(point.node) === point.offset) {
    if (isEditable(point.node)) {
      return null;
    }
    var nextTextNode = getNextTextNode(point.node);
    if (nextTextNode) {
      node = nextTextNode;
      offset = 0;
    } else {
      node = point.node.parentNode;
      offset = position(point.node) + 1;
    }
  } else if (hasChildren(point.node)) {
    node = point.node.childNodes[point.offset];
    offset = 0;
  } else {
    node = point.node;
    offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
  }
  return {
    node: node,
    offset: offset
  };
}

/**
 * Find next boundaryPoint for preorder / depth first traversal of the DOM
 * returns next boundaryPoint with empty node
 *
 * @param {BoundaryPoint} point
 * @param {Boolean} isSkipInnerOffset
 * @return {BoundaryPoint}
 */
function nextPointWithEmptyNode(point, isSkipInnerOffset) {
  var node,
    offset = 0;
  if (nodeLength(point.node) === point.offset) {
    if (isEditable(point.node)) {
      return null;
    }
    node = point.node.parentNode;
    offset = position(point.node) + 1;

    // if parent node is editable,  return current node's sibling node.
    if (isEditable(node)) {
      node = point.node.nextSibling;
      offset = 0;
    }
  } else if (hasChildren(point.node)) {
    node = point.node.childNodes[point.offset];
    offset = 0;
  } else {
    node = point.node;
    offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
  }
  return {
    node: node,
    offset: offset
  };
}

/*
* returns the next Text node index or 0 if not found.
*/
function getNextTextNode(actual) {
  if (!actual.nextSibling) return undefined;
  if (actual.parent !== actual.nextSibling.parent) return undefined;
  if (isText(actual.nextSibling)) return actual.nextSibling;else return getNextTextNode(actual.nextSibling);
}

/**
 * returns whether pointA and pointB is same or not.
 *
 * @param {BoundaryPoint} pointA
 * @param {BoundaryPoint} pointB
 * @return {Boolean}
 */
function isSamePoint(pointA, pointB) {
  return pointA.node === pointB.node && pointA.offset === pointB.offset;
}

/**
 * returns whether point is visible (can set cursor) or not.
 *
 * @param {BoundaryPoint} point
 * @return {Boolean}
 */
function isVisiblePoint(point) {
  if (isText(point.node) || !hasChildren(point.node) || isEmpty(point.node)) {
    return true;
  }
  var leftNode = point.node.childNodes[point.offset - 1];
  var rightNode = point.node.childNodes[point.offset];
  if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode)) || isTable(rightNode)) {
    return true;
  }
  return false;
}

/**
 * @method prevPointUtil
 *
 * @param {BoundaryPoint} point
 * @param {Function} pred
 * @return {BoundaryPoint}
 */
function prevPointUntil(point, pred) {
  while (point) {
    if (pred(point)) {
      return point;
    }
    point = prevPoint(point);
  }
  return null;
}

/**
 * @method nextPointUntil
 *
 * @param {BoundaryPoint} point
 * @param {Function} pred
 * @return {BoundaryPoint}
 */
function nextPointUntil(point, pred) {
  while (point) {
    if (pred(point)) {
      return point;
    }
    point = nextPoint(point);
  }
  return null;
}

/**
 * returns whether point has character or not.
 *
 * @param {Point} point
 * @return {Boolean}
 */
function isCharPoint(point) {
  if (!isText(point.node)) {
    return false;
  }
  var ch = point.node.nodeValue.charAt(point.offset - 1);
  return ch && ch !== ' ' && ch !== NBSP_CHAR;
}

/**
 * returns whether point has space or not.
 *
 * @param {Point} point
 * @return {Boolean}
 */
function isSpacePoint(point) {
  if (!isText(point.node)) {
    return false;
  }
  var ch = point.node.nodeValue.charAt(point.offset - 1);
  return ch === ' ' || ch === NBSP_CHAR;
}

/**
 * @method walkPoint - preorder / depth first traversal of the DOM
 *
 * @param {BoundaryPoint} startPoint
 * @param {BoundaryPoint} endPoint
 * @param {Function} handler
 * @param {Boolean} isSkipInnerOffset
 */
function walkPoint(startPoint, endPoint, handler, isSkipInnerOffset) {
  var point = startPoint;
  while (point) {
    handler(point);
    if (isSamePoint(point, endPoint)) {
      break;
    }
    var isSkipOffset = isSkipInnerOffset && startPoint.node !== point.node && endPoint.node !== point.node;
    point = nextPointWithEmptyNode(point, isSkipOffset);
  }
}

/**
 * @method makeOffsetPath
 *
 * return offsetPath(array of offset) from ancestor
 *
 * @param {Node} ancestor - ancestor node
 * @param {Node} node
 */
function makeOffsetPath(ancestor, node) {
  var ancestors = listAncestor(node, _func__WEBPACK_IMPORTED_MODULE_1__["default"].eq(ancestor));
  return ancestors.map(position).reverse();
}

/**
 * @method fromOffsetPath
 *
 * return element from offsetPath(array of offset)
 *
 * @param {Node} ancestor - ancestor node
 * @param {array} offsets - offsetPath
 */
function fromOffsetPath(ancestor, offsets) {
  var current = ancestor;
  for (var i = 0, len = offsets.length; i < len; i++) {
    if (current.childNodes.length <= offsets[i]) {
      current = current.childNodes[current.childNodes.length - 1];
    } else {
      current = current.childNodes[offsets[i]];
    }
  }
  return current;
}

/**
 * @method splitNode
 *
 * split element or #text
 *
 * @param {BoundaryPoint} point
 * @param {Object} [options]
 * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
 * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
 * @param {Boolean} [options.isDiscardEmptySplits] - default: false
 * @return {Node} right node of boundaryPoint
 */
function splitNode(point, options) {
  var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
  var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;
  var isDiscardEmptySplits = options && options.isDiscardEmptySplits;
  if (isDiscardEmptySplits) {
    isSkipPaddingBlankHTML = true;
  }

  // edge case
  if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
    if (isLeftEdgePoint(point)) {
      return point.node;
    } else if (isRightEdgePoint(point)) {
      return point.node.nextSibling;
    }
  }

  // split #text
  if (isText(point.node)) {
    return point.node.splitText(point.offset);
  } else {
    var childNode = point.node.childNodes[point.offset];
    var childNodes = listNext(childNode);
    var clone = insertAfter(point.node.cloneNode(false), point.node);
    appendChildNodes(clone, childNodes);
    if (!isSkipPaddingBlankHTML) {
      paddingBlankHTML(point.node);
      paddingBlankHTML(clone);
    }
    if (isDiscardEmptySplits) {
      if (isEmpty(point.node)) {
        remove(point.node);
      }
      if (isEmpty(clone)) {
        remove(clone);
        return point.node.nextSibling;
      }
    }
    return clone;
  }
}

/**
 * @method splitTree
 *
 * split tree by point
 *
 * @param {Node} root - split root
 * @param {BoundaryPoint} point
 * @param {Object} [options]
 * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
 * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
 * @return {Node} right node of boundaryPoint
 */
function splitTree(root, point, options) {
  // ex) [#text, <span>, <p>]
  var ancestors = listAncestor(point.node, _func__WEBPACK_IMPORTED_MODULE_1__["default"].eq(root));
  if (!ancestors.length) {
    return null;
  } else if (ancestors.length === 1) {
    return splitNode(point, options);
  }
  // Filter elements with sibling elements
  if (ancestors.length > 2) {
    var domList = ancestors.slice(0, ancestors.length - 1);
    var ifHasNextSibling = domList.find(function (item) {
      return item.nextSibling;
    });
    if (ifHasNextSibling && point.offset != 0 && isRightEdgePoint(point)) {
      var nestSibling = ifHasNextSibling.nextSibling;
      var textNode;
      if (nestSibling.nodeType == 1) {
        textNode = nestSibling.childNodes[0];
        ancestors = listAncestor(textNode, _func__WEBPACK_IMPORTED_MODULE_1__["default"].eq(root));
        point = {
          node: textNode,
          offset: 0
        };
      } else if (nestSibling.nodeType == 3 && !nestSibling.data.match(/[\n\r]/g)) {
        textNode = nestSibling;
        ancestors = listAncestor(textNode, _func__WEBPACK_IMPORTED_MODULE_1__["default"].eq(root));
        point = {
          node: textNode,
          offset: 0
        };
      }
    }
  }
  return ancestors.reduce(function (node, parent) {
    if (node === point.node) {
      node = splitNode(point, options);
    }
    return splitNode({
      node: parent,
      offset: node ? position(node) : nodeLength(parent)
    }, options);
  });
}

/**
 * split point
 *
 * @param {Point} point
 * @param {Boolean} isInline
 * @return {Object}
 */
function splitPoint(point, isInline) {
  // find splitRoot, container
  //  - inline: splitRoot is a child of paragraph
  //  - block: splitRoot is a child of bodyContainer
  var pred = isInline ? isPara : isBodyContainer;
  var ancestors = listAncestor(point.node, pred);
  var topAncestor = _lists__WEBPACK_IMPORTED_MODULE_2__["default"].last(ancestors) || point.node;
  var splitRoot, container;
  if (pred(topAncestor)) {
    splitRoot = ancestors[ancestors.length - 2];
    container = topAncestor;
  } else {
    splitRoot = topAncestor;
    container = splitRoot.parentNode;
  }

  // if splitRoot is exists, split with splitTree
  var pivot = splitRoot && splitTree(splitRoot, point, {
    isSkipPaddingBlankHTML: isInline,
    isNotSplitEdgePoint: isInline
  });

  // if container is point.node, find pivot with point.offset
  if (!pivot && container === point.node) {
    pivot = point.node.childNodes[point.offset];
  }
  return {
    rightNode: pivot,
    container: container
  };
}
function create(nodeName) {
  return document.createElement(nodeName);
}
function createText(text) {
  return document.createTextNode(text);
}

/**
 * @method remove
 *
 * remove node, (isRemoveChild: remove child or not)
 *
 * @param {Node} node
 * @param {Boolean} isRemoveChild
 */
function remove(node, isRemoveChild) {
  if (!node || !node.parentNode) {
    return;
  }
  if (node.removeNode) {
    return node.removeNode(isRemoveChild);
  }
  var parent = node.parentNode;
  if (!isRemoveChild) {
    var nodes = [];
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
      nodes.push(node.childNodes[i]);
    }
    for (var _i = 0, _len = nodes.length; _i < _len; _i++) {
      parent.insertBefore(nodes[_i], node);
    }
  }
  parent.removeChild(node);
}

/**
 * @method removeWhile
 *
 * @param {Node} node
 * @param {Function} pred
 */
function removeWhile(node, pred) {
  while (node) {
    if (isEditable(node) || !pred(node)) {
      break;
    }
    var parent = node.parentNode;
    remove(node);
    node = parent;
  }
}

/**
 * @method replace
 *
 * replace node with provided nodeName
 *
 * @param {Node} node
 * @param {String} nodeName
 * @return {Node} - new node
 */
function replace(node, nodeName) {
  if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
    return node;
  }
  var newNode = create(nodeName);
  if (node.style.cssText) {
    newNode.style.cssText = node.style.cssText;
  }
  appendChildNodes(newNode, _lists__WEBPACK_IMPORTED_MODULE_2__["default"].from(node.childNodes));
  insertAfter(newNode, node);
  remove(node);
  return newNode;
}
var isTextarea = makePredByNodeName('TEXTAREA');

/**
 * @param {jQuery} $node
 * @param {Boolean} [stripLinebreaks] - default: false
 */
function value($node, stripLinebreaks) {
  var val = isTextarea($node[0]) ? $node.val() : $node.html();
  if (stripLinebreaks) {
    return val.replace(/[\n\r]/g, '');
  }
  return val;
}

/**
 * @method html
 *
 * get the HTML contents of node
 *
 * @param {jQuery} $node
 * @param {Boolean} [isNewlineOnBlock]
 */
function html($node, isNewlineOnBlock) {
  var markup = value($node);
  if (isNewlineOnBlock) {
    var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
    markup = markup.replace(regexTag, function (match, endSlash, name) {
      name = name.toUpperCase();
      var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) && !!endSlash;
      var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);
      return match + (isEndOfInlineContainer || isBlockNode ? '\n' : '');
    });
    markup = markup.trim();
  }
  return markup;
}
function posFromPlaceholder(placeholder) {
  var $placeholder = jquery__WEBPACK_IMPORTED_MODULE_0___default()(placeholder);
  var pos = $placeholder.offset();
  var height = $placeholder.outerHeight(true); // include margin

  return {
    left: pos.left,
    top: pos.top + height
  };
}
function attachEvents($node, events) {
  Object.keys(events).forEach(function (key) {
    $node.on(key, events[key]);
  });
}
function detachEvents($node, events) {
  Object.keys(events).forEach(function (key) {
    $node.off(key, events[key]);
  });
}

/**
 * @method isCustomStyleTag
 *
 * assert if a node contains a "note-styletag" class,
 * which implies that's a custom-made style tag node
 *
 * @param {Node} an HTML DOM node
 */
function isCustomStyleTag(node) {
  return node && !isText(node) && _lists__WEBPACK_IMPORTED_MODULE_2__["default"].contains(node.classList, 'note-styletag');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /** @property {String} NBSP_CHAR */
  NBSP_CHAR: NBSP_CHAR,
  /** @property {String} ZERO_WIDTH_NBSP_CHAR */
  ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
  /** @property {String} blank */
  blank: blankHTML,
  /** @property {String} emptyPara */
  emptyPara: "<p>".concat(blankHTML, "</p>"),
  makePredByNodeName: makePredByNodeName,
  isEditable: isEditable,
  isControlSizing: isControlSizing,
  isText: isText,
  isElement: isElement,
  isVoid: isVoid,
  isPara: isPara,
  isPurePara: isPurePara,
  isHeading: isHeading,
  isInline: isInline,
  isBlock: _func__WEBPACK_IMPORTED_MODULE_1__["default"].not(isInline),
  isBodyInline: isBodyInline,
  isBody: isBody,
  isParaInline: isParaInline,
  isPre: isPre,
  isList: isList,
  isTable: isTable,
  isData: isData,
  isCell: isCell,
  isBlockquote: isBlockquote,
  isBodyContainer: isBodyContainer,
  isAnchor: isAnchor,
  isDiv: makePredByNodeName('DIV'),
  isLi: isLi,
  isBR: makePredByNodeName('BR'),
  isSpan: makePredByNodeName('SPAN'),
  isB: makePredByNodeName('B'),
  isU: makePredByNodeName('U'),
  isS: makePredByNodeName('S'),
  isI: makePredByNodeName('I'),
  isImg: makePredByNodeName('IMG'),
  isTextarea: isTextarea,
  deepestChildIsEmpty: deepestChildIsEmpty,
  isEmpty: isEmpty,
  isEmptyAnchor: _func__WEBPACK_IMPORTED_MODULE_1__["default"].and(isAnchor, isEmpty),
  isClosestSibling: isClosestSibling,
  withClosestSiblings: withClosestSiblings,
  nodeLength: nodeLength,
  isLeftEdgePoint: isLeftEdgePoint,
  isRightEdgePoint: isRightEdgePoint,
  isEdgePoint: isEdgePoint,
  isLeftEdgeOf: isLeftEdgeOf,
  isRightEdgeOf: isRightEdgeOf,
  isLeftEdgePointOf: isLeftEdgePointOf,
  isRightEdgePointOf: isRightEdgePointOf,
  prevPoint: prevPoint,
  nextPoint: nextPoint,
  nextPointWithEmptyNode: nextPointWithEmptyNode,
  isSamePoint: isSamePoint,
  isVisiblePoint: isVisiblePoint,
  prevPointUntil: prevPointUntil,
  nextPointUntil: nextPointUntil,
  isCharPoint: isCharPoint,
  isSpacePoint: isSpacePoint,
  walkPoint: walkPoint,
  ancestor: ancestor,
  singleChildAncestor: singleChildAncestor,
  listAncestor: listAncestor,
  lastAncestor: lastAncestor,
  listNext: listNext,
  listPrev: listPrev,
  listDescendant: listDescendant,
  commonAncestor: commonAncestor,
  wrap: wrap,
  insertAfter: insertAfter,
  appendChildNodes: appendChildNodes,
  position: position,
  hasChildren: hasChildren,
  makeOffsetPath: makeOffsetPath,
  fromOffsetPath: fromOffsetPath,
  splitTree: splitTree,
  splitPoint: splitPoint,
  create: create,
  createText: createText,
  remove: remove,
  removeWhile: removeWhile,
  replace: replace,
  html: html,
  value: value,
  posFromPlaceholder: posFromPlaceholder,
  attachEvents: attachEvents,
  detachEvents: detachEvents,
  isCustomStyleTag: isCustomStyleTag
});

/***/ }),

/***/ "./src/js/core/env.js":
/*!****************************!*\
  !*** ./src/js/core/env.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/**
 * returns whether font is installed or not.
 *
 * @param {String} fontName
 * @return {Boolean}
 */
var genericFontFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];
function validFontName(fontName) {
  return jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(fontName.toLowerCase(), genericFontFamilies) === -1 ? "'".concat(fontName, "'") : fontName;
}
function isFontInstalled(fontName) {
  var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
  var testText = "mw";
  var fontSize = "20px";
  var canvasWidth = 40;
  var canvasHeight = 20;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  // Center display
  context.textAlign = "center";
  context.fillStyle = "black";
  context.textBaseline = "middle";
  function getPxInfo(font) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = fontSize + ' ' + validFontName(font) + ', "' + testFontName + '"';
    context.fillText(testText, canvasWidth / 2, canvasHeight / 2);
    // Get pixel information
    var pxInfo = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
    return pxInfo.join("");
  }
  var testInfo = getPxInfo(testFontName);
  var fontInfo = getPxInfo(fontName);
  return testInfo !== fontInfo;
}
var userAgent = navigator.userAgent;
var isMSIE = /MSIE|Trident/i.test(userAgent);
var browserVersion;
if (isMSIE) {
  var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
  if (matches) {
    browserVersion = parseFloat(matches[1]);
  }
  matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);
  if (matches) {
    browserVersion = parseFloat(matches[1]);
  }
}
var isEdge = /Edge\/\d+/.test(userAgent);
var isSupportTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

// [workaround] IE doesn't have input events for contentEditable
// - see: https://goo.gl/4bfIvA
var inputEventName = isMSIE ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';

/**
 * @class core.env
 *
 * Object which check platform and agent
 *
 * @singleton
 * @alternateClassName env
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isMac: navigator.appVersion.indexOf('Mac') > -1,
  isMSIE: isMSIE,
  isEdge: isEdge,
  isFF: !isEdge && /firefox/i.test(userAgent),
  isPhantom: /PhantomJS/i.test(userAgent),
  isWebkit: !isEdge && /webkit/i.test(userAgent),
  isChrome: !isEdge && /chrome/i.test(userAgent),
  isSafari: !isEdge && /safari/i.test(userAgent) && !/chrome/i.test(userAgent),
  browserVersion: browserVersion,
  isSupportTouch: isSupportTouch,
  isFontInstalled: isFontInstalled,
  isW3CRangeSupport: !!document.createRange,
  inputEventName: inputEventName,
  genericFontFamilies: genericFontFamilies,
  validFontName: validFontName
});

/***/ }),

/***/ "./src/js/core/func.js":
/*!*****************************!*\
  !*** ./src/js/core/func.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/**
 * @class core.func
 *
 * func utils (for high-order func's arg)
 *
 * @singleton
 * @alternateClassName func
 */
function eq(itemA) {
  return function (itemB) {
    return itemA === itemB;
  };
}
function eq2(itemA, itemB) {
  return itemA === itemB;
}
function peq2(propName) {
  return function (itemA, itemB) {
    return itemA[propName] === itemB[propName];
  };
}
function ok() {
  return true;
}
function fail() {
  return false;
}
function not(f) {
  return function () {
    return !f.apply(f, arguments);
  };
}
function and(fA, fB) {
  return function (item) {
    return fA(item) && fB(item);
  };
}
function self(a) {
  return a;
}
function invoke(obj, method) {
  return function () {
    return obj[method].apply(obj, arguments);
  };
}
var idCounter = 0;

/**
 * reset globally-unique id
 *
 */
function resetUniqueId() {
  idCounter = 0;
}

/**
 * generate a globally-unique id
 *
 * @param {String} [prefix]
 */
function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
}

/**
 * returns bnd (bounds) from rect
 *
 * - IE Compatibility Issue: http://goo.gl/sRLOAo
 * - Scroll Issue: http://goo.gl/sNjUc
 *
 * @param {Rect} rect
 * @return {Object} bounds
 * @return {Number} bounds.top
 * @return {Number} bounds.left
 * @return {Number} bounds.width
 * @return {Number} bounds.height
 */
function rect2bnd(rect) {
  var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
  return {
    top: rect.top + $document.scrollTop(),
    left: rect.left + $document.scrollLeft(),
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}

/**
 * returns a copy of the object where the keys have become the values and the values the keys.
 * @param {Object} obj
 * @return {Object}
 */
function invertObject(obj) {
  var inverted = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      inverted[obj[key]] = key;
    }
  }
  return inverted;
}

/**
 * @param {String} namespace
 * @param {String} [prefix]
 * @return {String}
 */
function namespaceToCamel(namespace, prefix) {
  prefix = prefix || '';
  return prefix + namespace.split('.').map(function (name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }).join('');
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @return {Function}
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 *
 * @param {String} url
 * @return {Boolean}
 */
function isValidUrl(url) {
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  return expression.test(url);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  eq: eq,
  eq2: eq2,
  peq2: peq2,
  ok: ok,
  fail: fail,
  self: self,
  not: not,
  and: and,
  invoke: invoke,
  resetUniqueId: resetUniqueId,
  uniqueId: uniqueId,
  rect2bnd: rect2bnd,
  invertObject: invertObject,
  namespaceToCamel: namespaceToCamel,
  debounce: debounce,
  isValidUrl: isValidUrl
});

/***/ }),

/***/ "./src/js/core/key.js":
/*!****************************!*\
  !*** ./src/js/core/key.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists */ "./src/js/core/lists.js");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./func */ "./src/js/core/func.js");


var KEY_MAP = {
  'BACKSPACE': 8,
  'TAB': 9,
  'ENTER': 13,
  'ESCAPE': 27,
  'SPACE': 32,
  'DELETE': 46,
  // Arrow
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40,
  // Number: 0-9
  'NUM0': 48,
  'NUM1': 49,
  'NUM2': 50,
  'NUM3': 51,
  'NUM4': 52,
  'NUM5': 53,
  'NUM6': 54,
  'NUM7': 55,
  'NUM8': 56,
  // Alphabet: a-z
  'B': 66,
  'E': 69,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'R': 82,
  'S': 83,
  'U': 85,
  'V': 86,
  'Y': 89,
  'Z': 90,
  'SLASH': 191,
  'LEFTBRACKET': 219,
  'BACKSLASH': 220,
  'RIGHTBRACKET': 221,
  // Navigation
  'HOME': 36,
  'END': 35,
  'PAGEUP': 33,
  'PAGEDOWN': 34
};

/**
 * @class core.key
 *
 * Object for keycodes.
 *
 * @singleton
 * @alternateClassName key
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * @method isEdit
   *
   * @param {Number} keyCode
   * @return {Boolean}
   */
  isEdit: function isEdit(keyCode) {
    return _lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains([KEY_MAP.BACKSPACE, KEY_MAP.TAB, KEY_MAP.ENTER, KEY_MAP.SPACE, KEY_MAP.DELETE], keyCode);
  },
  /**
   * @method isRemove
   *
   * @param {Number} keyCode
   * @return {Boolean}
   */
  isRemove: function isRemove(keyCode) {
    // LB
    return _lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains([KEY_MAP.BACKSPACE, KEY_MAP.DELETE], keyCode);
  },
  /**
   * @method isMove
   *
   * @param {Number} keyCode
   * @return {Boolean}
   */
  isMove: function isMove(keyCode) {
    return _lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains([KEY_MAP.LEFT, KEY_MAP.UP, KEY_MAP.RIGHT, KEY_MAP.DOWN], keyCode);
  },
  /**
   * @method isNavigation
   *
   * @param {Number} keyCode
   * @return {Boolean}
   */
  isNavigation: function isNavigation(keyCode) {
    return _lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains([KEY_MAP.HOME, KEY_MAP.END, KEY_MAP.PAGEUP, KEY_MAP.PAGEDOWN], keyCode);
  },
  /**
   * @property {Object} nameFromCode
   * @property {String} nameFromCode.8 "BACKSPACE"
   */
  nameFromCode: _func__WEBPACK_IMPORTED_MODULE_1__["default"].invertObject(KEY_MAP),
  code: KEY_MAP
});

/***/ }),

/***/ "./src/js/core/lists.js":
/*!******************************!*\
  !*** ./src/js/core/lists.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./func */ "./src/js/core/func.js");


/**
 * returns the first item of an array.
 *
 * @param {Array} array
 */
function head(array) {
  return array[0];
}

/**
 * returns the last item of an array.
 *
 * @param {Array} array
 */
function last(array) {
  return array[array.length - 1];
}

/**
 * returns everything but the last entry of the array.
 *
 * @param {Array} array
 */
function initial(array) {
  return array.slice(0, array.length - 1);
}

/**
 * returns the rest of the items in an array.
 *
 * @param {Array} array
 */
function tail(array) {
  return array.slice(1);
}

/**
 * returns item of array
 */
function find(array, pred) {
  for (var idx = 0, len = array.length; idx < len; idx++) {
    var item = array[idx];
    if (pred(item)) {
      return item;
    }
  }
}

/**
 * returns true if all of the values in the array pass the predicate truth test.
 */
function all(array, pred) {
  for (var idx = 0, len = array.length; idx < len; idx++) {
    if (!pred(array[idx])) {
      return false;
    }
  }
  return true;
}

/**
 * returns true if the value is present in the list.
 */
function contains(array, item) {
  if (array && array.length && item) {
    if (array.indexOf) {
      return array.indexOf(item) !== -1;
    } else if (array.contains) {
      // `DOMTokenList` doesn't implement `.indexOf`, but it implements `.contains`
      return array.contains(item);
    }
  }
  return false;
}

/**
 * get sum from a list
 *
 * @param {Array} array - array
 * @param {Function} fn - iterator
 */
function sum(array, fn) {
  fn = fn || _func__WEBPACK_IMPORTED_MODULE_0__["default"].self;
  return array.reduce(function (memo, v) {
    return memo + fn(v);
  }, 0);
}

/**
 * returns a copy of the collection with array type.
 * @param {Collection} collection - collection eg) node.childNodes, ...
 */
function from(collection) {
  var result = [];
  var length = collection.length;
  var idx = -1;
  while (++idx < length) {
    result[idx] = collection[idx];
  }
  return result;
}

/**
 * returns whether list is empty or not
 */
function isEmpty(array) {
  return !array || !array.length;
}

/**
 * cluster elements by predicate function.
 *
 * @param {Array} array - array
 * @param {Function} fn - predicate function for cluster rule
 * @param {Array[]}
 */
function clusterBy(array, fn) {
  if (!array.length) {
    return [];
  }
  var aTail = tail(array);
  return aTail.reduce(function (memo, v) {
    var aLast = last(memo);
    if (fn(last(aLast), v)) {
      aLast[aLast.length] = v;
    } else {
      memo[memo.length] = [v];
    }
    return memo;
  }, [[head(array)]]);
}

/**
 * returns a copy of the array with all false values removed
 *
 * @param {Array} array - array
 * @param {Function} fn - predicate function for cluster rule
 */
function compact(array) {
  var aResult = [];
  for (var idx = 0, len = array.length; idx < len; idx++) {
    if (array[idx]) {
      aResult.push(array[idx]);
    }
  }
  return aResult;
}

/**
 * produces a duplicate-free version of the array
 *
 * @param {Array} array
 */
function unique(array) {
  var results = [];
  for (var idx = 0, len = array.length; idx < len; idx++) {
    if (!contains(results, array[idx])) {
      results.push(array[idx]);
    }
  }
  return results;
}

/**
 * returns next item.
 * @param {Array} array
 */
function next(array, item) {
  if (array && array.length && item) {
    var idx = array.indexOf(item);
    return idx === -1 ? null : array[idx + 1];
  }
  return null;
}

/**
 * returns prev item.
 * @param {Array} array
 */
function prev(array, item) {
  if (array && array.length && item) {
    var idx = array.indexOf(item);
    return idx === -1 ? null : array[idx - 1];
  }
  return null;
}

/**
 * @class core.list
 *
 * list utils
 *
 * @singleton
 * @alternateClassName list
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  head: head,
  last: last,
  initial: initial,
  tail: tail,
  prev: prev,
  next: next,
  find: find,
  contains: contains,
  all: all,
  sum: sum,
  from: from,
  isEmpty: isEmpty,
  clusterBy: clusterBy,
  compact: compact,
  unique: unique
});

/***/ }),

/***/ "./src/js/core/range.js":
/*!******************************!*\
  !*** ./src/js/core/range.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env */ "./src/js/core/env.js");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./func */ "./src/js/core/func.js");
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lists */ "./src/js/core/lists.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






/**
 * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
 *
 * @param {TextRange} textRange
 * @param {Boolean} isStart
 * @return {BoundaryPoint}
 *
 * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
 */
function textRangeToPoint(textRange, isStart) {
  var container = textRange.parentElement();
  var offset;
  var tester = document.body.createTextRange();
  var prevContainer;
  var childNodes = _lists__WEBPACK_IMPORTED_MODULE_3__["default"].from(container.childNodes);
  for (offset = 0; offset < childNodes.length; offset++) {
    if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(childNodes[offset])) {
      continue;
    }
    tester.moveToElementText(childNodes[offset]);
    if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
      break;
    }
    prevContainer = childNodes[offset];
  }
  if (offset !== 0 && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(childNodes[offset - 1])) {
    var textRangeStart = document.body.createTextRange();
    var curTextNode = null;
    textRangeStart.moveToElementText(prevContainer || container);
    textRangeStart.collapse(!prevContainer);
    curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;
    var pointTester = textRange.duplicate();
    pointTester.setEndPoint('StartToStart', textRangeStart);
    var textCount = pointTester.text.replace(/[\r\n]/g, '').length;
    while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
      textCount -= curTextNode.nodeValue.length;
      curTextNode = curTextNode.nextSibling;
    }

    // [workaround] enforce IE to re-reference curTextNode, hack
    var dummy = curTextNode.nodeValue; // eslint-disable-line

    if (isStart && curTextNode.nextSibling && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(curTextNode.nextSibling) && textCount === curTextNode.nodeValue.length) {
      textCount -= curTextNode.nodeValue.length;
      curTextNode = curTextNode.nextSibling;
    }
    container = curTextNode;
    offset = textCount;
  }
  return {
    cont: container,
    offset: offset
  };
}

/**
 * return TextRange from boundary point (inspired by google closure-library)
 * @param {BoundaryPoint} point
 * @return {TextRange}
 */
function pointToTextRange(point) {
  var textRangeInfo = function textRangeInfo(container, offset) {
    var node, isCollapseToStart;
    if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(container)) {
      var prevTextNodes = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].listPrev(container, _func__WEBPACK_IMPORTED_MODULE_2__["default"].not(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText));
      var prevContainer = _lists__WEBPACK_IMPORTED_MODULE_3__["default"].last(prevTextNodes).previousSibling;
      node = prevContainer || container.parentNode;
      offset += _lists__WEBPACK_IMPORTED_MODULE_3__["default"].sum(_lists__WEBPACK_IMPORTED_MODULE_3__["default"].tail(prevTextNodes), _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nodeLength);
      isCollapseToStart = !prevContainer;
    } else {
      node = container.childNodes[offset] || container;
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(node)) {
        return textRangeInfo(node, 0);
      }
      offset = 0;
      isCollapseToStart = false;
    }
    return {
      node: node,
      collapseToStart: isCollapseToStart,
      offset: offset
    };
  };
  var textRange = document.body.createTextRange();
  var info = textRangeInfo(point.node, point.offset);
  textRange.moveToElementText(info.node);
  textRange.collapse(info.collapseToStart);
  textRange.moveStart('character', info.offset);
  return textRange;
}

/**
   * Wrapped Range
   *
   * @constructor
   * @param {Node} sc - start container
   * @param {Number} so - start offset
   * @param {Node} ec - end container
   * @param {Number} eo - end offset
   */
var WrappedRange = /*#__PURE__*/function () {
  function WrappedRange(sc, so, ec, eo) {
    _classCallCheck(this, WrappedRange);
    this.sc = sc;
    this.so = so;
    this.ec = ec;
    this.eo = eo;

    // isOnEditable: judge whether range is on editable or not
    this.isOnEditable = this.makeIsOn(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEditable);
    // isOnList: judge whether range is on list node or not
    this.isOnList = this.makeIsOn(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isList);
    // isOnAnchor: judge whether range is on anchor node or not
    this.isOnAnchor = this.makeIsOn(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isAnchor);
    // isOnCell: judge whether range is on cell node or not
    this.isOnCell = this.makeIsOn(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isCell);
    // isOnData: judge whether range is on data node or not
    this.isOnData = this.makeIsOn(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isData);
  }

  // nativeRange: get nativeRange from sc, so, ec, eo
  return _createClass(WrappedRange, [{
    key: "nativeRange",
    value: function nativeRange() {
      if (_env__WEBPACK_IMPORTED_MODULE_1__["default"].isW3CRangeSupport) {
        var w3cRange = document.createRange();
        w3cRange.setStart(this.sc, this.so);
        w3cRange.setEnd(this.ec, this.eo);
        return w3cRange;
      } else {
        var textRange = pointToTextRange({
          node: this.sc,
          offset: this.so
        });
        textRange.setEndPoint('EndToEnd', pointToTextRange({
          node: this.ec,
          offset: this.eo
        }));
        return textRange;
      }
    }
  }, {
    key: "getPoints",
    value: function getPoints() {
      return {
        sc: this.sc,
        so: this.so,
        ec: this.ec,
        eo: this.eo
      };
    }
  }, {
    key: "getStartPoint",
    value: function getStartPoint() {
      return {
        node: this.sc,
        offset: this.so
      };
    }
  }, {
    key: "getEndPoint",
    value: function getEndPoint() {
      return {
        node: this.ec,
        offset: this.eo
      };
    }

    /**
     * select update visible range
     */
  }, {
    key: "select",
    value: function select() {
      var nativeRng = this.nativeRange();
      if (_env__WEBPACK_IMPORTED_MODULE_1__["default"].isW3CRangeSupport) {
        var selection = document.getSelection();
        if (selection.rangeCount > 0) {
          selection.removeAllRanges();
        }
        selection.addRange(nativeRng);
      } else {
        nativeRng.select();
      }
      return this;
    }

    /**
     * Moves the scrollbar to start container(sc) of current range
     *
     * @return {WrappedRange}
     */
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView(container) {
      var height = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).height();
      if (container.scrollTop + height < this.sc.offsetTop) {
        container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
      }
      return this;
    }

    /**
     * @return {WrappedRange}
     */
  }, {
    key: "normalize",
    value: function normalize() {
      /**
       * @param {BoundaryPoint} point
       * @param {Boolean} isLeftToRight - true: prefer to choose right node
       *                                - false: prefer to choose left node
       * @return {BoundaryPoint}
       */
      var getVisiblePoint = function getVisiblePoint(point, isLeftToRight) {
        if (!point) {
          return point;
        }

        // Just use the given point [XXX:Adhoc]
        //  - case 01. if the point is on the middle of the node
        //  - case 02. if the point is on the right edge and prefer to choose left node
        //  - case 03. if the point is on the left edge and prefer to choose right node
        //  - case 04. if the point is on the right edge and prefer to choose right node but the node is void
        //  - case 05. if the point is on the left edge and prefer to choose left node but the node is void
        //  - case 06. if the point is on the block node and there is no children
        if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVisiblePoint(point)) {
          if (!_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEdgePoint(point) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isRightEdgePoint(point) && !isLeftToRight || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgePoint(point) && isLeftToRight || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isRightEdgePoint(point) && isLeftToRight && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVoid(point.node.nextSibling) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgePoint(point) && !isLeftToRight && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVoid(point.node.previousSibling) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isBlock(point.node) && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEmpty(point.node)) {
            return point;
          }
        }

        // point on block's edge
        var block = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(point.node, _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isBlock);
        var hasRightNode = false;
        if (!hasRightNode) {
          var prevPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPoint(point) || {
            node: null
          };
          hasRightNode = (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgePointOf(point, block) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVoid(prevPoint.node)) && !isLeftToRight;
        }
        var hasLeftNode = false;
        if (!hasLeftNode) {
          var _nextPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nextPoint(point) || {
            node: null
          };
          hasLeftNode = (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isRightEdgePointOf(point, block) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVoid(_nextPoint.node)) && isLeftToRight;
        }
        if (hasRightNode || hasLeftNode) {
          // returns point already on visible point
          if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVisiblePoint(point)) {
            return point;
          }
          // reverse direction
          isLeftToRight = !isLeftToRight;
        }
        var nextPoint = isLeftToRight ? _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nextPointUntil(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].nextPoint(point), _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVisiblePoint) : _dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPointUntil(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPoint(point), _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVisiblePoint);
        return nextPoint || point;
      };
      var endPoint = getVisiblePoint(this.getEndPoint(), false);
      var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);
      return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
    }

    /**
     * returns matched nodes on range
     *
     * @param {Function} [pred] - predicate function
     * @param {Object} [options]
     * @param {Boolean} [options.includeAncestor]
     * @param {Boolean} [options.fullyContains]
     * @return {Node[]}
     */
  }, {
    key: "nodes",
    value: function nodes(pred, options) {
      pred = pred || _func__WEBPACK_IMPORTED_MODULE_2__["default"].ok;
      var includeAncestor = options && options.includeAncestor;
      var fullyContains = options && options.fullyContains;

      // TODO compare points and sort
      var startPoint = this.getStartPoint();
      var endPoint = this.getEndPoint();
      var nodes = [];
      var leftEdgeNodes = [];
      _dom__WEBPACK_IMPORTED_MODULE_4__["default"].walkPoint(startPoint, endPoint, function (point) {
        if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEditable(point.node)) {
          return;
        }
        var node;
        if (fullyContains) {
          if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgePoint(point)) {
            leftEdgeNodes.push(point.node);
          }
          if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isRightEdgePoint(point) && _lists__WEBPACK_IMPORTED_MODULE_3__["default"].contains(leftEdgeNodes, point.node)) {
            node = point.node;
          }
        } else if (includeAncestor) {
          node = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(point.node, pred);
        } else {
          node = point.node;
        }
        if (node && pred(node)) {
          nodes.push(node);
        }
      }, true);
      return _lists__WEBPACK_IMPORTED_MODULE_3__["default"].unique(nodes);
    }

    /**
     * returns commonAncestor of range
     * @return {Element} - commonAncestor
     */
  }, {
    key: "commonAncestor",
    value: function commonAncestor() {
      return _dom__WEBPACK_IMPORTED_MODULE_4__["default"].commonAncestor(this.sc, this.ec);
    }

    /**
     * returns expanded range by pred
     *
     * @param {Function} pred - predicate function
     * @return {WrappedRange}
     */
  }, {
    key: "expand",
    value: function expand(pred) {
      var startAncestor = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(this.sc, pred);
      var endAncestor = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(this.ec, pred);
      if (!startAncestor && !endAncestor) {
        return new WrappedRange(this.sc, this.so, this.ec, this.eo);
      }
      var boundaryPoints = this.getPoints();
      if (startAncestor) {
        boundaryPoints.sc = startAncestor;
        boundaryPoints.so = 0;
      }
      if (endAncestor) {
        boundaryPoints.ec = endAncestor;
        boundaryPoints.eo = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nodeLength(endAncestor);
      }
      return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
    }

    /**
     * @param {Boolean} isCollapseToStart
     * @return {WrappedRange}
     */
  }, {
    key: "collapse",
    value: function collapse(isCollapseToStart) {
      if (isCollapseToStart) {
        return new WrappedRange(this.sc, this.so, this.sc, this.so);
      } else {
        return new WrappedRange(this.ec, this.eo, this.ec, this.eo);
      }
    }

    /**
     * splitText on range
     */
  }, {
    key: "splitText",
    value: function splitText() {
      var isSameContainer = this.sc === this.ec;
      var boundaryPoints = this.getPoints();
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(this.ec) && !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEdgePoint(this.getEndPoint())) {
        this.ec.splitText(this.eo);
      }
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(this.sc) && !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEdgePoint(this.getStartPoint())) {
        boundaryPoints.sc = this.sc.splitText(this.so);
        boundaryPoints.so = 0;
        if (isSameContainer) {
          boundaryPoints.ec = boundaryPoints.sc;
          boundaryPoints.eo = this.eo - this.so;
        }
      }
      return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
    }

    /**
     * delete contents on range
     * @return {WrappedRange}
     */
  }, {
    key: "deleteContents",
    value: function deleteContents() {
      if (this.isCollapsed()) {
        return this;
      }
      var rng = this.splitText();
      var nodes = rng.nodes(null, {
        fullyContains: true
      });

      // find new cursor point
      var point = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPointUntil(rng.getStartPoint(), function (point) {
        return !_lists__WEBPACK_IMPORTED_MODULE_3__["default"].contains(nodes, point.node);
      });
      var emptyParents = [];
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(nodes, function (idx, node) {
        // find empty parents
        var parent = node.parentNode;
        if (point.node !== parent && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nodeLength(parent) === 1) {
          emptyParents.push(parent);
        }
        _dom__WEBPACK_IMPORTED_MODULE_4__["default"].remove(node, false);
      });

      // remove empty parents
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(emptyParents, function (idx, node) {
        _dom__WEBPACK_IMPORTED_MODULE_4__["default"].remove(node, false);
      });
      return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
    }

    /**
     * makeIsOn: return isOn(pred) function
     */
  }, {
    key: "makeIsOn",
    value: function makeIsOn(pred) {
      return function () {
        var ancestor = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(this.sc, pred);
        return !!ancestor && ancestor === _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(this.ec, pred);
      };
    }

    /**
     * @param {Function} pred
     * @return {Boolean}
     */
  }, {
    key: "isLeftEdgeOf",
    value: function isLeftEdgeOf(pred) {
      if (!_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgePoint(this.getStartPoint())) {
        return false;
      }
      var node = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].ancestor(this.sc, pred);
      return node && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgeOf(this.sc, node);
    }

    /**
     * returns whether range was collapsed or not
     */
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      return this.sc === this.ec && this.so === this.eo;
    }

    /**
     * wrap inline nodes which children of body with paragraph
     *
     * @return {WrappedRange}
     */
  }, {
    key: "wrapBodyInlineWithPara",
    value: function wrapBodyInlineWithPara() {
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isBodyContainer(this.sc) && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEmpty(this.sc)) {
        this.sc.innerHTML = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].emptyPara;
        return new WrappedRange(this.sc.firstChild, 0, this.sc.firstChild, 0);
      }

      /**
       * [workaround] firefox often create range on not visible point. so normalize here.
       *  - firefox: |<p>text</p>|
       *  - chrome: <p>|text|</p>
       */
      var rng = this.normalize();
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isParaInline(this.sc) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isPara(this.sc)) {
        return rng;
      }

      // find inline top ancestor
      var topAncestor;
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isInline(rng.sc)) {
        var ancestors = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].listAncestor(rng.sc, _func__WEBPACK_IMPORTED_MODULE_2__["default"].not(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isInline));
        topAncestor = _lists__WEBPACK_IMPORTED_MODULE_3__["default"].last(ancestors);
        if (!_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isInline(topAncestor)) {
          topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
        }
      } else {
        topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
      }
      if (topAncestor) {
        // siblings not in paragraph
        var inlineSiblings = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].listPrev(topAncestor, _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isParaInline).reverse();
        inlineSiblings = inlineSiblings.concat(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].listNext(topAncestor.nextSibling, _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isParaInline));

        // wrap with paragraph
        if (inlineSiblings.length) {
          var para = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].wrap(_lists__WEBPACK_IMPORTED_MODULE_3__["default"].head(inlineSiblings), 'p');
          _dom__WEBPACK_IMPORTED_MODULE_4__["default"].appendChildNodes(para, _lists__WEBPACK_IMPORTED_MODULE_3__["default"].tail(inlineSiblings));
        }
      }
      return this.normalize();
    }

    /**
     * insert node at current cursor
     *
     * @param {Node} node
     * @param {Boolean} doNotInsertPara - default is false, removes added <p> that's added if true
     * @return {Node}
     */
  }, {
    key: "insertNode",
    value: function insertNode(node) {
      var doNotInsertPara = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var rng = this;
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(node) || _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isInline(node)) {
        rng = this.wrapBodyInlineWithPara().deleteContents();
      }

      /*
      const info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));
      if (info.rightNode) {
        info.rightNode.parentNode.insertBefore(node, info.rightNode);
        if (dom.isEmpty(info.rightNode) && (doNotInsertPara || dom.isPara(node))) {
          info.rightNode.parentNode.removeChild(info.rightNode);
        }
      } else {
        info.container.appendChild(node);
      }
       */
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(rng.getStartPoint().node).after(node);
      return node;
    }

    /**
     * insert html at current cursor
     */
  }, {
    key: "pasteHTML",
    value: function pasteHTML(markup) {
      markup = ((markup || '') + '').trim(markup);
      var contentsContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').html(markup)[0];
      var childNodes = _lists__WEBPACK_IMPORTED_MODULE_3__["default"].from(contentsContainer.childNodes);

      // const rng = this.wrapBodyInlineWithPara().deleteContents();
      var rng = this;
      var reversed = false;
      if (rng.so >= 0) {
        childNodes = childNodes.reverse();
        reversed = true;
      }
      childNodes = childNodes.map(function (childNode) {
        return rng.insertNode(childNode, !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isInline(childNode));
      });
      if (reversed) {
        childNodes = childNodes.reverse();
      }
      return childNodes;
    }

    /**
     * returns text in range
     *
     * @return {String}
     */
  }, {
    key: "toString",
    value: function toString() {
      var nativeRng = this.nativeRange();
      return _env__WEBPACK_IMPORTED_MODULE_1__["default"].isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
    }

    /**
     * returns range for word before cursor
     *
     * @param {Boolean} [findAfter] - find after cursor, default: false
     * @return {WrappedRange}
     */
  }, {
    key: "getWordRange",
    value: function getWordRange(findAfter) {
      var endPoint = this.getEndPoint();
      if (!_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isCharPoint(endPoint)) {
        return this;
      }
      var startPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPointUntil(endPoint, function (point) {
        return !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isCharPoint(point);
      });
      if (findAfter) {
        endPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nextPointUntil(endPoint, function (point) {
          return !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isCharPoint(point);
        });
      }
      return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
    }

    /**
     * returns range for words before cursor
     *
     * @param {Boolean} [findAfter] - find after cursor, default: false
     * @return {WrappedRange}
     */
  }, {
    key: "getWordsRange",
    value: function getWordsRange(findAfter) {
      var endPoint = this.getEndPoint();
      var isNotTextPoint = function isNotTextPoint(point) {
        return !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isCharPoint(point) && !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isSpacePoint(point);
      };
      if (isNotTextPoint(endPoint)) {
        return this;
      }
      var startPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPointUntil(endPoint, isNotTextPoint);
      if (findAfter) {
        endPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nextPointUntil(endPoint, isNotTextPoint);
      }
      return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
    }

    /**
     * returns range for words before cursor that match with a Regex
     *
     * example:
     *  range: 'hi @Peter Pan'
     *  regex: '/@[a-z ]+/i'
     *  return range: '@Peter Pan'
     *
     * @param {RegExp} [regex]
     * @return {WrappedRange|null}
     */
  }, {
    key: "getWordsMatchRange",
    value: function getWordsMatchRange(regex) {
      var endPoint = this.getEndPoint();
      var startPoint = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].prevPointUntil(endPoint, function (point) {
        if (!_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isCharPoint(point) && !_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isSpacePoint(point)) {
          return true;
        }
        var rng = new WrappedRange(point.node, point.offset, endPoint.node, endPoint.offset);
        var result = regex.exec(rng.toString());
        return result && result.index === 0;
      });
      var rng = new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      var text = rng.toString();
      var result = regex.exec(text);
      if (result && result[0].length === text.length) {
        return rng;
      } else {
        return null;
      }
    }

    /**
     * create offsetPath bookmark
     *
     * @param {Node} editable
     */
  }, {
    key: "bookmark",
    value: function bookmark(editable) {
      return {
        s: {
          path: _dom__WEBPACK_IMPORTED_MODULE_4__["default"].makeOffsetPath(editable, this.sc),
          offset: this.so
        },
        e: {
          path: _dom__WEBPACK_IMPORTED_MODULE_4__["default"].makeOffsetPath(editable, this.ec),
          offset: this.eo
        }
      };
    }

    /**
     * create offsetPath bookmark base on paragraph
     *
     * @param {Node[]} paras
     */
  }, {
    key: "paraBookmark",
    value: function paraBookmark(paras) {
      return {
        s: {
          path: _lists__WEBPACK_IMPORTED_MODULE_3__["default"].tail(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].makeOffsetPath(_lists__WEBPACK_IMPORTED_MODULE_3__["default"].head(paras), this.sc)),
          offset: this.so
        },
        e: {
          path: _lists__WEBPACK_IMPORTED_MODULE_3__["default"].tail(_dom__WEBPACK_IMPORTED_MODULE_4__["default"].makeOffsetPath(_lists__WEBPACK_IMPORTED_MODULE_3__["default"].last(paras), this.ec)),
          offset: this.eo
        }
      };
    }

    /**
     * getClientRects
     * @return {Rect[]}
     */
  }, {
    key: "getClientRects",
    value: function getClientRects() {
      var nativeRng = this.nativeRange();
      return nativeRng.getClientRects();
    }
  }]);
}();
/**
 * Data structure
 *  * BoundaryPoint: a point of dom tree
 *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
 *
 * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * create Range Object From arguments or Browser Selection
   *
   * @param {Node} sc - start container
   * @param {Number} so - start offset
   * @param {Node} ec - end container
   * @param {Number} eo - end offset
   * @return {WrappedRange}
   */
  create: function create(sc, so, ec, eo) {
    if (arguments.length === 4) {
      return new WrappedRange(sc, so, ec, eo);
    } else if (arguments.length === 2) {
      // collapsed
      ec = sc;
      eo = so;
      return new WrappedRange(sc, so, ec, eo);
    } else {
      var wrappedRange = this.createFromSelection();
      if (!wrappedRange && arguments.length === 1) {
        var bodyElement = arguments[0];
        if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isEditable(bodyElement)) {
          bodyElement = bodyElement.lastChild;
        }
        return this.createFromBodyElement(bodyElement, _dom__WEBPACK_IMPORTED_MODULE_4__["default"].emptyPara === arguments[0].innerHTML);
      }
      return wrappedRange;
    }
  },
  createFromBodyElement: function createFromBodyElement(bodyElement) {
    var isCollapseToStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var wrappedRange = this.createFromNode(bodyElement);
    return wrappedRange.collapse(isCollapseToStart);
  },
  createFromSelection: function createFromSelection() {
    var sc, so, ec, eo;
    if (_env__WEBPACK_IMPORTED_MODULE_1__["default"].isW3CRangeSupport) {
      var selection = document.getSelection();
      if (!selection || selection.rangeCount === 0) {
        return null;
      } else if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isBody(selection.anchorNode)) {
        // Firefox: returns entire body as range on initialization.
        // We won't never need it.
        return null;
      }
      var nativeRng = selection.getRangeAt(0);
      sc = nativeRng.startContainer;
      so = nativeRng.startOffset;
      ec = nativeRng.endContainer;
      eo = nativeRng.endOffset;
    } else {
      // IE8: TextRange
      var textRange = document.selection.createRange();
      var textRangeEnd = textRange.duplicate();
      textRangeEnd.collapse(false);
      var textRangeStart = textRange;
      textRangeStart.collapse(true);
      var startPoint = textRangeToPoint(textRangeStart, true);
      var endPoint = textRangeToPoint(textRangeEnd, false);

      // same visible point case: range was collapsed.
      if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isText(startPoint.node) && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isLeftEdgePoint(startPoint) && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isTextNode(endPoint.node) && _dom__WEBPACK_IMPORTED_MODULE_4__["default"].isRightEdgePoint(endPoint) && endPoint.node.nextSibling === startPoint.node) {
        startPoint = endPoint;
      }
      sc = startPoint.cont;
      so = startPoint.offset;
      ec = endPoint.cont;
      eo = endPoint.offset;
    }
    return new WrappedRange(sc, so, ec, eo);
  },
  /**
   * @method
   *
   * create WrappedRange from node
   *
   * @param {Node} node
   * @return {WrappedRange}
   */
  createFromNode: function createFromNode(node) {
    var sc = node;
    var so = 0;
    var ec = node;
    var eo = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].nodeLength(ec);

    // browsers can't target a picture or void node
    if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVoid(sc)) {
      so = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].listPrev(sc).length - 1;
      sc = sc.parentNode;
    }
    if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isBR(ec)) {
      eo = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].listPrev(ec).length - 1;
      ec = ec.parentNode;
    } else if (_dom__WEBPACK_IMPORTED_MODULE_4__["default"].isVoid(ec)) {
      eo = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].listPrev(ec).length;
      ec = ec.parentNode;
    }
    return this.create(sc, so, ec, eo);
  },
  /**
   * create WrappedRange from node after position
   *
   * @param {Node} node
   * @return {WrappedRange}
   */
  createFromNodeBefore: function createFromNodeBefore(node) {
    return this.createFromNode(node).collapse(true);
  },
  /**
   * create WrappedRange from node after position
   *
   * @param {Node} node
   * @return {WrappedRange}
   */
  createFromNodeAfter: function createFromNodeAfter(node) {
    return this.createFromNode(node).collapse();
  },
  /**
   * @method
   *
   * create WrappedRange from bookmark
   *
   * @param {Node} editable
   * @param {Object} bookmark
   * @return {WrappedRange}
   */
  createFromBookmark: function createFromBookmark(editable, bookmark) {
    var sc = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].fromOffsetPath(editable, bookmark.s.path);
    var so = bookmark.s.offset;
    var ec = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].fromOffsetPath(editable, bookmark.e.path);
    var eo = bookmark.e.offset;
    return new WrappedRange(sc, so, ec, eo);
  },
  /**
   * @method
   *
   * create WrappedRange from paraBookmark
   *
   * @param {Object} bookmark
   * @param {Node[]} paras
   * @return {WrappedRange}
   */
  createFromParaBookmark: function createFromParaBookmark(bookmark, paras) {
    var so = bookmark.s.offset;
    var eo = bookmark.e.offset;
    var sc = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].fromOffsetPath(_lists__WEBPACK_IMPORTED_MODULE_3__["default"].head(paras), bookmark.s.path);
    var ec = _dom__WEBPACK_IMPORTED_MODULE_4__["default"].fromOffsetPath(_lists__WEBPACK_IMPORTED_MODULE_3__["default"].last(paras), bookmark.e.path);
    return new WrappedRange(sc, so, ec, eo);
  }
});

/***/ }),

/***/ "./src/js/editing/Bullet.js":
/*!**********************************!*\
  !*** ./src/js/editing/Bullet.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bullet)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/range */ "./src/js/core/range.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var Bullet = /*#__PURE__*/function () {
  function Bullet() {
    _classCallCheck(this, Bullet);
  }
  return _createClass(Bullet, [{
    key: "insertOrderedList",
    value:
    /**
     * toggle ordered list
     */
    function insertOrderedList(editable) {
      this.toggleList('OL', editable);
    }

    /**
     * toggle unordered list
     */
  }, {
    key: "insertUnorderedList",
    value: function insertUnorderedList(editable) {
      this.toggleList('UL', editable);
    }

    /**
     * indent
     */
  }, {
    key: "indent",
    value: function indent(editable) {
      var _this = this;
      var rng = _core_range__WEBPACK_IMPORTED_MODULE_4__["default"].create(editable).wrapBodyInlineWithPara();
      var paras = rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPara, {
        includeAncestor: true
      });
      var clustereds = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].clusterBy(paras, _core_func__WEBPACK_IMPORTED_MODULE_2__["default"].peq2('parentNode'));
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(clustereds, function (idx, paras) {
        var head = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].head(paras);
        if (_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isLi(head)) {
          var previousList = _this.findList(head.previousElementSibling);
          if (previousList) {
            paras.map(function (para) {
              return previousList.appendChild(para);
            });
          } else {
            _this.wrapList(paras, head.parentNode.nodeName);

            // move ul element to parent li element
            paras.map(function (para) {
              return para.parentNode;
            })
            // distinct
            .filter(function (elem, index, self) {
              return index === self.indexOf(elem);
            }).map(function (para) {
              return _this.appendToPrevious(para);
            });
          }
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(paras, function (idx, para) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(para).css('marginLeft', function (idx, val) {
              return (parseInt(val, 10) || 0) + 25;
            });
          });
        }
      });
      rng.select();
    }

    /**
     * outdent
     */
  }, {
    key: "outdent",
    value: function outdent(editable) {
      var _this2 = this;
      var rng = _core_range__WEBPACK_IMPORTED_MODULE_4__["default"].create(editable).wrapBodyInlineWithPara();
      var paras = rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPara, {
        includeAncestor: true
      });
      var clustereds = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].clusterBy(paras, _core_func__WEBPACK_IMPORTED_MODULE_2__["default"].peq2('parentNode'));
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(clustereds, function (idx, paras) {
        var head = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].head(paras);
        if (_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isLi(head)) {
          _this2.releaseList([paras]);
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(paras, function (idx, para) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(para).css('marginLeft', function (idx, val) {
              val = parseInt(val, 10) || 0;
              return val > 25 ? val - 25 : '';
            });
          });
        }
      });
      rng.select();
    }

    /**
     * toggle list
     *
     * @param {String} listName - OL or UL
     */
  }, {
    key: "toggleList",
    value: function toggleList(listName, editable) {
      var _this3 = this;
      var rng = _core_range__WEBPACK_IMPORTED_MODULE_4__["default"].create(editable).wrapBodyInlineWithPara();
      var paras = rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPara, {
        includeAncestor: true
      });
      var bookmark = rng.paraBookmark(paras);
      var clustereds = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].clusterBy(paras, _core_func__WEBPACK_IMPORTED_MODULE_2__["default"].peq2('parentNode'));

      // paragraph to list
      if (_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].find(paras, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPurePara)) {
        var wrappedParas = [];
        jquery__WEBPACK_IMPORTED_MODULE_0___default().each(clustereds, function (idx, paras) {
          wrappedParas = wrappedParas.concat(_this3.wrapList(paras, listName));
        });
        paras = wrappedParas;
        // list to paragraph or change list style
      } else {
        var diffLists = rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isList, {
          includeAncestor: true
        }).filter(function (listNode) {
          return listNode.nodeName !== listName;
        });
        if (diffLists.length) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(diffLists, function (idx, listNode) {
            _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].replace(listNode, listName);
          });
        } else {
          paras = this.releaseList(clustereds, true);
        }
      }
      _core_range__WEBPACK_IMPORTED_MODULE_4__["default"].createFromParaBookmark(bookmark, paras).select();
    }

    /**
     * @param {Node[]} paras
     * @param {String} listName
     * @return {Node[]}
     */
  }, {
    key: "wrapList",
    value: function wrapList(paras, listName) {
      var head = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].head(paras);
      var last = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].last(paras);
      var prevList = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isList(head.previousElementSibling) && head.previousElementSibling;
      var nextList = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isList(last.nextElementSibling) && last.nextElementSibling;
      var listNode = prevList || _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].insertAfter(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].create(listName || 'UL'), last);

      // P to LI
      paras = paras.map(function (para) {
        return _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPurePara(para) ? _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].replace(para, 'LI') : para;
      });

      // append to list(<ul>, <ol>)
      _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].appendChildNodes(listNode, paras);
      if (nextList) {
        _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].appendChildNodes(listNode, _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].from(nextList.childNodes));
        _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].remove(nextList);
      }
      return paras;
    }

    /**
     * @method releaseList
     *
     * @param {Array[]} clustereds
     * @param {Boolean} isEscapseToBody
     * @return {Node[]}
     */
  }, {
    key: "releaseList",
    value: function releaseList(clustereds, isEscapseToBody) {
      var _this4 = this;
      var releasedParas = [];
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(clustereds, function (idx, paras) {
        var head = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].head(paras);
        var last = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].last(paras);
        var headList = isEscapseToBody ? _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].lastAncestor(head, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isList) : head.parentNode;
        var parentItem = headList.parentNode;
        if (headList.parentNode.nodeName === 'LI') {
          paras.map(function (para) {
            var newList = _this4.findNextElementSiblings(para);
            if (parentItem.nextElementSibling) {
              parentItem.parentNode.insertBefore(para, parentItem.nextElementSibling);
            } else {
              parentItem.parentNode.appendChild(para);
            }
            if (newList.length) {
              _this4.wrapList(newList, headList.nodeName);
              para.appendChild(newList[0].parentNode);
            }
          });
          if (headList.children.length === 0) {
            parentItem.removeChild(headList);
          }

          // remove left-over ul or ul with only whitespace node
          if (parentItem.childNodes.length === 0 || parentItem.childNodes.length === 1 && parentItem.childNodes[0].textContent.trim() === '') {
            parentItem.parentNode.removeChild(parentItem);
          }
        } else {
          var lastList = headList.childNodes.length > 1 ? _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].splitTree(headList, {
            node: last.parentNode,
            offset: _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].position(last) + 1
          }, {
            isSkipPaddingBlankHTML: true
          }) : null;
          var middleList = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].splitTree(headList, {
            node: head.parentNode,
            offset: _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].position(head)
          }, {
            isSkipPaddingBlankHTML: true
          });
          paras = isEscapseToBody ? _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].listDescendant(middleList, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isLi) : _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].from(middleList.childNodes).filter(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isLi);

          // LI to P
          if (isEscapseToBody || !_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isList(headList.parentNode)) {
            paras = paras.map(function (para) {
              return _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].replace(para, 'P');
            });
          }
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].from(paras).reverse(), function (idx, para) {
            _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].insertAfter(para, headList);
          });

          // remove empty lists
          var rootLists = _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].compact([headList, middleList, lastList]);
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(rootLists, function (idx, rootList) {
            var listNodes = [rootList].concat(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].listDescendant(rootList, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isList));
            jquery__WEBPACK_IMPORTED_MODULE_0___default().each(listNodes.reverse(), function (idx, listNode) {
              if (!_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].nodeLength(listNode)) {
                _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].remove(listNode, true);
              }
            });
          });
        }
        releasedParas = releasedParas.concat(paras);
      });
      return releasedParas;
    }

    /**
     * @method appendToPrevious
     *
     * Appends list to previous list item, if
     * none exist it wraps the list in a new list item.
     *
     * @param {HTMLNode} ListItem
     * @return {HTMLNode}
     */
  }, {
    key: "appendToPrevious",
    value: function appendToPrevious(node) {
      return node.previousElementSibling ? _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].appendChildNodes(node.previousElementSibling, [node]) : this.wrapList([node], 'LI');
    }

    /**
     * @method findList
     *
     * Finds an existing list in list item
     *
     * @param {HTMLNode} ListItem
     * @return {Array[]}
     */
  }, {
    key: "findList",
    value: function findList(node) {
      return node ? node.children && _core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].find(node.children, function (child) {
        return ['OL', 'UL'].indexOf(child.nodeName) > -1;
      }) : null;
    }

    /**
     * @method findNextElementSiblings
     *
     * Finds all list item siblings that follow it
     *
     * @param {HTMLNode} ListItem
     * @return {HTMLNode}
     */
  }, {
    key: "findNextElementSiblings",
    value: function findNextElementSiblings(node) {
      var siblings = [];
      while (node.nextElementSibling) {
        siblings.push(node.nextElementSibling);
        node = node.nextElementSibling;
      }
      return siblings;
    }
  }]);
}();


/***/ }),

/***/ "./src/js/editing/History.js":
/*!***********************************!*\
  !*** ./src/js/editing/History.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ History)
/* harmony export */ });
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/range */ "./src/js/core/range.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var History = /*#__PURE__*/function () {
  function History(context) {
    _classCallCheck(this, History);
    this.stack = [];
    this.stackOffset = -1;
    this.context = context;
    this.$editable = context.layoutInfo.editable;
    this.editable = this.$editable[0];
  }
  return _createClass(History, [{
    key: "makeSnapshot",
    value: function makeSnapshot() {
      var rng = _core_range__WEBPACK_IMPORTED_MODULE_0__["default"].create(this.editable);
      var emptyBookmark = {
        s: {
          path: [],
          offset: 0
        },
        e: {
          path: [],
          offset: 0
        }
      };
      return {
        contents: this.$editable.html(),
        bookmark: rng && rng.isOnEditable() ? rng.bookmark(this.editable) : emptyBookmark
      };
    }
  }, {
    key: "applySnapshot",
    value: function applySnapshot(snapshot) {
      if (snapshot.contents !== null) {
        this.$editable.html(snapshot.contents);
      }
      if (snapshot.bookmark !== null) {
        _core_range__WEBPACK_IMPORTED_MODULE_0__["default"].createFromBookmark(this.editable, snapshot.bookmark).select();
      }
    }

    /**
    * @method rewind
    * Rewinds the history stack back to the first snapshot taken.
    * Leaves the stack intact, so that "Redo" can still be used.
    */
  }, {
    key: "rewind",
    value: function rewind() {
      // Create snap shot if not yet recorded
      if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
        this.recordUndo();
      }

      // Return to the first available snapshot.
      this.stackOffset = 0;

      // Apply that snapshot.
      this.applySnapshot(this.stack[this.stackOffset]);
    }

    /**
    *  @method commit
    *  Resets history stack, but keeps current editor's content.
    */
  }, {
    key: "commit",
    value: function commit() {
      // Clear the stack.
      this.stack = [];

      // Restore stackOffset to its original value.
      this.stackOffset = -1;

      // Record our first snapshot (of nothing).
      this.recordUndo();
    }

    /**
    * @method reset
    * Resets the history stack completely; reverting to an empty editor.
    */
  }, {
    key: "reset",
    value: function reset() {
      // Clear the stack.
      this.stack = [];

      // Restore stackOffset to its original value.
      this.stackOffset = -1;

      // Clear the editable area.
      this.$editable.html('');

      // Record our first snapshot (of nothing).
      this.recordUndo();
    }

    /**
     * undo
     */
  }, {
    key: "undo",
    value: function undo() {
      // Create snap shot if not yet recorded
      if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
        this.recordUndo();
      }
      if (this.stackOffset > 0) {
        this.stackOffset--;
        this.applySnapshot(this.stack[this.stackOffset]);
      }
    }

    /**
     * redo
     */
  }, {
    key: "redo",
    value: function redo() {
      if (this.stack.length - 1 > this.stackOffset) {
        this.stackOffset++;
        this.applySnapshot(this.stack[this.stackOffset]);
      }
    }

    /**
     * recorded undo
     */
  }, {
    key: "recordUndo",
    value: function recordUndo() {
      this.stackOffset++;

      // Wash out stack after stackOffset
      if (this.stack.length > this.stackOffset) {
        this.stack = this.stack.slice(0, this.stackOffset);
      }

      // Create new snapshot and push it to the end
      this.stack.push(this.makeSnapshot());

      // If the stack size reachs to the limit, then slice it
      if (this.stack.length > this.context.options.historyLimit) {
        this.stack.shift();
        this.stackOffset -= 1;
      }
    }
  }]);
}();


/***/ }),

/***/ "./src/js/editing/Style.js":
/*!*********************************!*\
  !*** ./src/js/editing/Style.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var Style = /*#__PURE__*/function () {
  function Style() {
    _classCallCheck(this, Style);
  }
  return _createClass(Style, [{
    key: "jQueryCSS",
    value:
    /**
     * @method jQueryCSS
     *
     * [workaround] for old jQuery
     * passing an array of style properties to .css()
     * will result in an object of property-value pairs.
     * (compability with version < 1.9)
     *
     * @private
     * @param  {jQuery} $obj
     * @param  {Array} propertyNames - An array of one or more CSS properties.
     * @return {Object}
     */
    function jQueryCSS($obj, propertyNames) {
      var result = {};
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(propertyNames, function (idx, propertyName) {
        result[propertyName] = $obj.css(propertyName);
      });
      return result;
    }

    /**
     * returns style object from node
     *
     * @param {jQuery} $node
     * @return {Object}
     */
  }, {
    key: "fromNode",
    value: function fromNode($node) {
      var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
      var styleInfo = this.jQueryCSS($node, properties) || {};
      var fontSize = $node[0].style.fontSize || styleInfo['font-size'];
      styleInfo['font-size'] = parseInt(fontSize, 10);
      styleInfo['font-size-unit'] = fontSize.match(/[a-z%]+$/);
      return styleInfo;
    }

    /**
     * paragraph level style
     *
     * @param {WrappedRange} rng
     * @param {Object} styleInfo
     */
  }, {
    key: "stylePara",
    value: function stylePara(rng, styleInfo) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPara, {
        includeAncestor: true
      }), function (idx, para) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(para).css(styleInfo);
      });
    }

    /**
     * insert and returns styleNodes on range.
     *
     * @param {WrappedRange} rng
     * @param {Object} [options] - options for styleNodes
     * @param {String} [options.nodeName] - default: `SPAN`
     * @param {Boolean} [options.expandClosestSibling] - default: `false`
     * @param {Boolean} [options.onlyPartialContains] - default: `false`
     * @return {Node[]}
     */
  }, {
    key: "styleNodes",
    value: function styleNodes(rng, options) {
      rng = rng.splitText();
      var nodeName = options && options.nodeName || 'SPAN';
      var expandClosestSibling = !!(options && options.expandClosestSibling);
      var onlyPartialContains = !!(options && options.onlyPartialContains);
      if (rng.isCollapsed()) {
        return [rng.insertNode(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].create(nodeName))];
      }
      var pred = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].makePredByNodeName(nodeName);
      var nodes = rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isText, {
        fullyContains: true
      }).map(function (text) {
        return _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].singleChildAncestor(text, pred) || _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].wrap(text, nodeName);
      });
      if (expandClosestSibling) {
        if (onlyPartialContains) {
          var nodesInRange = rng.nodes();
          // compose with partial contains predication
          pred = _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].and(pred, function (node) {
            return _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].contains(nodesInRange, node);
          });
        }
        return nodes.map(function (node) {
          var siblings = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].withClosestSiblings(node, pred);
          var head = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(siblings);
          var tails = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].tail(siblings);
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(tails, function (idx, elem) {
            _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].appendChildNodes(head, elem.childNodes);
            _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].remove(elem);
          });
          return _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(siblings);
        });
      } else {
        return nodes;
      }
    }

    /**
     * get current style on cursor
     *
     * @param {WrappedRange} rng
     * @return {Object} - object contains style properties.
     */
  }, {
    key: "current",
    value: function current(rng) {
      var $cont = jquery__WEBPACK_IMPORTED_MODULE_0___default()(!_core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
      var styleInfo = this.fromNode($cont);

      // document.queryCommandState for toggle state
      // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"
      try {
        styleInfo = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(styleInfo, {
          'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
          'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
          'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
          'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
          'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
          'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal',
          'font-family': document.queryCommandValue('fontname') || styleInfo['font-family']
        });
      } catch (e) {
        // eslint-disable-next-line
      }

      // list-style-type to list-style(unordered, ordered)
      if (!rng.isOnList()) {
        styleInfo['list-style'] = 'none';
      } else {
        var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
        var isUnordered = orderedTypes.indexOf(styleInfo['list-style-type']) > -1;
        styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
      }
      var para = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].ancestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isPara);
      if (para && para.style['line-height']) {
        styleInfo['line-height'] = para.style.lineHeight;
      } else {
        var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
        styleInfo['line-height'] = lineHeight.toFixed(1);
      }
      styleInfo.anchor = rng.isOnAnchor() && _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].ancestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isAnchor);
      styleInfo.ancestors = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].listAncestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isEditable);
      styleInfo.range = rng;
      return styleInfo;
    }
  }]);
}();


/***/ }),

/***/ "./src/js/editing/Table.js":
/*!*********************************!*\
  !*** ./src/js/editing/Table.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/range */ "./src/js/core/range.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * @class Create a virtual table to create what actions to do in change.
 * @param {object} startPoint Cell selected to apply change.
 * @param {enum} where  Where change will be applied Row or Col. Use enum: TableResultAction.where
 * @param {enum} action Action to be applied. Use enum: TableResultAction.requestAction
 * @param {object} domTable Dom element of table to make changes.
 */
var TableResultAction = function TableResultAction(startPoint, where, action, domTable) {
  var _startPoint = {
    'colPos': 0,
    'rowPos': 0
  };
  var _virtualTable = [];
  var _actionCellList = [];

  /// ///////////////////////////////////////////
  // Private functions
  /// ///////////////////////////////////////////

  /**
   * Set the startPoint of action.
   */
  function setStartPoint() {
    if (!startPoint || !startPoint.tagName || startPoint.tagName.toLowerCase() !== 'td' && startPoint.tagName.toLowerCase() !== 'th') {
      // Impossible to identify start Cell point
      return;
    }
    _startPoint.colPos = startPoint.cellIndex;
    if (!startPoint.parentElement || !startPoint.parentElement.tagName || startPoint.parentElement.tagName.toLowerCase() !== 'tr') {
      // Impossible to identify start Row point
      return;
    }
    _startPoint.rowPos = startPoint.parentElement.rowIndex;
  }

  /**
   * Define virtual table position info object.
   *
   * @param {int} rowIndex Index position in line of virtual table.
   * @param {int} cellIndex Index position in column of virtual table.
   * @param {object} baseRow Row affected by this position.
   * @param {object} baseCell Cell affected by this position.
   * @param {bool} isSpan Inform if it is an span cell/row.
   */
  function setVirtualTablePosition(rowIndex, cellIndex, baseRow, baseCell, isRowSpan, isColSpan, isVirtualCell) {
    var objPosition = {
      'baseRow': baseRow,
      'baseCell': baseCell,
      'isRowSpan': isRowSpan,
      'isColSpan': isColSpan,
      'isVirtual': isVirtualCell
    };
    if (!_virtualTable[rowIndex]) {
      _virtualTable[rowIndex] = [];
    }
    _virtualTable[rowIndex][cellIndex] = objPosition;
  }

  /**
   * Create action cell object.
   *
   * @param {object} virtualTableCellObj Object of specific position on virtual table.
   * @param {enum} resultAction Action to be applied in that item.
   */
  function getActionCell(virtualTableCellObj, resultAction, virtualRowPosition, virtualColPosition) {
    return {
      'baseCell': virtualTableCellObj.baseCell,
      'action': resultAction,
      'virtualTable': {
        'rowIndex': virtualRowPosition,
        'cellIndex': virtualColPosition
      }
    };
  }

  /**
   * Recover free index of row to append Cell.
   *
   * @param {int} rowIndex Index of row to find free space.
   * @param {int} cellIndex Index of cell to find free space in table.
   */
  function recoverCellIndex(rowIndex, cellIndex) {
    if (!_virtualTable[rowIndex]) {
      return cellIndex;
    }
    if (!_virtualTable[rowIndex][cellIndex]) {
      return cellIndex;
    }
    var newCellIndex = cellIndex;
    while (_virtualTable[rowIndex][newCellIndex]) {
      newCellIndex++;
      if (!_virtualTable[rowIndex][newCellIndex]) {
        return newCellIndex;
      }
    }
  }

  /**
   * Recover info about row and cell and add information to virtual table.
   *
   * @param {object} row Row to recover information.
   * @param {object} cell Cell to recover information.
   */
  function addCellInfoToVirtual(row, cell) {
    var cellIndex = recoverCellIndex(row.rowIndex, cell.cellIndex);
    var cellHasColspan = cell.colSpan > 1;
    var cellHasRowspan = cell.rowSpan > 1;
    var isThisSelectedCell = row.rowIndex === _startPoint.rowPos && cell.cellIndex === _startPoint.colPos;
    setVirtualTablePosition(row.rowIndex, cellIndex, row, cell, cellHasRowspan, cellHasColspan, false);

    // Add span rows to virtual Table.
    var rowspanNumber = cell.attributes.rowSpan ? parseInt(cell.attributes.rowSpan.value, 10) : 0;
    if (rowspanNumber > 1) {
      for (var rp = 1; rp < rowspanNumber; rp++) {
        var rowspanIndex = row.rowIndex + rp;
        adjustStartPoint(rowspanIndex, cellIndex, cell, isThisSelectedCell);
        setVirtualTablePosition(rowspanIndex, cellIndex, row, cell, true, cellHasColspan, true);
      }
    }

    // Add span cols to virtual table.
    var colspanNumber = cell.attributes.colSpan ? parseInt(cell.attributes.colSpan.value, 10) : 0;
    if (colspanNumber > 1) {
      for (var cp = 1; cp < colspanNumber; cp++) {
        var cellspanIndex = recoverCellIndex(row.rowIndex, cellIndex + cp);
        adjustStartPoint(row.rowIndex, cellspanIndex, cell, isThisSelectedCell);
        setVirtualTablePosition(row.rowIndex, cellspanIndex, row, cell, cellHasRowspan, true, true);
      }
    }
  }

  /**
   * Process validation and adjust of start point if needed
   *
   * @param {int} rowIndex
   * @param {int} cellIndex
   * @param {object} cell
   * @param {bool} isSelectedCell
   */
  function adjustStartPoint(rowIndex, cellIndex, cell, isSelectedCell) {
    if (rowIndex === _startPoint.rowPos && _startPoint.colPos >= cell.cellIndex && cell.cellIndex <= cellIndex && !isSelectedCell) {
      _startPoint.colPos++;
    }
  }

  /**
   * Create virtual table of cells with all cells, including span cells.
   */
  function createVirtualTable() {
    var rows = domTable.rows;
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var cells = rows[rowIndex].cells;
      for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
      }
    }
  }

  /**
   * Get action to be applied on the cell.
   *
   * @param {object} cell virtual table cell to apply action
   */
  function getDeleteResultActionToCell(cell) {
    switch (where) {
      case TableResultAction.where.Column:
        if (cell.isColSpan) {
          return TableResultAction.resultAction.SubtractSpanCount;
        }
        break;
      case TableResultAction.where.Row:
        if (!cell.isVirtual && cell.isRowSpan) {
          return TableResultAction.resultAction.AddCell;
        } else if (cell.isRowSpan) {
          return TableResultAction.resultAction.SubtractSpanCount;
        }
        break;
    }
    return TableResultAction.resultAction.RemoveCell;
  }

  /**
   * Get action to be applied on the cell.
   *
   * @param {object} cell virtual table cell to apply action
   */
  function getAddResultActionToCell(cell) {
    switch (where) {
      case TableResultAction.where.Column:
        if (cell.isColSpan) {
          return TableResultAction.resultAction.SumSpanCount;
        } else if (cell.isRowSpan && cell.isVirtual) {
          return TableResultAction.resultAction.Ignore;
        }
        break;
      case TableResultAction.where.Row:
        if (cell.isRowSpan) {
          return TableResultAction.resultAction.SumSpanCount;
        } else if (cell.isColSpan && cell.isVirtual) {
          return TableResultAction.resultAction.Ignore;
        }
        break;
    }
    return TableResultAction.resultAction.AddCell;
  }
  function init() {
    setStartPoint();
    createVirtualTable();
  }

  /// ///////////////////////////////////////////
  // Public functions
  /// ///////////////////////////////////////////

  /**
   * Recover array os what to do in table.
   */
  this.getActionList = function () {
    var fixedRow = where === TableResultAction.where.Row ? _startPoint.rowPos : -1;
    var fixedCol = where === TableResultAction.where.Column ? _startPoint.colPos : -1;
    var actualPosition = 0;
    var canContinue = true;
    while (canContinue) {
      var rowPosition = fixedRow >= 0 ? fixedRow : actualPosition;
      var colPosition = fixedCol >= 0 ? fixedCol : actualPosition;
      var row = _virtualTable[rowPosition];
      if (!row) {
        canContinue = false;
        return _actionCellList;
      }
      var cell = row[colPosition];
      if (!cell) {
        canContinue = false;
        return _actionCellList;
      }

      // Define action to be applied in this cell
      var resultAction = TableResultAction.resultAction.Ignore;
      switch (action) {
        case TableResultAction.requestAction.Add:
          resultAction = getAddResultActionToCell(cell);
          break;
        case TableResultAction.requestAction.Delete:
          resultAction = getDeleteResultActionToCell(cell);
          break;
      }
      _actionCellList.push(getActionCell(cell, resultAction, rowPosition, colPosition));
      actualPosition++;
    }
    return _actionCellList;
  };
  init();
};
/**
*
* Where action occours enum.
*/
TableResultAction.where = {
  'Row': 0,
  'Column': 1
};
/**
*
* Requested action to apply enum.
*/
TableResultAction.requestAction = {
  'Add': 0,
  'Delete': 1
};
/**
*
* Result action to be executed enum.
*/
TableResultAction.resultAction = {
  'Ignore': 0,
  'SubtractSpanCount': 1,
  'RemoveCell': 2,
  'AddCell': 3,
  'SumSpanCount': 4
};

/**
 *
 * @class editing.Table
 *
 * Table
 *
 */
var Table = /*#__PURE__*/function () {
  function Table() {
    _classCallCheck(this, Table);
  }
  return _createClass(Table, [{
    key: "tab",
    value:
    /**
     * handle tab key
     *
     * @param {WrappedRange} rng
     * @param {Boolean} isShift
     */
    function tab(rng, isShift) {
      var cell = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.commonAncestor(), _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      var table = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(cell, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isTable);
      var cells = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].listDescendant(table, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      var nextCell = _core_lists__WEBPACK_IMPORTED_MODULE_3__["default"][isShift ? 'prev' : 'next'](cells, cell);
      if (nextCell) {
        _core_range__WEBPACK_IMPORTED_MODULE_2__["default"].create(nextCell, 0).select();
      }
    }

    /**
     * Add a new row
     *
     * @param {WrappedRange} rng
     * @param {String} position (top/bottom)
     * @return {Node}
     */
  }, {
    key: "addRow",
    value: function addRow(rng, position) {
      var cell = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.commonAncestor(), _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      var currentTr = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell).closest('tr');
      var trAttributes = this.recoverAttributes(currentTr);
      var html = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<tr' + trAttributes + '></tr>');
      var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Add, jquery__WEBPACK_IMPORTED_MODULE_0___default()(currentTr).closest('table')[0]);
      var actions = vTable.getActionList();
      for (var idCell = 0; idCell < actions.length; idCell++) {
        var currentCell = actions[idCell];
        var tdAttributes = this.recoverAttributes(currentCell.baseCell);
        switch (currentCell.action) {
          case TableResultAction.resultAction.AddCell:
            html.append('<td' + tdAttributes + '>' + _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].blank + '</td>');
            break;
          case TableResultAction.resultAction.SumSpanCount:
            {
              if (position === 'top') {
                var baseCellTr = currentCell.baseCell.parent;
                var isTopFromRowSpan = (!baseCellTr ? 0 : currentCell.baseCell.closest('tr').rowIndex) <= currentTr[0].rowIndex;
                if (isTopFromRowSpan) {
                  var newTd = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<td' + tdAttributes + '>' + _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].blank + '</td>').removeAttr('rowspan')).html();
                  html.append(newTd);
                  break;
                }
              }
              var rowspanNumber = parseInt(currentCell.baseCell.rowSpan, 10);
              rowspanNumber++;
              currentCell.baseCell.setAttribute('rowSpan', rowspanNumber);
            }
            break;
        }
      }
      if (position === 'top') {
        currentTr.before(html);
      } else {
        var cellHasRowspan = cell.rowSpan > 1;
        if (cellHasRowspan) {
          var lastTrIndex = currentTr[0].rowIndex + (cell.rowSpan - 2);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(jquery__WEBPACK_IMPORTED_MODULE_0___default()(currentTr).parent().find('tr')[lastTrIndex]).after(jquery__WEBPACK_IMPORTED_MODULE_0___default()(html));
          return;
        }
        currentTr.after(html);
      }
    }

    /**
     * Add a new col
     *
     * @param {WrappedRange} rng
     * @param {String} position (left/right)
     * @return {Node}
     */
  }, {
    key: "addCol",
    value: function addCol(rng, position) {
      var cell = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.commonAncestor(), _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      var row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell).closest('tr');
      var rowsGroup = jquery__WEBPACK_IMPORTED_MODULE_0___default()(row).siblings();
      rowsGroup.push(row);
      var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Add, jquery__WEBPACK_IMPORTED_MODULE_0___default()(row).closest('table')[0]);
      var actions = vTable.getActionList();
      for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
        var currentCell = actions[actionIndex];
        var tdAttributes = this.recoverAttributes(currentCell.baseCell);
        switch (currentCell.action) {
          case TableResultAction.resultAction.AddCell:
            if (position === 'right') {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(currentCell.baseCell).after('<td' + tdAttributes + '>' + _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].blank + '</td>');
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(currentCell.baseCell).before('<td' + tdAttributes + '>' + _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].blank + '</td>');
            }
            break;
          case TableResultAction.resultAction.SumSpanCount:
            if (position === 'right') {
              var colspanNumber = parseInt(currentCell.baseCell.colSpan, 10);
              colspanNumber++;
              currentCell.baseCell.setAttribute('colSpan', colspanNumber);
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(currentCell.baseCell).before('<td' + tdAttributes + '>' + _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].blank + '</td>');
            }
            break;
        }
      }
    }

    /*
    * Copy attributes from element.
    *
    * @param {object} Element to recover attributes.
    * @return {string} Copied string elements.
    */
  }, {
    key: "recoverAttributes",
    value: function recoverAttributes(el) {
      var resultStr = '';
      if (!el) {
        return resultStr;
      }
      var attrList = el.attributes || [];
      for (var i = 0; i < attrList.length; i++) {
        if (attrList[i].name.toLowerCase() === 'id') {
          continue;
        }
        if (attrList[i].specified) {
          resultStr += ' ' + attrList[i].name + '=\'' + attrList[i].value + '\'';
        }
      }
      return resultStr;
    }

    /**
     * Delete current row
     *
     * @param {WrappedRange} rng
     * @return {Node}
     */
  }, {
    key: "deleteRow",
    value: function deleteRow(rng) {
      var cell = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.commonAncestor(), _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      var row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell).closest('tr');
      var cellPos = row.children('td, th').index(jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell));
      var rowPos = row[0].rowIndex;
      var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Delete, jquery__WEBPACK_IMPORTED_MODULE_0___default()(row).closest('table')[0]);
      var actions = vTable.getActionList();
      for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
        if (!actions[actionIndex]) {
          continue;
        }
        var baseCell = actions[actionIndex].baseCell;
        var virtualPosition = actions[actionIndex].virtualTable;
        var hasRowspan = baseCell.rowSpan && baseCell.rowSpan > 1;
        var rowspanNumber = hasRowspan ? parseInt(baseCell.rowSpan, 10) : 0;
        switch (actions[actionIndex].action) {
          case TableResultAction.resultAction.Ignore:
            continue;
          case TableResultAction.resultAction.AddCell:
            {
              var nextRow = row.next('tr')[0];
              if (!nextRow) {
                continue;
              }
              var cloneRow = row[0].cells[cellPos];
              if (hasRowspan) {
                if (rowspanNumber > 2) {
                  rowspanNumber--;
                  nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                  nextRow.cells[cellPos].setAttribute('rowSpan', rowspanNumber);
                  nextRow.cells[cellPos].innerHTML = '';
                } else if (rowspanNumber === 2) {
                  nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                  nextRow.cells[cellPos].removeAttribute('rowSpan');
                  nextRow.cells[cellPos].innerHTML = '';
                }
              }
            }
            continue;
          case TableResultAction.resultAction.SubtractSpanCount:
            if (hasRowspan) {
              if (rowspanNumber > 2) {
                rowspanNumber--;
                baseCell.setAttribute('rowSpan', rowspanNumber);
                if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                  baseCell.innerHTML = '';
                }
              } else if (rowspanNumber === 2) {
                baseCell.removeAttribute('rowSpan');
                if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                  baseCell.innerHTML = '';
                }
              }
            }
            continue;
          case TableResultAction.resultAction.RemoveCell:
            // Do not need remove cell because row will be deleted.
            continue;
        }
      }
      row.remove();
    }

    /**
     * Delete current col
     *
     * @param {WrappedRange} rng
     * @return {Node}
     */
  }, {
    key: "deleteCol",
    value: function deleteCol(rng) {
      var cell = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.commonAncestor(), _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      var row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell).closest('tr');
      var cellPos = row.children('td, th').index(jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell));
      var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Delete, jquery__WEBPACK_IMPORTED_MODULE_0___default()(row).closest('table')[0]);
      var actions = vTable.getActionList();
      for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
        if (!actions[actionIndex]) {
          continue;
        }
        switch (actions[actionIndex].action) {
          case TableResultAction.resultAction.Ignore:
            continue;
          case TableResultAction.resultAction.SubtractSpanCount:
            {
              var baseCell = actions[actionIndex].baseCell;
              var hasColspan = baseCell.colSpan && baseCell.colSpan > 1;
              if (hasColspan) {
                var colspanNumber = baseCell.colSpan ? parseInt(baseCell.colSpan, 10) : 0;
                if (colspanNumber > 2) {
                  colspanNumber--;
                  baseCell.setAttribute('colSpan', colspanNumber);
                  if (baseCell.cellIndex === cellPos) {
                    baseCell.innerHTML = '';
                  }
                } else if (colspanNumber === 2) {
                  baseCell.removeAttribute('colSpan');
                  if (baseCell.cellIndex === cellPos) {
                    baseCell.innerHTML = '';
                  }
                }
              }
            }
            continue;
          case TableResultAction.resultAction.RemoveCell:
            _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].remove(actions[actionIndex].baseCell, true);
            continue;
        }
      }
    }

    /**
     * create empty table element
     *
     * @param {Number} rowCount
     * @param {Number} colCount
     * @return {Node}
     */
  }, {
    key: "createTable",
    value: function createTable(colCount, rowCount, options) {
      var tds = [];
      var tdHTML;
      for (var idxCol = 0; idxCol < colCount; idxCol++) {
        tds.push('<td>' + _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].blank + '</td>');
      }
      tdHTML = tds.join('');
      var trs = [];
      var trHTML;
      for (var idxRow = 0; idxRow < rowCount; idxRow++) {
        trs.push('<tr>' + tdHTML + '</tr>');
      }
      trHTML = trs.join('');
      var $table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<table>' + trHTML + '</table>');
      if (options && options.tableClassName) {
        $table.addClass(options.tableClassName);
      }
      return $table[0];
    }

    /**
     * Delete current table
     *
     * @param {WrappedRange} rng
     * @return {Node}
     */
  }, {
    key: "deleteTable",
    value: function deleteTable(rng) {
      var cell = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.commonAncestor(), _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCell);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell).closest('table').remove();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/editing/Typing.js":
/*!**********************************!*\
  !*** ./src/js/editing/Typing.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Typing)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/range */ "./src/js/core/range.js");
/* harmony import */ var _editing_Bullet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../editing/Bullet */ "./src/js/editing/Bullet.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * @class editing.Typing
 *
 * Typing
 *
 */
var Typing = /*#__PURE__*/function () {
  function Typing(context) {
    _classCallCheck(this, Typing);
    // a Bullet instance to toggle lists off
    this.bullet = new _editing_Bullet__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.options = context.options;
  }

  /**
   * insert tab
   *
   * @param {WrappedRange} rng
   * @param {Number} tabsize
   */
  return _createClass(Typing, [{
    key: "insertTab",
    value: function insertTab(rng, tabsize) {
      var tab = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].createText(new Array(tabsize + 1).join(_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].NBSP_CHAR));
      rng = rng.deleteContents();
      rng.insertNode(tab, true);
      rng = _core_range__WEBPACK_IMPORTED_MODULE_2__["default"].create(tab, tabsize);
      rng.select();
    }

    /**
     * insert paragraph
     *
     * @param {jQuery} $editable
     * @param {WrappedRange} rng Can be used in unit tests to "mock" the range
     *
     * blockquoteBreakingLevel
     *   0 - No break, the new paragraph remains inside the quote
     *   1 - Break the first blockquote in the ancestors list
     *   2 - Break all blockquotes, so that the new paragraph is not quoted (this is the default)
     */
  }, {
    key: "insertParagraph",
    value: function insertParagraph(editable, rng) {
      rng = rng || _core_range__WEBPACK_IMPORTED_MODULE_2__["default"].create(editable);

      // deleteContents on range.
      rng = rng.deleteContents();

      // Wrap range if it needs to be wrapped by paragraph
      rng = rng.wrapBodyInlineWithPara();

      // finding paragraph
      var splitRoot = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isPara);
      var nextPara;
      // on paragraph: split paragraph
      if (splitRoot) {
        // if it is an empty line with li
        if (_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isLi(splitRoot) && (_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(splitRoot) || _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].deepestChildIsEmpty(splitRoot))) {
          // toggle UL/OL and escape
          this.bullet.toggleList(splitRoot.parentNode.nodeName);
          return;
        } else {
          var blockquote = null;
          if (this.options.blockquoteBreakingLevel === 1) {
            blockquote = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].ancestor(splitRoot, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isBlockquote);
          } else if (this.options.blockquoteBreakingLevel === 2) {
            blockquote = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].lastAncestor(splitRoot, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isBlockquote);
          }
          if (blockquote) {
            // We're inside a blockquote and options ask us to break it
            nextPara = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].emptyPara)[0];
            // If the split is right before a <br>, remove it so that there's no "empty line"
            // after the split in the new blockquote created
            if (_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isRightEdgePoint(rng.getStartPoint()) && _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isBR(rng.sc.nextSibling)) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(rng.sc.nextSibling).remove();
            }
            var split = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].splitTree(blockquote, rng.getStartPoint(), {
              isDiscardEmptySplits: true
            });
            if (split) {
              split.parentNode.insertBefore(nextPara, split);
            } else {
              _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].insertAfter(nextPara, blockquote); // There's no split if we were at the end of the blockquote
            }
          } else {
            nextPara = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].splitTree(splitRoot, rng.getStartPoint());

            // not a blockquote, just insert the paragraph
            var emptyAnchors = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].listDescendant(splitRoot, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyAnchor);
            emptyAnchors = emptyAnchors.concat(_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].listDescendant(nextPara, _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyAnchor));
            jquery__WEBPACK_IMPORTED_MODULE_0___default().each(emptyAnchors, function (idx, anchor) {
              _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].remove(anchor);
            });

            // replace empty heading, pre or custom-made styleTag with P tag
            if ((_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isHeading(nextPara) || _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isPre(nextPara) || _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isCustomStyleTag(nextPara)) && _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(nextPara)) {
              nextPara = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].replace(nextPara, 'p');
            }
          }
        }
        // no paragraph: insert empty paragraph
      } else {
        var next = rng.sc.childNodes[rng.so];
        nextPara = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].emptyPara)[0];
        if (next) {
          rng.sc.insertBefore(nextPara, next);
        } else {
          rng.sc.appendChild(nextPara);
        }
      }
      _core_range__WEBPACK_IMPORTED_MODULE_2__["default"].create(nextPara, 0).normalize().select().scrollIntoView(editable);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/AirPopover.js":
/*!*************************************!*\
  !*** ./src/js/module/AirPopover.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AirPopover)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var AIRMODE_POPOVER_X_OFFSET = -5;
var AIRMODE_POPOVER_Y_OFFSET = 5;
var AirPopover = /*#__PURE__*/function () {
  function AirPopover(context) {
    var _this = this;
    _classCallCheck(this, AirPopover);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.options = context.options;
    this.hidable = true;
    this.onContextmenu = false;
    this.pageX = null;
    this.pageY = null;
    this.events = {
      'summernote.contextmenu': function summernoteContextmenu(event) {
        if (_this.options.editing) {
          event.preventDefault();
          event.stopPropagation();
          _this.onContextmenu = true;
          _this.update(true);
        }
      },
      'summernote.mousedown': function summernoteMousedown(we, event) {
        _this.pageX = event.pageX;
        _this.pageY = event.pageY;
      },
      'summernote.keyup summernote.mouseup summernote.scroll': function summernoteKeyupSummernoteMouseupSummernoteScroll(we, event) {
        if (_this.options.editing && !_this.onContextmenu) {
          if (event.type == 'keyup') {
            var range = _this.context.invoke('editor.getLastRange');
            var wordRange = range.getWordRange();
            var bnd = _core_func__WEBPACK_IMPORTED_MODULE_2__["default"].rect2bnd(_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].last(wordRange.getClientRects()));
            _this.pageX = bnd.left;
            _this.pageY = bnd.top;
          } else {
            _this.pageX = event.pageX;
            _this.pageY = event.pageY;
          }
          _this.update();
        }
        _this.onContextmenu = false;
      },
      'summernote.disable summernote.change summernote.dialog.shown summernote.blur': function summernoteDisableSummernoteChangeSummernoteDialogShownSummernoteBlur() {
        _this.hide();
      },
      'summernote.focusout': function summernoteFocusout() {
        if (!_this.$popover.is(':active,:focus')) {
          _this.hide();
        }
      }
    };
  }
  return _createClass(AirPopover, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return this.options.airMode && !_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(this.options.popover.air);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.$popover = this.ui.popover({
        className: 'note-air-popover'
      }).render().appendTo(this.options.container);
      var $content = this.$popover.find('.popover-content');
      this.context.invoke('buttons.build', $content, this.options.popover.air);

      // disable hiding this popover preemptively by 'summernote.blur' event.
      this.$popover.on('mousedown', function () {
        _this2.hidable = false;
      });
      // (re-)enable hiding after 'summernote.blur' has been handled (aka. ignored).
      this.$popover.on('mouseup', function () {
        _this2.hidable = true;
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$popover.remove();
    }
  }, {
    key: "update",
    value: function update(forcelyOpen) {
      var styleInfo = this.context.invoke('editor.currentStyle');
      if (styleInfo.range && (!styleInfo.range.isCollapsed() || forcelyOpen)) {
        var rect = {
          left: this.pageX,
          top: this.pageY
        };
        var containerOffset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.container).offset();
        rect.top -= containerOffset.top;
        rect.left -= containerOffset.left;
        this.$popover.css({
          display: 'block',
          left: Math.max(rect.left, 0) + AIRMODE_POPOVER_X_OFFSET,
          top: rect.top + AIRMODE_POPOVER_Y_OFFSET
        });
        this.context.invoke('buttons.updateCurrentStyle', this.$popover);
      } else {
        this.hide();
      }
    }
  }, {
    key: "updateCodeview",
    value: function updateCodeview(isCodeview) {
      this.ui.toggleBtnActive(this.$popover.find('.btn-codeview'), isCodeview);
      if (isCodeview) {
        this.hide();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.hidable) {
        this.$popover.hide();
      }
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/AutoLink.js":
/*!***********************************!*\
  !*** ./src/js/module/AutoLink.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoLink)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var defaultScheme = 'http://';
var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|tel:|mailto:[A-Z0-9._%+-]+@|xmpp:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
var AutoLink = /*#__PURE__*/function () {
  function AutoLink(context) {
    var _this = this;
    _classCallCheck(this, AutoLink);
    this.context = context;
    this.options = context.options;
    this.$editable = context.layoutInfo.editable;
    this.events = {
      'summernote.keyup': function summernoteKeyup(we, event) {
        if (!event.isDefaultPrevented()) {
          _this.handleKeyup(event);
        }
      },
      'summernote.keydown': function summernoteKeydown(we, event) {
        _this.handleKeydown(event);
      }
    };
  }
  return _createClass(AutoLink, [{
    key: "initialize",
    value: function initialize() {
      this.lastWordRange = null;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.lastWordRange = null;
    }
  }, {
    key: "replace",
    value: function replace() {
      if (!this.lastWordRange) {
        return;
      }
      var keyword = this.lastWordRange.toString();
      var match = keyword.match(linkPattern);
      if (match && (match[1] || match[2])) {
        var link = match[1] ? keyword : defaultScheme + keyword;
        var urlText = this.options.showDomainOnlyForAutolink ? keyword.replace(/^(?:https?:\/\/)?(?:tel?:?)?(?:mailto?:?)?(?:xmpp?:?)?(?:www\.)?/i, '').split('/')[0] : keyword;
        var node = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a></a>').html(urlText).attr('href', link)[0];
        if (this.context.options.linkTargetBlank) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).attr('target', '_blank');
        }
        this.lastWordRange.insertNode(node);
        this.lastWordRange = null;
        this.context.invoke('editor.focus');
        this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      }
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(event) {
      if (_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].contains([_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.SPACE], event.keyCode)) {
        var wordRange = this.context.invoke('editor.createRange').getWordRange();
        this.lastWordRange = wordRange;
      }
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(event) {
      if (_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.SPACE === event.keyCode || _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER === event.keyCode && !event.shiftKey) {
        this.replace();
      }
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/AutoReplace.js":
/*!**************************************!*\
  !*** ./src/js/module/AutoReplace.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoReplace)
/* harmony export */ });
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var AutoReplace = /*#__PURE__*/function () {
  function AutoReplace(context) {
    var _this = this;
    _classCallCheck(this, AutoReplace);
    this.context = context;
    this.options = context.options.replace || {};
    this.keys = [_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.SPACE, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.PERIOD, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.COMMA, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.SEMICOLON, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.SLASH];
    this.previousKeydownCode = null;
    this.events = {
      'summernote.keyup': function summernoteKeyup(we, event) {
        if (!event.isDefaultPrevented()) {
          _this.handleKeyup(event);
        }
      },
      'summernote.keydown': function summernoteKeydown(we, event) {
        _this.handleKeydown(event);
      }
    };
  }
  return _createClass(AutoReplace, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return !!this.options.match;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.lastWord = null;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.lastWord = null;
    }
  }, {
    key: "replace",
    value: function replace() {
      if (!this.lastWord) {
        return;
      }
      var self = this;
      var keyword = this.lastWord.toString();
      this.options.match(keyword, function (match) {
        if (match) {
          var node = '';
          if (typeof match === 'string') {
            node = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].createText(match);
          } else if (match instanceof jQuery) {
            node = match[0];
          } else if (match instanceof Node) {
            node = match;
          }
          if (!node) return;
          self.lastWord.insertNode(node);
          self.lastWord = null;
          self.context.invoke('editor.focus');
        }
      });
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(event) {
      // this forces it to remember the last whole word, even if multiple termination keys are pressed
      // before the previous key is let go.
      if (this.previousKeydownCode && _core_lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains(this.keys, this.previousKeydownCode)) {
        this.previousKeydownCode = event.keyCode;
        return;
      }
      if (_core_lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains(this.keys, event.keyCode)) {
        var wordRange = this.context.invoke('editor.createRange').getWordRange();
        this.lastWord = wordRange;
      }
      this.previousKeydownCode = event.keyCode;
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(event) {
      if (_core_lists__WEBPACK_IMPORTED_MODULE_0__["default"].contains(this.keys, event.keyCode)) {
        this.replace();
      }
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/AutoSync.js":
/*!***********************************!*\
  !*** ./src/js/module/AutoSync.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoSync)
/* harmony export */ });
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * textarea auto sync.
 */
var AutoSync = /*#__PURE__*/function () {
  function AutoSync(context) {
    var _this = this;
    _classCallCheck(this, AutoSync);
    this.$note = context.layoutInfo.note;
    this.events = {
      'summernote.change': function summernoteChange() {
        _this.$note.val(context.invoke('code'));
      }
    };
  }
  return _createClass(AutoSync, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return _core_dom__WEBPACK_IMPORTED_MODULE_0__["default"].isTextarea(this.$note[0]);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Buttons.js":
/*!**********************************!*\
  !*** ./src/js/module/Buttons.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Buttons)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var Buttons = /*#__PURE__*/function () {
  function Buttons(context) {
    _classCallCheck(this, Buttons);
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.context = context;
    this.$toolbar = context.layoutInfo.toolbar;
    this.options = context.options;
    this.lang = this.options.langInfo;
    this.invertedKeyMap = _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invertObject(this.options.keyMap[_core_env__WEBPACK_IMPORTED_MODULE_3__["default"].isMac ? 'mac' : 'pc']);
  }
  return _createClass(Buttons, [{
    key: "representShortcut",
    value: function representShortcut(editorMethod) {
      var shortcut = this.invertedKeyMap[editorMethod];
      if (!this.options.shortcuts || !shortcut) {
        return '';
      }
      if (_core_env__WEBPACK_IMPORTED_MODULE_3__["default"].isMac) {
        shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
      }
      shortcut = shortcut.replace('BACKSLASH', '\\').replace('SLASH', '/').replace('LEFTBRACKET', '[').replace('RIGHTBRACKET', ']');
      return ' (' + shortcut + ')';
    }
  }, {
    key: "button",
    value: function button(o) {
      if (!this.options.tooltip && o.tooltip) {
        delete o.tooltip;
      }
      o.container = this.options.container;
      return this.ui.button(o);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.addToolbarButtons();
      this.addImagePopoverButtons();
      this.addLinkPopoverButtons();
      this.addTablePopoverButtons();
      this.fontInstalledMap = {};
    }
  }, {
    key: "destroy",
    value: function destroy() {
      delete this.fontInstalledMap;
    }
  }, {
    key: "isFontInstalled",
    value: function isFontInstalled(name) {
      if (!Object.prototype.hasOwnProperty.call(this.fontInstalledMap, name)) {
        this.fontInstalledMap[name] = _core_env__WEBPACK_IMPORTED_MODULE_3__["default"].isFontInstalled(name) || _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].contains(this.options.fontNamesIgnoreCheck, name);
      }
      return this.fontInstalledMap[name];
    }
  }, {
    key: "isFontDeservedToAdd",
    value: function isFontDeservedToAdd(name) {
      name = name.toLowerCase();
      return name !== '' && this.isFontInstalled(name) && _core_env__WEBPACK_IMPORTED_MODULE_3__["default"].genericFontFamilies.indexOf(name) === -1;
    }
  }, {
    key: "colorPalette",
    value: function colorPalette(className, tooltip, backColor, foreColor) {
      var _this = this;
      return this.ui.buttonGroup({
        className: 'note-color ' + className,
        children: [this.button({
          className: 'note-current-color-button',
          contents: this.ui.icon(this.options.icons.font + ' note-recent-color'),
          tooltip: tooltip,
          click: function click(event) {
            var $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
            if (backColor && foreColor) {
              _this.context.invoke('editor.color', {
                backColor: $button.attr('data-backColor'),
                foreColor: $button.attr('data-foreColor')
              });
            } else if (backColor) {
              _this.context.invoke('editor.color', {
                backColor: $button.attr('data-backColor')
              });
            } else if (foreColor) {
              _this.context.invoke('editor.color', {
                foreColor: $button.attr('data-foreColor')
              });
            }
          },
          callback: function callback($button) {
            var $recentColor = $button.find('.note-recent-color');
            if (backColor) {
              $recentColor.css('background-color', _this.options.colorButton.backColor);
              $button.attr('data-backColor', _this.options.colorButton.backColor);
            }
            if (foreColor) {
              $recentColor.css('color', _this.options.colorButton.foreColor);
              $button.attr('data-foreColor', _this.options.colorButton.foreColor);
            } else {
              $recentColor.css('color', 'transparent');
            }
          }
        }), this.button({
          className: 'dropdown-toggle',
          contents: this.ui.dropdownButtonContents('', this.options),
          tooltip: this.lang.color.more,
          data: {
            toggle: 'dropdown'
          }
        }), this.ui.dropdown({
          items: (backColor ? ['<div class="note-palette">', '<div class="note-palette-title">' + this.lang.color.background + '</div>', '<div>', '<button type="button" class="note-color-reset btn btn-light btn-default" data-event="backColor" data-value="transparent">', this.lang.color.transparent, '</button>', '</div>', '<div class="note-holder" data-event="backColor"><!-- back colors --></div>', '<div>', '<button type="button" class="note-color-select btn btn-light btn-default" data-event="openPalette" data-value="backColorPicker-' + this.options.id + '">', this.lang.color.cpSelect, '</button>', '<input type="color" id="backColorPicker-' + this.options.id + '" class="note-btn note-color-select-btn" value="' + this.options.colorButton.backColor + '" data-event="backColorPalette-' + this.options.id + '">', '</div>', '<div class="note-holder-custom" id="backColorPalette-' + this.options.id + '" data-event="backColor"></div>', '</div>'].join('') : '') + (foreColor ? ['<div class="note-palette">', '<div class="note-palette-title">' + this.lang.color.foreground + '</div>', '<div>', '<button type="button" class="note-color-reset btn btn-light btn-default" data-event="removeFormat" data-value="foreColor">', this.lang.color.resetToDefault, '</button>', '</div>', '<div class="note-holder" data-event="foreColor"><!-- fore colors --></div>', '<div>', '<button type="button" class="note-color-select btn btn-light btn-default" data-event="openPalette" data-value="foreColorPicker-' + this.options.id + '">', this.lang.color.cpSelect, '</button>', '<input type="color" id="foreColorPicker-' + this.options.id + '" class="note-btn note-color-select-btn" value="' + this.options.colorButton.foreColor + '" data-event="foreColorPalette-' + this.options.id + '">', '</div>',
          // Fix missing Div, Commented to find easily if it's wrong
          '<div class="note-holder-custom" id="foreColorPalette-' + this.options.id + '" data-event="foreColor"></div>', '</div>'].join('') : ''),
          callback: function callback($dropdown) {
            $dropdown.find('.note-holder').each(function (idx, item) {
              var $holder = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
              $holder.append(_this.ui.palette({
                colors: _this.options.colors,
                colorsName: _this.options.colorsName,
                eventName: $holder.data('event'),
                container: _this.options.container,
                tooltip: _this.options.tooltip
              }).render());
            });
            /* TODO: do we have to record recent custom colors within cookies? */
            var customColors = [['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']];
            $dropdown.find('.note-holder-custom').each(function (idx, item) {
              var _this$options$customC, _ref, _this$options$customC2;
              var $holder = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
              $holder.append(_this.ui.palette({
                colors: (_this$options$customC = _this.options.customColors) !== null && _this$options$customC !== void 0 ? _this$options$customC : customColors,
                colorsName: (_ref = (_this$options$customC2 = _this.options.customColorsName) !== null && _this$options$customC2 !== void 0 ? _this$options$customC2 : _this.options.customColors) !== null && _ref !== void 0 ? _ref : customColors,
                eventName: $holder.data('event'),
                container: _this.options.container,
                tooltip: _this.options.tooltip
              }).render());
            });
            $dropdown.find('input[type=color]').each(function (idx, item) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).on("change", function () {
                var $chip = $dropdown.find('#' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('event')).find('.note-color-btn').first();
                var color = this.value.toUpperCase();
                $chip.css('background-color', color).attr('aria-label', color).attr('data-value', color).attr('data-original-title', color);
                $chip.trigger('click');
              });
            });
          },
          click: function click(event) {
            event.stopPropagation();
            var $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.' + className).find('.note-dropdown-menu');
            var $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
            var eventName = $button.data('event');
            var value = $button.attr('data-value');
            if (eventName === 'openPalette') {
              var $picker = $parent.find('#' + value);
              var $palette = jquery__WEBPACK_IMPORTED_MODULE_0___default()($parent.find('#' + $picker.data('event')).find('.note-color-row')[0]);

              // Shift palette chips
              var $chip = $palette.find('.note-color-btn').last().detach();

              // Set chip attributes
              var color = $picker.val();
              $chip.css('background-color', color).attr('aria-label', color).attr('data-value', color).attr('data-original-title', color);
              $palette.prepend($chip);
              $picker.trigger('click');
            } else {
              if (_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].contains(['backColor', 'foreColor'], eventName)) {
                var key = eventName === 'backColor' ? 'background-color' : 'color';
                var $color = $button.closest('.note-color').find('.note-recent-color');
                var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                $color.css(key, value);
                $currentButton.attr('data-' + eventName, value);
              }
              _this.context.invoke('editor.' + eventName, value);
            }
          }
        })]
      }).render();
    }
  }, {
    key: "addToolbarButtons",
    value: function addToolbarButtons() {
      var _this2 = this;
      this.context.memo('button.style', function () {
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.magic), _this2.options),
          tooltip: _this2.lang.style.style,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdown({
          className: 'dropdown-style',
          items: _this2.options.styleTags,
          title: _this2.lang.style.style,
          template: function template(item) {
            // TBD: need to be simplified
            if (typeof item === 'string') {
              item = {
                tag: item,
                title: Object.prototype.hasOwnProperty.call(_this2.lang.style, item) ? _this2.lang.style[item] : item
              };
            }
            var tag = item.tag;
            var title = item.title;
            var style = item.style ? ' style="' + item.style + '" ' : '';
            var className = item.className ? ' class="' + item.className + '"' : '';
            return '<' + tag + style + className + '>' + title + '</' + tag + '>';
          },
          click: _this2.context.createInvokeHandler('editor.formatBlock')
        })]).render();
      });
      var _loop = function _loop() {
        var item = _this2.options.styleTags[styleIdx];
        _this2.context.memo('button.style.' + item, function () {
          return _this2.button({
            className: 'note-btn-style-' + item,
            contents: '<div data-value="' + item + '">' + item.toUpperCase() + '</div>',
            tooltip: _this2.lang.style[item],
            click: _this2.context.createInvokeHandler('editor.formatBlock')
          }).render();
        });
      };
      for (var styleIdx = 0, styleLen = this.options.styleTags.length; styleIdx < styleLen; styleIdx++) {
        _loop();
      }
      this.context.memo('button.bold', function () {
        return _this2.button({
          className: 'note-btn-bold',
          contents: _this2.ui.icon(_this2.options.icons.bold),
          tooltip: _this2.lang.font.bold + _this2.representShortcut('bold'),
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.bold')
        }).render();
      });
      this.context.memo('button.italic', function () {
        return _this2.button({
          className: 'note-btn-italic',
          contents: _this2.ui.icon(_this2.options.icons.italic),
          tooltip: _this2.lang.font.italic + _this2.representShortcut('italic'),
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.italic')
        }).render();
      });
      this.context.memo('button.underline', function () {
        return _this2.button({
          className: 'note-btn-underline',
          contents: _this2.ui.icon(_this2.options.icons.underline),
          tooltip: _this2.lang.font.underline + _this2.representShortcut('underline'),
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.underline')
        }).render();
      });
      this.context.memo('button.clear', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.eraser),
          tooltip: _this2.lang.font.clear + _this2.representShortcut('removeFormat'),
          click: _this2.context.createInvokeHandler('editor.removeFormat')
        }).render();
      });
      this.context.memo('button.strikethrough', function () {
        return _this2.button({
          className: 'note-btn-strikethrough',
          contents: _this2.ui.icon(_this2.options.icons.strikethrough),
          tooltip: _this2.lang.font.strikethrough + _this2.representShortcut('strikethrough'),
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.strikethrough')
        }).render();
      });
      this.context.memo('button.superscript', function () {
        return _this2.button({
          className: 'note-btn-superscript',
          contents: _this2.ui.icon(_this2.options.icons.superscript),
          tooltip: _this2.lang.font.superscript,
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.superscript')
        }).render();
      });
      this.context.memo('button.subscript', function () {
        return _this2.button({
          className: 'note-btn-subscript',
          contents: _this2.ui.icon(_this2.options.icons.subscript),
          tooltip: _this2.lang.font.subscript,
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.subscript')
        }).render();
      });
      this.context.memo('button.fontname', function () {
        var styleInfo = _this2.context.invoke('editor.currentStyle');
        if (_this2.options.addDefaultFonts) {
          // Add 'default' fonts into the fontnames array if not exist
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(styleInfo['font-family'].split(','), function (idx, fontname) {
            fontname = fontname.trim().replace(/['"]+/g, '');
            if (_this2.isFontDeservedToAdd(fontname)) {
              if (_this2.options.fontNames.indexOf(fontname) === -1) {
                _this2.options.fontNames.push(fontname);
              }
            }
          });
        }
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents('<span class="note-current-fontname"></span>', _this2.options),
          tooltip: _this2.lang.font.name,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdownCheck({
          className: 'dropdown-fontname',
          checkClassName: _this2.options.icons.menuCheck,
          items: _this2.options.fontNames.filter(_this2.isFontInstalled.bind(_this2)),
          title: _this2.lang.font.name,
          template: function template(item) {
            return '<span style="font-family: ' + _core_env__WEBPACK_IMPORTED_MODULE_3__["default"].validFontName(item) + '">' + item + '</span>';
          },
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.fontName')
        })]).render();
      });
      this.context.memo('button.fontsize', function () {
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents('<span class="note-current-fontsize"></span>', _this2.options),
          tooltip: _this2.lang.font.size,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdownCheck({
          className: 'dropdown-fontsize',
          checkClassName: _this2.options.icons.menuCheck,
          items: _this2.options.fontSizes,
          title: _this2.lang.font.size,
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.fontSize')
        })]).render();
      });
      this.context.memo('button.fontsizeunit', function () {
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents('<span class="note-current-fontsizeunit"></span>', _this2.options),
          tooltip: _this2.lang.font.sizeunit,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdownCheck({
          className: 'dropdown-fontsizeunit',
          checkClassName: _this2.options.icons.menuCheck,
          items: _this2.options.fontSizeUnits,
          title: _this2.lang.font.sizeunit,
          click: _this2.context.createInvokeHandlerAndUpdateState('editor.fontSizeUnit')
        })]).render();
      });
      this.context.memo('button.color', function () {
        return _this2.colorPalette('note-color-all', _this2.lang.color.recent, true, true);
      });
      this.context.memo('button.forecolor', function () {
        return _this2.colorPalette('note-color-fore', _this2.lang.color.foreground, false, true);
      });
      this.context.memo('button.backcolor', function () {
        return _this2.colorPalette('note-color-back', _this2.lang.color.background, true, false);
      });
      this.context.memo('button.ul', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.unorderedlist),
          tooltip: _this2.lang.lists.unordered + _this2.representShortcut('insertUnorderedList'),
          click: _this2.context.createInvokeHandler('editor.insertUnorderedList')
        }).render();
      });
      this.context.memo('button.ol', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.orderedlist),
          tooltip: _this2.lang.lists.ordered + _this2.representShortcut('insertOrderedList'),
          click: _this2.context.createInvokeHandler('editor.insertOrderedList')
        }).render();
      });
      var justifyLeft = this.button({
        contents: this.ui.icon(this.options.icons.alignLeft),
        tooltip: this.lang.paragraph.left + this.representShortcut('justifyLeft'),
        click: this.context.createInvokeHandler('editor.justifyLeft')
      });
      var justifyCenter = this.button({
        contents: this.ui.icon(this.options.icons.alignCenter),
        tooltip: this.lang.paragraph.center + this.representShortcut('justifyCenter'),
        click: this.context.createInvokeHandler('editor.justifyCenter')
      });
      var justifyRight = this.button({
        contents: this.ui.icon(this.options.icons.alignRight),
        tooltip: this.lang.paragraph.right + this.representShortcut('justifyRight'),
        click: this.context.createInvokeHandler('editor.justifyRight')
      });
      var justifyFull = this.button({
        contents: this.ui.icon(this.options.icons.alignJustify),
        tooltip: this.lang.paragraph.justify + this.representShortcut('justifyFull'),
        click: this.context.createInvokeHandler('editor.justifyFull')
      });
      var outdent = this.button({
        contents: this.ui.icon(this.options.icons.outdent),
        tooltip: this.lang.paragraph.outdent + this.representShortcut('outdent'),
        click: this.context.createInvokeHandler('editor.outdent')
      });
      var indent = this.button({
        contents: this.ui.icon(this.options.icons.indent),
        tooltip: this.lang.paragraph.indent + this.representShortcut('indent'),
        click: this.context.createInvokeHandler('editor.indent')
      });
      this.context.memo('button.justifyLeft', _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invoke(justifyLeft, 'render'));
      this.context.memo('button.justifyCenter', _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invoke(justifyCenter, 'render'));
      this.context.memo('button.justifyRight', _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invoke(justifyRight, 'render'));
      this.context.memo('button.justifyFull', _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invoke(justifyFull, 'render'));
      this.context.memo('button.outdent', _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invoke(outdent, 'render'));
      this.context.memo('button.indent', _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].invoke(indent, 'render'));
      this.context.memo('button.paragraph', function () {
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.alignLeft), _this2.options),
          tooltip: _this2.lang.paragraph.paragraph,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdown([_this2.ui.buttonGroup({
          className: 'note-align',
          children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
        }), _this2.ui.buttonGroup({
          className: 'note-list',
          children: [outdent, indent]
        })])]).render();
      });
      this.context.memo('button.height', function () {
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.textHeight), _this2.options),
          tooltip: _this2.lang.font.height,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdownCheck({
          items: _this2.options.lineHeights,
          checkClassName: _this2.options.icons.menuCheck,
          className: 'dropdown-line-height',
          title: _this2.lang.font.height,
          click: _this2.context.createInvokeHandler('editor.lineHeight')
        })]).render();
      });
      this.context.memo('button.table', function () {
        return _this2.ui.buttonGroup([_this2.button({
          className: 'dropdown-toggle',
          contents: _this2.ui.dropdownButtonContents(_this2.ui.icon(_this2.options.icons.table), _this2.options),
          tooltip: _this2.lang.table.table,
          data: {
            toggle: 'dropdown'
          }
        }), _this2.ui.dropdown({
          title: _this2.lang.table.table,
          className: 'note-table',
          items: ['<div class="note-dimension-picker">', '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>', '<div class="note-dimension-picker-highlighted"></div>', '<div class="note-dimension-picker-unhighlighted"></div>', '</div>', '<div class="note-dimension-display">1 x 1</div>'].join('')
        })], {
          callback: function callback($node) {
            var $catcher = $node.find('.note-dimension-picker-mousecatcher');
            $catcher.css({
              width: _this2.options.insertTableMaxSize.col + 'em',
              height: _this2.options.insertTableMaxSize.row + 'em'
            }).on('mousedown', _this2.context.createInvokeHandler('editor.insertTable')).on('mousemove', _this2.tableMoveHandler.bind(_this2));
          }
        }).render();
      });
      this.context.memo('button.link', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.link),
          tooltip: _this2.lang.link.link + _this2.representShortcut('linkDialog.show'),
          click: _this2.context.createInvokeHandler('linkDialog.show')
        }).render();
      });
      this.context.memo('button.picture', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.picture),
          tooltip: _this2.lang.image.image,
          click: _this2.context.createInvokeHandler('imageDialog.show')
        }).render();
      });
      this.context.memo('button.video', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.video),
          tooltip: _this2.lang.video.video,
          click: _this2.context.createInvokeHandler('videoDialog.show')
        }).render();
      });
      this.context.memo('button.hr', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.minus),
          tooltip: _this2.lang.hr.insert + _this2.representShortcut('insertHorizontalRule'),
          click: _this2.context.createInvokeHandler('editor.insertHorizontalRule')
        }).render();
      });
      this.context.memo('button.fullscreen', function () {
        return _this2.button({
          className: 'btn-fullscreen note-codeview-keep',
          contents: _this2.ui.icon(_this2.options.icons.arrowsAlt),
          tooltip: _this2.lang.options.fullscreen,
          click: _this2.context.createInvokeHandler('fullscreen.toggle')
        }).render();
      });
      this.context.memo('button.codeview', function () {
        return _this2.button({
          className: 'btn-codeview note-codeview-keep',
          contents: _this2.ui.icon(_this2.options.icons.code),
          tooltip: _this2.lang.options.codeview,
          click: _this2.context.createInvokeHandler('codeview.toggle')
        }).render();
      });
      this.context.memo('button.redo', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.redo),
          tooltip: _this2.lang.history.redo + _this2.representShortcut('redo'),
          click: _this2.context.createInvokeHandler('editor.redo')
        }).render();
      });
      this.context.memo('button.undo', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.undo),
          tooltip: _this2.lang.history.undo + _this2.representShortcut('undo'),
          click: _this2.context.createInvokeHandler('editor.undo')
        }).render();
      });
      this.context.memo('button.help', function () {
        return _this2.button({
          contents: _this2.ui.icon(_this2.options.icons.question),
          tooltip: _this2.lang.options.help,
          click: _this2.context.createInvokeHandler('helpDialog.show')
        }).render();
      });
    }

    /**
     * image: [
     *   ['imageResize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
     *   ['float', ['floatLeft', 'floatRight', 'floatNone']],
     *   ['remove', ['removeMedia']],
     * ],
     */
  }, {
    key: "addImagePopoverButtons",
    value: function addImagePopoverButtons() {
      var _this3 = this;
      // Image Size Buttons
      this.context.memo('button.resizeFull', function () {
        return _this3.button({
          contents: '<span class="note-fontsize-10">100%</span>',
          tooltip: _this3.lang.image.resizeFull,
          click: _this3.context.createInvokeHandler('editor.resize', '1')
        }).render();
      });
      this.context.memo('button.resizeHalf', function () {
        return _this3.button({
          contents: '<span class="note-fontsize-10">50%</span>',
          tooltip: _this3.lang.image.resizeHalf,
          click: _this3.context.createInvokeHandler('editor.resize', '0.5')
        }).render();
      });
      this.context.memo('button.resizeQuarter', function () {
        return _this3.button({
          contents: '<span class="note-fontsize-10">25%</span>',
          tooltip: _this3.lang.image.resizeQuarter,
          click: _this3.context.createInvokeHandler('editor.resize', '0.25')
        }).render();
      });
      this.context.memo('button.resizeNone', function () {
        return _this3.button({
          contents: _this3.ui.icon(_this3.options.icons.rollback),
          tooltip: _this3.lang.image.resizeNone,
          click: _this3.context.createInvokeHandler('editor.resize', '0')
        }).render();
      });

      // Float Buttons
      this.context.memo('button.floatLeft', function () {
        return _this3.button({
          contents: _this3.ui.icon(_this3.options.icons.floatLeft),
          tooltip: _this3.lang.image.floatLeft,
          click: _this3.context.createInvokeHandler('editor.floatMe', 'left')
        }).render();
      });
      this.context.memo('button.floatRight', function () {
        return _this3.button({
          contents: _this3.ui.icon(_this3.options.icons.floatRight),
          tooltip: _this3.lang.image.floatRight,
          click: _this3.context.createInvokeHandler('editor.floatMe', 'right')
        }).render();
      });
      this.context.memo('button.floatNone', function () {
        return _this3.button({
          contents: _this3.ui.icon(_this3.options.icons.rollback),
          tooltip: _this3.lang.image.floatNone,
          click: _this3.context.createInvokeHandler('editor.floatMe', 'none')
        }).render();
      });

      // Remove Buttons
      this.context.memo('button.removeMedia', function () {
        return _this3.button({
          contents: _this3.ui.icon(_this3.options.icons.trash),
          tooltip: _this3.lang.image.remove,
          click: _this3.context.createInvokeHandler('editor.removeMedia')
        }).render();
      });
    }
  }, {
    key: "addLinkPopoverButtons",
    value: function addLinkPopoverButtons() {
      var _this4 = this;
      this.context.memo('button.linkDialogShow', function () {
        return _this4.button({
          contents: _this4.ui.icon(_this4.options.icons.link),
          tooltip: _this4.lang.link.edit,
          click: _this4.context.createInvokeHandler('linkDialog.show')
        }).render();
      });
      this.context.memo('button.unlink', function () {
        return _this4.button({
          contents: _this4.ui.icon(_this4.options.icons.unlink),
          tooltip: _this4.lang.link.unlink,
          click: _this4.context.createInvokeHandler('editor.unlink')
        }).render();
      });
    }

    /**
     * table : [
     *  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
     *  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
     * ],
     */
  }, {
    key: "addTablePopoverButtons",
    value: function addTablePopoverButtons() {
      var _this5 = this;
      this.context.memo('button.addRowUp', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.rowAbove),
          tooltip: _this5.lang.table.addRowAbove,
          click: _this5.context.createInvokeHandler('editor.addRow', 'top')
        }).render();
      });
      this.context.memo('button.addRowDown', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.rowBelow),
          tooltip: _this5.lang.table.addRowBelow,
          click: _this5.context.createInvokeHandler('editor.addRow', 'bottom')
        }).render();
      });
      this.context.memo('button.addColLeft', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.colBefore),
          tooltip: _this5.lang.table.addColLeft,
          click: _this5.context.createInvokeHandler('editor.addCol', 'left')
        }).render();
      });
      this.context.memo('button.addColRight', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.colAfter),
          tooltip: _this5.lang.table.addColRight,
          click: _this5.context.createInvokeHandler('editor.addCol', 'right')
        }).render();
      });
      this.context.memo('button.deleteRow', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.rowRemove),
          tooltip: _this5.lang.table.delRow,
          click: _this5.context.createInvokeHandler('editor.deleteRow')
        }).render();
      });
      this.context.memo('button.deleteCol', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.colRemove),
          tooltip: _this5.lang.table.delCol,
          click: _this5.context.createInvokeHandler('editor.deleteCol')
        }).render();
      });
      this.context.memo('button.deleteTable', function () {
        return _this5.button({
          className: 'btn-md',
          contents: _this5.ui.icon(_this5.options.icons.trash),
          tooltip: _this5.lang.table.delTable,
          click: _this5.context.createInvokeHandler('editor.deleteTable')
        }).render();
      });
    }
  }, {
    key: "build",
    value: function build($container, groups) {
      for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
        var group = groups[groupIdx];
        var groupName = Array.isArray(group) ? group[0] : group;
        var buttons = Array.isArray(group) ? group.length === 1 ? [group[0]] : group[1] : [group];
        var $group = this.ui.buttonGroup({
          className: 'note-' + groupName
        }).render();
        for (var idx = 0, len = buttons.length; idx < len; idx++) {
          var btn = this.context.memo('button.' + buttons[idx]);
          if (btn) {
            $group.append(typeof btn === 'function' ? btn(this.context) : btn);
          }
        }
        $group.appendTo($container);
      }
    }

    /**
     * @param {jQuery} [$container]
     */
  }, {
    key: "updateCurrentStyle",
    value: function updateCurrentStyle($container) {
      var $cont = $container || this.$toolbar;
      var styleInfo = this.context.invoke('editor.currentStyle');
      this.updateBtnStates($cont, {
        '.note-btn-bold': function noteBtnBold() {
          return styleInfo['font-bold'] === 'bold';
        },
        '.note-btn-italic': function noteBtnItalic() {
          return styleInfo['font-italic'] === 'italic';
        },
        '.note-btn-underline': function noteBtnUnderline() {
          return styleInfo['font-underline'] === 'underline';
        },
        '.note-btn-subscript': function noteBtnSubscript() {
          return styleInfo['font-subscript'] === 'subscript';
        },
        '.note-btn-superscript': function noteBtnSuperscript() {
          return styleInfo['font-superscript'] === 'superscript';
        },
        '.note-btn-strikethrough': function noteBtnStrikethrough() {
          return styleInfo['font-strikethrough'] === 'strikethrough';
        }
      });
      if (styleInfo['font-family']) {
        var fontNames = styleInfo['font-family'].split(',').map(function (name) {
          return name.replace(/[\'\"]/g, '').replace(/\s+$/, '').replace(/^\s+/, '');
        });
        var fontName = _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].find(fontNames, this.isFontInstalled.bind(this));
        $cont.find('.dropdown-fontname a').each(function (idx, item) {
          var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
          // always compare string to avoid creating another func.
          var isChecked = $item.data('value') + '' === fontName + '';
          $item.toggleClass('checked', isChecked);
        });
        $cont.find('.note-current-fontname').text(fontName).css('font-family', fontName);
      }
      if (styleInfo['font-size']) {
        var fontSize = styleInfo['font-size'];
        $cont.find('.dropdown-fontsize a').each(function (idx, item) {
          var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
          // always compare with string to avoid creating another func.
          var isChecked = $item.data('value') + '' === fontSize + '';
          $item.toggleClass('checked', isChecked);
        });
        $cont.find('.note-current-fontsize').text(fontSize);
        var fontSizeUnit = styleInfo['font-size-unit'];
        $cont.find('.dropdown-fontsizeunit a').each(function (idx, item) {
          var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
          var isChecked = $item.data('value') + '' === fontSizeUnit + '';
          $item.toggleClass('checked', isChecked);
        });
        $cont.find('.note-current-fontsizeunit').text(fontSizeUnit);
      }
      if (styleInfo['line-height']) {
        var lineHeight = styleInfo['line-height'];
        $cont.find('.dropdown-line-height a').each(function (idx, item) {
          var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
          // always compare with string to avoid creating another func.
          var isChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).data('value') + '' === lineHeight + '';
          $item.toggleClass('checked', isChecked);
        });
        $cont.find('.note-current-line-height').text(lineHeight);
      }
    }
  }, {
    key: "updateBtnStates",
    value: function updateBtnStates($container, infos) {
      var _this6 = this;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(infos, function (selector, pred) {
        _this6.ui.toggleBtnActive($container.find(selector), pred());
      });
    }
  }, {
    key: "tableMoveHandler",
    value: function tableMoveHandler(event) {
      var PX_PER_EM = 18;
      var $picker = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target.parentNode); // target is mousecatcher
      var $dimensionDisplay = $picker.next();
      var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
      var $highlighted = $picker.find('.note-dimension-picker-highlighted');
      var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
      var posOffset;
      // HTML5 with jQuery - e.offsetX is undefined in Firefox
      if (event.offsetX === undefined) {
        var posCatcher = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).offset();
        posOffset = {
          x: event.pageX - posCatcher.left,
          y: event.pageY - posCatcher.top
        };
      } else {
        posOffset = {
          x: event.offsetX,
          y: event.offsetY
        };
      }
      var dim = {
        c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
        r: Math.ceil(posOffset.y / PX_PER_EM) || 1
      };
      $highlighted.css({
        width: dim.c + 'em',
        height: dim.r + 'em'
      });
      $catcher.data('value', dim.c + 'x' + dim.r);
      if (dim.c > 3 && dim.c < this.options.insertTableMaxSize.col) {
        $unhighlighted.css({
          width: dim.c + 1 + 'em'
        });
      }
      if (dim.r > 3 && dim.r < this.options.insertTableMaxSize.row) {
        $unhighlighted.css({
          height: dim.r + 1 + 'em'
        });
      }
      $dimensionDisplay.html(dim.c + ' x ' + dim.r);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Clipboard.js":
/*!************************************!*\
  !*** ./src/js/module/Clipboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Clipboard)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Clipboard = /*#__PURE__*/function () {
  function Clipboard(context) {
    _classCallCheck(this, Clipboard);
    this.context = context;
    this.options = context.options;
    this.$editable = context.layoutInfo.editable;
  }
  return _createClass(Clipboard, [{
    key: "initialize",
    value: function initialize() {
      this.$editable.on('paste', this.pasteByEvent.bind(this));
    }

    /**
     * paste by clipboard event
     *
     * @param {Event} event
     */
  }, {
    key: "pasteByEvent",
    value: function pasteByEvent(event) {
      var _this = this;
      if (this.context.isDisabled()) {
        return;
      }
      var clipboardData = event.originalEvent.clipboardData;
      if (clipboardData && clipboardData.items && clipboardData.items.length) {
        var clipboardFiles = clipboardData.files;
        var clipboardText = clipboardData.getData('Text');

        // paste img file
        if (clipboardFiles.length > 0 && this.options.allowClipboardImagePasting) {
          this.context.invoke('editor.insertImagesOrCallback', clipboardFiles);
          event.preventDefault();
        }

        // paste text with maxTextLength check
        if (clipboardText.length > 0 && this.context.invoke('editor.isLimited', clipboardText.length)) {
          event.preventDefault();
        }
      } else if (window.clipboardData) {
        // for IE
        var text = window.clipboardData.getData('text');
        if (this.context.invoke('editor.isLimited', text.length)) {
          event.preventDefault();
        }
      }

      // Call editor.afterCommand after proceeding default event handler
      setTimeout(function () {
        _this.context.invoke('editor.afterCommand');
      }, 10);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Codeview.js":
/*!***********************************!*\
  !*** ./src/js/module/Codeview.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CodeView)
/* harmony export */ });
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * @class Codeview
 */
var CodeView = /*#__PURE__*/function () {
  function CodeView(context) {
    _classCallCheck(this, CodeView);
    this.context = context;
    this.$editor = context.layoutInfo.editor;
    this.$editable = context.layoutInfo.editable;
    this.$codable = context.layoutInfo.codable;
    this.options = context.options;
    this.CodeMirrorConstructor = window.CodeMirror;
    if (this.options.codemirror.CodeMirrorConstructor) {
      this.CodeMirrorConstructor = this.options.codemirror.CodeMirrorConstructor;
    }
  }
  return _createClass(CodeView, [{
    key: "sync",
    value: function sync(html) {
      var isCodeview = this.isActivated();
      var CodeMirror = this.CodeMirrorConstructor;
      if (isCodeview) {
        if (html) {
          if (CodeMirror) {
            this.$codable.data('cmEditor').getDoc().setValue(html);
          } else {
            this.$codable.val(html);
          }
        } else {
          if (CodeMirror) {
            this.$codable.data('cmEditor').save();
          }
        }
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;
      this.$codable.on('keyup', function (event) {
        if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_1__["default"].code.ESCAPE) {
          _this.deactivate();
        }
      });
    }

    /**
     * @return {Boolean}
     */
  }, {
    key: "isActivated",
    value: function isActivated() {
      return this.$editor.hasClass('codeview');
    }

    /**
     * toggle codeview
     */
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isActivated()) {
        this.deactivate();
      } else {
        this.activate();
      }
      this.context.triggerEvent('codeview.toggled');
    }

    /**
     * purify input value
     * @param value
     * @returns {*}
     */
  }, {
    key: "purify",
    value: function purify(value) {
      if (this.options.codeviewFilter) {
        // filter code view regex
        value = value.replace(this.options.codeviewFilterRegex, '');
        // allow specific iframe tag
        if (this.options.codeviewIframeFilter) {
          var whitelist = this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase);
          value = value.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function (tag) {
            // remove if src attribute is duplicated
            if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(tag)) {
              return '';
            }
            var _iterator = _createForOfIteratorHelper(whitelist),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var src = _step.value;
                // pass if src is trusted
                if (new RegExp('src="(https?:)?\/\/' + src.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\/(.+)"').test(tag)) {
                  return tag;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return '';
          });
        }
      }
      return value;
    }

    /**
     * activate code view
     */
  }, {
    key: "activate",
    value: function activate() {
      var _this2 = this;
      var CodeMirror = this.CodeMirrorConstructor;
      this.$codable.val(_core_dom__WEBPACK_IMPORTED_MODULE_0__["default"].html(this.$editable, this.options.prettifyHtml));
      this.$codable.height(this.$editable.height());
      this.context.invoke('toolbar.updateCodeview', true);
      this.context.invoke('airPopover.updateCodeview', true);
      this.$editor.addClass('codeview');
      this.$codable.trigger('focus');

      // activate CodeMirror as codable
      if (CodeMirror) {
        var cmEditor = CodeMirror.fromTextArea(this.$codable[0], this.options.codemirror);

        // CodeMirror TernServer
        if (this.options.codemirror.tern) {
          var server = new CodeMirror.TernServer(this.options.codemirror.tern);
          cmEditor.ternServer = server;
          cmEditor.on('cursorActivity', function (cm) {
            server.updateArgHints(cm);
          });
        }
        cmEditor.on('blur', function (event) {
          _this2.context.triggerEvent('blur.codeview', cmEditor.getValue(), event);
        });
        cmEditor.on('change', function () {
          _this2.context.triggerEvent('change.codeview', cmEditor.getValue(), cmEditor);
        });

        // CodeMirror hasn't Padding.
        cmEditor.setSize(null, this.$editable.outerHeight());
        this.$codable.data('cmEditor', cmEditor);
      } else {
        this.$codable.on('blur', function (event) {
          _this2.context.triggerEvent('blur.codeview', _this2.$codable.val(), event);
        });
        this.$codable.on('input', function () {
          _this2.context.triggerEvent('change.codeview', _this2.$codable.val(), _this2.$codable);
        });
      }
    }

    /**
     * deactivate code view
     */
  }, {
    key: "deactivate",
    value: function deactivate() {
      var CodeMirror = this.CodeMirrorConstructor;
      // deactivate CodeMirror as codable
      if (CodeMirror) {
        var cmEditor = this.$codable.data('cmEditor');
        this.$codable.val(cmEditor.getValue());
        cmEditor.toTextArea();
      }
      var value = this.purify(_core_dom__WEBPACK_IMPORTED_MODULE_0__["default"].value(this.$codable, this.options.prettifyHtml) || _core_dom__WEBPACK_IMPORTED_MODULE_0__["default"].emptyPara);
      var isChange = this.$editable.html() !== value;
      this.$editable.html(value);
      this.$editable.height(this.options.height ? this.$codable.height() : 'auto');
      this.$editor.removeClass('codeview');
      if (isChange) {
        this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      }
      this.$editable.trigger('focus');
      this.context.invoke('toolbar.updateCodeview', false);
      this.context.invoke('airPopover.updateCodeview', false);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.isActivated()) {
        this.deactivate();
      }
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Dropzone.js":
/*!***********************************!*\
  !*** ./src/js/module/Dropzone.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dropzone)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Dropzone = /*#__PURE__*/function () {
  function Dropzone(context) {
    _classCallCheck(this, Dropzone);
    this.context = context;
    this.$eventListener = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
    this.$editor = context.layoutInfo.editor;
    this.$editable = context.layoutInfo.editable;
    this.options = context.options;
    this.lang = this.options.langInfo;
    this.documentEventHandlers = {};
    this.$dropzone = jquery__WEBPACK_IMPORTED_MODULE_0___default()(['<div class="note-dropzone">', '<div class="note-dropzone-message"></div>', '</div>'].join('')).prependTo(this.$editor);
  }

  /**
   * attach Drag and Drop Events
   */
  return _createClass(Dropzone, [{
    key: "initialize",
    value: function initialize() {
      if (this.options.disableDragAndDrop) {
        // prevent default drop event
        this.documentEventHandlers.onDrop = function (e) {
          e.preventDefault();
        };
        // do not consider outside of dropzone
        this.$eventListener = this.$dropzone;
        this.$eventListener.on('drop', this.documentEventHandlers.onDrop);
      } else {
        this.attachDragAndDropEvent();
      }
    }

    /**
     * attach Drag and Drop Events
     */
  }, {
    key: "attachDragAndDropEvent",
    value: function attachDragAndDropEvent() {
      var _this = this;
      var collection = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
      var $dropzoneMessage = this.$dropzone.find('.note-dropzone-message');
      this.documentEventHandlers.onDragenter = function (e) {
        var isCodeview = _this.context.invoke('codeview.isActivated');
        var hasEditorSize = _this.$editor.width() > 0 && _this.$editor.height() > 0;
        if (!isCodeview && !collection.length && hasEditorSize) {
          _this.$editor.addClass('dragover');
          _this.$dropzone.width(_this.$editor.width());
          _this.$dropzone.height(_this.$editor.height());
          $dropzoneMessage.text(_this.lang.image.dragImageHere);
        }
        collection = collection.add(e.target);
      };
      this.documentEventHandlers.onDragleave = function (e) {
        collection = collection.not(e.target);

        // If nodeName is BODY, then just make it over (fix for IE)
        if (!collection.length || e.target.nodeName === 'BODY') {
          collection = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
          _this.$editor.removeClass('dragover');
        }
      };
      this.documentEventHandlers.onDrop = function () {
        collection = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
        _this.$editor.removeClass('dragover');
      };

      // show dropzone on dragenter when dragging a object to document
      // -but only if the editor is visible, i.e. has a positive width and height
      this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter).on('dragleave', this.documentEventHandlers.onDragleave).on('drop', this.documentEventHandlers.onDrop);

      // change dropzone's message on hover.
      this.$dropzone.on('dragenter', function () {
        _this.$dropzone.addClass('hover');
        $dropzoneMessage.text(_this.lang.image.dropImage);
      }).on('dragleave', function () {
        _this.$dropzone.removeClass('hover');
        $dropzoneMessage.text(_this.lang.image.dragImageHere);
      });

      // attach dropImage
      this.$dropzone.on('drop', function (event) {
        var dataTransfer = event.originalEvent.dataTransfer;

        // stop the browser from opening the dropped content
        event.preventDefault();
        if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
          _this.$editable.trigger('focus');
          _this.context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(dataTransfer.types, function (idx, type) {
            // skip moz-specific types
            if (type.toLowerCase().indexOf('_moz_') > -1) {
              return;
            }
            var content = dataTransfer.getData(type);
            if (type.toLowerCase().indexOf('text') > -1) {
              _this.context.invoke('editor.pasteHTML', content);
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(content).each(function (idx, item) {
                _this.context.invoke('editor.insertNode', item);
              });
            }
          });
        }
      }).on('dragover', false); // prevent default dragover event
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;
      Object.keys(this.documentEventHandlers).forEach(function (key) {
        _this2.$eventListener.off(key.slice(2).toLowerCase(), _this2.documentEventHandlers[key]);
      });
      this.documentEventHandlers = {};
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Editor.js":
/*!*********************************!*\
  !*** ./src/js/module/Editor.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Editor)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/range */ "./src/js/core/range.js");
/* harmony import */ var _core_async__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/async */ "./src/js/core/async.js");
/* harmony import */ var _editing_History__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../editing/History */ "./src/js/editing/History.js");
/* harmony import */ var _editing_Style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../editing/Style */ "./src/js/editing/Style.js");
/* harmony import */ var _editing_Typing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../editing/Typing */ "./src/js/editing/Typing.js");
/* harmony import */ var _editing_Table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../editing/Table */ "./src/js/editing/Table.js");
/* harmony import */ var _editing_Bullet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../editing/Bullet */ "./src/js/editing/Bullet.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }













var KEY_BOGUS = 'bogus';
var MAILTO_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var TEL_PATTERN = /^(\+?\d{1,3}[\s-]?)?(\d{1,4})[\s-]?(\d{1,4})[\s-]?(\d{1,4})$/;
var URL_SCHEME_PATTERN = /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/;

/**
 * @class Editor
 */
var Editor = /*#__PURE__*/function () {
  function Editor(context) {
    var _this = this;
    _classCallCheck(this, Editor);
    this.context = context;
    this.$note = context.layoutInfo.note;
    this.$editor = context.layoutInfo.editor;
    this.$editable = context.layoutInfo.editable;
    this.options = context.options;
    this.lang = this.options.langInfo;
    this.editable = this.$editable[0];
    this.lastRange = null;
    this.snapshot = null;
    this.style = new _editing_Style__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this.table = new _editing_Table__WEBPACK_IMPORTED_MODULE_11__["default"]();
    this.typing = new _editing_Typing__WEBPACK_IMPORTED_MODULE_10__["default"](context);
    this.bullet = new _editing_Bullet__WEBPACK_IMPORTED_MODULE_12__["default"]();
    this.history = new _editing_History__WEBPACK_IMPORTED_MODULE_8__["default"](context);
    this.context.memo('help.escape', this.lang.help.escape);
    this.context.memo('help.undo', this.lang.help.undo);
    this.context.memo('help.redo', this.lang.help.redo);
    this.context.memo('help.tab', this.lang.help.tab);
    this.context.memo('help.untab', this.lang.help.untab);
    this.context.memo('help.insertParagraph', this.lang.help.insertParagraph);
    this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList);
    this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList);
    this.context.memo('help.indent', this.lang.help.indent);
    this.context.memo('help.outdent', this.lang.help.outdent);
    this.context.memo('help.formatPara', this.lang.help.formatPara);
    this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule);
    this.context.memo('help.fontName', this.lang.help.fontName);

    // native commands(with execCommand), generate function for execCommand
    var commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'formatBlock', 'removeFormat', 'backColor'];
    for (var idx = 0, len = commands.length; idx < len; idx++) {
      this[commands[idx]] = function (sCmd) {
        return function (value) {
          _this.beforeCommand();
          document.execCommand(sCmd, false, value);
          _this.afterCommand(true);
        };
      }(commands[idx]);
      this.context.memo('help.' + commands[idx], this.lang.help[commands[idx]]);
    }
    this.fontName = this.wrapCommand(function (value) {
      return _this.fontStyling('font-family', _core_env__WEBPACK_IMPORTED_MODULE_1__["default"].validFontName(value));
    });
    this.fontSize = this.wrapCommand(function (value) {
      var unit = _this.currentStyle()['font-size-unit'];
      return _this.fontStyling('font-size', value + unit);
    });
    this.fontSizeUnit = this.wrapCommand(function (value) {
      var size = _this.currentStyle()['font-size'];
      return _this.fontStyling('font-size', size + value);
    });
    for (var _idx = 1; _idx <= 6; _idx++) {
      this['formatH' + _idx] = function (idx) {
        return function () {
          _this.formatBlock('H' + idx);
        };
      }(_idx);
      this.context.memo('help.formatH' + _idx, this.lang.help['formatH' + _idx]);
    }
    this.insertParagraph = this.wrapCommand(function () {
      _this.typing.insertParagraph(_this.editable);
    });
    this.insertOrderedList = this.wrapCommand(function () {
      _this.bullet.insertOrderedList(_this.editable);
    });
    this.insertUnorderedList = this.wrapCommand(function () {
      _this.bullet.insertUnorderedList(_this.editable);
    });
    this.indent = this.wrapCommand(function () {
      _this.bullet.indent(_this.editable);
    });
    this.outdent = this.wrapCommand(function () {
      _this.bullet.outdent(_this.editable);
    });

    /**
     * insertNode
     * insert node
     * @param {Node} node
     */
    this.insertNode = this.wrapCommand(function (node) {
      if (_this.isLimited(jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).text().length)) {
        return;
      }
      var rng = _this.getLastRange();
      rng.insertNode(node);
      _this.setLastRange(_core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNodeAfter(node).select());
    });

    /**
     * insert text
     * @param {String} text
     */
    this.insertText = this.wrapCommand(function (text) {
      if (_this.isLimited(text.length)) {
        return;
      }
      var rng = _this.getLastRange();
      var textNode = rng.insertNode(_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].createText(text));
      _this.setLastRange(_core_range__WEBPACK_IMPORTED_MODULE_6__["default"].create(textNode, _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].nodeLength(textNode)).select());
    });

    /**
     * paste HTML
     * @param {String} markup
     */
    this.pasteHTML = this.wrapCommand(function (markup) {
      if (_this.isLimited(markup.length)) {
        return;
      }
      markup = _this.context.invoke('codeview.purify', markup);
      var contents = _this.getLastRange().pasteHTML(markup);
      _this.setLastRange(_core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNodeAfter(_core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].last(contents)).select());
    });

    /**
     * formatBlock
     *
     * @param {String} tagName
     */
    this.formatBlock = this.wrapCommand(function (tagName, $target) {
      var onApplyCustomStyle = _this.options.callbacks.onApplyCustomStyle;
      if (onApplyCustomStyle) {
        onApplyCustomStyle.call(_this, $target, _this.context, _this.onFormatBlock);
      } else {
        _this.onFormatBlock(tagName, $target);
      }
    });

    /**
     * insert horizontal rule
     */
    this.insertHorizontalRule = this.wrapCommand(function () {
      var hrNode = _this.getLastRange().insertNode(_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].create('HR'));
      if (hrNode.nextSibling) {
        _this.setLastRange(_core_range__WEBPACK_IMPORTED_MODULE_6__["default"].create(hrNode.nextSibling, 0).normalize().select());
      }
    });

    /**
     * lineHeight
     * @param {String} value
     */
    this.lineHeight = this.wrapCommand(function (value) {
      _this.style.stylePara(_this.getLastRange(), {
        lineHeight: value
      });
    });

    /**
     * create link (command)
     *
     * @param {Object} linkInfo
     */
    this.createLink = this.wrapCommand(function (linkInfo) {
      var rel = [];
      var linkUrl = linkInfo.url;
      var linkText = linkInfo.text;
      var isNewWindow = linkInfo.isNewWindow;
      var addNoReferrer = _this.options.linkAddNoReferrer;
      var addNoOpener = _this.options.linkAddNoOpener;
      var rng = linkInfo.range || _this.getLastRange();
      var additionalTextLength = linkText.length - rng.toString().length;
      if (additionalTextLength > 0 && _this.isLimited(additionalTextLength)) {
        return;
      }
      var isTextChanged = rng.toString() !== linkText;

      // handle spaced urls from input
      if (typeof linkUrl === 'string') {
        linkUrl = linkUrl.trim();
      }
      if (_this.options.onCreateLink) {
        linkUrl = _this.options.onCreateLink(linkUrl);
      } else {
        linkUrl = _this.checkLinkUrl(linkUrl);
      }
      var anchors = [];
      if (isTextChanged) {
        rng = rng.deleteContents();
        var anchor = rng.insertNode(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<A></A>').text(linkText)[0]);
        anchors.push(anchor);
      } else {
        anchors = _this.style.styleNodes(rng, {
          nodeName: 'A',
          expandClosestSibling: true,
          onlyPartialContains: true
        });
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(anchors, function (idx, anchor) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor).attr('href', linkUrl);
        if (isNewWindow) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor).attr('target', '_blank');
          if (addNoReferrer) {
            rel.push('noreferrer');
          }
          if (addNoOpener) {
            rel.push('noopener');
          }
          if (rel.length) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor).attr('rel', rel.join(' '));
          }
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor).removeAttr('target');
        }
      });
      _this.setLastRange(_this.createRangeFromList(anchors).select());
    });

    /**
     * setting color
     *
     * @param {Object} sObjColor  color code
     * @param {String} sObjColor.foreColor foreground color
     * @param {String} sObjColor.backColor background color
     */
    this.color = this.wrapCommand(function (colorInfo) {
      var foreColor = colorInfo.foreColor;
      var backColor = colorInfo.backColor;
      if (foreColor) {
        document.execCommand('foreColor', false, foreColor);
      }
      if (backColor) {
        document.execCommand('backColor', false, backColor);
      }
    });

    /**
     * Set foreground color
     *
     * @param {String} colorCode foreground color code
     */
    this.foreColor = this.wrapCommand(function (colorInfo) {
      document.execCommand('foreColor', false, colorInfo);
    });

    /**
     * insert Table
     *
     * @param {String} dimension of table (ex : "5x5")
     */
    this.insertTable = this.wrapCommand(function (dim) {
      var dimension = dim.split('x');
      var rng = _this.getLastRange().deleteContents();
      rng.insertNode(_this.table.createTable(dimension[0], dimension[1], _this.options));
    });

    /**
     * remove media object and Figure Elements if media object is img with Figure.
     */
    this.removeMedia = this.wrapCommand(function () {
      var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.restoreTarget()).parent();
      if ($target.closest('figure').length) {
        $target.closest('figure').remove();
      } else {
        $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.restoreTarget()).detach();
      }
      _this.setLastRange(_core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromSelection($target).select());
      _this.context.triggerEvent('media.delete', $target, _this.$editable);
    });

    /**
     * float me
     *
     * @param {String} value
     */
    this.floatMe = this.wrapCommand(function (value) {
      var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.restoreTarget());
      $target.toggleClass('note-float-left', value === 'left');
      $target.toggleClass('note-float-right', value === 'right');
      $target.css('float', value === 'none' ? '' : value);
    });

    /**
     * resize overlay element
     * @param {String} value
     */
    this.resize = this.wrapCommand(function (value) {
      var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.restoreTarget());
      value = parseFloat(value);
      if (value === 0) {
        $target.css('width', '');
      } else {
        $target.css({
          width: value * 100 + '%',
          height: ''
        });
      }
    });
  }
  return _createClass(Editor, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      // bind custom events
      this.$editable.on('keydown', function (event) {
        if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER) {
          _this2.context.triggerEvent('enter', event);
        }
        _this2.context.triggerEvent('keydown', event);

        // keep a snapshot to limit text on input event
        _this2.snapshot = _this2.history.makeSnapshot();
        _this2.hasKeyShortCut = false;
        if (!event.isDefaultPrevented()) {
          if (_this2.options.shortcuts) {
            _this2.hasKeyShortCut = _this2.handleKeyMap(event);
          } else {
            _this2.preventDefaultEditableShortCuts(event);
          }
        }
        if (_this2.isLimited(1, event)) {
          var lastRange = _this2.getLastRange();
          if (lastRange.eo - lastRange.so === 0) {
            return false;
          }
        }
        _this2.setLastRange();

        // record undo in the key event except keyMap.
        if (_this2.options.recordEveryKeystroke) {
          if (_this2.hasKeyShortCut === false) {
            _this2.history.recordUndo();
          }
        }
      }).on('keyup', function (event) {
        _this2.setLastRange();
        _this2.context.triggerEvent('keyup', event);
      }).on('focus', function (event) {
        _this2.setLastRange();
        _this2.context.triggerEvent('focus', event);
      }).on('blur', function (event) {
        _this2.context.triggerEvent('blur', event);
      }).on('mousedown', function (event) {
        _this2.context.triggerEvent('mousedown', event);
      }).on('mouseup', function (event) {
        _this2.setLastRange();
        _this2.history.recordUndo();
        _this2.context.triggerEvent('mouseup', event);
      }).on('scroll', function (event) {
        _this2.context.triggerEvent('scroll', event);
      }).on('paste', function (event) {
        _this2.setLastRange();
        _this2.context.triggerEvent('paste', event);
      }).on('copy', function (event) {
        _this2.context.triggerEvent('copy', event);
      }).on('input', function () {
        // To limit composition characters (e.g. Korean)
        if (_this2.isLimited(0) && _this2.snapshot) {
          _this2.history.applySnapshot(_this2.snapshot);
        }
      });
      this.$editable.attr('spellcheck', this.options.spellCheck);
      this.$editable.attr('autocorrect', this.options.spellCheck);
      if (this.options.disableGrammar) {
        this.$editable.attr('data-gramm', false);
      }

      // init content before set event
      this.$editable.html(_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].html(this.$note) || _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].emptyPara);
      this.$editable.on(_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].inputEventName, _core_func__WEBPACK_IMPORTED_MODULE_3__["default"].debounce(function () {
        _this2.context.triggerEvent('change', _this2.$editable.html(), _this2.$editable);
      }, 10));
      this.$editable.on('focusin', function (event) {
        _this2.context.triggerEvent('focusin', event);
      }).on('focusout', function (event) {
        _this2.context.triggerEvent('focusout', event);
      });
      if (this.options.airMode) {
        if (this.options.overrideContextMenu) {
          this.$editor.on('contextmenu', function (event) {
            _this2.context.triggerEvent('contextmenu', event);
            return false;
          });
        }
      } else {
        if (this.options.width) {
          this.$editor.outerWidth(this.options.width);
        }
        if (this.options.height) {
          this.$editable.outerHeight(this.options.height);
        }
        if (this.options.maxHeight) {
          this.$editable.css('max-height', this.options.maxHeight);
        }
        if (this.options.minHeight) {
          this.$editable.css('min-height', this.options.minHeight);
        }
      }
      this.history.recordUndo();
      this.setLastRange();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$editable.off();
    }
  }, {
    key: "handleKeyMap",
    value: function handleKeyMap(event) {
      var keyMap = this.options.keyMap[_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isMac ? 'mac' : 'pc'];
      var keys = [];
      if (event.metaKey) {
        keys.push('CMD');
      }
      if (event.ctrlKey && !event.altKey) {
        keys.push('CTRL');
      }
      if (event.shiftKey) {
        keys.push('SHIFT');
      }
      var keyName = _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].nameFromCode[event.keyCode];
      if (keyName) {
        keys.push(keyName);
      }
      var eventName = keyMap[keys.join('+')];
      if (keyName === 'TAB' && !this.options.tabDisable) {
        this.afterCommand();
      } else if (eventName) {
        if (this.context.invoke(eventName) !== false) {
          event.preventDefault();
          return true;
        }
      } else if (_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].isEdit(event.keyCode)) {
        if (_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].isRemove(event.keyCode)) {
          this.context.invoke('removed');
        }
        this.afterCommand();
      }
      return false;
    }
  }, {
    key: "preventDefaultEditableShortCuts",
    value: function preventDefaultEditableShortCuts(event) {
      // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
      if ((event.ctrlKey || event.metaKey) && _core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].contains([66, 73, 85], event.keyCode)) {
        event.preventDefault();
      }
    }
  }, {
    key: "isLimited",
    value: function isLimited(pad, event) {
      pad = pad || 0;
      if (typeof event !== 'undefined') {
        if (_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].isMove(event.keyCode) || _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].isNavigation(event.keyCode) || event.ctrlKey || event.metaKey || _core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].contains([_core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.BACKSPACE, _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.DELETE], event.keyCode)) {
          return false;
        }
      }
      if (this.options.maxTextLength > 0) {
        if (this.$editable.text().length + pad > this.options.maxTextLength) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "checkLinkUrl",
    value: function checkLinkUrl(linkUrl) {
      if (MAILTO_PATTERN.test(linkUrl)) {
        return 'mailto://' + linkUrl;
      } else if (TEL_PATTERN.test(linkUrl)) {
        return 'tel://' + linkUrl;
      } else if (!URL_SCHEME_PATTERN.test(linkUrl)) {
        return 'http://' + linkUrl;
      }
      return linkUrl;
    }

    /**
     * create range
     * @return {WrappedRange}
     */
  }, {
    key: "createRange",
    value: function createRange() {
      this.focus();
      this.setLastRange();
      return this.getLastRange();
    }

    /**
     * create a new range from the list of elements
     *
     * @param {list} dom element list
     * @return {WrappedRange}
     */
  }, {
    key: "createRangeFromList",
    value: function createRangeFromList(lst) {
      var startRange = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNodeBefore(_core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].head(lst));
      var startPoint = startRange.getStartPoint();
      var endRange = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNodeAfter(_core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].last(lst));
      var endPoint = endRange.getEndPoint();
      return _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
    }

    /**
     * set the last range
     *
     * if given rng is exist, set rng as the last range
     * or create a new range at the end of the document
     *
     * @param {WrappedRange} rng
     */
  }, {
    key: "setLastRange",
    value: function setLastRange(rng) {
      if (rng) {
        this.lastRange = rng;
      } else {
        this.lastRange = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].create(this.editable);
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.lastRange.sc).closest('.note-editable').length === 0) {
          this.lastRange = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromBodyElement(this.editable);
        }
      }
    }

    /**
     * get the last range
     *
     * if there is a saved last range, return it
     * or create a new range and return it
     *
     * @return {WrappedRange}
     */
  }, {
    key: "getLastRange",
    value: function getLastRange() {
      if (!this.lastRange) {
        this.setLastRange();
      }
      return this.lastRange;
    }

    /**
     * saveRange
     *
     * save current range
     *
     * @param {Boolean} [thenCollapse=false]
     */
  }, {
    key: "saveRange",
    value: function saveRange(thenCollapse) {
      if (thenCollapse) {
        this.getLastRange().collapse().select();
      }
    }

    /**
     * restoreRange
     *
     * restore lately range
     */
  }, {
    key: "restoreRange",
    value: function restoreRange() {
      if (this.lastRange) {
        this.lastRange.select();
        this.focus();
      }
    }
  }, {
    key: "saveTarget",
    value: function saveTarget(node) {
      this.$editable.data('target', node);
    }
  }, {
    key: "clearTarget",
    value: function clearTarget() {
      this.$editable.removeData('target');
    }
  }, {
    key: "restoreTarget",
    value: function restoreTarget() {
      return this.$editable.data('target');
    }

    /**
     * currentStyle
     *
     * current style
     * @return {Object|Boolean} unfocus
     */
  }, {
    key: "currentStyle",
    value: function currentStyle() {
      var rng = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].create();
      if (rng) {
        rng = rng.normalize();
      }
      return rng ? this.style.current(rng) : this.style.fromNode(this.$editable);
    }

    /**
     * style from node
     *
     * @param {jQuery} $node
     * @return {Object}
     */
  }, {
    key: "styleFromNode",
    value: function styleFromNode($node) {
      return this.style.fromNode($node);
    }

    /**
     * undo
     */
  }, {
    key: "undo",
    value: function undo() {
      this.context.triggerEvent('before.command', this.$editable.html());
      this.history.undo();
      this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }

    /*
    * commit
    */
  }, {
    key: "commit",
    value: function commit() {
      this.context.triggerEvent('before.command', this.$editable.html());
      this.history.commit();
      this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }

    /**
     * redo
     */
  }, {
    key: "redo",
    value: function redo() {
      this.context.triggerEvent('before.command', this.$editable.html());
      this.history.redo();
      this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }

    /**
     * before command
     */
  }, {
    key: "beforeCommand",
    value: function beforeCommand() {
      this.context.triggerEvent('before.command', this.$editable.html());

      // Set styleWithCSS before run a command
      document.execCommand('styleWithCSS', false, this.options.styleWithCSS);

      // keep focus on editable before command execution
      this.focus();
    }

    /**
     * after command
     * @param {Boolean} isPreventTrigger
     */
  }, {
    key: "afterCommand",
    value: function afterCommand(isPreventTrigger) {
      this.normalizeContent();
      this.history.recordUndo();
      if (!isPreventTrigger) {
        this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      }
    }

    /**
     * handle tab key
     */
  }, {
    key: "tab",
    value: function tab() {
      var rng = this.getLastRange();
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.table.tab(rng);
      } else {
        if (this.options.tabSize === 0) {
          return false;
        }
        if (!this.isLimited(this.options.tabSize)) {
          this.beforeCommand();
          this.typing.insertTab(rng, this.options.tabSize);
          this.afterCommand();
        }
      }
    }

    /**
     * handle shift+tab key
     */
  }, {
    key: "untab",
    value: function untab() {
      var rng = this.getLastRange();
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.table.tab(rng, true);
      } else {
        if (this.options.tabSize === 0) {
          return false;
        }
      }
    }

    /**
     * run given function between beforeCommand and afterCommand
     */
  }, {
    key: "wrapCommand",
    value: function wrapCommand(fn) {
      return function () {
        this.beforeCommand();
        fn.apply(this, arguments);
        this.afterCommand();
      };
    }
    /**
     * removed (function added by 1der1)
    */
  }, {
    key: "removed",
    value: function removed(rng, node, tagName) {
      // LB
      rng = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].create();
      if (rng.isCollapsed() && rng.isOnCell()) {
        node = rng.ec;
        if ((tagName = node.tagName) && node.childElementCount === 1 && node.childNodes[0].tagName === "BR") {
          if (tagName === "P") {
            node.remove();
          } else if (['TH', 'TD'].indexOf(tagName) >= 0) {
            node.firstChild.remove();
          }
        }
      }
    }
    /**
     * insert image
     *
     * @param {String} src
     * @param {String|Function} param
     * @return {Promise}
     */
  }, {
    key: "insertImage",
    value: function insertImage(src, param) {
      var _this3 = this;
      return (0,_core_async__WEBPACK_IMPORTED_MODULE_7__.createImage)(src, param).then(function ($image) {
        _this3.beforeCommand();
        if (typeof param === 'function') {
          param($image);
        } else {
          if (typeof param === 'string') {
            $image.attr('data-filename', param);
          }
          $image.css('width', Math.min(_this3.$editable.width(), $image.width()));
        }
        $image.show();
        _this3.getLastRange().insertNode($image[0]);
        _this3.setLastRange(_core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNodeAfter($image[0]).select());
        _this3.afterCommand();
      }).fail(function (e) {
        _this3.context.triggerEvent('image.upload.error', e);
      });
    }

    /**
     * insertImages
     * @param {File[]} files
     */
  }, {
    key: "insertImagesAsDataURL",
    value: function insertImagesAsDataURL(files) {
      var _this4 = this;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(files, function (idx, file) {
        var filename = file.name;
        if (_this4.options.maximumImageFileSize && _this4.options.maximumImageFileSize < file.size) {
          _this4.context.triggerEvent('image.upload.error', _this4.lang.image.maximumFileSizeError);
        } else {
          (0,_core_async__WEBPACK_IMPORTED_MODULE_7__.readFileAsDataURL)(file).then(function (dataURL) {
            return _this4.insertImage(dataURL, filename);
          }).fail(function () {
            _this4.context.triggerEvent('image.upload.error');
          });
        }
      });
    }

    /**
     * insertImagesOrCallback
     * @param {File[]} files
     */
  }, {
    key: "insertImagesOrCallback",
    value: function insertImagesOrCallback(files) {
      var callbacks = this.options.callbacks;
      // If onImageUpload set,
      if (callbacks.onImageUpload) {
        this.context.triggerEvent('image.upload', files);
        // else insert Image as dataURL
      } else {
        this.insertImagesAsDataURL(files);
      }
    }

    /**
     * return selected plain text
     * @return {String} text
     */
  }, {
    key: "getSelectedText",
    value: function getSelectedText() {
      var rng = this.getLastRange();

      // if range on anchor, expand range with anchor
      if (rng.isOnAnchor()) {
        rng = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNode(_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].ancestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].isAnchor));
      }
      return rng.toString();
    }
  }, {
    key: "onFormatBlock",
    value: function onFormatBlock(tagName, $target) {
      // [workaround] for MSIE, IE need `<`
      document.execCommand('FormatBlock', false, _core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isMSIE ? '<' + tagName + '>' : tagName);

      // support custom class
      if ($target && $target.length) {
        // find the exact element has given tagName
        if ($target[0].tagName.toUpperCase() !== tagName.toUpperCase()) {
          $target = $target.find(tagName);
        }
        if ($target && $target.length) {
          var currentRange = this.createRange();
          var $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()([currentRange.sc, currentRange.ec]).closest(tagName);
          // remove class added for current block
          $parent.removeClass();
          var className = $target[0].className || '';
          if (className) {
            $parent.addClass(className);
          }
        }
      }
    }
  }, {
    key: "formatPara",
    value: function formatPara() {
      this.formatBlock('P');
    }
  }, {
    key: "fontStyling",
    value: function fontStyling(target, value) {
      var rng = this.getLastRange();
      if (rng !== '') {
        var spans = this.style.styleNodes(rng);
        this.$editor.find('.note-status-output').html('');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(spans).css(target, value);

        // [workaround] added styled bogus span for style
        //  - also bogus character needed for cursor position
        if (rng.isCollapsed()) {
          var firstSpan = _core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].head(spans);
          if (firstSpan && !_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].nodeLength(firstSpan)) {
            firstSpan.innerHTML = _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].ZERO_WIDTH_NBSP_CHAR;
            _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNode(firstSpan.firstChild).select();
            this.setLastRange();
            this.$editable.data(KEY_BOGUS, firstSpan);
          }
        } else {
          rng.select();
        }
      } else {
        var noteStatusOutput = jquery__WEBPACK_IMPORTED_MODULE_0___default().now();
        this.$editor.find('.note-status-output').html('<div id="note-status-output-' + noteStatusOutput + '" class="alert alert-info">' + this.lang.output.noSelection + '</div>');
        setTimeout(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#note-status-output-' + noteStatusOutput).remove();
        }, 5000);
      }
    }

    /**
     * unlink
     *
     * @type command
     */
  }, {
    key: "unlink",
    value: function unlink() {
      var rng = this.getLastRange();
      if (rng.isOnAnchor()) {
        var anchor = _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].ancestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].isAnchor);
        rng = _core_range__WEBPACK_IMPORTED_MODULE_6__["default"].createFromNode(anchor);
        rng.select();
        this.setLastRange();
        this.beforeCommand();
        document.execCommand('unlink');
        this.afterCommand();
      }
    }

    /**
     * returns link info
     *
     * @return {Object}
     * @return {WrappedRange} return.range
     * @return {String} return.text
     * @return {Boolean} [return.isNewWindow=true]
     * @return {String} [return.url=""]
     */
  }, {
    key: "getLinkInfo",
    value: function getLinkInfo() {
      if (!this.hasFocus()) {
        this.focus();
      }
      var rng = this.getLastRange().expand(_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].isAnchor);
      // Get the first anchor on range(for edit).
      var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(_core_lists__WEBPACK_IMPORTED_MODULE_4__["default"].head(rng.nodes(_core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].isAnchor)));
      var linkInfo = {
        range: rng,
        text: rng.toString(),
        url: $anchor.length ? $anchor.attr('href') : ''
      };

      // When anchor exists,
      if ($anchor.length) {
        // Set isNewWindow by checking its target.
        linkInfo.isNewWindow = $anchor.attr('target') === '_blank';
      }
      return linkInfo;
    }
  }, {
    key: "addRow",
    value: function addRow(position) {
      var rng = this.getLastRange(this.$editable);
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.beforeCommand();
        this.table.addRow(rng, position);
        this.afterCommand();
      }
    }
  }, {
    key: "addCol",
    value: function addCol(position) {
      var rng = this.getLastRange(this.$editable);
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.beforeCommand();
        this.table.addCol(rng, position);
        this.afterCommand();
      }
    }
  }, {
    key: "deleteRow",
    value: function deleteRow() {
      var rng = this.getLastRange(this.$editable);
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.beforeCommand();
        this.table.deleteRow(rng);
        this.afterCommand();
      }
    }
  }, {
    key: "deleteCol",
    value: function deleteCol() {
      var rng = this.getLastRange(this.$editable);
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.beforeCommand();
        this.table.deleteCol(rng);
        this.afterCommand();
      }
    }
  }, {
    key: "deleteTable",
    value: function deleteTable() {
      var rng = this.getLastRange(this.$editable);
      if (rng.isCollapsed() && rng.isOnCell()) {
        this.beforeCommand();
        this.table.deleteTable(rng);
        this.afterCommand();
      }
    }

    /**
     * @param {Position} pos
     * @param {jQuery} $target - target element
     * @param {Boolean} [bKeepRatio] - keep ratio
     */
  }, {
    key: "resizeTo",
    value: function resizeTo(pos, $target, bKeepRatio) {
      var imageSize;
      if (bKeepRatio) {
        var newRatio = pos.y / pos.x;
        var ratio = $target.data('ratio');
        imageSize = {
          width: ratio > newRatio ? pos.x : pos.y / ratio,
          height: ratio > newRatio ? pos.x * ratio : pos.y
        };
      } else {
        imageSize = {
          width: pos.x,
          height: pos.y
        };
      }
      $target.css(imageSize);
    }

    /**
     * returns whether editable area has focus or not.
     */
  }, {
    key: "hasFocus",
    value: function hasFocus() {
      return this.$editable.is(':focus');
    }

    /**
     * set focus
     */
  }, {
    key: "focus",
    value: function focus() {
      // [workaround] Screen will move when page is scolled in IE.
      //  - do focus when not focused
      if (!this.hasFocus()) {
        this.$editable.trigger('focus');
      }
    }

    /**
     * returns whether contents is empty or not.
     * @return {Boolean}
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].isEmpty(this.$editable[0]) || _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].emptyPara === this.$editable.html();
    }

    /**
     * Removes all contents and restores the editable instance to an _emptyPara_.
     */
  }, {
    key: "empty",
    value: function empty() {
      this.context.invoke('code', _core_dom__WEBPACK_IMPORTED_MODULE_5__["default"].emptyPara);
    }

    /**
     * normalize content
     */
  }, {
    key: "normalizeContent",
    value: function normalizeContent() {
      this.$editable[0].normalize();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Fullscreen.js":
/*!*************************************!*\
  !*** ./src/js/module/Fullscreen.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fullscreen)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Fullscreen = /*#__PURE__*/function () {
  function Fullscreen(context) {
    var _this = this;
    _classCallCheck(this, Fullscreen);
    this.context = context;
    this.$editor = context.layoutInfo.editor;
    this.$toolbar = context.layoutInfo.toolbar;
    this.$editable = context.layoutInfo.editable;
    this.$codable = context.layoutInfo.codable;
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.$scrollbar = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body');
    this.scrollbarClassName = 'note-fullscreen-body';
    this.onResize = function () {
      _this.resizeTo({
        h: _this.$window.height() - _this.$toolbar.outerHeight()
      });
    };
  }
  return _createClass(Fullscreen, [{
    key: "resizeTo",
    value: function resizeTo(size) {
      this.$editable.css('height', size.h);
      this.$codable.css('height', size.h);
      if (this.$codable.data('cmeditor')) {
        this.$codable.data('cmeditor').setsize(null, size.h);
      }
    }

    /**
     * toggle fullscreen
     */
  }, {
    key: "toggle",
    value: function toggle() {
      this.$editor.toggleClass('fullscreen');
      var isFullscreen = this.isFullscreen();
      this.$scrollbar.toggleClass(this.scrollbarClassName, isFullscreen);
      if (isFullscreen) {
        this.$editable.data('orgHeight', this.$editable.css('height'));
        this.$editable.data('orgMaxHeight', this.$editable.css('maxHeight'));
        this.$editable.css('maxHeight', '');
        this.$window.on('resize', this.onResize).trigger('resize');
      } else {
        this.$window.off('resize', this.onResize);
        this.resizeTo({
          h: this.$editable.data('orgHeight')
        });
        this.$editable.css('maxHeight', this.$editable.css('orgMaxHeight'));
      }
      this.context.invoke('toolbar.updateFullscreen', isFullscreen);
    }
  }, {
    key: "isFullscreen",
    value: function isFullscreen() {
      return this.$editor.hasClass('fullscreen');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$scrollbar.removeClass(this.scrollbarClassName);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Handle.js":
/*!*********************************!*\
  !*** ./src/js/module/Handle.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Handle)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Handle = /*#__PURE__*/function () {
  function Handle(context) {
    var _this = this;
    _classCallCheck(this, Handle);
    this.context = context;
    this.$document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
    this.$editingArea = context.layoutInfo.editingArea;
    this.options = context.options;
    this.lang = this.options.langInfo;
    this.events = {
      'summernote.mousedown': function summernoteMousedown(we, e) {
        if (_this.update(e.target, e)) {
          e.preventDefault();
        }
      },
      'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function summernoteKeyupSummernoteScrollSummernoteChangeSummernoteDialogShown() {
        _this.update();
      },
      'summernote.disable summernote.blur': function summernoteDisableSummernoteBlur() {
        _this.hide();
      },
      'summernote.codeview.toggled': function summernoteCodeviewToggled() {
        _this.update();
      }
    };
  }
  return _createClass(Handle, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.$handle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', this.options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing', ' note-control-se"></div>', this.options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>', '</div>', '</div>'].join('')).prependTo(this.$editingArea);
      this.$handle.on('mousedown', function (event) {
        if (_core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isControlSizing(event.target)) {
          event.preventDefault();
          event.stopPropagation();
          var $target = _this2.$handle.find('.note-control-selection').data('target');
          var posStart = $target.offset();
          var scrollTop = _this2.$document.scrollTop();
          var onMouseMove = function onMouseMove(event) {
            _this2.context.invoke('editor.resizeTo', {
              x: event.clientX - posStart.left,
              y: event.clientY - (posStart.top - scrollTop)
            }, $target, !event.shiftKey);
            _this2.update($target[0], event);
          };
          _this2.$document.on('mousemove', onMouseMove).one('mouseup', function (e) {
            e.preventDefault();
            _this2.$document.off('mousemove', onMouseMove);
            _this2.context.invoke('editor.afterCommand');
          });
          if (!$target.data('ratio')) {
            // original ratio.
            $target.data('ratio', $target.height() / $target.width());
          }
        }
      });

      // Listen for scrolling on the handle overlay.
      this.$handle.on('wheel', function (event) {
        event.preventDefault();
        _this2.update();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$handle.remove();
    }
  }, {
    key: "update",
    value: function update(target, event) {
      if (this.context.isDisabled()) {
        return false;
      }
      var isImage = _core_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isImg(target);
      var $selection = this.$handle.find('.note-control-selection');
      this.context.invoke('imagePopover.update', target, event);
      if (isImage) {
        var $image = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target);
        var areaRect = this.$editingArea[0].getBoundingClientRect();
        var imageRect = target.getBoundingClientRect();
        $selection.css({
          display: 'block',
          left: imageRect.left - areaRect.left,
          top: imageRect.top - areaRect.top,
          width: imageRect.width,
          height: imageRect.height
        }).data('target', $image); // save current image element.

        var origImageObj = new Image();
        origImageObj.src = $image.attr('src');
        var sizingText = imageRect.width + 'x' + imageRect.height + ' (' + this.lang.image.original + ': ' + origImageObj.width + 'x' + origImageObj.height + ')';
        $selection.find('.note-control-selection-info').text(sizingText);
        this.context.invoke('editor.saveTarget', target);
      } else {
        this.hide();
      }
      return isImage;
    }

    /**
     * hide
     *
     * @param {jQuery} $handle
     */
  }, {
    key: "hide",
    value: function hide() {
      this.context.invoke('editor.clearTarget');
      this.$handle.children().hide();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/HelpDialog.js":
/*!*************************************!*\
  !*** ./src/js/module/HelpDialog.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HelpDialog)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var HelpDialog = /*#__PURE__*/function () {
  function HelpDialog(context) {
    _classCallCheck(this, HelpDialog);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$editor = context.layoutInfo.editor;
    this.options = context.options;
    this.lang = this.options.langInfo;
  }
  return _createClass(HelpDialog, [{
    key: "initialize",
    value: function initialize() {
      var $container = this.options.dialogsInBody ? this.$body : this.options.container;
      var body = ['<p class="text-center">', '<a href="http://summernote.org/" target="_blank" rel="noopener noreferrer">Summernote @@VERSION@@</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank" rel="noopener noreferrer">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank" rel="noopener noreferrer">Issues</a>', '</p>'].join('');
      this.$dialog = this.ui.dialog({
        title: this.lang.options.help,
        fade: this.options.dialogsFade,
        body: this.createShortcutList(),
        footer: body,
        callback: function callback($node) {
          $node.find('.modal-body,.note-modal-body').css({
            'max-height': 300,
            'overflow': 'scroll'
          });
        }
      }).render().appendTo($container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.ui.hideDialog(this.$dialog);
      this.$dialog.remove();
    }
  }, {
    key: "createShortcutList",
    value: function createShortcutList() {
      var _this = this;
      var keyMap = this.options.keyMap[_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isMac ? 'mac' : 'pc'];
      return Object.keys(keyMap).map(function (key) {
        var command = keyMap[key];
        var $row = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div><div class="help-list-item"></div></div>');
        $row.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<label><kbd>' + key + '</kdb></label>').css({
          'width': 180,
          'margin-right': 10
        })).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span></span>').html(_this.context.memo('help.' + command) || command));
        return $row.html();
      }).join('');
    }

    /**
     * show help dialog
     *
     * @return {Promise}
     */
  }, {
    key: "showHelpDialog",
    value: function showHelpDialog() {
      var _this2 = this;
      return jquery__WEBPACK_IMPORTED_MODULE_0___default().Deferred(function (deferred) {
        _this2.ui.onDialogShown(_this2.$dialog, function () {
          _this2.context.triggerEvent('dialog.shown');
          deferred.resolve();
        });
        _this2.ui.showDialog(_this2.$dialog);
      }).promise();
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;
      this.context.invoke('editor.saveRange');
      this.showHelpDialog().then(function () {
        _this3.context.invoke('editor.restoreRange');
      });
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/HintPopover.js":
/*!**************************************!*\
  !*** ./src/js/module/HintPopover.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HintPopover)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/range */ "./src/js/core/range.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var POPOVER_DIST = 5;
var HintPopover = /*#__PURE__*/function () {
  function HintPopover(context) {
    var _this = this;
    _classCallCheck(this, HintPopover);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.$editable = context.layoutInfo.editable;
    this.options = context.options;
    this.hint = this.options.hint || [];
    this.direction = this.options.hintDirection || 'bottom';
    this.hints = Array.isArray(this.hint) ? this.hint : [this.hint];
    this.events = {
      'summernote.keyup': function summernoteKeyup(we, event) {
        if (!event.isDefaultPrevented()) {
          _this.handleKeyup(event);
        }
      },
      'summernote.keydown': function summernoteKeydown(we, event) {
        _this.handleKeydown(event);
      },
      'summernote.disable summernote.dialog.shown summernote.blur': function summernoteDisableSummernoteDialogShownSummernoteBlur() {
        _this.hide();
      }
    };
  }
  return _createClass(HintPopover, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return this.hints.length > 0;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.lastWordRange = null;
      this.matchingWord = null;
      this.$popover = this.ui.popover({
        className: 'note-hint-popover',
        hideArrow: true,
        direction: ''
      }).render().appendTo(this.options.container);
      this.$popover.hide();
      this.$content = this.$popover.find('.popover-content,.note-popover-content');
      this.$content.on('click', '.note-hint-item', function (event) {
        _this2.$content.find('.active').removeClass('active');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget).addClass('active');
        _this2.replace();
      });
      this.$popover.on('mousedown', function (event) {
        event.preventDefault();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$popover.remove();
    }
  }, {
    key: "selectItem",
    value: function selectItem($item) {
      this.$content.find('.active').removeClass('active');
      $item.addClass('active');
      this.$content[0].scrollTop = $item[0].offsetTop - this.$content.innerHeight() / 2;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      var $current = this.$content.find('.note-hint-item.active');
      var $next = $current.next();
      if ($next.length) {
        this.selectItem($next);
      } else {
        var $nextGroup = $current.parent().next();
        if (!$nextGroup.length) {
          $nextGroup = this.$content.find('.note-hint-group').first();
        }
        this.selectItem($nextGroup.find('.note-hint-item').first());
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      var $current = this.$content.find('.note-hint-item.active');
      var $prev = $current.prev();
      if ($prev.length) {
        this.selectItem($prev);
      } else {
        var $prevGroup = $current.parent().prev();
        if (!$prevGroup.length) {
          $prevGroup = this.$content.find('.note-hint-group').last();
        }
        this.selectItem($prevGroup.find('.note-hint-item').last());
      }
    }
  }, {
    key: "replace",
    value: function replace() {
      var $item = this.$content.find('.note-hint-item.active');
      if ($item.length) {
        var node = this.nodeFromItem($item);
        // If matchingWord length = 0 -> capture OK / open hint / but as mention capture "" (\w*)
        if (this.matchingWord !== null && this.matchingWord.length === 0) {
          this.lastWordRange.so = this.lastWordRange.eo;
          // Else si > 0 and normal case -> adjust range "before" for correct position of insertion
        } else if (this.matchingWord !== null && this.matchingWord.length > 0 && !this.lastWordRange.isCollapsed()) {
          var rangeCompute = this.lastWordRange.eo - this.lastWordRange.so - this.matchingWord.length;
          if (rangeCompute > 0) {
            this.lastWordRange.so += rangeCompute;
          }
        }
        this.lastWordRange.insertNode(node);
        if (this.options.hintSelect === 'next') {
          var blank = document.createTextNode('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).after(blank);
          _core_range__WEBPACK_IMPORTED_MODULE_4__["default"].createFromNodeBefore(blank).select();
        } else {
          _core_range__WEBPACK_IMPORTED_MODULE_4__["default"].createFromNodeAfter(node).select();
        }
        this.lastWordRange = null;
        this.hide();
        this.context.invoke('editor.focus');
        this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      }
    }
  }, {
    key: "nodeFromItem",
    value: function nodeFromItem($item) {
      var hint = this.hints[$item.data('index')];
      var item = $item.data('item');
      var node = hint.content ? hint.content(item) : item;
      if (typeof node === 'string') {
        node = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].createText(node);
      }
      return node;
    }
  }, {
    key: "createItemTemplates",
    value: function createItemTemplates(hintIdx, items) {
      var hint = this.hints[hintIdx];
      return items.map(function (item, idx) {
        var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="note-hint-item"></div>');
        $item.append(hint.template ? hint.template(item) : item + '');
        $item.data({
          'index': hintIdx,
          'item': item
        });
        if (hintIdx === 0 && idx === 0) {
          $item.addClass('active');
        }
        return $item;
      });
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(event) {
      if (!this.$popover.is(':visible')) {
        return;
      }
      if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_5__["default"].code.ENTER) {
        event.preventDefault();
        this.replace();
      } else if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_5__["default"].code.UP) {
        event.preventDefault();
        this.moveUp();
      } else if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_5__["default"].code.DOWN) {
        event.preventDefault();
        this.moveDown();
      }
    }
  }, {
    key: "searchKeyword",
    value: function searchKeyword(index, keyword, callback) {
      var hint = this.hints[index];
      if (hint && hint.match.test(keyword) && hint.search) {
        var matches = hint.match.exec(keyword);
        this.matchingWord = matches[0];
        hint.search(matches[1], callback);
      } else {
        callback();
      }
    }
  }, {
    key: "createGroup",
    value: function createGroup(idx, keyword) {
      var _this3 = this;
      var $group = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="note-hint-group note-hint-group-' + idx + '"></div>');
      this.searchKeyword(idx, keyword, function (items) {
        items = items || [];
        if (items.length) {
          $group.html(_this3.createItemTemplates(idx, items));
          _this3.show();
        }
      });
      return $group;
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(event) {
      var _this4 = this;
      if (!_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].contains([_core_key__WEBPACK_IMPORTED_MODULE_5__["default"].code.ENTER, _core_key__WEBPACK_IMPORTED_MODULE_5__["default"].code.UP, _core_key__WEBPACK_IMPORTED_MODULE_5__["default"].code.DOWN], event.keyCode)) {
        var _range = this.context.invoke('editor.getLastRange');
        var wordRange, keyword;
        if (this.options.hintMode === 'words') {
          wordRange = _range.getWordsRange(_range);
          keyword = wordRange.toString();
          this.hints.forEach(function (hint) {
            if (hint.match.test(keyword)) {
              wordRange = _range.getWordsMatchRange(hint.match);
              return false;
            }
          });
          if (!wordRange) {
            this.hide();
            return;
          }
          keyword = wordRange.toString();
        } else {
          wordRange = _range.getWordRange();
          keyword = wordRange.toString();
        }
        if (this.hints.length && keyword) {
          this.$content.empty();
          var bnd = _core_func__WEBPACK_IMPORTED_MODULE_1__["default"].rect2bnd(_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].last(wordRange.getClientRects()));
          var containerOffset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.container).offset();
          if (bnd) {
            bnd.top -= containerOffset.top;
            bnd.left -= containerOffset.left;
            this.$popover.hide();
            this.lastWordRange = wordRange;
            this.hints.forEach(function (hint, idx) {
              if (hint.match.test(keyword)) {
                _this4.createGroup(idx, keyword).appendTo(_this4.$content);
              }
            });
            // select first .note-hint-item
            this.$content.find('.note-hint-item').first().addClass('active');

            // set position for popover after group is created
            if (this.direction === 'top') {
              this.$popover.css({
                left: bnd.left,
                top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
              });
            } else {
              this.$popover.css({
                left: bnd.left,
                top: bnd.top + bnd.height + POPOVER_DIST
              });
            }
          }
        } else {
          this.hide();
        }
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.$popover.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$popover.hide();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/ImageDialog.js":
/*!**************************************!*\
  !*** ./src/js/module/ImageDialog.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageDialog)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var ImageDialog = /*#__PURE__*/function () {
  function ImageDialog(context) {
    _classCallCheck(this, ImageDialog);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$editor = context.layoutInfo.editor;
    this.options = context.options;
    this.lang = this.options.langInfo;
  }
  return _createClass(ImageDialog, [{
    key: "initialize",
    value: function initialize() {
      var imageLimitation = '';
      if (this.options.maximumImageFileSize) {
        var unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
        var readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 + ' ' + ' KMGTP'[unit] + 'B';
        imageLimitation = "<small>".concat(this.lang.image.maximumFileSize + ' : ' + readableSize, "</small>");
      }
      var $container = this.options.dialogsInBody ? this.$body : this.options.container;
      var body = ['<div class="form-group note-form-group note-group-select-from-files">', '<label for="note-dialog-image-file-' + this.options.id + '" class="note-form-label">' + this.lang.image.selectFromFiles + '</label>', '<input id="note-dialog-image-file-' + this.options.id + '" class="note-image-input form-control-file note-form-control note-input" ', ' type="file" name="files" accept="' + this.options.acceptImageFileTypes + '" multiple="multiple"/>', imageLimitation, '</div>', '<div class="form-group note-group-image-url">', '<label for="note-dialog-image-url-' + this.options.id + '" class="note-form-label">' + this.lang.image.url + '</label>', '<input id="note-dialog-image-url-' + this.options.id + '" class="note-image-url form-control note-form-control note-input" type="text"/>', '</div>'].join('');
      var buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
      var footer = "<input type=\"button\" href=\"#\" class=\"".concat(buttonClass, "\" value=\"").concat(this.lang.image.insert, "\" disabled>");
      this.$dialog = this.ui.dialog({
        title: this.lang.image.insert,
        fade: this.options.dialogsFade,
        body: body,
        footer: footer
      }).render().appendTo($container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.ui.hideDialog(this.$dialog);
      this.$dialog.remove();
    }
  }, {
    key: "bindEnterKey",
    value: function bindEnterKey($input, $btn) {
      $input.on('keypress', function (event) {
        if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER) {
          event.preventDefault();
          $btn.trigger('click');
        }
      });
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;
      this.context.invoke('editor.saveRange');
      this.showImageDialog().then(function (data) {
        // [workaround] hide dialog before restore range for IE range focus
        _this.ui.hideDialog(_this.$dialog);
        _this.context.invoke('editor.restoreRange');
        if (typeof data === 'string') {
          // image url
          // If onImageLinkInsert set,
          if (_this.options.callbacks.onImageLinkInsert) {
            _this.context.triggerEvent('image.link.insert', data);
          } else {
            _this.context.invoke('editor.insertImage', data);
          }
        } else {
          // array of files
          _this.context.invoke('editor.insertImagesOrCallback', data);
        }
      }).fail(function () {
        _this.context.invoke('editor.restoreRange');
      });
    }

    /**
     * show image dialog
     *
     * @param {jQuery} $dialog
     * @return {Promise}
     */
  }, {
    key: "showImageDialog",
    value: function showImageDialog() {
      var _this2 = this;
      return jquery__WEBPACK_IMPORTED_MODULE_0___default().Deferred(function (deferred) {
        var $imageInput = _this2.$dialog.find('.note-image-input');
        var $imageUrl = _this2.$dialog.find('.note-image-url');
        var $imageBtn = _this2.$dialog.find('.note-image-btn');
        _this2.ui.onDialogShown(_this2.$dialog, function () {
          _this2.context.triggerEvent('dialog.shown');

          // Cloning imageInput to clear element.
          $imageInput.replaceWith($imageInput.clone().on('change', function (event) {
            deferred.resolve(event.target.files || event.target.value);
          }).val(''));
          $imageUrl.on('input paste propertychange', function () {
            _this2.ui.toggleBtn($imageBtn, $imageUrl.val());
          }).val('');
          if (!_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isSupportTouch) {
            $imageUrl.trigger('focus');
          }
          $imageBtn.on('click', function (event) {
            event.preventDefault();
            deferred.resolve($imageUrl.val());
          });
          _this2.bindEnterKey($imageUrl, $imageBtn);
        });
        _this2.ui.onDialogHidden(_this2.$dialog, function () {
          $imageInput.off();
          $imageUrl.off();
          $imageBtn.off();
          if (deferred.state() === 'pending') {
            deferred.reject();
          }
        });
        _this2.ui.showDialog(_this2.$dialog);
      });
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/ImagePopover.js":
/*!***************************************!*\
  !*** ./src/js/module/ImagePopover.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImagePopover)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/**
 * Image popover module
 *  mouse events that show/hide popover will be handled by Handle.js.
 *  Handle.js will receive the events and invoke 'imagePopover.update'.
 */
var ImagePopover = /*#__PURE__*/function () {
  function ImagePopover(context) {
    var _this = this;
    _classCallCheck(this, ImagePopover);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.editable = context.layoutInfo.editable[0];
    this.options = context.options;
    this.events = {
      'summernote.disable summernote.dialog.shown': function summernoteDisableSummernoteDialogShown() {
        _this.hide();
      },
      'summernote.blur': function summernoteBlur(we, event) {
        if (event.originalEvent && event.originalEvent.relatedTarget) {
          if (!_this.$popover[0].contains(event.originalEvent.relatedTarget)) {
            _this.hide();
          }
        } else {
          _this.hide();
        }
      }
    };
  }
  return _createClass(ImagePopover, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return !_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(this.options.popover.image);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.$popover = this.ui.popover({
        className: 'note-image-popover'
      }).render().appendTo(this.options.container);
      var $content = this.$popover.find('.popover-content,.note-popover-content');
      this.context.invoke('buttons.build', $content, this.options.popover.image);
      this.$popover.on('mousedown', function (event) {
        event.preventDefault();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$popover.remove();
    }
  }, {
    key: "update",
    value: function update(target, event) {
      if (_core_dom__WEBPACK_IMPORTED_MODULE_2__["default"].isImg(target)) {
        var position = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).offset();
        var containerOffset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.container).offset();
        var pos = {};
        if (this.options.popatmouse) {
          pos.left = event.pageX - 20;
          pos.top = event.pageY;
        } else {
          pos = position;
        }
        pos.top -= containerOffset.top;
        pos.left -= containerOffset.left;
        this.$popover.css({
          display: 'block',
          left: pos.left,
          top: pos.top
        });
      } else {
        this.hide();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$popover.hide();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/LinkDialog.js":
/*!*************************************!*\
  !*** ./src/js/module/LinkDialog.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkDialog)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
/* harmony import */ var _core_func__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/func */ "./src/js/core/func.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var MAILTO_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var TEL_PATTERN = /^(\+?\d{1,3}[\s-]?)?(\d{1,4})[\s-]?(\d{1,4})[\s-]?(\d{1,4})$/;
var URL_SCHEME_PATTERN = /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/;
var LinkDialog = /*#__PURE__*/function () {
  function LinkDialog(context) {
    _classCallCheck(this, LinkDialog);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$editor = context.layoutInfo.editor;
    this.options = context.options;
    this.lang = this.options.langInfo;
    context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
  }
  return _createClass(LinkDialog, [{
    key: "initialize",
    value: function initialize() {
      var $container = this.options.dialogsInBody ? this.$body : this.options.container;
      var body = ['<div class="form-group note-form-group">', "<label for=\"note-dialog-link-txt-".concat(this.options.id, "\" class=\"note-form-label\">").concat(this.lang.link.textToDisplay, "</label>"), "<input id=\"note-dialog-link-txt-".concat(this.options.id, "\" class=\"note-link-text form-control note-form-control note-input\" type=\"text\"/>"), '</div>', '<div class="form-group note-form-group">', "<label for=\"note-dialog-link-url-".concat(this.options.id, "\" class=\"note-form-label\">").concat(this.lang.link.url, "</label>"), "<input id=\"note-dialog-link-url-".concat(this.options.id, "\" class=\"note-link-url form-control note-form-control note-input\" type=\"text\" value=\"http://\"/>"), '</div>', !this.options.disableLinkTarget ? jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').append(this.ui.checkbox({
        className: 'sn-checkbox-open-in-new-window',
        text: this.lang.link.openInNewWindow,
        checked: true
      }).render()).html() : ''].join('');
      var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
      var footer = "<input type=\"button\" href=\"#\" class=\"".concat(buttonClass, "\" value=\"").concat(this.lang.link.insert, "\" disabled>");
      this.$dialog = this.ui.dialog({
        className: 'link-dialog',
        title: this.lang.link.insert,
        fade: this.options.dialogsFade,
        body: body,
        footer: footer
      }).render().appendTo($container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.ui.hideDialog(this.$dialog);
      this.$dialog.remove();
    }
  }, {
    key: "bindEnterKey",
    value: function bindEnterKey($input, $btn) {
      $input.on('keypress', function (event) {
        if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER) {
          event.preventDefault();
          $btn.trigger('click');
        }
      });
    }
  }, {
    key: "checkLinkUrl",
    value: function checkLinkUrl(linkUrl) {
      if (MAILTO_PATTERN.test(linkUrl)) {
        return 'mailto://' + linkUrl;
      } else if (TEL_PATTERN.test(linkUrl)) {
        return 'tel://' + linkUrl;
      } else if (!URL_SCHEME_PATTERN.test(linkUrl)) {
        return 'http://' + linkUrl;
      }
      return linkUrl;
    }
  }, {
    key: "onCheckLinkUrl",
    value: function onCheckLinkUrl($input) {
      var _this = this;
      $input.on('blur', function (event) {
        event.target.value = event.target.value == '' ? '' : _this.checkLinkUrl(event.target.value);
      });
    }

    /**
     * toggle update button
     */
  }, {
    key: "toggleLinkBtn",
    value: function toggleLinkBtn($linkBtn, $linkText, $linkUrl) {
      this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
    }

    /**
     * Show link dialog and set event handlers on dialog controls.
     *
     * @param {Object} linkInfo
     * @return {Promise}
     */
  }, {
    key: "showLinkDialog",
    value: function showLinkDialog(linkInfo) {
      var _this2 = this;
      return jquery__WEBPACK_IMPORTED_MODULE_0___default().Deferred(function (deferred) {
        var $linkText = _this2.$dialog.find('.note-link-text');
        var $linkUrl = _this2.$dialog.find('.note-link-url');
        var $linkBtn = _this2.$dialog.find('.note-link-btn');
        var $openInNewWindow = _this2.$dialog.find('.sn-checkbox-open-in-new-window input[type=checkbox]');
        _this2.ui.onDialogShown(_this2.$dialog, function () {
          _this2.context.triggerEvent('dialog.shown');

          // If no url was given and given text is valid URL then copy that into URL Field
          if (!linkInfo.url && _core_func__WEBPACK_IMPORTED_MODULE_3__["default"].isValidUrl(linkInfo.text)) {
            linkInfo.url = _this2.checkLinkUrl(linkInfo.text);
          }
          $linkText.on('input paste propertychange', function () {
            // If linktext was modified by input events,
            // cloning text from linkUrl will be stopped.
            var text = $linkText.val();
            var div = document.createElement('div');
            div.innerText = text;
            text = div.innerHTML;
            linkInfo.text = text;
            _this2.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
          }).val(linkInfo.text);
          $linkUrl.on('input paste propertychange', function () {
            // Display same text on `Text to display` as default
            // when linktext has no text
            if (!linkInfo.text) {
              $linkText.val($linkUrl.val());
            }
            _this2.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
          }).val(linkInfo.url);
          if (!_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isSupportTouch) {
            $linkUrl.trigger('focus');
          }
          _this2.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
          _this2.bindEnterKey($linkUrl, $linkBtn);
          _this2.bindEnterKey($linkText, $linkBtn);
          _this2.onCheckLinkUrl($linkUrl);
          var isNewWindowChecked = linkInfo.isNewWindow !== undefined ? linkInfo.isNewWindow : _this2.context.options.linkTargetBlank;
          $openInNewWindow.prop('checked', isNewWindowChecked);
          $linkBtn.one('click', function (event) {
            event.preventDefault();
            deferred.resolve({
              range: linkInfo.range,
              url: $linkUrl.val(),
              text: $linkText.val(),
              isNewWindow: $openInNewWindow.is(':checked')
            });
            _this2.ui.hideDialog(_this2.$dialog);
          });
        });
        _this2.ui.onDialogHidden(_this2.$dialog, function () {
          // detach events
          $linkText.off();
          $linkUrl.off();
          $linkBtn.off();
          if (deferred.state() === 'pending') {
            deferred.reject();
          }
        });
        _this2.ui.showDialog(_this2.$dialog);
      }).promise();
    }

    /**
     * @param {Object} layoutInfo
     */
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;
      var linkInfo = this.context.invoke('editor.getLinkInfo');
      this.context.invoke('editor.saveRange');
      this.showLinkDialog(linkInfo).then(function (linkInfo) {
        _this3.context.invoke('editor.restoreRange');
        _this3.context.invoke('editor.createLink', linkInfo);
      }).fail(function () {
        _this3.context.invoke('editor.restoreRange');
      });
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/LinkPopover.js":
/*!**************************************!*\
  !*** ./src/js/module/LinkPopover.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkPopover)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var LinkPopover = /*#__PURE__*/function () {
  function LinkPopover(context) {
    var _this = this;
    _classCallCheck(this, LinkPopover);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.options = context.options;
    this.events = {
      'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function summernoteKeyupSummernoteMouseupSummernoteChangeSummernoteScroll() {
        _this.update();
      },
      'summernote.disable summernote.dialog.shown': function summernoteDisableSummernoteDialogShown() {
        _this.hide();
      },
      'summernote.blur': function summernoteBlur(we, event) {
        if (event.originalEvent && event.originalEvent.relatedTarget) {
          if (!_this.$popover[0].contains(event.originalEvent.relatedTarget)) {
            _this.hide();
          }
        } else {
          _this.hide();
        }
      }
    };
  }
  return _createClass(LinkPopover, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return !_core_lists__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(this.options.popover.link);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.$popover = this.ui.popover({
        className: 'note-link-popover',
        callback: function callback($node) {
          var $content = $node.find('.popover-content,.note-popover-content');
          $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');
        }
      }).render().appendTo(this.options.container);
      var $content = this.$popover.find('.popover-content,.note-popover-content');
      this.context.invoke('buttons.build', $content, this.options.popover.link);
      this.$popover.on('mousedown', function (event) {
        event.preventDefault();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$popover.remove();
    }
  }, {
    key: "update",
    value: function update() {
      // Prevent focusing on editable when invoke('code') is executed
      if (!this.context.invoke('editor.hasFocus')) {
        this.hide();
        return;
      }
      var rng = this.context.invoke('editor.getLastRange');
      if (rng.isCollapsed() && rng.isOnAnchor()) {
        var anchor = _core_dom__WEBPACK_IMPORTED_MODULE_2__["default"].ancestor(rng.sc, _core_dom__WEBPACK_IMPORTED_MODULE_2__["default"].isAnchor);
        var href = jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor).attr('href');
        var disp = jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor).text();
        this.$popover.find('a').attr('href', href).text(href).data('disp', disp);
        var pos = _core_dom__WEBPACK_IMPORTED_MODULE_2__["default"].posFromPlaceholder(anchor);
        var containerOffset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.container).offset();
        pos.top -= containerOffset.top;
        pos.left -= containerOffset.left;
        this.$popover.css({
          display: 'block',
          left: pos.left,
          top: pos.top
        });
      } else {
        this.hide();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$popover.hide();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Placeholder.js":
/*!**************************************!*\
  !*** ./src/js/module/Placeholder.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Placeholder)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Placeholder = /*#__PURE__*/function () {
  function Placeholder(context) {
    var _this = this;
    _classCallCheck(this, Placeholder);
    this.context = context;
    this.$editingArea = context.layoutInfo.editingArea;
    this.options = context.options;
    if (this.options.inheritPlaceholder === true) {
      // get placeholder value from the original element
      this.options.placeholder = this.context.$note.attr('placeholder') || this.options.placeholder;
    }
    this.events = {
      'summernote.init summernote.change': function summernoteInitSummernoteChange() {
        _this.update();
      },
      'summernote.codeview.toggled': function summernoteCodeviewToggled() {
        _this.update();
      }
    };
  }
  return _createClass(Placeholder, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return !!this.options.placeholder;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.$placeholder = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="note-placeholder"></div>');
      this.$placeholder.on('click', function () {
        _this2.context.invoke('focus');
      }).html(this.options.placeholder).prependTo(this.$editingArea);
      this.update();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$placeholder.remove();
    }
  }, {
    key: "update",
    value: function update() {
      var isShow = !this.context.invoke('codeview.isActivated') && this.context.invoke('editor.isEmpty');
      this.$placeholder.toggle(isShow);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Statusbar.js":
/*!************************************!*\
  !*** ./src/js/module/Statusbar.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Statusbar)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var EDITABLE_PADDING = 24;
var Statusbar = /*#__PURE__*/function () {
  function Statusbar(context) {
    _classCallCheck(this, Statusbar);
    this.$document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
    this.$statusbar = context.layoutInfo.statusbar;
    this.$editable = context.layoutInfo.editable;
    this.$codable = context.layoutInfo.codable;
    this.options = context.options;
  }
  return _createClass(Statusbar, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;
      if (this.options.airMode || this.options.disableResizeEditor) {
        this.destroy();
        return;
      }
      this.$statusbar.on('mousedown touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var editableTop = _this.$editable.offset().top - _this.$document.scrollTop();
        var editableCodeTop = _this.$codable.offset().top - _this.$document.scrollTop();
        var onStatusbarMove = function onStatusbarMove(event) {
          var originalEvent = event.type == 'mousemove' ? event : event.originalEvent.touches[0];
          var height = originalEvent.clientY - (editableTop + EDITABLE_PADDING);
          var heightCode = originalEvent.clientY - (editableCodeTop + EDITABLE_PADDING);
          height = _this.options.minheight > 0 ? Math.max(height, _this.options.minheight) : height;
          height = _this.options.maxHeight > 0 ? Math.min(height, _this.options.maxHeight) : height;
          heightCode = _this.options.minheight > 0 ? Math.max(heightCode, _this.options.minheight) : heightCode;
          heightCode = _this.options.maxHeight > 0 ? Math.min(heightCode, _this.options.maxHeight) : heightCode;
          _this.$editable.height(height);
          _this.$codable.height(heightCode);
        };
        _this.$document.on('mousemove touchmove', onStatusbarMove).one('mouseup touchend', function () {
          _this.$document.off('mousemove touchmove', onStatusbarMove);
        });
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$statusbar.off();
      this.$statusbar.addClass('locked');
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/TablePopover.js":
/*!***************************************!*\
  !*** ./src/js/module/TablePopover.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TablePopover)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/dom */ "./src/js/core/dom.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var TablePopover = /*#__PURE__*/function () {
  function TablePopover(context) {
    var _this = this;
    _classCallCheck(this, TablePopover);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.options = context.options;
    this.events = {
      'summernote.mousedown': function summernoteMousedown(we, event) {
        _this.update(event.target);
      },
      'summernote.keyup summernote.scroll summernote.change': function summernoteKeyupSummernoteScrollSummernoteChange() {
        _this.update();
      },
      'summernote.disable summernote.dialog.shown': function summernoteDisableSummernoteDialogShown() {
        _this.hide();
      },
      'summernote.blur': function summernoteBlur(we, event) {
        if (event.originalEvent && event.originalEvent.relatedTarget) {
          if (!_this.$popover[0].contains(event.originalEvent.relatedTarget)) {
            _this.hide();
          }
        } else {
          _this.hide();
        }
      }
    };
  }
  return _createClass(TablePopover, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return !_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty(this.options.popover.table);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.$popover = this.ui.popover({
        className: 'note-table-popover'
      }).render().appendTo(this.options.container);
      var $content = this.$popover.find('.popover-content,.note-popover-content');
      this.context.invoke('buttons.build', $content, this.options.popover.table);

      // [workaround] Disable Firefox's default table editor
      if (_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isFF) {
        document.execCommand('enableInlineTableEditing', false, false);
      }
      this.$popover.on('mousedown', function (event) {
        event.preventDefault();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$popover.remove();
    }
  }, {
    key: "update",
    value: function update(target) {
      if (this.context.isDisabled()) {
        return false;
      }
      var isCell = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isCell(target) || _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isCell(target === null || target === void 0 ? void 0 : target.parentElement);
      if (isCell) {
        var pos = _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"].posFromPlaceholder(target);
        var containerOffset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.container).offset();
        pos.top -= containerOffset.top;
        pos.left -= containerOffset.left;
        this.$popover.css({
          display: 'block',
          left: pos.left,
          top: pos.top
        });
      } else {
        this.hide();
      }
      return isCell;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$popover.hide();
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/Toolbar.js":
/*!**********************************!*\
  !*** ./src/js/module/Toolbar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Toolbar)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Toolbar = /*#__PURE__*/function () {
  function Toolbar(context) {
    _classCallCheck(this, Toolbar);
    this.context = context;
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.$document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.$note = context.layoutInfo.note;
    this.$editor = context.layoutInfo.editor;
    this.$toolbar = context.layoutInfo.toolbar;
    this.$editable = context.layoutInfo.editable;
    this.$statusbar = context.layoutInfo.statusbar;
    this.options = context.options;
    this.isFollowing = false;
    this.followScroll = this.followScroll.bind(this);
  }
  return _createClass(Toolbar, [{
    key: "shouldInitialize",
    value: function shouldInitialize() {
      return !this.options.airMode;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;
      this.options.toolbar = this.options.toolbar || [];
      if (!this.options.toolbar.length) {
        this.$toolbar.hide();
      } else {
        this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar);
      }
      if (this.options.toolbarContainer) {
        this.$toolbar.appendTo(this.options.toolbarContainer);
      }
      this.changeContainer(false);
      this.$note.on('summernote.keyup summernote.mouseup summernote.change', function () {
        _this.context.invoke('buttons.updateCurrentStyle');
      });
      this.context.invoke('buttons.updateCurrentStyle');
      if (this.options.followingToolbar) {
        this.$window.on('scroll resize', this.followScroll);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$toolbar.children().remove();
      if (this.options.followingToolbar) {
        this.$window.off('scroll resize', this.followScroll);
      }
    }
  }, {
    key: "followScroll",
    value: function followScroll() {
      if (this.$editor.hasClass('fullscreen')) {
        return false;
      }
      var editorHeight = this.$editor.outerHeight();
      var editorWidth = this.$editor.width();
      var toolbarHeight = this.$toolbar.height();
      var statusbarHeight = this.$statusbar.height();

      // check if the web app is currently using another static bar
      var otherBarHeight = 0;
      if (this.options.otherStaticBar) {
        otherBarHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.otherStaticBar).outerHeight();
      }
      var currentOffset = this.$document.scrollTop();
      var editorOffsetTop = this.$editor.offset().top;
      var editorOffsetBottom = editorOffsetTop + editorHeight;
      var activateOffset = editorOffsetTop - otherBarHeight;
      var deactivateOffsetBottom = editorOffsetBottom - otherBarHeight - toolbarHeight - statusbarHeight;
      if (!this.isFollowing && currentOffset > activateOffset && currentOffset < deactivateOffsetBottom - toolbarHeight) {
        this.isFollowing = true;
        this.$editable.css({
          marginTop: this.$toolbar.outerHeight()
        });
        this.$toolbar.css({
          position: 'fixed',
          top: otherBarHeight,
          width: editorWidth,
          zIndex: 1000
        });
      } else if (this.isFollowing && (currentOffset < activateOffset || currentOffset > deactivateOffsetBottom)) {
        this.isFollowing = false;
        this.$toolbar.css({
          position: 'relative',
          top: 0,
          width: '100%',
          zIndex: 'auto'
        });
        this.$editable.css({
          marginTop: ''
        });
      }
    }
  }, {
    key: "changeContainer",
    value: function changeContainer(isFullscreen) {
      if (isFullscreen) {
        this.$toolbar.prependTo(this.$editor);
      } else {
        if (this.options.toolbarContainer) {
          this.$toolbar.appendTo(this.options.toolbarContainer);
        }
      }
      if (this.options.followingToolbar) {
        this.followScroll();
      }
    }
  }, {
    key: "updateFullscreen",
    value: function updateFullscreen(isFullscreen) {
      this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), isFullscreen);
      this.changeContainer(isFullscreen);
    }
  }, {
    key: "updateCodeview",
    value: function updateCodeview(isCodeview) {
      this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), isCodeview);
      if (isCodeview) {
        this.deactivate();
      } else {
        this.activate();
      }
    }
  }, {
    key: "activate",
    value: function activate(isIncludeCodeview) {
      var $btn = this.$toolbar.find('button');
      if (!isIncludeCodeview) {
        $btn = $btn.not('.note-codeview-keep');
      }
      this.ui.toggleBtn($btn, true);
    }
  }, {
    key: "deactivate",
    value: function deactivate(isIncludeCodeview) {
      var $btn = this.$toolbar.find('button');
      if (!isIncludeCodeview) {
        $btn = $btn.not('.note-codeview-keep');
      }
      this.ui.toggleBtn($btn, false);
    }
  }]);
}();


/***/ }),

/***/ "./src/js/module/VideoDialog.js":
/*!**************************************!*\
  !*** ./src/js/module/VideoDialog.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoDialog)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/env */ "./src/js/core/env.js");
/* harmony import */ var _core_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/key */ "./src/js/core/key.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var VideoDialog = /*#__PURE__*/function () {
  function VideoDialog(context) {
    _classCallCheck(this, VideoDialog);
    this.context = context;
    this.ui = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).ui;
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$editor = context.layoutInfo.editor;
    this.options = context.options;
    this.lang = this.options.langInfo;
  }
  return _createClass(VideoDialog, [{
    key: "initialize",
    value: function initialize() {
      var $container = this.options.dialogsInBody ? this.$body : this.options.container;
      var body = ['<div class="form-group note-form-group row-fluid">', "<label for=\"note-dialog-video-url-".concat(this.options.id, "\" class=\"note-form-label\">").concat(this.lang.video.url, " <small class=\"text-muted\">").concat(this.lang.video.providers, "</small></label>"), "<input id=\"note-dialog-video-url-".concat(this.options.id, "\" class=\"note-video-url form-control note-form-control note-input\" type=\"text\"/>"), '</div>'].join('');
      var buttonClass = 'btn btn-primary note-btn note-btn-primary note-video-btn';
      var footer = "<input type=\"button\" href=\"#\" class=\"".concat(buttonClass, "\" value=\"").concat(this.lang.video.insert, "\" disabled>");
      this.$dialog = this.ui.dialog({
        title: this.lang.video.insert,
        fade: this.options.dialogsFade,
        body: body,
        footer: footer
      }).render().appendTo($container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.ui.hideDialog(this.$dialog);
      this.$dialog.remove();
    }
  }, {
    key: "bindEnterKey",
    value: function bindEnterKey($input, $btn) {
      $input.on('keypress', function (event) {
        if (event.keyCode === _core_key__WEBPACK_IMPORTED_MODULE_2__["default"].code.ENTER) {
          event.preventDefault();
          $btn.trigger('click');
        }
      });
    }
  }, {
    key: "createVideoNode",
    value: function createVideoNode(url) {
      // video url patterns(youtube, instagram, vimeo, dailymotion, youku, peertube, mp4, ogg, webm)
      var ytRegExp = /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/|live\/))([^&\n?]+)(?:.*[?&]t=([^&\n]+))?.*/;
      var ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
      var ytMatch = url.match(ytRegExp);
      var gdRegExp = /(?:\.|\/\/)drive\.google\.com\/file\/d\/(.[a-zA-Z0-9_-]*)\/view/;
      var gdMatch = url.match(gdRegExp);
      var igRegExp = /(?:www\.|\/\/)instagram\.com\/(reel|p)\/(.[a-zA-Z0-9_-]*)/;
      var igMatch = url.match(igRegExp);
      var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
      var vMatch = url.match(vRegExp);
      var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
      var vimMatch = url.match(vimRegExp);
      var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
      var dmMatch = url.match(dmRegExp);
      var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
      var youkuMatch = url.match(youkuRegExp);
      var peerTubeRegExp = /\/\/(.*)\/videos\/watch\/([^?]*)(?:\?(?:start=(\w*))?(?:&stop=(\w*))?(?:&loop=([10]))?(?:&autoplay=([10]))?(?:&muted=([10]))?)?/;
      var peerTubeMatch = url.match(peerTubeRegExp);
      var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
      var qqMatch = url.match(qqRegExp);
      var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
      var qqMatch2 = url.match(qqRegExp2);
      var mp4RegExp = /^.+.(mp4|m4v)$/;
      var mp4Match = url.match(mp4RegExp);
      var oggRegExp = /^.+.(ogg|ogv)$/;
      var oggMatch = url.match(oggRegExp);
      var webmRegExp = /^.+.(webm)$/;
      var webmMatch = url.match(webmRegExp);
      var fbRegExp = /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/;
      var fbMatch = url.match(fbRegExp);
      var $video;
      if (ytMatch && ytMatch[1].length === 11) {
        var youtubeId = ytMatch[1];
        var start = 0;
        if (typeof ytMatch[2] !== 'undefined') {
          var ytMatchForStart = ytMatch[2].match(ytRegExpForStart);
          if (ytMatchForStart) {
            for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
              start += typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0;
            }
          } else {
            start = parseInt(ytMatch[2], 10);
          }
        }
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe>').attr('frameborder', 0).attr('src', '//www.youtube.com/embed/' + youtubeId + (start > 0 ? '?start=' + start : '')).attr('width', '640').attr('height', '360');
      } else if (gdMatch && gdMatch[0].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe>').attr('frameborder', 0).attr('src', 'https://drive.google.com/file/d/' + gdMatch[1] + '/preview').attr('width', '640').attr('height', '480');
      } else if (igMatch && igMatch[0].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe>').attr('frameborder', 0).attr('src', 'https://instagram.com/p/' + igMatch[2] + '/embed/').attr('width', '612').attr('height', '710').attr('scrolling', 'no').attr('allowtransparency', 'true');
      } else if (vMatch && vMatch[0].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe>').attr('frameborder', 0).attr('src', vMatch[0] + '/embed/simple').attr('width', '600').attr('height', '600').attr('class', 'vine-embed');
      } else if (vimMatch && vimMatch[3].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('src', '//player.vimeo.com/video/' + vimMatch[3]).attr('width', '640').attr('height', '360');
      } else if (dmMatch && dmMatch[2].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe>').attr('frameborder', 0).attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2]).attr('width', '640').attr('height', '360');
      } else if (youkuMatch && youkuMatch[1].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '498').attr('width', '510').attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
      } else if (peerTubeMatch && peerTubeMatch[0].length) {
        var begin = 0;
        if (peerTubeMatch[2] !== 'undefined') begin = peerTubeMatch[2];
        var end = 0;
        if (peerTubeMatch[3] !== 'undefined') end = peerTubeMatch[3];
        var loop = 0;
        if (peerTubeMatch[4] !== 'undefined') loop = peerTubeMatch[4];
        var autoplay = 0;
        if (peerTubeMatch[5] !== 'undefined') autoplay = peerTubeMatch[5];
        var muted = 0;
        if (peerTubeMatch[6] !== 'undefined') muted = peerTubeMatch[6];
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups">').attr('frameborder', 0).attr('src', '//' + peerTubeMatch[1] + '/videos/embed/' + peerTubeMatch[2] + "?loop=" + loop + "&autoplay=" + autoplay + "&muted=" + muted + (begin > 0 ? '&start=' + begin : '') + (end > 0 ? '&end=' + start : '')).attr('width', '560').attr('height', '315');
      } else if (qqMatch && qqMatch[1].length || qqMatch2 && qqMatch2[2].length) {
        var vid = qqMatch && qqMatch[1].length ? qqMatch[1] : qqMatch2[2];
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '310').attr('width', '500').attr('src', 'https://v.qq.com/txp/iframe/player.html?vid=' + vid + '&amp;auto=0');
      } else if (mp4Match || oggMatch || webmMatch) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<video controls>').attr('src', url).attr('width', '640').attr('height', '360');
      } else if (fbMatch && fbMatch[0].length) {
        $video = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<iframe>').attr('frameborder', 0).attr('src', 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(fbMatch[0]) + '&show_text=0&width=560').attr('width', '560').attr('height', '301').attr('scrolling', 'no').attr('allowtransparency', 'true');
      } else {
        // this is not a known video link. Now what, Cat? Now what?
        return false;
      }
      $video.addClass('note-video-clip');
      return $video[0];
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;
      var text = this.context.invoke('editor.getSelectedText');
      this.context.invoke('editor.saveRange');
      this.showVideoDialog(text).then(function (url) {
        // [workaround] hide dialog before restore range for IE range focus
        _this.ui.hideDialog(_this.$dialog);
        _this.context.invoke('editor.restoreRange');

        // build node
        var $node = _this.createVideoNode(url);
        if ($node) {
          // insert video node
          _this.context.invoke('editor.insertNode', $node);
        }
      }).fail(function () {
        _this.context.invoke('editor.restoreRange');
      });
    }

    /**
     * show video dialog
     *
     * @param {jQuery} $dialog
     * @return {Promise}
     */
  }, {
    key: "showVideoDialog",
    value: function showVideoDialog( /* text */
    ) {
      var _this2 = this;
      return jquery__WEBPACK_IMPORTED_MODULE_0___default().Deferred(function (deferred) {
        var $videoUrl = _this2.$dialog.find('.note-video-url');
        var $videoBtn = _this2.$dialog.find('.note-video-btn');
        _this2.ui.onDialogShown(_this2.$dialog, function () {
          _this2.context.triggerEvent('dialog.shown');
          $videoUrl.on('input paste propertychange', function () {
            _this2.ui.toggleBtn($videoBtn, $videoUrl.val());
          });
          if (!_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isSupportTouch) {
            $videoUrl.trigger('focus');
          }
          $videoBtn.on('click', function (event) {
            event.preventDefault();
            deferred.resolve($videoUrl.val());
          });
          _this2.bindEnterKey($videoUrl, $videoBtn);
        });
        _this2.ui.onDialogHidden(_this2.$dialog, function () {
          $videoUrl.off();
          $videoBtn.off();
          if (deferred.state() === 'pending') {
            deferred.reject();
          }
        });
        _this2.ui.showDialog(_this2.$dialog);
      });
    }
  }]);
}();


/***/ }),

/***/ "./src/js/renderer.js":
/*!****************************!*\
  !*** ./src/js/renderer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Renderer = /*#__PURE__*/function () {
  function Renderer(markup, children, options, callback) {
    _classCallCheck(this, Renderer);
    this.markup = markup;
    this.children = children;
    this.options = options;
    this.callback = callback;
  }
  return _createClass(Renderer, [{
    key: "render",
    value: function render($parent) {
      var $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.markup);
      if (this.options && this.options.contents) {
        $node.html(this.options.contents);
      }
      if (this.options && this.options.className) {
        $node.addClass(this.options.className);
      }
      if (this.options && this.options.data) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.options.data, function (k, v) {
          $node.attr('data-' + k, v);
        });
      }
      if (this.options && this.options.click) {
        $node.on('click', this.options.click);
      }
      if (this.children) {
        var $container = $node.find('.note-children-container');
        this.children.forEach(function (child) {
          child.render($container.length ? $container : $node);
        });
      }
      if (this.callback) {
        this.callback($node, this.options);
      }
      if (this.options && this.options.callback) {
        this.options.callback($node);
      }
      if ($parent) {
        $parent.append($node);
      }
      return $node;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  create: function create(markup, callback) {
    return function () {
      var options = _typeof(arguments[1]) === 'object' ? arguments[1] : arguments[0];
      var children = Array.isArray(arguments[0]) ? arguments[0] : [];
      if (options && options.children) {
        children = options.children;
      }
      return new Renderer(markup, children, options, callback);
    };
  }
});

/***/ }),

/***/ "./src/js/settings.js":
/*!****************************!*\
  !*** ./src/js/settings.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lang_summernote_en_US__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lang/summernote-en-US */ "./src/lang/summernote-en-US.js");
/* harmony import */ var _summernote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./summernote */ "./src/js/summernote.js");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/dom */ "./src/js/core/dom.js");
/* harmony import */ var _core_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/range */ "./src/js/core/range.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _module_Editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./module/Editor */ "./src/js/module/Editor.js");
/* harmony import */ var _module_Clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./module/Clipboard */ "./src/js/module/Clipboard.js");
/* harmony import */ var _module_Dropzone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./module/Dropzone */ "./src/js/module/Dropzone.js");
/* harmony import */ var _module_Codeview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./module/Codeview */ "./src/js/module/Codeview.js");
/* harmony import */ var _module_Statusbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./module/Statusbar */ "./src/js/module/Statusbar.js");
/* harmony import */ var _module_Fullscreen__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./module/Fullscreen */ "./src/js/module/Fullscreen.js");
/* harmony import */ var _module_Handle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./module/Handle */ "./src/js/module/Handle.js");
/* harmony import */ var _module_AutoLink__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./module/AutoLink */ "./src/js/module/AutoLink.js");
/* harmony import */ var _module_AutoSync__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./module/AutoSync */ "./src/js/module/AutoSync.js");
/* harmony import */ var _module_AutoReplace__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./module/AutoReplace */ "./src/js/module/AutoReplace.js");
/* harmony import */ var _module_Placeholder__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./module/Placeholder */ "./src/js/module/Placeholder.js");
/* harmony import */ var _module_Buttons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./module/Buttons */ "./src/js/module/Buttons.js");
/* harmony import */ var _module_Toolbar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./module/Toolbar */ "./src/js/module/Toolbar.js");
/* harmony import */ var _module_LinkDialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./module/LinkDialog */ "./src/js/module/LinkDialog.js");
/* harmony import */ var _module_LinkPopover__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./module/LinkPopover */ "./src/js/module/LinkPopover.js");
/* harmony import */ var _module_ImageDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./module/ImageDialog */ "./src/js/module/ImageDialog.js");
/* harmony import */ var _module_ImagePopover__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./module/ImagePopover */ "./src/js/module/ImagePopover.js");
/* harmony import */ var _module_TablePopover__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./module/TablePopover */ "./src/js/module/TablePopover.js");
/* harmony import */ var _module_VideoDialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./module/VideoDialog */ "./src/js/module/VideoDialog.js");
/* harmony import */ var _module_HelpDialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./module/HelpDialog */ "./src/js/module/HelpDialog.js");
/* harmony import */ var _module_AirPopover__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./module/AirPopover */ "./src/js/module/AirPopover.js");
/* harmony import */ var _module_HintPopover__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./module/HintPopover */ "./src/js/module/HintPopover.js");




























(jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote) = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend((jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote), {
  version: '@@VERSION@@',
  plugins: {},
  dom: _core_dom__WEBPACK_IMPORTED_MODULE_3__["default"],
  range: _core_range__WEBPACK_IMPORTED_MODULE_4__["default"],
  lists: _core_lists__WEBPACK_IMPORTED_MODULE_5__["default"],
  options: {
    langInfo: (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).lang['en-US'],
    editing: true,
    modules: {
      'editor': _module_Editor__WEBPACK_IMPORTED_MODULE_6__["default"],
      'clipboard': _module_Clipboard__WEBPACK_IMPORTED_MODULE_7__["default"],
      'dropzone': _module_Dropzone__WEBPACK_IMPORTED_MODULE_8__["default"],
      'codeview': _module_Codeview__WEBPACK_IMPORTED_MODULE_9__["default"],
      'statusbar': _module_Statusbar__WEBPACK_IMPORTED_MODULE_10__["default"],
      'fullscreen': _module_Fullscreen__WEBPACK_IMPORTED_MODULE_11__["default"],
      'handle': _module_Handle__WEBPACK_IMPORTED_MODULE_12__["default"],
      // FIXME: HintPopover must be front of autolink
      //  - Script error about range when Enter key is pressed on hint popover
      'hintPopover': _module_HintPopover__WEBPACK_IMPORTED_MODULE_27__["default"],
      'autoLink': _module_AutoLink__WEBPACK_IMPORTED_MODULE_13__["default"],
      'autoSync': _module_AutoSync__WEBPACK_IMPORTED_MODULE_14__["default"],
      'autoReplace': _module_AutoReplace__WEBPACK_IMPORTED_MODULE_15__["default"],
      'placeholder': _module_Placeholder__WEBPACK_IMPORTED_MODULE_16__["default"],
      'buttons': _module_Buttons__WEBPACK_IMPORTED_MODULE_17__["default"],
      'toolbar': _module_Toolbar__WEBPACK_IMPORTED_MODULE_18__["default"],
      'linkDialog': _module_LinkDialog__WEBPACK_IMPORTED_MODULE_19__["default"],
      'linkPopover': _module_LinkPopover__WEBPACK_IMPORTED_MODULE_20__["default"],
      'imageDialog': _module_ImageDialog__WEBPACK_IMPORTED_MODULE_21__["default"],
      'imagePopover': _module_ImagePopover__WEBPACK_IMPORTED_MODULE_22__["default"],
      'tablePopover': _module_TablePopover__WEBPACK_IMPORTED_MODULE_23__["default"],
      'videoDialog': _module_VideoDialog__WEBPACK_IMPORTED_MODULE_24__["default"],
      'helpDialog': _module_HelpDialog__WEBPACK_IMPORTED_MODULE_25__["default"],
      'airPopover': _module_AirPopover__WEBPACK_IMPORTED_MODULE_26__["default"]
    },
    buttons: {},
    lang: 'en-US',
    followingToolbar: false,
    toolbarPosition: 'top',
    otherStaticBar: '',
    // toolbar
    codeviewKeepButton: false,
    toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'clear']], ['fontname', ['fontname']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture', 'video']], ['view', ['fullscreen', 'codeview', 'help']]],
    // popover
    popatmouse: true,
    popover: {
      image: [['resize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']]],
      link: [['link', ['linkDialogShow', 'unlink']]],
      table: [['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']], ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]],
      air: [['color', ['color']], ['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture']], ['view', ['fullscreen', 'codeview']]]
    },
    // link options
    linkAddNoReferrer: false,
    addLinkNoOpener: false,
    // air mode: inline editor
    airMode: false,
    overrideContextMenu: false,
    // TBD

    width: null,
    height: null,
    linkTargetBlank: true,
    focus: false,
    tabDisable: false,
    tabSize: 4,
    styleWithCSS: false,
    shortcuts: true,
    textareaAutoSync: true,
    tooltip: 'auto',
    container: null,
    maxTextLength: 0,
    blockquoteBreakingLevel: 2,
    spellCheck: true,
    disableGrammar: false,
    placeholder: null,
    inheritPlaceholder: false,
    // TODO: need to be documented
    recordEveryKeystroke: false,
    historyLimit: 200,
    // TODO: need to be documented
    showDomainOnlyForAutolink: false,
    // TODO: need to be documented
    hintMode: 'word',
    hintSelect: 'after',
    hintDirection: 'bottom',
    styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande', 'Tahoma', 'Times New Roman', 'Verdana'],
    fontNamesIgnoreCheck: [],
    addDefaultFonts: true,
    fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
    fontSizeUnits: ['px', 'pt'],
    // pallete colors(n x n)
    colors: [['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'], ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'], ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'], ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'], ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'], ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'], ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'], ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']],
    // http://chir.ag/projects/name-that-color/
    colorsName: [['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'], ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'], ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'], ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'], ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'], ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'], ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'], ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou']],
    colorButton: {
      foreColor: '#000000',
      backColor: '#FFFF00'
    },
    lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
    tableClassName: 'table table-bordered',
    insertTableMaxSize: {
      col: 10,
      row: 10
    },
    // By default, dialogs are attached in container.
    dialogsInBody: false,
    dialogsFade: false,
    maximumImageFileSize: null,
    acceptImageFileTypes: "image/*",
    allowClipboardImagePasting: true,
    callbacks: {
      onBeforeCommand: null,
      onBlur: null,
      onBlurCodeview: null,
      onChange: null,
      onChangeCodeview: null,
      onDialogShown: null,
      onEnter: null,
      onFocus: null,
      onImageLinkInsert: null,
      onImageUpload: null,
      onImageUploadError: null,
      onInit: null,
      onKeydown: null,
      onKeyup: null,
      onMousedown: null,
      onMouseup: null,
      onPaste: null,
      onScroll: null
    },
    codemirror: {
      mode: 'text/html',
      htmlMode: true,
      lineNumbers: true
    },
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi,
    codeviewIframeFilter: true,
    codeviewIframeWhitelistSrc: [],
    codeviewIframeWhitelistSrcBase: ['www.youtube.com', 'www.youtube-nocookie.com', 'www.facebook.com', 'vine.co', 'instagram.com', 'player.vimeo.com', 'www.dailymotion.com', 'player.youku.com', 'jumpingbean.tv', 'v.qq.com'],
    keyMap: {
      pc: {
        'ESC': 'escape',
        'ENTER': 'insertParagraph',
        'CTRL+Z': 'undo',
        'CTRL+Y': 'redo',
        'TAB': 'tab',
        'SHIFT+TAB': 'untab',
        'CTRL+B': 'bold',
        'CTRL+I': 'italic',
        'CTRL+U': 'underline',
        'CTRL+SHIFT+S': 'strikethrough',
        'CTRL+BACKSLASH': 'removeFormat',
        'CTRL+SHIFT+L': 'justifyLeft',
        'CTRL+SHIFT+E': 'justifyCenter',
        'CTRL+SHIFT+R': 'justifyRight',
        'CTRL+SHIFT+J': 'justifyFull',
        'CTRL+SHIFT+NUM7': 'insertUnorderedList',
        'CTRL+SHIFT+NUM8': 'insertOrderedList',
        'CTRL+LEFTBRACKET': 'outdent',
        'CTRL+RIGHTBRACKET': 'indent',
        'CTRL+NUM0': 'formatPara',
        'CTRL+NUM1': 'formatH1',
        'CTRL+NUM2': 'formatH2',
        'CTRL+NUM3': 'formatH3',
        'CTRL+NUM4': 'formatH4',
        'CTRL+NUM5': 'formatH5',
        'CTRL+NUM6': 'formatH6',
        'CTRL+ENTER': 'insertHorizontalRule',
        'CTRL+K': 'linkDialog.show'
      },
      mac: {
        'ESC': 'escape',
        'ENTER': 'insertParagraph',
        'CMD+Z': 'undo',
        'CMD+SHIFT+Z': 'redo',
        'TAB': 'tab',
        'SHIFT+TAB': 'untab',
        'CMD+B': 'bold',
        'CMD+I': 'italic',
        'CMD+U': 'underline',
        'CMD+SHIFT+S': 'strikethrough',
        'CMD+BACKSLASH': 'removeFormat',
        'CMD+SHIFT+L': 'justifyLeft',
        'CMD+SHIFT+E': 'justifyCenter',
        'CMD+SHIFT+R': 'justifyRight',
        'CMD+SHIFT+J': 'justifyFull',
        'CMD+SHIFT+NUM7': 'insertUnorderedList',
        'CMD+SHIFT+NUM8': 'insertOrderedList',
        'CMD+LEFTBRACKET': 'outdent',
        'CMD+RIGHTBRACKET': 'indent',
        'CMD+NUM0': 'formatPara',
        'CMD+NUM1': 'formatH1',
        'CMD+NUM2': 'formatH2',
        'CMD+NUM3': 'formatH3',
        'CMD+NUM4': 'formatH4',
        'CMD+NUM5': 'formatH5',
        'CMD+NUM6': 'formatH6',
        'CMD+ENTER': 'insertHorizontalRule',
        'CMD+K': 'linkDialog.show'
      }
    },
    icons: {
      'align': 'note-icon-align',
      'alignCenter': 'note-icon-align-center',
      'alignJustify': 'note-icon-align-justify',
      'alignLeft': 'note-icon-align-left',
      'alignRight': 'note-icon-align-right',
      'rowBelow': 'note-icon-row-below',
      'colBefore': 'note-icon-col-before',
      'colAfter': 'note-icon-col-after',
      'rowAbove': 'note-icon-row-above',
      'rowRemove': 'note-icon-row-remove',
      'colRemove': 'note-icon-col-remove',
      'indent': 'note-icon-align-indent',
      'outdent': 'note-icon-align-outdent',
      'arrowsAlt': 'note-icon-arrows-alt',
      'bold': 'note-icon-bold',
      'caret': 'note-icon-caret',
      'circle': 'note-icon-circle',
      'close': 'note-icon-close',
      'code': 'note-icon-code',
      'eraser': 'note-icon-eraser',
      'floatLeft': 'note-icon-float-left',
      'floatRight': 'note-icon-float-right',
      'font': 'note-icon-font',
      'frame': 'note-icon-frame',
      'italic': 'note-icon-italic',
      'link': 'note-icon-link',
      'unlink': 'note-icon-chain-broken',
      'magic': 'note-icon-magic',
      'menuCheck': 'note-icon-menu-check',
      'minus': 'note-icon-minus',
      'orderedlist': 'note-icon-orderedlist',
      'pencil': 'note-icon-pencil',
      'picture': 'note-icon-picture',
      'question': 'note-icon-question',
      'redo': 'note-icon-redo',
      'rollback': 'note-icon-rollback',
      'square': 'note-icon-square',
      'strikethrough': 'note-icon-strikethrough',
      'subscript': 'note-icon-subscript',
      'superscript': 'note-icon-superscript',
      'table': 'note-icon-table',
      'textHeight': 'note-icon-text-height',
      'trash': 'note-icon-trash',
      'underline': 'note-icon-underline',
      'undo': 'note-icon-undo',
      'unorderedlist': 'note-icon-unorderedlist',
      'video': 'note-icon-video'
    }
  }
});

/***/ }),

/***/ "./src/js/summernote.js":
/*!******************************!*\
  !*** ./src/js/summernote.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/env */ "./src/js/core/env.js");
/* harmony import */ var _core_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/lists */ "./src/js/core/lists.js");
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Context */ "./src/js/Context.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.extend({
  /**
   * Summernote API
   *
   * @param {Object|String}
   * @return {this}
   */
  summernote: function summernote() {
    var type = _typeof(_core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(arguments));
    var isExternalAPICalled = type === 'string';
    var hasInitOptions = type === 'object';
    var options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).options, hasInitOptions ? _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].head(arguments) : {});

    // Update options
    options.langInfo = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, {}, (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).lang['en-US'], (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).lang[options.lang]);
    options.icons = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, {}, (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).options.icons, options.icons);
    options.tooltip = options.tooltip === 'auto' ? !_core_env__WEBPACK_IMPORTED_MODULE_1__["default"].isSupportTouch : options.tooltip;
    this.each(function (idx, note) {
      var $note = jquery__WEBPACK_IMPORTED_MODULE_0___default()(note);
      if (!$note.data('summernote')) {
        var context = new _Context__WEBPACK_IMPORTED_MODULE_3__["default"]($note, options);
        $note.data('summernote', context);
        $note.data('summernote').triggerEvent('init', context.layoutInfo);
      }
    });
    var $note = this.first();
    if ($note.length) {
      var context = $note.data('summernote');
      if (isExternalAPICalled) {
        return context.invoke.apply(context, _core_lists__WEBPACK_IMPORTED_MODULE_2__["default"].from(arguments));
      } else if (options.focus) {
        context.invoke('editor.focus');
      }
    }
    return this;
  }
});

/***/ }),

/***/ "./src/lang/summernote-en-US.js":
/*!**************************************!*\
  !*** ./src/lang/summernote-en-US.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

(jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote) = (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote) || {
  lang: {}
};
jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, (jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).lang, {
  'en-US': {
    font: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      clear: 'Remove Font Style',
      height: 'Line Height',
      name: 'Font Family',
      strikethrough: 'Strikethrough',
      subscript: 'Subscript',
      superscript: 'Superscript',
      size: 'Font Size',
      sizeunit: 'Font Size Unit'
    },
    image: {
      image: 'Picture',
      insert: 'Insert Image',
      resizeFull: 'Resize full',
      resizeHalf: 'Resize half',
      resizeQuarter: 'Resize quarter',
      resizeNone: 'Original size',
      floatLeft: 'Float Left',
      floatRight: 'Float Right',
      floatNone: 'Remove float',
      shapeRounded: 'Shape: Rounded',
      shapeCircle: 'Shape: Circle',
      shapeThumbnail: 'Shape: Thumbnail',
      shapeNone: 'Shape: None',
      dragImageHere: 'Drag image or text here',
      dropImage: 'Drop image or Text',
      selectFromFiles: 'Select from files',
      maximumFileSize: 'Maximum file size',
      maximumFileSizeError: 'Maximum file size exceeded.',
      url: 'Image URL',
      remove: 'Remove Image',
      original: 'Original'
    },
    video: {
      video: 'Video',
      videoLink: 'Video Link',
      insert: 'Insert Video',
      url: 'Video URL',
      providers: '(YouTube, Google Drive, Vimeo, Vine, Instagram, DailyMotion, Youku, Peertube)'
    },
    link: {
      link: 'Link',
      insert: 'Insert Link',
      unlink: 'Unlink',
      edit: 'Edit',
      textToDisplay: 'Text to display',
      url: 'To what URL should this link go?',
      openInNewWindow: 'Open in new window'
    },
    table: {
      table: 'Table',
      addRowAbove: 'Add row above',
      addRowBelow: 'Add row below',
      addColLeft: 'Add column left',
      addColRight: 'Add column right',
      delRow: 'Delete row',
      delCol: 'Delete column',
      delTable: 'Delete table'
    },
    hr: {
      insert: 'Insert Horizontal Rule'
    },
    style: {
      style: 'Style',
      p: 'Normal',
      blockquote: 'Quote',
      pre: 'Code',
      h1: 'Header 1',
      h2: 'Header 2',
      h3: 'Header 3',
      h4: 'Header 4',
      h5: 'Header 5',
      h6: 'Header 6'
    },
    lists: {
      unordered: 'Unordered list',
      ordered: 'Ordered list'
    },
    options: {
      help: 'Help',
      fullscreen: 'Full Screen',
      codeview: 'Code View'
    },
    paragraph: {
      paragraph: 'Paragraph',
      outdent: 'Outdent',
      indent: 'Indent',
      left: 'Align left',
      center: 'Align center',
      right: 'Align right',
      justify: 'Justify full'
    },
    color: {
      recent: 'Recent Color',
      more: 'More Color',
      background: 'Background Color',
      foreground: 'Text Color',
      transparent: 'Transparent',
      setTransparent: 'Set transparent',
      reset: 'Reset',
      resetToDefault: 'Reset to default',
      cpSelect: 'Select'
    },
    shortcut: {
      shortcuts: 'Keyboard shortcuts',
      close: 'Close',
      textFormatting: 'Text formatting',
      action: 'Action',
      paragraphFormatting: 'Paragraph formatting',
      documentStyle: 'Document Style',
      extraKeys: 'Extra keys'
    },
    help: {
      'escape': 'Escape',
      'insertParagraph': 'Insert Paragraph',
      'undo': 'Undo the last command',
      'redo': 'Redo the last command',
      'tab': 'Tab',
      'untab': 'Untab',
      'bold': 'Set a bold style',
      'italic': 'Set a italic style',
      'underline': 'Set a underline style',
      'strikethrough': 'Set a strikethrough style',
      'removeFormat': 'Clean a style',
      'justifyLeft': 'Set left align',
      'justifyCenter': 'Set center align',
      'justifyRight': 'Set right align',
      'justifyFull': 'Set full align',
      'insertUnorderedList': 'Toggle unordered list',
      'insertOrderedList': 'Toggle ordered list',
      'outdent': 'Outdent on current paragraph',
      'indent': 'Indent on current paragraph',
      'formatPara': 'Change current block\'s format as a paragraph(P tag)',
      'formatH1': 'Change current block\'s format as H1',
      'formatH2': 'Change current block\'s format as H2',
      'formatH3': 'Change current block\'s format as H3',
      'formatH4': 'Change current block\'s format as H4',
      'formatH5': 'Change current block\'s format as H5',
      'formatH6': 'Change current block\'s format as H6',
      'insertHorizontalRule': 'Insert horizontal rule',
      'linkDialog.show': 'Show Link Dialog'
    },
    history: {
      undo: 'Undo',
      redo: 'Redo'
    },
    specialChar: {
      specialChar: 'SPECIAL CHARACTERS',
      select: 'Select Special characters'
    },
    output: {
      noSelection: 'No Selection Made!'
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/bs4/summernote-bs4.scss":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/bs4/summernote-bs4.scss ***!
  \********************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../summernote/font/summernote.eot */ "./src/styles/summernote/font/summernote.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../summernote/font/summernote.woff2 */ "./src/styles/summernote/font/summernote.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../summernote/font/summernote.woff */ "./src/styles/summernote/font/summernote.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../summernote/font/summernote.ttf */ "./src/styles/summernote/font/summernote.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC */ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC */ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: "summernote";
  font-style: normal;
  font-weight: 400;
  font-display: auto;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("woff2"), url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format("truetype");
}
[class^=note-icon]:before,
[class*=" note-icon"]:before {
  display: inline-block;
  font-family: "summernote";
  font-style: normal;
  font-size: inherit;
  text-decoration: inherit;
  text-rendering: auto;
  text-transform: none;
  vertical-align: middle;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  speak: none;
}

.note-icon-fw {
  text-align: center;
  width: 1.25em;
}

.note-icon-border {
  border: solid 0.08em #eee;
  border-radius: 0.1em;
  padding: 0.2em 0.25em 0.15em;
}

.note-icon-pull-left {
  float: left;
}

.note-icon-pull-right {
  float: right;
}

.note-icon.note-icon-pull-left {
  margin-right: 0.3em;
}
.note-icon.note-icon-pull-right {
  margin-left: 0.3em;
}

.note-icon-align::before {
  content: "\\ea01";
}

.note-icon-align-center::before {
  content: "\\ea02";
}

.note-icon-align-indent::before {
  content: "\\ea03";
}

.note-icon-align-justify::before {
  content: "\\ea04";
}

.note-icon-align-left::before {
  content: "\\ea05";
}

.note-icon-align-outdent::before {
  content: "\\ea06";
}

.note-icon-align-right::before {
  content: "\\ea07";
}

.note-icon-arrow-circle-down::before {
  content: "\\ea08";
}

.note-icon-arrow-circle-left::before {
  content: "\\ea09";
}

.note-icon-arrow-circle-right::before {
  content: "\\ea0a";
}

.note-icon-arrow-circle-up::before {
  content: "\\ea0b";
}

.note-icon-arrows-alt::before {
  content: "\\ea0c";
}

.note-icon-arrows-h::before {
  content: "\\ea0d";
}

.note-icon-arrows-v::before {
  content: "\\ea0e";
}

.note-icon-bold::before {
  content: "\\ea0f";
}

.note-icon-caret::before {
  content: "\\ea10";
}

.note-icon-chain-broken::before {
  content: "\\ea11";
}

.note-icon-circle::before {
  content: "\\ea12";
}

.note-icon-close::before {
  content: "\\ea13";
}

.note-icon-code::before {
  content: "\\ea14";
}

.note-icon-col-after::before {
  content: "\\ea15";
}

.note-icon-col-before::before {
  content: "\\ea16";
}

.note-icon-col-remove::before {
  content: "\\ea17";
}

.note-icon-eraser::before {
  content: "\\ea18";
}

.note-icon-float-left::before {
  content: "\\ea19";
}

.note-icon-float-none::before {
  content: "\\ea1a";
}

.note-icon-float-right::before {
  content: "\\ea1b";
}

.note-icon-font::before {
  content: "\\ea1c";
}

.note-icon-frame::before {
  content: "\\ea1d";
}

.note-icon-italic::before {
  content: "\\ea1e";
}

.note-icon-link::before {
  content: "\\ea1f";
}

.note-icon-magic::before {
  content: "\\ea20";
}

.note-icon-menu-check::before {
  content: "\\ea21";
}

.note-icon-minus::before {
  content: "\\ea22";
}

.note-icon-orderedlist::before {
  content: "\\ea23";
}

.note-icon-pencil::before {
  content: "\\ea24";
}

.note-icon-picture::before {
  content: "\\ea25";
}

.note-icon-question::before {
  content: "\\ea26";
}

.note-icon-redo::before {
  content: "\\ea27";
}

.note-icon-rollback::before {
  content: "\\ea28";
}

.note-icon-row-above::before {
  content: "\\ea29";
}

.note-icon-row-below::before {
  content: "\\ea2a";
}

.note-icon-row-remove::before {
  content: "\\ea2b";
}

.note-icon-special-character::before {
  content: "\\ea2c";
}

.note-icon-square::before {
  content: "\\ea2d";
}

.note-icon-strikethrough::before {
  content: "\\ea2e";
}

.note-icon-subscript::before {
  content: "\\ea2f";
}

.note-icon-summernote::before {
  content: "\\ea30";
}

.note-icon-superscript::before {
  content: "\\ea31";
}

.note-icon-table::before {
  content: "\\ea32";
}

.note-icon-text-height::before {
  content: "\\ea33";
}

.note-icon-trash::before {
  content: "\\ea34";
}

.note-icon-underline::before {
  content: "\\ea35";
}

.note-icon-undo::before {
  content: "\\ea36";
}

.note-icon-unorderedlist::before {
  content: "\\ea37";
}

.note-icon-video::before {
  content: "\\ea38";
}

/* Theme Variables
 ------------------------------------------ */
/* Layout
 ------------------------------------------ */
.note-editor {
  position: relative;
}
.note-editor .note-dropzone {
  position: absolute;
  display: none;
  z-index: 100;
  color: lightskyblue;
  background-color: #fff;
  opacity: 0.95;
}
.note-editor .note-dropzone .note-dropzone-message {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
}
.note-editor .note-dropzone.hover {
  color: #098ddf;
}
.note-editor.dragover .note-dropzone {
  display: table;
}
.note-editor .note-editing-area {
  position: relative;
}
.note-editor .note-editing-area .note-editable {
  outline: none;
}
.note-editor .note-editing-area .note-editable sup {
  vertical-align: super;
}
.note-editor .note-editing-area .note-editable sub {
  vertical-align: sub;
}
.note-editor .note-editing-area .note-editable img.note-float-left {
  margin-right: 10px;
}
.note-editor .note-editing-area .note-editable img.note-float-right {
  margin-left: 10px;
}

/* Frame mode layout
 ------------------------------------------ */
.note-editor.note-frame,
.note-editor.note-airframe {
  border: 1px solid rgba(0, 0, 0, 0.1960784314);
}
.note-editor.note-frame.codeview .note-editing-area .note-editable,
.note-editor.note-airframe.codeview .note-editing-area .note-editable {
  display: none;
}
.note-editor.note-frame.codeview .note-editing-area .note-codable,
.note-editor.note-airframe.codeview .note-editing-area .note-codable {
  display: block;
}
.note-editor.note-frame .note-editing-area,
.note-editor.note-airframe .note-editing-area {
  overflow: hidden;
}
.note-editor.note-frame .note-editing-area .note-editable,
.note-editor.note-airframe .note-editing-area .note-editable {
  padding: 10px;
  overflow: auto;
  word-wrap: break-word;
}
.note-editor.note-frame .note-editing-area .note-editable[contenteditable=false],
.note-editor.note-airframe .note-editing-area .note-editable[contenteditable=false] {
  background-color: rgba(128, 128, 128, 0.1137254902);
}
.note-editor.note-frame .note-editing-area .note-codable,
.note-editor.note-airframe .note-editing-area .note-codable {
  display: none;
  width: 100%;
  padding: 10px;
  border: none;
  box-shadow: none;
  font-family: Menlo, Monaco, monospace, sans-serif;
  font-size: 14px;
  color: #ccc;
  background-color: #222;
  resize: none;
  outline: none;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  margin-bottom: 0;
}
.note-editor.note-frame.fullscreen,
.note-editor.note-airframe.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: 1050;
}
.note-editor.note-frame.fullscreen .note-resizebar,
.note-editor.note-airframe.fullscreen .note-resizebar {
  display: none;
}
.note-editor.note-frame .note-status-output,
.note-editor.note-airframe .note-status-output {
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 1.42857143;
  height: 20px;
  margin-bottom: 0;
  color: #000;
  border: 0;
  border-top: 1px solid #e2e2e2;
}
.note-editor.note-frame .note-status-output:empty,
.note-editor.note-airframe .note-status-output:empty {
  height: 0;
  border-top: 0 solid transparent;
}
.note-editor.note-frame .note-status-output .pull-right,
.note-editor.note-airframe .note-status-output .pull-right {
  float: right !important;
}
.note-editor.note-frame .note-status-output .text-muted,
.note-editor.note-airframe .note-status-output .text-muted {
  color: #777;
}
.note-editor.note-frame .note-status-output .text-primary,
.note-editor.note-airframe .note-status-output .text-primary {
  color: #286090;
}
.note-editor.note-frame .note-status-output .text-success,
.note-editor.note-airframe .note-status-output .text-success {
  color: #3c763d;
}
.note-editor.note-frame .note-status-output .text-info,
.note-editor.note-airframe .note-status-output .text-info {
  color: #31708f;
}
.note-editor.note-frame .note-status-output .text-warning,
.note-editor.note-airframe .note-status-output .text-warning {
  color: #8a6d3b;
}
.note-editor.note-frame .note-status-output .text-danger,
.note-editor.note-airframe .note-status-output .text-danger {
  color: #a94442;
}
.note-editor.note-frame .note-status-output .alert,
.note-editor.note-airframe .note-status-output .alert {
  margin: -7px 0 0 0;
  padding: 7px 10px 2px 10px;
  border-radius: 0;
  color: #000;
  background-color: #f5f5f5;
}
.note-editor.note-frame .note-status-output .alert .note-icon,
.note-editor.note-airframe .note-status-output .alert .note-icon {
  margin-right: 5px;
}
.note-editor.note-frame .note-status-output .alert-success,
.note-editor.note-airframe .note-status-output .alert-success {
  color: #3c763d !important;
  background-color: #dff0d8 !important;
}
.note-editor.note-frame .note-status-output .alert-info,
.note-editor.note-airframe .note-status-output .alert-info {
  color: #31708f !important;
  background-color: #d9edf7 !important;
}
.note-editor.note-frame .note-status-output .alert-warning,
.note-editor.note-airframe .note-status-output .alert-warning {
  color: #8a6d3b !important;
  background-color: #fcf8e3 !important;
}
.note-editor.note-frame .note-status-output .alert-danger,
.note-editor.note-airframe .note-status-output .alert-danger {
  color: #a94442 !important;
  background-color: #f2dede !important;
}
.note-editor.note-frame .note-statusbar,
.note-editor.note-airframe .note-statusbar {
  background-color: rgba(128, 128, 128, 0.1137254902);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.1960784314);
}
.note-editor.note-frame .note-statusbar .note-resizebar,
.note-editor.note-airframe .note-statusbar .note-resizebar {
  padding-top: 1px;
  height: 9px;
  width: 100%;
  cursor: ns-resize;
}
.note-editor.note-frame .note-statusbar .note-resizebar .note-icon-bar,
.note-editor.note-airframe .note-statusbar .note-resizebar .note-icon-bar {
  width: 20px;
  margin: 1px auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1960784314);
}
.note-editor.note-frame .note-statusbar.locked .note-resizebar,
.note-editor.note-airframe .note-statusbar.locked .note-resizebar {
  cursor: default;
}
.note-editor.note-frame .note-statusbar.locked .note-resizebar .note-icon-bar,
.note-editor.note-airframe .note-statusbar.locked .note-resizebar .note-icon-bar {
  display: none;
}
.note-editor.note-frame .note-placeholder,
.note-editor.note-airframe .note-placeholder {
  padding: 10px;
}

.note-editor.note-airframe {
  border: 0;
}
.note-editor.note-airframe .note-editing-area .note-editable {
  padding: 0;
}

/* Popover
 ------------------------------------------ */
.note-popover.popover {
  display: none;
  max-width: none;
}
.note-popover.popover .popover-content a {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.note-popover.popover .arrow {
  left: 20px !important;
}

/* Popover and Toolbar (Button container)
 ------------------------------------------ */
.note-toolbar {
  position: relative;
}

.note-popover .popover-content, .note-editor .note-toolbar {
  margin: 0;
  padding: 0 0 5px 5px;
}
.note-popover .popover-content > .note-btn-group, .note-editor .note-toolbar > .note-btn-group {
  margin-top: 5px;
  margin-left: 0;
  margin-right: 5px;
}
.note-popover .popover-content .note-btn-group .note-table, .note-editor .note-toolbar .note-btn-group .note-table {
  min-width: 0;
  padding: 5px;
}
.note-popover .popover-content .note-btn-group .note-table .note-dimension-picker, .note-editor .note-toolbar .note-btn-group .note-table .note-dimension-picker {
  font-size: 18px;
}
.note-popover .popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-mousecatcher, .note-editor .note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-mousecatcher {
  position: absolute !important;
  z-index: 3;
  width: 10em;
  height: 10em;
  cursor: pointer;
}
.note-popover .popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-unhighlighted, .note-editor .note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-unhighlighted {
  position: relative !important;
  z-index: 1;
  width: 5em;
  height: 5em;
  background: url(${___CSS_LOADER_URL_REPLACEMENT_4___}) repeat;
}
.note-popover .popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-highlighted, .note-editor .note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-highlighted {
  position: absolute !important;
  z-index: 2;
  width: 1em;
  height: 1em;
  background: url(${___CSS_LOADER_URL_REPLACEMENT_5___}) repeat;
}
.note-popover .popover-content .note-style .dropdown-style blockquote, .note-popover .popover-content .note-style .dropdown-style pre, .note-editor .note-toolbar .note-style .dropdown-style blockquote, .note-editor .note-toolbar .note-style .dropdown-style pre {
  margin: 0;
  padding: 5px 10px;
}
.note-popover .popover-content .note-style .dropdown-style h1, .note-popover .popover-content .note-style .dropdown-style h2, .note-popover .popover-content .note-style .dropdown-style h3, .note-popover .popover-content .note-style .dropdown-style h4, .note-popover .popover-content .note-style .dropdown-style h5, .note-popover .popover-content .note-style .dropdown-style h6, .note-popover .popover-content .note-style .dropdown-style p, .note-editor .note-toolbar .note-style .dropdown-style h1, .note-editor .note-toolbar .note-style .dropdown-style h2, .note-editor .note-toolbar .note-style .dropdown-style h3, .note-editor .note-toolbar .note-style .dropdown-style h4, .note-editor .note-toolbar .note-style .dropdown-style h5, .note-editor .note-toolbar .note-style .dropdown-style h6, .note-editor .note-toolbar .note-style .dropdown-style p {
  margin: 0;
  padding: 0;
}
.note-popover .popover-content .note-color-all .note-dropdown-menu, .note-editor .note-toolbar .note-color-all .note-dropdown-menu {
  min-width: 337px;
}
.note-popover .popover-content .note-color .dropdown-toggle, .note-editor .note-toolbar .note-color .dropdown-toggle {
  width: 20px;
  padding-left: 5px;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette {
  display: inline-block;
  margin: 0;
  width: 160px;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette:first-child, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette:first-child {
  margin: 0 5px;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-palette-title, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-palette-title {
  font-size: 12px;
  margin: 2px 7px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-color-reset,
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-color-select, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-reset,
.note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select {
  font-size: 11px;
  margin: 3px;
  padding: 0 3px;
  cursor: pointer;
  width: 100%;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-color-reset:hover,
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-color-select:hover, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-reset:hover,
.note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select:hover {
  background: #eee;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-color-row, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-row {
  height: 20px;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-color-select-btn, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select-btn {
  display: none;
}
.note-popover .popover-content .note-color .note-dropdown-menu .note-palette .note-holder-custom .note-color-btn, .note-editor .note-toolbar .note-color .note-dropdown-menu .note-palette .note-holder-custom .note-color-btn {
  border: 1px solid #eee;
}
.note-popover .popover-content .note-para .note-dropdown-menu, .note-editor .note-toolbar .note-para .note-dropdown-menu {
  min-width: 228px;
  padding: 5px;
}
.note-popover .popover-content .note-para .note-dropdown-menu > div + div, .note-editor .note-toolbar .note-para .note-dropdown-menu > div + div {
  margin-left: 5px;
}
.note-popover .popover-content .note-dropdown-menu, .note-editor .note-toolbar .note-dropdown-menu {
  min-width: 160px;
}
.note-popover .popover-content .note-dropdown-menu.right, .note-editor .note-toolbar .note-dropdown-menu.right {
  right: 0;
  left: auto;
}
.note-popover .popover-content .note-dropdown-menu.right::before, .note-editor .note-toolbar .note-dropdown-menu.right::before {
  right: 9px;
  left: auto !important;
}
.note-popover .popover-content .note-dropdown-menu.right::after, .note-editor .note-toolbar .note-dropdown-menu.right::after {
  right: 10px;
  left: auto !important;
}
.note-popover .popover-content .note-dropdown-menu.note-check a i, .note-editor .note-toolbar .note-dropdown-menu.note-check a i {
  color: deepskyblue;
  visibility: hidden;
}
.note-popover .popover-content .note-dropdown-menu.note-check a.checked i, .note-editor .note-toolbar .note-dropdown-menu.note-check a.checked i {
  visibility: visible;
}
.note-popover .popover-content .note-fontsize-10, .note-editor .note-toolbar .note-fontsize-10 {
  font-size: 10px;
}
.note-popover .popover-content .note-color-palette, .note-editor .note-toolbar .note-color-palette {
  line-height: 1;
}
.note-popover .popover-content .note-color-palette div .note-color-btn, .note-editor .note-toolbar .note-color-palette div .note-color-btn {
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
}
.note-popover .popover-content .note-color-palette div .note-color-btn:hover, .note-editor .note-toolbar .note-color-palette div .note-color-btn:hover {
  transform: scale(1.2);
  transition: all 0.2s;
}

/* Dialog
 ------------------------------------------ */
.note-modal .modal-dialog {
  outline: 0;
  border-radius: 5px;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}
.note-modal .form-group {
  margin-left: 0;
  margin-right: 0;
}
.note-modal .note-modal-form {
  margin: 0;
}
.note-modal .note-image-dialog .note-dropzone {
  min-height: 100px;
  font-size: 30px;
  line-height: 4;
  color: lightgray;
  text-align: center;
  border: 4px dashed lightgray;
  margin-bottom: 10px;
}
@-moz-document url-prefix() {
  .note-modal .note-image-input {
    height: auto;
  }
}

/* Placeholder
 ------------------------------------------ */
.note-placeholder {
  position: absolute;
  display: none;
  color: gray;
}

/* Handle
 ------------------------------------------ */
.note-handle .note-control-selection {
  position: absolute;
  display: none;
  border: 1px solid #000;
}
.note-handle .note-control-selection > div {
  position: absolute;
}
.note-handle .note-control-selection .note-control-selection-bg {
  width: 100%;
  height: 100%;
  background-color: #000;
  -webkit-opacity: 0.3;
  -khtml-opacity: 0.3;
  -moz-opacity: 0.3;
  opacity: 0.3;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=30);
  filter: alpha(opacity=30);
}
.note-handle .note-control-selection .note-control-handle, .note-handle .note-control-selection .note-control-sizing, .note-handle .note-control-selection .note-control-holder {
  width: 7px;
  height: 7px;
  border: 1px solid #000;
}
.note-handle .note-control-selection .note-control-sizing {
  background-color: #000;
}
.note-handle .note-control-selection .note-control-nw {
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
}
.note-handle .note-control-selection .note-control-ne {
  top: -5px;
  right: -5px;
  border-bottom: none;
  border-left: none;
}
.note-handle .note-control-selection .note-control-sw {
  bottom: -5px;
  left: -5px;
  border-top: none;
  border-right: none;
}
.note-handle .note-control-selection .note-control-se {
  right: -5px;
  bottom: -5px;
  cursor: se-resize;
}
.note-handle .note-control-selection .note-control-se.note-control-holder {
  cursor: default;
  border-top: none;
  border-left: none;
}
.note-handle .note-control-selection .note-control-selection-info {
  right: 0;
  bottom: 0;
  padding: 5px;
  margin: 5px;
  color: #fff;
  background-color: #000;
  font-size: 12px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-opacity: 0.7;
  -khtml-opacity: 0.7;
  -moz-opacity: 0.7;
  opacity: 0.7;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
  filter: alpha(opacity=70);
}

.note-hint-popover {
  min-width: 100px;
  padding: 2px;
}
.note-hint-popover .popover-content {
  padding: 3px;
  max-height: 150px;
  overflow: auto;
}
.note-hint-popover .popover-content .note-hint-group .note-hint-item {
  display: block !important;
  padding: 3px;
}
.note-hint-popover .popover-content .note-hint-group .note-hint-item.active, .note-hint-popover .popover-content .note-hint-group .note-hint-item:hover {
  display: block;
  clear: both;
  font-weight: 400;
  line-height: 1.4;
  color: white;
  white-space: nowrap;
  text-decoration: none;
  background-color: #428bca;
  outline: 0;
  cursor: pointer;
}

/* Handle
 ------------------------------------------ */
html .note-fullscreen-body, body .note-fullscreen-body {
  overflow: hidden !important;
}

.note-editable ul li, .note-editable ol li {
  list-style-position: inside;
}

.note-toolbar {
  background: rgba(128, 128, 128, 0.1137254902);
}

.note-btn-group .note-btn {
  border-color: rgba(0, 0, 0, 0.1960784314);
  padding: 0.28rem 0.65rem;
  font-size: 13px;
}`, "",{"version":3,"sources":["webpack://./src/styles/summernote/font.scss","webpack://./src/styles/bs4/summernote-bs4.scss","webpack://./src/styles/summernote/common.scss","webpack://./src/styles/summernote/elements.scss"],"names":[],"mappings":"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","sourcesContent":["// Variables\n\n$sni-css-prefix: note-icon !default;\n\n// Path\n\n@font-face {\n  font-family: \"summernote\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: auto;\n  src: url(\"./font/summernote.eot?#iefix\") format(\"embedded-opentype\"), url(\"./font/summernote.woff2\") format(\"woff2\"), url(\"./font/summernote.woff\") format(\"woff\"), url(\"./font/summernote.ttf\") format(\"truetype\");}\n\n// Core\n\n[class^=\"#{$sni-css-prefix}\"]:before,\n[class*=\" #{$sni-css-prefix}\"]:before {\n  display: inline-block;\n  font-family: \"summernote\";\n  font-style: normal;\n  font-size: inherit;\n  text-decoration: inherit;\n  text-rendering: auto;\n  text-transform: none;\n  vertical-align: middle;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  speak: none;\n}\n\n// Extras\n\n.#{$sni-css-prefix}-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.#{$sni-css-prefix}-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.#{$sni-css-prefix}-pull-left {\n  float: left;\n}\n\n.#{$sni-css-prefix}-pull-right {\n  float: right;\n}\n\n.#{$sni-css-prefix} {\n  &.#{$sni-css-prefix}-pull-left {\n    margin-right: 0.3em;\n  }\n  &.#{$sni-css-prefix}-pull-right {\n    margin-left: 0.3em;\n  }\n}\n\n// Functions\n\n@function char($character-code) {\n  @if function-exists(\"selector-append\") {\n    @return unquote(\"\\\"\\\\#{$character-code}\\\"\");\n  }\n\n  @if \"\\\\#{'x'}\" == \"\\\\x\" {\n    @return str-slice(\"\\x\", 1, 1) + $character-code;\n  }\n  @else {\n    @return #{\"\\\"\\\\\"}#{$character-code + \"\\\"\"};\n  }\n}\n\n// Icons\n\n\n.note-icon-align::before {\n  content: \"\\ea01\";\n}\n\n.note-icon-align-center::before {\n  content: \"\\ea02\";\n}\n\n.note-icon-align-indent::before {\n  content: \"\\ea03\";\n}\n\n.note-icon-align-justify::before {\n  content: \"\\ea04\";\n}\n\n.note-icon-align-left::before {\n  content: \"\\ea05\";\n}\n\n.note-icon-align-outdent::before {\n  content: \"\\ea06\";\n}\n\n.note-icon-align-right::before {\n  content: \"\\ea07\";\n}\n\n.note-icon-arrow-circle-down::before {\n  content: \"\\ea08\";\n}\n\n.note-icon-arrow-circle-left::before {\n  content: \"\\ea09\";\n}\n\n.note-icon-arrow-circle-right::before {\n  content: \"\\ea0a\";\n}\n\n.note-icon-arrow-circle-up::before {\n  content: \"\\ea0b\";\n}\n\n.note-icon-arrows-alt::before {\n  content: \"\\ea0c\";\n}\n\n.note-icon-arrows-h::before {\n  content: \"\\ea0d\";\n}\n\n.note-icon-arrows-v::before {\n  content: \"\\ea0e\";\n}\n\n.note-icon-bold::before {\n  content: \"\\ea0f\";\n}\n\n.note-icon-caret::before {\n  content: \"\\ea10\";\n}\n\n.note-icon-chain-broken::before {\n  content: \"\\ea11\";\n}\n\n.note-icon-circle::before {\n  content: \"\\ea12\";\n}\n\n.note-icon-close::before {\n  content: \"\\ea13\";\n}\n\n.note-icon-code::before {\n  content: \"\\ea14\";\n}\n\n.note-icon-col-after::before {\n  content: \"\\ea15\";\n}\n\n.note-icon-col-before::before {\n  content: \"\\ea16\";\n}\n\n.note-icon-col-remove::before {\n  content: \"\\ea17\";\n}\n\n.note-icon-eraser::before {\n  content: \"\\ea18\";\n}\n\n.note-icon-float-left::before {\n  content: \"\\ea19\";\n}\n\n.note-icon-float-none::before {\n  content: \"\\ea1a\";\n}\n\n.note-icon-float-right::before {\n  content: \"\\ea1b\";\n}\n\n.note-icon-font::before {\n  content: \"\\ea1c\";\n}\n\n.note-icon-frame::before {\n  content: \"\\ea1d\";\n}\n\n.note-icon-italic::before {\n  content: \"\\ea1e\";\n}\n\n.note-icon-link::before {\n  content: \"\\ea1f\";\n}\n\n.note-icon-magic::before {\n  content: \"\\ea20\";\n}\n\n.note-icon-menu-check::before {\n  content: \"\\ea21\";\n}\n\n.note-icon-minus::before {\n  content: \"\\ea22\";\n}\n\n.note-icon-orderedlist::before {\n  content: \"\\ea23\";\n}\n\n.note-icon-pencil::before {\n  content: \"\\ea24\";\n}\n\n.note-icon-picture::before {\n  content: \"\\ea25\";\n}\n\n.note-icon-question::before {\n  content: \"\\ea26\";\n}\n\n.note-icon-redo::before {\n  content: \"\\ea27\";\n}\n\n.note-icon-rollback::before {\n  content: \"\\ea28\";\n}\n\n.note-icon-row-above::before {\n  content: \"\\ea29\";\n}\n\n.note-icon-row-below::before {\n  content: \"\\ea2a\";\n}\n\n.note-icon-row-remove::before {\n  content: \"\\ea2b\";\n}\n\n.note-icon-special-character::before {\n  content: \"\\ea2c\";\n}\n\n.note-icon-square::before {\n  content: \"\\ea2d\";\n}\n\n.note-icon-strikethrough::before {\n  content: \"\\ea2e\";\n}\n\n.note-icon-subscript::before {\n  content: \"\\ea2f\";\n}\n\n.note-icon-summernote::before {\n  content: \"\\ea30\";\n}\n\n.note-icon-superscript::before {\n  content: \"\\ea31\";\n}\n\n.note-icon-table::before {\n  content: \"\\ea32\";\n}\n\n.note-icon-text-height::before {\n  content: \"\\ea33\";\n}\n\n.note-icon-trash::before {\n  content: \"\\ea34\";\n}\n\n.note-icon-underline::before {\n  content: \"\\ea35\";\n}\n\n.note-icon-undo::before {\n  content: \"\\ea36\";\n}\n\n.note-icon-unorderedlist::before {\n  content: \"\\ea37\";\n}\n\n.note-icon-video::before {\n  content: \"\\ea38\";\n}\n\n","@import '../summernote/font.scss';\n@import '../summernote/common.scss';\n\n.note-toolbar {\n  background: $background-color;\n}\n\n.note-btn-group .note-btn {\n  border-color: $border-color;\n  padding: 0.28rem 0.65rem;\n  font-size: 13px;\n}\n","@import \"elements.scss\";\n\n/* Theme Variables\n ------------------------------------------ */\n$border-color: #00000032;\n$background-color: #8080801d;\n\n$img-margin-left: 10px;\n$img-margin-right: 10px;\n\n/* Layout\n ------------------------------------------ */\n.note-editor {\n  position: relative;\n\n  // dropzone\n  $dropzone-color: lightskyblue;\n  $dropzone-active-color: darken($dropzone-color, 30);\n  .note-dropzone {\n    position: absolute;\n    display: none;\n    z-index: 100;\n    color: $dropzone-color;\n    background-color: #fff;\n    opacity: 0.95;\n\n    .note-dropzone-message {\n      display: table-cell;\n      vertical-align: middle;\n      text-align: center;\n      font-size: 28px;\n      font-weight: 700;\n    }\n\n    &.hover {\n      color: $dropzone-active-color;\n    }\n  }\n\n  &.dragover .note-dropzone {\n    display: table;\n  }\n\n  .note-editing-area {\n    position: relative;\n\n    .note-editable {\n      outline: none;\n\n      sup {\n        vertical-align: super;\n      }\n\n      sub {\n        vertical-align: sub;\n      }\n\n      img.note-float-left {\n        margin-right: $img-margin-right;\n      }\n\n      img.note-float-right {\n        margin-left: $img-margin-left;\n      }\n    }\n  }\n}\n\n/* Frame mode layout\n ------------------------------------------ */\n.note-editor.note-frame,\n.note-editor.note-airframe {\n  border: 1px solid $border-color;\n\n  // codeview mode\n  &.codeview {\n    .note-editing-area {\n      .note-editable {\n        display: none;\n      }\n      .note-codable {\n        display: block;\n      }\n    }\n  }\n\n  .note-editing-area {\n    overflow: hidden;\n\n    // editable\n    .note-editable {\n      padding: 10px;\n      overflow: auto;\n      word-wrap: break-word;\n\n      &[contenteditable=\"false\"] {\n        background-color: $background-color;\n      }\n    }\n\n    // codeable\n    .note-codable {\n      display: none;\n      width: 100%;\n      padding: 10px;\n      border: none;\n      box-shadow: none;\n      font-family: Menlo, Monaco, monospace, sans-serif;\n      font-size: 14px;\n      color: #ccc;\n      background-color: #222;\n      resize: none;\n      outline: none;\n\n      // override BS2 default style\n      @include box-sizing(border-box);\n      @include rounded(0);\n      margin-bottom: 0;\n    }\n  }\n\n  // fullscreen mode\n  &.fullscreen {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100% !important;\n    z-index: 1050; // bs3 modal-backdrop: 1030, bs2: 1040\n    .note-resizebar {\n      display: none;\n    }\n  }\n\n  // Notifications\n  .note-status-output {\n    display: block;\n    width: 100%;\n    font-size: 14px;\n    line-height: 1.42857143;\n    height: 20px;\n    margin-bottom: 0;\n    color: #000;\n    border: 0;\n    border-top: 1px solid #e2e2e2;\n  }\n\n  .note-status-output:empty {\n    height: 0;\n    border-top: 0 solid transparent;\n  }\n\n  .note-status-output .pull-right {\n    float: right !important;\n  }\n\n  .note-status-output .text-muted {\n    color: #777;\n  }\n\n  .note-status-output .text-primary {\n    color: #286090;\n  }\n\n  .note-status-output .text-success {\n    color: #3c763d;\n  }\n\n  .note-status-output .text-info {\n    color: #31708f;\n  }\n\n  .note-status-output .text-warning {\n    color: #8a6d3b;\n  }\n\n  .note-status-output .text-danger {\n    color: #a94442;\n  }\n\n  .note-status-output .alert {\n    margin: -7px 0 0 0;\n    padding: 7px 10px 2px 10px;\n    border-radius: 0;\n    color: #000;\n    background-color: #f5f5f5;\n  }\n\n  .note-status-output .alert .note-icon {\n    margin-right: 5px;\n  }\n\n  .note-status-output .alert-success {\n    color: #3c763d !important;\n    background-color: #dff0d8 !important;\n  }\n\n  .note-status-output .alert-info {\n    color: #31708f !important;\n    background-color: #d9edf7 !important;\n  }\n\n  .note-status-output .alert-warning {\n    color: #8a6d3b !important;\n    background-color: #fcf8e3 !important;\n  }\n\n  .note-status-output .alert-danger {\n    color: #a94442 !important;\n    background-color: #f2dede !important;\n  }\n\n  // statusbar\n  .note-statusbar {\n    background-color: $background-color;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    border-top: 1px solid $border-color;\n    .note-resizebar {\n      padding-top: 1px;\n      height: 9px;\n      width: 100%;\n      cursor: ns-resize;\n      .note-icon-bar {\n        width: 20px;\n        margin: 1px auto;\n        border-top: 1px solid $border-color;\n      }\n    }\n\n    &.locked {\n      .note-resizebar {\n        cursor: default;\n        .note-icon-bar {\n          display: none;\n        }\n      }\n    }\n  }\n  .note-placeholder {\n    padding: 10px;\n  }\n}\n\n.note-editor.note-airframe {\n  border: 0;\n\n  .note-editing-area {\n    .note-editable {\n      padding: 0;\n    }\n  }\n}\n\n\n/* Popover\n ------------------------------------------ */\n.note-popover.popover {\n  display: none;\n  max-width: none;\n\n  .popover-content {\n    a {\n      display: inline-block;\n      max-width: 200px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; // for FF\n      vertical-align: middle; // for FF\n    }\n  }\n  .arrow {\n    left: 20px !important;\n  }\n}\n\n/* Popover and Toolbar (Button container)\n ------------------------------------------ */\n.note-toolbar {\n  position: relative;\n}\n\n.note-popover .popover-content, .note-editor .note-toolbar {\n  margin: 0;\n  padding: 0 0 5px 5px;\n\n  & > .note-btn-group {\n    margin-top: 5px;\n    margin-left: 0;\n    margin-right: 5px;\n  }\n\n  .note-btn-group {\n    .note-table {\n      min-width: 0;\n      padding: 5px;\n      .note-dimension-picker {\n        font-size: 18px;\n        .note-dimension-picker-mousecatcher {\n          position: absolute !important;\n          z-index: 3;\n          width: 10em;\n          height: 10em;\n          cursor: pointer;\n        }\n        .note-dimension-picker-unhighlighted {\n          position: relative !important;\n          z-index: 1;\n          width: 5em;\n          height: 5em;\n          background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC\") repeat;\n        }\n        .note-dimension-picker-highlighted {\n          position: absolute !important;\n          z-index: 2;\n          width: 1em;\n          height: 1em;\n          background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC\") repeat;\n        }\n      }\n    }\n  }\n\n  .note-style {\n    .dropdown-style {\n      blockquote, pre {\n        margin: 0;\n        padding: 5px 10px;\n      }\n      h1, h2, h3, h4, h5, h6, p {\n        margin: 0;\n        padding: 0;\n      }\n    }\n  }\n\n  .note-color-all {\n    .note-dropdown-menu {\n      min-width: 337px;\n    }\n  }\n\n  .note-color {\n    .dropdown-toggle {\n      width: 20px;\n      padding-left: 5px;\n    }\n    .note-dropdown-menu {\n      .note-palette {\n        display: inline-block;\n        margin: 0;\n        width: 160px;\n        &:first-child {\n          margin: 0 5px;\n        }\n\n        .note-palette-title {\n          font-size: 12px;\n          margin: 2px 7px;\n          text-align: center;\n          border-bottom: 1px solid #eee;\n        }\n\n        .note-color-reset,\n        .note-color-select {\n          font-size: 11px;\n          margin: 3px;\n          padding: 0 3px;\n          cursor: pointer;\n          width: 100%;\n          @include rounded(5px);\n\n          &:hover {\n            background: #eee;\n          }\n        }\n\n        .note-color-row {\n          height: 20px;\n        }\n\n        .note-color-select-btn {\n          display: none;\n        }\n\n        .note-holder-custom {\n          .note-color-btn {\n            border: 1px solid #eee;\n          }\n        }\n      }\n    }\n  }\n\n  .note-para {\n    .note-dropdown-menu {\n      min-width: 228px;\n      padding: 5px;\n      & > div + div {\n        margin-left: 5px;\n      }\n    }\n  }\n\n  // dropdown-menu for toolbar and popover\n  .note-dropdown-menu {\n    min-width: 160px;\n\n    // dropdown-menu right position\n    // http://forrst.com/posts/Bootstrap_right_positioned_dropdown-2KB\n    &.right {\n      right: 0;\n      left: auto;\n      &::before {\n        right: 9px;\n        left: auto !important;\n      }\n      &::after {\n        right: 10px;\n        left: auto !important;\n      }\n    }\n    // dropdown-menu for selectbox\n    &.note-check {\n      a i {\n        color: deepskyblue;\n        visibility: hidden;\n      }\n      a.checked i {\n        visibility: visible;\n      }\n    }\n  }\n\n  .note-fontsize-10 {\n    font-size: 10px;\n  }\n\n  // color palette for toolbar and popover\n  .note-color-palette {\n    line-height: 1;\n    div {\n      .note-color-btn {\n        width: 20px;\n        height: 20px;\n        padding: 0;\n        margin: 0;\n        border: 0;\n        border-radius: 0;\n      }\n      .note-color-btn:hover {\n        transform: scale(1.2);\n        transition: all 0.2s;\n      }\n    }\n  }\n}\n\n/* Dialog\n ------------------------------------------ */\n.note-modal {\n  .modal-dialog {\n    outline: 0;\n    border-radius: 5px;\n    @include box-shadow(0 3px 9px rgba(0,0,0,.5));\n  }\n  .form-group { // overwrite BS's form-horizontal minus margins\n    margin-left: 0;\n    margin-right: 0;\n  }\n  .note-modal-form {\n    margin: 0; // overwrite BS2's form margin bottom\n  }\n  .note-image-dialog {\n    .note-dropzone {\n      min-height: 100px;\n      font-size: 30px;\n      line-height: 4; // vertical-align\n      color: lightgray;\n      text-align: center;\n      border: 4px dashed lightgray;\n      margin-bottom: 10px;\n    }\n  }\n\n  // [workaround] firefox fileinput\n  @-moz-document url-prefix() {\n    .note-image-input {\n      height: auto;\n    }\n  }\n}\n\n/* Placeholder\n ------------------------------------------ */\n.note-placeholder {\n  position: absolute;\n  display: none;\n  color: gray;\n}\n\n/* Handle\n ------------------------------------------ */\n.note-handle {\n  // control selection\n  .note-control-selection {\n    position: absolute;\n    display: none;\n    border: 1px solid #000;\n    & > div {\n      position: absolute;\n    }\n\n    .note-control-selection-bg {\n      width: 100%;\n      height: 100%;\n      background-color: #000;\n      @include opacity(0.3);\n    }\n\n    .note-control-handle {\n      width: 7px;\n      height: 7px;\n      border: 1px solid #000;\n    }\n\n    .note-control-holder {\n      @extend .note-control-handle;\n    }\n\n    .note-control-sizing {\n      @extend .note-control-handle;\n      background-color: #000;\n    }\n\n    .note-control-nw {\n      top: -5px;\n      left: -5px;\n      border-right: none;\n      border-bottom: none;\n    }\n\n    .note-control-ne {\n      top: -5px;\n      right: -5px;\n      border-bottom: none;\n      border-left: none;\n    }\n\n    .note-control-sw {\n      bottom: -5px;\n      left: -5px;\n      border-top: none;\n      border-right: none;\n    }\n\n    .note-control-se {\n      right: -5px;\n      bottom: -5px;\n      cursor: se-resize;\n    }\n\n    .note-control-se.note-control-holder {\n      cursor: default;\n      border-top: none;\n      border-left: none;\n    }\n\n    .note-control-selection-info {\n      right: 0;\n      bottom: 0;\n      padding: 5px;\n      margin: 5px;\n      color: #fff;\n      background-color: #000;\n      font-size: 12px;\n      @include rounded(5px);\n      @include opacity(0.7);\n    }\n  }\n}\n\n.note-hint-popover {\n  min-width: 100px;\n  padding: 2px;\n\n  .popover-content {\n    padding: 3px;\n    max-height: 150px;\n    overflow: auto;\n\n    .note-hint-group {\n      .note-hint-item {\n        display: block !important;\n        padding: 3px;\n\n        &.active, &:hover {\n          display: block;\n          clear: both;\n          font-weight: 400;\n          line-height: 1.4;\n          color: white;\n          white-space: nowrap;\n          text-decoration: none;\n          background-color: #428bca;\n          outline: 0;\n          cursor: pointer;\n        }\n      }\n    }\n  }\n}\n\n/* Handle\n ------------------------------------------ */\nhtml, body {\n  .note-fullscreen-body {\n    overflow: hidden !important;\n  }\n}\n//Alignment does not work with or without sequences\n.note-editable ul li,.note-editable ol li{\n  list-style-position: inside;\n}","@mixin gradient($color: #F5F5F5, $start: #EEE, $stop: #FFF) {\n  background: $color;\n  background: -webkit-gradient(linear,\n                               left bottom,\n                               left top,\n                               color-stop(0, $start),\n                               color-stop(1, $stop));\n  background: -ms-linear-gradient(bottom,\n                                  $start,\n                                  $stop);\n  background: -moz-linear-gradient(center bottom,\n                                   $start 0%,\n                                   $stop 100%);\n  background: -o-linear-gradient($stop,\n                                 $start);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#{ie-hex-str($stop)}', endColorstr='#{ie-hex-str($start)}', GradientType=0);\n}\n@mixin bw-gradient($color: #F5F5F5, $start: 0, $stop: 255) {\n  background: $color;\n  background: -webkit-gradient(linear,\n                               left bottom,\n                               left top,\n                               color-stop(0, rgb($start,$start,$start)),\n                               color-stop(1, rgb($stop,$stop,$stop)));\n  background: -ms-linear-gradient(bottom,\n                                  rgb($start,$start,$start) 0%,\n                                  rgb($stop,$stop,$stop) 100%);\n  background: -moz-linear-gradient(center bottom,\n                                   rgb($start,$start,$start) 0%,\n                                   rgb($stop,$stop,$stop) 100%);\n  background: -o-linear-gradient(rgb($stop,$stop,$stop),\n                                 rgb($start,$start,$start));\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#{ie-hex-str(rgb($stop,$stop,$stop))}', endColorstr='#{ie-hex-str(rgb($start,$start,$start))}', GradientType=0);\n}\n@mixin bordered($top-color: #EEE, $right-color: #EEE, $bottom-color: #EEE, $left-color: #EEE) {\n  border-top: solid 1px $top-color;\n  border-left: solid 1px $left-color;\n  border-right: solid 1px $right-color;\n  border-bottom: solid 1px $bottom-color;\n}\n@mixin drop-shadow($x-axis: 0, $y-axis: 1px, $blur: 2px, $alpha: 0.1) {\n  -webkit-box-shadow: $x-axis $y-axis $blur rgba(0, 0, 0, $alpha);\n  -moz-box-shadow: $x-axis $y-axis $blur rgba(0, 0, 0, $alpha);\n  box-shadow: $x-axis $y-axis $blur rgba(0, 0, 0, $alpha);\n}\n@mixin rounded($radius: 2px) {\n  -webkit-border-radius: $radius;\n  -moz-border-radius: $radius;\n  border-radius: $radius;\n}\n@mixin border-radius($topright: 0, $bottomright: 0, $bottomleft: 0, $topleft: 0) {\n  -webkit-border-top-right-radius: $topright;\n  -webkit-border-bottom-right-radius: $bottomright;\n  -webkit-border-bottom-left-radius: $bottomleft;\n  -webkit-border-top-left-radius: $topleft;\n  -moz-border-radius-topright: $topright;\n  -moz-border-radius-bottomright: $bottomright;\n  -moz-border-radius-bottomleft: $bottomleft;\n  -moz-border-radius-topleft: $topleft;\n  border-top-right-radius: $topright;\n  border-bottom-right-radius: $bottomright;\n  border-bottom-left-radius: $bottomleft;\n  border-top-left-radius: $topleft;\n  @include background-clip(padding-box);\n}\n@mixin opacity($opacity: 0.5) {\n  -webkit-opacity: $opacity;\n  -khtml-opacity: $opacity;\n  -moz-opacity: $opacity;\n  opacity: $opacity;\n  $opperc: $opacity * 100;\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=#{$opperc});\n  filter: alpha(opacity=$opperc);\n}\n@mixin transition-duration($duration: 0.2s) {\n  -moz-transition-duration: $duration;\n  -webkit-transition-duration: $duration;\n  -o-transition-duration: $duration;\n  transition-duration: $duration;\n}\n@mixin transform($arguments...) {\n  -webkit-transform: $arguments;\n  -moz-transform: $arguments;\n  -o-transform: $arguments;\n  -ms-transform: $arguments;\n  transform: $arguments;\n}\n@mixin rotation($deg:5deg) {\n  @include transform(rotate($deg));\n}\n@mixin scale($ratio:1.5) {\n  @include transform(scale($ratio));\n}\n@mixin transition($duration:0.2s, $ease:ease-out) {\n  -webkit-transition: all $duration $ease;\n  -moz-transition: all $duration $ease;\n  -o-transition: all $duration $ease;\n  transition: all $duration $ease;\n}\n@mixin inner-shadow($horizontal:0, $vertical:1px, $blur:2px, $alpha: 0.4) {\n  -webkit-box-shadow: inset $horizontal $vertical $blur rgba(0, 0, 0, $alpha);\n  -moz-box-shadow: inset $horizontal $vertical $blur rgba(0, 0, 0, $alpha);\n  box-shadow: inset $horizontal $vertical $blur rgba(0, 0, 0, $alpha);\n}\n@mixin box-shadow($arguments) {\n  -webkit-box-shadow: $arguments;\n  -moz-box-shadow: $arguments;\n  box-shadow: $arguments;\n}\n@mixin box-sizing($sizing: border-box) {\n  -ms-box-sizing: $sizing;\n  -moz-box-sizing: $sizing;\n  -webkit-box-sizing: $sizing;\n  box-sizing: $sizing;\n}\n@mixin user-select($argument: none) {\n  -webkit-user-select: $argument;\n  -moz-user-select: $argument;\n  -ms-user-select: $argument;\n  user-select: $argument;\n}\n@mixin columns($colwidth: 250px, $colcount: 0, $colgap: 50px, $columnRuleColor: #EEE, $columnRuleStyle: solid, $columnRuleWidth: 1px) {\n  -moz-column-width: $colwidth;\n  -moz-column-count: $colcount;\n  -moz-column-gap: $colgap;\n  -moz-column-rule-color: $columnRuleColor;\n  -moz-column-rule-style: $columnRuleStyle;\n  -moz-column-rule-width: $columnRuleWidth;\n  -webkit-column-width: $colwidth;\n  -webkit-column-count: $colcount;\n  -webkit-column-gap: $colgap;\n  -webkit-column-rule-color: $columnRuleColor;\n  -webkit-column-rule-style: $columnRuleStyle;\n  -webkit-column-rule-width: $columnRuleWidth;\n  column-width: $colwidth;\n  column-count: $colcount;\n  column-gap: $colgap;\n  column-rule-color: $columnRuleColor;\n  column-rule-style: $columnRuleStyle;\n  column-rule-width: $columnRuleWidth;\n}\n@mixin translate($x:0, $y:0) {\n  @include transform(translate($x, $y));\n}\n@mixin background-clip($argument: padding-box) {\n  -moz-background-clip: $argument;\n  -webkit-background-clip: $argument;\n  background-clip: $argument;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/bs4/summernote-bs4.scss":
/*!********************************************!*\
  !*** ./src/styles/bs4/summernote-bs4.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_summernote_bs4_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/dist/cjs.js!./summernote-bs4.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/bs4/summernote-bs4.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_summernote_bs4_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_summernote_bs4_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_summernote_bs4_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_summernote_bs4_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/styles/summernote/font/summernote.eot":
/*!***************************************************!*\
  !*** ./src/styles/summernote/font/summernote.eot ***!
  \***************************************************/
/***/ ((module) => {

module.exports = "data:application/vnd.ms-fontobject;base64,9DYAAEQ2AAABAAIAAAAAAAIABQMAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAABhyzCwAAAAAAAAAAAAAAAAAAAAAAABQAcwB1AG0AbQBlAHIAbgBvAHQAZQAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAAFABzAHUAbQBtAGUAcgBuAG8AdABlAAAAAAAAAQAAAAsAgAADADBHU1VCh9GJwAAAATgAAAV8T1MvMmIGVpsAAAa0AAAAYGNtYXAsrqD/AAAIYAAABe5nbHlmy6I5fAAADvgAACHwaGVhZGYdSxIAAADgAAAANmhoZWEOAAXdAAAAvAAAACRobXR4iBD0lwAABxQAAAFMbG9jYbL1uqQAAA5QAAAAqG1heHABZwCqAAABGAAAACBuYW1lYSDc4AAAMOgAAAIucG9zdDVznPEAADMYAAADKwABAAAHAAAAAAAHAP6H/okIdwABAAAAAAAAAAAAAAAAAAAAUwABAAAAAQAAC7McBl8PPPUACwcAAAAAAAAAAAAAAAAAAAAAAP6H/uQIdwgxAAAACAACAAAAAAAAAAEAAABTAJ4ACgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQAAAAoAMAA+AAJERkxUAA5sYXRuABoABAAAAAAAAAABAAAABAAAAAAAAAABAAAAAWxpZ2EACAAAAAEAAAABAAQABAAAAAEACAABBQ4AEAAmAbIBwAHSAm4CgAK4Ax4DYAP+BGQEgASkBLQEwgT4AA4AHgBEAGgAjACsAMgA5AD+ARgBMAFGAVwBbgGAAAoAEgBCAEIASQBLAD4APwA7AEIAPwA6AEAAPgBCADsAPABKAEEACAARAEIAQgBJAEsAPgA/ADsAQgA/ADoAQAA+AEMASQBLAD0ACQARAEIAQgBJAEsAPgA/ADsAQgA/ADoAQAA+ADoAQABHAEEACwAPAEIAQgBJAEsAPgA/ADsAQgA/ADoAQAA+AEUATAAEAA0AOgA7ADwAPQA+AEQARQBGAEEAOwBHAEgABgANADoAOwA8AD0APgBJAEUAQQBDAEAAPQBBAAIADAA6ADsAPAA9AD4APwBAAD0AQQBAAEIAAwAMADoAOwA8AD0APgA7AD0AQwBAAD0AQQAHAAsAOgA7ADwAPQA+AEIAOwA8AEoAQQAFAAoAOgA7ADwAPQA+ADoAQABHAEEADAAKAEIAQgBJAEsARgA+ADkAOgBBAA0ACABCAEIASQBLAEYAPgBKAA4ACABCAEIASQBLAEYAPgBNAAEABQA6ADsAPAA9AAEABAAfAAQAOwA9AE8AAQAEAB4ABgBBADkAOgA7AD8ACAASACwAQgBYAGwAegCGAJIAEQAMAEoAOQA7AD0APgBOAEIASQBPAEAAPQAWAAoASQA6AD4ATgBAAEcASQBCAEAAFwAKAEkAOgA+AEIAQABQAEkATQBAABUACQBJADoAPgA5AEcAQQBAAEIAEgAGADsAQgA/ADoAQAAQAAUAOQBCAEAAQQATAAUAOgBJAEYAQAAUAAQASQBDAEAAAQAEABgABgBCADkARgBAAEIAAwAIACAALAAzAAsAQABSAEEAPgBKAEAAOwA8AEoAQQAyAAUAOQBOADoAQAA0AAUAQgA5AEYASgAFAAwAIgA2AEoAXAArAAoASQBLAD4AQgBAAFAASQBNAEAAKQAJAEkASwA+ADkATgBJAE0AQAAqAAkASQBLAD4ATgBAADoASQBLACgACABJADoAOgBOADkAPwBPACcABABAAEMASQADAAgAJAA4ADcADQA9AEkAQgBDAEAAQgBAAEMAOgA7AEYAQQA1AAkAPQBDAEAAQgA6ADsAPQBAADYABAA9AEMASQAGAA4AMgBOAGYAfACQACwAEQBMAEAAPwA7ADkAOgA+AD8ASgA5AEIAOQA/AEEAQABCAC4ADQBBAEIAOwBPAEAAQQBKAEIASQBFADwASgAxAAsARQBMAEAAQgBGAD8AQgA7AEwAQQAwAAoARQBQAFAAQABCAD0ASQBBAEAALwAJAEUATgBGAD8AQgA7AEwAQQAtAAYAUQBFADkAQgBAAAUADAAkADoAUABcABsACwA6AEkAOQBBAD4AQgA7ADwASgBBABkACgA6AEkAOQBBAD4AOgBAAEcAQQAaAAoAOgBJADkAQQA+AD0ASQA9AEAAHQAFAEIAOQBQAEAAHAAEAEkAPQBBAAEABAAjAAsAQgBDAEAAQgBAAEMAOgA7AEYAQQACAAYAFgAlAAcAOwA/AEEARQBCAEAAJAAGAEAAPQA/ADsAOgABAAQAOAAFADsAQwBAAEkAAQAEAA8ABABJADoAQwADAAgAHgAqACEACgBAAD0ARQA+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aWZ5CmFsaWduLWxlZnQNYWxpZ24tb3V0ZGVudAthbGlnbi1yaWdodBFhcnJvdy1jaXJjbGUtZG93bhFhcnJvdy1jaXJjbGUtbGVmdBJhcnJvdy1jaXJjbGUtcmlnaHQPYXJyb3ctY2lyY2xlLXVwCmFycm93cy1hbHQIYXJyb3dzLWgIYXJyb3dzLXYEYm9sZAVjYXJldAxjaGFpbi1icm9rZW4GY2lyY2xlBWNsb3NlBGNvZGUJY29sLWFmdGVyCmNvbC1iZWZvcmUKY29sLXJlbW92ZQZlcmFzZXIKZmxvYXQtbGVmdApmbG9hdC1ub25lC2Zsb2F0LXJpZ2h0BGZvbnQFZnJhbWUGaXRhbGljBGxpbmsFbWFnaWMKbWVudS1jaGVjawVtaW51cwtvcmRlcmVkbGlzdAZwZW5jaWwHcGljdHVyZQhxdWVzdGlvbgRyZWRvCHJvbGxiYWNrCXJvdy1hYm92ZQlyb3ctYmVsb3cKcm93LXJlbW92ZRFzcGVjaWFsLWNoYXJhY3RlcgZzcXVhcmUNc3RyaWtldGhyb3VnaAlzdWJzY3JpcHQKc3VtbWVybm90ZQtzdXBlcnNjcmlwdAV0YWJsZQt0ZXh0LWhlaWdodAV0cmFzaAl1bmRlcmxpbmUEdW5kbw11bm9yZGVyZWRsaXN0BXZpZGVvAWEBbAFpAWcBbgFfAWMBZQF0AXIBZAFqAXUBcwFmAXkBbwFoAXcBcAF2AWIBawFtAXEBeAAAAA==";

/***/ }),

/***/ "./src/styles/summernote/font/summernote.ttf":
/*!***************************************************!*\
  !*** ./src/styles/summernote/font/summernote.ttf ***!
  \***************************************************/
/***/ ((module) => {

module.exports = "data:font/ttf;base64,AAEAAAALAIAAAwAwR1NVQofRicAAAAE4AAAFfE9TLzJiBlabAAAGtAAAAGBjbWFwLK6g/wAACGAAAAXuZ2x5ZsuiOXwAAA74AAAh8GhlYWRmHUsSAAAA4AAAADZoaGVhDgAF3QAAALwAAAAkaG10eIgQ9JcAAAcUAAABTGxvY2Gy9bqkAAAOUAAAAKhtYXhwAWcAqgAAARgAAAAgbmFtZWEg3OAAADDoAAACLnBvc3Q1c5zxAAAzGAAAAysAAQAABwAAAAAABwD+h/6JCHcAAQAAAAAAAAAAAAAAAAAAAFMAAQAAAAEAAAuyTGpfDzz1AAsHAAAAAAAAAAAAAAAAAAAAAAD+h/7kCHcIMQAAAAgAAgAAAAAAAAABAAAAUwCeAAoAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQUOABAAJgGyAcAB0gJuAoACuAMeA2AD/gRkBIAEpAS0BMIE+AAOAB4ARABoAIwArADIAOQA/gEYATABRgFcAW4BgAAKABIAQgBCAEkASwA+AD8AOwBCAD8AOgBAAD4AQgA7ADwASgBBAAgAEQBCAEIASQBLAD4APwA7AEIAPwA6AEAAPgBDAEkASwA9AAkAEQBCAEIASQBLAD4APwA7AEIAPwA6AEAAPgA6AEAARwBBAAsADwBCAEIASQBLAD4APwA7AEIAPwA6AEAAPgBFAEwABAANADoAOwA8AD0APgBEAEUARgBBADsARwBIAAYADQA6ADsAPAA9AD4ASQBFAEEAQwBAAD0AQQACAAwAOgA7ADwAPQA+AD8AQAA9AEEAQABCAAMADAA6ADsAPAA9AD4AOwA9AEMAQAA9AEEABwALADoAOwA8AD0APgBCADsAPABKAEEABQAKADoAOwA8AD0APgA6AEAARwBBAAwACgBCAEIASQBLAEYAPgA5ADoAQQANAAgAQgBCAEkASwBGAD4ASgAOAAgAQgBCAEkASwBGAD4ATQABAAUAOgA7ADwAPQABAAQAHwAEADsAPQBPAAEABAAeAAYAQQA5ADoAOwA/AAgAEgAsAEIAWABsAHoAhgCSABEADABKADkAOwA9AD4ATgBCAEkATwBAAD0AFgAKAEkAOgA+AE4AQABHAEkAQgBAABcACgBJADoAPgBCAEAAUABJAE0AQAAVAAkASQA6AD4AOQBHAEEAQABCABIABgA7AEIAPwA6AEAAEAAFADkAQgBAAEEAEwAFADoASQBGAEAAFAAEAEkAQwBAAAEABAAYAAYAQgA5AEYAQABCAAMACAAgACwAMwALAEAAUgBBAD4ASgBAADsAPABKAEEAMgAFADkATgA6AEAANAAFAEIAOQBGAEoABQAMACIANgBKAFwAKwAKAEkASwA+AEIAQABQAEkATQBAACkACQBJAEsAPgA5AE4ASQBNAEAAKgAJAEkASwA+AE4AQAA6AEkASwAoAAgASQA6ADoATgA5AD8ATwAnAAQAQABDAEkAAwAIACQAOAA3AA0APQBJAEIAQwBAAEIAQABDADoAOwBGAEEANQAJAD0AQwBAAEIAOgA7AD0AQAA2AAQAPQBDAEkABgAOADIATgBmAHwAkAAsABEATABAAD8AOwA5ADoAPgA/AEoAOQBCADkAPwBBAEAAQgAuAA0AQQBCADsATwBAAEEASgBCAEkARQA8AEoAMQALAEUATABAAEIARgA/AEIAOwBMAEEAMAAKAEUAUABQAEAAQgA9AEkAQQBAAC8ACQBFAE4ARgA/AEIAOwBMAEEALQAGAFEARQA5AEIAQAAFAAwAJAA6AFAAXAAbAAsAOgBJADkAQQA+AEIAOwA8AEoAQQAZAAoAOgBJADkAQQA+ADoAQABHAEEAGgAKADoASQA5AEEAPgA9AEkAPQBAAB0ABQBCADkAUABAABwABABJAD0AQQABAAQAIwALAEIAQwBAAEIAQABDADoAOwBGAEEAAgAGABYAJQAHADsAPwBBAEUAQgBAACQABgBAAD0APwA7ADoAAQAEADgABQA7AEMAQABJAAEABAAPAAQASQA6AEMAAwAIAB4AKgAhAAoAQAA9AEUAPgA/AEoAQAA/AE8AIAAFADkAPAA7AD8AIgAFADsAPQBFAEYAAQAEACYACABFAEAARgBBADsASQA9AAEAEAA5ADoAOwA/AEAAQQBCAEUARgBHAEkATABNAE4AUABRAAQEuQGQAAUAAARxBOYAAAD6BHEE5gAAA1wAVwHOAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwABf6jgHAAAAAKEIMQEcAAAAAQAAAAAAAAAAAAAAAAASAAAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAP9eBwD/fAcAAAAHAP6HBwAAAAcA//8G/wAABwAAAAcAAAAHAAAABwAAAAcAAAAHAP7OBwAAAAcA/14HAP8XBwAAAAcAAAAHAP/IBwD/zwcA/2IHAAAABwD/dAcAAAAG///9Bv//+gcAAAAHAAAABwD/TQcAAAAHAAAABwD+5AcAAAAHAP9/BwD/AgcAAAAHAAAABwD/awcA/+8HAP+EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAwAAACwAAAAEAAACBgABAAAAAAEAAAMAAQAAACwAAwAKAAACBgAEANQAAAAIAAgAAgAAAF8Aeeo4//8AAABfAGHqAf//AAAAAAAAAAEACAAIADgAAAA+ADkATgA/AEMAQABHADwASgA7AEQATwA6AFAAPQBJAEwAUQBCAEYAQQBFAE0ASwBSAEgAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4AAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+ADlOP0NARzxKO0RPOlA9SUxRQkZBRU1LUkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAPoAAAAAAAAAFIAAABfAAAAXwAAAD4AAABhAAAAYQAAADkAAABiAAAAYgAAAE4AAABjAAAAYwAAAD8AAABkAAAAZAAAAEMAAABlAAAAZQAAAEAAAABmAAAAZgAAAEcAAABnAAAAZwAAADwAAABoAAAAaAAAAEoAAABpAAAAaQAAADsAAABqAAAAagAAAEQAAABrAAAAawAAAE8AAABsAAAAbAAAADoAAABtAAAAbQAAAFAAAABuAAAAbgAAAD0AAABvAAAAbwAAAEkAAABwAAAAcAAAAEwAAABxAAAAcQAAAFEAAAByAAAAcgAAAEIAAABzAAAAcwAAAEYAAAB0AAAAdAAAAEEAAAB1AAAAdQAAAEUAAAB2AAAAdgAAAE0AAAB3AAAAdwAAAEsAAAB4AAAAeAAAAFIAAAB5AAAAeQAAAEgAAOoBAADqAQAAAAEAAOoCAADqAgAAAAIAAOoDAADqAwAAAAMAAOoEAADqBAAAAAQAAOoFAADqBQAAAAUAAOoGAADqBgAAAAYAAOoHAADqBwAAAAcAAOoIAADqCAAAAAgAAOoJAADqCQAAAAkAAOoKAADqCgAAAAoAAOoLAADqCwAAAAsAAOoMAADqDAAAAAwAAOoNAADqDQAAAA0AAOoOAADqDgAAAA4AAOoPAADqDwAAAA8AAOoQAADqEAAAABAAAOoRAADqEQAAABEAAOoSAADqEgAAABIAAOoTAADqEwAAABMAAOoUAADqFAAAABQAAOoVAADqFQAAABUAAOoWAADqFgAAABYAAOoXAADqFwAAABcAAOoYAADqGAAAABgAAOoZAADqGQAAABkAAOoaAADqGgAAABoAAOobAADqGwAAABsAAOocAADqHAAAABwAAOodAADqHQAAAB0AAOoeAADqHgAAAB4AAOofAADqHwAAAB8AAOogAADqIAAAACAAAOohAADqIQAAACEAAOoiAADqIgAAACIAAOojAADqIwAAACMAAOokAADqJAAAACQAAOolAADqJQAAACUAAOomAADqJgAAACYAAOonAADqJwAAACcAAOooAADqKAAAACgAAOopAADqKQAAACkAAOoqAADqKgAAACoAAOorAADqKwAAACsAAOosAADqLAAAACwAAOotAADqLQAAAC0AAOouAADqLgAAAC4AAOovAADqLwAAAC8AAOowAADqMAAAADAAAOoxAADqMQAAADEAAOoyAADqMgAAADIAAOozAADqMwAA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AAAAAAAKACsAOgABAAAAAAALABMAZQADAAEECQABABQAeAADAAEECQACAA4AjAADAAEECQADABQAmgADAAEECQAEABQArgADAAEECQAFABYAwgADAAEECQAGABQA2AADAAEECQAKAFYA7AADAAEECQALACYBQnN1bW1lcm5vdGVSZWd1bGFyc3VtbWVybm90ZXN1bW1lcm5vdGVWZXJzaW9uIDEuMHN1bW1lcm5vdGVHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBzAHUAbQBtAGUAcgBuAG8AdABlAFIAZQBnAHUAbABhAHIAcwB1AG0AbQBlAHIAbgBvAHQAZQBzAHUAbQBtAGUAcgBuAG8AdABlAFYAZQByAHMAaQBvAG4AIAAxAC4AMABzAHUAbQBtAGUAcgBuAG8AdABlAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAIAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUwECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEBUgFTAVQABWFsaWduDGFsaWduLWNlbnRlcgxhbGlnbi1pbmRlbnQNYWxpZ24tanVzdGlmeQphbGlnbi1sZWZ0DWFsaWduLW91dGRlbnQLYWxpZ24tcmlnaHQRYXJyb3ctY2lyY2xlLWRvd24RYXJyb3ctY2lyY2xlLWxlZnQSYXJyb3ctY2lyY2xlLXJpZ2h0D2Fycm93LWNpcmNsZS11cAphcnJvd3MtYWx0CGFycm93cy1oCGFycm93cy12BGJvbGQFY2FyZXQMY2hhaW4tYnJva2VuBmNpcmNsZQVjbG9zZQRjb2RlCWNvbC1hZnRlcgpjb2wtYmVmb3JlCmNvbC1yZW1vdmUGZXJhc2VyCmZsb2F0LWxlZnQKZmxvYXQtbm9uZQtmbG9hdC1yaWdodARmb250BWZyYW1lBml0YWxpYwRsaW5rBW1hZ2ljCm1lbnUtY2hlY2sFbWludXMLb3JkZXJlZGxpc3QGcGVuY2lsB3BpY3R1cmUIcXVlc3Rpb24EcmVkbwhyb2xsYmFjawlyb3ctYWJvdmUJcm93LWJlbG93CnJvdy1yZW1vdmURc3BlY2lhbC1jaGFyYWN0ZXIGc3F1YXJlDXN0cmlrZXRocm91Z2gJc3Vic2NyaXB0CnN1bW1lcm5vdGULc3VwZXJzY3JpcHQFdGFibGULdGV4dC1oZWlnaHQFdHJhc2gJdW5kZXJsaW5lBHVuZG8NdW5vcmRlcmVkbGlzdAV2aWRlbwFhAWwBaQFnAW4BXwFjAWUBdAFyAWQBagF1AXMBZgF5AW8BaAF3AXABdgFiAWsBbQFxAXgAAAA=";

/***/ }),

/***/ "./src/styles/summernote/font/summernote.woff":
/*!****************************************************!*\
  !*** ./src/styles/summernote/font/summernote.woff ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "data:font/woff;base64,d09GRgABAAAAACC4AAsAAAAANkQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAr0AAAV8h9GJwE9TLzIAAAPIAAAAQwAAAGBiBlabY21hcAAABAwAAAHyAAAF7iyuoP9nbHlmAAAGAAAAFkcAACHwy6I5fGhlYWQAABxIAAAAKwAAADZmHUsSaGhlYQAAHHQAAAAdAAAAJA4ABd1obXR4AAAclAAAAE8AAAFMiBD0l2xvY2EAABzkAAAAgAAAAKiy9bqkbWF4cAAAHWQAAAAdAAAAIAFnAKpuYW1lAAAdhAAAAS0AAAIuYSDc4HBvc3QAAB60AAACAQAAAys1c5zxeJx9VDtzEmEUPQuLoiIhUWOMijFifCu+A4SwS1h0gQBxLCxSmBnHxwxDZeVYUFlZOP4GSyvHwtKxsvY3+COsMp57eAUnEYbl+8797r3nnnu/hQPgILJYRaRSbTxGsrP1uot5uOh/zL5z7XRevdhCfLijzdV/HE4siRSWnC/Od+dXpBvpRb5F09Gn0W33mdtzP7lf3R/uHySRRgUv8R6f8RO/se3MOVmn6mw6XadHJjMo8xuiTkYlFLguIQ+PuzJ3K6jBZ67pPU+tCS3iwH/O2PMB4xzC1J5nAjRY2WHuLGuRSIVYlV4F+j7EvglbSJvP3B53PiJI7LCVBqjH6NEJS4HPoc9+shlbxrXGqMkYHzJPEB0yrxLP0eKTUXwCrVHtSWSdnYqN4ln3zvBnPFrapVmXr2gF8o6zG1fp/QQdvME7fKSmCUbNyWMVTUVuqYJZMgrpZ6hxDGnzcHyE2q7N9Tr/j7E7fTSnakyZGWYe658iy5x8fBwR45D8PRwlx1CaGds5+pR5rjrQNo4F8r1NJT08oqcp4I2UvKWYTcW/w3Xfs8ZVAou4x9Umrohv/R++l8S3Lr7NAXZ5hFm9ea0vkoHVlSeWYyUtXCBLTzNp7DJYxn12qSh11sTarKa2TdZdxiwO8Lw09sjLFRay1iRraOI53uID65zmhHqa2py0LKkzZWXua3qduXzNUktK1tSvQHrcpEqBIpSZu6RTDZ7JUoGAlbdlMaYW6waZBcy98+Q1Mtog2u+TqZghjzZVPKlZDmnxJ2b5hGZ5iA9neX4CtYxW9+lBh4zHKXXdbol1/Ryj76ZehHxmcZ43qSAFAtkzRG0+Tae8/JcZuSD/UPspRc8TsR6l2dmzZGQ+wUBVT71c0PysKPqiYhT1RrAYS/QMeK7/fgh1t1Kje+SpC3bW7kWD89NkXRt/ARBjnAkAAAB4nGNgYdnJOIGBlYGBpZDlGQMDwy8IzRzDEM54joGBiYGVmQErCEhzTWE4wBD/yoIdxF3IYcgoA6QZURQJAQCcQgtQAHictdRlcuNQEEXhY4jDzMzM7DAzZwNTGWam7HMWMaVNZPq6ewHzJ3J9Ok8uy5L16hkoAjJmwmQhnSNlI+0yhdGEtazwfpY/dlxir7T1CfdJ/uGhMLpLUoWRn6hP5G20yQqXbLHHNkesc8oa+1yxyjUbnHDODbscssMBF5xxy7GdnbbrZe2uchTb95TatcupoJIqqqmhljrqaaCRJpppoZU22umgky666aGXPvoZYJAhhhlhlDHG7TdMMsU0M8wyxzwLLLLEsu4yleOxN3sOl1t720frp2v7V6vXGyfnN7uHOwcXZ7fHj37t/9sqtMv8jaNbNKdu09yFFfM0XJpnYcs8D3vmRdg2L8OReRXWzetwat6ENfM27Jt34cq8D6vmQ7g2H8OG+RROzOdwbr6EG/M17Jpv4dB8DzvmRzgwP8OF+RXOzO+gZ3UfbDaTlNPKSdJOqyXJOK20JOu02pIip1WY5BxqsUMtcailDrXMaXUm5Q61wmlWk0qHWuVQqx1qjUOtdah1DrXeoTY41EaH2uRQmx1qi0NtdahtDrXdoXY41E6H2uVQux1qj0Ptdah9DrXfoQ441EGHOuRQhx3qiEMddahjDnXcoU44/aMmkw51yqFOO9QZhzrrUOcc6rxDXXCoiw51yaEuO9S8I/8PNcu1MQAAeJytWgt4FEW27uqe7p7Ja97dM5N59cxkJs+ZZJ55JyThlRACCMkiShIEREQeingvoARFREUv7KLiA8TH7rK+QJH97uoKGtddvbq4urv4uAoirJ+IXsEHmGSm5p7qnoQEXL/73W/pqeqq6qquc6pO/ec/HSiGgn/cJeznFEPxVDZFGWOSGUlmCUkxabnKN/QRO37wRfb4oIM9Tg8MDdFfJ5P2IYpSxh3jjMPjkKSXkF7Sk8R9MlDP9eOzQzPwOa6fM+CB1BnE4wFyIZ5SyWO/4hyZsS6YlYyEN5ALCaKT5nj5CqKYPlqPjNyHyQ7mWSWlRNNX++1ZWbnWs09kax1Gk4Nz4G9QXvJjlJ08hrJobc6BrQanU6394yZew1n19Ot6C0v9E5n1GbkVmeXUoMiMfxiReHjspxfoOzx2zsAfuFp8dvAQGx48JI8+p4z9P+nL8Xm0IMpXPdE3OFZf/Jyib56F6Ou8WF9dzsGteqdTo33tdkXfN0bre5wzjOxtZlaSHuMaBt9kY4Nv4utktQ34LMpKfo745CmiMC2P7eP6KCdVAtpGQ8jv0SJ91F+CPJxZHyA1ziQiIZxA8YSJVrl9tM7gc6sM7AbDHEPc8JLf1mfzv2SMGucYDOg1aIEseQg/jOfihw8dQr3oUdR7iFmXD70NL6GzNr/fhrNeMhrJYFwjj7G/M6orDB0tl4MqBrliUb9XSsRl8fiMQA2I1KVwvGCMWH0Xvz8+MjeiLpKs8bz40F0Zoyh26UViXbxeAaSskAtJHs6BTEJE4kntR9brVuX9RBScRZYBnc2ICSIOXSRXXz5p/9E1zv+J9RolF48USRqQ3iTUoHA8phflZbtwHy/Q+/xkF+/jekWqH9fEdpFcSJbr59ztlAgVUS+JGpSQ9AkNCuilgAbxkp5H7O8+SB19Hydw4v3U0Q/QG7jpBJ04jg6gA8fpxAncxLYcpvPfwzXotfdS/ziMa/CEY6m3j6EX4E5XwJ3KzANH8GXKDRUTaO7x1wG+mTgPrEQU9iIsOADrovEwmA5PGdOUMepPUv4oKRkRqalIDUpMn400wjLAOsiPSJapwgNqeD7Vy3CC5Pm4EqSPhAV5XjJfvAbpvR5lXphP9fL50dEfeTf7su2fyDI8n3LGy7knKQslUUGYMx6L+iQvaw4LZr2J85oltw8OSSCOwk5kJgKJSsHrIeDKrl+A38KzZ6fuvnXazPVMF1qAIqdPv5V6/OaNM26+9ZKOdTe3Xnvt5Ol21bi5tz3/jmHDzGuT7as6Nnz6hz0flsTpGv8tK+5bszW8pe/hXaHxTehNRX/miGoXJQDeuCWYiwB5HvIHMlc0/h5agpYYBTb3sT25vEfiNYuWls/gsgTVw2a37aNT5pysrBztpq3jlunz3CaiXnpu+g7+UX4tpQXsDFEN1ELqbtA0iPIYF3KieiYQ4ZxMHAw4yHC8nMPRg5aERJ6G5J4iHMQ8ZHKiCBHKBFJ5RxriiXoEIBIIooAfusE9Ci3QsR4BGkM/UABOr+hEojDcSq/JDcXLHKqcW3PLK8vsTO7XuYy9rLI899YclaMsHsrFmy9oQAMXjEDP4d3uuBt+qKttXVtbQ+MU/JvhhkU9l90dKCoM3H1Zd3I33tM2rr7NX9DXhqYrHfCeUR2uyrTyUwURWUNR4bAg0rayqCBEy2y0CNVoyAqyDzQI0aANCdAQg7tFECzIFoxBVYB7VFD9jzvWGHNNvmnbTT6/K94Qd6FC/11z5v557pzN/sLktwW+m7Y11re6Y/CkMLB5ztxD8gN5EGBNem16K9/D94ItVsD+hEWBEgUdz1E85w74qYBfl4hTibgYlhdSJy+qW150nbwBzNJDL+5HlinTpk3Bn+9/ES/4/X58sr2jox2J+3//56d33n+qsbm58dT9O/Gvdm4/Na65edyp7Tv53o4p+MvnX8CLX9iHT03p6JiCzPteQPe+8DwyTenY2dR48r4d+Ikd951sbJLLqFMuD59V9nv2B4KMGhQHHxLwerwa5PdWEOwGSOIAJiPlFYkwAJMQqUIJgpIB5n1a5LipNE0zKPVZ6nNGRaPpHEeLqZMc16piaIam82kRmmm6jeOY9bSFzWmloS8tqqBndupk6ks2p12FGNoGwxE9lQP3zODbKEp9AydRHJVF6Yl306AYMmtQRENDbkbsDXQs9SadHthEOw+lPh36PZ2GaiyFUOdBVIyKDuI5t6X2sDcM3k6/j355EL+HDx9Ev5TVlHEQ8Qj8QJAKU3GqGt7vAZWjDWDxgInReEQKkJqMTASxZMdA/Ctx+ODACoA2xDJJlZRsYau1Hwe9JSVe9G6/1Rq2TrCiPRYLnm5L3WEPBOypB0hO5+FW9NvhhNZawtaJllcrfDN9Fa9aJkLNiqdbJlnwNAveYDdxu0x2u2mgx2Tfhh66HT0IP4pNpwmG8/wY2cOwNSYtuHnAb0AzSSS1EVRHGZmljA4syGzOJFrlsRLZ0btEdhyUZR9vBQksaK+VXiVLvTC/sDA/9c15yXEru1GWvT/sneUNvypOIrKjveIkojXqA6l7TQ6HiXsYZMfzN+H5t+MFmXWneBXlo6JUJVVLNRIvTFbZBRafUSIjewjOQ2ZLAn7mJ1afiYjLxCbx9BmxSVguimfOiOJyoUk8cxoal8n1zAYQJcZugOoJiXQ5fVokrxCg67jz9XEwVBhaYydKgCqg0KhtyHCJuVwNuB7itQl8mjOICsSVgCKSjBJ7e0qonleFX6maV02fhBJqrJ6H9yX/spip4KqreqqHjlf3VMFd5YD74LvoOHGZ8ru/4NwZrqoby5G9FZDpuA+SxxmHknYlTzB29D3+FuUiDcpCecBej13I03NGxSXkDdyxYZKPO5K7mB7OiM8mTxGSTq/HAjVGDhWlhvEghzwSjRKGO0lEGAhwHwz4GWfyU5I4d/IY/m60NMPr9RV3jMoHy6UQ7LVZ9sgxjz+AvIhWijHYbmSUmC8rdGLldczM2vUdqc+2pU4vfZROdF/ilRA6jLvRF2sDFU5PyebNHa+yvsH/xl9v3lxe75s9k96MicxqfCj9V3UR76JMcEImUFdRq6hbqC3UDlhH4u/AhPKII1MCKpqVInESb0Azr3hC4prhUSIO+IwuHoFYKRFWYhQyhiA3GRSkM2MS8UiBYsQKhCCFkis8c2xldLdqrs8VcTojroE+Z9SpdxchXrUtOMEREmySozo0eWjJ5LJ4vlM0l+S34Gb1augEv3Mb5UFoA/us1OGr9ZeJNq2utblq2WDHVbUt7R6bJeiv803j2w2G1wzRApL9cOf5Mv/gj7dzfnj30EZlDtVqocitX0urOMEWTz5S73XnZmfnur31THfcJnAMQtdDr4FtSm9uCWRrEK3K1bm9VUNrF9fU12Vn5eSO+7crVBuqvG5droouN0QNrxp8JMNvyeWCiLHfMLgWyv3GApKhKCmTPv3GYf90Dfc0ZYMKT1gbD5bl5aUEsRpYdFRPNyD6U2/8UhH/Mb91tpfe7x6/kFPloCqhsDns455ezpZMcLUnvbN7li+PN+gFXSFzakJbAC0nNC09F7DpUXYt5aemUt2ZE/2vY0jMMDQoPfIQ+8i/mO98BzndDZkr4U49And2zf+fwCDRHXPJJXeM4tNiul09SV2RwSOtjHn5JFYpCDAAwgybKECQ2Ijeq2ESGpp9uwdRPWrUh/t+gEKaGkTyjf7NbbcNHUXjmCn4YA8ah5rwQc7RjbuTWzYmB3E3ZsOQXYnW/nAZ7meaUX037kcNqH6Yn3Au9hmQAPhJDDiIaKZfxtJB5KV3HESXoKPZ+/DH9Cf7sjN9m1Q5BAGNAFIH2ZsHb1Jl4y/AhNKvwz5XcHdRZVSCqgH+3Ax94sqxJQG0h+fMXj85w2Fyvk185usLD+5SOd1Gb0yAG+iKRoHhVo3Bo8vP08WKYzZhLR2Nxtuq5ztcFmOhJR62BERUhkvtYrljQvau1lAi68r13L3yN4e32PjgG+TbA3qKyxFzzUK+sywaClRPWun2lJcEaxOlPsnodRtc7qUtsdIiW0jF9tB2d3PqTroNH8Yf4g9QILkZBUjcnX47/T5fwRcCXgPkGpkCDcMHEmjvJ8xElTW1HZUnn8XLapjpjC75xtsqK70w9UByb2LZOWYapUrPg3U5wD0Be1sCvnkGRRWM4F1kBAOZKMFGXvKTJYGWEX8HXaEjOSp5yCjHOeCteQ7ORsJYjwTRmCA5P/WHDQpI8GsB6FyRUoc1JnUMzprmjlkdLdeNZ69qWdmCLwu2l5W1zyFZyJqntWg7rUl9pFmQ1LZvXZddUfR1s3NOj38WvIG9Xnnd4J2AguycGodVrUJIpbY6apK2luuam69roSPFE2dOLJaz1NM+vx4hACwVWxZDn9SWeyrx/g21IV/V8HcL9hXuMNiNj+hPvg5FiSEQM9AC3PBw9klolZADSzAVhv4YzcRP4R40eemGjQuD1qJLVtdysB65QtP01aWT4RH+w21/z21BE5iyuc/c1dlW73OOm/vzg5eWtETqu+vm/+Lr7zo34gMUSq8Ex2Vij8DaU2BTKDESJJLLM2KGHJEkER99RTLOSKxQm5JepAXtuJw8q70wVNvSefmJq3tnT588rjpc4nUKupwcveAsCEbrxnd09V618qbT7+6+a357wMA+k+xCjEG0eqQiX7GnMN+lN4jmQl+4NBGMFpe6HaIvGB7fNGNy5/iOygbJV1bQUJbIN2Q4xiPApQPARCeA7GYlolH8okcGyZhXAUO3DJw6uS2ghMKjPvX5jXyAF3kxISYCCWb96uVLfh0MlQd3L1lxbsWS3cHy1xrqjmy9B028Z+uRuob6uo+3bHtHd+CubB3SG/tvU+dYtFLyyNEdR47sOHoEcm7WH8tDv75m+dkV1+wOhkLB3desWPPYvVuO1jU01B3dci+acM+WI/UNj6vXdXMajzrrljkqntVlow8MutRTR4/CO3YePbrzyFHZJNKpdJpLcekxnDvDUvXkMwK4IH2Grma+ZqBRbJXwbgZgwptJ7I0Z3i9zZ4X3E+4MjJtwZ/PAPJk77zQT7gzEGX6qIY+tYmyIUWEbD2SbRAy21J0yw33QXlhop3NHM1yQfRD2Z+iCWOenv2DKIQRRiYRBYPxjZF89ivf3Q6wCUqE9Y3i/3Z7h/SA4of5AsGwXhxg2iHQsaI8tE2IskDX4Fu3HbcMpEy9oQPbR8cJIUPATgQP7E6tPz5MgQACyL0C4QEj+haRfVG1Uoi4lAhveg/lMVA40RgUWI4HH2EDj4kgvE3Nyv+NeojTASj2wF2QfhEQ4DoSAM7FyyR8AXoicdISUvSC/ySiEFa8EZQ3Ng9PTIHB97K2xCTMWXnPv/KGiSEfbvIUTp19BP6QNN/k6rrh64vQF8dj2BeTOXJ9KpOKL6ddTlYvp/6LfWJSqpF9nqArUu6MXLbqvYrhA/8IVzl9038JFbb7B/yjvnd7afcWkDk6Tqqf7r041phoW0/2p+sX0K/TL4GPa03/hn5C5daHCp+kL2LH4I4w5yD1UOqPBW3dl7cB8yGqv/B27S77XDfbULayrW8i7PA2XlA5eqzSyd8P9RigMXa00qO6BO6VgdHqA+4ZXgyX3yixtJFyPAZePhJ0ZSIE1JC46SMtrJ8OPmImPEXgt4rRkXxZCkuznORX5COhVuBvv1Ufkt3B/H5iVo9PloDm5d3Vu/8u//2zT9pDOlsOpeV8kb/X1lc9/eN2abW3F3y6rrqZnQsfBH3q/XHfZ3VN7tZY8bwHtMqmzHsD/8+iyZ48VGDScUV2Y09WVpbfkWRiA4ley9dkb9l7++KomsSSb0XK0KhxMfbDhT0tWdHdOKFiTsDv12a/k6PD4q1c0XTdp5WV5Wo3RGCoqDW/6dF3pRBVjZN0VdJcl1OiokNflcnU3F6RcwGkoVorJvqEeyYyGD8huQmbNBHcjGiTFyAppUBCVoJgEdTMsFBiYE9Ugs6TuxrcUtDvKzALy+5xOwVXkD5WVV80KWoUiR/i5we/xPtzaUzJFQJ34t2Jr8aXoftQJ1/bZxa0i3o+6hCklPXjyY13SBHuZy1vv0WaJi5zavOL2SEV5YYmzmL4jdW53oYc2oxOSfzfWojO7/RK2p055CneTfdbgE/iE2q62Q9xpBZ42ERhJN3U1dQN1M+y6Fw5FIKKwDeQPJAjzoIGkI06A+FHhbRd+UJO9JDLGFJriAABE8LSeFlyIy9CXGkRMxQg8hfMSzxVPsGaYAR7WkWBNlHkNAEycf+pBtfpBmcHgLa09S/Wl5aUeg0E/dJzNy/uGXtleVEK+rz2En3ho+FvbQ09u6lu7OLXZ5IrVRd2Vq1JXLhO0eSVVVcLSLjxffpUTXnqgpXOppzjkFrRagdnvjtbFXIlV9PblZm2eIM2WlnUyuYna6kr5Af1YT+tSvcHggdn1ycfz8tgOeuXitX2bnjw/K+qUyyVF7anNzOUPDs+DH15mrqosgUmWtSSxIlJ1bQJXzWpZLrnhkXBypC/qWSYkKs2StKwlw5HAzg4rdgY7oRBn+ehwvKgQ5wxNMUvw+ylTi6i7nws7igRrcFZVeVnIX+QSnE6fHwnmMkd7AboxtQ9Pxs+BrU3qKW0TURfeL7aWzAZb64LrgUuJrT2Pfga2xoaKnSWF5RWR9uI8rXORmKX11HtdZfYJUleyeTetUYxNQP8gxpaHviHGlp/6wlNI1MlKrwM/czlw37HxjYvyAquhAuA0CBcsyDD9UXcrLekjeiX18R+l7kLnsIak1B2jSmdxlpL60Ll16NwsbtbAk2vQDWvRKnwHzr2wwFyFb0c3DCcZ89Kw6upJcLY1VCmseYQtAGQrYL0FgF8lyt+tzMoix2N6eR/A+GV/5+e7TuO/4b+dOYbsyHEsZXNPbJq6afKqouST/rouvW9LY01jfuUUdR83f3MBqvnsM1XuZ5+5HHrt0OdXzbjxRsFUslBl4fhs67YF6Dk8dW/Gj73FvUPlUnrKQRUBDlPkhMQkGfBBDvm7VzROiIOJAxqB5LJeKUPJKJeYaFy1R6qU8PXuSil1its7+BLz9+8Hm1Su4trixcU1Jfg4FOCHn3QWr4H7mmLuZ1JCgt/q1QPvsfG/OYuKnMnVzuJiJ7NxVPnPo1tlXHyfe4C7ByQtA0nzFM8EYO+TXZPfG5PNUYllwjIRJU0eEtdy8Whh0f349K+ewV/9PDp5DWOxLm+K7btxU3/VEbq0XDNoYz9j07aeWVi7680Xr13x1Jt30q2Lp6xePX1B6re7/vPmO/70LPruBIh74Eb572Hpq2Efs4HjQ0QLlATFoqNp/DCLly8XCowJALwXRADbmI/wGaD5Wou9KFjX3Dn3xOLeS6e1NtZUlHodgi43l9D8shih+T2LV9507fIFvV2XTG6pjpcU5At6he0bRYtXKioo9hbaXTqjBdh+BNh+rLjM5byA7efkmE35FofVLlr0uhzZBNJfw5nRc/PGnBlqdETMZP66Ti5eOzbYfQUfRsX4PUiHURF+j5s3OpRV7cCHU/tGwlqw/w0wl4F9BOaCOZgCfZnyvfV8/En+o8AadAZred3Qk1K1x1PlUc2CzFNFs++iaX/9NVhaci9k8GOmQQav/V/hyEpXAHicY2BkYGAAYu5NPlnx/DZfGbjZGdDBv/Z/TzjKOQyBTA4GJpAIAMVIB1AAeJxjYGRgYGcAAXaGf+3/OjnKGRgZUEEwAFC4A+8AAAB4nGNgYGBgpxj/jwPiGgj7XztU7D/bf1zq/51D0ieOZM4JID4PxElQfgmIZvv//y8Q/0JS54tk1hOoWD0QMyGpyQbi90DcwkAnAABtZyQDAHicY2AAAhkGK4YyhikMmxjeMfIwRjAuYfzAZMNUwLSC6QGzBnMQixpLHcsxli+sQawb2MTYXNgy2DrY1rE9YT/H/o+jh+McxxOOT5wJnHVcDFx2XLO4ebizuE/w6PFM4rnEG8d7jG8S3x9+H/5J/K8EDASmCZwR+EEOBAC9XzrPeJxjYGRgYAhmmMfAxQACTEDMBWb/B/MZACFfAhIAAAB4nG2RS07DMBRFb/pDtBICgZgw8QQmSEnbYYcM2nkHnaet048SO3Kciu6BFbAIFsGANbAIFsGteVIlFD/ZOu/k+kVKAFzjCxFOK0I/nKfVwgW7P26TboQ75AfhLgZ4FO7RD4X7eMZEeIBbaE6IOpc0d3gVbuEKb8Jt+nfhDvlDuIt7fAr36L+F+1jgR3iAp+ilqotCO2O9nutNnafuLM600K7aWaNG8fAsZ9pol3q9Vsujqg6bsfeZypwt1NQar/PcqtLZvV75eOt9OUmSTHy8sgUq1ChYGg4GFp40597Q50hpmxJNbhG6Cjv2BgojxPyeTckZtwkmDf2a6SWOPCsc+OYxrUfGPmPG8rbCNEw9pXOWpSnDsz3Nij7GNtwq+d8SVvYvHzPFSb90wmbkAAAAeJxtkVdz2zAQhLUJKUuUFUdO772H6b333p33DAgeRVggQKNI9r8PRNoz8UzwwPl2Dze8PXR2dNoz6vz/rGAHdiJCjC4W0EMfCQZYxBC7sITdGGEZe7AX+7AfB3AQh3AYR3AUx3AcJ3ASp3AaZ3AW53AeF3ARl3AZV3AVKa7hOm7gJm7hNu7gLu7hPh7gIR7hMZ7gKZ7hOV7gJV7hNd7gLd7hPT7gIz7hM77gK77hO37gJ35hBb87MZNirBabb8pJOTKbQqg8yGErVr11othIWiWp2Cpo7+bXBq0yYly6ETNGz1IuDJeU5nqmtjvz7uVtTtO2tM3yddJomzLpeptYbsE0yrTMY84MuUVeMqHSzOgJqW7bHnOpLUVc59TnWqasCLmSOWVUaEMNGqr0lLpkmA3FQmrmmtk2UWlFgxab+aJCKxcXhlXUFS7k5ZEUahJXbCx4UpHyKS+JB0Mobwfa5GQol8K6bk2KC7lQC+68od6ap7BNraJQ1z2jpcwYn/Tn6VkWRmooI6lnyZzaOUe2Ji6YDD9hhvGQp2vXfFjA0DojJuRKo/247FufWW5E7RLrq4qM0o4G1tdkWjt2LJM0cLTu0pLmwWIXNlD2fXhvExJRFEgPvfonQTwVOWkwSAiMofAHHAQHgxyr8LAosAGNEjPUmCLDBBXWsN7p/AXfsOaKAAAA";

/***/ }),

/***/ "./src/styles/summernote/font/summernote.woff2":
/*!*****************************************************!*\
  !*** ./src/styles/summernote/font/summernote.woff2 ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "data:font/woff2;base64,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";

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC";

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC";

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"summernote-bs4": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/styles/bs4/summernote-bs4.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/settings.js */ "./src/js/settings.js");
/* harmony import */ var _js_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../js/renderer */ "./src/js/renderer.js");
/* harmony import */ var _summernote_bs4_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./summernote-bs4.scss */ "./src/styles/bs4/summernote-bs4.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




var editor = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-editor note-frame card"></div>');
var toolbar = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-toolbar card-header" role="toolbar"></div>');
var editingArea = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-editing-area"></div>');
var codable = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<textarea class="note-codable" aria-multiline="true"></textarea>');
var editable = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-editable card-block" contentEditable="true" role="textbox" aria-multiline="true"></div>');
var statusbar = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create(['<output class="note-status-output" role="status" aria-live="polite"></output>', '<div class="note-statusbar" role="status">', '<div class="note-resizebar" aria-label="Resize">', '<div class="note-icon-bar"></div>', '<div class="note-icon-bar"></div>', '<div class="note-icon-bar"></div>', '</div>', '</div>'].join(''));
var airEditor = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-editor note-airframe"></div>');
var airEditable = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create(['<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"></div>', '<output class="note-status-output" role="status" aria-live="polite"></output>'].join(''));
var buttonGroup = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-btn-group btn-group"></div>');
var dropdown = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-dropdown-menu dropdown-menu" role="list"></div>', function ($node, options) {
  var markup = Array.isArray(options.items) ? options.items.map(function (item) {
    var value = typeof item === 'string' ? item : item.value || '';
    var content = options.template ? options.template(item) : item;
    var option = _typeof(item) === 'object' ? item.option : undefined;
    var dataValue = 'data-value="' + value + '"';
    var dataOption = option !== undefined ? ' data-option="' + option + '"' : '';
    return '<a class="dropdown-item" href="#" ' + (dataValue + dataOption) + ' role="listitem" aria-label="' + value + '">' + content + '</a>';
  }).join('') : options.items;
  $node.html(markup).attr({
    'aria-label': options.title
  });
  if (options && options.codeviewKeepButton) {
    $node.addClass('note-codeview-keep');
  }
});
var dropdownButtonContents = function dropdownButtonContents(contents) {
  return contents;
};
var dropdownCheck = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-dropdown-menu dropdown-menu note-check" role="list"></div>', function ($node, options) {
  var markup = Array.isArray(options.items) ? options.items.map(function (item) {
    var value = typeof item === 'string' ? item : item.value || '';
    var content = options.template ? options.template(item) : item;
    return '<a class="dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '">' + icon(options.checkClassName) + ' ' + content + '</a>';
  }).join('') : options.items;
  $node.html(markup).attr({
    'aria-label': options.title
  });
  if (options && options.codeviewKeepButton) {
    $node.addClass('note-codeview-keep');
  }
});
var dialog = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="modal note-modal" aria-hidden="false" tabindex="-1" role="dialog"></div>', function ($node, options) {
  if (options.fade) {
    $node.addClass('fade');
  }
  $node.attr({
    'aria-label': options.title
  });
  $node.html(['<div class="modal-dialog">', '<div class="modal-content">', options.title ? '<div class="modal-header">' + '<h4 class="modal-title">' + options.title + '</h4>' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>' + '</div>' : '', '<div class="modal-body">' + options.body + '</div>', options.footer ? '<div class="modal-footer">' + options.footer + '</div>' : '', '</div>', '</div>'].join(''));
});
var popover = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create(['<div class="note-popover popover in">', '<div class="arrow"></div>', '<div class="popover-content note-children-container"></div>', '</div>'].join(''), function ($node, options) {
  var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
  $node.addClass(direction);
  if (options.hideArrow) {
    $node.find('.arrow').hide();
  }
});
var checkbox = _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="form-check"></div>', function ($node, options) {
  $node.html(['<label class="form-check-label"' + (options.id ? ' for="note-' + options.id + '"' : '') + '>', '<input type="checkbox" class="form-check-input"' + (options.id ? ' id="note-' + options.id + '"' : ''), options.checked ? ' checked' : '', ' aria-label="' + (options.text ? options.text : '') + '"', ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>', ' ' + (options.text ? options.text : '') + '</label>'].join(''));
});
var icon = function icon(iconClassName, tagName) {
  if (iconClassName.match(/^</)) {
    return iconClassName;
  }
  tagName = tagName || 'i';
  return '<' + tagName + ' class="' + iconClassName + '"></' + tagName + '>';
};
var ui = function ui(editorOptions) {
  return {
    editor: editor,
    toolbar: toolbar,
    editingArea: editingArea,
    codable: codable,
    editable: editable,
    statusbar: statusbar,
    airEditor: airEditor,
    airEditable: airEditable,
    buttonGroup: buttonGroup,
    dropdown: dropdown,
    dropdownButtonContents: dropdownButtonContents,
    dropdownCheck: dropdownCheck,
    dialog: dialog,
    popover: popover,
    icon: icon,
    checkbox: checkbox,
    options: editorOptions,
    palette: function palette($node, options) {
      return _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<div class="note-color-palette"></div>', function ($node, options) {
        var contents = [];
        for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
          var eventName = options.eventName;
          var colors = options.colors[row];
          var colorsName = options.colorsName[row];
          var buttons = [];
          for (var col = 0, colSize = colors.length; col < colSize; col++) {
            var color = colors[col];
            var colorName = colorsName[col];
            buttons.push(['<button type="button" class="note-color-btn"', 'style="background-color:', color, '" ', 'data-event="', eventName, '" ', 'data-value="', color, '" ', 'title="', colorName, '" ', 'aria-label="', colorName, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(''));
          }
          contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
        }
        $node.html(contents.join(''));
        if (options.tooltip) {
          $node.find('.note-color-btn').tooltip({
            container: options.container || editorOptions.container,
            trigger: 'hover',
            placement: 'bottom'
          });
        }
      })($node, options);
    },
    button: function button($node, options) {
      return _js_renderer__WEBPACK_IMPORTED_MODULE_2__["default"].create('<button type="button" class="note-btn btn btn-light btn-sm" tabindex="-1"></button>', function ($node, options) {
        if (options && options.tooltip) {
          $node.attr({
            title: options.tooltip,
            'aria-label': options.tooltip
          }).tooltip({
            container: options.container || editorOptions.container,
            trigger: 'hover',
            placement: 'bottom'
          }).on('click', function (e) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).tooltip('hide');
          });
        }
        if (options && options.codeviewButton) {
          $node.addClass('note-codeview-keep');
        }
      })($node, options);
    },
    toggleBtn: function toggleBtn($btn, isEnable) {
      $btn.toggleClass('disabled', !isEnable);
      $btn.attr('disabled', !isEnable);
    },
    toggleBtnActive: function toggleBtnActive($btn, isActive) {
      $btn.toggleClass('active', isActive);
    },
    onDialogShown: function onDialogShown($dialog, handler) {
      $dialog.one('shown.bs.modal', handler);
    },
    onDialogHidden: function onDialogHidden($dialog, handler) {
      $dialog.one('hidden.bs.modal', handler);
    },
    showDialog: function showDialog($dialog) {
      $dialog.modal('show');
    },
    hideDialog: function hideDialog($dialog) {
      $dialog.modal('hide');
    },
    createLayout: function createLayout($note) {
      var $editor = (editorOptions.airMode ? airEditor([editingArea([codable(), airEditable()])]) : editorOptions.toolbarPosition === 'bottom' ? editor([editingArea([codable(), editable()]), toolbar(), statusbar()]) : editor([toolbar(), editingArea([codable(), editable()]), statusbar()])).render();
      $editor.insertAfter($note);
      return {
        note: $note,
        editor: $editor,
        toolbar: $editor.find('.note-toolbar'),
        editingArea: $editor.find('.note-editing-area'),
        editable: $editor.find('.note-editable'),
        codable: $editor.find('.note-codable'),
        statusbar: $editor.find('.note-statusbar')
      };
    },
    removeLayout: function removeLayout($note, layoutInfo) {
      $note.html(layoutInfo.editable.html());
      layoutInfo.editor.remove();
      $note.show();
    }
  };
};
(jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote) = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend((jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote), {
  ui_template: ui,
  "interface": 'bs4'
});
(jquery__WEBPACK_IMPORTED_MODULE_0___default().summernote).options.styleTags = ['p', {
  title: 'Blockquote',
  tag: 'blockquote',
  className: 'blockquote',
  value: 'blockquote'
}, 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
/******/ })()
;
//# sourceMappingURL=summernote-bs4.js.map
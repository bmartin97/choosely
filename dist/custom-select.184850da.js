// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"custom-select.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

  return div.firstChild;
}

function createAttributesFromObject(attrObject) {
  return Object.values(attrObject).map(function (value) {
    return "".concat(value.nodeName, "=\"").concat(value.nodeValue, "\"");
  }).join(' ');
}

function createAttributesFromAttributeList(attrObject, attrArray) {
  return Object.values(attrObject).map(function (value) {
    if (attrArray.includes(value.nodeName)) {
      return "".concat(value.nodeName, "=\"").concat(value.nodeValue, "\"");
    }
  }).join(' ');
}

var Choosely =
/*#__PURE__*/
function () {
  function Choosely(_ref) {
    var _this = this;

    var _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? undefined : _ref$selector,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? undefined : _ref$target,
        _ref$searchable = _ref.searchable,
        searchable = _ref$searchable === void 0 ? false : _ref$searchable,
        _ref$inheritAttribute = _ref.inheritAttributes,
        inheritAttributes = _ref$inheritAttribute === void 0 ? false : _ref$inheritAttribute,
        _ref$on = _ref.on,
        on = _ref$on === void 0 ? {
      Init: Init,
      Open: Open,
      Close: Close,
      Select: Select
    } : _ref$on;

    _classCallCheck(this, Choosely);

    if (on.Init) {
      if (typeof on.Init === 'function') {
        this.onInit = on.Init;
      } else {
        console.warn("on Init property is not a function!");

        this.onInit = function () {};
      }
    } else {
      this.onInit = function () {};
    }

    if (on.Open) {
      if (typeof on.Open === 'function') {
        this.onOpen = on.Open;
      } else {
        console.warn("on Open property is not a function!");

        this.onOpen = function () {};
      }
    } else {
      this.onOpen = function () {};
    }

    if (on.Close) {
      if (typeof on.Close === 'function') {
        this.onClose = on.Close;
      } else {
        console.warn("on Close property is not a function!");

        this.onClose = function () {};
      }
    } else {
      this.onClose = function () {};
    }

    if (on.Select) {
      if (typeof on.Select === 'function') {
        this.onSelect = on.Select;
      } else {
        console.warn("on Select property is not a function!");

        this.onSelect = function () {};
      }
    } else {
      this.onSelect = function () {};
    }

    this.state = {
      _selected: null,

      set Selected(new_selected) {
        this._selected = new_selected;
      },

      get Selected() {
        return this._selected;
      },

      _options: [],

      set Options(new_options) {
        this._options = new_options;
      },

      get Options() {
        return this._options;
      },

      _filteredOptions: [],

      set FilteredOptions(value) {
        this._filteredOptions = value;
      },

      get FilteredOption() {
        return this._filteredOptions;
      },

      _isOpened: false,

      set IsOpened(value) {
        this._isOpened = value;
      },

      get IsOpened() {
        return this._isOpened;
      }

    };

    try {
      var _sourceElement = document.querySelector(selector);

      if (_sourceElement) {
        this.sourceElement = _sourceElement;
      } else {
        throw new Error("Source element doesn't exist. Selector: ".concat(selector));
      } // Select target HTML Element


      if (target) {
        var _targetElement = document.querySelector(target);

        if (_targetElement) {
          this.targetElement = _targetElement;
        } else {
          throw new Error("Target element doesn't exist. Selector: ".concat(target));
        }
      } else {
        var _targetElement2 = this.sourceElement.parentElement;

        if (_targetElement2) {
          this.targetElement = _targetElement2;
        } else {
          throw new Error("Source element doesn't have parent elements. Please define target element.");
        }
      } // Render choosely


      var options = this.sourceElement.querySelectorAll('option');

      var renderOptions = function renderOptions() {
        if (inheritAttributes) {
          if (_typeof(inheritAttributes) === 'object' && Array.isArray(inheritAttributes)) {
            // Array
            return Array.from(options).map(function (_option) {
              var text = _option.innerText;

              var _clone = _option.cloneNode();

              _clone.classList.add('choosely-option');

              var attributes = _clone.attributes;
              return "<div ".concat(createAttributesFromAttributeList(attributes, inheritAttributes), " ").concat(!inheritAttributes.includes('class') ? 'class="choosely-option"' : '', ">").concat(text, "</div>");
            });
          } else if (typeof inheritAttributes === 'boolean') {
            // True
            return Array.from(options).map(function (_option) {
              var text = _option.innerText;

              var _clone = _option.cloneNode();

              _clone.classList.add('choosely-option');

              var attributes = _clone.attributes;
              return "<div ".concat(createAttributesFromObject(attributes), " >").concat(text, "</div>");
            });
          } else {
            // Invalid type
            throw new Error("Invalid type for inheritAttributes property.");
          }
        } else {
          // False
          return Array.from(options).map(function (_option) {
            var text = _option.innerText;
            return "<div class=\"choosely-option'>".concat(text, "</div>");
          });
        }
      };

      var html = "\n                <div class=\"choosely-select\">\n                    <div class=\"choosely-selected\">\n                        ".concat(options[0].innerText, "\n                    </div>\n                    <div class=\"choosely-option-container\">\n                        ").concat(searchable ? "\n                            <div class=\"choosely-search\">\n                                <input type=\"search\" autocomplete=\"off\">\n                            </div>" : "", "\n                        ").concat(renderOptions().join(''), "\n                    </div>\n                </div >\n                ");

      var _element = createElementFromHTML(html);

      this.targetElement.appendChild(_element);
      this.chooselyElement = _element;
      this.state.Selected = _element.querySelector('.choosely-selected');
      this.state.Options = _element.querySelectorAll('.choosely-option');
      var optionElements = this.chooselyElement.querySelectorAll('.choosely-option');
      this.state.Selected.addEventListener('click', function () {
        if (_this.IsOpened) {
          _this.Close();
        } else {
          _this.Open();
        }
      });
      optionElements.forEach(function (_option) {
        _option.addEventListener('click', function () {
          _this.Select(_option);

          _this.Close();
        });
      });
      window.addEventListener('click', function (evt) {
        if (_this.IsOpened && !_this.chooselyElement.contains(evt.target)) {
          _this.Close();
        }
      });

      if (searchable) {
        var searchElement = this.chooselyElement.querySelector('.choosely-search > input');
        searchElement.addEventListener('input', function (event) {
          var keyword = event.target.value;

          _this.state.Options.forEach(function (_option) {
            if (!_option.innerText.includes(keyword)) {
              _option.classList.add('hidden');
            } else {
              _option.classList.remove('hidden');
            }
          });
        });
      }

      return this;
    } catch (err) {
      console.error(err, 'Choosely.js');
    } finally {
      this.onInit();
    }
  }
  /**
   * @param {HTMLElement} option
   */


  _createClass(Choosely, [{
    key: "Select",
    value: function Select(option) {
      this.state.Selected.innerText = option.innerText;
      this.onSelect();
    }
  }, {
    key: "Open",
    value: function Open() {
      this.chooselyElement.classList.add('c-opened');
      this.IsOpened = true;
      this.onOpen();
    }
  }, {
    key: "Close",
    value: function Close() {
      this.chooselyElement.classList.remove('c-opened');
      this.IsOpened = false;
      this.onClose();
    }
  }]);

  return Choosely;
}();

var selector1 = new Choosely({
  selector: 'form .form-item.form-type-select select',
  searchable: true,
  inheritAttributes: ['value', 'style'],
  // default false,
  on: {
    Init: function Init() {
      console.log('Init.');
    },
    Open: function Open() {
      console.log('Open.');
    },
    Close: function Close() {
      console.log('Close.');
    },
    Select: function Select() {
      console.log('Select.');
    }
  }
});
console.log(selector1);
},{}],"../Users/user/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61214" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../Users/user/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","custom-select.js"], null)
//# sourceMappingURL=/custom-select.184850da.js.map
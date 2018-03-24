// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],5:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":7}],3:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":5}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TRACE = 10;
var DEBUG = 20;
var INFO = 30;
var WARN = 40;
var ERROR = 50;
var FATAL = 60;
var levelFromName = {
    'trace': TRACE,
    'debug': DEBUG,
    'info': INFO,
    'warn': WARN,
    'error': ERROR,
    'fatal': FATAL
};
var nameFromLevel = {};
Object.keys(levelFromName).forEach(function (name) {
    nameFromLevel[levelFromName[name]] = name;
});
function resolveLevel(nameOrNum) {
    return typeof nameOrNum === 'string' ? levelFromName[nameOrNum.toLowerCase()] : nameOrNum;
}

var CALL_STACK_ERROR = 'call-stack-error';
function objCopy(obj) {
    if (typeof obj === 'undefined' || obj === null) {
        return obj;
    } else if (Array.isArray(obj)) {
        return obj.slice();
    } else if (typeof obj === 'object') {
        var copy = {};
        Object.keys(obj).forEach(function (k) {
            copy[k] = obj[k];
        });
        return copy;
    } else {
        return obj;
    }
}

function inspect(obj) {
    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (Array.isArray(obj)) {
        var items = obj.map(function (obj) {
            return inspect(obj);
        });
        return '[ ' + items.join(', ') + ' ]';
    }
    if (typeof obj === 'object') {
        return JSON.stringify(obj);
    }
    if (typeof obj === 'function') {
        return '[Function: ' + obj.name + ']';
    }
    if (typeof obj === 'boolean' || typeof obj === 'number') {
        return obj;
    }
    return '\'' + obj.toString() + '\'';
}

function format(f) {
    var arguments$1 = arguments;

    if (typeof f !== 'string') {
        var objects = new Array(arguments.length);
        for (var i$1 = 0; i$1 < arguments.length; i$1++) {
            objects[i$1] = inspect(arguments$1[i$1]);
        }
        return objects.join(' ');
    }
    var formatRegExp = /%[sdj%]/g;
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x) {
        if (x === '%%') {
            return '%';
        }
        if (i >= len) {
            return x;
        }
        switch (x) {
            case '%s':
                return String(args[i++]);
            case '%d':
                return Number(args[i++]);
            case '%j':
                try {
                    return JSON.stringify(args[i++]);
                } catch (_) {
                    return '[Circular]';
                }
            default:
                return x;
        }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
        str += ' ' + x;
    }
    return str;
}

function extractSrcFromStacktrace(stack, level) {
    var stackLines = stack.split('\n');
    if (stackLines[0] && stackLines[0].indexOf(CALL_STACK_ERROR) >= 0) {
        stackLines.shift();
    }
    var targetLine = stackLines[level];
    var lineInfo = null;
    if (targetLine) {
        var execResult = /^\s*(at|.*@)\s*(.+)?$/.exec(targetLine);
        if (Array.isArray(execResult) && execResult[2]) {
            lineInfo = execResult[2];
        } else {
            lineInfo = targetLine;
        }
    }
    return lineInfo;
}

function _indent(s, indent) {
    if (!indent) {
        indent = '    ';
    }
    var lines = s.split(/\r?\n/g);
    return indent + lines.join('\n' + indent);
}

var _warned = {};
function _warn(msg, dedupKey) {
    if (dedupKey) {
        if (_warned[dedupKey]) {
            return;
        }
        _warned[dedupKey] = true;
    }
    console.error(msg + '\n');
}

function _haveWarned(dedupKey) {
    return _warned[dedupKey];
}

function safeCycles() {
    var seen = [];
    return function (key, val) {
        if (!val || typeof val !== 'object') {
            return val;
        }
        if (seen.indexOf(val) !== -1) {
            return '[Circular]';
        }
        seen.push(val);
        return val;
    };
}

var TRACE$1 = 10;
var DEBUG$1 = 20;
var INFO$1 = 30;
var WARN$1 = 40;
var ERROR$1 = 50;
var FATAL$1 = 60;
var levelFromName$1 = {
    'trace': TRACE$1,
    'debug': DEBUG$1,
    'info': INFO$1,
    'warn': WARN$1,
    'error': ERROR$1,
    'fatal': FATAL$1
};
Object.keys(levelFromName$1).forEach(function (name) {});
var ConsoleRawStream = function ConsoleRawStream() {};
ConsoleRawStream.prototype.write = function write(rec) {
    if (rec.level < INFO$1) {
        console.log(rec);
    } else if (rec.level < WARN$1) {
        console.info(rec);
    } else if (rec.level < ERROR$1) {
        console.warn(rec);
    } else {
        console.error(rec);
    }
    if (rec.err && rec.err.stack) {
        console.error(rec.err.stack);
    }
    if (rec.obj) {
        console.log(rec.obj);
    }
};

var LOG_VERSION = 1;
var Logger = function Logger(options, _childOptions, _childSimple) {
    var this$1 = this;

    if (!(this instanceof Logger)) {
        return new Logger(options, _childOptions);
    }
    var parent;
    if (_childOptions !== undefined) {
        parent = options;
        options = _childOptions;
        if (!(parent instanceof Logger)) {
            throw new TypeError('invalid Logger creation: do not pass a second arg');
        }
    }
    if (!options) {
        throw new TypeError('options (object) is required');
    }
    if (!parent) {
        if (!options.name) {
            throw new TypeError('options.name (string) is required');
        }
    } else {
        if (options.name) {
            throw new TypeError('invalid options.name: child cannot set logger name');
        }
    }
    if (options.stream && options.streams) {
        throw new TypeError('cannot mix "streams" and "stream" options');
    }
    if (options.streams && !Array.isArray(options.streams)) {
        throw new TypeError('invalid options.streams: must be an array');
    }
    if (options.serializers && (typeof options.serializers !== 'object' || Array.isArray(options.serializers))) {
        throw new TypeError('invalid options.serializers: must be an object');
    }
    var fields, name, i;
    if (parent && _childSimple) {
        this._level = parent._level;
        this.streams = parent.streams;
        this.serializers = parent.serializers;
        this.src = parent.src;
        fields = this.fields = {};
        var parentFieldNames = Object.keys(parent.fields);
        for (i = 0; i < parentFieldNames.length; i++) {
            name = parentFieldNames[i];
            fields[name] = parent.fields[name];
        }
        var names = Object.keys(options);
        for (i = 0; i < names.length; i++) {
            name = names[i];
            fields[name] = options[name];
        }
        return;
    }
    if (parent) {
        this._level = parent._level;
        this.streams = [];
        for (i = 0; i < parent.streams.length; i++) {
            var s = objCopy(parent.streams[i]);
            this$1.streams.push(s);
        }
        this.serializers = objCopy(parent.serializers);
        this.src = parent.src;
        this.fields = objCopy(parent.fields);
        if (options.level) {
            this.level(options.level);
        }
    } else {
        this._level = Number.POSITIVE_INFINITY;
        this.streams = [];
        this.serializers = null;
        this.src = false;
        this.fields = {};
    }
    if (options.stream) {
        this.addStream({
            type: 'stream',
            stream: options.stream,
            level: options.level
        });
    } else if (options.streams) {
        options.streams.forEach(function (s) {
            this$1.addStream(s, options.level);
        });
    } else if (parent && options.level) {
        this.level(options.level);
    } else if (!parent) {
        this.addStream({
            type: 'raw',
            stream: new ConsoleRawStream(),
            level: options.level
        });
    }
    if (options.serializers) {
        this.addSerializers(options.serializers);
    }
    if (options.src) {
        this.src = true;
    }
    fields = objCopy(options);
    delete fields.stream;
    delete fields.level;
    delete fields.streams;
    delete fields.serializers;
    delete fields.src;
    if (this.serializers) {
        this._applySerializers(fields);
    }
    Object.keys(fields).forEach(function (k) {
        this$1.fields[k] = fields[k];
    });
};
Logger.prototype.addStream = function addStream(s, defaultLevel) {
    if (defaultLevel === void 0) defaultLevel = INFO;

    s = objCopy(s);
    s.type = 'raw';
    s.level = resolveLevel(s.level || defaultLevel);
    if (s.level < this._level) {
        this._level = s.level;
    }
    this.streams.push(s);
    delete this.haveNonRawStreams;
};
Logger.prototype.addSerializers = function addSerializers(serializers) {
    var this$1 = this;

    if (!this.serializers) {
        this.serializers = {};
    }
    Object.keys(serializers).forEach(function (field) {
        var serializer = serializers[field];
        if (typeof serializer !== 'function') {
            throw new TypeError(format('invalid serializer for "%s" field: must be a function', field));
        }
        this$1.serializers[field] = serializer;
    });
};
Logger.prototype.child = function child(options, simple) {
    return new this.constructor(this, options || {}, simple);
};
Logger.prototype.level = function level(value) {
    var this$1 = this;

    if (value === undefined) {
        return this._level;
    }
    var newLevel = resolveLevel(value);
    var len = this.streams.length;
    for (var i = 0; i < len; i++) {
        this$1.streams[i].level = newLevel;
    }
    this._level = newLevel;
};
Logger.prototype.levels = function levels(name, value) {
    var this$1 = this;

    if (name === undefined) {
        return this.streams.map(function (s) {
            return s.level;
        });
    }
    var stream;
    if (typeof name === 'number') {
        stream = this.streams[name];
        if (stream === undefined) {
            throw new Error('invalid stream index: ' + name);
        }
    } else {
        var len = this.streams.length;
        for (var i = 0; i < len; i++) {
            var s = this$1.streams[i];
            if (s.name === name) {
                stream = s;
                break;
            }
        }
        if (!stream) {
            throw new Error(format('no stream with name "%s"', name));
        }
    }
    if (value === undefined) {
        return stream.level;
    } else {
        var newLevel = resolveLevel(value);
        stream.level = newLevel;
        if (newLevel < this._level) {
            this._level = newLevel;
        }
    }
};
Logger.prototype._applySerializers = function _applySerializers(fields, excludeFields) {
    var this$1 = this;

    Object.keys(this.serializers).forEach(function (name) {
        if (fields[name] === undefined || excludeFields && excludeFields[name]) {
            return;
        }
        try {
            fields[name] = this$1.serializers[name](fields[name]);
        } catch (err) {
            _warn(format('bunyan: ERROR: Exception thrown from the "%s" ' + 'Bunyan serializer. This should never happen. This is a bug' + 'in that serializer function.\n%s', name, err.stack || err));
            fields[name] = format('(Error in Bunyan log "%s" serializer broke field. See stderr for details.)', name);
        }
    });
};
Logger.prototype._emit = function _emit(rec, noemit) {
    var this$1 = this;

    var i;
    if (this.haveNonRawStreams === undefined) {
        this.haveNonRawStreams = false;
        for (i = 0; i < this.streams.length; i++) {
            if (!this$1.streams[i].raw) {
                this$1.haveNonRawStreams = true;
                break;
            }
        }
    }
    var str;
    if (noemit || this.haveNonRawStreams) {
        try {
            str = JSON.stringify(rec, safeCycles()) + '\n';
        } catch (e) {
            var dedupKey = e.stack.split(/\n/g, 2).join('\n');
            _warn('bunyan: ERROR: Exception in ' + '`JSON.stringify(rec)`. You can install the ' + '"safe-json-stringify" module to have Bunyan fallback ' + 'to safer stringification. Record:\n' + _indent(format('%s\n%s', rec, e.stack)), dedupKey);
            str = format('(Exception in JSON.stringify(rec): %j. See stderr for details.)\n', e.message);
        }
    }
    if (noemit) {
        return str;
    }
    var level = rec.level;
    for (i = 0; i < this.streams.length; i++) {
        var s = this$1.streams[i];
        if (s.level <= level) {
            s.stream.write(rec);
        }
    }
    return str;
};
function mkLogEmitter(minLevel) {
    return function () {
        var log = this;
        function mkRecord(args) {
            var excludeFields;
            if (args[0] instanceof Error) {
                fields = {
                    err: log.serializers && log.serializers.err ? log.serializers.err(args[0]) : stdSerializers.err(args[0])
                };
                excludeFields = {
                    err: true
                };
                if (args.length === 1) {
                    msgArgs = [fields.err.message];
                } else {
                    msgArgs = Array.prototype.slice.call(args, 1);
                }
            } else if (typeof args[0] !== 'object' && args[0] !== null || Array.isArray(args[0])) {
                fields = null;
                msgArgs = Array.prototype.slice.call(args);
            } else {
                fields = args[0];
                if (args.length === 1 && fields.err && fields.err instanceof Error) {
                    msgArgs = [fields.err.message];
                } else {
                    msgArgs = Array.prototype.slice.call(args, 1);
                }
            }
            var rec = objCopy(log.fields);
            rec.level = minLevel;
            var recFields = fields ? objCopy(fields) : null;
            if (recFields) {
                if (log.serializers) {
                    log._applySerializers(recFields, excludeFields);
                }
                Object.keys(recFields).forEach(function (k) {
                    rec[k] = recFields[k];
                });
            }
            rec.levelName = nameFromLevel[minLevel];
            rec.msg = msgArgs.length ? format.apply(log, msgArgs) : '';
            if (!rec.time) {
                rec.time = new Date();
            }
            if (log.src && !rec.src) {
                try {
                    throw new Error(CALL_STACK_ERROR);
                } catch (err) {
                    var src = extractSrcFromStacktrace(err.stack, 2);
                    if (!src && !_haveWarned('src')) {
                        _warn('Unable to determine src line info', 'src');
                    }
                    rec.src = src || '';
                }
            }
            rec.v = LOG_VERSION;
            return rec;
        }

        var fields = null;
        var msgArgs = arguments;
        var rec = null;
        if (arguments.length === 0) {
            return this._level <= minLevel;
        } else if (this._level > minLevel) {} else {
            rec = mkRecord(msgArgs);
            this._emit(rec);
        }
    };
}

Logger.prototype.trace = mkLogEmitter(TRACE);
Logger.prototype.debug = mkLogEmitter(DEBUG);
Logger.prototype.info = mkLogEmitter(INFO);
Logger.prototype.warn = mkLogEmitter(WARN);
Logger.prototype.error = mkLogEmitter(ERROR);
Logger.prototype.fatal = mkLogEmitter(FATAL);
function getFullErrorStack(ex) {
    var ret = ex.stack || ex.toString();
    if (ex.cause && typeof ex.cause === 'function') {
        var cex = ex.cause();
        if (cex) {
            ret += '\nCaused by: ' + getFullErrorStack(cex);
        }
    }
    return ret;
}

var stdSerializers = {
    err: function (err) {
        if (!err || !err.stack) {
            return err;
        }
        return {
            message: err.message,
            name: err.name,
            stack: getFullErrorStack(err),
            code: err.code,
            signal: err.signal
        };
    }
};
function createLogger() {
    var args = [],
        len = arguments.length;
    while (len--) args[len] = arguments[len];

    return new (Function.prototype.bind.apply(Logger, [null].concat(args)))();
}

var TRACE$2 = 10;
var DEBUG$2 = 20;
var INFO$2 = 30;
var WARN$2 = 40;
var ERROR$2 = 50;
var FATAL$2 = 60;
var levelFromName$2 = {
    'trace': TRACE$2,
    'debug': DEBUG$2,
    'info': INFO$2,
    'warn': WARN$2,
    'error': ERROR$2,
    'fatal': FATAL$2
};
var nameFromLevel$1 = {};
Object.keys(levelFromName$2).forEach(function (name) {
    nameFromLevel$1[levelFromName$2[name]] = name;
});
var DEFAULT_CSS = {
    levels: {
        trace: 'color: DeepPink',
        debug: 'color: GoldenRod',
        info: 'color: DarkTurquoise',
        warn: 'color: Purple',
        error: 'color: Crimson',
        fatal: 'color: Black'
    },
    def: 'color: DimGray',
    msg: 'color: SteelBlue',
    src: 'color: DimGray; font-style: italic; font-size: 0.9em'
};
var ConsoleFormattedStream = function ConsoleFormattedStream(ref) {
    if (ref === void 0) {
        ref = {};
    }
    var logByLevel = ref.logByLevel;
    if (logByLevel === void 0) {
        logByLevel = false;
    }
    var css = ref.css;
    if (css === void 0) {
        css = DEFAULT_CSS;
    }
    this.logByLevel = logByLevel;
    this.css = css;
};
ConsoleFormattedStream.prototype.write = function write(rec) {
    var levelCss, consoleMethod;
    var defaultCss = this.css.def;
    var msgCss = this.css.msg;
    var srcCss = this.css.src;
    var loggerName = rec.childName ? rec.name + '/' + rec.childName : rec.name;
    var levelName = nameFromLevel$1[rec.level];
    var formattedLevelName = (Array(6 - levelName.length).join(' ') + levelName).toUpperCase();
    if (this.logByLevel) {
        if (rec.level === TRACE$2) {
            levelName = 'debug';
        } else if (rec.level === FATAL$2) {
            levelName = 'error';
        }
        consoleMethod = typeof console[levelName] === 'function' ? console[levelName] : console.log;
    } else {
        consoleMethod = console.log;
    }
    if (rec.level < DEBUG$2) {
        levelCss = this.css.levels.trace;
    } else if (rec.level < INFO$2) {
        levelCss = this.css.levels.debug;
    } else if (rec.level < WARN$2) {
        levelCss = this.css.levels.info;
    } else if (rec.level < ERROR$2) {
        levelCss = this.css.levels.warn;
    } else if (rec.level < FATAL$2) {
        levelCss = this.css.levels.error;
    } else {
        levelCss = this.css.levels.fatal;
    }
    var padZeros = function (number, len) {
        return Array(len + 1 - (number + '').length).join('0') + number;
    };
    var logArgs = [];
    logArgs.push("[%s:%s:%s:%s] %c%s%c: %s: %c%s " + (rec.src ? '%c%s' : ''));
    logArgs.push(padZeros(rec.time.getHours(), 2));
    logArgs.push(padZeros(rec.time.getMinutes(), 2));
    logArgs.push(padZeros(rec.time.getSeconds(), 2));
    logArgs.push(padZeros(rec.time.getMilliseconds(), 4));
    logArgs.push(levelCss);
    logArgs.push(formattedLevelName);
    logArgs.push(defaultCss);
    logArgs.push(loggerName);
    logArgs.push(msgCss);
    logArgs.push(rec.msg);
    if (rec.src) {
        logArgs.push(srcCss);
        logArgs.push(rec.src);
    }
    consoleMethod.apply(console, logArgs);
    if (rec.err && rec.err.stack) {
        consoleMethod.call(console, '%c%s,', levelCss, rec.err.stack);
    }
    if (rec.obj) {
        consoleMethod.call(console, rec.obj);
    }
};
ConsoleFormattedStream.getDefaultCss = function getDefaultCss() {
    return DEFAULT_CSS;
};

exports.TRACE = TRACE;
exports.DEBUG = DEBUG;
exports.INFO = INFO;
exports.WARN = WARN;
exports.ERROR = ERROR;
exports.FATAL = FATAL;
exports.resolveLevel = resolveLevel;
exports.levelFromName = levelFromName;
exports.nameFromLevel = nameFromLevel;
exports.stdSerializers = stdSerializers;
exports.Logger = Logger;
exports.createLogger = createLogger;
exports.safeCycles = safeCycles;
exports.ConsoleFormattedStream = ConsoleFormattedStream;
exports.ConsoleRawStream = ConsoleRawStream;
//# sourceMappingURL=index.m.js.map
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browserBunyan = require('browser-bunyan');

var logger = (0, _browserBunyan.createLogger)({ name: 'client-logger' });

exports.default = logger;
},{"browser-bunyan":9}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SynthController = function SynthController() {
  _classCallCheck(this, SynthController);

  _logger2.default.debug('SynthController constructed');
};

exports.default = SynthController;
},{"../../lib/logger":8}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SynthController2 = require('./SynthController');

var _SynthController3 = _interopRequireDefault(_SynthController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubSynthController = function (_SynthController) {
    _inherits(SubSynthController, _SynthController);

    function SubSynthController() {
        _classCallCheck(this, SubSynthController);

        return _possibleConstructorReturn(this, (SubSynthController.__proto__ || Object.getPrototypeOf(SubSynthController)).call(this));
    }

    return SubSynthController;
}(_SynthController3.default);

exports.default = SubSynthController;
},{"./SynthController":6}],2:[function(require,module,exports) {
'use strict';

require('./index.styl');

var _SubSynthController = require('./modules/synths/SubSynthController');

var _SubSynthController2 = _interopRequireDefault(_SubSynthController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var synth = new _SubSynthController2.default();

console.log(synth);
},{"./index.styl":3,"./modules/synths/SubSynthController":4}],10:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55256' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
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
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[10,2])
//# sourceMappingURL=/dist/74e414c56d08301a449566144d200052.map
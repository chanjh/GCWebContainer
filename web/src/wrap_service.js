"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.wrapFunction = void 0;
var invoker_1 = require("./invoker");
var lock_1 = require("./lock");
function wrapFunction(name, bridge, method) {
    var callbackFunc = function () {
        var max = 9999;
        var min = 0;
        var random = parseInt("".concat(Math.random() * (max - min + 1) + min), 10);
        var global = window.gc._config.global;
        return "".concat(global, "_").concat(name, "_callback_func_").concat(random);
    };
    function _initCallback(callback) {
        window[callback] = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var global = window.gc._config.global;
            lock.unlock(arg[0]);
            delete window[callback];
        };
    }
    var lock = new lock_1["default"]();
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var callback, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callback = callbackFunc();
                        _initCallback(callback);
                        params = JSON.parse(JSON.stringify(arg));
                        lock = new lock_1["default"]();
                        lock.lock();
                        return [4, (0, invoker_1["default"])("".concat(bridge, ".").concat(method), params, callback)];
                    case 1:
                        _a.sent();
                        return [4, lock.status];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
}
exports.wrapFunction = wrapFunction;
var ServiceWrapper = (function () {
    function ServiceWrapper(serviceInfo) {
        this.serviceInfo = serviceInfo;
        this._initMethods();
    }
    ServiceWrapper.prototype._initMethods = function () {
        var _this = this;
        var constructorFunc = "constructor";
        var methods = this.serviceInfo.methods;
        methods.forEach(function (m) {
            if (m !== constructorFunc) {
                var _a = _this.serviceInfo, name_1 = _a.name, bridge = _a.bridge;
                _this[m] = wrapFunction(name_1, bridge, m);
            }
        });
    };
    return ServiceWrapper;
}());
exports["default"] = ServiceWrapper;
//# sourceMappingURL=wrap_service.js.map
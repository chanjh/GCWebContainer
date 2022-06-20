"use strict";
exports.__esModule = true;
function register(name, fn) {
    var global = window.gc._config.global;
    var host = window[global].bridge;
    host[name] = fn;
}
exports["default"] = register;
//# sourceMappingURL=register.js.map
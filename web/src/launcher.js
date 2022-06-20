"use strict";
exports.__esModule = true;
var global_1 = require("./global");
var bridge_1 = require("./bridge");
var defaultConfig = require("./config.default");
function launcher(config) {
    var finalConfig = config;
    if (!config) {
        finalConfig = defaultConfig["default"];
    }
    var global = finalConfig.global;
    window["".concat(global)] = new global_1["default"]();
    window["".concat(global)].bridge = new bridge_1["default"]();
    window.gc._config = finalConfig;
    require('./event_center');
}
exports["default"] = launcher;
//# sourceMappingURL=launcher.js.map
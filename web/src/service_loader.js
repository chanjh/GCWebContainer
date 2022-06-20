"use strict";
exports.__esModule = true;
exports.injectService = void 0;
var wrap_service_1 = require("./wrap_service");
function loadAllServices() {
    var services = window.gc._config.services;
    var global = window.gc._config.global;
    var host = window[global].bridge;
    parseService(services, '', host);
    loadDefaultServices();
    function parseService(service, namespace, host) {
        if (Array.isArray(service)) {
            return service;
        }
        Object.keys(service).forEach(function (name) {
            var newNamespace = namespace.length == 0 ? name : "".concat(namespace, ".").concat(name);
            host[name] = Object();
            var methods = parseService(service[name], newNamespace, host[name]);
            if (methods) {
                var wrapper = new wrap_service_1["default"]({
                    name: name,
                    bridge: newNamespace,
                    methods: methods
                });
                host[name] = wrapper;
            }
        });
    }
}
exports["default"] = loadAllServices;
function bridgeName(service) {
    return service[0].toLowerCase() + service.substring(1).split('Service')[0];
}
function loadDefaultServices() {
    var req = require.context("./services", true, /\.js$/);
    req.keys().forEach(function (key) {
        var js = req(key);
        injectService(js);
    });
}
function injectService(service) {
    if (service.__esModule) {
        var namespace = service["default"].namespace;
        var global_1 = window.gc._config.global;
        var point_1 = window[global_1].bridge;
        namespace.split('.').forEach(function (name) {
            if (!point_1[name]) {
                point_1[name] = new Object();
            }
            point_1 = point_1[name];
        });
        var methods = Object.getOwnPropertyNames(service["default"].prototype);
        methods.forEach(function (m) {
            if (m !== 'constructor' && !m.startsWith('native_')) {
                point_1[m] = function () {
                    var arg = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arg[_i] = arguments[_i];
                    }
                    var serviceIns = (new service["default"]());
                    return serviceIns[m](arg);
                };
            }
        });
    }
}
exports.injectService = injectService;
//# sourceMappingURL=service_loader.js.map
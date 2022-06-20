"use strict";
exports.__esModule = true;
var register_1 = require("./register");
var EventCenter = (function () {
    function EventCenter() {
        this.listeners = {};
    }
    EventCenter.prototype.subscribe = function (event, fn) {
        var listeners = this.listeners;
        var listenersForEvent = listeners[event];
        if (!listenersForEvent) {
            listenersForEvent = [];
        }
        listenersForEvent.push(fn);
        listeners[event] = listenersForEvent;
    };
    EventCenter.prototype.publish = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var listeners = this.listeners;
        var listenersForEvent = listeners[event];
        if (listenersForEvent) {
            for (var _a = 0, listenersForEvent_1 = listenersForEvent; _a < listenersForEvent_1.length; _a++) {
                var listener = listenersForEvent_1[_a];
                listener.apply(void 0, params);
            }
        }
    };
    return EventCenter;
}());
exports["default"] = EventCenter;
(0, register_1["default"])('eventCenter', new EventCenter());
//# sourceMappingURL=event_center.js.map
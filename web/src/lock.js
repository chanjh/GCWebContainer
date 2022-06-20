"use strict";
exports.__esModule = true;
var Lock = (function () {
    function Lock() {
        this.status = new Promise(function (resolve) { resolve(true); });
    }
    Lock.prototype.lock = function () {
        var _this = this;
        this.status = new Promise(function (resolve) { _this.callback = resolve; });
    };
    Lock.prototype.unlock = function (result) {
        this.callback(result);
    };
    return Lock;
}());
exports["default"] = Lock;
//# sourceMappingURL=lock.js.map
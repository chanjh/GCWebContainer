"use strict";
exports.__esModule = true;
var config = {
    bridgeName: 'invoke',
    global: 'gc',
    services: {
        util: {
            contextMenu: ['clear'],
            test: ['testMethod']
        },
        runtime: {
            system: {
                lifecyle: {
                    app: ['willopen']
                }
            },
            test: ['testMethod']
        }
    }
};
exports["default"] = config;
//# sourceMappingURL=config.default.js.map
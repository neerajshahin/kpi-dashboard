"use strict";
var log4js = require('log4js');
var moment = require('moment');
var APP_CONFIG = require("../config/app_config");
var LogConfig = (function () {
    function LogConfig() {
    }
    LogConfig.prototype.getLogger = function (name) {
        var date = moment().format('YYYY-MM-DD');
        if (APP_CONFIG.LOG_ENABLE_CONSOLE_LOG == true) {
            log4js.configure({
                appenders: [
                    {
                        type: 'console'
                    },
                    {
                        type: 'file',
                        filename: APP_CONFIG.LOG_DIR + date + '-' + APP_CONFIG.LOG_FILE_NAME,
                        maxLogSize: APP_CONFIG.LOG_MAX_FILE_SIZE,
                        backups: APP_CONFIG.LOG_NO_OF_BACKUPS
                    },
                ]
            });
        }
        else {
            log4js.configure({
                appenders: [
                    {
                        type: 'file',
                        filename: APP_CONFIG.LOG_DIR + date + '-' + APP_CONFIG.LOG_FILE_NAME,
                        maxLogSize: APP_CONFIG.LOG_MAX_FILE_SIZE,
                        backups: APP_CONFIG.LOG_NO_OF_BACKUPS
                    },
                ]
            });
        }
        return log4js.getLogger(name);
    };
    return LogConfig;
}());
module.exports = LogConfig;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/src/util/logconfig.js.map
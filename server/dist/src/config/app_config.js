"use strict";
var config = require("../config");
var ApplicationConfig = (function () {
    function ApplicationConfig() {
    }
    return ApplicationConfig;
}());
ApplicationConfig.PORT = config.PORT;
ApplicationConfig.ENV = config.env;
ApplicationConfig.LOG_DIR = config.LOG_DIR ? config.LOG_DIR : "/logs/";
ApplicationConfig.LOG_FILE_NAME = config.LOG_FILE_NAME ? config.LOG_FILE_NAME : "log_file.log";
ApplicationConfig.LOG_MAX_FILE_SIZE = config.LOG_MAX_FILE_SIZE ? config.LOG_MAX_FILE_SIZE : "100000";
ApplicationConfig.LOG_NO_OF_BACKUPS = config.LOG_NO_OF_BACKUPS ? config.LOG_NO_OF_BACKUPS : "10";
ApplicationConfig.LOG_ENABLE_CONSOLE_LOG = config.LOG_ENABLE_CONSOLE_LOG ? config.LOG_ENABLE_CONSOLE_LOG : false;
module.exports = ApplicationConfig;
//# sourceMappingURL=/Users/arunbillava/Projects/api-status/tnf-api-dashboard/server/dist/src/config/app_config.js.map
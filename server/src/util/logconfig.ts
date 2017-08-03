const log4js = require('log4js');
var moment = require('moment');
import APP_CONFIG = require("../config/app_config");

class LogConfig {
    getLogger(name: string) {
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
                        maxLogSize: APP_CONFIG.LOG_MAX_FILE_SIZE, /*In bytes 100000=>100kb */
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
                        maxLogSize: APP_CONFIG.LOG_MAX_FILE_SIZE, /*In bytes 100000=>100kb */
                        backups: APP_CONFIG.LOG_NO_OF_BACKUPS
                    },
                ]
            });
        }

        return log4js.getLogger(name);
    }
}
export = LogConfig;      
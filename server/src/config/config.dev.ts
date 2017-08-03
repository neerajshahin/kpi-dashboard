
var config: any = {};
config.env = 'dev';
config.PORT = "3000";
config.LOG_DIR = '/logs/';
config.LOG_FILE_NAME = 'log_file.log';
config.LOG_MAX_FILE_SIZE = "100000"; /*In bytes 100000=>100kb */
config.LOG_NO_OF_BACKUPS = "10";
config.LOG_ENABLE_CONSOLE_LOG = false;

module.exports = config;

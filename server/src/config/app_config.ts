var config = require("../config")
class ApplicationConfig {
    public static PORT : string = config.PORT;
    public static ENV : string = config.env;
    public static LOG_DIR = config.LOG_DIR ? config.LOG_DIR : "/logs/";
    public static LOG_FILE_NAME = config.LOG_FILE_NAME ? config.LOG_FILE_NAME : "log_file.log";
    public static LOG_MAX_FILE_SIZE = config.LOG_MAX_FILE_SIZE ? config.LOG_MAX_FILE_SIZE : "100000";
    public static LOG_NO_OF_BACKUPS = config.LOG_NO_OF_BACKUPS ? config.LOG_NO_OF_BACKUPS : "10";
    public static LOG_ENABLE_CONSOLE_LOG = config.LOG_ENABLE_CONSOLE_LOG ? config.LOG_ENABLE_CONSOLE_LOG : false;
}
export = ApplicationConfig;

var config: any = {};
config.CLIENT_ID = "5ae8e1bde87a5b8d1dc2eaeb99bb3c62a4f5deb41438bf15b71c93b79e8773f1";
config.CLIENT_SECRET = "b8e6239f13175526bddbdfb574bf943934b2132453d1d91bc7f86d50eb69c8c5";
config.SCOPES = "mail openid profile";

config.REDIRECT_URI = "http://localhost:3000/login/callback";
config.env = 'test';
config.PORT = "3000";
config.CUSTOMER_API_URI = 'https://api-dev.taylorandfrancis.com/v1/customer';
config.IAM_API_URI = "https://api-dev.taylorandfrancis.com/v2/auth";
config.OADASHBOARD_HOME_ROUTE = '/oadashboard/';

config.LOG_DIR = '../logs/';
config.LOG_FILE_NAME = 'log_file.log';
config.LOG_MAX_FILE_SIZE = "100000"; /*In bytes 100000=>100kb */
config.LOG_NO_OF_BACKUPS = "10";
config.LOG_ENABLE_CONSOLE_LOG = false;

module.exports = config;
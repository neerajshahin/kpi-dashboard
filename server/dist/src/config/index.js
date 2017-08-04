var env = process.env.NODE_ENV || 'dev', cfg = require('../config/config.' + env);
console.log("Configurations-----" + JSON.stringify(cfg));
module.exports = cfg;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/src/config/index.js.map
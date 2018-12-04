var argv = require('yargs').argv
var apps = {
  es6: {
    name: 'es6',
    entry: './src/entrance/es6',
    APP_ENV: '"es6"'
  }
}

var startedApp = apps[argv.configName]
console.log('--------', startedApp, '--------', argv.configName)
module.exports = startedApp

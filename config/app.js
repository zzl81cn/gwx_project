var argv = require('yargs').argv
var apps = {
  es6: {
    name: 'es6',
    entry: './src/entrance/es6',
    APP_ENV: '"es6"'
  },
  axios: {
    name: 'axios',
    entry: './src/entrance/axios',
    APP_ENV: '"axios"'
  },
  explore: {
    name: 'explore',
    entry: './src/entrance/explore',
    APP_ENV: '"explore"'
  },
  practice: {
    name: 'practice',
    entry: './src/entrance/practice',
    APP_ENV: '"practice"'
  },
  regExp: {
    name: 'regExp',
    entry: './src/entrance/regExp',
    APP_ENV: '"regExp"'
  },
  vueApi: {
    name: 'vueApi',
    entry: './src/entrance/vueApi',
    APP_ENV: '"vueApi"'
  }
}

var startedApp = apps[argv.configName]
module.exports = startedApp

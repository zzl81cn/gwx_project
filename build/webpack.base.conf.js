'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const app = require('../config/app')

// 方法用来拼接 当前路径 + 上一级 + 目标路径
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const webpackConfig = {
  // context 路径为 D:\work\gwx_project
  // __dirname 路径为 D:\work\gwx_project\build
  context: path.resolve(__dirname, '../'),
  // 入口 app.entry路径为  ./src/entrance/explore
  entry: {
    app: app.entry
  },
  output: {
    // 出口路径为 D:\work\gwx_project\dist
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: utils.assetsSubDirectory()
  },
  // 配置模块的解析方式
  resolve: {
    // 自动解决某些扩展 这是导致用户在导入时不使用扩展名的原因 import File from '../path/to/file';省略写 js和vue json 优先级按顺序
    extensions: ['.js', '.vue', '.json'],
    // 更轻松地创建别名import或require某些模块用别称来代替相对路径
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // 这些选项决定了如何处理项目中不同类型的模块
  module: {
    // 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.s[a|c]ss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'less-theme',
      path: 'src/styles/vux.less'
    }
  ]
})

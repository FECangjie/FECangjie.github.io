var common = require('./config.common')
const SyncMDDataPlugin = require('./SyncMDDataPlugin')


module.exports = function (webpackConfig, redSkull, webpackPlugins) {

  webpackConfig = common(webpackConfig, redSkull, webpackPlugins)

  webpackConfig.devtool = 'source-map'


  webpackConfig.plugins.push(new SyncMDDataPlugin())

  return webpackConfig
}

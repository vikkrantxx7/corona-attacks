const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const utils = require('./utils.js')
const devConfig = require('./webpack.config.dev.js')

const port = utils.getProcessArg('port', 9100)
const hotOnly = utils.getProcessArg('hotOnly', false)
const hot = utils.getProcessArg('hot', false)
const worker = utils.getProcessArg('worker', '')
const wbLogsOff = utils.getProcessArg('logsoff', false)
const analyzer = utils.getProcessArg('analyzer', '')
const compiler = webpack(devConfig({ presets: `${worker},${analyzer}`, wbLogsOff }))
let devServerOptions = {
    host: 'localhost',
    contentBase: path.resolve(__dirname, '../dist'),
}

// no need to add HMR plugin if hot or hotOnly enabled from CLI or here
if (hotOnly) {
    // this will not live reload, hot-only
    devServerOptions = { ...devServerOptions, hotOnly: true, inline: true }
    WebpackDevServer.addDevServerEntrypoints(
        devConfig({ presets: `${worker},${analyzer}`, wbLogsOff }),
        devServerOptions,
    )
}

if (hot) {
    // this will live reload if not hot updated
    devServerOptions = { ...devServerOptions, hot: true, inline: true }
    WebpackDevServer.addDevServerEntrypoints(
        devConfig({ presets: `${worker},${analyzer}`, wbLogsOff }),
        devServerOptions,
    )
}

new WebpackDevServer(compiler, devServerOptions).listen(port, '0.0.0.0')

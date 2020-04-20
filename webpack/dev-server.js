const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const utils = require('./utils.js')
const devConfig = require('./webpack.config.dev.js')

const port = utils.getProcessArg('port', 9100)
const hotOnly = utils.getProcessArg('hotOnly', false)
const worker = utils.getProcessArg('worker', '')
const wbLogsOff = utils.getProcessArg('logsoff', false)
const compiler = webpack(devConfig({ presets: `${worker}`, wbLogsOff }))
const devServerOptions = {
    host: 'localhost',
    contentBase: path.resolve(__dirname, '../dist'),
}

if (hotOnly) {
    WebpackDevServer.addDevServerEntrypoints(devConfig({ presets: `${worker}`, wbLogsOff }), {
        ...devServerOptions,
        hotOnly: true,
    })
}

new WebpackDevServer(compiler, devServerOptions).listen(port, '0.0.0.0')

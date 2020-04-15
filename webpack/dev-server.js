const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const utils = require('./utils.js')
const devConfig = require('./webpack.config.dev.js')

const port = utils.getProcessArg('port', 9100)
const hot = utils.getProcessArg('hot', false)
const worker = utils.getProcessArg('worker', 'serviceworker')
const compiler = webpack(devConfig({ presets: [`${worker}`] }))
const devServerOptions = {
    host: 'localhost',
    contentBase: path.resolve(__dirname, '../dist'),
}

if (hot) {
    WebpackDevServer.addDevServerEntrypoints(devConfig({}), {
        ...devServerOptions,
        hotOnly: true,
    })
}

new WebpackDevServer(compiler, devServerOptions).listen(port, '0.0.0.0')

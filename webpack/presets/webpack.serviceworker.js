const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = () => ({
    plugins: [
        new InjectManifest({
            swSrc: path.resolve(__dirname, '../../src/index/serviceWorker.js'),
        }),
    ],
})

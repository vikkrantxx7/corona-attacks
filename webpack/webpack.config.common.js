const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([{ from: 'src/assets/', to: 'assets/' }]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index', 'index.html'),
            title: 'Corona Attacks',
            filename: 'index.html',
            inject: false,
            scriptLoading: 'defer',
            meta: {
                charset: { charset: 'utf-8' },
                viewport: 'width=device-width, initial-scale=1, maximum-scale=2, minimum-scale=1',
                description: 'Covid19 data dashboard.',
                'mobile-web-app-capable': 'yes',
                'theme-color': '#ffc40d',
                'application-name': 'Corona Attacks',
                'apple-mobile-web-app-capable': 'yes',
                'apple-mobile-web-app-status-bar-style': 'black-translucent',
                'apple-mobile-web-app-title': 'Corona Attacks',
                'msapplication-TileColor': '#ffc40d',
                'msapplication-TileImage': 'assets/mstile-144x144.png',
                'msapplication-config': 'assets/browserconfig.xml',
            },
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PropTypes: 'prop-types',
            Axios: 'axios',
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
        ],
    },
}

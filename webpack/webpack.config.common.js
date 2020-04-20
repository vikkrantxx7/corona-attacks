const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, '../src/index', 'index.html'),
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PropTypes: 'prop-types',
            Axios: 'axios',
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/icons/corona-256.png',
            cache: true,
            mode: 'webapp',
            outputPath: './assets',
            prefix: './assets',
            publicPath: '.',
            inject: true,
            favicons: {
                appName: 'Corona Attacks',
                appShortName: 'Corona Attacks',
                orientation: 'any',
                display: 'standalone',
                lang: 'en-US',
                manifestRelativePaths: true,
                start_url: '/',
                background: '#ffc40d',
                theme_color: '#ffc40d',
                appleStatusBarStyle: 'black-translucent',
                logging: false,
                pixel_art: false,
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    favicons: true,
                    firefox: true,
                    windows: true,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                },
            },
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

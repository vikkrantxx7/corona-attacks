const merge = require('webpack-merge')
const autoPrefixer = require('autoprefixer')
const commonConfig = require('./webpack.config.common.js')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: '../dist',
    // },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoPrefixer({
                                    cascade: false,
                                    grid: 'no-autoplace',
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
})

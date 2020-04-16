const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoPrefixer = require('autoprefixer')
const commonConfig = require('./webpack.config.common.js')
const loadPresets = require('./loadPresets.js')

module.exports = ({ presets }) =>
    merge(
        commonConfig,
        {
            mode: 'production',
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: MiniCssExtractPlugin.loader },
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
            plugins: [
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash].css',
                }),
                new webpack.DefinePlugin({ WB_LOGS_OFF: false }),
            ],
        },
        loadPresets({ presets }),
    )

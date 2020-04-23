const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoPrefixer = require('autoprefixer')
const Terser = require('terser-webpack-plugin')
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
                new webpack.DefinePlugin({ WB_LOGS_OFF: false, 'process.env.NODE_ENV': JSON.stringify('production') }),
            ],
            optimization: {
                minimizer: [new Terser({ extractComments: false })],
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all',
                        },
                    },
                },
            },
        },
        loadPresets({ presets }),
    )

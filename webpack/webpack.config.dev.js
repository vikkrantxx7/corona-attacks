const merge = require('webpack-merge')
const webpack = require('webpack')
const autoPrefixer = require('autoprefixer')
const commonConfig = require('./webpack.config.common.js')
const loadPresets = require('./loadPresets.js')

module.exports = ({ presets, wbLogsOff }) =>
    merge(
        commonConfig,
        {
            mode: 'development',
            devtool: 'inline-source-map',
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
            plugins: [new webpack.DefinePlugin({ WB_LOGS_OFF: wbLogsOff })],
        },
        loadPresets({ presets }),
    )

const webpackMerge = require('webpack-merge')

const loadPresets = ({ presets = '' }) => {
    const mergedPresets = [].concat(...presets.split(','))
    const mergedConfigs = mergedPresets.map((presetName) => {
        return require(`./presets/webpack.${presetName}`)()
    })

    return webpackMerge({}, ...mergedConfigs)
}

module.exports = loadPresets

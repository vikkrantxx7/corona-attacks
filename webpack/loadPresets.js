const webpackMerge = require('webpack-merge')

const loadPresets = ({ presets = '' }) => {
    const mergedPresets = [].concat(...presets.split(','))
    const mergedConfigs = mergedPresets
        .filter((presetName) => !!presetName)
        .map((presetName) => {
            // eslint-disable-next-line global-require
            return require(`./presets/webpack.${presetName}`)()
        })

    return webpackMerge({}, ...mergedConfigs)
}

module.exports = loadPresets

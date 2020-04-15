module.exports = {
    getProcessArg(argName, defaultValue) {
        const pattern = new RegExp(`--${argName}=(.+)`, 'i')
        const args = process.argv.slice(2)
        let arg = defaultValue || null
        let match = null
        for (let i = 0, len = args.length; i < len; i += 1) {
            match = args[i].match(pattern)
            if (match && match.length > 1) {
                arg = match[1]
                break
            }
        }
        return arg
    },
}

const Utils = (() => {
    const classNames = (classesMap) => {
        const classEntries = [...classesMap]
        return classEntries
            .filter((item) => item[1] === true)
            .map((item) => item[0])
            .join(' ')
    }

    const debounce = (fn, delay) => {
        let timeoutId
        let resultOfLastInvocation

        if (typeof fn !== 'function') {
            throw new TypeError('Expected a function')
        }

        function clear() {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = undefined
            }
        }

        function cancel() {
            clear()
            resultOfLastInvocation = undefined
        }

        function deBouncedFunction(...args) {
            const thisRef = this

            clear()

            timeoutId = setTimeout(() => {
                timeoutId = undefined
                resultOfLastInvocation = fn.apply(thisRef, args)
            }, delay)

            return resultOfLastInvocation
        }

        deBouncedFunction.cancel = cancel

        return deBouncedFunction
    }

    const memoizeSort = (func) => {
        const cache = {}

        return (data, type, sortName, isDescending, search) => {
            const key = `${type}_${sortName}_${isDescending}_${search}`
            if (!cache[key]) {
                cache[key] = func(data, type, sortName, isDescending)
                return cache[key]
            }
            return cache[key]
        }
    }

    return {
        classNames,
        debounce,
        memoizeSort,
    }
})()

export default Utils

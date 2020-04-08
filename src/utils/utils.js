const Utils = (() => {
    const classNames = (classesMap) => {
        const classEntries = [...classesMap]
        return classEntries
            .filter((item) => item[1] === true)
            .map((item) => item[0])
            .join(' ')
    }

    return {
        classNames,
    }
})()

export default Utils

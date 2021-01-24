const checkKeys = {
    description: () => {
        return true
    },
    manNum: () => {
        return true
    },
    sapNum: () => {
        return true
    },
}

function checkIsMatch(obj, param) {
    let re = new RegExp(param.toUpperCase());
    let result = Object.keys(obj).findIndex(x => {
        if (checkKeys[x]) {
            return re.test(String(obj[x]).toUpperCase())
        }
        return false
    })
    return result !== -1 ? true : false
}

function checkForAvailability(data, param) {
    return data.reduce((acc, v) => {
        let isMatch = checkIsMatch(v, param)
        if (isMatch) {
            return acc.concat(v)
        }
        return acc
    }, [])
}

export default checkForAvailability

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

function checkForAvailability(obj, param) {
    let re = new RegExp(param);
    let result = Object.keys(obj).findIndex(x => {
        if (checkKeys[x]) {
            return re.test(obj[x])
        }
        return false
    })
    return result !== -1 ? true : false
}

export default checkForAvailability


function selectCorrectComponents(data, manufacturer, model = 'ALL', isServer) {
    if (isServer) {
        // let { manufacturer, compatibleSrv, type } = data
        return data.reduce((acc, val) => {
            if (Number(val.manufacturer) === Number(manufacturer) && val.compatibleSrv.indexOf(model) !== -1 && val.type === 'Server') {
                return acc.concat(val)
            }
            else if (Number(val.manufacturer) === Number(manufacturer) && model === 'ALL' && val.type === 'Server') {
                return acc.concat(val)
            }
            return acc
        }, [])
    }
    else if (!isServer) {
        return data.reduce((acc, val) => {
            if (Number(val.manufacturer) === Number(manufacturer) && val.compatibleSrv.indexOf(model) !== -1 && val.type !== 'Server') {
                return acc.concat(val)
            }
            else if (Number(val.manufacturer) === Number(manufacturer) && model === 'ALL' && val.type !== 'Server') {
                return acc.concat(val)
            }
            return acc
        }, [])
    } else {
        return data
    }
}

export default selectCorrectComponents
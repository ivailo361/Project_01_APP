
function selectCorrectComponents(data, model, isServer) {
    if (isServer) {

        // let { manufacturer, compatibleSrv, type } = data
        return data.reduce((acc, val) => {
            if ((val.compatibleSrv.includes(model) || model === 'ALL') && val.type === 'Server') {
                return acc.concat(val)
            }
            return acc
        }, [])
    }
    else if (!isServer) {
        return data.reduce((acc, val) => {
            if ((val.compatibleSrv.includes(model) || model === 'ALL') && val.type !== 'Server') {
                return acc.concat(val)
            }
            return acc
        }, [])
    } else {
        return data
    }
}

export default selectCorrectComponents
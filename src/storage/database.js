
let links = {
    manufacturer: [],
    types: [],
}

let data = []


function setManufacturerList(list) {
    // let manList = {}
    // list.forEach(x => {
    //     if (!manList[x.name])
    //         manList[x.name] = x.models
    // });
    // links.manufacturer = manList
    // return manList
    links.manufacturer = list

}

function getManufacturerList() {
    let names = links.manufacturer.map(x => x.name)
    return [...names, 'ALL']
}

function getManufacturerConfigList() {
    return links.manufacturer
}

function getManufacturerFullData(manufacturer) {
    let producer = links.manufacturer.find(x => x.name === manufacturer)

    return producer
}

function getModels(brand) {
    // let upperCaseBrand = brand.split('')
    // upperCaseBrand[0] = upperCaseBrand[0].toUpperCase()
    // console.log(upperCaseBrand.join(''))
    let producer = links.manufacturer.find(x => (x.name === brand || x.sap === brand.toString()))
    let models = producer.models.concat('ALL')
    return models
}

function setTypesComponents(list) {
    // let types = list.map(x => x.type)
    links.types = list
    return list
}

function getTypesComponents() {
    return links.types
}


function setComponentsData(mongoData) {
    data = mongoData
}

function getComponentsData() {
    return data
}

function updateComponent(component) {
    const result = data.findIndex(x => x._id === component._id)
    data.splice(result, 1, component)
    // console.log(`Index Found ${result}`)
}

const db = {
    setManufacturerList,
    getManufacturerList,
    getManufacturerConfigList,
    getModels,
    setTypesComponents,
    getTypesComponents,
    getManufacturerFullData,
    setComponentsData,
    getComponentsData,
    updateComponent,
}

export default db
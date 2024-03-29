
// const BASE_URL = process.env.REACT_APP_API_URL || "https://also.ivmar.site:8443"
const windowsURL = window.location.href
const re = new RegExp("http://172.168.1.88", "i")


const BASE_URL = re.test(windowsURL) ? "http://172.168.1.88:3333" : "https://express.ivmar.site"
// const BASE_URL = "https://express.ivmar.site:8443";


const createHeader = (method, body) => {
    // const encodeFormData = (body) => {
    //     return Object.keys(body)
    //         .map(key => `${key}=${body[key]}`)
    //         // .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    //         .join('&');
    // }
    // const { token } = JSON.parse(sessionStorage.getItem('user')) || ''
    const user = sessionStorage.getItem('user')
    const header = {
        method: method,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'Authorization': user,
            // 'auth': `${token || ''}`
        },
        body: JSON.stringify(body)
    }

    return header
}

function fetcher(url, header) {
    return fetch(url, header)
        .then(checkForErrors)
        .then(res => {
            // let message = msg(res.status)
            // if (message) {
            //     return message
            // }
            return res.json()
        })
    // .catch(console.log)
}

function getData(endpoint) {
    console.log(`This should be a href: ${window.location.href}`)
    const header = createHeader('GET')
    return fetcher(BASE_URL + endpoint, header)

}

function postData(endpoint, body) {
    const header = createHeader('POST', body)
    return fetcher(BASE_URL + endpoint, header)

}

function putComponentData(endpoint, body) {
    const header = createHeader('PUT', body)
    return fetcher(BASE_URL + endpoint, header)
}

function importData(endpoint, formData) {
    const header = {
        method: "POST",
        body: formData
    }
    return fetcher(BASE_URL + endpoint, header)
}

function deleteData(endpoint, body) {
    const header = createHeader('DELETE', body)
    console.log(header)
    return fetcher(BASE_URL + endpoint, header)
}

const checkForErrors = async (res) => {
    if (!res.ok) {
        // let message = msg(res.status)
        let msg = await res.json()
        throw new Error(msg)
    }
    return res;
}

export { getData, postData, putComponentData, importData, deleteData }
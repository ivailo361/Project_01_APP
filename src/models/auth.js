
function auth() {
    let isLoggedIn = false
    let userData = ''

    const { user } = sessionStorage
    if (user) {
        isLoggedIn = true
        userData = JSON.parse(user)
    }

    return {
        isLoggedIn,
        userData,
    }
}

export default auth
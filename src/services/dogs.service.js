import httpService from './http.service.js';


export default {
    query,
    add,
    remove,
    getById,
    update,
    logIn,
    logOut,
    signUp,
    getLoggedinUser
}

var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))


function _getUrl(id = '') {
    return `dog/${id}`
}


function query() {
    return httpService.get(_getUrl())

}


function getById(dogId) {
    return httpService.get(_getUrl(dogId))

}

function add(dog) {
    console.log('un service', dog)
    return httpService.post(_getUrl(dog._id), dog)

}

function remove(dogId) {
    return httpService.delete(_getUrl(dogId))

}

function update(updateDog) {
    return httpService.put(_getUrl(updateDog._id), updateDog)
}


function getLoggedinUser() {
    return loggedInUser;
}

function logIn(user) {
    return httpService.post(_getUrl('login'), user)
        .then(res => {
            loggedInUser = res.data
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            return loggedInUser;
        })
        .catch(err => {
            console.log(err)
            throw err
        });

}

function signUp(user) {
    user.isAdmin = false
    return httpService.post(_getUrl('signup'), user)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
            throw err
        });

}
function logOut() {
    return httpService.post(_getUrl('logout'))
        .then(res => {
            sessionStorage.clear()
            loggedInUser = null
        })
        .catch(err => {
            console.log('Could not logUot', err);
            throw err;
        })
}
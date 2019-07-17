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
    getLoggedinUser,
    getPosition,
    sendFriendReq,
    getFriendReq,
    makeFriendship,
}




function _getUrl(id = '') {
    return `dog/${id}`

}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



function query(filterBy) {
    return httpService.get(_getUrl(), filterBy)
}

function sendFriendReq(dogId) {
    return httpService.put(_getUrl('sendFriendReq'), { dogId })
}

function getFriendReq(dogId, dogImg, dogName) {
    var sendDog = {
        dogId,
        dogImg,
        dogName
    }
    return httpService.post(_getUrl('getFriendReq'), sendDog)
}

function makeFriendship(dogId, dogImg, dogName) {
    var sendDog = {
        dogId,
        dogImg,
        dogName
    }
    return httpService.post(_getUrl('makeFriendship'), sendDog)
}




function getById(dogId) {
    return httpService.get(_getUrl(dogId))
}

function add(dog) {
    return httpService.post(_getUrl('add'), dog)
}

function remove(dogId) {
    return httpService.delete(_getUrl(dogId))
}

function update(updateDog) {
    return httpService.put(_getUrl(`edit/${updateDog._id}`), updateDog)
}


function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem('LoggedUser'));
    return Promise.resolve(user);
}

function logIn(user) {

    return httpService.post(_getUrl(), user)
        .then(res => {
            if (!res) throw new Error('Cant Login')
            sessionStorage.setItem('LoggedUser', JSON.stringify(res));
            return res;
        })
        .catch(err => {
            console.log(err, 'at front service')
            throw err
        });
}

function signUp(user) {
    user.isAdmin = false
    return httpService.post(_getUrl('signup'), user)
        .then(res => res)
        .catch(err => {
            console.log(err)
            throw err
        });

}

function logOut() {
    return httpService.post(_getUrl('logout'))
        .then(() => {
            sessionStorage.clear()
        })
        .catch(err => {
            console.log('Could not logout', err);
            throw err;
        })
}
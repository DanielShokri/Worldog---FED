const fs = require('fs')


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
}

var dogs = _createDogs();


function query() {
    return Promise.resolve(dogs);
}


function add(dog) {
    dog._id = _makeId()
    dogs.push(dog)
    _saveDogsToFile();
    return Promise.resolve(dog)
}

function update(dog) {
    var dogIdx = dogs.findIndex(currDog=> currDog.id === dog.id);
    dogs.splice(dogIdx, 1, dog);
    _saveDogsToFile();
    return Promise.resolve(dog)
}

function getById(id) {
    var dog = dogs.find(currDog => currDog._id === id);
    if (dog) return Promise.resolve(dog);
    else return Promise.reject('Unknown Dog');
}

function remove(id) {
    var dogIdx = dogs.findIndex(dog => dog._id === id);
    dogs.splice(dogIdx, 1)
    _saveDogsToFile();
    return Promise.resolve();
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createDogs() {
    dogs = require('../../../dogs.json')
    if (dogs && dogs.length) return dogs;
    return ['Loli', 'Subi'].map(_createDog)
}

function _createDog(name) {
    return {
        id: _makeId(),
        name,
    }
}

function _saveDogsToFile() {
    fs.writeFileSync('../../../dogs.json', JSON.stringify(dogs, null, 2));
}
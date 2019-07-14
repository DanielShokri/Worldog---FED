'use strict'

const fs = require('fs')


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    queryAll
}

var bugs = _createBugs();
const limit = 3;

function queryAll() {
    return Promise.resolve(bugs);
}



function query(currUser, filter) {
    var bugsToShow;
    if (currUser.isAdmin === true) {
        bugsToShow = bugs.map(bug => {
            return bug
        })
    } else {
        bugsToShow = bugs.filter(bug => {
            // console.log(bug)
            return bug.creator._id === currUser._id
        })
    }


    var filterBugs;
    if (filter.txt) filterBugs = bugsToShow.filter(bug => {
        return bug.title.includes(filter.txt)
    })
    else filterBugs = bugsToShow;

    var offeset = (filter.page - 1) * limit;

    filterBugs = filterBugs.slice(offeset, offeset + limit);

    return Promise.resolve(filterBugs);
}

function add(bug) {
    bug._id = _makeId()
    bugs.push(bug)
    _saveBugsToFile();
    return Promise.resolve(bug)
}

function update(bug) {
    var bugIdx = bugs.findIndex(currBug => currBug.id === bug.id);
    bugs.splice(bugIdx, 1, bug);
    _saveBugsToFile();
    return Promise.resolve(bug)
}

function getById(id) {
    var bug = bugs.find(currBug => currBug._id === id);
    if (bug) return Promise.resolve(bug);
    else return Promise.reject('Unknown Bug');
}

function remove(id) {
    var bugIdx = bugs.findIndex(bug => bug._id === id);
    bugs.splice(bugIdx, 1)
    _saveBugsToFile();
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

function _createBugs() {
    bugs = require('../data/bug.json')
    if (bugs && bugs.length) return bugs;
    return ['Fiag', 'Subali'].map(_createBug)
}

function _createBug(vendor) {
    return {
        id: _makeId(),
        vendor,
    }
}

function _saveBugsToFile() {
    fs.writeFileSync('data/bug.json', JSON.stringify(bugs, null, 2));
}
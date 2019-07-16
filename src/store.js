import Vue from 'vue'
import Vuex from 'vuex'
import dogsService from "./services/dogs.service.js"
import googleMapsService from "../src/services/googleMaps.service.js";



Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        loggedinUser: null,
        filterBy: null,
        dogs: [],
        dog: null,
        currUser: '',
        sortByDistanceDogs: null,
        userLoc: null,
        currPark: null,
    },
    mutations: {
        setFilter(state, filter) {
            state.filterBy = JSON.parse(JSON.stringify(filter));
        },
        setLoc(state, { pos }) {
            state.userLoc = {
                position: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            };
        },
        setLoginUser(state, { currUserLoggedIn }) {
            state.currUser = currUserLoggedIn;
        },
        setLoggedUser(state, { userLoggedNow }) {
            // console.log('this is the loggeduser store mutation', userLoggedNow);
            state.currUser = userLoggedNow;
        },
        setLoggedOutUser(state) {
            state.currUser = '';
        },
        setSortDogs(state, { res }) {
            for (var i = 0; i < state.dogs.length; i++) {
                state.dogs[i].distanceTextFromUser = res.elements[i].distance.text;
                state.dogs[i].distanceValueFromUser = res.elements[i].distance.value;
            }
            if (!state.currPark) {
                state.dogs.sort(function(a, b) {
                    return a.distanceValueFromUser - b.distanceValueFromUser;
                });
            }
        },
        setSortDogsByMap(state, { res }) {
            for (var i = 0; i < state.dogs.length; i++) {
                state.dogs[i].distanceTextFromMap = res.elements[i].distance.text;
                state.dogs[i].distanceValueFromMap = res.elements[i].distance.value;
            }
            state.dogs.sort(function(a, b) {
                return a.distanceValueFromUser - b.distanceValueFromUser;
            });
        },
        setDogs(state, {
            dogs
        }) {
            state.dogs = dogs
        },
        setDog(state, {
            dog
        }) {
            state.dog = dog;
        },
        deleteDog(state, {
            dogId
        }) {
            const idx = state.dogs.findIndex(dog => dog._id === dogId);
            state.dogs.splice(idx, 1);

        },
        addDog(state, {
            dog
        }) {
            state.dogs.unshift(dog)
        },
        updateDog(state, {
            dog
        }) {
            const idx = state.dogs.findIndex(currDog => currDog._id === dog._id)
            state.dogs.splice(idx, 1, dog);

        },
        updateDogFriendReq(state, { updatedDogId }) {
            console.log(updatedDogId)

            const dogIdx = state.dogs.findIndex(dog => dog._id === updatedDogId)
            var dog;
            state.dogs.forEach(currDog => {
                if (currDog._id === updatedDogId) dog = currDog
            })
            console.log(dog)
            console.log(state.currUser[0])
            dog.gotFriendsReq.push({ userId: state.currUser[0]._id, userImg: state.currUser[0].profileImg, userName: state.currUser[0].owner.fullName })
            const userIdx = state.dogs.findIndex(dog => dog._id === state.currUser[0]._id)
            state.currUser[0].sentFriendsReq.push(updatedDogId)

            state.dogs.splice(userIdx, 1, state.currUser[0]);
            state.dogs.splice(dogIdx, 1, dog)
        },
        setCurrPark(state, { park }) {
            state.currPark = park;
        }
    },
    getters: {
        dogsToShow(state) {
            return state.dogs
        },
        getLoggedinUser(state) {
            return state.loggedinUser
        },

        getcurrLoggedinUser(state) {
            return state.currUser
        },

        getDog(state) {
            return state.dog
        },
        getCurrPark(state) {
            return state.currPark;
        }
    },

    actions: {
        loadSortDogs(context) {

            var x = [];
            for (var i = 0; i < context.state.dogs.length; i++) {
                x.push(context.state.dogs[i].location.lat + "," + context.state.dogs[i].location.lng);
            }
            x = x.join("|");
            googleMapsService
                .getDist({

                    userLoc: context.state.userLoc.position.lat + "," + context.state.userLoc.position.lng,
                    usersLoc: x
                })
                .then(res => {
                    context.commit({
                        type: 'setSortDogs',
                        res
                    })
                    return res
                });

            if (context.state.currPark) {
                googleMapsService
                    .getDist({

                        userLoc: context.state.currPark.geometry.location.lat + "," + context.state.currPark.geometry.location.lng,
                        usersLoc: x
                    })
                    .then(res => {
                        context.commit({
                            type: 'setSortDogsByMap',
                            res
                        })
                        return res
                    });
            }

        },
        updateFriendReq(context, { dogId }) {
            return dogsService.sendFriendReq(dogId)
                .then(updatedDogId => {
                    console.log(updatedDogId)
                    context.commit({
                        type: 'updateDogFriendReq',
                        updatedDogId
                    })
                    return updatedDogId
                })
        },

        loadDogs(context, { filterBy }) {
            return dogsService.query(filterBy)
                .then(dogs => {
                    console.log('this is load dog store', dogs)
                    context.commit({
                        type: 'setDogs',
                        dogs
                    })
                    return dogs
                })
        },
        loadUserLoc(context) {
            return dogsService.getPosition()
                .then(pos => {
                    context.commit({
                        type: 'setLoc',
                        pos
                    })
                    return pos

                });

        },
        loadDogById(context, {
            dogId
        }) {
            return dogsService.getById(dogId)
                .then(dog => {
                    context.commit({
                        type: 'setDog',
                        dog
                    })
                    return dog
                })
        },
        deleteDog(context, payload) {
            dogsService.remove(payload.dogId)
                .then(() => {
                    context.commit({
                        type: 'deleteDog',
                        dogId: payload.dogId
                    })
                })
        },

        addDog(context, {
            dog
        }) {
            console.log('in store', dog)
            return dogsService.add(dog)
                .then(addedDog => {
                    context.commit({
                        type: 'addDog',
                        dog: addedDog
                    })
                    return addedDog
                })
        },

        updateDog(context, { dog }) {
            return dogsService.update(dog)
                .then(updatedDog => {
                    context.commit({
                        type: 'updateDog',
                        dog: updatedDog
                    })
                    return updatedDog
                })
        },

        userLogin(context, { currUser }) {
            return dogsService.logIn(currUser)
                .then(currUserLoggedIn => {
                    context.commit({ type: 'setLoginUser', currUserLoggedIn })
                }).catch((err) => {
                    console.log(err, 'This err store')
                    return Promise.reject('cant find user')
                })
        },

        userSignup(context, { user }) {
            return dogsService.signUp(user)
                .then(userSignedUp => {
                    console.log('This is Great signup!', userSignedUp)
                })
        },

        loggedInUser(context) {
            return dogsService.getLoggedinUser()
                .then((userLoggedNow) => {
                    // console.log(userLoggedNow,'This is store')
                    context.commit({ type: 'setLoggedUser', userLoggedNow })
                })
        },

        userLogout(context) {
            dogsService.logOut()
                .then(() => {
                    context.commit({ type: 'setLoggedOutUser' })
                })
        },
        goToPark(context, { park }) {
            context.commit({ type: 'setCurrPark', park })
        }
    },
    modules: {

    }
})
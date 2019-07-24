import Vue from 'vue'
import Vuex from 'vuex'
import dogsService from "./services/dogs.service.js"
import googleMapsService from "../src/services/googleMaps.service.js";
import userStore from "../src/modules/userStore.js"



Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        filterBy: null,
        dogs: [],
        sortByDistanceDogs: null,
        userLoc: null,
        currPark: null,
        parks: null,
        compInProfile: "Gallery",
        isChatOpen: false,
        currUserChatWith: null
    },
    mutations: {
        setIsOpenChat(state, { dog }) {
            state.isChatOpen = !state.isChatOpen
            state.currUserChatWith = dog
        },
        updateCompInProfile(state, {
            comp
        }) {
            state.compInProfile = comp
        },
        setFilter(state, filter) {
            state.filterBy = JSON.parse(JSON.stringify(filter));
        },
        setLoc(state, {
            pos
        }) {
            state.userLoc = {
                position: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            };
        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },

        setSortDogs(state, {
            res
        }) {
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
        setSortParksNearUser(state, {
            res
        }) {
            for (var i = 0; i < state.parks.length; i++) {
                state.parks[i].distanceTextFromUser = res.elements[i].distance.text;
                state.parks[i].distanceValueFromUser = res.elements[i].distance.value;
            }
        },
        setSortDogsByMap(state, {
            res
        }) {
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
        setCurrPark(state, { park }) {
            state.currPark = park;
        },
        setParks(state, {
            gardens
        }) {
            state.parks = gardens;
        }
    },
    getters: {
        compToShoe(state) {
            return state.compInProfile;
        },
        userYouChatWith(state) {
            return state.currUserChatWith;
        },
        dogsToShow(state) {
            return state.dogs;
        },
        getCurrPark(state) {
            return state.currPark;
        },

        getParks(state) {
            return state.parks;
        },
        isChatOpen(state) {
            return state.isChatOpen;
        },
        getUserLoc(state) {
            return state.userLoc
        },
    },

    actions: {
        isChatOpen(context, { dog }) {
            context.commit({
                type: 'setIsOpenChat',
                dog
            })
        },

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
        loadCompInProfile(context, { comp }) {
            context.commit({
                type: 'updateCompInProfile',
                comp
            })
            return comp
        },
        loadParks(context, { gardens }) {
            context.commit({
                type: 'setParks',
                gardens
            })
        },
        async loadParksLocFromUser(context) {
            var x = [];
            for (var i = 0; i < context.state.parks.length; i++) {
                x.push(context.state.parks[i].geometry.location.lat + "," + context.state.parks[i].geometry.location.lng);
            }
            x = x.join("|");
            try {
                const res = await googleMapsService
                    .getDist({
                        userLoc: context.state.userLoc.position.lat + "," + context.state.userLoc.position.lng,
                        usersLoc: x
                    })
                context.commit({
                    type: 'setSortParksNearUser',
                    res
                })
                return res
            } catch (err) {
                console.log(err)
            }
        },
        async loadDogs(context) {
            var dogs;
            try {
                if (context.state.filterBy === null) {
                    var str = ""
                    dogs = await dogsService.query(str)
                } else {
                    dogs = await dogsService.query(context.state.filterBy)
                }
                context.commit({
                    type: 'setDogs',
                    dogs
                })
                context.commit({
                    type: 'setFilterBy',
                    filterBy: ''
                })

                return dogs
            } catch (err) {
                console.log(err);
            }
        },

        async loadUserLoc(context) {
            try {
                const pos = await dogsService.getPosition()
                context.commit({
                    type: 'setLoc',
                    pos
                })
                return pos
            } catch (err) {
                console.log(err);
            }
        },

        async loadDogById(context, { dogId }) {
            try {
                const dog = await dogsService.getById(dogId)
                context.commit({
                    type: 'setDog',
                    dog
                })
                return dog
            } catch (err) {
                console.log(err);
            }
        },
        async deleteDog(context, payload) {
            try {
                await dogsService.remove(payload.dogId)
                context.commit({
                    type: 'deleteDog',
                    dogId: payload.dogId
                })
            } catch (err) {
                console.log(err);
            }

        },

        async addDog(context, { dog }) {
            try {
                const addedDog = await dogsService.add(dog)
                context.commit({
                    type: 'addDog',
                    dog: addedDog
                })
                return addedDog
            } catch (err) {
                console.log(err);
            }

        },

        async updateDog(context, { dog }) {
            try {
                const updatedDog = await dogsService.update(dog)
                context.commit({
                    type: 'updateDog',
                    dog: updatedDog
                })
                return updatedDog
            } catch (err) {
                console.log(err);
            }

        },

        async loggedInUser(context) {
            try {
                const userLoggedNow = await dogsService.getLoggedinUser()
                if (userLoggedNow === null) {
                    context.commit({
                        type: 'setLoggedUser',
                        userLoggedNow: null
                    })
                } else context.commit({
                    type: 'setLoggedUser',
                    userLoggedNow
                })
            } catch (err) {
                console.log(err);
            }

        },

        goToPark(context, { park }) {
            context.commit({
                type: 'setCurrPark',
                park
            })
        },
        setFilter(context, { filterBy }) {
            context.commit({
                type: 'setFilterBy',
                filterBy
            })
        }

    },
    modules: {
        userStore
    }

})
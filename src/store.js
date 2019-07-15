import Vue from 'vue'
import Vuex from 'vuex'
import dogsService from "./services/dogs.service.js"


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    loggedinUser: null,
    filterBy: null,
    dogs: [],
    dog: null,
    currUser: ''
  },
  mutations: {
    setFilter(state, filter) {
      state.filterBy = JSON.parse(JSON.stringify(filter));
    },
    setLoginUser(state, { currUserLoggedIn }) {
      state.currUser = currUserLoggedIn;
    },
    setLoggedUser(state, { userLoggedNow }) {
      console.log('this is the loggeduser store mutation', userLoggedNow);
      state.currUser = userLoggedNow;
    },
    setLoggedOutUser(state){
      state.currUser = '';
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
  },

  actions: {
    loadDogs(context) {
      return dogsService.query()
        .then(dogs => {
          context.commit({
            type: 'setDogs',
            dogs
          })
          return dogs
        })
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
      .then(()=>{
        context.commit({ type: 'setLoggedOutUser' })
      })
    }
  }
  
})

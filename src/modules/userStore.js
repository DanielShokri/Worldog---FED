import dogsService from '../services/dogs.service.js'

export default {
    state: {
        loggedinUser: null,
        dog: null,
        currUser: null,
    },
    mutations: {
        removeDogFriendShip(state, { updatedDog }) {
            const dogIdx = state.dogs.findIndex(dog => dog._id === updatedDog)
            var dog;
            state.dogs.forEach(currDog => {
                if (currDog._id === updatedDog) dog = currDog
            })

            dog.friends.forEach((dogFriend, idx) => {
                if (dogFriend.userId === state.currUser._id)
                    dog.friends.splice(idx, 1);
            })
            state.currUser.friends.forEach((dogFriend, idx) => {
                if (dogFriend.userId === dog._id)
                    state.currUser.friends.splice(idx, 1);
            })

            const userIdx = state.dogs.findIndex(dog => dog._id === state.currUser._id)
            state.dogs.splice(userIdx, 1, state.currUser);
            state.dogs.splice(dogIdx, 1, dog)
            state.dog = state.currUser;
        },

        rejectDogFriendShip(state, {
            updatedDog
        }) {
            const dogIdx = state.dogs.findIndex(dog => dog._id === updatedDog.userId)
            var dog;
            state.dogs.forEach(currDog => {
                if (currDog._id === updatedDog.userId) dog = currDog
            })

            dog.sentFriendsReq.forEach((id, idx) => {
                if (id === state.currUser._id)
                    dog.sentFriendsReq.splice(idx, 1);
            })
            state.currUser.gotFriendsReq.forEach((object1, idx) => {
                if (object1.userId === dog._id)
                    state.currUser.gotFriendsReq.splice(idx, 1);
            })

            const userIdx = state.dogs.findIndex(dog => dog._id === state.currUser._id)
            state.dogs.splice(userIdx, 1, state.currUser);
            state.dogs.splice(dogIdx, 1, dog)
            state.dog = state.currUser;

        },

        updateDogFriendShip(state, {
            updatedDog
        }) {
            const dogIdx = state.dogs.findIndex(dog => dog._id === updatedDog.userId)
            var dog;
            state.dogs.forEach(currDog => {
                if (currDog._id === updatedDog.userId) dog = currDog
            })
            dog.friends.push({
                userId: state.currUser._id,
                userImg: state.currUser.profileImg,
                userName: state.currUser.owner.fullName
            });
            state.currUser[0].friends.push(updatedDog)
            dog.sentFriendsReq.forEach((id, idx) => {
                if (id === state.currUser._id)
                    dog.sentFriendsReq.splice(idx, 1);
            })
            state.currUser.gotFriendsReq.forEach((object1, idx) => {
                if (object1.userId === dog._id)
                    state.currUser.gotFriendsReq.splice(idx, 1);
            })

            const userIdx = state.dogs.findIndex(dog => dog._id === state.currUser._id)
            state.dogs.splice(userIdx, 1, state.currUser);
            state.dogs.splice(dogIdx, 1, dog)
            state.dog = state.currUser;
        },


        updateDogFriendReq(state, {
            updatedDogId
        }) {

            const dogIdx = state.dogs.findIndex(dog => dog._id === updatedDogId)
            var dog;
            state.dogs.forEach(currDog => {
                if (currDog._id === updatedDogId) dog = currDog
            })

            dog.gotFriendsReq.push({
                userId: state.currUser._id,
                userImg: state.currUser.profileImg,
                userName: state.currUser.owner.fullName
            })
            const userIdx = state.dogs.findIndex(dog => dog._id === state.currUser._id)
            state.currUser.sentFriendsReq.push(updatedDogId)

            state.dogs.splice(userIdx, 1, state.currUser);
            state.dogs.splice(dogIdx, 1, dog)
        },

        updateDogLikes(state, {
            updatedDogId
        }) {
            const dogIdx = state.dogs.findIndex(dog => dog._id === updatedDogId)
            var dog;
            state.dogs.forEach(currDog => {
                if (currDog._id === updatedDogId) dog = currDog
            })
            dog.gotLikes.push({
                userId: state.currUser._id,
                userImg: state.currUser.profileImg,
                userName: state.currUser.owner.fullName
            })
            const userIdx = state.dogs.findIndex(dog => dog._id === state.currUser._id)
            state.currUser.sentLikes.push(updatedDogId)

            state.dogs.splice(userIdx, 1, state.currUser);
            state.dogs.splice(dogIdx, 1, dog)
        },

        updateDog(state, {
            dog
        }) {
            const idx = state.dogs.findIndex(currDog => currDog._id === dog._id)
            state.dogs.splice(idx, 1, dog);

        },

        setDog(state, {
            dog
        }) {
            state.dog = dog;
        },

        setLoginUser(state, {
            currUserLoggedIn
        }) {
            state.currUser = currUserLoggedIn;
        },
        setLoggedUser(state, {
            userLoggedNow
        }) {
            state.currUser = userLoggedNow;
        },
        setLoggedOutUser(state) {
            state.currUser = null;
        },



    },
    getters: {
        getNotfications(state) {
            return state.currUser.gotFriendsReq;
        },
        gotLikes(state) {
            return state.currUser.gotLikes;
        },
        getLoggedinUser(state) {
            return state.currUser;
        },
        getcurrLoggedinUser(state) {
            return state.currUser;
        },
        getDog(state) {
            return state.dog;
        },
    },

    actions: {
        async userLogout(context) {
            try {
                await dogsService.logOut()
                context.commit({
                    type: 'setLoggedOutUser'
                })
            } catch (err) {
                console.log(err);
            }
        },

        async userSignup(context, { user }) {
            try {
                const userSignedUp = await dogsService.signUp(user)
                console.log('This is Great signup!', userSignedUp)
            } catch (err) {
                console.log(err);
            }

        },

        async userLogin(context, { currUser }) {
            try {
                const currUserLoggedIn = await dogsService.logIn(currUser)
                context.commit({
                    type: 'setLoginUser',
                    currUserLoggedIn: currUserLoggedIn
                })
            } catch (err) {
                console.log(err);
            }

        },

        async removeFriend(context, { dogId }) {
            try {
                const updatedDog = await dogsService.removeFriendship(dogId)
                context.commit({
                    type: 'removeDogFriendShip',
                    updatedDog
                })
                return updatedDog
            } catch (err) {
                console.log(err);
            }
        },

        async rejectFriendShip(context, { dog }) {
            try {
                const updatedDog = await dogsService.rejectFriendshipOn(dog)
                context.commit({
                    type: 'rejectDogFriendShip',
                    updatedDog
                })
                return updatedDog
            } catch (err) {
                console.log(err);
            }

        },

        async makeFriendShip(context, { dog }) {
            try {
                const updatedDog = await dogsService.makeFriendshipOn(dog)
                context.commit({
                    type: 'updateDogFriendShip',
                    updatedDog
                })
                return updatedDog
            } catch (err) {
                console.log(err);
            }

        },

        async updateFriendLike(context, { dogId }) {
            // console.log('dog id', dogId)
            try {
                const updateDogId = await dogsService.addLike(dogId)
                    // console.log('const', updateDogId)
                context.commit({
                    type: 'updateDogLikes',
                    updateDogId: updateDogId
                })
                return updateDogId
            } catch (err) {
                console.log(err);
            }
        },


        async updateFriendReq(context, { dogId }) {
            try {
                const updatedDogId = await dogsService.sendFriendReq(dogId)
                context.commit({
                    type: 'updateDogFriendReq',
                    updatedDogId
                })
                return updatedDogId
            } catch (err) {
                console.log(err)
            }
        },




    }

}
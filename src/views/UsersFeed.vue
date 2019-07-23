
<template>
  <section v-if="dogs && userLoc">
<UsersFilter @setFilter="setFilter"></UsersFilter>
  <dog-list :userLoc="userLoc" @openChat ="openChat" :loggedinUser="currUser" :dogs="dogs" @delete="deleteDog"></dog-list>
  </section>
</template>

<script>
import dogList from "../components/DogList.cmp.vue";
  import UsersFilter from "../components/UsersFilter.cmp";
  import socket from "../services/socket.service.js";
import eventBus from "../eventBus.js";

export default {

  data() {
    return {
    userLoc:null,
    sortDog:false,
    currUser:null
    };
  },
  created() {
    this.$store.dispatch({ type: "loadCompInProfile" , comp: "gallery"} )
    this.$store.dispatch({ type: "loggedInUser" }).then(()=>{
            this.currUser = this.$store.getters.getcurrLoggedinUser;
    })
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
        this.userLoc = this.$store.getters.userLoc;
        console.log('in feed', this.getUserLoc)
        this.$store.dispatch({ type: "loadSortDogs" }).then(() => {
          this.sortDog =true
        });
      });
    });
  },
  methods: {
    openChat(dog){
       this.$store.dispatch({ type: "isChatOpen", dog }).then(() => {
        const loggedUser = this.$store.getters.getcurrLoggedinUser[0];
        if (this.$store.getters.isChatOpen)
          eventBus.$emit("chatOpen", dog, loggedUser);
        socket.emit("chat join", this.$store.getters.getcurrLoggedinUser[0]);
      });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: "loadDogs", filterBy });
    },
    deleteDog(dogId) {
      this.$store.dispatch({
        type: "deleteDog",
        dogId
      });
    }
  },

  computed: {
     dogs() {
      const dogs = this.$store.getters.dogsToShow;
      if(this.currUser===null) return dogs
      else {
        const dogsToShow = dogs.filter(dog => dog._id !== this.currUser._id);
        return dogsToShow;
      }
    }
  },
  components: {
    dogList,
     UsersFilter
  }
};
</script>

<style scoped>
</style>






<template>
  <section>
    <div class="top-section">
      <img class="mainImg" src="../../public/img/home.svg" />
      <img class="mobileImg" src="../../public/img/home-mobile.svg" alt />
      <div class="filterAndSelfContainer">
        <h2 class="statment">
          Meet new and
          intresting
          <br />dogs & people nearby
        </h2>
        <UsersFilter @setFilter="setFilter"></UsersFilter>
      </div>
    </div>

    <section class="hero parks-section">
      <div class="hero-body">
        <h1 style="margin-left: 15px;" class="parks-title1">
          <strong>Nearby Parks</strong>
        </h1>
        <park-list></park-list>
        <h1 @click="seeMoreParks" class="see-more">
          See More
          <b-icon class="icon" icon="chevron-right"></b-icon>
        </h1>
        <br />
      </div>
    </section>
    <div class="sandbox">
      <section v-if="dogs" class="hero dogs-section">
        <div class="hero-body">
          <h1 style="margin-top: 12px;" class="parks-title">
            <strong>Nearby Dogs</strong>
          </h1>
          <dog-list
            :dogs="dogsToShow"
            @chatWith="userChatWith"
            @delete="deleteDog"
            :loggedinUser="currUser"
            @openChat="openChat"
            :userLoc="userLoc"
          ></dog-list>
          <h1 @click="seeMore" class="see-more">
            See More
            <b-icon class="icon" icon="chevron-right"></b-icon>
          </h1>
          <br />
        </div>
      </section>
    </div>
    
  </section>
</template>

<script>
import UserListMap from "../components/UsersListMap.cmp";
import UserLiList from "../components/UserLiList.cmp";
import ParkList from "../components/ParksList.cmp.vue";
import DogList from "../components/DogList.cmp.vue";
import UsersFilter from "../components/UsersFilter.cmp";
import socket from "../services/socket.service.js";
import eventBus from "../eventBus.js";
export default {
  name: "home",
    data() {
      return {
        dogs: null,
        numOfParks: 4,
        currUser: null,
        userLoc: null
      };
    },

  created() {
    this.$store.dispatch({ type: "loggedInUser" }).then(() => {
      this.currUser = this.$store.getters.getcurrLoggedinUser;
    });
    this.$store.dispatch({ type: "loadCompInProfile", comp: "gallery" });
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
        this.userLoc = this.$store.getters.getUserLoc;
        this.$store.dispatch({ type: "loadSortDogs" }).then(() => {
          this.dogs = this.$store.getters.dogsToShow;
        });
      });
    });
    eventBus.$on('userLogin', ()=> { 
      this.$store.dispatch({ type: "loggedInUser" }).then(() => {
      this.currUser = this.$store.getters.getcurrLoggedinUser;
    });
    })

    eventBus.$on('userLoggedOut',()=> { 
       this.$store.dispatch({ type: "loggedInUser" }).then(() => {
      this.currUser = this.$store.getters.getcurrLoggedinUser;
    });
    })
  },
  computed: {
    dogsToShow() {
      if (this.currUser === null) {
        var newDogs = [this.dogs[0], this.dogs[1], this.dogs[2], this.dogs[3]];
        return newDogs;
      } else {
        const dogsToShow = this.dogs.filter(
          dog => dog._id !== this.currUser._id
        );
        var newDogs = [
          dogsToShow[0],
          dogsToShow[1],
          dogsToShow[2],
          dogsToShow[3]
        ];
        return newDogs;
      }
    }
  },
  methods: {
    openChat(dog) {
      this.$store.dispatch({ type: "isChatOpen", dog }).then(() => {
        const loggedUser = this.$store.getters.getcurrLoggedinUser;
        if (this.$store.getters.isChatOpen)
          eventBus.$emit("chatOpen", dog, loggedUser);
        socket.emit("chat join", this.$store.getters.getcurrLoggedinUser);
      });
    },
    seeMore() {
      this.$router.push("/user");
    },
    setFilter(filterBy) {
      console.log(filterBy)
      this.$store.dispatch({ type: "setFilter", filterBy }).then(()=> { 
         this.$router.push("/user");
      })
    },
    userChatWith(dog) {
      this.$emit("chatWith", dog);
    },
    deleteDog(dogId) {
      this.$store.dispatch({
        type: "deleteDog",
        dogId
      });
    },
    seeMoreParks() {
      this.$router.push("/parks");
    }
  },
  components: { UserListMap, ParkList, UserLiList, UsersFilter, DogList }
};
</script>


<style scoped lang="scss">
.mobileImg {
  display: none;
}

.top-section {
  height: 37.25rem;
  width: 100vw;
  padding: 0;
  margin: 0 auto;
}

.mainImg {
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
}

.filterAndSelfContainer {
  z-index: 1;
  position: relative;
  left: 2%;
  bottom: 86%;
  max-width: 29rem;
}

.statment {
  padding-bottom: 1rem;
  font-size: 2rem;
  font-family: proximanova, helvetica neue, Helvetica, Arial, sans-serif;
  font-weight: 700;
}

.container {
  h1 {
    font-size: 90px;
    span {
      font-weight: bold;
    }
  }
  h2 {
    font-size: 22px;
  }
}
footer {
  padding: 30px 10px;
}

.home-logo {
  min-width: 100%;
  padding-right: 150px;
}
.hero-body {
  padding: 1rem 2.5rem 0 2.5rem;
  background-color: white;
}

h1 {
  font-size: 30px;
  text-align: left;
  padding-left: 17px;
  display: flex;
  align-items: center;
  .icon {
    font-size: 30px;
  }
}
.see-more:hover {
  cursor: pointer;
}
.hero-body {
  margin: 0 30px;
}
.home-section {
  padding: 0;
}
.home-section img {
  width: 100%;
}

.parks-title1 {
  padding: 0 0px 10px;
}
.see-more {
  font-size: 17px;
}

@media screen and(max-width: 955px) {
  .statment {
      font-size: 1.8rem;
  }

  .mainImg {
    object-fit:fill;
  }
}



@media screen and(max-width: 550px) {
  .home-logo {
    order: 2;
    min-width: 60%;
  }
  .top-section {
    // display: grid !important;
    height: 400px;
  }

  .hero-body {
    margin: 0 auto;
    padding: 0;
  }
  .container {
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 16px;
    }
  }
  .home-logo {
    padding-right: 0px;
  }

  .mainImg {
    display: none;
  }

  .mobileImg {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    object-fit: cover;
  }
}
</style>
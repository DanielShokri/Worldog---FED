<template>
  <section>
    <section class="hero top-section is-bold">
      <div class="hero-head"></div>
      <div class="hero-body top-section is-flex">
        <div class="container">
          <h1>MEETHAV</h1>
          <h2 class>
            MEET NEW AND
            INTRESTING DOGS NEARBY.
          </h2>
        </div>
        <img class="home-logo" src="../../public/img/home.svg" alt />
      </div>
    </section>
    <div class="box cta">
      <p class="has-text-centered">
        <UsersFilter @setFilter="setFilter"></UsersFilter>
      </p>
    </div>

    <section class="hero parks-section">
      <div class="hero-body">
        <h1 class="parks-title1">
          <strong>Nearby Parks</strong>
        </h1>
        <park-list></park-list>
        <h1 @click="seeMoreParks" class="see-more">
          See More
          <b-icon class="icon" icon="chevron-right"></b-icon>
        </h1>
            <br>
      </div>
    </section>
    <div class="sandbox">
      <section v-if="dogs" class="hero dogs-section">
        <div class="hero-body">
          <h1 class="parks-title">
            <strong>Nearby Dogs</strong>
          </h1>
          <dog-list :dogs="dogsToShow" @delete="deleteDog"></dog-list>
          <h1 @click="seeMore" class="see-more">
            See More
            <b-icon class="icon" icon="chevron-right"></b-icon>
          </h1>
              <br>
        </div>
      </section>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        MEET
        <strong>HAV</strong> by Daniel Shokri ,Idan Elbaz and Chen Mordechai
      </div>
    </footer>
  </section>

  <!-- <div>
    <div>
      <img slot="img" src="../../public/img/home.svg" alt />
      <UsersFilter @setFilter="setFilter"></UsersFilter>
    </div>
    <section class="hero parks-section">
      <div class="hero-body">
        <h1 class="parks-title1"><strong> Nearby Parks </strong></h1>
        <park-list></park-list>
        <h1 @click="seeMoreParks" class="see-more">
          See More
          <b-icon class="icon" icon="chevron-right"></b-icon>
        </h1>
      </div>
    </section>
    <section v-if="dogs" class="hero dogs-section">
      <div class="hero-body">
        <h1 class="parks-title"><strong>Nearby Dogs</strong></h1>
        <dog-list :dogs="dogsToShow" @delete="deleteDog"></dog-list>
        <h1 @click="seeMore" class="see-more">
          See More
          <b-icon class="icon" icon="chevron-right"></b-icon>
        </h1>
      </div>
    </section>

    <div class="container">
      <userLiList></userLiList>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
          MEET<strong>HAV</strong> by Daniel Shokri ,Idan Elbaz and Chen Mordechai
      </div>
    </footer>
  </!-->
</template>

<script>
import UserListMap from "../components/UsersListMap.cmp";
import UserLiList from "../components/UserLiList.cmp";
import ParkList from "../components/ParksList.cmp.vue";
import DogList from "../components/DogList.cmp.vue";
import UsersFilter from "../components/UsersFilter.cmp";
export default {
  name: "home",

  created() {
    this.$store.dispatch({ type: "loadCompInProfile", comp: "gallery" });
    this.$store.dispatch({ type: "loggedInUser" });
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
        this.$store.dispatch({ type: "loadSortDogs" }).then(() => {
          this.dogs = this.$store.getters.dogsToShow;
        });
      });
    });
  },
  data() {
    return {
      dogs: null,
      numOfParks: 4
    };
  },
  computed: {
    dogsToShow() {
      var newDogs = [this.dogs[0], this.dogs[1], this.dogs[2], this.dogs[3]];
      return newDogs;
    }
  },
  methods: {
    seeMore() {
      console.log("push");
      this.$router.push("/user");
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: "loadDogs", filterBy });
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
.parks-section {
  background-color: #f9f7f7 !important;
}
.dogs-section {
  background-color: #a8e6cf !important;
}
.footer {
  // background-color: #ff2e63 !important;
  
}
.home-logo {
  min-width: 100%;
}
.hero-body {
  padding: 1rem 2.5rem 0 2.5rem;
}
.top-section {
  background-color: #97debe;
  height: 566px;
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

@media screen and(max-width: 775px) {
  .home-logo {
    order: 2;
    min-width: 60%;
  }
  .top-section{
    display: grid !important;
    height: 380px;
  }
}
</style>
<template>
  <section class="userLiList" v-if="dogs && currPark">
    <v-layout row>
      <v-flex style="padding-right: 40px;padding-left: 40px; min-width:300px;">
        <v-card>
          <v-toolbar color="teal" dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title class="text-xs-center">{{currPark.name}}</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list subheader>
            <v-subheader>Dogs in the park</v-subheader>
            <v-list-tile
              v-for="dog in dogs"
              :key="dog._id"
              avatar
              @click="goToUserProfile(dog._id)"
            >
              <v-list-tile-avatar>
                <img :src="dog.profileImg" />
              </v-list-tile-avatar>
              <v-list-tile-content v-if="dog.distanceTextFromUser">
                <v-list-tile-title v-html="dog.preference.name  + ' & '+  dog.owner.fullName + ' ' + '(' + (dog.distanceValueFromUser/1000) + 'km from you'+ ')'"></v-list-tile-title>
              </v-list-tile-content>
               <v-list-tile-content v-else>
                <v-list-tile-title v-html="dog.preference.name  + ' & '+  dog.owner.fullName "></v-list-tile-title>
              </v-list-tile-content>

              <!-- <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">Online</v-icon>
              </v-list-tile-action>-->
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import dogsService from "../services/dogs.service";
import googleMapsService from "../services/googleMaps.service.js";


// todo : filter dogs by 2 mi from park, filter already is on dog.distanceValueFromMap - just do it !! ;



export default {
  name: "usersList",
  data() {
    return {
      userLoc: null,
      dogs: null,
      dogsList: null
    };
  },
  props: ["currPark"],

  computed: {
    distanceInKm(dog){
      return dog.distanceValueFromUser / 1000;
    }
  },
  methods: {
    goToUserProfile(dogId) {
      this.$router.push(`/user/${dogId}`);
    }
  },
  components: {},
  created() {
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
        this.$store.dispatch({ type: "loadSortDogs" }).then(() => {
          this.dogs = this.$store.getters.dogsToShow;
        });
      });
    });
  }
};
</script>
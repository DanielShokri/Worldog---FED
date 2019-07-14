<template>
  <v-card class="text-xs-center ma-3" v-if="dog">
    <v-responsive class="pt-4">
      <v-img aspect-ratio="1.75" :src="imgToLoad"></v-img>
    </v-responsive>
    <v-card-text>
      <div class="headline mb-0">{{dog.owner.fullName}} and {{dog.preference.name}}</div>
      <div>{{getLocation}}</div>
    </v-card-text>
    <v-card-actions class="buttons" d-flex>
      <v-btn class="btn" small color="yellow accent-4">
        <router-link :to="'/user/'+dog._id">Profile</router-link>
      </v-btn>
      <v-btn small color="blue lighten-1" v-on:click="addFrind(dog._id)">Add Friend</v-btn>

      <!-- v-if user.isAdmin -->
      <v-btn class="btn" small color="green accent-3">
        <router-link :to="'/user/edit/'+dog._id">Edit</router-link>
      </v-btn>

      <v-btn small color="red lighten-1" v-on:click="emitDeleteDog(dog._id)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dog: Object
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = this.$store.getters.getLoggedinUser;
    // console.log(this.user)
  },

  methods: {
    addFrind(dogId) {
      console.log("adding friend");
    },
    emitDeleteDog(dogId) {
      this.$emit("delete", dogId);
    }
  },
  computed: {
    getLocation() {
      // console.log('user is', this.dog.location)
      var location = this.dog.location;
      
    },
    imgToLoad() {
      if (this.dog.profileImg) {
        return this.dog.profileImg;
      } else {
        return "https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg";
      }
    }
  }
};
</script>
<style scoped>
li {
  display: flex;
  padding: 10px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.btn a {
  text-decoration: none;
  color: black;
}
</style>


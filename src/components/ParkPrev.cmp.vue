<template>
  <v-card class="text-xs-center ma-3" v-if="park">
    <v-responsive class="pt-4">
      <v-img aspect-ratio="2.75" :src="imgToLoad"></v-img>
    </v-responsive>
    <v-card-text>
      <div class="headline mb-0">{{park}}</div>
    </v-card-text>
    <v-card-actions class="buttons" d-flex>
      <v-btn class="btn" small color="yellow accent-4">
        <router-link :to="'/park/'+park._id">Details</router-link>
      </v-btn>
      <v-btn small color="blue lighten-1" v-on:click="addReview()">Add Review</v-btn>    
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    park: Object
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
    addReview() {
      console.log("adding review");
    },
   
  },
  computed: {
    
    imgToLoad() {
      if (this.park.img) {
        return this.park.img;
      } else {
        return "http://eaawaj.com/wp-content/uploads/2018/06/4241508-park.jpg";
      }
    }
  }
};
</script>
<style scoped>

</style>


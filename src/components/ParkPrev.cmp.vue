<template>
  <div class="blog-grid">
    <v-img @click="goParkDetails" aspect-ratio="1.75" :src="park.img"></v-img>
    <div class="blog-grid1">
      <ul class="post">
        <li></li>
        <li>
          <span>
            <b>{{new Date() | timeAgo}}</b>
          </span>
        </li>
        <label>|</label>
        <li>
          <a href="#">
            <i class="fa fa-comments-o"></i> 30 Comments
          </a>
        </li>
      </ul>
      <h5>
        <a href="#">{{park.name}}</a>
      </h5>

      <div class="blog-ic">
        <button @click="goParkDetails">Read More</button>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
  <!-- <v-card class="park-prev text-xs-center ma-3" v-if="park">
    <v-responsive class="pt-4">
      <v-img aspect-ratio="1.75" :src="park.img"></v-img>
    </v-responsive>
    <v-card-text class="x">
      <div class="headline mb-0">{{park.name}}</div>
      
    </v-card-text>
    <v-card-actions class="buttons" d-flex>
      <v-btn class="btn" small color="yellow accent-4">
        <router-link :to="'/park/'+park._id">Details</router-link>
      </v-btn>
      <v-btn small color="blue lighten-1" v-on:click="addReview()">Add Review</v-btn>    
    </v-card-actions>
  </v-card>-->
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
    goParkDetails() {
      this.$store.dispatch({ type: "goToPark", park: this.park }).then(() => {
        this.$router.push("/park-details");
      });
    }
  },
  computed: {
    imgToLoad() {
      if (this.park.photos[1]) {
        return this.park.img;
      } else {
        return "http://eaawaj.com/wp-content/uploads/2018/06/4241508-park.jpg";
      }
    }
  }
};
</script>


<style scoped>
@import "../../public/css/style.css";
button {
  color: black;
}
</style>


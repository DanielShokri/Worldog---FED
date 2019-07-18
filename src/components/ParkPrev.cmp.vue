<template>
  <main>
    <figure>
      <img @click="goParkDetails" aspect-ratio="1.75" :src="park.img" />
    </figure>
    <section class="content">
      <a href="#">
        <h2 class="title">{{park.name}}</h2>
      </a>
      <p
        class="subtitle"
      > {{new Date() | timeAgo}} &nbsp; &bull; &nbsp; 3 KM</p>
      <p></p>
    </section>
    <footer>
      <a href="#">
        <span>go to park</span>
      </a>
    </footer>
  </main>

  <!-- <div class="slide-container">
    <div class="wrapper">
      <div class="clash-card barbarian">
        <div class="clash-card__image clash-card__image--barbarian">
          <img @click="goParkDetails" aspect-ratio="1.75" :src="park.img" />
        </div>
        <button class="btn-read-more" @click="goParkDetails">Read More</button>
        <div class="clash-card__unit-name">{{park.name}}</div>

        <div class="clash-card__unit-description">
          <b>{{new Date() | timeAgo}}</b>
        </div>
  </div>-->
  <!-- end clash-card barbarian-->
  <!-- </div> -->
  <!-- end wrapper -->
  <!-- </div> -->
  <!-- end container -->
  <!-- <div class="blog-grid">
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
  -->
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
  },

  methods: {
    addReview() {},
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


<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans");

$color: #44a3d9; // #2f559e;

body {
  height: 100vh;

  background-color: #eceff1;
  font-family: "Nunito Sans", sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  max-width: 20rem;
  background: white;
  color: #263238;
  //   border-radius: 0.5rem;
  overflow: hidden;

  //   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  figure {
    padding: 0;
    margin: 0;
    line-height: 0;
    img {
      image-rendering: crisp-edges;
      object-fit: cover;
      width: 100%;
      height: 160px;
    }
  }
  .content {
    padding: 1.5rem;

    a {
      text-decoration: none;
      color: $color;
      h2 {
        font-size: 1.75rem;
        display: inline;
        margin: 0;
        margin-left: -1px;
      }
      &:hover {
        color: darken($color, 10%);
      }
    }
    > p.subtitle {
      display: inline-block;
      font-size: 0.8rem;
      color: #607d8b;
      margin: 0;
      margin-top: 0.25rem;
    }
    > p {
      line-height: 1.25rem;
      font-size: 0.95rem;
      text-align: justify;
      margin: 0;
      margin-top: 1.25rem;
    }
  }
  footer {
    background: rgba($color, 0.1);
    a {
      display: flex;
      border-top: 1px solid rgba(grey, 0.1);
      font-size: 0.9rem;
      padding: 1rem 1.5rem;
      text-decoration: none;
      font-weight: 600;
      color: $color;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      flex-direction: row;
      align-items: center;
      &:hover {
        color: darken($color, 10%);
        background: rgba($color, 0.2);
      }
      &::after {
        content: " → ";
        margin-left: auto;
        transition: 0.3s;
        font-size: 1.25rem;
      }
    }
  }
}
</style>


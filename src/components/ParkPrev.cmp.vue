<template>
<div class="slide-container">
  <div class="wrapper">
    <div class="clash-card barbarian">
      <div class="clash-card__image clash-card__image--barbarian">
    <img @click="goParkDetails" aspect-ratio="1.75" :src="park.img"/>
      </div>
           <button class="btn-read-more" @click="goParkDetails">Read More</button>
      <div class="clash-card__unit-name">{{park.name}} </div>
      
 <div class="clash-card__unit-description">
   <b>{{new Date() | timeAgo}}</b>
      </div>
      
    </div> <!-- end clash-card barbarian-->
  </div> <!-- end wrapper -->
  
</div> <!-- end container -->
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


<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

$border-radius-size: 14px;
$barbarian: #ff3860;
$archer: #EE5487;
$giant: #F6901A;
$goblin: #82BB30;
$wizard: #4FACFF;

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  background: linear-gradient(to bottom, rgba(140,122,122,1) 0%, rgba(175,135,124,1) 65%, rgba(175,135,124,1) 100%) fixed;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/coc-background.jpg') no-repeat center center fixed;
  background-size: cover;
  font: 14px/20px "Lato", Arial, sans-serif;
  color: #9E9E9E;
  margin-top: 30px;
}

.slide-container {
  margin: auto;
  width: 350px;
  text-align: center;
}

.wrapper {
  padding-top: 40px;
  padding-bottom: 40px;
  width: 350px;
  
  &:focus {
    outline: 0;
  }
}

.btn-read-more{
  background-color:$barbarian;
  color:white;
      height: 30px;
    width: 100px;
    border-radius: 22px;
}



.clash-card {
  background: white;
  width: 300px;
  display: inline-block;
  margin: auto;
  border-radius: $border-radius-size + 5;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 9999;
  padding-bottom: 12px;
}

.clash-card__image {
  position: relative;
  height: 220px;
  // margin-bottom: 35px;
  border-top-left-radius: $border-radius-size;
  border-top-right-radius: $border-radius-size;
  img {
        width: 100%;
        height: 200px;
            border-top-left-radius: 19px;
    border-top-right-radius: 19px;

  }
}


.clash-card__unit-name {
  font-size: 20px;
  color: black;
  font-weight: 900;
  margin-bottom: 5px;
  margin-top: 10px;
}

.clash-card__unit-description {
  padding: 15px;
  color: rgb(120, 115, 126);
}

.clash-card__unit-stats--barbarian {
  background: $barbarian;
  
  .one-third {
     border-right: 1px solid #5e1523;
  }
}


.clash-card__unit-stats {
  
  color: white;
  font-weight: 700;
  border-bottom-left-radius: $border-radius-size;
  border-bottom-right-radius: $border-radius-size;
  
  .one-third {
    width: 33%;
    float: left;
    padding: 20px 15px;
  }
  
  sup {
    position: absolute;
    bottom: 4px; 
    font-size: 45%;
    margin-left: 2px;
  }
  
  .stat {
    position: relative;
    font-size: 16px;
    // margin-bottom: 10px;
  }
  
  .stat-value {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 13px;
    a{
    color: white;
      text-decoration: none;
    }
    button{
          text-transform: uppercase;

          font-size: 13px;

    }
  }

  .no-border {
    border-right: none;
  }
}

.clearfix:after {
	visibility: hidden;
	display: block;
	font-size: 0;
	content: " ";
	clear: both;
	height: 0;
}

.slick-prev {
  left: 100px;
  z-index: 999;
}

.slick-next {
  right: 100px;
  z-index: 999;
}

</style>


<template>
<div class="slide-container">
  <div class="wrapper">
    <div class="clash-card barbarian">
      <div class="clash-card__image clash-card__image--barbarian">
        <img :src="imgToLoad" alt="barbarian" />
      </div>
      
      <div class="clash-card__unit-name">{{dog.owner.fullName}} and {{dog.preference.name}}</div>
      <div class="clash-card__unit-description">
       TODO distance from you 
      </div>

      <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
        <div class="one-third">
                    <div class="stat">24</div>

          <div class="stat-value">Friend</div>
        </div>

        <div class="one-third">
                    <div class="stat">+</div>

           <div class="stat-value"><button v-on:click="addFrind(dog._id)">FrienDog</button></div>
        </div>

        <div class="one-third no-border">
                              <div class="stat">v</div>

          <div class="stat-value"><router-link :to="'/user/'+dog._id">Profile</router-link></div>
        </div>
      </div>

    </div> <!-- end clash-card barbarian-->
  </div> <!-- end wrapper -->
   <div  v-if="user">
  <div  v-if="user.isAdmin">
      <v-btn class="btn" small color="green accent-3">
        <router-link :to="'/user/edit/'+dog._id">Edit</router-link>
      </v-btn>

      <v-btn small color="red lighten-1" v-on:click="emitDeleteDog(dog._id)">Delete</v-btn>
      </div>
         </div>
</div> <!-- end container -->

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
<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

$border-radius-size: 14px;
$barbarian: #EC9B3B;
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
}

.clash-card__image {
  position: relative;
  height: 200px;
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
  padding: 20px;
  margin-bottom: 10px;  
}

.clash-card__unit-stats--barbarian {
  background: $barbarian;
  
  .one-third {
     border-right: 1px solid #BD7C2F;
  }
}

.clash-card__unit-stats--archer {
  background: $archer;
  
  .one-third {
     border-right: 1px solid #D04976;
  }
}

.clash-card__unit-stats--giant {
  background: $giant;
  
  .one-third {
     border-right: 1px solid darken($giant, 8%);
  }
}

.clash-card__unit-stats--goblin {
  background: $goblin;
  
  .one-third {
     border-right: 1px solid darken($goblin, 6%);
  }
}

.clash-card__unit-stats--wizard {
  background: $wizard;
  
  .one-third {
     border-right: 1px solid darken($wizard, 6%);
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
/* li {
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
} */
</style>


<template>
  <main v-if="park" v-touch:swipe="swipeHandler">
    <figure>
      <img @click="goParkDetails" aspect-ratio="1.75" :src="park.img" />
    </figure>
    <br />
    <div class="content-container">
      <a @click="goParkDetails">
        <h3 class="title">{{park.name}}</h3>
      </a>
      <section class="content">
        <button class="plus onlyCell" @click="plusDivs(-1)">&#10094;</button>
        <button class="minus onlyCell" @click="plusDivs(1)">&#10095;</button>
        <p class="subtitle padding">{{park.distanceValueFromUser/1000}} km from you</p>
        <br />
        <p class="subtitle">There are {{distanceFromUsering}} dogs in park</p>
        <br />
        <p class="rate">
          <b-icon class="b-icon" icon="star"></b-icon>
          {{park.rating}} (1k+)
        </p>

        <!-- <p class="subtitle" v-if="park.distanceValueFromUser">
        {{park.rating}}
        <b-icon v-if="numOfStars>=1" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars>=2" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars>=3" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars>=4" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars===5" class="b-icon" icon="star-outline"></b-icon>
        &nbsp; &bull; &nbsp; 
      </p>
      <p class="subtitle" v-else>
        {{numOfStars}}
        <b-icon v-if="numOfStars>=1" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars>=2" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars>=3" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars>=4" class="b-icon" icon="star-outline"></b-icon>
        <b-icon v-if="numOfStars===5" class="b-icon" icon="star-outline"></b-icon>&nbsp; &bull; &nbsp;1.4 km
        </p>-->

      </section>
    </div>
  </main>
</template>

<script>
import dogsService from "../services/dogs.service";

export default {
  props: {
    park: Object
  },
  data() {
    return {
      user: null,
      dogs: null,
      numOfStars: 3
    };
  },
  created() {
    this.dogs = this.$store.getters.dogsToShow;
    this.user = this.$store.getters.getLoggedinUser;
    this.numOfStars = this.park.rating;
  },

  methods: {
    addReview() {},
    goParkDetails() {
      this.$store.dispatch({ type: "goToPark", park: this.park }).then(() => {
        this.$router.push("/park-details");
      });
    },
    plusDivs(diff) {
      this.$emit("nextPark", diff);
    },
    swipeHandler(direction) {
      if (direction === "right") this.plusDivs(1);
      else if (direction === "left") this.plusDivs(-1);
    }
  },
  computed: {
    imgToLoad() {
      if (this.park.photos[1]) {
        return this.park.img;
      } else {
        return "http://eaawaj.com/wp-content/uploads/2018/06/4241508-park.jpg";
      }
    },
    distanceFromUsering() {
      var dogsInPark = [];
      for (var i = 0; i < this.dogs.length; i++) {
        var lat1 = this.dogs[i].location.lat;
        var lon1 = this.dogs[i].location.lng;
        var lat2 = this.park.geometry.location.lat;
        var lon2 = this.park.geometry.location.lng;
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * c;
        if (distance <= 1) dogsInPark.push(this.dogs[i]);
        function toRad(Value) {
          return (Value * Math.PI) / 180;
        }
      }
      return dogsInPark.length;

      // Converts numeric degrees to radians
    }
  }
};
</script>


<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans");

$color: #44a3d9; // #2f559e;

.b-icon {
  color: gold;
}
.fullStar {
  visibility: hidden;
}

.goToPark {
  cursor: pointer;
}

.minus {
  position: relative;
  right: -194px;
  display: inline;
}

.plus {
  position: relative;
  left: -61px;
  display: inline;
}

.onlyCell {
  visibility: hidden;
  // display: none;
}

body {
  height: 100vh;

  background-color: #eceff1;
  font-family: "Nunito Sans", sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 31%;
}
main {
  background: white;
  color: #263238;
  //   border-radius: 0.5rem;
  overflow: hidden;
  // max-height: 350px;
  max-width: 307px;
  height: 380px;
  margin-bottom: 20px;
  //   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  figure {
    padding: 0;
    margin: 0;
    line-height: 0;
    img {
      image-rendering: crisp-edges;
      object-fit: cover;
      width: 100%;
      height: 230px;
    }
    img:hover {
      cursor: pointer;
    }
  }

  .title {
    // text-align: left;
    // font-weight: 600;
  }
  .content {
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
      font-size: 16px;
      color: #607d8b;
      margin: 0;
      margin-top: 0.3rem;
    }
    .rate {
      display: flex;
      align-items: center;
       font-size: 16px;
      color: #607d8b;
      margin: 0;
      margin-top: 0.25rem;
      justify-content: center
    }
    .padding{
      padding-right: 11px;
    }

    > p {
      line-height: 1.25rem;
      font-size: 0.95rem;
      text-align: left;
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
@media only screen and (max-width: 550px) {
  .onlyDesk {
    display: none;
  }

  .onlyCell {
    visibility: visible;
    // display: block;
  }
}
</style>


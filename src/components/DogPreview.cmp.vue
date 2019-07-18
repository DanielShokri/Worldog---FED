<template>
  <div class="grid">
    <div class="card">
      <div
        @click="openProfile(dog._id)"
        class="card__thumbnail"
        :style="{ 'background-image': 'url(' + imgToLoad + ')' }"
      ></div>
      <!-- <img :src="imgToLoad" class="card__thumbnail" /> -->

      <span class="card__content">
        <h3>{{dog.owner.fullName}} and {{dog.preference.name}}</h3>
        <span class="ago">{{dog.preference.name}} is {{dog.preference.type}}</span>
        <p>
          {{dog.preference.name}} is a {{dog.preference.gender}},
          {{gender}} likes to:
          <span
            v-for="hobby in dog.preference.hobbies"
            :key="hobby._id"
          >{{hobby}},</span>
        </p>
      </span>
      <div class="card__footer">
        <div class="card__footer__meta">
          <span class="meta" tooltip="Like">
            <button @click="addLike(dog._id)">
              <b-icon icon="thumb-up"></b-icon>
            </button>
          </span>
          <span class="meta more" tooltip="Friendog">
            <button @click="addFriend(dog._id)">
              <b-icon icon="account-plus"></b-icon>
            </button>
          </span>
          <span class="more stats" tooltip="Friends">
            {{dog.friends.length}}
            <i class="fa fa-share"></i>
          </span>
          <span class="more stats" tooltip="Likes">
            256
            <i class="fa fa-eye"></i>
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="slide-container" v-if="dog">
    <div class="wrapper">
      <div class="clash-card barbarian">
        <div class="clash-card__image clash-card__image--barbarian">
          <img :src="imgToLoad" alt="barbarian" />
        </div>
        <div class="clash-card__unit-name">{{dog.owner.fullName}} and {{dog.preference.name}}</div>
        <div class="clash-card__unit-description">
          <h2> {{dog.preference.name}} is a {{dog.preference.type}},</h2>
           <h2> {{gender}} is {{dog.preference.age}} years old </h2>
          <h3 v-if="dog.distanceTextFromUser">{{dog.distanceTextFromUser}} from you</h3>
          <h3 v-else>2.3 mi from you</h3>
        </div>
        <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
          <div class="one-third">
            <div class="stat">({{dog.friends.length}})</div>
            <div class="stat-value">Friend's</div>
          </div>
          <div class="one-third">
            <div class="stat-value">
              <button @click="addFriend(dog._id)">
                <b-icon icon="account-plus"></b-icon>FrienDog
              </button>
            </div>
          </div>
          <div class="one-third no-border">
            <div class="stat-value">
              <router-link :to="'/user/'+dog._id">
                <b-icon icon="account"></b-icon>Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-action-wrapper" v-if="loggedinUser">
        <div v-if="loggedinUser.isAdmin">
          <button @click="goToEdit(dog._id)">
            <b-icon icon="square-edit-outline"></b-icon>
          </button>
          <button @click="emitDeleteDog(dog._id)">
            <b-icon icon="trash-can-outline"></b-icon>
          </button>
        </div>
      </div>
  </div>-->
  <!-- end wrapper -->
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default {
  props: ["dog", "loggedinUser"],
  data() {
    return {};
  },

  methods: {
    addFriend(dogId) {
      if (!this.loggedinUser) {
        // console.log("cant adding friend you need to login");
        this.$toast.open({ message: "You need to login", type: "is-danger" });
      }
      //  else {
      //   const userFriends = this.loggedinUser.friends;
      //   const userSentFriendReq = this.loggedinUser.sentFriendsReq;
        // if (userFriends.find(friend => friend.userId === this.dog._id)) {
        //   // console.log(" you are alredy friend");
        //   this.$toast.open({
        //     message: "You are already friends",
        //     type: "is-danger"
        //   });
        // } else if (userSentFriendReq.find(id => id === this.dog._id)) {
        //   // console.log("You have already sent friend request");
        //   this.$toast.open({
        //     message: "You have already sent friend request",
        //     type: "is-danger"
        //   });
        // }
         else {
          // console.log("adding friend", this.loggedinUser);
          this.$store.dispatch({ type: "updateFriendReq", dogId }).then(() => {
            socket.emit("friend req", this.dog)
            this.$toast.open({
              message: "friend request successfully sent!",
              type: "is-success"
            });
          });
        }
      // }
    },
    addLike(dogId) {
      if (!this.loggedinUser) {
        // console.log("cant adding friend you need to login");
        this.$toast.open({ message: "You need to login", type: "is-danger" });
      }
    },
    goToEdit(dogId) {
      // console.log('edit')
      this.$router.push(`/user/edit/${dogId}`);
    },
    emitDeleteDog(dogId) {
      // console.log('deleted')
      this.$emit("delete", dogId);
    },
    openProfile(dogId) {
      this.$store.dispatch({ type: "loadCompInProfile", comp: "Gallery" });
      this.$router.push(`/user/${dogId}`);
    }
  },
  computed: {
    gender() {
      if (this.dog.preference.gender === "female") return "she";
      else return "he";
    },
    getLocation() {
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
// @import url('https://fonts.googleapis.com/css?family=Lato:400');

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-flow: row dense;
  grid-gap: 1.9vw;
  margin: 20px;
}
.card {
  // background-color: white;
  // box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  // color: #4a4a4a;
  // max-width: 100%;
  // position: relative;
  border-radius: 0;
  will-change: transform, box-shadow;
  background-color: #fff;
  &__thumbnail {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: transparent;
    position: relative;
    height: 205px;
    &__share {
      width: 80px;
      position: absolute;
      opacity: 0;
      will-change: opacity;
      right: 10px;
      top: 10px;
      pointer-events: none;
      transition: opacity 0.35s 0.2s;
      ul {
        list-style-type: none;
        li {
          background-color: #fff;
          // border-radius: 50%;
          width: 25px;
          height: 25px;
          line-height: 25px;
          margin-bottom: 10px;
          text-align: center;
          color: #4f575b;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          i {
            font-size: 12px;
          }
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
  &__content {
    font-family: Arial, sans-serif;
    position: relative;
    padding: 20px 25px 20px 25px;
    h4 {
      font-size: 18x;
      font-weight: normal;
      color: #000;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    p {
      font-size: 12px;
      position: relative;
      margin-top: 5px;
      margin-bottom: 5px;
      &:before {
        // content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        box-shadow: inset 0px -50px 50px -15px rgba(255, 255, 255, 1);
      }
    }
    .read-more,
    .ago {
      color: rgba(179, 192, 200, 1);
      font-size: 12px;
      text-align: left;
      transition: color 0.35s;
    }
    .read-more {
      cursor: pointer;
    }
    .author {
      width: 20px;
      height: 20px;
      position: absolute;
      top: -20px;
      background-color: #fff;
      border-radius: 50%;
      padding: 10px;
    }
  }
  &__footer {
    border-top: 1px solid #eaf1f6;
    min-height: 50px;
    &__meta {
      display: block;
      min-height: 50px;
      padding: 12px 15px;
      box-sizing: border-box;
      .meta {
        cursor: pointer;
        display: block;
        width: 26px;
        height: 26px;
        float: left;
        color: #b2c0c8;
        line-height: 26px;
        text-align: center;
        // font-size: 12px;
        // border-radius: 50%;
        transition: color 0.35s, border 0.35s;
        box-sizing: border-box;
        &:hover {
          color: #778d99;
        }
      }
      .more {
        background-color: transparent;
        line-height: 26px;
        font-size: 16px;
        margin-left: 5px;
        color: #b2c0c8;
      }
      .stats {
        float: right;
        font-family: Arial, sans-serif;
        color: #b3c0c8;
        font-size: 11px;
        line-height: 22px;
        vertical-align: middle;
        margin-right: 5px;
        .fa {
          cursor: inherit;
          background-color: transparent;
          margin-left: 5px;
        }
      }
    }
  }
}

[tooltip] {
  position: relative;
  font-family: Arial, sans-serif;
  &:hover {
    &:before {
      opacity: 1;
    }
    &:after {
      opacity: 1;
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
    z-index: 100;
    opacity: 0;
    will-change: opacity;
    transition: opacity 0.3s ease-out;
  }
  &:after {
    content: attr(tooltip);
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%) translateY(-100%);
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: #fff;
    padding: 2px 8px;
    font-size: 11px;
    letter-spacing: 1px;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
    will-change: opacity;
    transition: opacity 0.3s ease-out;
  }
}
</style>


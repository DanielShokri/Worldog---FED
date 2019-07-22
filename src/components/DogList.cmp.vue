<template>
  <v-layout row wrap v-if="dogs">
    <div>
      <dog-preview
        class="onlyCell"
        @nextDog="plusDivs"
        :loggedinUser="loggedinUser"
        :dog="dogToShow"
        @delete="emitDeleteDog"
        @chatWith="userChatWith"
      ></dog-preview>
    </div>
    <v-flex class="onlyDesk" xs12 sm6 mb4 lg3 v-for="dog in dogs" :key="dog._id">
      <dog-preview
        @chatWith="userChatWith"
        :loggedinUser="loggedinUser"
        :dog="dog"
        @delete="emitDeleteDog"
      ></dog-preview>
    </v-flex>
  </v-layout>
</template>

<script>
import DogPreview from "./DogPreview.cmp.vue";

export default {
  props: ["dogs", "loggedinUser"],
  data() {
    return {
      indexRoll: 0,
    };
  },
  computed: {
    dogToShow() {
      return this.dogs[this.indexRoll];
    }
  },
  methods: {
    emitDeleteDog(dogId) {
      this.$emit("delete", dogId);
    },
    plusDivs(diff) {
      if (this.indexRoll >= 0 && this.indexRoll < 4) {
        if (diff === 1 && this.indexRoll === 3) {
          this.indexRoll = 0;
          this.dogToShow;
        } else if (diff === -1 && this.indexRoll === 0) {
          this.indexRoll = 3;
          this.dogToShow;
        } else {
          this.indexRoll += diff;
          this.dogToShow;
        }
      }
    },
    userChatWith(dog) {
      // console.log('this is list', dog)
      this.$emit("chatWith", dog);
    }
  },

  components: {
    DogPreview
  }
};
</script>

<style scoped lang="scss">
.hide {
  display: none;
}
.show {
  display: block;
}

.onlyDesk {
  display: block;
}

.onlyCell {
  display: none;
}

@media only screen and (max-width: 550px) {
  .onlyDesk {
    display: none;
  }

  .onlyCell {
    display: block;
  }
}
</style>

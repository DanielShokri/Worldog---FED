<template>
  <v-layout row wrap v-if="dogs">
    <v-flex xs12 sm6 mb4 lg3 v-for="dog in dogs" :key="dog._id">
      <dog-preview :loggedinUser="loggedinUser" :dog="dog" @delete="emitDeleteDog"></dog-preview>
    </v-flex>
  </v-layout>
</template>

<script>
<<<<<<< HEAD
import DogPreview from './DogPreview.cmp.vue'

export default { 
props: ["dogs", "loggedinUser"],
    data() {
        return {

        }
    },
    methods: {
        emitDeleteDog(dogId) {
            this.$emit('delete', dogId);
        },
       
    },
    
  components: {
    DogPreview,
=======
import DogPreview from "./DogPreview.cmp.vue";

export default {
  props: ["dogs", "loggedinUser"],
  data() {
    return {};
  },
  methods: {
    emitDeleteDog(dogId) {
      this.$emit("delete", dogId);
    }
  },
  components: {
    DogPreview
>>>>>>> 40c0dd1de6937bc1ea338e8d2e24ab23e9fb3d49
  }
}
</script>

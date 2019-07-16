<template>
  <v-layout row wrap>
      <!-- <userFilter></userFilter> -->
    <v-flex xs12 sm6 mb4 lg3 v-for="dog in dogs" :key="dog._id">
      <dog-preview :dog="dog" @delete="emitDeleteDog"></dog-preview>
    </v-flex>
  </v-layout>
</template>

<script>
import DogPreview from "./DogPreview.cmp.vue";
import userFilter from './UsersFilter.cmp'
export default {
  props: {
    dogs: Array
  },
  data() {
    return {};
  },
  methods: {
    emitDeleteDog(dogId) {
      this.$emit("delete", dogId);
    }
  },
  components: {
    DogPreview,
    userFilter
  }
};
</script>

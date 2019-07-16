<template>
  <form @submit.prevent="searchUser">
    <b-input
      class="search-box"
      v-model="filterBy.txt"
      placeholder="Search..."
      type="search"
      icon="magnify"
    ></b-input>
  </form>
</template>


<script>
export default {
  data() {
    return {
      filterBy: {
        txt: ""
      }
    };
  },
  methods: {
      searchUser(){
          this.$emit('setFilter', this.filterBy);
      }
  }
};
</script>

<style scoped>
.search-box {
  position: absolute;
  top: 398px;
  left: 239px;
  width: 280px;
}
</style>
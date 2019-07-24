<template>
  <!-- <div class="search-box">
    <input type="text" v-model="filterBy.txt" placeholder="Search user..."><input @click.enter="searchUser" type="button" value="Search">
  </div>-->
  <div class="wrapper">
    <input
      type="text"
      v-model="filterBy.txt"
      @change="searchUser"
      class="users-search input"
      placeholder="Search your Dogfriends"
    />
    <a @click.enter="searchUser" class="button is-dark search-btn">
      <b-icon icon="magnify"></b-icon>
    </a>
  </div>
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
    searchUser() {
      this.$emit("setFilter", this.filterBy);
    }
  }
};
</script>

<style scoped>
.users-search {
  max-width: 269px;
  margin: 14px 4px 0px 4px;
}

.wrapper {
  max-width: 462px;
  margin: 0 auto;
}
@media (max-width: 950px) {
  .users-search {
    width: 240px;
  }
}

.search-btn {
  margin-top: 14px;
}
</style>
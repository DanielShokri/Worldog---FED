<template>
  <!-- <div class="search-box">
    <input type="text" v-model="filterBy.txt" placeholder="Search user..."><input @click.enter="searchUser" type="button" value="Search">
  </div>-->
  <div class="wrapper">
    <input type="text" class="users-search input" placeholder="Who are you looking for?" />
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
      this.$router.push("/user");
    }
  }
};
</script>

<style scoped>
.users-search {
  max-width: 500px;
  margin: 14px 4px 0px 4px;
}
@media(max-width:950px) {
  .users-search {
    width: 240px;
  }

}

.search-btn {
  margin-top: 14px;
}
</style>
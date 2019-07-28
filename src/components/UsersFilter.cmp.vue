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
    <a @click.enter="searchUser" class="button search-btn">
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

<style scoped lang="scss">
.users-search {
  max-width: 350px;
  height: 48px;
  /* margin-top: 14px; */
  font-size: 19px;

}

.wrapper {
  /* max-width: 462px; */
  /* margin: 0 auto; */
  margin-left: 29px;
}

.search-btn {
  background-color: #ffaa11;
  border: 1px solid #ffaa11;
  height: 48px;
  width: 48px;
    .mdi-24px.mdi:before {
    font-size: 34px;
  }
}

@media (max-width: 950px) {
  .users-search {
       max-width: 247px;
    height: 38px;
    /* margin-top: 14px; */
    font-size: 16px;
  }


.search-btn {
  /* margin-top: 14px; */
  height: 38px;
    width: 38px;
}
.wrapper {
    margin-left: -15px;

}
}

</style>
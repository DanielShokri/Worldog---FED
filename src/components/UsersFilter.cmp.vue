<template>
  <div class="search-box">
    <input type="text" v-model="filterBy.txt" placeholder="Search user..."><input @click.enter="searchUser" type="button" value="Search">
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
.search-box {
  position: absolute;
  top: 350px;
  right: 250px;
  width: 100%;
}
input[type="text"] {
  width: 230px;
  height: 25px;
  padding-right: 50px;
  padding: 15px;
  background-color: #EEE;
  border-radius: 7px;
}

input[type="button"] {
  margin-left: -50px;
  height: 25px;
  width: 50px;
  background: blue;
  color: white;
  border: 0;
  -webkit-appearance: none;
  border-radius: 7px;
}
</style>
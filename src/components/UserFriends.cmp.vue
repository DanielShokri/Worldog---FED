<template>
  <div class="friends-container" v-if="user">
    <div class="card" v-for="dog in user.friends" :key="dog.userId">
      <img @click="goToUser(dog.userId)" :src="dog.userImg" alt="Avatar" />
      <div class="container">
        <h4>
          <b class="dogName" @click="goToUser(dog.userId)">{{dog.userName}}</b>
        </h4>
        <br />
       <button @click="removeUser(dog.userId)"><b-icon class="remove" icon="account-remove"></b-icon></button> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  props: ["user"],
  methods: {
    goToUser(dogId) {
      this.$emit("goTO", dogId);
    },
    removeUser(dogId) {
      this.$emit("removeUser", dogId);
    }
  }
};
</script>


<style scoped lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
  max-width: 150px;
  height: 170px;
}

.remove {
  cursor: pointer;
  position: relative;
  bottom: 0px;
  right: -51px;
}

.dogName {
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

.friends-container {
  display: flex;
  flex-wrap: wrap;
}

img {
  width: 100%;
  height: 90px;
  cursor: pointer;
}
</style>

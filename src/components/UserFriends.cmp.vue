<template>
  <div class="friends-container">
    <h1>friends</h1>

    <div class="friends" v-for="friend in user.friends" :key="friend.userId">{{friend}}</div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {};
  },
  methods: {}
};
</script>

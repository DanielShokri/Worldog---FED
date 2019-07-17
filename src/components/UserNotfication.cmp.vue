<template>
  <!-- <div class="notfication-container">
    <h1>Nutfication</h1>

    <div
      class="notfications"
      v-for="notfication in user.gotFriendsReq"
      :key="notfication.userId"
    >{{notfication}}</div>
  </div>-->
  <section class="userLiList">
    <v-layout row>
      <v-flex>
        <v-card>
          <v-toolbar dense expand dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title class="text-xs-center">Notfications</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list subheader>
            <!-- <v-subheader>Dogs in the park</v-subheader> -->
            <v-list-tile v-for="notfication in user.gotFriendsReq" :key="notfication.userId" avatar>
              <v-list-tile-avatar>
                <img :src="notfication.userImg" />
              </v-list-tile-avatar>
              {{notfication.userName}} Has sent you friend request
              <v-list-tile-content></v-list-tile-content>
              <v-list-tile-action>
                <v-btn @click="confirmFriendShip(notfication)" icon ripple>Confirm</v-btn>
                <v-btn icon ripple>Reject</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    confirmFriendShip(sentUser) {
      this.$emit('makeFriends', sentUser)
    }
  }
};
</script>

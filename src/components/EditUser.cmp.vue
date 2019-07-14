<template>
  <section v-if="copyDog">
    <v-form @submit.prevent="updateDog">
      <v-text-field
        v-model="copyDog.owner.fullName"
        name="name"
        label="Full name"
        type="text"
      ></v-text-field>
     <v-text-field
        v-model="copyDog.preference.name"
        name="name"
        label="Dog Name"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="copyDog.preference.type"
        name="name"
        label="Dog Type"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="copyDog.address"
        name="name"
        label="Address"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="copyDog.profileImg"
        name="name"
        label="Profile Img"
        type="text"
      ></v-text-field>
        <v-btn v-on:click.native="updateDog" color="primary">save</v-btn>
    <!-- <v-checkbox
      v-model="copyDog.isAdmin"
      label=" Is Admin"
    ></v-checkbox> -->

    <v-checkbox
      v-model="copyDog.isAdmin"
      label="is Admin?"
      required
    ></v-checkbox>
    </v-form>

    <!-- <form @submit.prevent="updateDog">
      <h1>dog edit</h1>User Name:
      <input type="text" v-model="copyDog.userName" />
      Dog Name:
      <input type="text" v-model="copyDog.preference.name" />
      Dog Type:
      <input type="text" v-model="copyDog.preference.type" />
      Is Admin:
      <input type="checkbox" v-model="copyDog.isAdmin" />
      Address:
      <input type="text" v-model="copyDog.address" />
      Profile Img:
      <input type="text" v-model="copyDog.profileImg" />

      <button>Save</button>
    </form> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      copyDog: null
    };
  },
  created() {
    this.$store
      .dispatch({
        type: "loadDogById",
        dogId: this.$route.params.id
      })
      .then(() => {
        this.copyDog = JSON.parse(JSON.stringify(this.$store.getters.getDog));
        console.log(this.copyDog);
      });
  },
  methods: {
    updateDog(updatedDog) {
      this.$store
        .dispatch({
          type: "updateDog",
          dog: this.copyDog
        })
        .then(() => {
        //   this.$router.push("/user");
        });
    }
  }
};
</script>


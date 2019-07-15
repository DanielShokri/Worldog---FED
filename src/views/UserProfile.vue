<template>
  <section v-if="dog" class="profile">
  <v-img aspect-ratio="2.30" :src="imgToLoad"></v-img>  
    <h1> {{who}} profile</h1>
    <p>
      My name is {{dog.owner.fullName}}
      I am {{dog.owner.age}} year old,
      <br>
      {{dog.preference.name}} is my dog ,
      {{gender}} liks to
      <span v-for="hobby in dog.preference.hobbies" :key="hobby._id">{{hobby}},</span>
      and so.
      We are living in {{dog.address}}
    </p>
  </section>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      user: null
      //   dog:null
    };
  },
  created() {
    var dogId = this.$route.params.id;

    this.$store.dispatch({
      type: "loadDogById",
      dogId
    });

    this.user = this.$store.getters.getLoggedinUser;
  },
  computed: {
    dog() {
      return this.$store.getters.getDog;
    },
    gender() {
      if (this.dog.preference.gender === "female") return "she";
      else return "he";
    },
    who(){
        // if (this.user.name === this.dog.userName && this.user.password === this.dog.password ) return "my"
    // else 
    return this.dog.owner.fullName
    },
    imgToLoad(){
        if (this.dog.profileImg) return this.dog.profileImg
        else return"https://www.sunnyskyz.com/uploads/2016/12/nlf37-dog.jpg"
    }
    
  },
  components: {}
};
</script>
<style scoped>
h1{

font-size: 23px;
}
p{
    font-size: 20px;
}
</style>
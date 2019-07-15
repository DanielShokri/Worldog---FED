<template>
<div v-if="dog" class="container">
  <header>
          <i> <b-icon icon="menu"></b-icon></i>
  </header>
  <main>
    <div class="row">
      <div class="left col-lg-4">
        <div class="photo-left">
          <img class="photo" :src="imgToLoad"/>
          <div class="active"></div>
        </div>
        <h4 class="name">{{dog.owner.fullName}}</h4>
       
        <p class="desc">  Hi ! My name is {{dog.owner.fullName}}
      I am {{dog.owner.age}} year old,
      {{dog.preference.name}} is my dog ,
      {{gender}} is {{dog.preference.type}} and
      {{gender}} liks to
      <span v-for="hobby in dog.preference.hobbies" :key="hobby._id">{{hobby}},</span>
      and so.
      We are living in {{dog.address}}</p>
        <div class="social">
          <i> <b-icon icon="facebook-box"></b-icon></i>
          <i><b-icon icon="twitter-box"></b-icon></i>
         <i> <b-icon icon="pinterest-box"></b-icon></i>
          <i><b-icon icon="tumblr-box"></b-icon></i>
        </div>
      </div>
        <span class="follow">Follow</span>
      <div class="right col-lg-8">
        <ul class="nav">
          <li>Gallery</li>
          <li>Messages</li>
          <li>Notfication</li>
          <li>Friends</li>
        </ul>
        <div class="row comp">

          <!-- <div class="col-md-4">
          </div> -->
          

        </div>
      </div>
      </div>
  </main>
</div>

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
    //     if (this.user.name === this.dog.userName && this.user.password === this.dog.password ) return "my"
    // else 
    return this.dog.owner.fullName
    },
    imgToLoad(){
        console.log('this dog', this.dog)
        if (this.dog.profileImg) return this.dog.profileImg
        else return"https://www.sunnyskyz.com/uploads/2016/12/nlf37-dog.jpg"
    }
    
  },
  components: {}
};
</script>
<style scoped>
html,body {
  background: #efefef;
  font-family: "Arial";
}

.container {
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
}

header {
  background: #eee;
  background-image: url("https://image.noelshack.com/fichiers/2017/38/2/1505775648-annapurnafocus.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  height: 250px;
}

header i {
  position: relative;
  cursor: pointer;
  right: -90%;
  top: 25px;
  font-size: 18px !important;
  color: #fff;
}

@media (max-width:800px) {
  header {
    height: 150px;
  } 
  
  /* header i {
    right: -45%;
  } */
}

main {
      padding: 20px 20px 0px 20px;
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
}

.active {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  right: calc(50% - 70px);
  top: 75px;
  background-color: #FFC107;
  border: 3px solid #fff;
}

@media (max-width:990px) {
  .active {
    right: calc(50% - 60px);
    top: 50px;
  } 
   header i {
    right: -45%;
  }
  .right{
      width: 100%;
  }
}
@media (min-width:990px) {
  .row {
    flex-wrap: nowrap;
  } 
  .main{
      padding: 30px;
  }
  .left{
      width: 35%;
  }
  .right {
      width: 65%
  }
  
}

.name {
  margin-top: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18pt;
  color: #777;
}

.info {
  margin-top: -5px;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11pt;
  color: #aaa;
}

.stats {
  margin-top: 25px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
  font-family: 'Montserrat', sans-serif;
}


.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: #aaa;
}

.desc-stat {
  margin-top: -15px;
  font-size: 10pt;
  color: #bbb;
}

.desc {
  text-align: center;
  margin-top: 25px;
  margin: 25px 40px;
  color: #999;
  font-size: 16pt;
  font-family: "Open Sans";
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
}

.social {
  margin: 5px 0 12px 0;
  text-align: center;
  display: inline-block;
  font-size: 20pt;
}

.social i {
  cursor: pointer;
  margin: 0 15px;
}

.social i:nth-child(1)  { color: #4267b2; }
.social i:nth-child(2)  { color: #1da1f2; }
.social i:nth-child(3)  { color: #bd081c; }
.social i:nth-child(4)  { color: #36465d; }

.right {
  padding: 0 25px 0 25px !important;
}

.nav {
  display: inline-flex;
}

.nav li {
  margin: 40px 30px 0 10px;
  cursor: pointer;
  font-size: 13pt;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #888;
}

.nav li:hover  { 
  color: #999;
  border-bottom: 2px solid #999;
}

.follow {
  position: absolute;
  right: 8%;
  top: 35px;
  font-size: 11pt;
  background-color: #42b1fa;
  color: #fff;
  padding: 8px 15px;
  cursor: pointer;
  transition: all .4s;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.follow:hover {
  box-shadow: 0 0 15px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.2);
}

@media (max-width:990px) {
  .nav {
    display: none;
  }
  
  .follow {
    width: 300px;
    /* margin-left: 25%; */
    display: block;
    position: unset;
    text-align: center;
        height: 40px;
    margin: 0 auto;

  }
}
.comp {
  margin-top: 35px;
}

.comp div {
  margin-bottom: 30px;
}

.comp img {
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
  width: auto; 
  height: auto;
  cursor: pointer;
  max-width: 100%;
}

</style>
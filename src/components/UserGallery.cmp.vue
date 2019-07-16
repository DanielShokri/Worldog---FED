<template>
 <div class="gallery-container">

     <div class="image" v-for="img in user.gallery" :key="img._id">
<img :src="img" alt="">

     </div>
    </div>
</template>

<script>

export default { 
props:['user'],
    data() {
        return {

        }
    },
    methods: {
      
       
    },
  


};
</script>
<style scoped>

.gallery-container{
display: flex;
flex-wrap: wrap;
justify-content: center;
}

.image{
    width: 200px;
    height: auto;
}
img{
width: 200px;
    height: auto;
    padding: 10px;
}

</style>
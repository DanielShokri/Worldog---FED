<template>
<div class="notfication-container">
<h1> Nutfication</h1>

     <div class="notfications" v-for="notfication in user.gotFriendsReq" :key="notfication.userId">
{{notfication}}
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

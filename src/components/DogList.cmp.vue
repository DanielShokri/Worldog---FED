<template>
<v-layout row wrap v-if="dogs">
<v-flex xs12 sm6 mb4 lg3 v-for="dog in dogs" :key="dog._id">

            <dog-preview                             
                            :loggedinUser="loggedinUser" 
                             :dog="dog" 
                             @delete="emitDeleteDog"
                            >
            </dog-preview>
        
</v-flex>
</v-layout>
</template>

<script>
import DogPreview from './DogPreview.cmp.vue'

export default { 
props: ["dogs", "loggedinUser"],
    data() {
        return {

        }
    },
    methods: {
        emitDeleteDog(dogId) {
            this.$emit('delete', dogId);
        },
       
    },
    components: {
        DogPreview,

    }
  },
  components: {
    DogPreview,
    userFilter
  }
};
</script>

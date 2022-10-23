<template>
    <div class="card">
        <h5>{{username}} a commenter :</h5>
        <p>{{comment}}</p>
        <button v-if="currentUser.admin === 1" @click="deleteComment" class="btn btn-outline-dark">suprimer</button>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
   props: {
       id: String,
       comment: String,
       user_id: String,
       activity_id: String
   },
   computed: {
       ...mapState(["currentUser"]),
       ...mapGetters(["getUserById"]),
        username(){
            return this.getUserById(this.user_id).firstname
        }
   },
   methods: {
       deleteComment(){
           this.$store.dispatch('deleteComment', this.id)
           alert('commentaire surprimer')
       }
   }
}
</script>
<style>
.card{
    margin-top: 1rem;
    padding: 1rem;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
}
</style>
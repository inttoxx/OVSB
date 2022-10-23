<template>
    <div>
        <PostedActivity
            v-for="activity in activities"
            :key="activity._id"
            :id="activity._id"
            :title="activity.title"
            :description="activity.description"
            :category_id="activity.category_id"
            :date="activity.date"
            :time="activity.time"
            :duration="activity.duration"
            :user_id="activity.user_id"
            />
  </div>
</template>
<script>
import PostedActivity from "./PostedActivity.vue";
import { mapGetters, mapState } from 'vuex'
export default {
    components: {
        PostedActivity,
    },
     mounted(){
        if(!localStorage.getItem('user')){
            this.$router.push({name: 'login'})
            alert('Tu dois te connecter avant d\'acceder à cette page')
        }
    },
    computed: {
        ...mapState(["currentUser"]),
        ...mapGetters(["getActivityByUser"]),
        activities() {
            return this.getActivityByUser(this.currentUser.id)
        }
    }
}
</script>
<style>
</style>
<template>
    <div class="postedActivity">
        <p>
            Filtrer par categories:
            <select id="cat" v-model="category">
                <option value="">Toutes</option>
                <option
                    v-for="cat in categories"
                    :key="cat?._id"
                    :value="cat?._id"
                >
                    {{ cat?.category_name }}
                </option>
            </select>
        </p>
        <PostedActivity
            v-for="activity in filteredActivities"
            :key="activity?._id"
            :id="activity?._id"
            :title="activity?.title"
            :description="activity?.description"
            :category_id="activity?.category_id"
            :date="activity?.date"
            :time="activity?.time"
            :duration="activity?.duration"
            :user_id="activity?.user_id"
        />
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PostedActivity from "./PostedActivity.vue";

export default {
    data(){
        return {
            category: ''
        }
    },
    components: {
        PostedActivity,
    },
    computed: {
        ...mapState(["categories", "activities"]),
        ...mapGetters(["getActivitiesByCategory"]),
        filteredActivities(){
            if(!this.category){
                return this.activities
            } else {
                return this.getActivitiesByCategory(this.category)
            }
        }

    },
};
</script>

<style>
.postedActivity {
	display: flex;
	flex-direction: column;
	margin: 25px;
}
</style>

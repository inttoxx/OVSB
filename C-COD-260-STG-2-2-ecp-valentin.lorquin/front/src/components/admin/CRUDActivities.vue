<template>
    <div class="tbl">
        <p>
            Categories:
            <select id="cat">
                <option
                    v-for="cat in categories"
                    :key="cat._id"
                    :value="cat._id"
                >
                    {{ cat.category_name }}
                </option>
            </select>

            date
            <input type="date" id="date" />
            heure
            <input type="time" id="time" />
            durée
            <input type="time" id="duration" />
            &nbsp;
            <button class="btn btn-outline-dark" @click="newActivity()">
                New Activity
            </button>
        </p>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Catagory</th>
                    <th>Creator</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <ActivityTable
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
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ActivityTable from "./ActivityTable.vue";
export default {
    components: {
        ActivityTable,
    },
    computed: {
        ...mapState(["activities", "categories", "currentUser"]),
    },
    methods: {
        newActivity() {
            const title = "New Activity";
            const description = "New Activity";
            const category_id = document.getElementById("cat").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const duration = document.getElementById("duration").value;
            const user_id = this.currentUser.id;
            this.$store.dispatch("newActivity", {
                title,
                description,
                category_id,
                date,
                time,
                duration,
                user_id,
            });
            alert("Nouvelle activité créée !")
        },
    },
};
</script>

<style>
</style>
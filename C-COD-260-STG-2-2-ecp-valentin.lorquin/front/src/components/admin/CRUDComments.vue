<template>
    <div class="tbl">
        <table>
            <thead>
                <tr>
                    <th>Activity</th>
                    <th>User</th>
                    <th>Comment</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <CommentTable
                    v-for="comment in comments"
                    :key="comment._id"
                    :id="comment._id"
                    :activity_id="comment.activity_id"
                    :user_id="comment.user_id"
                    :comment="comment.comment"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CommentTable from "./CommentTable.vue";

export default {
    components: {
        CommentTable,
    },
    computed: {
        ...mapState(["activities", "currentUser", "comments"]),
    },
};
</script>

<style>
</style>
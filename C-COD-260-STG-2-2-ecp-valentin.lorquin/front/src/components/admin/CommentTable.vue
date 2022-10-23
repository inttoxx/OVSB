<template>
    <tr>
        <td>{{ activity }}</td>
        <td>{{ user }}</td>
        <td>{{ comment }}</td>
        <td>
            <button class="btn btn-outline-dark" @click="deleteComment">
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    props: {
        id: String,
        comment: String,
        user_id: String,
        activity_id: String
    },
    created() {
        this.$store.dispatch("fetchUsers");
    },
    computed: {
        ...mapState(["comments"]),
        ...mapGetters([ "getActivityById", "getUserById"]),
        activity() {
            const activity = this.getActivityById(this.activity_id);
            return activity?.title;
        },
        user() {
            const user = this.getUserById(this.user_id);
            return user?.firstname;
        },
    },
    methods: {
        deleteComment() {
            this.$store.dispatch("deleteComment", this.id);
            alert("Commentaire suprimé")
        },
    },
};
</script>

<style>
</style>
<template>
    <div class="card cards mb-3">
        <div>
            <div class="card-body">
                <h1 class="card-title">
                    <span
                        v-if="currentUser.id === activity.user_id"
                        contenteditable="true"
                        id="title"
                        >{{ activity.title }}</span
                    >
                    <span v-if="currentUser.id !== activity.user_id">{{
                        activity.title
                    }}</span>
                </h1>
                <p class="card-title">
                    <small class="text-muted">Posté par : </small>{{ username }}
                </p>
                <p class="card-text">
                    Categorie
                    <select
                        id="category_id"
                        v-if="currentUser.id === activity.user_id"
                    >
                        <option :value="activity.category_id">
                            {{ category }}
                        </option>
                        <option
                            v-for="cat in categories"
                            :key="cat._id"
                            :value="cat._id"
                        >
                            {{ cat.category_name }}
                        </option>
                    </select>
                    <span v-if="currentUser.id !== activity.user_id">{{
                        category
                    }}</span>
                </p>
                <p class="card-text">
                    Description : <br />
                    <span
                        v-if="currentUser.id === activity.user_id"
                        contenteditable="true"
                        id="description"
                        >{{ activity.description }}</span
                    >
                    <span v-if="currentUser.id !== activity.user_id">{{
                        activity.description
                    }}</span>
                </p>
                <p class="card-text">
                    Date :
                    <input
                        type="date"
                        v-if="currentUser.id === activity.user_id"
                        id="date"
                        :value="activity.date"
                    />
                    <span v-if="currentUser.id !== activity.user_id">{{
                        activity.date
                    }}</span>
                </p>
                <p class="card-text">
                    Heure :
                    <input
                        type="time"
                        v-if="currentUser.id === activity.user_id"
                        id="time"
                        :value="activity.time"
                    />
                    <span v-if="currentUser.id !== activity.user_id">{{
                        activity.time
                    }}</span>
                </p>
                <p class="card-text">
                    Durée estimée :
                    <input
                        type="time"
                        v-if="currentUser.id === activity.user_id"
                        id="duration"
                        :value="activity.duration"
                    />
                    <span v-if="currentUser.id !== activity.user_id">{{
                        activity.duration
                    }}</span>
                </p>
            </div>
            <div class="button" v-if="currentUser.id === activity.user_id">
                <button
                    class="btn btn-outline-secondary"
                    @click="updateActivity"
                >
                    Mettre à jour
                </button>
                <button class="btn btn-outline-dark" @click="deleteActivity($route.params.id)">
                    Supprimer
                </button>
            </div>
        </div>
        <div class="comment">
            <h5>Commentaires</h5>
            <div class="card">
                <textarea id="commentaire"></textarea>
                <button
                    @click="comment"
                    id="commentaire"
                    class="btn btn-outline-dark"
                >
                    Commenter
                </button>
            </div>
            <CommentComp
                v-for="comment in comments"
                :key="comment._id"
                :id="comment._id"
                :comment="comment.comment"
                :activity_id="comment.activity_id"
                :user_id="comment.user_id"
            />
        </div>
    </div>
</template>
<script>
import CommentComp from "./CommentComp.vue";
import { mapGetters, mapState } from "vuex";
export default {
    components: {
        CommentComp,
    },

    created() {
        this.$store.dispatch("fetchComments");
    },
    computed: {
        ...mapState(["currentUser", "categories"]),
        ...mapGetters([
            "getActivityById",
            "getCategoryById",
            "getCommentsByActivity",
            "getUserById",
        ]),
        activity() {
            return this.getActivityById(this.$route.params.id);
        },
        category() {
            return this.getCategoryById(this.activity.category_id)
                ?.category_name;
        },
        comments() {
            return this.getCommentsByActivity(this.$route.params.id);
        },
        username() {
            return this.getUserById(this.activity.user_id).firstname;
        },
    },
    methods: {
        comment() {
            const comment = document.getElementById("commentaire").value;
            const activity_id = this.$route.params.id;
            const user_id = this.currentUser.id;
            this.$store
                .dispatch("newComment", { user_id, activity_id, comment })
                .then((document.getElementById("commentaire").value = ""));
        },
        async deleteActivity(_id) {
            console.log(_id);
            await this.$store.dispatch("deleteActivity", _id);
            alert("Activité supprimée !");
            this.$router.push({ name: "home" });
        },
        updateActivity() {
            const _id = this.$route.params.id;
            const title = document.getElementById("title").innerText;
            const description =
                document.getElementById("description").innerText;
            const category_id = document.getElementById("category_id").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const duration = document.getElementById("duration").value;
            const user_id = this.currentUser.id;
            this.$store.dispatch("updateActivity", {
                _id,
                title,
                description,
                category_id,
                date,
                time,
                duration,
                user_id
            });
            alert("Activité mise à jour !");
        },
    },
};
</script>
<style scoped>
.card {
    border: 1px solid black;
    border-radius: 1em;
}
.cards {
    margin-left: 11rem;
    width: 55rem;
}
.comment {
    border-radius: 1em;
    padding: 1rem;
}
textarea {
    padding: 1rem;
    border-radius: 1em;
    margin-bottom: 1rem;
}
.button {
    display: flex;
    justify-content: space-evenly;
}
#description {
    border: 1px solid black;
}
</style>
<template>
    <div>
        <header>
            <router-link :to="{ name: 'home' }">
                <img src="./assets/064635.png" />
            </router-link>
            <router-link :to="{ name: 'newActivity' }" class="btn btn-outline-dark">Post New Activity</router-link>
        </header>
        <div class="container d-flex justify-content-left">
            <aside>
                <div v-if="!login">
                    <router-link
                        :to="{ name: 'login' }"
                        class="btn btn-outline-secondary">
                            Se connecter
                    </router-link><br />
                    <router-link
                        :to="{ name: 'register' }"
                        class="btn btn-outline-secondary">
                            S'enregistrer
                    </router-link>
                </div>
                <div v-if="login">
                    <img :src="`https://api-ovsb.herokuapp.com/pictures/${user.picture_extension}`"
                        class="profilPicture" />
                    <p>Prénom : {{ user.firstname }}</p>
                    <p>Nom : {{ user.lastname }}</p>
                    <p>Genre : {{ user.gender }}</p>
                    <p>Date de naissance : {{ user.birthdate }}</p>
                    <p>Email : {{ user.email }}</p>
                    <p>Description : {{ user.description }}</p>
                    <router-link
                        :to="{ name: 'espacePerso' }"
                        class="btn btn-outline-secondary">
                            Mes activités
                    </router-link><br />
                    <router-link
                        :to="{ name: 'editProfile' }"
                        class="btn btn-outline-secondary">
                            Modifier mon profil
                    </router-link><br />
                    <router-link
                        :to="{ name: 'admin' }"
                        v-if="user.admin === 1"
                        class="btn btn-outline-secondary">
                            Admin center
                    </router-link><br />
                    <button
                        @click="logout"
                        class="btn btn-outline-dark">
                            Se déconnecter
                    </button>
                </div>
            </aside>
            <article>
                <router-view />
            </article>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    created() {
        this.$store.dispatch("fetchUsers"),
            this.$store.dispatch("fetchActivities"),
            this.$store.dispatch("fetchCategories"),
            this.$store.dispatch("fetchComments"),
            this.$store.dispatch("setCurrentUser");
    },
    computed: {
        ...mapState(["currentUser"]),
        user() {
            return this.currentUser.data;
        },
        login() {
            return this.currentUser.id;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
            .then(() => {
                this.$router.push({name: 'home'});
            });
        },
    },
};
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    position: sticky;
    top: 0px;
    background-color: #ffffff;
    z-index: 2;
}
aside {
    width: 15rem;
    height: 42rem;
    border: 1px solid black;
    border-radius: 1em;
    text-align: center;
    position: sticky;
    top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
}
img {
    width: 5rem;
    height: auto;
}
.profilPicture {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-left: 3.5rem;
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}
div {
    display: grid;
}
</style>
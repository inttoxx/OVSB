<template>
    <form @submit="newActivity" class="newActivity">
        <br />
        <div class="form-floating mb-3">
            <input
                type="text"
                class="form-control"
                id="title"
                placeholder="titre"
            />
            <label for="floatingInput">Titre</label>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Description de l'activité proposée
                <textarea
                    required
                    class="form-control"
                    id="description"
                    rows="4"
                ></textarea>
            </p>
        </div>
        <div class="select">
            <p>
                &nbsp; Catégorie de l'activité
                <select
                    required
                    class="form-select"
                    aria-label="Default select example"
                    id="category"
                >
                    <option
                        v-for="cat in categories"
                        :key="cat.id"
                        :value="cat._id"
                    >
                        {{ cat.category_name }}
                    </option>
                </select>
            </p>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Date de l'activité
                <input
                    required
                    type="date"
                    class="form-control"
                    id="date"
                    placeholder="Date"
                />
            </p>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Heure de début
                <input
                    required
                    type="time"
                    class="form-control"
                    id="time"
                    placeholder="Heure"
                />
            </p>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Durée de l'activité
                <input
                    required
                    type="time"
                    class="form-control"
                    id="duration"
                    placeholder="Heure"
                />
            </p>
        </div>
        <button @click="newActivity" class="btn btn-outline-dark">
            Poster votre activité
        </button>
    </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "NewActivity",
    mounted(){
        if(!localStorage.getItem('user')){
            this.$router.push({name: 'login'})
            alert('Tu dois te connecter avant d\'acceder à cette page')
        }
    },
    computed: {
        ...mapState(["categories", "currentUser"]),
    },
    methods: {
        ...mapActions(["NewActivity"]),
        async newActivity() {
            const user_id = this.currentUser.id;
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const category_id = document.getElementById("category").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const duration = document.getElementById("duration").value;

            console.log(user_id);

            await this.$store.dispatch("newActivity", {
                title,
                description,
                category_id,
                date,
                time,
                duration,
                user_id,
            });
            alert('Nouvelle activité créée')
            this.$router.push({ name: "home" });
        },
    },
};
</script>

<style>
.newActivity {
    padding: 1em;
    border: 1px solid black;
    border-radius: 1em;
    margin-left: 4em;
    width: 50rem;
    /* height: 40rem; */
}
</style>
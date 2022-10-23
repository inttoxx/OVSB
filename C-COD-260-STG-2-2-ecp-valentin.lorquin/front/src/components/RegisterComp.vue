<template>
    <form name="form-register" class="register p-4" @submit="submitForm">
        <div v-if="showError" class="alert alert-danger">
            Il y a eu une erreur avec le formulaire
        </div>
        <div class="form-floating mb-3">
            <input
                required
                type="text"
                name="firstname"
                class="form-control"
                placeholder="Prénom"
                v-model="form.firstname"
            />
            <label for="floatingInput">Prénom</label>
        </div>
        <div class="form-floating mb-3">
            <input
                required
                type="text"
                name="lastname"
                class="form-control"
                placeholder="Nom"
                v-model="form.lastname"
            />
            <label for="floatingInput">Nom</label>
        </div>
        <div class="select">
            <p>
                &nbsp; Genre
                <select
                    required
                    name="gender"
                    class="form-select"
                    aria-label="Default select example"
                    v-model="form.gender"
                >
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                    <option value="Autre">Autre</option>
                </select>
            </p>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Date de naissance
                <input
                    required
                    type="date"
                    name="birthdate"
                    class="form-control"
                    placeholder="Date de naissance"
                    v-model="form.birthdate"
                />
            </p>
        </div>
        <div class="form-floating mb-3">
            <input
                required
                type="email"
                name="email"
                class="form-control"
                placeholder="exemple@exemple.com"
                v-model="form.email"
            />
            <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating mb-3">
            <input
                required
                name="password"
                type="password"
                minlength="6"
                maxlength="20"
                class="form-control"
                placeholder="Password"
                v-model="form.password"
            />
            <label for="floatingPassword">Mot de passe (6-20 caractères)</label>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Image de profil
                <input
                    required
                    type="file"
                    name="picture_extension"
                    class="form-control"
                    @change="onChangeFile"
                />
            </p>
        </div>
        <div class="form-floating mb-3">
            <p>
                &nbsp; Description
                <textarea
                    required
                    name="description"
                    class="form-control"
                    rows="5"
                    v-model="form.description"
                ></textarea>
            </p>
        </div>
        <button type="submit" class="btn btn-outline-dark">
            S'enregistrer
        </button>
    </form>
</template>

<script>
export default {
    name: "RegisterComp",
    mounted() {
        if (localStorage.getItem("user")) {
            this.$router.push({ name: "home" });
            alert("Tu es déjà connecté !");
        }
    },
    data() {
        return {
            form: {
                firstname: "",
                lastname: "",
                gender: "male",
                birthdate: "",
                email: "",
                password: "",
                picture_extension: "",
                description: "",
            },
            showError: false,
        };
    },
    methods: {
        async submitForm(event) {
            event.preventDefault();
            this.showError = false;
            const userData = new FormData(event.target);

            this.$store
                .dispatch("newUser", userData)
                .then(() => this.$router.push({ name: "login" }));
            alert(
                "Votre compte a bien été créé, vous pouvez à présent vous connecter !"
            );
        },
    },
};
</script>

<style>
.register {
    width: 40rem;
    border: 1px solid black;
    border-radius: 1em;
    margin-left: 11rem;
}
</style>
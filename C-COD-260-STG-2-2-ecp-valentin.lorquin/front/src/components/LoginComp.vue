<template>
    <form @submit="login" class="login">
        <br />
        <div class="form-floating mb-3">
            <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="exemple@exemple.com"
            />
            <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
            />
            <label for="floatingPassword">Mot de passe</label>
        </div>
        <br />
        <button type="submit" @click="login" class="btn btn-outline-dark">Se connecter</button>
    </form>
</template>

<script>
export default {
     mounted(){
        if(localStorage.getItem('user')){
            this.$router.push({name: 'home'})
            alert('tu es déjà connécté')
        }
    },
    methods: {
        async login() {
            let email = document.getElementById('floatingInput').value;
            let password = document.getElementById('floatingPassword').value;
            await this.$store.dispatch('login', { email, password })
                .then(() => this.$router.push({ name: 'home' }))
        },
    },
};
</script>

<style>
.login {
    width: 40rem;
    border: 1px solid black;
    border-radius: 1em;
    padding: 1rem;
    margin-left: 10rem
}

</style>
<template>
<div class="register p-4">
        <img
            class="avatar"
            :src="`https://api-ovsb.herokuapp.com/pictures/${user.picture_extension}`"
        />
    <form >
		<div class="form-floating mb-3">
			<small>Prénom</small>
            <input contenteditable="true" id="firstname" :value="user.firstname"/>
		</div>
		<div class="form-floating mb-3">
			<small>Nom</small>
            <input contenteditable="true" id="lastname" :value="user.lastname"/>
		</div>
		<div class="form-floating mb-3">
			<small>Genre</small>
            <select id="gender">
                <option :value="user.gender">{{user.gender}}</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
                <option value="Autre">Autre</option>
            </select>
		</div>
		<div class="form-floating mb-3">
			<small>Date de naissance : </small>
                <input type="date" id="birthdate" :value="user.birthdate">
		</div>
		<div class="form-floating mb-3">
			<small>Email :  </small>
            <input type="mail" id="email" :value="user.email">
		</div>
        <div class="form-floating mb-3">
            <small>Description : </small>
            <p contenteditable="true" :id="'description'">
                {{ user.description }}
            </p>
        </div>
        <button
            @click="updateUser(id)"
            class="btn btn-outline-secondary"
            style="margin-bottom: 2rem"
        >
            Mettre à jour mes infos personnelles
        </button>
		<div class="form-floating mb-3">
            <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
            />
            <label for="floatingPassword">Mot de passe</label>
		</div>
        <button @click="updatePassword(id)" class="btn btn-outline-secondary">Mettre à jour mon mot  de passe</button><br/><br/>
		<button @click="deleteUser(id)" class="btn btn-outline-dark">
			Supprimer mon compte
		</button>
    </form>
</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
	computed: {
		...mapState(["currentUser"]),
		...mapGetters(["getUserById"]),
		user(){
			return this.currentUser.data;
		},
	},
    methods: {
		updatePassword() {
            const _id = this.currentUser.id;
			const password = document.getElementById(
				"floatingPassword"
			).value;
			this.$store.dispatch("updatePassword", {
				_id,
				password
            });
            alert("Mot de passe mis à jour")
		},
        deleteUser() {
            if (confirm("Nouvelle activité créée !")) {
                this.$store.dispatch("deleteUser", this.currentUser.id);
                alert("Votre comptre a bien été supprimé")
            }
        },
        updateUser() {
            const _id = this.currentUser.id;

            const firstname = document.getElementById("firstname").value;
            const lastname = document.getElementById(
                "lastname"
            ).value;
            const gender = document.getElementById("gender").value;
            const birthdate = document.getElementById(
                "birthdate"
            ).value;
            const email = document.getElementById("email").value;
            const description = document.getElementById(
                "description"
            ).innerText;
            console.log(firstname, lastname, gender, birthdate, email, description)
            this.$store.dispatch("updateUser", {
                _id,
                firstname,
                lastname,
                gender,
                birthdate,
                email,
                description
            });
            alert("Infos personnelles mises à jour !")

        },
    },
};
</script>

<style scoped>
#description{
    border: 1px solid black;
}
.avatar{
    width: 30rem;
    border-radius: 1rem;
    margin-left: 3.5rem;
}

</style>
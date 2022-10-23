<template>
    <div class="tbl">
        <button id="newUser" class="btn btn-outline-dark" @click="newUser()">
            New user
        </button>
            <table>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Admin</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <UserTable
                        v-for="user in users"
                        :key="user._id"
                        :id="user._id"
                        :picture_extension="user.picture_extension"
                        :firstname="user.firstname"
                        :lastname="user.lastname"
                        :gender="user.gender"
                        :birthdate="user.birthdate"
                        :email="user.email"
                        :description="user.description"
                        :admin="user.admin"
                    />
                </tbody>
            </table>
    </div>
</template>

<script>
import { mapState } from "vuex";
import UserTable from "./UserTable.vue";

export default {
    components: {
        UserTable,
    },
    computed: {
        ...mapState(["users"]),
    },
    methods: {
        newUser() {
            const picture_extension = "";
            const firstname = "newUser";
            const lastname = "newUser";
            const gender = "autre";
            const birthdate = "01/01/01";
            const description = "description";
            const email = "email@email.com";
            const password = "password";

            this.$store.dispatch("newUser", {
                picture_extension,
                firstname,
                lastname,
                gender,
                birthdate,
                description,
                email,
                password,
            });
            alert("Nouveau utilisateur créé !")
        },
    },
};
</script>

<style>
th,
td {
    border-bottom: 1px solid black;
    word-break: break-all;
    padding: 1rem;
}
.tbl {
    width: 61rem;
    margin-left: 5rem;
    border: 1px solid black;
    border-radius: 1em;
    padding: 1rem;
}
</style>
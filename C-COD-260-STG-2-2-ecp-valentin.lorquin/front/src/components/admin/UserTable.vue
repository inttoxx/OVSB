<template>
    <tr>
        <td contenteditable="true" :id="'picture_extension->'+id">{{picture_extension}}</td>
        <td contenteditable="true" :id="'firstname->'+id">{{firstname}}</td>
        <td contenteditable="true" :id="'lastname->'+id">{{lastname}}</td>
        <td contenteditable="true" :id="'gender->'+id">{{gender}}</td>
        <td contenteditable="true" :id="'birthdate->'+id">{{birthdate}}</td>
        <td contenteditable="true" :id="'email->'+id">{{email}}</td>
        <td contenteditable="true" :id="'description->'+id">{{description}}</td>
        <td contenteditable="true" :id="'admin->'+id">{{admin}}</td>
        <td><button @click="updateUser(id)" class="btn btn-outline-secondary">Update</button></td>
        <td><button @click="delUser(id)" class="btn btn-outline-dark">Delete</button></td>
    </tr>
</template>
<script>

export default {
    props: {
        id: String,
        picture_extension: String,
        firstname: String,
        lastname: String,
        gender: String,
        birthdate: String,
        email: String,
        description: String,
        admin: Number
    },
    methods: {
        delUser(_id){
            this.$store.dispatch('deleteUser', _id)
        },
        updateUser(_id) {
            const picture_extension = document.getElementById('picture_extension->'+_id).innerText;
            const firstname = document.getElementById('firstname->'+_id).innerText;
            const lastname = document.getElementById('lastname->'+_id).innerText;
            const gender = document.getElementById('gender->'+_id).innerText;
            const birthdate = document.getElementById('birthdate->'+_id).innerText;
            const email = document.getElementById('email->'+_id).innerText;
            const description = document.getElementById('description->'+_id).innerText;
            const admin = document.getElementById('admin->'+_id).innerText;
            this.$store.dispatch('updateUser', {_id, picture_extension, firstname, lastname, gender, birthdate, email, description, admin})
        }
    },
}
</script>
<style>
</style>
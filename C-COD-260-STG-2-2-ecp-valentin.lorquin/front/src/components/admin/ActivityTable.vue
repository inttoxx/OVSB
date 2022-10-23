<template>
    <tr>
        <td :id="'title->'+id" contenteditable="true">{{title}}</td>
        <td :id="'description->'+id" contenteditable="true">{{description}}</td>
        <td>
            <select :id="'category_id->'+id">
                <!-- categorie de base -->
                <option :value="category_id">{{category_name}}</option>
                <!-- toutes les categories -->
                <option 
                    v-for="cat in categories" 
                    :key="cat._id"
                    :value="cat._id"
                >
                        {{cat.category_name}}
                </option>
            </select>
        </td>
        <td>{{user}}</td>
        <td :id="'date->'+id" contenteditable="true">{{date}}</td>
        <td :id="'time->'+id" contenteditable="true">{{time}}</td>
        <td :id="'duration->'+id" contenteditable="true">{{duration}}</td>
        <td><button class="btn btn-outline-secondary" @click="updateActivity(id)">Update</button></td>
        <td><button class="btn btn-outline-dark" @click="deleteActivity(id)">Delete</button></td>
    </tr>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
    props: {
        id: String,
        title: String,
        description: String,
        category_id: String,
        date: String,
        time: String,
        duration: String,
        user_id: String
    },
    created() {
        this.$store.dispatch('fetchUsers')
    },
    computed:{ 
        ...mapState(["categories"]),
        ...mapGetters(["getCategoryById", "getUserById"]),
        category_name(){
            const category =  this.getCategoryById(this.category_id)
            return category?.category_name
        },
        user(){
            const user = this.getUserById(this.user_id)
            return user?.firstname
        }
    },
    methods: {
        deleteActivity(_id){
            this.$store.dispatch('deleteActivity', _id)
            alert("Activiété suprimée")
        },
        updateActivity(_id) {
            const title = document.getElementById('title->'+_id).innerText;
            const description = document.getElementById('description->'+_id).innerText;
            const category_id = document.getElementById('category_id->'+_id).value;
            const date = document.getElementById('date->'+_id).innerText;
            const time = document.getElementById('time->'+_id).innerText;
            const duration = document.getElementById('duration->'+_id).innerText;
            this.$store.dispatch('updateActivity', { _id, title, description, category_id, date, time, duration })
            alert("Activiété mise à jour")
        }
    },
}
</script>
<style>
</style>
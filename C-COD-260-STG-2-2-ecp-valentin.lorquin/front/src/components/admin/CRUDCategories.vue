<template>
<div class="tbl">
    <button class="btn btn-outline-dark" @click="newCategory()">New category</button>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <CategoryTable 
             v-for="category in categories"
             :key="category._id"
             :id="category._id"
             :name="category.category_name"/>
        </table>
</div>
</template>

<script>
import { mapState } from "vuex";
import CategoryTable from './CategoryTable.vue'
export default {
    components: {
        CategoryTable
    },
    computed: { 
        ...mapState(["categories"])
    },
    methods: {
        newCategory(){
            const category_name = "New Category"
            this.$store.dispatch('newCategory', { category_name })
            alert("Nouvelle catégorie créée !")
        }
    },
}
</script>

<style>
</style>
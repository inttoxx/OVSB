<template>
    <div class="container">
        <router-link class="linkCrud" :to="{ name: 'CRUDUsers' }">
            <h4>Users</h4>
        </router-link>
        <router-link class="linkCrud" :to="{ name: 'CRUDCategories' }">
            <h4>Categories</h4>
        </router-link>
        <router-link class="linkCrud" :to="{ name: 'CRUDActivities' }">
            <h4>Activities</h4>
        </router-link>
        <router-link class="linkCrud" :to="{ name: 'CRUDComments' }">
            <h4>Comments</h4>
        </router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(["currentUser"])
    },
};
</script>

<style scoped>
.linkCrud {
    display: flex;
    color: black;
    text-decoration: none;
    border: 1px solid black;
    border-radius: 1em;
    width: 11rem;
    height: 11rem;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
}
.linkCrud:hover {
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
</style>
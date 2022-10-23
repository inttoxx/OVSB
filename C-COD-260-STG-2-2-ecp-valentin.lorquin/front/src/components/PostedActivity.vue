<template>
    <router-link :to="{name: 'activity', params: { id: id }}" class="postedActivity">
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title" :id="'title->' + id">
                    {{ title }}
                </h5>
                <p class="card-text">
                    <small class="text-muted">poster par : </small>{{username}}
                </p>
                <p class="card-text">
                    <small class="text-muted">catégory : </small>{{ category_name }}
                </p>
                <p class="card-text" :id="'description->' + id">
                    <small class="text-muted">description :</small><br/>{{ description }}
                </p>
                <p class="card-text">
                    <small class="text-muted" :id="'date->' + id">Date : </small>{{ date }}
                </p>
                <p class="card-text">
                    <small class="text-muted" :id="'time->' + id">Heure de début : </small>{{ time }}
                </p>
                <p class="card-text">
                    <small class="text-muted" :id="'duration->' + id">Durée prévue : </small>{{ duration }}
                </p>
            </div>
        </div>
    </router-link>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "PostedActivity",
    props: {
        id: String,
        title: String,
        description: String,
        category_id: String,
        date: String,
        time: String,
        duration: String,
        user_id: String,
    },
    computed: {
        ...mapState(["categories", "currentUser"]),
        ...mapGetters(["getCategoryById", "getUserById"]),
        category_name() {
            const category = this.getCategoryById(this.category_id);
            return category?.category_name;
        },
        username(){
            return this.getUserById(this.user_id).firstname
        }
    }
};
</script>

<style scoped>
.card {
    border: 1px solid black;
    border-radius: 1em;
}
.postedActivity {
    width: 50rem;
    display: flex;
    flex-wrap: wrap;
    color: black;
    text-decoration: none;
}
.card-body{
    border-radius: 1em;
}
.card:hover{
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
}
</style>
<template>
    <div>
        <h1>Edition utilisateur</h1>
        <form @submit.prevent="edit">
            <input type="text" id="user_id" v-model="user.id" hidden>
            <div class="form__group">
                <label for="user_nom">Nom</label>
                <input type="text" id="user_nom" v-model="user.nom">
            </div>
            <div class="form__group">
                <label for="user_prenom">Prénom</label>
                <input type="text" id="user_prenom" v-model="user.prenom">
            </div>
            <div class="form__group">
                <label for="user_pseudo">Pseudo</label>
                <input type="text" id="user_pseudo" v-model="user.pseudo">
            </div>
            <div class="form__group">
                <label for="user_email">Email</label>
                <input type="email" id="user_email" v-model="user.email">
            </div>
            <div class="form__group">
                <button type="submit" class="form__button">Modifier</button>
            </div>
        </form>
    </div>
</template>

<script>
import { userService } from "@/_services/user.service"

export default {
    name: "UserEdit",
    props: ["id"],
    data() {
        return {
            user: {}
        }
    },
    methods: {
        edit() {
            userService.updateUser(this.user)
                .then(res => this.$router.push({ name: "userIndex" }))
                .catch(err => console.log(err))
        }
    },
    mounted() {
        userService.getUser(this.id)
            .then(res => {
                this.user = res.data.data
            })
            .catch(err => console.log(err))
    }
}
</script>

<style>

</style>
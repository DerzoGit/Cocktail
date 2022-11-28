<template>
    <div>
        <h1>Création d'un utilisateur</h1>
        <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes :</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>
        <form @submit.prevent="add">
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
                <label for="user_email">Mot de passe</label>
                <input type="password" id="user_password" v-model="user.password">
            </div>
            <div class="form__group">
                <label for="confirm_password">Vérification</label>
                <input type="password" id="confirm_password" v-model="confirm">
            </div>
            <div class="form__group">
                <button type="submit" class="form__button">Créer l'utilisateur</button>
            </div>
        </form>
    </div>
</template>

<script>
import { userService } from '@/_services'

export default {
    name: "UserAdd",
    data() {
        return {
            user: {
                nom: "",
                prenom: "",
                pseudo: "",
                email: "",
                password: "",
            },
            confirm: "",
            errors: []
        }
    },
    methods: {
        add() {
            this.errors = []

            if(this.user.password != this.confirm) {
                this.errors.push("Le mot de passe doit correspondre avec la vérification")
            }

            if(this.user.password.length < 6) {
                this.errors.push("Le mot de passe doit avoir minimum 6 caractères")
            }

            if(this.errors.length == 0) {
                userService.createUser(this.user)
                .then(res => this.$router.push({ name: "userIndex" }))
                .catch(err => console.log(err))
            }
        }
    }
}
</script>

<style>

</style>
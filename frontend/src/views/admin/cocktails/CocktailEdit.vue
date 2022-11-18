<template>
    <div>
        <h1>Ajouter un cocktail</h1>
        <form @submit.prevent="add">

            <!-- <input type="text" id="user_id" v-model="cocktail.userId" hidden> -->

            <div class="form__group">
                <label for="cocktail_nom">Nom</label>
                <input type="text" id="cocktail_nom" v-model="cocktail.nom">
            </div>
            <div class="form__group">
                <label for="cocktail_description">Description</label>
                <input type="text" id="cocktail_description" v-model="cocktail.description">
            </div>
            <div class="form__group">
                <label for="cocktail_recette">Recette</label>
                <input type="text" id="cocktail_recette" v-model="cocktail.recette">
            </div>
            <div class="form__group">
                <button type="submit" class="form__button">Ajouter le cocktail</button>
            </div>
        </form>
    </div>
</template>

<script>
import { cocktailService } from "@/_services/cocktail.service"

export default {
    name: "CocktailEdit",
    data() {
        return {
            cocktail: {
                userId: 1,
                nom: "",
                description: "",
                recette: ""
            }
        }
    },
    methods: {
        add() {
            cocktailService.createCocktail(this.cocktail)
                .then(res => this.$router.push({ name: "cocktailIndex" }))
                .catch(err => console.log(err))
        }
    }
}
</script>

<style>

</style>
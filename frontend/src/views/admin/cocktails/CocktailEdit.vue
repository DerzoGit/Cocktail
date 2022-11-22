<template>
    <div>
        {{ id }}
        <h1 v-if="!edition">Ajouter un cocktail</h1>
        <form @submit.prevent="add">

            <input type="text" id="user_id" v-model="cocktail.userId" hidden>

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
import { watch } from "vue"

export default {
    name: "CocktailEdit",
    props: ["id"],
    data() {
        return {
            cocktail: {
                userId: 0,
                nom: "",
                description: "",
                recette: ""
            }
        }
    },
    setup(props) {
        watch(props, (value, old) => {
            console.log(value.id, old)
        })
    },
    methods: {
        add() {
            cocktailService.createCocktail(this.cocktail)
                .then(res => this.$router.push({ name: "cocktailIndex" }))
                .catch(err => console.log(err))
        }
    },
    
}
</script>

<style>

</style>
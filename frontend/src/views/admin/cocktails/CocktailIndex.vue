<template>
    <div>
        <h1>Liste des cocktails ({{ cocktailCount }})</h1>
        <table class="cocktailIndex__table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Recette</th>
                    <th>Création</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cocktail, index) in cocktails" :key="cocktail.id">
                    <td><span class="delButton" @click="del(index)">x</span></td>
                    <td>{{ cocktail.id }}</td>
                    <td class="cocktailIndex__table--edit" @click="goEdit(cocktail.id)">{{ cocktail.nom }}</td>
                    <td>{{ cocktail.nom }}</td>
                    <td>{{ cocktail.description }}</td>
                    <td>{{ dateFormat[index] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { cocktailService } from '@/_services'

export default {
    name: "CocktailIndex",
    data() {
        return {
            cocktails: []
        }
    },
    methods: {
        goEdit(cocktailId) {
            this.$router.push({ name: "cocktailEdit", params: { id: cocktailId }} )
        },
        del(index) {
            cocktailService.deleteCocktail(this.cocktails[index].id)
                .then(res => this.cocktails.splice(index, 1))
                .catch(err => console.log(err))
        }
    },
    mounted() {
        cocktailService.getAllCocktails()
            .then(res => {
                this.cocktails = res.data.data
            })
            .catch(err => console.log(err))
    },
    computed: {
        cocktailCount() {
            return (this.cocktails.length == 0) ? "Aucun cocktail" : (this.cocktails.length == 1 ) ? `${ this.cocktails.length } cocktail` : `${ this.cocktails.length } cocktails`
        },
        dateFormat() {
            return this.cocktails.map(cocktail => cocktail.createdAt.split("T")[0].split("-").reverse().join("/"))
        }
    }
}
</script>

<style lang="scss">
.cocktailIndex {
        &__table {
            width: 100%;
            &--edit {
                cursor: pointer;
                &:hover {
                    font-weight: bold;
                }
            }
        }
    }

    .delButton {
        cursor: pointer;
        color:red;
    }
</style>
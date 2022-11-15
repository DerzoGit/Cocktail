<template>
    <div class="public">
        <img alt="Vue logo" src="@/assets/logo.png" class="public__logo">
        <nav>
            <router-link to="/">Accueil</router-link> |
            <router-link to="/cocktails">Cocktails</router-link> |
            <router-link to="/contact">Contact</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "PublicNav"
}
</script>

<style lang="scss">
    .public {
        &__logo {
            position: absolute;
            right: 2rem;
            height: 3rem;
        }
    }
</style>
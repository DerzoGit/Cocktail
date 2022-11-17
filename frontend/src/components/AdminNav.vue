<template>
    <div>
        <ul>
            <li><router-link to="/">Accueil</router-link></li>
            <li>&nbsp;</li>
            <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
            <li>&nbsp;</li>
            <li><router-link to="/admin/users/index">User list</router-link></li>
            <li><router-link to="/admin/users/add">User add</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "AdminNav"
}
</script>

<style lang="scss">
    ul {
        list-style: none;
        padding-left: 0rem;
        margin-right: 0.8rem;
        & li {
            text-align: left;
        }
    }
</style>
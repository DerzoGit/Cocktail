<template>
    <div class="userIndex">
        <h1>Liste des utilisateurs ({{ userCount }})</h1>
        <table class="userIndex__table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Création</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td><span class="delButton" @click="del(index)">x</span></td>
                    <td>{{ user.id }}</td>
                    <td class="userIndex__table--edit" @click="goEdit(user.id)">{{ user.nom }}</td>
                    <td>{{ user.prenom }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ dateFormat[index] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { userService } from "@/_services/user.service"

export default {
    name: "UserIndex",
    data() {
        return {
            users: []
        }
    },
    methods: {
        goEdit(userId) {
            this.$router.push({ name: "userEdit", params: { id: userId }} )
        },
        del(index) {
            userService.deleteUser(this.users[index].id)
                .then(res => this.users.splice(index, 1))
                .catch(err => console.log(err))

        }
    },
    mounted() {
        userService.getAllUsers()
            .then(res => {
                this.users = res.data.data
            })
            .catch(err => console.log(err))
    },
    computed: {
        userCount() {
            return (this.users.length == 0) ? "Aucun utilisateur" : (this.users.length == 1 ) ? `${ this.users.length } utilisateur` : `${ this.users.length } utilisateurs`
        },
        dateFormat() {
            return this.users.map(user => user.createdAt.split("T")[0].split("-").reverse().join("/"))
        }
    }
}
</script>

<style lang="scss">
    .userIndex {
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
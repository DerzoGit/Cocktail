<template>
    <div>
        Liste des utilisateurs ({{ userCount }})
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Création</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.nom }}</td>
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
    mounted() {
        userService.getAllUsers()
            .then(res => {
                console.log(res.data.data)
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

<style>

</style>
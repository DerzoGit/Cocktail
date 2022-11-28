<template>
    <div>
        <h1>Connexion</h1>
        {{ user.login }}
        <form @submit.prevent="login" class="form">
            <div class="form__group">
                <label for="user_email">Email</label>
                <input type="text" id="user_email" v-model="user.email"/>
            </div>
            <div class="form__group">
                <label for="user_password">Password</label>
                <input type="password" id="user_password" v-model="user.password"/>
            </div>
            <div class="form__group">
                <button type="submit" class="form__button">Connexion</button>
            </div>
        </form>
    </div>
</template>

<script>
import { accountService } from "@/_services"

export default {
    name: "Login",
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            accountService.login(this.user)
                .then(res => {
                    accountService.saveToken(res.data.access_token)
                    this.$router.push("/admin/dashboard")
                })
                .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss">
    .form {
        max-width: 19rem;
        margin: 0 auto;
        &__group {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
    }
</style>
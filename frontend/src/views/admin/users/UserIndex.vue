<template>
    <div>
        User Index works
    </div>
</template>

<script>
import { userService } from "@/_services/user.service"

export default {
    name: "UserIndex",
    mounted() {
        userService.getAllUsers()
            .then(res => console.log(res.data.data))
            .catch(err => console.log(err))
    }
}
</script>

<style>

</style>
<template>
    <div class="admin">
        <AdminHeader/>
        <div class="admin__container">
            <div class="admin__side">
                <AdminNav/>
            </div>
            <div class="admin__display">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader"
import AdminNav from "@/components/AdminNav"

export default {
    name: "AdminLayout",
    components: {
        AdminHeader,
        AdminNav
    }
}
</script>

<style lang="scss">
    .admin {
        &__container {
            display: flex;
        }
        &__side {
            width: 20%;
            height: 100%;
            border-right: solid 1px black;
        }
        &__display {
            width: 100%;
            padding: 0.8rem;
            text-align: left;
        }
    }
</style>
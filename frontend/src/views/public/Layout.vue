<template>
    <div class="public">
        {{ getJane + " " + getUser(1) }}
        <button @click="change">Changer Jane</button>
        <button @click="action">Modification Jane</button>
        <PublicNav/>
        <router-view/>
    </div>
</template>

<script>
import PublicNav from "@/components/PublicNav"
import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
    name: "PublicLayout",
    components: {
        PublicNav
    },
    computed: {
        ...mapGetters(["getJane", "getUser"])
    },
    methods: {
        ...mapMutations(["changeJane"]),
        ...mapActions(["modify"]),
        change() {
            // this.$store.commit("changeJane", "Jeanne")
            this.changeJane("Jaeeeene")
        },
        action() {
            // this.$store.dispatch("modify")
            this.modify("Jayne")
        }
    }
}
</script>

<style>

</style>
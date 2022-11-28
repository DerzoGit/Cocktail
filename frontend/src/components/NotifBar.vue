<template>
    <div class="notifBar" v-if="getNotif">
        <span class="notifBar__close" @click="close">X</span>
        <p class="notifBar__text">{{ getNotifMessage }}</p>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
    name: "NotifBar",
    computed: {
        ...mapGetters(["getNotif", "getNotifMessage"])
    },
    methods: {
        ...mapMutations(["displayNotif"]),
        close() {
            this.displayNotif(false)
        }
    }
}
</script>

<style lang="scss">
    .notifBar {
        width: 14rem;
        height: 4rem;
        background-color: red;
        position: absolute;
        top: 2.5rem;
        right: 1rem;
        color: white;
        &__close {
            position: absolute;
            top: 0.25rem;
            right: 0.25rem;
            font-size: 0.5rem;
            height: 0.6rem;
            width: 0.6rem;
            border: solid 2px white;
            border-radius: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            cursor: pointer;
        }
        &__text {
            text-align: left;
            padding-left: 0.6rem;
        }
    }
</style>
<template>
    <div class="public">
        Public Layout
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "PublicLayout"
}
</script>

<style>
    .public {
        border: solid 1px red
    }
</style>
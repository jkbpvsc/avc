<template>
    <div class="background">
        <div class="menu">
            <router-link class="menu-item" to="/1">One</router-link>
            <router-link class="menu-item" to="/test">p5</router-link>
            <router-link class="menu-item" to="/pleasures">Pleasures</router-link>
        </div>
        <div class="title">Audio to video converter</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend();
</script>

<style scoped>
    .title {
        text-align: right;
        color: white;
        font-size: 5em;
        user-select: none;
        display: inline-block;
        float: right;
        max-width: 10em;
    }

    .menu {
        border: 1px silver solid;
        margin: 1em;
        display: inline-block;
        width: 160px;
    }

    .menu-item {
        margin: 1em;
        color: whitesmoke;
        text-decoration: none;
    }
</style>

<style>
    body {
        background: #110d0b;
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    }
</style>

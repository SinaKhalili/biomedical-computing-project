<!-- src/components/TitleScreen.vue -->

<template>
    <div>
        <h1>    🦠 COVID Calculator 😷</h1>
        <h2>Info about the app goes here</h2>
        <p>
            <i>
                DISCLAIMER: we are not doctors please don't sue us.
            </i>
        </p>
        <el-button type="primary" id="start-button" v-on:click="$emit('next')">Start</el-button>
    </div>
</template>

<script>
export default {
    name: 'home',
}
</script>

<style scoped>
#start-button {
    font-size: 28px;
}
</style>
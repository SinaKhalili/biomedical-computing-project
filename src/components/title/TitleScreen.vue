<!-- src/components/TitleScreen.vue -->

<template>
    <div class="title">
        <h1>🦠 BioBuddy - the COVID Calculator 😷</h1>
        <br>
        <h2>Calculate your own personal health risks caused by COVID-19.</h2>
        <div class="disclaimer">
        <i>
            <u>DISCLAIMER:</u> This website is a should be used only for a general assessment of risk.
            In no way does this website diagnose anyone who uses it with COVID-19. For a more information
            on how to handle your own personal risk facing COVID-19 please contact your respective center for
            disease control. 
        </i>
        </div>
        <br><br>
        <div><el-button type="primary" id="start-button" v-on:click="$emit('next')">Start</el-button></div>
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

.disclaimer {
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
    text-align: center;
}
</style>
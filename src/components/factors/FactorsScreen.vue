<!-- src/components/RisksScreen.vue -->

<template>
    <div>
        <h1>External Factors Screen</h1>
        <el-button type="secondary" id="back-button" v-on:click="$emit('back')">Back</el-button>
        <el-button type="primary" id="next-button" v-on:click="$emit('next')">Next</el-button>
    </div>
</template>

<script>
export default {
    name: 'factors'
}
</script>

<style scoped>

</style>
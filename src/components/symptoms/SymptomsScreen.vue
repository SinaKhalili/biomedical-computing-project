<!-- src/components/SymptomsScreen.vue -->

<template>
    <div>
        <h1>Symptoms Screen</h1>
        <el-form>
            <el-form-item>
                    <el-checkbox border>Cough</el-checkbox>
                    <el-checkbox border>Fever</el-checkbox>
                    <el-checkbox border>Sore Throat</el-checkbox>
                    <el-checkbox border>Death</el-checkbox>
            </el-form-item>
        </el-form>

        <el-button type="secondary" id="back-button" v-on:click="$emit('back')">Back</el-button>
        <el-button type="primary" id="next-button" v-on:click="$emit('next')">Next</el-button>
    </div>
</template>

<script>
export default {
    name: 'symptoms'
}
</script>

<style scoped>
#symptoms-screen{
    height: 85%;
}
</style>
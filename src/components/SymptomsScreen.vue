<!-- src/components/SymptomsScreen.vue -->

<template>
    <div id="symptoms-screen">
        <h1>Symptoms Screen</h1>
        <el-form>
            <el-form-item>
                <el-checkbox border>Fever</el-checkbox>
                <el-checkbox border>Dry Cough</el-checkbox>
                <el-checkbox border>Fatigue</el-checkbox>
                <el-checkbox border>Shortness of Breath</el-checkbox>
                <el-checkbox border>Dry Cough</el-checkbox>
                <el-checkbox border>Aches and Pains</el-checkbox>
                <el-checkbox border>Sore Throat</el-checkbox>
                <el-checkbox border>Headache</el-checkbox>
                <el-checkbox border>Chills</el-checkbox>
                <el-checkbox border>Nausea</el-checkbox>
                <el-checkbox border>Nasal Congestion</el-checkbox>
                <el-checkbox border>Diarrhea</el-checkbox>
            </el-form-item>
        </el-form>

        <el-button type="secondary" id="back-button">Back</el-button><el-button type="primary" id="next-button">Next</el-button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#symptoms-screen{
    height: 85%;
}
</style>
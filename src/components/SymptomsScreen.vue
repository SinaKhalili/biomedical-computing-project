<!-- src/components/SymptomsScreen.vue -->

<template>
    <div>
        <h1>Symptoms Screen</h1>
        <el-checkbox border>Cough</el-checkbox>

        <el-form>
            <el-form-item label="Activity type">
                <el-checkbox-group>
                    <el-checkbox border>Cough</el-checkbox>
                    <el-checkbox border>Fever</el-checkbox>
                    <el-checkbox border>Sore Throat</el-checkbox>
                    <el-checkbox border>Death</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-button type="secondary" id="back-button">Back</el-button><el-button type="primary" id="next-button">Next</el-button>
<!--
        <el-form>
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="Cough" border></el-checkbox>
                <el-checkbox label="High Fever" border></el-checkbox>
                <el-checkbox label="Moderate Fever" border></el-checkbox>
                <el-checkbox label="Sore Throat" border></el-checkbox>
            </el-checkbox-group>
        </el-form>
        -->
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>
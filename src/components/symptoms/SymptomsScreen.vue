<!-- src/components/SymptomsScreen.vue -->

<template>
    <div id="symptoms-screen">
        <h1>Select your Symptoms</h1>
        <el-form>
            <el-form-item>
                <div id="table-container">
                    <table>
                        <tr>
                            <th><el-checkbox class="check" border>Fever</el-checkbox></th>
                            <th><el-checkbox class="check" border>Dry Cough</el-checkbox></th>
                        </tr>
                        <tr>
                            <th><el-checkbox class="check" border>Fatigue</el-checkbox></th>
                            <th><el-checkbox class="check" border>Shortness of Breath</el-checkbox></th>
                        </tr>
                        <tr>
                            <th><el-checkbox class="check" border>Dry Cough</el-checkbox></th>
                            <th><el-checkbox class="check" border>Aches and Pains</el-checkbox></th>
                        </tr>
                        <tr>
                            <th><el-checkbox class="check" border>Sore Throat</el-checkbox></th>
                            <th><el-checkbox class="check" border>Headache</el-checkbox></th>
                        </tr>
                        <tr>
                            <th><el-checkbox class="check" border>Chills</el-checkbox></th>
                            <th><el-checkbox class="check" border>Nausea</el-checkbox></th>
                        </tr>
                        <tr>
                            <th><el-checkbox class="check" border>Nasal Congestion</el-checkbox></th>
                            <th><el-checkbox class="check" border>Diarrhea</el-checkbox></th>
                        </tr>
                    </table>
                </div>
            </el-form-item>
        </el-form>
        <el-button type="secondary" id="back-button" v-on:click="$emit('back')">Back</el-button>
        <el-button type="primary" id="next-button" v-on:click="$emit('next')">Next</el-button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#table-container {
    width: 100%;
    display: block;
    text-align: center;
}
table {
    display: inline-block;
}
th {
    text-align: left;
    width: 250px;
}
.check {
    width: 200px;
    margin: 5px;
}

</style>
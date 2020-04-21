<!-- src/components/SymptomsScreen.vue -->

<template>
    <div id="symptoms-screen">
        <h1>Select your Symptoms</h1>
        <el-form>
            <el-form-item>
                <div id="table-container">
                    <table>
                        <el-checkbox-group v-model='symptomsGroup'>
                            <tr>
                                <th><el-checkbox class="check" border label="Fever"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Dry Cough"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Fatigue"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Shortness of Breath"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Wet Cough"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Aches and Pains"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Sore Throat"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Headache"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Chills"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Nausea"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Nasal Congestion"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Diarrhea"></el-checkbox></th>
                            </tr>
                        </el-checkbox-group>
                    </table>
                </div>
            </el-form-item>
        </el-form>
        <el-button type="secondary" id="back-button" v-on:click="$emit('back')">Back</el-button>
        <el-button type="primary" id="next-button" v-on:click="nextPage">Next</el-button>
    </div>
</template>

<script>
export default {
    name: 'symptoms',
    data() {
        return {
            symptomsGroup: []
        }
    },
    methods: {
        nextPage() {
            const statistics = {
                symptoms: this.symptomsGroup
            } 
            this.$emit('next', statistics);
        }
    }
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
<!-- src/components/ResultsScreen.vue -->

<template>
    <div>
        <h1>Results Screen</h1>
        <el-button
        type="warning"
        @click="analyze"
        round>Assess my risk</el-button>
        <div v-show="predict">
            <h3>We predict... 🔍</h3>
            <div v-loading="loading">
                {{res.risk}}
            </div>
        </div>
        <div>
            <el-button type="primary" id="restart-button" v-on:click="$emit('reset')">Restart</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'results',
    data() {
        return {
            res: '🤔',
            fakedata: { 'hey': 'there'},
            predict: false,
            loading: false,
        }
    },
    methods: {
        analyze() {
            this.predict = true
            this.loading = true
            axios
                .post('https://biomedical-computing.herokuapp.com/analyze', this.fakedata)
                .then(response => {
                    this.res = response.data
                    this.loading = false
                })
                .catch(error => {
                    console.log(error)
                    this.res = 'Error retrieving data'
                    this.loading = false
                })
        },
    },
}
</script>

<style scoped>
#restart-button {
    margin-top: 5%;
}
</style>
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
                <div v-show="computed">
                <i>Your chances of getting COVID-19 is</i>
                <h1>{{value}}%</h1>
                <transition name="slide-fade">
                    <i v-show="value === risk">You're gonna die.</i>
                </transition>
                </div>
            </div>
        </div>
        <div>
            <el-button type="primary" id="restart-button" v-on:click="$emit('reset')">Restart</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getFinalCovidPercentChance} from './SymptomsAnalysis.js';

export default {
    name: 'results',
    props: [
        'statistics'
    ],
    data() {
        return {
            res: '🤔',
            predict: false,
            loading: false,
            computed: false,
            risk: null,
            value: 0.0,
            fakeprovince: 'BC',
        }
    },
    methods: {
        analyze() {
            this.predict = true
            this.loading = true
            this.computed = false
            let url = 'https://biomedical-computing.herokuapp.com/analyze/location/' + this.statistics.province
            axios
                .get(url)
                .then(response => {
                    this.res = response.data
                    this.computed = true
                    this.loading = false
                    this.risk = getFinalCovidPercentChance(this.statistics.province, response.data.num_infected, this.statistics.symptoms)
                    this.value = 0;
                    this.increment()
                })
                .catch(error => {
                    console.log(error)
                    this.res = 'Error retrieving data'
                    this.loading = false
                })
        },
        increment() {
                if (this.value < this.risk) {
                    setTimeout(
                        () => {
                            this.value += 0.1
                            this.increment()
                        }, 
                        Math.exp((this.value/this.risk)/2))
                }
            }
        }
    }
</script>

<style scoped>
#restart-button {
    margin-top: 15px;
}
.slide-fade-enter-active {
    transition: all 10s ease;
}
.slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
}
</style>
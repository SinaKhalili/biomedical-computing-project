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
                <i>Your chances of having COVID-19 is...</i>
                <h1>{{(value).toFixed(1)}}%</h1>
                <i>Your risk of developing a severe case if you already have it is...</i>
                <h1>{{(severityValue).toFixed(1)}}%</h1>
                <transition name="slide-fade">
                    <h2><i v-show="value >= risk">{{giveAdvice()}}</i></h2>
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
            severity: null,
            risk: null,
            value: 0.0,
            severityValue: 0.0,
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
                    this.risk = getFinalCovidPercentChance(this.statistics.province, response.data.num_infected, this.statistics.symptoms);
                    this.severity = this.statistics.ageSeverityPercent + this.statistics.conditionPercent
                    console.log(this.risk)
                    this.value = 0;
                    this.incrementRisk()
                    this.incrementSeverity()
                })
                .catch(error => {
                    console.log(error)
                    this.res = 'Error retrieving data'
                    this.loading = false
                })
        },
        incrementRisk() {
            if (this.value <= this.risk) {
                setTimeout(
                    () => {
                        this.value = this.value + 0.1
                        this.incrementRisk()
                    }, 
                    Math.exp((this.value/this.risk)/10))
             }
        },
        incrementSeverity() {
            if (this.severityValue <= this.severity) {
                setTimeout(
                    () => {
                        this.severityValue = this.severityValue + 0.1
                        this.incrementSeverity()
                    }, 
                    Math.exp((this.severityValue/this.severity)/10))
            }
        },
        giveAdvice() {
            if(this.risk <= 0.1){
                return 'You don\'t have to self-isolate, remember to maintiain social distance!';
            }else if(this.risk > 20){
                return 'You should self-isolate and call 811 or speak to a healthcare professional.';
            }else if(this.risk > 0.1){
                return 'You should self-isolate for 14 days until you no longer show symptoms.';
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
</style>U
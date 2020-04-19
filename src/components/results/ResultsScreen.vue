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
                <i v-show="predict">Your chances of getting COVID-19 is</i>
                <h1>{{value}}%</h1>
                <transition name="slide-fade">
                    <i v-show="value === res.risk">You're gonna die.</i>
                </transition>
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
            value: 0,
        }
    },
    methods: {
        analyze() {
            this.predict = true
            this.loading = true
            axios
                .post('https://biomedical-computing.herokuapp.com/analyze', this.fakedata)
                .then(response => {
                    console.log(response.data)
                    this.res = response.data
                    this.loading = false
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
                if (this.value < this.res.risk) {
                    setTimeout(
                        () => {
                            this.value++;
                            this.increment();
                        }, 
                        Math.exp((this.value/this.res.risk)*5));
                }
            }
        }
    }
</script>

<style scoped>
#restart-button {
    margin-top: 5%;
}
.slide-fade-enter-active {
    transition: all 10s ease;
}
.slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
}
</style>
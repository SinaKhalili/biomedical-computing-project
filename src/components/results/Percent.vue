<template>
    <div>
        <transition name="slide-fade">
            <i v-if="value === this.finalPercent">Your chances of getting COVID-19 is</i>
            <i v-else>Your chances of getting COVID-19 is</i>
        </transition>
        <h1>{{value}}%</h1>
        <transition name="slide-fade">
            <i v-if="value === this.finalPercent">You are gonna die.</i>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Percent',
        props: [
            'percent'
        ],
        data() {
            console.log(this.percent);
            return {
                finalPercent: 100,
                value: 0
            }
        },
        methods: {
            increment() {
                //console.log(this.value)
                if (this.value < this.finalPercent) {
                    setTimeout(
                        () => {
                            this.value++;
                            this.increment();
                        }, 
                        Math.exp(this.value/18));
                }
            }
        },
        created() {
            console.log(this.finalPercent);
            this.value = 0
            setTimeout(() => this.increment(), 1000)
        }
    }
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: all 10s ease;
    }
    .slide-fade-enter {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
<template>
  <div id="app">
    <TitleScreen v-show="false" />
    <SymptomsScreen v-show="true" />
    <RisksScreen v-show="false" />
    <ResultsScreen v-show="false" />
    <Footer />
  </div>
</template>

<script>
import TitleScreen from './components/TitleScreen.vue'
import SymptomsScreen from './components/SymptomsScreen.vue'
import RisksScreen from './components/RisksScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    TitleScreen,
    SymptomsScreen,
    RisksScreen,
    ResultsScreen,
    Footer
  },
  data(){
    return {
      symptoms: [ ]
    }
  },
  methods: {
    startButtonClick(){
      this.SymptomsScreen
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

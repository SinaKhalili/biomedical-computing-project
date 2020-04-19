<template>
  <div id="app">
    <TitleScreen />
    <SymptomsScreen />
    <RisksScreen v-show="hide"/>
    <ResultsScreen v-show="hide"/>
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
  margin-top: 60px;
}
</style>

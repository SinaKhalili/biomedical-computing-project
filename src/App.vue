<template>
  <div id="app">
    <TitleScreen />
    <SymptomsScreen />
    <RisksScreen />
    <ResultsScreen />
  </div>
</template>

<script>
import TitleScreen from './components/TitleScreen.vue'
import SymptomsScreen from './components/SymptomsScreen.vue'
import RisksScreen from './components/RisksScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'

export default {
  name: 'app',
  components: {
    TitleScreen,
    SymptomsScreen,
    RisksScreen,
    ResultsScreen
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

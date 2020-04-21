<template>
  <div id="app">
    <SymptomsScreen
      v-on:next="nextScreen"
      v-on:back="backScreen"
      v-if="currentScreen===screens.SymptomsScreen"/>
    <FactorsScreen
      v-on:next="nextScreen"
      v-on:back="backScreen"
      v-else-if="currentScreen===screens.FactorsScreen"/>
    <ResultsScreen
      v-on:reset="resetScreen"
      v-bind:statistics="statistics"
      v-else-if="currentScreen===screens.ResultsScreen"/>
    <TitleScreen
      v-on:next="nextScreen"
      v-else/>
    <Footer />
  </div>
</template>

<script>
import TitleScreen from './components/title/TitleScreen.vue'
import SymptomsScreen from './components/symptoms/SymptomsScreen.vue'
import FactorsScreen from './components/factors/FactorsScreen.vue'
import ResultsScreen from './components/results/ResultsScreen.vue'
import Footer from './components/layout/Footer.vue'

export default {
  name: 'app',
  components: {
    TitleScreen,
    SymptomsScreen,
    FactorsScreen,
    ResultsScreen,
    Footer,
  },
  data() {
    return {
      currentScreen: TitleScreen.name,
      screens: {
        TitleScreen: TitleScreen.name,
        SymptomsScreen: SymptomsScreen.name,
        FactorsScreen: FactorsScreen.name,
        ResultsScreen: ResultsScreen.name,
      },
      statistics: {},
    }
  },
  methods: {
    nextScreen(statistics) {
      if (statistics != undefined) {
        this.statistics = {...this.statistics, ...statistics};
      }
      var screenList = Object.values(this.screens)
      var currentIndex = screenList.findIndex((screen) => screen === this.currentScreen)
      this.currentScreen = screenList[currentIndex+1]
    },
    backScreen() {
      var screenList = Object.values(this.screens)
      var currentIndex = screenList.findIndex((screen) => screen === this.currentScreen)
      this.currentScreen = screenList[currentIndex-1]
    },
    resetScreen() {
      this.statistics = {}
      this.currentScreen = TitleScreen.name
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
.el-footer {
  margin-top: 5%;
}
</style>

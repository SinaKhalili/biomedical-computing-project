<template>
  <div id="app">
    <TitleScreen />
  </div>
</template>

<script>
import TitleScreen from './components/TitleScreen.vue'

export default {
  name: 'app',
  components: {
    TitleScreen
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

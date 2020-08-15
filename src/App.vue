<template>
  <div id="app" class="container">
    <div class="sidebar-page">
      <section class="sidebar-layout">
        <Menu />
        <div class="p-1">
          <router-view />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Menu from "./components/UI/Menu.vue";

@Component({
  components: {
    Menu,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

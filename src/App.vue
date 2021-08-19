<template>
  <div id="app">
    <div class="page py-3">
      <b-container>
        <router-view />
      </b-container>
    </div>
    <AudioPlayer class="sticky-footer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AudioPlayer from "@/components/AudioPlayer.vue";

@Component({
  components: {
    AudioPlayer,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .page {
    height: 0;
    flex: auto;
    overflow: auto;
  }
  .sticky-footer {
    flex: none;
  }
}
</style>

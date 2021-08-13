<template>
  <div class="home">
    <template v-if="podcast">
      <Card
        :borded="true"
        :imgSrc="podcast.image ? podcast.image.url : ''"
        :width="250"
      >
        <template v-slot:body>
          <b-card-title titleTag="h2">{{ podcast.title }}</b-card-title>
          <b-card-text>{{ podcast.description }}</b-card-text>
        </template>
      </Card>
      <b-card-group columns>
        <Card
          v-for="episode in podcast.items"
          :key="episode.guid"
          :clickable="true"
          :width="100"
          :imgSrc="episode.itunes ? episode.itunes.image : ''"
          @onClick="
            $router.push({ name: 'Episode', params: { id: episode.guid } })
          "
        >
          <template v-slot:body>
            <b-card-title>{{ episode.title }}</b-card-title>
            <b-card-sub-title>{{ episode.pubDate }}</b-card-sub-title>
          </template>
        </Card>
      </b-card-group>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Card from "@/components/Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  public async created() {
    this.$store.dispatch("getPodcast");
  }

  public get podcast() {
    return this.$store.state.podcast;
  }
}
</script>

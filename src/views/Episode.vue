<template>
  <div class="episode" v-if="episode">
    <Card :imgSrc="episode.itunes ? episode.itunes.image : ''" :width="250">
      <template v-slot:body>
        <b-row class="h-100" align-v="end">
          <b-col>
            <b-card-title titleTag="h2">{{ episode.title }}</b-card-title>
          </b-col>
          <b-col cols="2">
            <b-button variant="outline-primary">play</b-button>
          </b-col>
        </b-row>
      </template>
    </Card>
    <div class="description text-start">
      <h3 class="mb-3">Episode description</h3>
      <p class="lh-lg">
        {{ episode.content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Podcast, Episode } from "../types";

import Card from "@/components/Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class EpisodeInfo extends Vue {
  public id = "";
  private async beforeCreate() {
    const id = this.$route.params.id;
    if (!this.$store.state.podcast) {
      await this.$store.dispatch("getPodcast");
    }
    const episode: Episode[] = this.$store.state.podcast.items;
    if (!episode.find((o) => o.guid === id)) {
      this.$router.push("/");
    }
  }

  private created() {
    this.id = this.$route.params.id;
  }

  private get podcast(): Podcast | null {
    return this.$store.state.podcast;
  }

  private get episode() {
    return this.podcast?.items.find((o) => o.guid === this.id);
  }
}
</script>
<style lang="scss" scoped>
.description {
  p {
    white-space: pre-wrap;
  }
}
</style>

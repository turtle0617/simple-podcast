<template>
  <div class="home">
    <template v-if="podcast">
      <b-card
        no-body
        img-left
        :imgSrc="podcast.image ? podcast.image.url : ''"
        :img-width="250"
        img-alt="Card image"
      >
        <b-card-body class="card-body">
          <b-card-title titleTag="h2">{{ podcast.title }}</b-card-title>
        </b-card-body>
      </b-card>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Parser from "rss-parser";

import { Podcast } from "../types";

@Component
export default class Home extends Vue {
  public url =
    "https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml";
  public podcast: Podcast | null = null;

  public async created() {
    this.fetch();
  }

  public async fetch() {
    let parser = new Parser<Podcast>();
    let podcast = await parser.parseURL(this.url);
    this.podcast = podcast;
  }
}
</script>

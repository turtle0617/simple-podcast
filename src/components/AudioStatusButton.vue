<template>
  <b-button
    v-if="!isEpisodePlaying"
    variant="outline-primary"
    @click="playEpisode"
    >play</b-button
  >
  <b-button v-else variant="outline-secondary" @click="pauseEpisode"
    >pause</b-button
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Episode, AudioStatus } from "../types";

@Component
export default class AudioStatusButton extends Vue {
  @Prop({ required: true })
  public episode!: Episode;

  private get playingEpisode(): Episode | null {
    return this.$store.state.currentEpisode;
  }

  private get playingEpisodeStatus(): AudioStatus {
    return this.$store.state.currentEpisodeStatus;
  }

  private get isPlayingEpisode() {
    return this.episode?.guid === this.playingEpisode?.guid;
  }

  private get isEpisodePlaying() {
    return (
      this.isPlayingEpisode && this.playingEpisodeStatus === AudioStatus.PLAY
    );
  }

  private playEpisode() {
    if (this.isPlayingEpisode)
      this.$store.commit("updateCurrentEpisodeStatus", AudioStatus.PLAY);
    else this.$store.commit("updateCurrentEpisode", this.episode);
  }

  private pauseEpisode() {
    this.$store.commit("updateCurrentEpisodeStatus", AudioStatus.PAUSE);
  }
}
</script>

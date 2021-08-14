<template>
  <div
    class="audio-player sticky-bottom bg-light bg-gradient"
    v-if="audioInfo.url"
  >
    <audio
      ref="audioElm"
      autoplay
      :src="audioInfo.url"
      :type="audioInfo.type"
      @play="play"
      @loadedmetadata="setAudioMetaData"
      @ended="onEnded"
    />
    <b-form-input
      class="w-100"
      type="range"
      min="0"
      :max="duration"
      :value="currentTime"
      @input="dragingCurrentTIme"
      @change="changeCurrentTime"
    />
    <!--NOTE: no-gutter style not found  -->
    <b-row class="panel p-4 g-0" align-v="center">
      <b-col cols="1">
        <b-button class="p-0" variant="outline">
          <b-icon
            v-if="episodeStatus === AudioStatus.PAUSE"
            icon="play-circle"
            font-scale="2"
            @click="() => updateEpisodeStatus(AudioStatus.PLAY)"
          />
          <b-icon
            v-else
            icon="pause-circle"
            font-scale="2"
            @click="() => updateEpisodeStatus(AudioStatus.PAUSE)"
          />
        </b-button>
      </b-col>
      <b-col class="text-start">
        {{ episode.title || "" }}
      </b-col>
      <b-col>time: {{ formatCurrentTime }} / {{ formatDuration }}</b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Episode, AudioStatus } from "../types";

const formatTime = (val: number) => {
  const time = Math.floor(val);
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const formatMins = mins < 10 ? `0${mins}` : mins;
  const formatSecs = secs < 10 ? `0${secs}` : secs;
  return `${formatMins}:${formatSecs}`;
};

const PROGRESS_INTERVAL = 1000;
@Component
export default class AudioPlayer extends Vue {
  public $refs!: {
    audioElm: HTMLAudioElement;
  };
  private AudioStatus = AudioStatus;
  private timer: number | null = null;
  private currentTime = 0;
  private progress = 0;
  private duration = 0;
  private isDraggingCurrentTime = false;

  private get episode(): Episode | null {
    return this.$store.state.currentEpisode;
  }

  private get episodeStatus(): AudioStatus {
    return this.$store.state.currentEpisodeStatus;
  }

  private get episodeList(): Episode[] {
    return this.$store.state.podcast.items;
  }

  private get audioInfo() {
    return this.episode?.enclosure || {};
  }

  private get formatDuration() {
    return formatTime(this.duration);
  }

  private get formatCurrentTime() {
    return formatTime(this.currentTime);
  }

  private setAudioMetaData() {
    this.currentTime = 0;

    this.duration = this.$refs.audioElm.duration;
  }

  @Watch("episodeStatus")
  private watchEpisodeStatus(status: AudioStatus) {
    if (status === AudioStatus.PLAY) this.play();
    else this.pause();
  }

  private async play() {
    try {
      await this.$refs.audioElm.play();

      this.$nextTick(() => {
        this.clearTimer();
        this.timer = window.setInterval(this.playing, PROGRESS_INTERVAL);
        this.updateEpisodeStatus(AudioStatus.PLAY);
      });
    } catch (error) {
      console.error(error);
    }
  }

  private playing() {
    if (this.isDraggingCurrentTime) return;
    const { currentTime, duration } = this.$refs.audioElm;
    this.currentTime = currentTime;
    this.progress = currentTime / duration;
  }

  private pause() {
    this.updateEpisodeStatus(AudioStatus.PAUSE);
    this.$refs.audioElm.pause();
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
  }

  private dragingCurrentTIme() {
    this.isDraggingCurrentTime = true;
  }
  private changeCurrentTime(val: number) {
    this.isDraggingCurrentTime = false;
    this.currentTime = val;
    this.$refs.audioElm.currentTime = val;
  }

  private onEnded() {
    this.clearTimer();
    this.nextPlay();
  }

  private nextPlay() {
    const currentIndex = this.episodeList.findIndex(
      (o) => o.guid === this.episode?.guid
    );
    const isLast = currentIndex === 0;
    if (isLast) {
      this.updateEpisodeStatus(AudioStatus.PAUSE);
      return;
    }

    const nextEpisode = this.episodeList[currentIndex - 1];
    this.$store.commit("updateCurrentEpisode", nextEpisode);

    this.$nextTick(() => {
      this.play();
    });
  }

  private updateEpisodeStatus(status: AudioStatus) {
    this.$store.commit("updateCurrentEpisodeStatus", status);
  }
}
</script>

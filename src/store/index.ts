import Vue from "vue";
import Vuex from "vuex";
import Parser from "rss-parser";

import { Podcast, Episode } from "../types";

Vue.use(Vuex);

const PODCAST_URL =
  "https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml";

export default new Vuex.Store<{
  podcast: Podcast | null;
  currentEpisode: Episode | null;
}>({
  state: {
    podcast: null,
    currentEpisode: null,
  },
  mutations: {
    updatePodcast(state, payload: Podcast) {
      state.podcast = payload;
    },
    updateCurrentEpisode(state, payload: Episode | null) {
      state.currentEpisode = payload;
    },
  },
  actions: {
    async getPodcast({ commit }) {
      try {
        const parser = new Parser<Podcast>();
        const podcast = await parser.parseURL(PODCAST_URL);
        commit("updatePodcast", podcast);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

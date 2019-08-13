<template>
  <div class="container">
    <header class="album-header" v-if="track">
      <div class="row">
        <div class="col-md-4">
          <div v-if="track.album.images.length">
            <img :src="track.album.images[0].url" class="album-thumb" alt />
          </div>
        </div>
        <div class="col-md-8">
          <h4>
            <span class="spacer" v-for="(artist, i) of track.artists" :key="i">
              <router-link :to="'/artist/' + artist.id">{{artist.name}}</router-link>
            </span>
          </h4>

          <h2>{{track.name}}</h2>
          <h5>
            Album Name:
            <router-link :to="'/album/' + track.album.id">{{track.album.name}}</router-link>
          </h5>
          <a
            :href="track.external_urls.spotify"
            target="_blank"
            class="btn btn-primary"
          >View In Spotify</a>
          <figure>
            <figcaption>Listen to the 等你下課:</figcaption>
            <audio controls :src="track.preview_url">
              Your browser does not support the
              <code>audio</code>
              element.
            </audio>
          </figure>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { value, computed,  onCreated } from "vue-function-api";
import { accessToken } from "@/utils/helper";


export default {
  setup(props, context) {
    // using hooks is better then polluting context $route, awaiting new API comes from vuerouter
    const id = computed(() => context.root.$route.params.id);
    let track = value(false);

    onCreated(() => {
      let trackurl = `https://api.spotify.com/v1/tracks/${id.value}`;
      fetch(trackurl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          track.value = data;
        });
    });

    return {
        track
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="container">
    <div id="track">
      <header class="album-header" v-if="artist">
        <div class="row">
          <div class="col-md-4">
            <div>
              <img :src="artist.images[0].url" class="album-thumb" alt />
            </div>
          </div>
          <div class="col-md-8">
            <h2>{{artist.name}}</h2>
            <h4>Follower: {{artist.followers.total}}</h4>
            <h5>Popularity: {{artist.popularity}}</h5>
            <a
              :href="artist.external_urls.spotify"
              target="_blank"
              class="btn btn-primary"
            >View Artist In Spotify</a>
          </div>
        </div>
      </header>

      <div class="album-tracks" v-if="topTrack">
        <h2>Album Tracks</h2>
        <div>
          <div class="well" v-for="(track, i) of topTrack" :key="i">
            <div class="row">
              <div class="col-md-2">
                <img :src="track.album.images[0].url" class="album-thumb" alt />
                <span>{{track.album.name}}</span>
                <br />
                <router-link :to="'/album/' + track.album.id">View Album</router-link>
              </div>

              <div class="col-md-10">
                <h4>{{track.name}}</h4>
                <a :href="track.preview_url" target="_blank" class="btn btn-primary">Preview Track</a>
                <div>{{msMinute(track.duration_ms)}} - Popularity: {{track.popularity}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { value, computed, onCreated } from "vue-function-api";
import { accessToken, msMinute } from "@/utils/helper";
export default {
  setup(props, context) {
    const id = computed(() => context.root.$route.params.id);
    const topTrack = value("");
    const artist = value("");

    onCreated(() => {
      let topTrackUrl = `https://api.spotify.com/v1/artists/${id.value}/top-tracks?country=TW`;
      let artistURl = `https://api.spotify.com/v1/artists/${id.value}`;

      fetch(artistURl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          artist.value = data;
        });

      fetch(topTrackUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          topTrack.value = data.tracks;
        });
    });
    return {
      msMinute,
      topTrack,
      artist
    };
  }
};
</script>

<style>
</style>
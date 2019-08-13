<template>
  <div class="container"  v-if="album">
    <div id="album">
      <header class="album-header">
        <div class="row">
          <div class="col-md-4">
            <div >
              <img class="album-thumb" :src="album.images[0].url" alt />
            </div>
          </div>

          <div class="col-md-8">
            <h4>
              <!-- content here -->
              <span class="spacer" v-for="(artist, i) of album.artists" :key="i">
                <router-link
                  :to="'/artist/' + artist.id"
                  class="btn btn-default btn-block"
                >{{artist.name}}</router-link>
              </span>
            </h4>
            <h2>{{album.name}}</h2>
            <h5>Release Date: {{album.release_date}}</h5>
            <a
              :href="album.external_urls.spotify"
              target="_blank"
              class="btn btn-primary"
            >View in Spotify</a>
          </div>
        </div>
      </header>

      <div class="album-tracks">
        <h2>Album Tracks</h2>
        <div v-if="album.tracks.items.length">
          <div
            class="card text-white bg-secondary mb-3"
            v-for="(track, i) of album.tracks.items"
            :key="i"
          >
            <h5 class="card-header">
              {{track.track_number}} -
              <router-link :to="'/track/' + track.id">{{track.name}}</router-link>

              <span class="spacer" v-for="(artist, i) of track.artists" :key="i">
                <router-link :to="'/artist/' + artist.id">{{artist.name}}</router-link>
              </span>
            </h5>
            <div class="card-body">
              <figure class="flex">
                <figcaption>Listen to the {{track.name}}:</figcaption>
                <audio controls :src="track.preview_url">
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { value, computed, onCreated } from "vue-function-api";
import { accessToken } from "@/utils/helper";
export default {
  setup(props, context) {
    const id = computed(() => context.root.$route.params.id);
    const album = value("");
    onCreated(() => {
      let albumUrl = `https://api.spotify.com/v1/albums/${id.value}`;
      fetch(albumUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
    
          album.value = data;
        });
    });

    return {
        album
    }
  }
};
</script>

<style>
</style>
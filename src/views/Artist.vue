<template>
  <div class="container">
    <header class="artist-header clearfix" v-if="artist">
      <h1>
        <span v-if="artist.images.length">
          <img :src="artist.images[0].url" class="artist-thumb img-circle" alt />
        </span>
        {{artist.name}}
      </h1>
      <p>
        Genres:
        <span class="spacer" v-for="(genre, i) of artist.genres" :key="i" >{{genre}}</span>
      </p>
      <div class="col-md-3">
        <router-link :to="'/top-tracks/' + artist.id" class="btn btn-success">View all Tracks</router-link>
      </div>
    </header>

    <form id="albumFilter">
      <div class="form-group">
        <label class="control-label" for="inputDefault">Filter Album</label>
        <input type="text" v-model="term" name="albumFilter" class="form-control" id="inputDefault" />
      </div>
    </form>
    <div class="artist-albums">
      <div class="row flexy">
        <div class="col-md-3 well" v-for="(album, i) of filteredTerm" :key="i">
          <div class="album">
            <img class="album-thumb img-thumbnail" :src="album.images[0].url" alt />
            <h4>{{album.name}}</h4>
            <router-link :to="'/album/' + album.id" class="btn btn-default btn-block">Album Details</router-link>
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
    let artist = value("");
    let albums = value([]);
    const term = value("");

    const filteredTerm = computed(() => {
      if (!albums.value.length || term.value.trim() === "") return albums.value;
      return albums.value.filter(album => {
        return album.name.indexOf(term.value) > -1;
      });
    });

    onCreated(() => {
      let artistUrl = `https://api.spotify.com/v1/artists/${id.value}`;
      let albumsUrl = `https://api.spotify.com/v1/artists/${id.value}/albums`;
      fetch(artistUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          artist.value = data;
        });

      fetch(albumsUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          data.items.forEach(el => {
              albums.value.push(el);
          });
        });
    });

    return {
      artist,
      albums,
      filteredTerm,
      term
    };
  }
};
</script>

<style>
</style>

    
<template>
  <div class="container">
    <h1>Need Music?</h1>
    <div class="lead">Use Spotify to listen music!</div>

    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Search Music..."
        v-model="search"
        @keyup="searchString"
      />
    </div>

    <div class="form-group">
      <label for="type">Select Type:</label>
      <select class="form-control" v-model="queryType">
        <option v-for="(type, i) of types" :key="i">{{type}}</option>
      </select>
    </div>



    <div v-for="(res, i) of songs" :key="i">
      <div class="row">
        <div class="col-md-12">
          <div class="search-res card">
            <h4 class="card-header">
              <router-link :to="{path: queryType + '/' + res.id}">{{res.name}}</router-link>
            </h4>

            <div class="card-body">
              <div v-if="res.genres">
                <strong>Genres:</strong>
                <span class="spacer" v-for="(genre, i) of res.genres" :key="i">{{genre}}</span>
              </div>

              <div v-if="res.artists">
                <strong>Artists:</strong>
                <span class="spacer" v-for="(artist, i) of res.artists" :key="i">
                  <router-link :to="'/artist/' + artist.id">{{artist.name}}</router-link>
                </span>
              </div>

              <div v-if="res.album">
                <strong>Album:</strong>
                <span class="spacer">
                  <router-link :to="'/album/' + res.album.id">{{res.album.name}}</router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { value } from "vue-function-api";
import { debounce, accessToken } from "@/utils/helper";
export default {
  setup() {
    // Reactive State
    const types = value(["track", "album", "artist"]);
    const search = value("");
    let songs = value([]);
    let queryType = value("track");
    const errorMsg = value("");

    const searchString = debounce(() => {
      if (search === "") {
        songs = [];
        return;
      }
      let url = `https://api.spotify.com/v1/search?query=${search.value}&offset=0&limit=20&type=${queryType.value}&market=TW`;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          data.tracks.items.forEach(el => {
            songs.value.push(el);
          });
        });
    }, 1000);

    const changeType = e => {
      queryType = e.target.value;
      if (search.length) searchString();
    };

    return {
      changeType,
      searchString,
      queryType,
      types,
      search,
      errorMsg,
      songs
    };
  }
};
</script>
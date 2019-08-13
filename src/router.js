import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/track/:id',
      name: 'track',
      component: () => import(/* webpackChunkName: "track" */ './views/Track.vue')
    },
    {
      path: '/top-tracks/:id',
      name: 'top-tracks',
      component: () => import(/* webpackChunkName: "top-tracks" */ './views/TopTracks.vue')
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import(/* webpackChunkName: "artist" */ './views/Artist.vue')
    },
    {
      path: '/album/:id',
      name: 'album',
      component: () => import(/* webpackChunkName: "album" */ './views/Album.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

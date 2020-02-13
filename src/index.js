import Vue from 'vue'
import VueRouter from 'vue-router'
import './lib/css/index.css'
import './lib/css/animate.css'
import './lib/css/icon.css'
import router from './routes/router'
import axios from 'axios'
import store from './store/store'

// 自定义组件
import songLrc from './components/playBox/music/lrc_box.vue'
import warning from './components/warning.vue'
import navBar from './components/nav/navbar.vue'
import musicList from './components/playBox/music/music_list.vue'
import search from './components/header/search/search.vue'
import playMusicBox from './components/playBox/music/music_box.vue'
import top from './components/header/top.vue'
import class_box from './views/music/class/class_box.vue'
import play from './components/header/play.vue'
import song_box from './components/playBox/music/song_box.vue'
import home_nav from './components/nav/home_nav.vue'
import { Swipe, SwipeItem,Lazyload,Slider,PasswordInput,NumberKeyboard} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Lazyload).use(Slider,{name:'van-slider'}).use(PasswordInput).use(NumberKeyboard)

Vue.component('class-box',class_box)
Vue.component('top',top)
Vue.component('nav-bar',navBar)
Vue.component('home-nav',home_nav)
Vue.component('music-list',musicList)
Vue.component('song-box',song_box)
Vue.component('search',search)
Vue.component('play-musicbox',playMusicBox)
Vue.component('play',play)
Vue.component('lrc-box',songLrc)
Vue.component('warning',warning)
Vue.prototype.$axios = axios

import VTouch from 'vue-touch'
// v-touch组件
Vue.use(VTouch, {
    name: 'v-touch'
})

Vue.use(VueRouter)

import app from './App.vue'
// 根组件
new Vue({
    el: '#app',
    store,
    render: c => c(app),
    router
})
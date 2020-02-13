<template>
   <div class="rec_music">
      <top title="音乐推荐" :back="false" :isload="false"></top>
      <main v-if="show">
         <div class="banner">
            <van-swipe :autoplay="3000" :show-indicators="false">
               <van-swipe-item v-for="(item,index) in banners" :key="index">
                  <img :src="item.imageUrl">
               </van-swipe-item>
            </van-swipe>
         </div>
         <div class="rec_music_main">
            <div class="nav_class">
               <router-link to="/class_musiclist" class="mu_link icon-file-music"></router-link>
               <router-link to="/ranking" class="mu_link icon-list-numbered"></router-link>
               <router-link to="/radio" class="mu_link icon-podcast"></router-link>
               <router-link to="" class="mu_link icon-drive"></router-link>
            </div>
            <h3 class="body_title">
               热门歌单
            </h3>
            <div class="body clear">
               <router-link :to="`/musiclist_detail/${item.id}`" class="list_link" v-for="item in musicList"
                  :key="item.id">
                  <img :src="item.picUrl" class="list_img">
                  <p class="playcount"><i class="icon-headphones"></i>{{item.playCount | opCount(item.playCount)}}</p>
                  <span class="list_name text">{{item.name}}</span>
               </router-link>
            </div>
            <h3 class="body_title">
               专辑上新
            </h3>
            <div class="album clear">
               <div class="album_link" v-for="item in albums" :key="item.id">
                  <img :src="item.picUrl" class="album_img">
                  <span class="album_name text">{{item.name}}</span>
               </div>
            </div>
            <div class="body_title">
               mv推荐
            </div>
            <router-link :to="`/vudioPlayBox?id=${item.id}&type=1`" class="mv_link" v-for="item in mv_list"
               :key="item.id">
               <img :src="item.cover" alt="" class="mv_img">
               <p class="playMv"><i class="icon-play"></i>{{item.playCount | opCount(item.playCount)}}</p>
               <span class="icon-play3"></span>
               <span class="mv_info text">{{item.briefDesc}}</span>
            </router-link>
         </div>
      </main>
   </div>
</template>
<script>
   import {
      musicAPI
   } from '../../api/adr.js'
   export default {
      data() {
         return {
            show: false,
            banners: [],
            musicList: [],
            albums: [],
            mv_list: []
         }
      },
      watch: {},
      filters: {
         opCount(num) {
            let n = num / 10000
            return n > 0 ? n.toFixed(1) + '万' : num
         }
      },
      methods: {
         getData() {
            const all = [
               this.$axios.get(`${musicAPI}/banner?type=0`),
               this.$axios.get(`${musicAPI}/personalized?limit=9`),
               this.$axios.get(`${musicAPI}/album/newest`)
            ]
            this.$axios.all(all).then(this.$axios.spread((banners, musiclists, albums) => {
               this.banners = banners.data.banners
               // console.log(this.banners);

               this.musicList = musiclists.data.result
               this.albums = albums.data.albums
               this.show = true
            }))
         },
         getMv() {
            this.$axios.get(`${musicAPI}/mv/first?limit=10`).then(res => {
               // console.log(res.data)
               this.mv_list = res.data.data
            })
         }
      },
      created() {
         this.getData()
         this.getMv()
         this.$store.commit('setType', {
            key: 2,
            text: '音乐'
         })
      }
   }
</script>
<style scoped lang="scss">
   .rec_music {
      width: 100%;
      height: 100%;
      position: relative;
      padding: 45px 0 55px;
      box-sizing: border-box;

      main {
         width: 100%;
         height: 100%;
         overflow: auto;
      }

      main::-webkit-scrollbar {
         display: none;
      }
   }

   .banner {
      width: 100%;

      img {
         width: 100%;
      }
   }

   .rec_music_main {
      width: 100%;
      border-radius: 15px 15px 0 0;
      padding-bottom: 55px;
      box-sizing: border-box;
   }

   .nav_class {
      width: 100%;
      height: 55px;
      padding-top: 10px;
      display: flex;
      border-bottom: 1px solid rgb(124, 124, 124);

      .mu_link {
         flex: 1;
         text-align: center;
         font-size: 26px;
         line-height: 55px;
         color: rgb(182, 182, 182);
      }
   }

   .body_title {
      width: 100%;
      height: 35px;
      line-height: 35px;
      color: rgb(216, 216, 216);
      background-color: rgba(20, 20, 20, 0.123);
      font-size: 18px;
      font-weight: 500;
      padding-left: 15px;
      box-sizing: border-box;
      margin-bottom: 25px;
   }

   .body {
      width: 100%;

      .list_link {
         width: 33.33%;
         float: left;
         margin-bottom: 15px;
         position: relative;
         height: 150px;

         .list_img {
            display: block;
            width: 86%;
            margin: 0 auto;
            border-radius: 6px;
         }

         .playcount {
            width: 86%;
            background-color: rgba(0, 0, 0, 0.171);
            color: rgb(211, 211, 211);
            position: absolute;
            top: 0;
            line-height: 25px;
            left: 7%;
            padding-left: 25px;
            box-sizing: border-box;
            border-radius: 6px 6px 0 0;

            .icon-headphones {
               position: absolute;
               left: 5px;
               line-height: 25px;
            }
         }

         .list_name {
            display: block;
            width: 86%;
            line-height: 35px;
            font-size: 14px;
            color: rgb(212, 212, 212);
            margin: 0 auto;
         }
      }
   }

   .album {
      width: 95%;
      overflow-x: scroll;
      height: 160px;
      margin: 0 auto;
      white-space: nowrap;

      .album_link {
         width: 33%;
         display: inline-block;

         .album_img {
            display: block;
            width: 86%;
            margin: 0 auto;
            border-radius: 6px;
         }

         .album_name {
            display: block;
            width: 86%;
            line-height: 35px;
            font-size: 14px;
            color: rgb(184, 183, 183);
            margin: 0 auto;
         }
      }

   }

   .album::-webkit-scrollbar {
      display: none
   }

   .mv_link {
      display: block;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.157);
      padding: 15px 0;
      position: relative;
      margin-bottom: 15px;

      .mv_img {
         width: 90%;
         display: block;
         border-radius: 6px 6px 0 0;
         margin: 0 auto;
      }

      .icon-play3 {
         position: absolute;
         left: 50%;
         top: 30%;
         transform: translateX(-50%);
         font-size: 45px;
         color: rgb(228, 228, 228);
      }

      .mv_info {
         display: block;
         width: 90%;
         height: 35px;
         box-sizing: border-box;
         border-radius: 0 0 6px 6px;
         margin: 0 auto;
         background-color: rgba(0, 0, 0, 0.5);
         line-height: 35px;
         font-size: 16px;
         color: rgb(218, 218, 218);
         text-align: center;
      }

      .playMv {
         font-size: 16px;
         color: rgb(231, 231, 231);
         position: absolute;
         top: 15px;
         padding-left: 25px;
         box-sizing: border-box;
         line-height: 35px;
         left: 8%;

         .icon-play {
            font-size: 18px;
            font-style: normal;
            position: absolute;
            left: 0;
            line-height: 35px;
         }
      }
   }
</style>
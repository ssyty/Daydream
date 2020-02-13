<template>
   <div class="class_music">
      <top :title="title" :isload="!show" top='50px'></top>
      <transition enter-active-class="zoomInDown" leave-active-class="zoomOutLeft">
         <class-box v-show="$store.state.class_musicBox" class="animated" :title='title' @setData="changeData"></class-box>
      </transition>
      <main>
         <span class="icon-command" @click="show_classBox"></span>
         <div class="class_box">
            <a href="#" :class="{'class_link':true,'light':item==title}" @click.prevent="changeData(item)" v-for="(item,i) in class_short" :key="i">
               {{item}}
            </a>
         </div>
         <div class="class_body" :style="`height:${$store.state.height-80}px`" v-if="show">
            <div class="banner">
               <van-swipe :autoplay="3000" :show-indicators="false">
                  <van-swipe-item v-for="(item,index) in banners" :key="index">
                     <div :to="`/musiclist_detail/${item.id}`" class="item">
                        <img v-lazy="item.coverImgUrl" alt="">
                        <router-link :to="`/musiclist_detail/${item.id}`" class="icon-play2"></router-link>
                        <p class="text music_info">{{item.copywriter}}</p>
                     </div>
                  </van-swipe-item>
               </van-swipe>
            </div>
            <div class="musiclist">
               <router-link :to="`/musiclist_detail/${item.id}`" class="musiclist_link" v-for="item in list"
                  :key="item.id">
                  <img :src="item.coverImgUrl" alt="">
                  <span class="link_count"><i
                        class="icon-headphones"></i>{{item.playCount | opCount(item.playCount)}}</span>
                  <p class="link_info text">{{item.name}}</p>
               </router-link>
            </div>
         </div>
      </main>
   </div>
</template>
<script>
   import {
      musicAPI
   } from '../../../api/adr.js'
   export default {
      data() {
         return {
            show: false,
            class_short: this.$store.state.music_class,
            banners: [],
            list: [],
            title:'全部'
         }
      },
      watch: {},
      filters: {
         opCount(num) {
            let n = num / 10000
            return n > 0 ? n.toFixed(0) + '万' : num
         }
      },
      methods: {
         changeData(cat) {
            this.title= cat
            this.show = false
            this.$axios.get(`${musicAPI}/top/playlist/highquality?limit=27&cat=${cat}`).then(
               res => {
                  this.banners = res.data.playlists.slice(0, 6)
                  this.list = res.data.playlists.slice(6)
                  this.show = true
               })
         },
         show_classBox() {
            this.$store.commit('setClassMusicBox')
         }
      },
      created() {
         this.changeData('全部')
      }
   }
</script>
<style scoped lang="scss">
   .class_music {
      width: 100%;
      position: relative;
      height: 100%;

      main {
         width: 100%;
         padding-top: 45px;
         box-sizing: border-box;

         .icon-command {
            position: absolute;
            right: 1%;
            top: 50px;
            font-size: 28px;
            color: rgb(1, 114, 243);
         }

         .class_box::-webkit-scrollbar {
            display: none;
         }

         .class_box {
            width: 85%;
            height: 35px;
            overflow-x: scroll;
            white-space: nowrap;
            margin-left: 5%;
            position: relative;
            background-color: rgba(27, 27, 27, 0.315);

            .class_link {
               display: inline-block;
               line-height: 35px;
               padding: 0 7px;
               font-size: 15px;
               color: rgb(175, 175, 175);
            }
            .light {
               color: #fff;
            }
         }

         .class_body::-webkit-scrollbar {
            display: none;
         }

         .class_body {
            width: 100%;
            height: 100%;
            overflow: auto;

            .banner {
               width: 40%;
               height: 170px;
               margin: 15px auto;
               position: relative;
               overflow: hidden;

               .item {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  display: block;
                  border-radius: 3px;
                  overflow: hidden;

                  .icon-play2 {
                     font-size: 28px;
                     position: absolute;
                     right: 15px;
                     bottom: 15px;
                     color: rgb(184, 184, 184);
                  }

                  .music_info {
                     width: 100%;
                     height: 35px;
                     position: absolute;
                     padding-left: 3px;
                     box-sizing: border-box;
                     top: 0;
                     left: 0;
                     background-color: rgba(5, 5, 5, 0.383);
                     color: #fff;
                     font-size: 14px;
                     line-height: 35px;
                     text-align: center;
                  }

                  img {
                     width: 100%;
                     height: 100%;

                  }
               }


            }
         }

         .musiclist {
            width: 95%;
            margin: 0 auto;

            .musiclist_link {
               width: 33%;
               height: 150px;
               float: left;
               position: relative;

               .link_info {
                  color: rgb(209, 209, 209);
                  line-height: 30px;
               }

               img {
                  width: 86%;
                  display: block;
                  margin: 0 auto;
                  border-radius: 5px;
               }

               .link_count {
                  width: 86%;
                  height: 25px;
                  line-height: 25px;
                  padding-left: 25px;
                  position: absolute;
                  top: 0;
                  box-sizing: border-box;
                  left: 7%;
                  border-radius: 5px 5px 0 0;
                  color: rgb(230, 230, 230);
                  background-color: rgba(0, 0, 0, 0.246);

                  .icon-headphones {
                     position: absolute;
                     left: 5px;
                     line-height: 25px;
                  }
               }
            }
         }
      }

   }
</style>
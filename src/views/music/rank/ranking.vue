<template>
   <div class="ranking">
      <top title="网易排行榜" :isload="!show"></top>
      <main v-if="show">
         <h3 class="rank_title">
            官方榜单
         </h3>
         <router-link :to="`/musiclist_detail/${item.id}`" class="rank_link" v-for="item in list_1" :key="item.id">
            <img :src="item.coverImgUrl" class="rank_img">
            <span class="updated">{{item.updateFrequency}}</span>
            <div class="message">
               <p class="item_name text">1.{{item.tracks[0].first}}-{{item.tracks[0].second}}</p>
               <p class="item_name text">2.{{item.tracks[1].first}}-{{item.tracks[1].second}}</p>
               <p class="item_name text">3.{{item.tracks[2].first}}-{{item.tracks[2].second}}</p>
            </div>
         </router-link>
         <h3 class="rank_title">
            热门榜单
         </h3>
         <router-link :to="`/musicList_detail/${item.id}`" class="rank_link_more" v-for="item in list_2" :key="item.id">
            <img :src="item.coverImgUrl" class="rank_img_more">
            <span class="updated_more">{{item.updateFrequency}}</span>
         </router-link>
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
            show:false,
            list_1: [],
            list_2: []
         }
      },
      watch: {},
      methods: {
         getData() {
            this.$axios.get(`${musicAPI}/toplist/detail`).then(res => {
               //   console.log(res.data)
               this.list_1 = res.data.list.slice(0, 4)
               this.list_2 = res.data.list.slice(5)
               //   console.log(this.list_1);
               this.show = true

            })
         }
      },
      created() {
         this.getData()
      }
   }
</script>
<style scoped lang="scss">
   .ranking {
      width: 100%;
      height: 100%;
      padding-top: 45px;
      box-sizing: border-box;
      main::-webkit-scrollbar {
         display: none;
      }
      main {
         width: 100%;
         height: 100%;
         box-sizing: border-box;
         overflow: auto;

         .rank_title {
            line-height: 45px;
            width: 90%;
            margin: 0 auto 12px;
            font-size: 18px;
            color: rgb(228, 228, 228);
         }

         .rank_link {
            width: 95%;
            display: block;
            height: 140px;
            margin: 0 auto;
            box-sizing: border-box;
            position: relative;
            background-color: rgba(255, 255, 255, 0.192);
            border-radius: 9px;
            margin-bottom: 20px;

            .updated {
               position: absolute;
               left: 0;
               bottom: 0;
               width: 140px;
               border-radius: 0 0 9px 9px;
               background-color: rgba(0, 0, 0, 0.185);
               line-height: 30px;
               padding-left: 15px;
               box-sizing: border-box;
               font-size: 15px;
            }

            .rank_img {
               height: 100%;
               border-radius: 9px;
               float: left;
            }

            .message {
               float: right;
               padding: 20px 0;
               height: 100%;
               width: 55%;
               box-sizing: border-box;

               .item_name {
                  width: 100%;
                  height: 33.33%;
                  font-size: 15px;
                  color: rgb(61, 1, 1);
               }
            }
         }

         .rank_link_more {
            width: 33.33%;
            float: left;
            box-sizing: border-box;
            padding: 2.5%;

            .rank_img_more {
               width: 100%;
               border-radius: 7px;
            }

            .updated_more {
               line-height: 25px;
               color: rgb(209, 208, 208);
            }
         }
      }
   }
</style>
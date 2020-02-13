<template>
   <div class="my_muisclist">
      <main v-if="$store.state.isLogin">
         <div class="title" @click="open_1=!open_1">
            <span :class="{'open':true,'icon-chevron-thin-right':!open_1,'icon-chevron-thin-down':open_1}"></span>
            我的创建的歌单({{playlist.length}})
         </div>
         <ul class="my_playlist" v-show="playlist.length>0&&open_1">
               <router-link :to="`/musiclist_detail/${item.id}`" tag="li" class="playlist_item" v-for="item in playlist" :key="item.id">
                  <img :src="item.coverImgUrl" alt="">
                  <div class="item_mess">
                     <p>{{item.name}}</p>
                     <p class="number">共{{item.trackCount}}首歌</p>
                  </div>
               </router-link>
         </ul>
         <div class="title" @click="open_2=!open_2">
            <span :class="{'open':true,'icon-chevron-thin-right':!open_2,'icon-chevron-thin-down':open_2}"></span>
            我的收藏歌单({{otherlist.length}})
         </div>
         <ul class="my_playlist" v-show="open_2&&otherlist.length>0">
               <router-link :to="`/musiclist_detail/${item.id}`" tag="li" class="playlist_item" v-for="item in otherlist" :key="item.id">
                  <img :src="item.coverImgUrl" alt="">
                  <div class="item_mess">
                     <p class="text">{{item.name}}</p>
                     <p class="number">共{{item.trackCount}}首歌</p>
                  </div>
               </router-link>
         </ul>
         <div class="title" @click="open_3=!open_3">
            <span :class="{'open':true,'icon-chevron-thin-right':!open_3,'icon-chevron-thin-down':open_3}"></span>
            我收藏的歌手({{artist.length}})
         </div>
         <ul class="my_playlist" v-show="open_3&&artist.length>0">
               <router-link :to="`/musiclist_detail/${item.id}`" tag="li" class="playlist_item" v-for="item in artist" :key="item.id">
                  <img :src="item.coverImgUrl" alt="">
                  <div class="item_mess">
                     <p>{{item.name}}</p>
                     <p class="number">共{{item.trackCount}}首歌</p>
                  </div>
               </router-link>
         </ul>
         <div class="title" @click="open_4=!open_4">
            <span :class="{'open':true,'icon-chevron-thin-right':!open_4,'icon-chevron-thin-down':open_4}"></span>
            我收藏的MV({{video.length}})
         </div>
         <ul class="my_playlist" v-show="open_4&&video.length>0">
               <router-link :to="`/video_detail/${item.vid}`" tag="li" class="mvlist_item" v-for="item in video" :key="item.vid">
                  <img :src="item.coverUrl" alt="">
                  <p class="mv_name">{{item.title}}</p>
                  <p class="mv_time">{{item.durationms | opdate(item.durationms)}}</p>
               </router-link>
         </ul>
      </main>
   </div>
</template>
<style scoped lang="scss">
.my_muisclist {
   width: 100%;
   main {
      width: 100%;
      height: 300px;
      color: rgb(204, 204, 204);      
      .title {
         width: 100%;
         height: 40px;
         line-height: 40px;
         background-color: rgba(255, 255, 255, 0.274);
         margin-bottom: 10px;
         padding-left: 10px;
         font-size: 16px;
      }
      .my_playlist {
         width: 100%;
         .playlist_item {
            width: 100%;
            height: 70px;
            margin-bottom: 15px;
            padding-left: 20px;
            box-sizing: border-box;
            img {
               height: 100%;
               float: left;
               border-radius: 5px;
            }
            .item_mess {
               width: 70%;
               float: left;
               margin-left: 12px;
               p {
                  width: 70%;
                  line-height: 30px;
                  font-size: 16px;
               }
               .number {
                  font-size: 14px;
               }
            }
            
         }
         .mvlist_item {
            width: 50%;
            position: relative;
            margin-bottom: 15px;
            img {
               width: 85%;
               display: block;
               margin: 0 auto;
            }
            .mv_name {
               width: 85%;
               margin: 0 auto;
               line-height: 25px;
            }
            .mv_time {
               position: absolute;
               bottom: 53px;
               right: 17px;
               color: rgb(20, 20, 20);
            }
         }
      }
   }
   
}
</style>
<script>
import {musicAPI} from '../../../api/adr'
import { parse } from 'url'
export default {
   props:{
      'islogin':{
         type:Boolean,
         default:false
      }
   },
   data(){
       return {
          open_1:false,
          open_2:false,
          open_3:false,
          open_4:false,
          playlist:[],
          artist:[],
          video:[],
          otherlist:[]
       }
   },
   watch:{},
   filters:{
       opdate(num){
            let m = parseInt(num/1000/60)
            let s = parseInt(num/1000%60)
            return `${m>9?m:'0'+m}:${s>9?s:'0'+s}`
       }
   },
   methods:{
      getMyMusicList(){
         let uid = JSON.parse(sessionStorage.getItem('person')).profile.userId
         let all = [
            this.$axios.get(`${musicAPI}/user/playlist?uid=${uid}`),
            this.$axios.get(`${musicAPI}/artist/sublist`,{withCredentials:true}),
            this.$axios.get(`${musicAPI}/mv/sublist`,{withCredentials:true})
         ]
         this.$axios.all(all).then(this.$axios.spread((playlist,artist,mv)=>{
            playlist.data.playlist.forEach(ele => {
                   if(ele.userId==uid){
                      this.playlist.unshift(ele)
                   }else {
                      this.otherlist.unshift(ele)
                   }
            });
            
            this.video = mv.data.data
            this.artist = artist.data.data
         }))
      }
   },
   created(){
      this.getMyMusicList()
   },
   mounted(){}
}
</script>
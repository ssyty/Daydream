<template>
   <div class="res">
        <top :isload="false" :title="type"></top>
        <main v-if="$route.params.type==2">
           <ul class="music">
              <li class="m_item" v-for="item in song_list" :key="item.id">
                 <div class="m_mess">
                    <p class="m_name">{{item.name}}</p>
                    <p>{{item.artists[0].name}}</p>
                 </div>
                 <span class="icon-more_vert"></span>
              </li>
           </ul>
        </main>
   </div>
</template>
<style scoped lang="scss">
.res {
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
      overflow: auto;
      .title {
         width: 100%;
         height: 45px;
         padding-left: 15px;
         box-sizing: border-box;
         color: rgb(216, 215, 215);
         font-size: 16px;
      }
      .music {
         width: 100%;
         position: relative;
         .m_item {
            width: 90%;
            margin: 0 auto 12px;
            height: 50px;
            display: flex;
            color: rgb(218, 218, 218);
            border-bottom: 1px solid rgb(136, 136, 136);
            .m_mess {
               flex: 7;
               p {
                  width: 100%;
                  line-height: 25px;
                  font-size: 13px;
               }
               .m_name {
                  font-size: 15px;
               }
            }
            .icon-more_vert {
               flex: 1;
               font-size: 22px;
               text-align: center;
               line-height: 50px;
            }
         }
      }
   }
}
</style>
<script>
import {musicAPI} from '../../../api/adr'
import {film} from '../../../api/adr'

export default {
   data(){
       return {
          type:null,
          show:false,
          req:this.$route.params.words,
          song_list:[],
          num:null
       }
   },
   watch:{},
   methods:{
      getMusic(){
         this.$axios.get(`${musicAPI}/search?keywords=${this.req}`).then(res=>{
              console.log(res.data)
              this.song_list = res.data.result.songs
              this.num = res.data.result.songCount
         })
      },
      getFilm(){
         this.$axios.get(`${film.api_2}/v2/movie/search?tag=${this.req}`).then(res=>{
              console.log(res.data)
         })
      }
   },
   created(){
       if(this.$route.params.type==2){
          this.type = '音乐搜索结果'
          this.getMusic()
       }else if(this.$route.params.type==1){
          this.getFilm()
       }
       
       
   },
   mounted(){}
}
</script>
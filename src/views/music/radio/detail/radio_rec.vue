<template>
   <div class="rec">
        <h3 class="rec_title">热门电台</h3>
        <ul class="body clear">
           <li class="hot_item" v-for="item in hot_list.slice(0,9)" :key="item.id">
              <img :src="item.picUrl" class="hot_img">
              <p class="hot_name text_m">{{item.rcmdtext}}</p>
              <span class="hot_sub"><i class="icon-attachment"></i>{{item.subCount | opSub(item.subCount)}}</span>
           </li>
        </ul>
        <h3 class="rec_title">24小时节目榜</h3>
        <ul class="body">
           <li class="hours_item" v-for="(item,i) in hours_list" :key="i">
              <img :src="item.program.coverUrl" class="hours_img">
              <div class="hours_mess">
                 <p :class="{'hours_name text':true,'light':i<3} "><span class="rank_num">{{i+1}}.</span>{{item.program.name}}</p>
                 <p class="hours_nick text">{{item.program.dj.nickname}} <span class="category">{{item.program.radio.category}}</span></p>
                 <p class="hours_dsp text_m">{{item.program.description}}</p>
              </div>
           </li>
        </ul>
   </div>
</template>
<style scoped lang="scss">
.rec {
   width: 100%;
   margin-top: 25px;
   .rec_title {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      color: rgb(190, 189, 189);
      padding-left: 25px;
      box-sizing: border-box;
      margin-bottom: 15px;
   }
   .body {
      width: 100%;
      padding:0 12px;
      box-sizing: border-box;
      .hot_item {
         width: 33%;
         position: relative;
         float: left;
         margin-bottom: 15px;
         .hot_img {
            width: 90%;
            height: 105px;
            display: block;
            margin: 0 auto;
            border-radius: 4px;
         }
         .hot_name {
            line-height: 20px;
            color: rgb(209, 209, 209);
            width: 90%;
            margin: 0 auto;
            -webkit-line-clamp:2;
         }
         .hot_sub {
            width: 90%;
            height: 25px;
            position: absolute;
            top: 0;
            left: 5%;
            line-height: 25px;
            padding-left: 20px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.363);
            color: rgb(231, 231, 231);
            .icon-attachment {
               position: absolute;
               left: 2px;
               line-height: 25px;
               border-radius: 4px 4px 0 0;
            }
         }
      }
      .hours_item {
         width: 100%;
         height: 125px;
         padding: 5px 5px 5px 10px;
         box-sizing: border-box;
         margin-bottom: 10px;
         border-radius: 6px;
         position: relative;
         background-color: rgba(0, 0, 0, 0.233);
         .hours_img {
            height: 100%;
            float: left;
            border-radius: 6px;
         }
         .hours_mess {
            float: left;
            width: 50%;
            height: 100%;
            margin-left: 15px;
            
            color: rgb(200, 200, 200);
            p {
               width: 100%;
               line-height: 25px;  
            }
            .hours_name {
               font-size: 16px;
               padding-right: 15px;
               box-sizing: border-box;
            }
            .hours_nick {
               font-size: 14px;
               color:rgb(150, 182, 184);
               .category {
                  position: absolute;
                  top: 15px;
                  right: 3px;
                  padding: 1px 2px;
                  line-height: 16px;
                  font-size: 13px;
                  border-radius: 3px;
                  background-color: rgba(255, 255, 255, 0.459);
                  color: rgb(156, 84, 1);
               }
            }
            .hours_dsp {
               margin-top: 10px;
               -webkit-line-clamp:2;
               line-height: 20px;
            }
         }
      }
   }
}
</style>
<script>
import {musicAPI} from '../../../../api/adr'
import { parse } from 'path'
export default {
   data(){
       return {
          hot_list:[],
          hours_list:[]
       }
   },
   watch:{},
   filters:{
      opSub(num){
           return num/10000>1?(num/10000).toFixed(1)+'万':num
      }
   },
   methods:{
      getData(){
         let all = [
            this.$axios.get(`${musicAPI}/dj/hot`),
            this.$axios.get(`${musicAPI}/dj/program/toplist/hours?limit=10`)
         ]
         this.$axios.all(all).then(this.$axios.spread((hot,hours)=>{
            this.hot_list = hot.data.djRadios
            this.hours_list = hours.data.toplist
            
         }))
      }
   },
   created(){
      this.getData()
   },
   mounted(){}
}
</script>

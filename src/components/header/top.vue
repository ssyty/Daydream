<template>
 <div class="top_box animated">
     <div class="top_bg">
         <img :src="src" alt="" class="top_img">
     </div>
     <div class="top" :style="`backgroundColor:`">
       <a href="#" class="icon-arrow_back_ios" @click.prevent="setGoback(link)" :style="`color:${back_color}`" v-if="back"></a>
       <router-link class="title text" :style="`color:${title_color}`" tag="p" :to="`/search/${$store.state.type.key}`">{{title}}</router-link>
       <play top="10px" left="90%" :play="!$store.state.audio.paused" v-if="play_show"></play>
     </div>
     <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
         <div class="isload animated" v-if="isload">
         <div class="loader">
             <div class="loader-inner ball-pulse-sync">
                 <div :style="`backgroundColor:${isloadColor}`"></div>
                 <div :style="`backgroundColor:${isloadColor}`"></div>
                 <div :style="`backgroundColor:${isloadColor}`"></div>
             </div>
         </div>
       </div>
     </transition>
 </div>
   
</template>
<style scoped lang="scss">
.top_box {
    height: 45px;
    width: 100%;
    z-index: 1000;
    position: absolute;
    top: 0;
    .top_bg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
    }
    .top_img {
        width: 100%;
    }
}
.top {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgba(0, 0, 0, 0.144);
    font-size: 18px;
    line-height: 45px;
    .title {
        position: absolute;
        line-height: 45px;
        width: 70%;
        left: 15%;
        top: 0;
        text-align: center;
        z-index: 2;
        color: rgb(189, 187, 187);
    }
    .icon-arrow_back_ios {
        font-size: 24px;
        color: rgb(119, 119, 119);
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
        z-index: 2;
    }
    .icon-favorite {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        font-size: 24px;
    }
    .top_img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
}
.isload {
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
}
@keyframes ball-pulse-sync {
    33% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
    }

    66% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

.ball-pulse-sync>div:nth-child(0) {
    animation: ball-pulse-sync 0.8s 0s infinite ease-in-out;
}

.ball-pulse-sync>div:nth-child(1) {
    animation: ball-pulse-sync 0.8s 0.07s infinite ease-in-out;
}

.ball-pulse-sync>div:nth-child(2) {
    animation: ball-pulse-sync 0.8s 0.14s infinite ease-in-out;
}

.ball-pulse-sync>div:nth-child(3) {
    animation: ball-pulse-sync 0.8s 0.21s infinite ease-in-out;
}

.ball-pulse-sync>div {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
}
</style>
<script>
import { log } from 'util'
export default {
    props: {
        'bgc':{
          type:String,
          default:'rgba(0, 0, 0, 0.555)'
        },
        'title': {
            type: String,
            default: ''
        },
        'src':{
            type:String,
            default:''
        },
        'title_color':{
            type:String,
            default:'#fff'
        },
        'back_color':{
            type:String,
            default:'#fff'
        },
        'play_show':{
            type:Boolean,
            default:true
        },
        'back':{
            type:Boolean,
            default:true
        },
        'isload':{
            type:Boolean,
            default:true
        },
        'isloadColor':{
            type:String,
            default:'rgb(195, 194, 194)'
        },
        'link':{
            type:String,
            default:null
        }
    },
   data(){
       return {
           
       }
   },
   watch:{},
   methods:{
       showSearchBox(){
           this.$store.commit('setSearchBox',true)
       },
       setGoback(e){
           if(e==null){
               this.$router.go(-1)
           }else {
               this.$router.push(e)
           }
       }
   },
   created(){   
   },
   mounted(){}
}
</script>
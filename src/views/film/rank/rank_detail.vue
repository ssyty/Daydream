<template>
   <div class="film_rank"> 
        <top :title="title" :isload="!show"></top>
        <main>
             <ul class="list">
                <router-link tag="li" class="item" :to="`/film_detail/${item.subject.id}`" v-for="(item,i) in list" :key="i">
                <div class="rank_rating">
                        <p>
                            <span :class="{'rank_star':item.subject.rating.average>2,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>4,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>6,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>8,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>9,'icon-star-full':true}"></span>
                        </p>
                        <span class="rating_g">{{item.subject.rating.details | opCount(item.subject.rating.details)}}人评价</span>
                </div>
                <img :src="item.subject.images.large" class="item_img">
                <div class="item_mess">
                     <div class="name">{{item.subject.title}} <span>{{item.subject.year}}年</span> </div>
                     <p class="actor text">主演:{{item.subject.casts[0].name}} {{item.subject.casts[1].name}}</p>
                     <p class="dar text">导演:{{item.subject.directors[0].name}}</p>
                     <div class="about">
                        <p class="dur">时长{{item.subject.durations[0]}}</p>
                        <p class="tags">{{item.subject.genres | opTag(item.subject.genres)}}</p>
                     </div>
                </div>
                
                </router-link>
             </ul>
        </main>
   </div>
</template>
<style scoped lang="scss">
.film_rank {
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
        .list {
            width: 100%;
            padding-top: 15px;
            .item {
                width: 95%;
                height: 160px;
                margin: 0 auto 25px;
                background-color: rgba(238, 238, 238, 0.185);
                border-radius: 3px;
                position: relative;
                .rank_rating {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                        height: 45px;
                        width: 110px;
                        line-height: 25px;
                        font-size: 10px;
                        color: rgb(192, 191, 191);
                        background-color: rgba(0, 0, 0, 0.52);
                        p {
                            text-align: center;
                        }
                        .rank_star {
                            color: rgb(223, 83, 2);
                        }
                    }
                    .rating_g {
                        display: block;
                        line-height: 20px;
                        text-align: center;
                }
                .item_img {
                    height: 100%;
                    width: 110px;
                    border-radius: 3px;
                    float: left;
                    margin-right: 15px;
                }
                .item_mess {
                    width: 60%;
                    height: 100%;
                    float: left;
                    p {
                        width: 100%;
                    }
                    .name {
                        color: rgb(233, 233, 233);
                        font-size: 17px;
                        line-height: 35px;
                        position: relative;
                        span {
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            color: rgb(216, 216, 216);
                            font-size: 13px;
                        }
                    }
                    .actor {
                        color: rgb(184, 184, 184);
                        font-size: 15px;
                        line-height: 27px;
                    }
                    .dar {
                        line-height: 27px;
                        color: rgb(200, 200, 200);
                        font-size: 15px;
                    }
                    .about {
                        width: 100%;
                        .dur {
                            width: 100%;
                            line-height: 25px;
                            font-size: 13px;
                            color: rgb(233, 233, 233);
                        }
                        .tags {
                            line-height: 20px;
                            color: rgb(80, 0, 0);
                        }
                    }
                }
            }
        }
    }
}
</style>
<script>
import {film} from '../../../api/adr'
export default {
   data(){
       return {
           title:'',
           show:false,
           list:[]
       }
   },
   watch:{},
   filters:{
             opCount(o){
                 let sum = null
                 for(var key in o){
                     sum = sum + o[key]   
                 }
                 return sum/10000>1?parseInt(sum/10000)+'万':sum   
             },
             opTag(arr){
                 let str = ''
                 arr.forEach(ele=>{
                      str = str+' '+ele
                 })
                 return str
             }
        },
   methods:{
       getData(type){
           let rank = JSON.parse(localStorage.getItem('movie_rank')) || null
           if(rank!==null||rank!==undefined){
               if(type=='top250'){
                   this.title = 'TOP 250'
                    rank.top.forEach(ele => {
                       this.list.push({subject:ele})
                   });
               }else if(type=='new_movies'){
                   this.title = '新片榜'
                   rank.new.forEach(ele => {
                       this.list.push({subject:ele})
                   });
               }else if(type=='weekly'){
                   this.title = '口碑榜'
                   this.list = rank.weekly
               }else if(type=='us_box'){
                   this.title = '北美票房榜'
                   this.list = rank.us
               }
               this.show = true
           }else{
               this.$axios.get(`${film.api_1}/v2/movie/${type}`).then(res=>{
                   
               })
           }  
       }
   },
   created(){
      this.getData(this.$route.params.type)
   },
   mounted(){}
}
</script>
<template>
    <div class="film_rec">
        <top title="电影推荐" :back='false' :isload="false"></top>
        <main v-if="show">
            <h2 class="title">
                正在上映的电影
            </h2>
            <div class="current">
                <router-link :to="`film_detail/${item.id}`" class="current_link" v-for="(item,i) in currents.list" :key="item.id" v-show="i<currents.num">
                    <img :src="item.images.small" class="current_img">
                    <span class="current_name">{{item.title}}</span>
                </router-link>
                <a href="/#/film"  class="current_link" v-show="currents.num==6">
                     <span class="icon-keyboard_control" @click.prevent="currents.num=50"></span>
                </a>
            </div>
            <h2 class="title">
                即将上映的电影
            </h2>   
                <ul class="body clear">
                    <router-link :to="`film_detail/${item.id}`" tag='li' class="body_link" v-for="(item,i) in soon.list" :key="i" v-show="i<soon.num">
                    <img :src="item.images.small" class="link_img">
                    <p class="film_name text">{{item.title}}</p>
                    </router-link>
                    <li class="getmore" :key="100">
                        <span :class="{'getmore_icon':true,'icon-video-camera':this.soon.num==8,'icon-chevron-thin-up':this.soon.num!=8}" @click.prevent="getMore"></span>
                    </li>
                </ul>
            <h2 class="title">
                豆瓣电影 TOP250
            </h2>
            <div class="film_rank">
                <router-link
                tag='div'
                :to="`/film_detail/${item.id}`"
                class="film_rank_item"
                v-for="(item,i) in ranks.top.slice(0,3)"
                :key="i">
                <span class="rank_num"></span>
                <img :src="item.images.small" alt="" class="rank_img">
                <div class="film_rank_mess">
                    <p class="rank_film_name text">{{i+1}}. {{item.title}}</p>
                    <div class="rank_rating">
                        <p>
                            <span :class="{'rank_star':item.rating.average>2,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>4,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>6,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>8,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>9,'icon-star-full':true}"></span>
                        </p>
                        <span class="rating_g">{{item.rating.average}} 共有{{item.rating.details | opCount(item.rating.details)}}人评价</span>
                    </div>
                </div>
                </router-link>
                <router-link to="/film_rank/top250" tag="div" class="rank_more">查看更多...</router-link>
            </div>
            <h2 class="title">
                豆瓣电影 新片榜
            </h2>
            <div class="film_rank">
                <router-link
                tag='div'
                :to="`/film_detail/${item.id}`"
                class="film_rank_item"
                v-for="(item,i) in ranks.new.slice(0,3)"
                :key="i">
                <span class="rank_num"></span>
                <img :src="item.images.small" alt="" class="rank_img">
                <div class="film_rank_mess">
                    <p class="rank_film_name text">{{i+1}}. {{item.title}}</p>
                    <div class="rank_rating">
                        <p>
                            <span :class="{'rank_star':item.rating.average>2,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>4,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>6,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>8,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.rating.average>9,'icon-star-full':true}"></span>
                        </p>
                        <span class="rating_g">{{item.rating.average}} 共有{{item.rating.details | opCount(item.rating.details)}}人评价</span>
                    </div>
                </div>
                </router-link>
                <router-link to="/film_rank/new_movies" tag="div" class="rank_more">查看更多...</router-link>
            </div>
            <h2 class="title">
                豆瓣电影 口碑榜
            </h2>
            <div class="film_rank">
                <router-link
                tag='div'
                :to="`/film_detail/${item.subject.id}`"
                class="film_rank_item"
                v-for="(item,i) in ranks.weekly.slice(0,3)"
                :key="i">
                <span class="rank_num"></span>
                <img :src="item.subject.images.small" alt="" class="rank_img">
                <div class="film_rank_mess">
                    <p class="rank_film_name text">{{i+1}}. {{item.subject.title}}</p>
                    <div class="rank_rating">
                        <p>
                            <span :class="{'rank_star':item.subject.rating.average>2,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>4,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>6,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>8,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>9,'icon-star-full':true}"></span>
                        </p>
                        <span class="rating_g">{{item.subject.rating.average}} 共有{{item.subject.rating.details | opCount(item.subject.rating.details)}}人评价</span>
                    </div>
                </div>
                </router-link>
                <router-link to="/film_rank/weekly" tag="div" class="rank_more">查看更多...</router-link>
            </div>
            <h2 class="title">
                豆瓣电影 北美票房榜
            </h2>
            <div class="film_rank">
                <router-link
                tag='div'
                :to="`/film_detail/${item.subject.id}`"
                class="film_rank_item"
                v-for="(item,i) in ranks.us.slice(0,3)"
                :key="i">
                <span class="rank_num"></span>
                <img :src="item.subject.images.small" alt="" class="rank_img">
                <div class="film_rank_mess">
                    <p class="rank_film_name text">{{i+1}}. {{item.subject.title}}</p>
                    <div class="rank_rating">
                        <p>
                            <span :class="{'rank_star':item.subject.rating.average>2,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>4,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>6,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>8,'icon-star-full':true}"></span>
                            <span :class="{'rank_star':item.subject.rating.average>9,'icon-star-full':true}"></span>
                        </p>
                        <span class="rating_g">{{item.subject.rating.average}} 共有{{item.subject.rating.details | opCount(item.subject.rating.details)}}人评价</span>
                    </div>
                </div>
                </router-link>
                <router-link to="/film_rank/us_box" tag="div" class="rank_more">查看更多...</router-link>
            </div>
        </main>
    </div>
</template>
<style scoped lang="scss">
    .film_rec {
        width: 100%;
        padding: 45px 0 55px;
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }
    main::-webkit-scrollbar {
        display: none;
    }
    main {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 15px 15px 0 0;
        background-color: rgba(0, 0, 0, 0.459);
        overflow: auto;
        .title {
            width: 90%;
            margin: 0 auto;
            height: 45px;
            margin-bottom: 12px;
            line-height: 45px;
            font-size: 18px;
            color: rgb(233, 233, 233);
        }
        .current {
            width: 93%;
            height: 200px;
            margin: 0 auto;
            white-space: nowrap;
            overflow-x: auto;
            .icon-keyboard_control {
                position: absolute;
                width: 90%;
                height: 100%;
                text-align: center;
                line-height: 150px;
                font-size: 42px;
            }
            .current_link {
                display: inline-block;
                width: 45%;
                height: 90%;
                position: relative;
                .current_img {
                    display: block;
                    width: 90%;
                    height: 100%;
                    margin: 0 auto;
                    border-radius: 5px;
                    margin: 0 auto;
                }
                .current_name {
                    width: 90%;
                    position: absolute;
                    bottom: 0;
                    line-height: 45px;
                    font-size: 16px;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.144);
                    border-radius: 0 0 5px 5px;
                    color: rgb(235, 235, 235);
                    left: 5%;
                }
            }

        }
        .current::-webkit-scrollbar {
                display: none;
        }
        .getmore {
                width: 33%;
                float: left;
                .getmore_icon {
                    display: block;
                    font-size: 32px;
                    color: rgb(221, 221, 221);
                    width: 80%;
                    margin: 0 auto;
                    height: 140px;
                    line-height: 140px;
                    text-align: center;
                    background-color: rgba(216, 216, 216, 0.116);
                    border-radius: 5px;
                }
            }
        .body {
            width: 100%;
            .body_link {
                float: left;
                width: 33.33%;
                margin-bottom: 12px;
                .link_img {
                    width: 80%;
                    display: block;
                    margin: 0 auto;
                    border-radius: 5px;
                    height: 140px;
                }
                .film_name {
                    width: 80%;
                    margin: 0 auto;
                    line-height: 35px;
                    font-size: 16px;
                    color: rgb(216, 216, 216);
                    text-align: center;
                }
            }
        }
        .film_rank {
            width: 100%;
            padding: 0 30px;
            box-sizing: border-box;
            .film_rank_item {
                width: 100%;
                height: 75px;
                border-radius: 6px;
                margin-bottom: 12px;
                position: relative;
                .rank_num {
                    font-size: 16px;
                    color: rgb(197, 0, 0);
                    line-height: 75px;
                    float: left;
                    width: 25px;
                    text-align: center;
                }
                .rank_img {
                    height: 100%;
                    float: left;
                    border-radius: 5px;
                }
                .film_rank_mess {
                    float: left;
                    margin-left: 15px;
                    width: 65%;
                    .rank_film_name {
                        line-height: 25px;
                        font-size: 14px;
                        color: rgb(219, 219, 219);
                    }
                    .rank_rating {
                        height: 25px;
                        line-height: 25px;
                        font-size: 10px;
                        color: rgb(192, 191, 191);
                        .rank_star {
                            color: rgb(223, 83, 2);
                        }
                    }
                    .rating_g {
                        display: block;
                        line-height: 25px;
                    }
                }
            }
            .rank_more {
                width: 100%;
                background-color: rgba(245, 245, 245, 0.171);
                border-radius: 8px;
                line-height: 35px;
                color: rgb(221, 221, 221);
                text-align: center;
                margin-bottom: 35px;
            }
        }
    }
</style>
<script>
import { log } from 'util'
import {film} from '../../api/adr.js'
    export default {
        data() {
            return {
                show:false,
                soon: {num:8,list:[]},
                currents:{num:6,list:[]},
                ranks:{
                    top:[],
                    us:[],
                    weekly:[],
                    new:[]
                }
            }
        },
        watch: {},
        filters:{
             opCount(o){
                 let sum = null
                 for(var key in o){
                     sum = sum + o[key]   
                 }
                 return sum/10000>1?parseInt(sum/10000)+'万':sum   
             }
        },
        methods: {
            getRec() {
                let a = JSON.parse(localStorage.getItem('now'))
                let b = JSON.parse(localStorage.getItem('soon'))
                let r = JSON.parse(window.localStorage.getItem('movie_rank'))
                if (a == null || b == null || r == null) {
                    this.getPlay()
                    this.getRank()
                } else {
                    this.currents.list = a.subjects
                    this.soon.list = b.subjects
                    this.ranks = r
                    this.show = true
                }
            },
            getRank(){
                let all = [
                   this.$axios.get(`${film.api_1}/v2/movie/top250`),
                   this.$axios.get(`${film.api_1}/v2/movie/us_box`),
                   this.$axios.get(`${film.api_1}/v2/movie/weekly`),
                   this.$axios.get(`${film.api_1}/v2/movie/new_movies`)
                ]
                this.$axios.all(all).then(this.$axios.spread((a,b,c,d)=>{
                    this.ranks = {top:a.data.subjects,us:b.data.subjects,weekly:c.data.subjects,new:d.data.subjects}
                    this.show = true
                    log
                    localStorage.setItem('movie_rank',JSON.stringify(this.ranks))   
                }))
            },
            getPlay(){
                let all = [
                   this.$axios.get(`${film.api_1}/v2/movie/in_theaters`),
                   this.$axios.get(`${film.api_1}/v2/movie/coming_soon`)
                ]
                
                this.$axios.all(all).then(this.$axios.spread((a,b)=>{
                      this.currents.list = a.data.subjects
                      this.soon.list = a.data.subjects
                      this.show = true
                      localStorage.setItem('now',JSON.stringify(a.data))
                      localStorage.setItem('soon',JSON.stringify(b.data))
                }))
            },
            getMore(){
                if(this.soon.num==8){
                    this.soon.num = 50
                }else {
                    this.soon.num = 8
                }
            }
        },
        created() {
            this.getRec()
            this.$store.commit('setType',{key:1,text:'电影'})
        }
    }
</script>

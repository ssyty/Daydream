<template>
    <div class="film_detail">
        <top :title="message.title" :isload="!show"></top>
        <warning :noLogIn="warning" />
        <transition enter-active-class="fadeIn" leave-active-class="bounceOutLeft">
            <main v-if="show" class="animated">
                <div class="img_box">
                    <div class="message">
                        <img :src="message.images.small" class="film_img">
                        <div class="mess">

                            <h2 class="film_name">{{message.title}}</h2>
                            <p class="time">上映日期:{{message.mainland_pubdate}}</p>
                            <p class="film_info text">{{message.countries[0]}}/{{message.genres[0]}}
                                {{message.genres[1]}}/{{message.pubdates[0]}}</p>
                            <div class="rating">
                                <p class="rating_title">豆瓣评分</p>
                                <span :class="{'fav':true, 'icon-favorite_outline':!fav,'icon-favorite':fav}"
                                    @click="favChange"></span>
                                <p class="total_num">{{message.rating.average}} 共有
                                    {{message.rating.details | opCount(message.rating.details)}}人评价</p>
                                <div class="stars">
                                    <span :class="{'icon-star-full':true,'star_light':message.rating.average>1}"></span>
                                    <span :class="{'icon-star-full':true,'star_light':message.rating.average>4}"></span>
                                    <span :class="{'icon-star-full':true,'star_light':message.rating.average>6}"></span>
                                    <span :class="{'icon-star-full':true,'star_light':message.rating.average>8}"></span>
                                    <span :class="{'icon-star-full':true,'star_light':message.rating.average>9}"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="summary">
                    <h3 class="sum_title">剧情简介</h3>
                    <div class="contents text_m" :style="`-webkit-line-clamp: ${con_sum};`">{{message.summary}}</div>
                    <span class="getSum_more" @click="getSum" v-if="con_sum==4">展开</span>
                </div>
                <div class="works">
                    <h3 class="w_title">演职员<router-link to="" class="getAll_w"></router-link>
                    </h3>
                    <div class="w_box">
                        <router-link to="/film_person" class="w_item">
                            <img :src="message.writers[0].avatars.large" alt="">
                            <span class="w_name text">{{message.writers[0].name}}</span>
                        </router-link>
                        <router-link to="/film_person" class="w_item" v-for="(item,i) in message.casts" :key="i">
                            <img :src="item.avatars.large" alt="">
                            <span class="w_name text">{{item.name}}</span>
                        </router-link>
                    </div>
                </div>
                <div class="photos">
                    <h3 class="p_title">预告片/剧照</h3>
                    <div class="p_box">
                        <div to="" class="p_item" v-for="item in message.bloopers" :key="item.id">
                            <img :src="item.small" alt="" class="p_img">
                            <router-link to="/" class="icon-play_arrow"></router-link>
                            <span class="boo_name text">{{item.title}}</span>
                        </div>
                        <div v-for="item in message.photos" :key="item.id" class="p_item">
                            <img :src="item.cover" class="p_img">
                        </div>
                    </div>
                </div>
                <div class="comments">
                    <h3 class="c_title">影评 <router-link to="/" class="com_all">全部</router-link>
                    </h3>
                    <div class="c_item" v-for="(item,i) in comments" :key="item.id" v-show="i<c_num">
                        <div class="c_item_top">
                            <img :src="item.author.avatar" alt="">
                            <div class="author">
                                <p class="author_name">{{item.author.name}}</p>
                                <div class="c_rating">
                                    <span :class="{'c_rating_star':item.rating.value>0,'icon-star-full':true}"></span>
                                    <span :class="{'c_rating_star':item.rating.value>1,'icon-star-full':true}"></span>
                                    <span :class="{'c_rating_star':item.rating.value>2,'icon-star-full':true}"></span>
                                    <span :class="{'c_rating_star':item.rating.value>3,'icon-star-full':true}"></span>
                                    <span :class="{'c_rating_star':item.rating.value>4,'icon-star-full':true}"></span>
                                </div>
                            </div>
                        </div>
                        <div class="c_item_content">
                            {{item.content}}
                        </div>
                        <div class="c_bottom">
                            <div class="icon-thumb_up_off_alt"></div>
                            <div class="icon-bubbles3"></div>
                            <div><span class="icon-coffee1"></span></div>
                        </div>
                    </div>
                    <div class="c_getMore" v-if="c_num==8" @click="c_num=50">获取更多</div>
                </div>
            </main>
        </transition>
    </div>
</template>
<style scoped lang="scss">
    .film_detail {
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

            .img_box {
                width: 100%;
                height: 200px;
                overflow: hidden;
                position: relative;

                .mess_bg {
                    width: 100%;
                    top: -45px;
                    position: absolute;
                }
            }

            .message {
                width: 100%;
                height: 100%;
                padding: 12px 12px 55px;
                box-sizing: border-box;
                position: relative;
                background-color: rgba(0, 0, 0, 0.281);

                .rating {
                    position: absolute;
                    width: 230px;
                    height: 75px;
                    background-color: rgba(179, 179, 179, 0.459);
                    bottom: 15px;
                    padding-left: 15px;
                    box-sizing: border-box;
                    border-radius: 8px;

                    .fav {
                        font-size: 32px;
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        color: rgb(139, 1, 1);
                    }

                    .rating_title {
                        width: 100%;
                        color: rgb(177, 176, 176);
                        line-height: 20px;
                        font-size: 12px;
                    }

                    .total_num {
                        font-size: 12px;
                        color: rgb(200, 200, 200);
                    }

                    .stars {
                        height: 35px;
                        line-height: 35px;
                        width: 100%;
                        color: rgb(172, 171, 171);

                        .star_light {
                            color: rgb(192, 17, 1);
                        }
                    }
                }

                .film_img {
                    height: 100%;
                    width: 100px;
                    float: left;
                }

                .mess {
                    float: right;
                    height: 100%;
                    width: 65%;

                    .film_name {
                        font-size: 22px;
                        line-height: 30px;
                        color: rgb(228, 228, 228);
                    }

                    .time {
                        width: 100%;
                        line-height: 35px;
                        font-size: 14px;
                        color: rgb(200, 200, 200);
                    }

                    .film_info {
                        width: 100%;
                        font-size: 14px;
                        color: rgb(172, 172, 172);
                    }
                }
            }

            .summary {
                width: 100%;
                padding: 15px 12px 0;
                box-sizing: border-box;
                position: relative;
                margin-bottom: 35px;

                .sum_title {
                    width: 100%;
                    line-height: 35px;
                    color: rgb(216, 216, 216);
                }

                .contents {
                    line-height: 25px;
                    color: rgb(212, 211, 211);
                }

                .getSum_more {
                    position: absolute;
                    right: 12px;
                    bottom: -15px;
                    color: rgb(223, 223, 223);
                }
            }

            .works {
                width: 100%;
                padding: 0 12px;
                box-sizing: border-box;
                margin-bottom: 35px;

                .w_title {
                    line-height: 35px;
                    font-size: 17px;
                    color: rgb(216, 216, 216);
                    margin-bottom: 15px;
                    border-bottom: 1px solid rgb(199, 198, 198);
                }

                .w_box {
                    width: 100%;
                    white-space: nowrap;
                    overflow-x: auto;

                    .w_item {
                        display: inline-block;
                        width: 28%;
                        position: relative;

                        img {
                            display: block;
                            margin: 0 auto;
                            width: 86%;
                            border-radius: 6px;
                        }

                        .w_name {
                            display: block;
                            position: absolute;
                            width: 86%;
                            left: 7%;
                            height: 25px;
                            background-color: rgba(0, 0, 0, 0.692);
                            bottom: 0;
                            border-radius: 0 0 6px 6px;
                            color: rgb(236, 236, 236);
                            line-height: 25px;
                            text-align: center;
                        }
                    }
                }

            }

            .photos {
                width: 100%;
                padding: 0 12px;
                box-sizing: border-box;
                margin-bottom: 35px;

                .p_title {
                    font-size: 17px;
                    color: rgb(216, 216, 216);
                    line-height: 35px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid rgb(199, 198, 198);
                }

                .p_box {
                    width: 100%;
                    height: 155px;
                    white-space: nowrap;
                    overflow-x: auto;

                    .p_item {
                        height: 100%;
                        display: inline-block;
                        margin-right: 8px;
                        position: relative;

                        .icon-play_arrow {
                            font-size: 40px;
                            position: absolute;
                            left: 50%;
                            top: 30%;
                            transform: translateX(-50%);
                        }

                        .boo_name {
                            display: block;
                            line-height: 30px;
                            width: 100%;
                            position: absolute;
                            bottom: 0;
                            background-color: rgba(0, 0, 0, 0.52);
                            font-size: 16px;
                            text-align: center;
                            color: rgb(219, 218, 218);
                        }
                    }

                    .p_img {
                        height: 151px;
                    }
                }
            }

            .works::-webkit-scrollbar {
                display: none;
            }

            .photos::-webkit-scrollbar {
                display: none;
            }

            .comments {
                width: 100%;
                padding: 0 12px;
                box-sizing: border-box;

                .c_title {
                    line-height: 35px;
                    color: rgb(223, 223, 223);
                    font-size: 17px;
                    line-height: 35px;
                    position: relative;
                    margin-bottom: 15px;
                    border-bottom: 1px solid rgb(199, 198, 198);

                    .com_all {
                        font-size: 14px;
                        line-height: 35px;
                        position: absolute;
                        right: 12px;
                        color: rgb(230, 230, 230);
                    }
                }

                .c_item {
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.212);
                    margin-bottom: 15px;
                    border-radius: 5px;
                    box-shadow: 2px 2px 6px rgba(93, 93, 93, 0.37);

                    .c_item_top {
                        width: 100%;
                        height: 70px;
                        padding-left: 70px;
                        box-sizing: border-box;
                        position: relative;

                        img {
                            height: 35px;
                            border-radius: 50%;
                            position: absolute;
                            top: 10px;
                            left: 10px;
                        }

                        .author {
                            width: 100%;
                            height: 100%;

                            .author_name {
                                line-height: 30px;
                                color: rgb(211, 210, 210);
                                font-size: 16px;
                            }

                            .c_rating {
                                line-height: 30px;
                                color: rgb(211, 211, 211);
                                font-size: 12px;
                            }

                            .c_rating_star {
                                color: rgb(226, 56, 4);
                            }
                        }
                    }

                    .c_item_content {
                        line-height: 25px;
                        padding: 0 5px;
                        box-sizing: border-box;
                        width: 100%;
                    }

                    .c_bottom {
                        width: 100%;
                        height: 35px;
                        margin-top: 15px;
                        display: flex;
                        border-top: 1px solid rgb(202, 202, 202);

                        div {
                            flex: 1;
                            color: rgb(221, 221, 221);
                            font-size: 16px;
                            line-height: 35px;
                            text-align: center;

                            span {
                                font-size: 20px;
                            }
                        }

                        .icon-thumb_up_off_alt {
                            font-size: 22px;
                        }
                    }
                }

                .c_getMore {
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    color: rgb(221, 221, 221);
                    font-size: 17px;
                    background-color: rgba(82, 82, 82, 0.411);
                    border-radius: 10px;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
<script>
    import {
        film
    } from '../../api/adr.js'
    export default {
        data() {
            return {
                c_num: 8,
                c_con: 3,
                con_sum: 4,
                message: {},
                show: false,
                stars: [1, 2, 3, 4, 5],
                comments: [],
                warning: false,
                fav: false
            }
        },
        watch: {},
        computed: {
            'imgs'() {
                return parseInt(Math.random() * 4 + 1)
            }
        },
        filters: {
            opCount(o) {
                let sum = null
                for (var key in o) {
                    sum = sum + o[key]
                }
                return sum / 10000 > 1 ? parseInt(sum / 10000) + '万' : sum
            }
        },
        methods: {
            getData(id) {
                this.$axios.get(`${film.api_1}/v2/movie/subject/${id}`).then(res => {
                    this.message = res.data
                    this.show = true
                    // localStorage.setItem('f',JSON.stringify(res.data))
                })
                this.$axios.get(`${film.api_1}/v2/movie/subject/${id}/comments`).then(res => {
                    this.comments = res.data.comments
                    // localStorage.setItem('c',JSON.stringify(res.data.comments))    
                })
            },
            getSum() {
                this.con_sum = 100
            },
            favChange() {
                if (this.$store.state.isLogin) {
                    this.fav = !this.fav
                    let arr = JSON.parse(localStorage.getItem('my_film')) || []
                    if (this.fav) {
                        arr.unshift(this.message)
                        localStorage.setItem('my_film', JSON.stringify(arr))
                    } else {
                        let index = arr.findIndex(ele => {
                            return ele.id == this.message.id
                        })
                        arr.splice(index, 1)
                        localStorage.setItem('my_film', JSON.stringify(arr))
                    }

                } else {
                    this.warning = true
                    setTimeout(() => {
                        this.warning = false
                    }, 1800);
                }
            }
        },
        created() {
            this.getData(this.$route.params.id)
            let arr = JSON.parse(localStorage.getItem('my_film')) || []
            let index = arr.findIndex(ele => {
                return ele.id == this.message.id
            })
            if (index == (-1)) {
                this.fav = false
            } else {
                this.fav = true
            }
        }
    }
</script>
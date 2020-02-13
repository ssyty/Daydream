<template>
    <div class="radio" :class="{'main':top_stop}">
        <top :isload="!show" title="电台" link='/music'></top>
        <main v-if="show" @scroll="topScroll">
            <div class="banner">
                <van-swipe :autoplay="3000" :show-indicators="false">
                    <van-swipe-item v-for="(item,index) in banners" :key="index">
                        <router-link to="/radio_detail" class="b_item">
                            <img :src="item.pic" alt="">
                        </router-link>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <ul :class="{'nav_bar':true,'top_filxd':top_stop}">
                <li :class="{'nav_link':true,'nav_active':$route.path==route_list[0]}" @click="pushTarget(0)">
                    推荐
                </li>
                <li :class="{'nav_link':true,'nav_active':$route.path==route_list[1]}" @click="pushTarget(1)">
                    节目榜
                </li>
                <li :class="{'nav_link':true,'nav_active':$route.path==route_list[2]}" @click="pushTarget(2)">
                    分类
                </li>
                <li :class="{'nav_link':true,'nav_active':$route.path==route_list[3]}" @click="pushTarget(3)">
                    今日优选
                </li>
            </ul>
            <transition enter-active-class="bounce" leave-active-class="zoomOut">
                <div class="warning_box animated" v-if="warning">
                    <router-link to="/selected" tag="div" class="warning">
                        <span class="icon-denied"></span>
                        点击登录
                    </router-link>
                </div>
            </transition>
            <transition enter-active-class="slideInRight" leave-active-class="slideOutLeft">
                <router-view class="animated"></router-view>
            </transition>
        </main>
    </div>
</template>
<style scoped lang="scss">
    .radio {
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
            position: relative;

            .warning_box {
                width: 100%;
                height: 180px;
                position: absolute;
                top: 20%;
                left: 0;
                z-index: 10000;

                .warning {
                    width: 50%;
                    height: 70px;
                    background-color: rgba(2, 2, 2, 0.555);
                    text-align: center;
                    line-height: 35px;
                    color: rgb(216, 216, 216);
                    border-radius: 6px;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);

                    .icon-denied {
                        display: block;
                        width: 100%;
                        height: 35px;
                        color: rgb(190, 189, 189);
                        font-size: 26px;
                        text-align: center;
                        line-height: 35px;
                    }
                }
            }

            .banner {
                width: 95%;
                height: 145px;
                border-radius: 6px;
                overflow: hidden;
                margin: 5px auto;

                .b_item {
                    width: 100%;

                    img {
                        width: 100%;
                    }
                }
            }

            .nav_bar {
                width: 90%;
                height: 45px;
                margin: 0 auto;
                display: flex;

                .nav_link {
                    flex: 1;
                    line-height: 47px;
                    text-align: center;
                    color: #999;
                    font-size: 16px;
                    box-sizing: border-box;
                    border-bottom: 2px solid rgba(248, 248, 248, 0);
                    transition: all 0.3s linear;
                }

                .nav_active {
                    border-bottom: 2px solid rgb(107, 1, 1);
                    color: rgb(255, 255, 255);
                }
            }

            .top_filxd {
                position: fixed;
                top: 45px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .main {
        padding-top: 92px;
    }
</style>

<script>
    import {
        musicAPI
    } from '../../../api/adr'
    export default {
        data() {
            return {
                top_stop: false,
                route_list: ['/radio/radio_rec', '/radio/radio_pro', '/radio/radio_class', '/radio/daily'],
                warning: false,
                show: false,
                banners: [],
                nav: 1
            }
        },
        watch: {
            'warning'(newval) {
                if (newval) {
                    setTimeout(() => {
                        this.warning = false
                    }, 3000)
                }
            }
        },
        methods: {
            getData() {
                this.$axios.get(`${musicAPI}/dj/banner`).then(res => {
                    // console.log(res.data)
                    this.banners = res.data.data
                    // console.log(this.banners);
                    this.show = true
                })
            },
            pushTarget(e) {
                let login = sessionStorage.getItem('person') || null
                if (login == undefined || login == null) {
                    this.warning = true
                } else {
                    this.$router.push(this.route_list[e])
                }
            },
            topScroll() {
                if (event.target.scrollTop > 155) {
                    this.top_stop = true
                } else {
                    this.top_stop = false
                }

            }
        },
        created() {
            this.getData()
            //    console.log(this.$route);

        },
        mounted() {}
    }
</script>
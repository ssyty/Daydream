<template>
    <div class="read_rec">
        <top title="读书推荐" :back="false" :isload="false"></top>
        <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
            <main class="animated">
                <div class="nav_read">
                    <router-link to="/read_rank" class="read_nav_link icon-stats-bars2"></router-link>
                    <router-link to="/booklist" class="read_nav_link icon-file-text1"></router-link>
                    <router-link to="/bookClass_detail/picture" class="read_nav_link icon-eercast"></router-link>
                    <router-link to="/bookClass_detail/press" class="read_nav_link icon-books"></router-link>
                </div>
                <div class="recommend" v-if="show">
                    <h3 class="title">男生
                        <router-link class="icon-arrow-right2" to="/bookClass_detail/male"></router-link>
                    </h3>
                    <div class="body clear">
                        <router-link class="item_link" :to="`/book_detail/${item._id}`" v-for="(item,i) in reads.list_1"
                            :key="i">
                            <img :src="`http://statics.zhuishushenqi.com${item.cover}`" class="link_img">
                            <div class="read_name text">
                                <p class="text">{{item.title}}</p>
                                <p class="author">作者:{{item.author}}</p>
                                <span class="tag">{{item.majorCate}} {{item.minorCate}}</span>
                                <p class="info text">{{item.shortIntro}}</p>
                            </div>
                        </router-link>
                    </div>
                    <h3 class="title">女生
                        <router-link class="icon-arrow-right2" to="/bookClass_detail/female"></router-link>
                    </h3>
                    <div class="body clear">
                        <router-link class="item_link" :to="`/book_detail/${item._id}`" v-for="(item,i) in reads.list_2"
                            :key="i">
                            <img :src="`http://statics.zhuishushenqi.com${item.cover}`" class="link_img">
                            <div class="read_name text">
                                <p class="text">{{item.title}}</p>
                                <p class="author">作者:{{item.author}}</p>
                                <span class="tag">{{item.majorCate}} {{item.minorCate}}</span>
                                <p class="info text">{{item.shortIntro}}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </main>
        </transition>
    </div>
</template>
<style scoped lang="scss">
    .read_rec {
        width: 100%;
        height: 100%;
        padding: 45px 0 55px;
        box-sizing: border-box;

        .nav_read {
            width: 100%;
            height: 55px;
            display: flex;
            z-index: 5;

            .read_nav_link {
                flex: 1;
                font-size: 26px;
                line-height: 55px;
                text-align: center;
                color: rgb(223, 223, 223);
            }
        }

        main {
            width: 100%;
            height: 100%;
            overflow: auto;
        }

        main::-webkit-scrollbar {
            display: none;
        }

        .recommend {
            box-sizing: border-box;
            width: 100%;

            .title {
                line-height: 35px;
                font-size: 20px;
                position: relative;
                padding: 0 25px;
                box-sizing: border-box;
                margin-top: 15px;
                border-bottom: 1px solid rgb(61, 61, 61);
                color: rgb(214, 214, 214);

                .icon-arrow-right2 {
                    font-size: 22px;
                    color: rgb(182, 182, 182);
                    position: absolute;
                    right: 12px;
                    line-height: 35px;
                }
            }

            .body {
                width: 100%;

                .item_link {
                    width: 100%;
                    height: 140px;
                    padding: 10px 0;
                    margin-bottom: 8px;
                    position: relative;
                    display: block;
                    background-color: rgba(255, 255, 255, 0.075);

                    .getmore {
                        font-size: 32px;
                        text-align: center;
                        line-height: 140px;
                        background-color: rgba(233, 231, 231, 0.198);
                        width: 86%;
                        margin-left: 7%;
                        border-radius: 5px;
                        display: block;
                    }

                    .link_img {
                        float: left;
                        margin-left: 7%;
                        height: 140px;
                        width: 105px;
                        border-radius: 5px;
                    }

                    .read_name {
                        float: left;
                        margin-left: 15px;
                        width: 55%;
                        color: rgb(206, 206, 206);

                        p {
                            width: 100%;
                            line-height: 35px;
                            font-size: 18px;
                        }

                        .author {
                            font-size: 14px;
                        }

                        .tag {
                            color: rgb(128, 2, 2);
                        }

                        .info {
                            font-size: 14px;
                            color: rgb(189, 189, 189);
                        }
                    }

                }
            }
        }
    }
</style>
<script>
    import {
        readAPI
    } from '../../api/adr.js'
    export default {
        data() {
            return {
                light: true,
                show: false,
                reads: {}
            }
        },
        methods: {
            getCat() {
                let all = [
                    this.$axios.get(`${readAPI}/category-info?gender=male&type=hot&major=奇幻&start=0&limit=10`),
                    this.$axios.get(`${readAPI}/category-info?gender=female&type=hot&major=古代言情&start=0&limit=10`)
                ]

                this.$axios.all(all).then(this.$axios.spread((a, b, ) => {
                    this.reads = {
                        list_1: a.data.books,
                        list_2: b.data.books
                    }
                    this.show = true
                    localStorage.setItem('read', JSON.stringify({
                        list_1: a.data.books,
                        list_2: b.data.books
                    }))
                }))
            }
        },
        created() {

            let read = JSON.parse(localStorage.getItem('read')) || null
            if (read == undefined || read == null) {
                this.getCat()
            } else {
                this.reads = read
                this.show = true
            }
            console.log(this.reads);

            this.$store.commit('setType', {
                key: 3,
                text: '书籍'
            })
        }
    }
</script>
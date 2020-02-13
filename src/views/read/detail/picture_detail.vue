<template>
    <div class="book_detail">
        <top :title="title" :src="`../../public/images/${num}.jpg`" :isload="!show"></top>
        <div class="bg" v-if="show">
            <img :src="`../../public/images/${num}.jpg`" class="book_bgImg">
        </div>
        <transition enter-active-class="fadeIn" leave-active-class="fadeOutLeft">
            <main class="animated" v-if="show" @scroll="scrH">
                <div class="message clear">
                    <img :src="`${img_url}${book.cover}`" class="book_img">
                    <div class="book_m">
                        <h3 class="book_name">
                            {{book.title}}
                        </h3>
                        <p class="nick">作者:{{book.author}}</p>
                        <p class="cat">
                            <router-link class="tag" :to="`/search_box?word=${item}`" v-for="(item,i) in book.tags"
                                :key="i">
                                {{item}}
                            </router-link>
                        </p>
                        <p class="book_info text_m">
                            {{book.longIntro}}
                        </p>
                    </div>
                </div>
                <div class="book_about">
                    <div class="about">
                        <span class="about_item">
                            <i class="">{{book.wordCount | opCount(book.wordCount)}}</i>
                            字数
                        </span>
                        <span class="about_item">
                            <i class="">{{book.retentionRatio}}</i>
                            评分
                        </span>
                        <span class="about_item">
                            <i class="">{{book.latelyFollower | opCount(book.latelyFollower)}}</i>
                            粉丝数
                        </span>
                    </div>
                    <p class="pub_info">
                        版权说明:{{book.copyrightInfo}}
                    </p>
                    <div class="chap">
                        <span class="icon-list-numbered"></span>
                        <p class="last text">{{book.lastChapter | opText(book.lastChapter)}}</p>
                        <p class="updated">最近更新:{{book.updated | opDate(book.updated)}}</p>
                        <router-link to="/chapter/1" class="icon-chevron-thin-right"></router-link>
                    </div>
                </div>
                <div class="recommend">
                    <h4 class="rec_title">相关推荐</h4>
                    <a href="#" @click.prevent="changeBook(item._id)" class="rec_item" v-for="(item,i) in rec_list"
                        :key="item._id" v-show="i<list_num">
                        <img :src="`${img_url}${item.cover}`" class="rec_img">
                        <div class="rec_message">
                            <p class="rec_name">{{item.title}}</p>
                            <span class="rec_nick">作者:{{item.author}}</span>
                            <p class="rec_info text_m">{{item.shortIntro}}</p>
                        </div>
                    </a>
                    <div class="rec_getmore" v-if="bottom_show">
                        <span :class="{'getmore':true,'icon-books':list_num==9}" @click="bottom_getmore">...</span>
                    </div>
                </div>
                <div class="bottom">
                    <router-link to="" class="bottom_link">
                        <span class="icon-plus"></span>
                        加入书架
                    </router-link>
                    <router-link to="/picture/0" class="bottom_link" id="bottom_link">
                        <span class="icon-book"></span>
                        立即阅读
                    </router-link>
                </div>
            </main>

        </transition>
    </div>
</template>
<script>
import { log } from 'util'
    export default {
        data() {
            return {
                title:'漫画详情',
                scroll:0,
                id: null,
                num: 0,
                img_url: 'http://statics.zhuishushenqi.com',
                book: {},
                rec_list: [],
                list_num: 9,
                _id: null,
                show: false,
                bottom_show: true
            }
        },
        filters: {
            opCount(num) {
                return num / 10000 > 1 ? (num / 10000).toFixed(1) + '万' : num
            },
            opDate(str) {
                return str.split('T')[0]
            },
            opText(str) {
                return str.split('第')[1]
            }
        },
        watch: {
            'id'() {
                this.getData(this.id)
            }
        },
        methods: {
            getData(id) {
                this.show = false
                let all = [
                    this.$axios.get(`https://novel.juhe.im/book-info/${id}`),
                    this.$axios.get(`https://novel.juhe.im/book-sources?view=summary&book=${id}`),
                    this.$axios.get(`https://novel.juhe.im/recommend/${id}`)
                ]
                this.$axios.all(all).then(this.$axios.spread((a, b, c) => {
                    this.book = a.data
                    // console.log(c.data);
                    this.rec_list = c.data.books
                    this.show = true
                    this._id = b.data[0]._id
                    this.getChp(b.data[0]._id)
                }))
            },
            getChp(id) {
                this.$axios.get(`https://novel.juhe.im/book-chapters/${id}`).then(res => {
                    // console.log(res.data);
                    localStorage.setItem('picture_list', JSON.stringify({book:this.book,list:res.data.chapters}))
                })
            },
            bottom_getmore() {
                this.list_num = 100
                this.bottom_show = false
            },
            changeBook(id) {
                this.book.title = null
                this.id = id
                this.list_num = 9
                this.bottom_show = true
            },
            scrH(e){
               if(e.target.scrollTop>80){
                    this.title = this.book.title
               }else{
                  this.title = '漫画详情' 
               }
                  
            }
        },
        created() {
            this.num = parseInt(Math.random() * 5 + 1)
            this.id = this.$route.params.id
        }
    }
</script>
<style scoped lang="scss">
    #load {
        position: fixed;
        top: 55px;
        left: 45%;
    }

    .book_detail {
        width: 100%;
        height: 100%;
        padding-top: 45px;
        box-sizing: border-box;
        position: relative;
        .bg {
            width: 100%;
            position: absolute;
            top: 0;

            .book_bgImg {
                width: 100%;
            }
        }

        main::-webkit-scrollbar {
            display: none;
        }

        main {
            width: 100%;
            height: 100%;
            position: absolute;
            padding-bottom: 45px;
            overflow: auto;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.466);

            .bottom {
                width: 100%;
                height: 45px;
                display: flex;
                position: fixed;
                left: 0;
                bottom: 0;
                z-index: 20;
                border-top: 1px solid rgb(0, 0, 0);
                background-color: rgba(7, 7, 7, 0.726);

                .bottom_link {
                    flex: 1;
                    text-align: center;
                    font-size: 16px;
                    line-height: 45px;
                    position: relative;
                    color: rgb(163, 163, 163);
                    span {
                        font-size: 18px;
                        position: absolute;
                        line-height: 45px;
                        left: 18%;
                    }
                }

                #bottom_link {
                    color: rgb(202, 202, 202);
                }
            }

            .message {
                width: 100%;
                padding: 20px 12px;
                box-sizing: border-box;
                .book_img {
                    width: 30%;
                    float: left;
                }

                .book_m {
                    float: right;
                    width: 60%;

                    .book_name {
                        font-size: 20px;
                        line-height: 25px;
                        color: rgb(189, 189, 189);
                    }

                    .nick {
                        width: 100%;
                        line-height: 20px;
                        font-size: 14px;
                        color: rgb(2, 219, 248);
                        margin-bottom: 8px;
                    }

                    .cat {
                        width: 100%;
                        margin-bottom: 10px;
                        height: 40px;

                        .tag {
                            margin-right: 10px;
                            line-height: 20px;
                            font-size: 15px;
                            color: rgb(189, 189, 189);
                        }
                    }

                    .book_info {
                        line-height: 25px;
                        color: rgb(187, 187, 187);
                        -webkit-line-clamp: 2;
                    }
                }
            }

            .book_about {
                width: 100%;
                padding-top: 35px;
                padding-bottom: 5px;
                background-color: rgba(5, 5, 5, 0.418);
                .about {
                    width: 85%;
                    height: 40px;
                    display: flex;
                    margin: 0 auto;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgb(2, 2, 2);

                    .about_item {
                        flex: 1;
                        text-align: center;
                        color: rgb(179, 179, 179);
                        i {
                            display: block;
                            width: 100%;
                            text-align: center;
                            line-height: 20px;
                            font-style: normal;
                        }
                    }
                }

                .pub_info {
                    width: 85%;
                    line-height: 20px;
                    margin: 10px auto;
                    padding: 15px 0 25px;
                    border-bottom: 1px #333 dashed;
                    box-sizing: border-box;
                    color: rgb(158, 157, 157);
                }

                .chap {
                    width: 100%;
                    height: 70px;
                    text-align: center;
                    position: relative;
                    padding: 15px 25px;
                    box-sizing: border-box;
                    color: rgb(216, 216, 216);
                    font-size: 15px;
                    background-color: rgba(0, 0, 0, 0.15);
                    .last {
                        width: 70%;
                        margin: 0 auto;
                        height: 25px;
                        line-height: 25px;
                    }

                    .updated {
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        color: rgb(230, 228, 228);
                    }

                    .icon-chevron-thin-right {
                        font-size: 24px;
                        position: absolute;
                        right: 35px;
                        top: 17%;
                        line-height: 45px;
                        color: rgb(214, 214, 214);
                    }

                    .icon-list-numbered {
                        font-size: 24px;
                        position: absolute;
                        left: 35px;
                        line-height: 45px;
                    }
                }
            }

            .recommend {
                width: 100%;
                position: relative;
                padding-bottom: 45px;
                background-color: rgba(255, 255, 255, 0.123);
                .rec_title {
                    font-size: 18px;
                    line-height: 35px;
                    padding-left: 12px;
                    box-sizing: border-box;
                    color: rgb(233, 231, 231);
                }

                .rec_item {
                    display: block;
                    width: 96%;
                    margin: 2%;
                    height: 140px;
                    padding-right: 5px;
                    box-sizing: border-box;
                    background-color: rgba(0, 0, 0, 0.411);
                    border-radius: 6px;
                    .rec_img {
                        height: 100%;
                        float: left;
                        border-radius: 6px;
                    }

                    .rec_message {
                        float: right;
                        width: 65%;

                        .rec_name {
                            width: 100%;
                            height: 35px;
                            line-height: 35px;
                            display: block;
                            color: rgb(212, 212, 212);
                            font-size: 16px;
                        }

                        .rec_nick {
                            display: block;
                            width: 100%;
                            line-height: 30px;
                            font-size: 14px;
                            color: rgb(179, 179, 179);
                        }

                        .rec_info {
                            line-height: 25px;
                            -webkit-line-clamp: 2;
                            font-size: 13px;
                            color: rgb(121, 121, 121);
                        }
                    }
                }

                .rec_getmore {
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;

                    .getmore {
                        line-height: 35px;
                        font-size: 24px;
                    }
                }
            }
        }

        .book_detail::-webkit-scrollbar {
            display: none;
        }
    }
</style>
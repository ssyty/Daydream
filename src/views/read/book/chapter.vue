<template>
    <div class="chapter">
        <top :title="book.title" :isload="!show"></top>
        <main v-if="show">
            <warning :noLogIn="noLogIn" />
            <div class="title">最近更新内容</div>
            <div class="updata">
                <p class="up_chap text">{{book.lastChapter}}</p>
                <span class="date">{{book.updated | opDate(book.updated)}}</span>
            </div>
            <div class="title">正文卷</div>
            <router-link :to="`${to_detail+i}`" class="chap_link text" v-for="(item,i) in chapters.list"
                :key="i">
                {{item.title}}
            </router-link>
            <div class="bottom">
                    <div class="bottom_link" @click="addBox(book._id)">
                        <span class="icon-plus"></span>
                        加入书架
                    </div>
                    <router-link :to="`${to_detail}0`" class="bottom_link" id="bottom_link">
                        <span class="icon-book"></span>
                        立即阅读
                    </router-link>
            </div>
            <transition enter-active-class="tada" leave-active-class="bounceOut">
                    <router-link class="already animated" to="/home/my_booklist" v-if="already.key">
                        {{already.text}}
                    </router-link>
            </transition>
        </main>
    </div>
</template>
<script>
    import {
        log
    } from 'util';
    export default {
        data() {
            return {
                to_detail:'/text/',
                chapters: {
                    num: 30,
                    list: []
                },
                book: {},
                show_list: [],
                show: false,
                already: {
                    key: false,
                    text: '添加成功!'
                },
                noLogIn:false
            }
        },
        watch: {},
        filters: {
            opDate(str) {
                let d = str.split('T')[0]
                let h = str.split('T')[1].split(':')[0]
                let m = str.split('T')[1].split(':')[1]
                return `${d} ${h}:${m}`
            }
        },
        methods: {
            getData() {
                if(this.$route.params.type==0){
                this.to_detail = '/text/'
                this.chapters.list = JSON.parse(localStorage.getItem('book_list')).list
                this.book = JSON.parse(localStorage.getItem('book_list')).book
                }else {
                this.to_detail = '/picture/'
                this.chapters.list = JSON.parse(localStorage.getItem('picture_list')).list
                this.book = JSON.parse(localStorage.getItem('picture_list')).book
               }
                this.show = true
            },
            addBox(id){
                if (!this.$store.state.isLogin) {
                    this.noLogIn = true
                    setTimeout(() => {
                        this.noLogIn = false
                    },  1800);
                } else {
                    let booklist = JSON.parse(localStorage.getItem('mybooklist')) || []
                    let isAdd = booklist.findIndex(ele => {
                        return ele.book._id == id
                    });
                    if (isAdd == -1) {
                        booklist.unshift(JSON.parse(localStorage.getItem('book_list')))
                        localStorage.setItem('mybooklist', JSON.stringify(booklist))
                        this.already = {
                            key: true,
                            text: '添加成功!'
                        }
                    } else {
                        this.already = {
                            key: true,
                            text: '亲,添加过了哦!请前往我的书架查看'
                        }
                    }
                    setTimeout(() => {
                        this.already = {
                            key: false,
                            text: '亲,添加过了哦!请前往我的书架查看'
                        }
                    }, 2000);
                }
            }
        },
        created() {
            this.getData()
            
        }
    }
</script>
<style scoped lang="scss">
    #load {
        position: absolute;
        top: 15px;
        left: 43%;
    }

    .chapter {
        width: 100%;
        height: 100%;
        padding-top: 45px;
        box-sizing: border-box;

        .top {
            width: 100%;
            height: 45px;
            background-color: rgba(250, 250, 250, 0.301);
            text-align: center;
            line-height: 45px;
            font-size: 16px;
            position: fixed;
            top: 0;

            .icon-bookmarks {
                font-size: 26px;
                position: absolute;
                line-height: 45px;
                right: 15px;
                color: rgb(3, 101, 182);
            }

            .icon-arrow_back_ios {
                font-size: 24px;
                color: #333;
                line-height: 45px;
                position: absolute;
                left: 12px;
            }
        }

        .bottom {
            width: 100%;
            height: 45px;
            display: flex;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 20;
            border-top: 1px solid rgb(0, 0, 0);
            background-color: rgba(5, 5, 5, 0.568);

            .bottom_link {
                flex: 1;
                text-align: center;
                font-size: 16px;
                line-height: 45px;
                position: relative;
                color: rgb(180, 180, 180);
                span {
                    font-size: 18px;
                    position: absolute;
                    line-height: 45px;
                    left: 18%;
                }
            }

            #bottom_link {
                color: rgb(209, 209, 209);
            }
        }
         .already {
                width: 44%;
                background-color: rgba(255, 255, 255, 0.657);
                position: fixed;
                left: 28%;
                bottom: 120px;
                line-height: 30px;
                border-radius: 6px;
                text-align: center;
                font-size: 16px;
                color: rgb(61, 61, 61);
            }
        main::-webkit-scrollbar {
            display: none;
        }

        main {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.39);
            height: 100%;
            padding-bottom: 45px;
            box-sizing: border-box;
            overflow: auto;

            .title {
                font-size: 14px;
                color: rgb(190, 190, 190);
                padding: 0 15px;
                line-height: 35px;
                margin-bottom: 15px;
                background-color: rgba(224, 224, 224, 0.109);
            }

            .updata {
                width: 100%;
                height: 65px;
                padding: 0 15px;
                box-sizing: border-box;
                background-color: rgba(0, 0, 0, 0.109);
                margin-bottom: 15px;
                .up_chap {
                    font-size: 16px;
                    line-height: 35px;
                    width: 100%;
                    color: rgb(116, 116, 116);
                }

                .date {
                    font-size: 14px;
                    color: rgb(206, 206, 206);
                    line-height: 20px;
                }
            }

            .chap_link {
                width: 90%;
                display: block;
                height: 45px;
                line-height: 45px;
                color: rgb(179, 179, 179);
                background-color: rgba(255, 255, 255, 0.171);
                font-size: 15px;
                margin: 0 auto 15px;
                border-radius: 5px;
                padding-left: 15px;
                box-sizing: border-box;
                border-bottom: 1px solid rgb(216, 216, 216);
            }
        }
    }
</style>
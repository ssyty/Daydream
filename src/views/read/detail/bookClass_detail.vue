<template>
    <div class="bookClass_detail">
        <top :isload="!show" :title="title"></top>
        <main>
            <ul class="nav_left" v-if="show">
                <li :class="{'nav_item':true,'light':i==light}" @click="getClassData(i,0)" v-for="(item,i) in cat_list" :key="i">
                    {{item.major}}
                </li>
            </ul>
            <transition enter-active-class="fadeIn" leave-active-class="rotateOutUpRight">
                <div class="body animated" v-if="body_show" @scroll="loadMore">
                <div class="body_title">
                    {{cat_list[light].major}}
                </div>
                <ul class="book_list">
                    <router-link
                    :to="`/book_detail/${item._id}`"
                    tag="li"
                    v-for="(item,i) in book_list.books"
                    :key="i"
                    class="item">
                    <img :src="`http://statics.zhuishushenqi.com${item.cover}`" class="item_img">
                    <div class="item_mess">
                        <p class="name text">{{item.title}}</p>
                        <p class="author text">{{item.author}}-{{item.majorCate}}</p>
                        <p class="book_info text_m">{{item.shortIntro}}</p>
                    </div>
                    </router-link>
                </ul>
            </div>
            </transition>
        </main>
    </div>
</template>
<style scoped lang="scss">
    .bookClass_detail {
        width: 100%;
        height: 100%;
        padding-top: 45px;
        box-sizing: border-box;
        position: relative;

        main {
            width: 100%;
            height: 100%;

            .nav_left::-webkit-scrollbar {
                display: none;
            }

            .nav_left {
                padding: 15px 0 25px 8px;
                overflow: auto;
                box-sizing: border-box;
                width: 20%;
                height: 100%;
                float: left;

                .nav_item {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: rgb(236, 236, 236);
                    background-color: rgba(255, 255, 255, 0.24);
                    transition: all 0.2s linear;
                    border-radius: 3px;
                }
                .light {
                    color: rgb(71, 0, 0);
                }
            }
            .body::-webkit-scrollbar {
                display:none;
            }
            .body {
                width: 76%;
                float: right;
                height: 94%;
                overflow: auto;
                position: relative;
                background-color: rgba(255, 255, 255, 0.253);
                margin: 3% 2%;
                padding: 5px 8px;
                box-sizing: border-box; 
                border-radius: 3px;
                .body_title {
                    font-size: 17px;
                    line-height: 35px;
                    margin-bottom: 15px;
                    color: rgb(209, 209, 209);
                }
                .book_list {
                    width: 100%;
                    padding-right: 12px;
                    .item {
                        width: 100%;
                        height: 105px;
                        box-sizing: border-box;
                        background-color: rgba(14, 13, 13, 0.13);
                        border-radius: 6px;
                        margin-bottom: 15px;
                        .item_img {
                            height: 100%;
                            width: 75px;
                            float: left;
                            margin-right: 15px;
                            border-radius: 6px;
                        }
                        .item_mess {
                            float: left;
                            width: 60%;
                            height: 100%;
                            .name {
                                width: 100%;
                                font-size: 17px;
                                color: rgb(218, 218, 218);
                                line-height: 30px;
                            }
                            .author {
                                width: 100%;
                                font-size: 15px;
                                color: rgb(92, 1, 1);
                                margin-bottom: 5px;
                            }
                            .book_info {
                                width: 100%;
                                line-height: 20px;
                                font-size: 14px;
                                color: rgb(173, 173, 173);
                                -webkit-line-clamp: 2;
                            }
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
    } from '../../../api/adr'
    export default {
        data() {
            return {
                cat: this.$route.params.cat,
                show: false,
                body_show:false,
                start: 0,
                title:'',
                book_list: {
                    books: []
                },
                cat_list: [],
                light:0
            }
        },
        watch: {},
        computed:{
            'load_more'(){
                return 120*this.book_list.books.length-600
            }
        },
        methods: {
            getData(cat) {
                this.$axios.get(`${readAPI}/sub-categories`).then(res => {
                    if (this.cat == 'male') {
                        this.title = '男生'
                        this.cat_list = res.data.male
                    } else if (this.cat == 'female') {
                        this.title = '女生'
                        this.cat_list = res.data.female
                    } else if (this.cat == 'picture') {
                        this.title = '漫画'
                        this.cat_list = res.data.picture
                    } else if (this.cat == 'press') {
                        this.title = '刊物杂志'
                        this.cat_list = res.data.press
                    }
                    this.getClassData(0)
                    this.show = true
                })
            },
            getClassData(index, s) {
                this.light = index
                
                let major = this.cat_list[index].major || 0
                if(s==0){
                    this.start = 0
                    this.book_list = {
                        books:[]
                    }
                    this.body_show = false
                }
                this.$axios.get(
                        `${readAPI}/category-info?gender=${this.cat}&type=hot&major=${major}&start=${this.start}&limit=${this.start+20}`)
                    .then(res => {
                        this.start = res.data.books.length
                        this.book_list.books = [...this.book_list.books, ...res.data.books]
                        this.body_show = true
                    })
            },
            loadMore(){
                if(event.target.scrollTop==this.load_more){
                    this.getClassData(this.light)
                }
                
            }
        },
        created() {
            this.getData(this.cat)
        },
        mounted() {}
    }
</script>
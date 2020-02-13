<template>
        <div class="search_box">
            <transition enter-active-class="shake" leave-active-class="zoomOut">
                <div class="warn_box animated" v-if="warning.show">
                    <div class="warn">
                        <span class="icon-not_interesteddo_not_disturb"></span>
                        {{warning.text}}
                    </div>
                </div>
            </transition>
            <div class="ser_top">
                <input type="text" v-model="words" autofocus="autofocus" placeholder="搜索">
                <a href="#" class="icon-search2" @click.prevent="getResult"></a>
            </div>
            <main>
                <div class="histry" v-if="tags.show">
                <h4 class="h_title">搜索历史<span class="clear_h" @click="clearHistry">清空历史</span></h4>
                <p class="h_tags clear">
                    <router-link :to="`/result/${item.type}/${item.text}`" class="h_tag" v-for="(item,i) in tags.list" :key="i" @click="closeBox">{{item.text}}</router-link>
                </p>
            </div>
            <div class="hot_ser" v-if="$store.state.type.key==3||$store.state.type.key==0">
                <h3 class="hot_title">热搜榜-书籍</h3>
                <ul class="hot_list">
                    <router-link :to="`/book_detail/${item._id}`" tag="li" class="hot_item" v-for="(item,i) in hot_read" :key="item._id">
                        <span class="num">{{i+1}}</span><p class="item_name">{{item.title}}----{{item.author}}</p>
                    </router-link>
                </ul>
            </div>
            <div class="hot_ser" v-if="$store.state.type.key==1||$store.state.type.key==0">
                <h3 class="hot_title">热搜榜-电影</h3>
                <ul class="hot_list">
                    <router-link :to="`/film_detail/${item.id}`" tag="li" class="hot_item" v-for="(item,i) in hot_film" :key="item._id">
                        <span class="num">{{i+1}}</span><p class="item_name">{{item.title}}</p>
                    </router-link>
                </ul>
            </div>
            <div class="hot_ser" v-if="$store.state.type.key==2||$store.state.type.key==0">
                <h3 class="hot_title">热搜榜-音乐</h3>
                <ul class="hot_list">
                    <router-link :to="`/song_detail/${item.id}`" tag="li" class="hot_item" v-for="(item,i) in hot_music" :key="item._id">
                        <span class="num">{{i+1}}</span><p class="item_name">{{item.searchWord}}</p>
                    </router-link>
                </ul>
            </div>
            </main>
            <div class="close" @click="$router.go(-1)">
                返回
            </div>
        </div>
</template>
<script>
    export default {
        data() {
            return {
                words: '',
                type: this.$store.state.type.key,
                warning: {
                    text: '无法知道你想要的结果',
                    show: false
                },
                hot_film:JSON.parse(localStorage.getItem('now')).subjects.slice(0,10),
                hot_read:JSON.parse(localStorage.getItem('hot_read')).slice(0,10),
                hot_music:JSON.parse(localStorage.getItem('hot_music')).slice(0,10)
            }
        },
        watch: {
            'warning.show'(newval) {
                if (newval) {
                    setTimeout(() => {
                        this.warning.show = false
                    }, 2000)
                }
            },
            '$route.path'(){
                this.closeBox()
            }
        },
        computed:{
            "tags"(){
                let hc = JSON.parse(localStorage.getItem('histry'))
                if(hc==null){
                    return {show:false,list:[]}
                }
                return {list:JSON.parse(localStorage.getItem('histry')),show:true}
            }
        },
        methods: {
            getResult() {
                if (this.words == '') {
                    this.warning = {
                        text: '无法知道你想要的结果',
                        show: true
                    }
                } else {
                    this.$router.push(`/result/${this.type}/${this.words}`)
                    let arr = JSON.parse(localStorage.getItem('histry')) || []
                    arr.unshift({type:this.type,text:this.words})
                    localStorage.setItem('histry',JSON.stringify(arr))
                    this.$store.commit('setSearchBox', false)
                    this.words = ''
                }
            },
            clearHistry() {
                localStorage.removeItem('histry')
            },
            closeBox() {
                
            }
        },
        created() {
        },
        mounted() {

        }
    }
</script>
<style scoped lang="scss">
    .search_box {
        width: 100%;
        height: 100%;
        padding: 55px 0;
        box-sizing: border-box;
        background-color: rgba(3, 3, 3, 0.24);
        position: absolute;
        top: 0;
        z-index: 1000;
        main::-webkit-scrollbar {
            display: block;
        }
        main {
            width: 100%;
            height: 100%;
            overflow: auto;
        }

        .warn_box {
            width: 100%;
            height: 75px;
            position: absolute;
            top: 45px;
        }

        .warn {
            width: 50%;
            height: 75px;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 0.274);
            border-radius: 6px;
            font-size: 15px;
            text-align: center;
            line-height: 35px;
            color: rgb(209, 208, 208);

            .icon-not_interesteddo_not_disturb {
                display: block;
                font-size: 26px;
                width: 100%;
                text-align: center;
                line-height: 35px;
            }
        }

        .close {
            width: 90%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            font-size: 17px;
            border-radius: 17px;
            position: absolute;
            bottom: 12px;
            left: 5%;
            color: rgb(105, 105, 105);
            background-color: rgba(255, 254, 254, 0.075);
        }

        .ser_top {
            width: 100%;
            height: 55px;
            padding-top: 10px;
            position: absolute;
            top: 0;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 0);

            .icon-search2 {
                font-size: 24px;
                position: absolute;
                top: 15px;
                left: 8%;
                color: rgb(218, 218, 218);
            }

            input {
                display: block;
                width: 86%;
                height: 35px;
                margin: 0 auto;
                box-sizing: border-box;
                color: rgb(240, 240, 240);
                text-align: center;
                background-color: rgba(255, 255, 255, 0);
                font-size: 18px;
            }
        }

        .histry {
            width: 95%;
            margin: 0 auto;
            overflow: hidden;

            .h_title {
                width: 100%;
                height: 25px;
                line-height: 25px;
                color: rgb(224, 224, 224);
                font-size: 16px;
                font-weight: 400;
                position: relative;

                .clear_h {
                    position: absolute;
                    right: 10px;
                    color: rgb(184, 184, 184);
                    font-size: 14px;
                }

            }

            .h_tags {
                width: 100%;
                margin-top: 15px;

                .h_tag {
                    float: left;
                    padding: 0 15px;
                    line-height: 20px;
                    background-color: rgba(246, 246, 246, 0.301);
                    margin: 0 0 5px 10px;
                    border-radius: 10px;
                    color: rgb(238, 238, 238);
                }
            }
        }

        .hot_ser {
            width: 100%;
            padding: 15px 12px 0;
            box-sizing: border-box;

            .hot_title {
                width: 100%;
                height: 35px;
                line-height: 35px;
                box-sizing: border-box;
                font-size: 16px;
                color: rgb(221, 221, 221);
            }
            .hot_list {
                width: 100%;
                padding: 0 12px;
                box-sizing: border-box;
                .hot_item {
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    display: flex;
                    color: #999;
                    .num {
                        flex: 1;
                    }
                    .item_name {
                        flex: 9;
                    }
                }
            }
        }
    }
</style>
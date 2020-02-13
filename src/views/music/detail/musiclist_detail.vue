<template>
    <div class="music_detail">
        <top :title="title" :src="topImg" :isload="!show"></top>
        <div class="bg" v-if="show">
            <img :src="playlist.creator.backgroundUrl" alt="" class="bg_img">
        </div>
        <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
            <main v-if="show" @scroll="scrollTop">
                <div class="mess">
                    <h3 class="list_name text_m">{{playlist.name}}</h3>
                    <div class="nick">
                        <div class="nick_imgBox">
                            <img :src="playlist.coverImgUrl" class="nick_img">
                        </div>
                        <span class="nickname">{{playlist.creator.nickname}}</span>
                    </div>
                    <div class="uptated">
                        最近更新:{{playlist.updateTime | opdate(playlist.updateTime)}}
                    </div>
                    <p class="discription text_m">
                        {{playlist.description}}
                    </p>
                    <div class="methods">
                        <a href="#" class="me_item icon-comments-o"></a>
                        <a href="#" class="me_item icon-favorite_outline"></a>
                        <a href="#" class="me_item icon-save_alt"></a>
                        <a href="#" class="me_item icon-checkmark"></a>
                    </div>
                </div>
                <div class="body">
                    <div class="body_title">
                        <a href="#" class="icon-play2"></a>
                        <h3 class="title_h">
                            播放全部
                            <span class="song_num">(共{{playlist.trackCount}}首歌)</span>
                        </h3>
                    </div>
                    <ul class="songList">
                        <li class="item_link" v-for="(item,i) in playlist.tracks" :key="item.id">
                            <i class="item_num">{{i+1}}</i>
                            <p class="item_name" @click="playSong(item.id,i)">
                                <span
                                    class="songname text">{{item.name}}{{item.alia.length==0?'':`(${item.alia[0]})`}}</span>
                                <span class="text">{{item.ar[0].name}}-{{item.al.name}}</span>
                            </p>
                            <div class="item_me"></div>
                        </li>
                    </ul>
                </div>
            </main>
        </transition>
    </div>
</template>
<script>
    import {
        musicAPI
    } from '../../../api/adr.js'
    export default {
        data() {
            return {
                topImg:'',
                title: '歌单',
                show: false,
                playlist: {}
            }
        },
        watch: {},
        filters: {
            opdate(num) {
                let time = new Date(num);
                let y = time.getFullYear();
                let mon = time.getMonth() + 1;
                let day = time.getDate();
                let h = time.getHours();
                let min = time.getMinutes();
                let s = time.getSeconds();
                return `${y}年${mon}月${day}日 ${h}:${min}:${s}`
            }
        },
        methods: {
            getData(id) {
                this.$axios.get(`${musicAPI}/playlist/detail?id=${id}`).then(res => {
                   
                    this.playlist = res.data.playlist
                    this.topImg = this.playlist.creator.backgroundUrl
                    this.show = true
                })
            },
            playSong(id,i) {
                this.$store.commit('setMusicList',this.playlist.tracks)
                this.$store.commit('setSongId', id)
                this.$store.commit('setIndex',i)
                this.$store.commit('isPlay')
                this.$store.commit('setMusicBox', true)
            },
            scrollTop(e) {
                if (e.target.scrollTop > 80) {
                    this.title = this.playlist.name
                } else {
                    this.title = '歌单'
                }
            }
        },
        created() {
            this.getData(this.$route.params.id)
        }
    }
</script>
<style scoped lang="scss">
    .load {
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
    }

    .music_detail {
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 45px;
        box-sizing: border-box;
        .bg {
            width: 100%;
            height: 260px;
            position: absolute;
            top: 0;
            .bg_img {
                width: 100%;
            }
        }
        main::-webkit-scrollbar {
            display: none;
        }
        main {
            width: 100%;
            height: 100%;
            overflow: auto;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.335);
            top: 45px;
            z-index: 5;
            .mess {
                width: 100%;
                padding: 15px 12px 0;
                box-sizing: border-box;

                .list_name {
                    line-height: 30px;
                    width: 100%;
                    color: rgb(223, 223, 223);
                    font-size: 20px;
                    font-weight: normal;
                    -webkit-line-clamp: 2;
                }

                .nick {
                    width: 100%;
                    height: 45px;
                    display: flex;

                    .nick_imgBox {
                        flex: 1;

                        .nick_img {
                            width: 35px;
                            height: 35px;
                            margin: 5px auto;
                            border-radius: 50%;
                        }
                    }

                    .nickname {
                        line-height: 45px;
                        color: #fff;
                        flex: 8;
                        font-size: 16px;
                    }
                }

                .uptated {
                    width: 100%;
                    line-height: 25px;
                    font-size: 14px;
                    color: rgb(3, 190, 165);
                }

                .discription {
                    margin-top: 10px;
                    width: 100%;
                    line-height: 25px;
                    color: rgb(200, 200, 200);
                    -webkit-line-clamp: 2;
                }

                .methods {
                    display: flex;
                    width: 100%;
                    height: 45px;
                    margin-top: 15px;

                    .me_item {
                        flex: 1;
                        font-size: 26px;
                        color: rgb(235, 235, 235);
                        text-align: center;
                        line-height: 45px;
                    }
                }
            }

            .body {
                width: 100%;
                border-radius: 15px 15px 0 0;
                background-color: rgba(204, 204, 204, 0.904);
                .body_title {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 35px;
                    position: relative;
                    color: rgb(29, 29, 29);

                    .icon-play2 {
                        position: absolute;
                        font-size: 18px;
                        line-height: 40px;
                        left: 8px;
                        color: rgb(31, 31, 31);
                    }

                    .title_h {
                        font-weight: 400;
                    }

                    .song_num {
                        font-size: 14px;
                        color: rgb(87, 86, 86);
                        font-weight: 400;
                        line-height: 40px;
                    }
                }

                .songList {
                    width: 100%;
                    padding: 0 12px;
                    box-sizing: border-box;

                    .item_link {
                        width: 100%;
                        display: flex;
                        height: 45px;
                        color: rgb(70, 70, 70);
                        margin-top: 15px;

                        .item_num {
                            flex: 1;
                            line-height: 45px;
                            font-size: 16px;
                            font-style: normal;
                            text-align: center;
                            color: rgb(105, 105, 105);
                        }

                        .item_name {
                            flex: 6;

                            span {
                                display: block;
                                width: 210px;
                                line-height: 22px;
                                font-size: 13px;
                                color: rgb(85, 85, 85);
                            }

                            .songname {
                                font-size: 16px;
                                color: rgb(10, 10, 10);
                            }
                        }

                        .item_me {
                            flex: 2;
                        }
                    }
                }
            }
        }
    }
</style>
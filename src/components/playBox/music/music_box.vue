<template>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <div class="music_playBox animated">
            <div class="top">
                <span class="icon-arrow_back_ios top_close" @click="closeBox"></span>
                <p class="song_title text">{{$store.state.musicList[$store.state.index].name}}</p>
            </div>
            <main id="main" @click="box_show=!box_show">
                <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
                    <div class="main_show animated" v-show="!box_show">
                                <div class="top_songname">
                                    <p class="songer_name text">
                                        {{$store.state.musicList[$store.state.index].ar[0].name}}
                                    </p>
                                </div>
                                <div class="song_img_box">
                                    <song-box :bg_img="$store.state.musicList[$store.state.index].al.picUrl" :running="!$store.state.audio.paused"></song-box>
                                </div>
                                <div class="main_met_box">
                                    <p class="single_lrc text">
                                        {{$store.state.songLrc[$store.state.current>0?$store.state.current-1:0].lrc}}
                                    </p>
                                    <div class="methods">
                                        <div class="me-item icon-favorite_outline"></div>
                                        <div class="me-item icon-comments-o"></div>
                                        <div class="me-item icon-folder-download"></div>
                                        <div class="me-item icon-plus1"></div>
                                    </div>
                                </div>
                    </div>
                </transition>
                <lrc-box v-show="box_show"></lrc-box> 
            </main>
            <music-list v-show="$store.state.musicList_show"></music-list>
            <div class="footer">
                <div class="pro_box">
                    <span class="time_left">{{time}}</span>
                    <van-slider v-model="value" @change="onChange" bar-height="3px" active-color="rgba(194, 193, 193, 0.856)" class="lang">
                        <div slot="button" class="custom-button"></div>
                    </van-slider>
                    <span
                        class="time_right">{{$store.state.musicList[$store.state.index].dt | opdate($store.state.musicList[$store.state.index].dt)}}</span>
                </div>
                <div class="bottom_box">
                    <a :class="{'play_cle':true,'icon-repeat':$store.state.loop==0,'icon-shuffle1':$store.state.loop==1,'icon-repeat_one':$store.state.loop==2}"
                        @click.prevent="changeLoop"></a>
                    <a class="play_pev icon-skip-back" @click="changeSong(false)"></a>
                    <a :class="{'play_col':true,'icon-play2':$store.state.audio.paused,'icon-pause':!$store.state.audio.paused}"
                        @click.prevent="playSong"></a>
                    <a class="play_pev icon-skip-forward" @click.prevent="changeSong(true)"></a>
                    <a class="icon-playlist_play" @click.prevent="$store.commit('showMusicList',true)"></a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {
        musicAPI
    } from '../../../api/adr.js'
    import {
        log
    } from 'util'
    export default {
        data() {
            return {
                box_show: false,
                value:0
            }
        },
        filters: {
            opdate(str) {
                let s = str / 1000
                return `${parseInt(s/60)>9?parseInt(s/60):'0'+parseInt(s/60)}:${parseInt(s%60)>9?parseInt(s%60):'0'+parseInt(s%60)}`
            }
        },
        computed: {
            'time'() {
                let s = this.$store.state.time
                return `${parseInt(s/60)>9?parseInt(s/60):'0'+parseInt(s/60)}:${parseInt(s%60)>9?parseInt(s%60):'0'+parseInt(s%60)}`
            },
            'songId'() {
                return this.$store.state.songId
            }
        },
        watch: {
            'songId'() {
                this.getData(this.songId)
            },
            '$store.state.index'(newval) {
                this.$store.commit('setSongId', this.$store.state.musicList[newval].id)
            },
            '$store.state.time'(){
                let c = parseInt(this.$store.state.time)
                let s = parseInt(this.$store.state.musicList[this.$store.state.index].dt / 1000)
                this.value =  c / s * 100
            }
        },
        methods: {
            getData(id) {
                this.playSong()
                this.$axios.get(`${musicAPI}/song/url?id=${id}`).then(res => {
                    this.$store.commit('getSongUrl', res.data.data[0].url)
                    this.playSong()
                    this.$store.commit('setTime', 0)
                    this.$store.commit('setTimeIndex', 0)
                    this.playSong()
                })
                let arr = JSON.parse(localStorage.getItem('mylistens')) || []
                arr.unshift(this.$store.state.musicList[this.$store.state.index])
                console.log(1);
                
                localStorage.setItem('mylistens',JSON.stringify(arr))
            },
            changeSong(e) {
                if (e) {
                    this.$store.commit('setIndex', ++this.$store.state.index)
                } else {
                    this.$store.commit('setIndex', ++this.$store.state.index)
                }

            },
            playSong() {
                this.$store.commit('isPlay')
            },
            changeLoop() {
                if (this.$store.state.loop < 2) {
                    this.$store.commit('setLoop', ++this.$store.state.loop)
                } else {
                    this.$store.commit('setLoop', 0)
                }
            },
            closeBox() {
                this.$store.commit('setMusicBox', false)
                this.$store.commit('showMusicList', false)
            },
            currentIndex(e) {
                this.$store.commit('setIndex', e)
            },
            onChange() {

            }
        },
        created() {
            
            
        },
        mounted() {
            
        }
    }
</script>
<style scoped lang="scss">
    .music_playBox {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1000;
        top: 0;
        background-size: auto 100%;
        background-position: center;
        background-color: rgba(44, 44, 44, 0.356);
        padding: 45px 0 155px;
        box-sizing: border-box;
    }

    .top {
        height: 45px;
        width: 100%;
        color: #fff;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        line-height: 45px;
        .top_close {
            font-size: 26px;
            color: rgb(226, 226, 226);
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }

        .song_title {
            width: 100%;
            font-size: 18px;
            color: rgb(228, 228, 228);
            text-align: center;
            padding: 0 30px;
            box-sizing: border-box;
        }
    }

    main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;

        .main_met_box {
            width: 100%;
            height: 100px;
            position: absolute;
            bottom: 0;
        }

        .methods {
            width: 100%;
            height: 55px;
            display: flex;

            .me-item {
                flex: 1;
                font-size: 28px;
                text-align: center;
                line-height: 55px;
                color: rgb(202, 202, 202);
            }
        }

        .lrc_top {
            width: 100%;
            height: 55px;
            position: absolute;
            top: 7%;
            background-image: linear-gradient(rgba(158, 158, 158, 0.411), rgba(149, 149, 149, 0));
        }

        .lrc_bottom {
            width: 100%;
            height: 55px;
            position: absolute;
            bottom: 23%;
            background-image: linear-gradient(rgba(116, 116, 116, 0), rgba(187, 187, 187, 0.644));
        }

        .main_show {
            width: 100%;
            height: 100%;
            position: relative;

            .single_lrc {
                width: 80%;
                height: 45px;
                line-height: 45px;
                margin: 0 auto;
                text-align: center;
                font-size: 16px;
                color: rgb(158, 157, 157);
            }

            .top_songname {
                width: 100%;
                height: 70px;
            }

            .songer_name {
                font-size: 16px;
                width: 80%;
                margin: 0 auto;
                line-height: 35px;
                text-align: center;
                color: rgb(219, 219, 219);
            }

            .song_img_box {
                width: 100%;
                height: 255px;
                position: absolute;
                top: 75px;
            }
        }

    }

    .footer {
        width: 100%;
        height: 155px;
        position: absolute;
        bottom: 0;
        .pro_box {
            width: 100%;
            height: 30%;
            position: relative;
            span {
                font-size: 12px;
                font-weight: 200;
                color: rgb(216, 216, 216);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }

            .time_left {
                left: 6px;
            }

            .time_right {
                right: 6px;
            }

            .lang {
                width: 75%;
                background-color: rgba(75, 75, 75, 0.856);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                border-radius: 2px;
                .custom-button {
                    width: 12px;
                    height: 12px;
                    background-color: #fff;
                    border-radius: 50%;
                }
            }
        }

        .bottom_box {
            width: 100%;
            height: 70%;
            box-sizing: border-box;
            position: relative;

            a {
                float: left;
                width: 20%;
                text-align: center;
                margin-top: 12%;
            }

            .icon-playlist_play {
                font-size: 34px;
                color: rgb(54, 54, 54);
            }

            .play_cle {
                font-size: 30px;
                color: rgb(54, 54, 54);
            }

            .play_pev {
                font-size: 38px;
                color: #333;
                margin-top: 10%;
            }

            .play_col {
                font-size: 50px;
                margin-top: 8%;
            }
        }
    }
</style>
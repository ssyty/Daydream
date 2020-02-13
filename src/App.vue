<template>
    <div class="contianer"
        :style="`height:${$store.state.height}px;background:url(${require('../public/images/app_bg.jpg')});`">
        <div class="start" v-if="!myApp">
            <div class="single">
                <em></em>
            </div>
        </div>
        <div class="myBox" v-if="myApp">
            <transition enter-active-class="slideInLeft" leave-active-class="slideOutLeft">
                <div class="animated view" v-show="!$store.state.musicBox_show&&!$store.state.search_show">
                    <transition name="my_router">
                            <router-view></router-view>
                    </transition>
                </div>
            </transition>
            <play-musicbox v-if="$store.state.musicBox_show"></play-musicbox>
            <nav-bar
                v-if="($route.path=='/film'||$route.path=='/music'||$route.path=='/read'||this.$route.path=='/home/message')&&!$store.state.musicBox_show">
            </nav-bar>
        </div>
        <audio :src="$store.state.songUrl" ref="box" @timeupdate="_timeUpDate"></audio>
    </div>
</template>
<script>
    import {
        musicAPI,
        film,
        readAPI
    } from './api/adr'
    export default {
        data() {
            return {
                myApp: false
            }
        },
        methods: {
            getMusicList() {
                this.$axios.get(`${musicAPI}/playlist/detail?id=3051693042`).then(res => {
                    this.$store.commit('setMusicList', res.data.playlist.tracks.slice(0, 29))
                    // 提交 初始化歌单数据
                    this.$store.commit('setIndex', 0)
                    // 默认是歌单的第一首歌，第二个参数是需要设置的索引，不能大于歌单长度
                })

                this.$axios.get(`${musicAPI}/search/hot/detail`).then(res => {
                    localStorage.setItem('hot_music', JSON.stringify(res.data.data))
                    // 将歌曲搜索 热词放入内存中
                })
            },
            loginData() {
                let login = JSON.parse(localStorage.getItem('admin')) == undefined ? false : JSON.parse(localStorage
                    .getItem('admin')).login
                if (login) {
                    let phone = JSON.parse(localStorage.getItem('admin')).phone
                    let password = JSON.parse(localStorage.getItem('admin')).password
                    this.$axios.post(`${musicAPI}/login/cellphone`, {
                        phone: phone,
                        password: password
                    }).then(res => {
                        this.myApp = true
                        this.$router.push('/film')
                        this.$store.commit('setLogIn', true)
                        this.getPerson(res.data.account.id)
                    }).catch(res => {
                        this.myApp = true
                        this.$router.push('/selected')
                    })

                } else {
                    this.myApp = true
                    this.$router.push('/selected')
                }
            },
            getFilm() {
                let all_1 = [
                    this.$axios.get(`${film.api_1}/v2/movie/top250`),
                    this.$axios.get(`${film.api_1}/v2/movie/us_box`),
                    this.$axios.get(`${film.api_1}/v2/movie/weekly`),
                    this.$axios.get(`${film.api_1}/v2/movie/new_movies`)
                ]
                this.$axios.all(all_1).then(this.$axios.spread((a, b, c, d) => {
                    localStorage.setItem('movie_rank', JSON.stringify({
                        top: a.data.subjects,
                        us: b.data.subjects,
                        weekly: c.data.subjects,
                        new: d.data.subjects
                    }))
                }))
                let all = [
                    this.$axios.get(`${film.api_1}/v2/movie/in_theaters`),
                    this.$axios.get(`${film.api_1}/v2/movie/coming_soon`)
                ]
                this.$axios.all(all).then(this.$axios.spread((a, b) => {
                    localStorage.setItem('now', JSON.stringify(a.data))
                    localStorage.setItem('soon', JSON.stringify(b.data))
                }))
            },
            getPerson(id) {
                this.$axios.get(`${musicAPI}/user/detail?uid=${id}`).then(res => {
                    sessionStorage.setItem('person', JSON.stringify(res.data))
                })
            },
            getReadRank() {
                this.$axios.get(`${readAPI}/rank/5a6844f8fc84c2b8efaa8bc5`).then(res => {
                    localStorage.setItem('hot_read', JSON.stringify(res.data.ranking.books))
                })
            },
            _timeUpDate(e) {
                this.$store.commit('setTime', event.target.currentTime)
                if (this.$store.state.current < this.$store.state.songLrc.length - 1) {
                    if (event.target.currentTime > this.$store.state.songLrc[this.$store.state.current].time) {
                        this.$store.commit('setTimeIndex', ++this.$store.state.current)
                    }
                }
                if (event.target.ended) {
                    this.$store.commit('setTimeIndex', 0)
                    if (this.$store.state.loop == 0) {
                        this.$store.commit('setSongId', this.$store.state.musicList[++this.$store.state.index].id)
                    } else if (this.$store.state.loop == 1) {
                        let r = parseInt(Math.random() * this.$store.state.musicList.length)
                        _this.$store.commit('setSongId', this.$store.state.musicList[r].id)
                    } else {
                        event.target.loop = true
                    }
                }
            }
        },
        created() {
                this.loginData()
            this.getMusicList()
            this.getFilm()
            this.getReadRank()
        },
        mounted() {
            this.$store.commit('setHeight', screen.availHeight)
            this.$store.commit('audioBox', this.$refs.box)
        }
    }
</script>

<style lang="css" scoped>
    .contianer {
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #1C5B7E;
        background-position: center;
        background-size: auto 100%;
    }

    .my_router-enter {
        transform: translateX(100%);
    }

    .my_router-leave-to {
        transform: translateX(-100%);
        position: absolute;
        opacity: 0;
    }

    .my_router-leave-active,
    .my_router-enter-active {
        transition: all 0.4s linear;
    }

    .view {
        width: 100%;
        height: 100%;
    }

    .myBox {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.39);
    }

    .start {
        width: 100%;
        height: 100%;
        padding-top: 50%;
        box-sizing: border-box;
        overflow: hidden;
        background-color: rgb(17, 17, 17);
    }

    .single em {
        width: 90px;
        height: 90px;
        margin: 0 auto;
        display: block;
        position: relative;
        top: 50%;
    }

    .single em:after {
        content: '';
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.8);
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -60px;
        z-index: 3;
        opacity: 0;
        -webkit-animation: halo 1s 0.5s infinite ease-out;
        -moz-animation: halo 1s 0.5s infinite ease-out;
        animation: halo 1s 0.5s infinite ease-out;
    }

    @-webkit-keyframes halo {
        0% {
            opacity: 0;
            -webkit-transform: scale(0.1);
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
        }
    }

    @-moz-keyframes halo {
        0% {
            opacity: 0;
            -moz-transform: scale(0.1);
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
            -moz-transform: scale(1.2);
        }
    }

    @-ms-keyframes halo {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @-o-keyframes halo {
        0% {
            opacity: 0;
            -o-transform: scale(0.1);
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
            -o-transform: scale(1.2);
        }
    }

    @keyframes halo {
        0% {
            opacity: 0;
            transform: scale(0.1);
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
            transform: scale(1.2);
        }
    }
</style>
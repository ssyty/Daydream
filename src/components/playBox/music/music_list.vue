<template>
       <transition
        enter-active-class="slideInUp"
        leave-active-class="slideOutDown">
        <div class="box animated">
            <div class="close_box" @click="$store.commit('showMusicList',false)"></div>
            <div class="song_list">
            <h3 class="songlist_title">共有{{musicList.length}}首歌</h3>
            <ul class="list_body">
                <li
                @click="getNewSong(item.id,i)"
                v-for="(item,i) in musicList"
                :key="item.id">
                <span class="number">{{i>8?i+1:'0'+(i+1)}}</span>
                <p  :class="{'list_songName text':true,'red':i==$store.state.index}">{{item.name}}</p>
                <p class="ar_name text">{{item.ar[0].name}}</p>
                <i class="list_time">{{item.dt | opdate(item.dt)}}</i>
                </li>
            </ul>
            <div class="close icon-cross" @click="closeBox"></div>
        </div>
        </div>
        </transition>
</template>
<script>
export default {
   data(){
       return {
           
       }
   },
   watch:{},
   filters:{
        opdate(str){
           let s = str/1000
           return `${parseInt(s/60)>9?parseInt(s/60):'0'+parseInt(s/60)}:${parseInt(s%60)>9?parseInt(s%60):'0'+parseInt(s%60)}`
        }
    },
    computed:{
        'musicList'(){
            return this.$store.state.musicList
        }
    },
   methods:{
        getNewSong(id,i){
            this.$store.commit('setIndex',i)
            this.$store.commit('setSongId',id)
        },
        closeBox(){
            this.$store.commit('showMusicList',false)
        }
   },
   created(){
   }
}
</script>
<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3000;
    top: 0;
    .close_box {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
    }
}
    .song_list {
        width: 100%;
        padding: 35px 0 45px;
        box-sizing: border-box;
        height: 60%;
        position: absolute;
        bottom: 0;
        color: rgb(228, 228, 228);
        background-color: rgba(0, 0, 0, 0.767);
        border-radius: 6px 6px 0 0;
        z-index: 2;
        .close {
            width: 90%;
            height: 30px;
            position: absolute;
            bottom: 10px;
            left: 5%;
            font-size: 18px;
            background-color: rgba(255, 255, 255, 0.048);
            text-align: center;
            line-height: 30px;
            border-radius: 8px;
            color: rgb(112, 112, 112);
        }
        .songlist_title {
            width: 90%;
            height: 35px;
            position: absolute;
            top: 0;
            left: 5%;
            line-height: 35px;
            margin: 0 auto;
            box-sizing: border-box;
            font-weight: 600;
            margin-bottom: 5px;
            border-bottom: 1px solid rgb(216, 216, 216);
        }
        .list_body {
            width: 100%;
            overflow: auto;
            height: 100%;
            box-sizing: border-box;
            li {
                width: 100%;
                height: 45px;
                display: flex;
                line-height: 45px;
                .number {
                    font-size: 12px;
                    line-height: 45px;
                    color: rgb(192, 192, 192);
                    flex: 1;
                    text-align: center;
                }
                .list_songName {
                    flex: 4;
                    color: rgb(219, 219, 219);
                }
                .ar_name {
                    flex: 3;
                    color: rgb(110, 110, 110);
                }
                .list_time {
                    flex: 2;
                    color: rgb(2, 92, 92);
                }
                .red {
                    color: rgb(141, 1, 1);
                }
            }
        }
    }
</style>
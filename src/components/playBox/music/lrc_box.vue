<template>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <div class="main_lrc animated" :style="`scrollTop:${35 * (this.$store.state.current - 6)}`" ref="lrc_box">
            <p :class="{'lrc_item':true,'text':true,'ligth':($store.state.current-1)==i}"
                v-for="(item,i) in $store.state.songLrc" :key="i">
                {{item.lrc}}
            </p>
        </div>
    </transition>

</template>
<style scoped lang="scss">
    .main_lrc::-webkit-scrollbar {
        display: none;
    }

    .main_lrc {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: relative;
        padding: 5px 10px;
        box-sizing: border-box;
        transition: all 0.2s linear;

        .lrc_item {
            width: 100%;
            height: 35px;
            font-size: 15px;
            text-align: center;
            line-height: 30px;
            color: rgb(190, 190, 190);
        }

        .ligth {
            color: rgb(255, 255, 255);
        }
    }
</style>
<script>
import {musicAPI} from '../../../api/adr'
    export default {
        data() {
            return {
                top:null, 
            }
        },
        computed:{
            'id'(){
                return this.$store.state.songId
            }
        },
        watch: {
            'id'(){
                this.getData()
            },
            '$store.state.current'(newval){
                if(newval>6 && newval<this.$store.state.songLrc.length-3){
                    this.top.scrollTop = 35 * (this.$store.state.current - 6)
                }
            }
        },
        methods: {
            getData(){
                this.$axios.get(`${musicAPI}/lyric?id=${this.id}`).then(res=>{
                    let arr = res.data.lrc.lyric.split('\n') || null
                    if (!res.data.uncollected && arr != null) {
                        let lrc_time = []
                        arr.forEach(ele => {
                            if (ele != '') {
                                var t = parseInt(ele.split(/\[(.+?)\]/g)[1].split(':')[0]) * 60 +
                                    parseFloat(ele.split(/\[(.+?)\]/g)[1].split(':')[1]) || null
                                var l = ele.split(/\[(.+?)\]/g)[2] || null
                                if (t != null && l != null) {
                                    lrc_time.push({
                                        time: t,
                                        lrc: l
                                    })
                                }
                            }
                        });
                        this.$store.commit('setLrc', lrc_time)
                    }
                })
            }
        },
        created() {
            
        },
        mounted() {
            this.top = this.$refs.lrc_box
            // console.dir(this.top);
            
        }
    }
</script>
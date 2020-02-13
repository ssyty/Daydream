<template>
    <div class="song_box">
        <div class="bg_img_box">
            <img :src="bg_img" :style="`animationPlayState:${run}`">
        </div>
    </div>
</template>
<style scoped lang="scss">
    .song_box {
        height: 100%;
        width: 100%;
        position: relative;

        .bg_img_box {
            height: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            box-sizing: border-box;            
        }

        img {
            border: 3px solid #999;
            height: 262px;
            width: 262px;
            border-radius: 50%;
            animation: bg_run 18s infinite linear;
        }
    }

    @keyframes bg_run {
        0% {
            transform: rotate(0);    
        }

        100% {
            transform: rotate(360deg);     
        }
    }
</style>
<script>
    export default {
        props: {
            'bg_img': {
                type: String,
                default: ''
            },
            "running":{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                run:'paused'
            }
        },
        watch: {
            'running'(newval){
                if(newval){
                    this.run = "running"
                }else {
                    this.run = 'paused'
                }
                 
            
            }
        },
        methods: {
            closeBox(){
                this.$store.commit('showMusicList',false)
            }
        },
        created() {},
        mounted() {}
    }
</script>
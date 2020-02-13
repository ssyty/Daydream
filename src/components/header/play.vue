<template>
    <div class="play" :style="`top:${top};left:${left}`" @click="show">
        <div :class="{'lis':true,'lis-1':play}" :style="`backgroundColor:${color};height:51%;left: 0;`"></div>
        <div :class="{'lis':true,'lis-2':play}" :style="`backgroundColor:${color};height:43%;left:5px`"></div>
        <div :class="{'lis':true,'lis-3':play}" :style="`backgroundColor:${color};height:60%;left:10px`"></div>
        <div :class="{'lis':true,'lis-4':play}" :style="`backgroundColor:${color};height:83%;left:15px`"></div>
        <div :class="{'lis':true,'lis-5':play}" :style="`backgroundColor:${color};height:68%;left:20px`"></div>
    </div>
</template>
<style scoped lang="scss">
    .play {
        width: 25px;
        height: 22px;
        position: absolute;
        .lis {
            width: 2.5px;
            position: absolute;
            bottom: 0;
        }

        .lis-1 {
            animation: waves 1.2s linear 0s infinite alternate;
            -webkit-animation: waves 1.2s linear 0s infinite alternate;
        }

        .lis-2 {
            animation: waves 1.8s linear 0s infinite alternate;
            -webkit-animation: waves 1.8s linear 0s infinite alternate;
        }

        .lis-3 {
            animation: waves 2s linear 0s infinite alternate;
            -webkit-animation: waves 2s linear 0s infinite alternate;
        }

        .lis-4 {
            animation: waves 1.4s linear 0s infinite alternate;
            -webkit-animation: waves 1.4s linear 0s infinite alternate;
        }

        .lis-5 {
            animation: waves 1.6s linear 0s infinite alternate;
            -webkit-animation: waves 1.6s linear 0s infinite alternate;
        }
    }

    @-webkit-keyframes waves {
        10% {
            height: 20%;
        }

        20% {
            height: 60%;
        }

        40% {
            height: 40%;
        }

        50% {
            height: 100%;
        }

        100% {
            height: 50%;
        }
    }

    @keyframes waves {
        10% {
            height: 20%;
        }

        20% {
            height: 60%;
        }

        40% {
            height: 40%;
        }

        50% {
            height: 100%;
        }

        100% {
            height: 50%;
        }
    }
</style>
<script>
    export default {
        props: {
            'play': {
                type: Boolean,
                default: false
            },
            'color': {
                type: String,
                default: '#fff'
            },
            'top':{
               type: String,
               default: '0' 
            },
            'left':{
               type: String,
               default: '0' 
            }

        },
        data() {
            return {}
        },
        watch: {},
        methods: {
            show(){
                this.$store.commit('setMusicBox',true)
            }
        },
        created() {},
        mounted() {}
    }
</script>
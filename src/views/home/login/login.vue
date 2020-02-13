<template>
   <div class="login">
        <top :title='$route.query.w' :play_show="false" :isload="false" :paly_show="false"></top>
        <transition
        enter-active-class="fadeInRight"
        leave-active-class="fadeOutLeft">
            <router-view class="animated"></router-view>
        </transition>
   </div>
</template>
<style scoped lang="scss">
.login {
    width: 100%;
    height: 100%;
    padding-top: 45px;
    box-sizing: border-box;
}
</style>
<script>
export default {
   data(){
       return { 
       }
   },
   created(){
   },
   mounted(){}
}
</script>
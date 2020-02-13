<template>
   <div class="home_nav">
        <span class="icon-arrow-left2" @click="$router.push('/home')"></span>
   </div>
</template>
<style scoped lang="scss">
.home_nav  {
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 0;
    .icon-arrow-left2 {
        font-size: 25px;
        line-height: 55px;
        position: absolute;
        left: 15px;
        color: rgba(255, 255, 255, 0.637);
    }
}
</style>
<script>
export default {
   data(){
       return {}
   },
   watch:{},
   methods:{},
   created(){},
   mounted(){}
}
</script>
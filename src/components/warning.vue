<template>
   <transition enter-active-class="jackInTheBox" leave-active-class="fadeOut">
         <div class="no_login_box animated" v-if="noLogIn">
         <router-link class="no_login" to="/selected" tag="div">
            <span class="icon-denied"></span>
            当前暂未登录,请先登录
         </router-link>
      </div>
    </transition>
</template>
<style scoped lang="scss">
.no_login_box {
         width: 100%;
         height: 80%;
         position: fixed;
         top: 140px;
         background-color: rgba(255, 255, 255, 0);
         z-index: 100;

         .no_login {
            width: 50%;
            height: 100px;
            background-color: #fff;
            border-radius: 5px;
            line-height: 45px;
            text-align: center;
            margin: 0 auto;

            .icon-denied {
               display: block;
               line-height: 55px;
               line-height: 55px;
               color: #999;
               font-size: 25px;
               text-align: center;
            }
         }
}
</style>
<script>
export default {
    props:{
        'noLogIn':{
            type:Boolean,
            default:false
        }
    },
   data(){
       return {
          
       }
   },
   watch:{
   },
   methods:{},
   created(){
      // console.log(this.$props.noLogIn );
      
   },
   mounted(){}
}
</script>
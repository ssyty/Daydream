<template>
   <div class="selcted">
      <h4 class="title">Finest</h4>
         <div class="main">
            <router-link class="button login" to='/login/phone?w=手机号登录'>手机号登陆</router-link>
            <router-link class="button" to='/home'>游客进入</router-link>
         </div>
         <div class="login_more">
             
         </div>
   </div>
</template>
<style scoped lang="scss">
.selcted {
   width: 100%;
   height: 100%;
   background-image: linear-gradient(#2ef6fd3f, #6370fb); 
   position: relative;
   .title {
      font-size: 48px;
      position: absolute;
      top: 100px;
      text-align: center;
      width: 100%;
      font-style: italic;
      
   }
   .main {
      width: 100%;
      height: 180px;
      position: absolute;
      top: 50%;
      .button {
         width: 80%;
         display: block;
         margin: 0 auto;
          background-image: linear-gradient(#fbfbfb3f, #a8a8a8); 
         line-height: 37px;
         margin-bottom: 25px;
         text-align: center;
         color: #333;
         font-size: 16px;
         border-radius: 18px;
         
      }
      .login {
         background-image: linear-gradient(#0300bb7a, #180199ca); 
         color: rgb(8, 8, 8);
         font-weight: 700;
      }
      .login:hover {
         background-color: rgb(216, 3, 3);
      }
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
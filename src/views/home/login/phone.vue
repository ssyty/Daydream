<template>
   <div class="phone_box">
       <p class="message">未注册手机号登录后将自动创建账号</p>
        <div class="phone">
            <span class="local">+86</span>
            <input type="number" v-model="phone" class="ipt" placeholder="请输入手机号" autofocus="autofocus">
            <div class="next" @click="setLogin">下一步</div>
        </div>
        <transition
        enter-active-class="shake"
        leave-active-class="fadeOut">
            <div class="info_box animated" v-if='flog'>
                <div class="info">
                <span class="icon-cross"></span>
                请输入正确的手机号</div>
            </div>
        </transition>
   </div>
</template>
<style scoped lang="scss">
.phone_box {
    width: 100%;
    height: 100%;
    padding: 80px 0 0 0;
    box-sizing: border-box;
    position: relative;
    .info_box {
        width: 100%;
        height: 65px;
        position: absolute;
        top: 25%;
        .info {
        width: 180px;
        height: 65px;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.431);
        line-height: 20px;
        border-radius: 13px;
        .icon-cross {
            width: 100%;
            display: block;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 28px;
        }
     }
    }
    .message {
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 25px;
        font-size: 15px;
        color: rgb(167, 167, 167);
        box-sizing: border-box;
    }
    .phone {
        width: 100%;
        height: 180px;
        position: relative;
        .local {
            position: absolute;
            top: 12px;
            left: 11%;
            font-size: 18px;
            color: rgb(224, 224, 224);
        }
        .ipt {
            width: 80%;
            display: block;
            margin: 15px auto;
            height: 45px;
            padding: 0 0 0 45px;
            box-sizing: border-box;
            line-height: 45px;
            border-bottom: 1px solid rgb(138, 137, 137);
            background-color: rgba(255, 255, 255, 0);
            color: rgb(207, 207, 207);
            font-size: 18px;
        }
        .ipt::-webkit-input-placeholder {
            font-size: 14px;
            color: rgb(155, 155, 155);
        }
        .next {
            width: 80%;
            height: 40px;
            text-align: center;
            font-size: 17px;
            color: rgb(192, 192, 192);
            background-color: rgba(228, 228, 228, 0.178);
            line-height: 40px;
            border-radius: 20px;
            margin: 0 auto;
        }
    }
    
}
</style>
<script>
export default {
   data(){
       return {
           phone:'',
           flog:false
       }
   },
   watch:{
    'flog'(){
           setTimeout(()=>{
               this.flog = false
           },1000)
       }
   },
   methods:{
       setLogin(){
           let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
           if(telStr.test(this.phone)){
               localStorage.setItem('admin',JSON.stringify({phone:this.phone}))
               this.$router.push('/login/password?w=手机号登录')
           }else {
               this.flog = true
           }
       }
   },
   created(){},
   mounted(){}
}
</script>
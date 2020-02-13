<template>
   <div class="about">
      <warning :noLogIn="noLogIn"/>
      <div class="about_item" @click="goPerson('/home/my_musicList')">
         <span class="icon-library_music"></span>
         <i class="icon-chevron-thin-right"></i>
         我的歌单
      </div>
      <div class="about_item" @click="goPerson('/home/my_listen')">
         <span class="icon-headset"></span>
         <i class="icon-chevron-thin-right"></i>
         最近收听
      </div>
      <div class="about_item" @click="goPerson('/home/my_booklist')">
         <span class="icon-library_books"></span>
         <i class="icon-chevron-thin-right"></i>
         我的书架
      </div>
      <div class="about_item" @click="goPerson('/home/my_read')">
         <span class="icon-bookclass"></span>
         <i class="icon-chevron-thin-right"></i>
         最近阅读
      </div>
      <div class="about_item" @click="goPerson('/home/want_film')">
         <span class="icon-video_collection"></span>
         <i class="icon-chevron-thin-right"></i>
         想看的电影
      </div>
      <router-link to="/home/setting" class="about_item" tag="div">
         <span class="icon-settings"></span>
         <i class="icon-chevron-thin-right"></i>
         设置
      </router-link>
      <div to="" class="about_item">
         <span class="icon-brightness_2"></span>
         <div class="btn">
            <div :class="{'short':true,'lang':true}"><i @click="setLight"></i></div>
         </div>
         夜间模式
      </div>
      <router-link to="" class="about_item" tag="div">
         <span class="icon-eco"></span>
         <i class="icon-chevron-thin-right"></i>
         关于
      </router-link>
      <div class="login_out" v-if="$store.state.isLogin" @click="out_show=true">
         退出登录
      </div>
      <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
         <div class="isLogin_out animated" v-if="out_show">
            确定退出么？
            <div class="btn_out">
               <div class="out_item doIt" @click="outLogin">确定</div>
               <div class="out_item" @click="out_show=false">暂时不了</div>
            </div>
         </div>
      </transition>
   </div>
</template>
<style scoped lang="scss">
   .about {
      width: 100%;

      .isLogin_out {
         width: 100%;
         height: 95px;
         background-color: #fff;
         position: fixed;
         font-size: 16px;
         line-height: 50px;
         border-radius: 5px 5px 0 0;
         text-align: center;
         bottom: 0;
         z-index: 100000;
         color: rgb(173, 173, 173);

         .btn_out {
            width: 100%;
            height: 45px;
            display: flex;
            box-sizing: border-box;
            border-top: 1px solid #999;

            .out_item {
               flex: 1;
               background-color: #fff;
               box-sizing: border-box;
               line-height: 43px;
               color: rgb(66, 66, 66);
            }

            .doIt {
               color: #999;
            }
         }
      }

      .about_item {
         width: 100%;
         height: 50px;
         margin-bottom: 10px;
         background-color: rgba(255, 255, 255, 0.137);
         line-height: 50px;
         padding-left: 60px;
         box-sizing: border-box;
         color: rgb(216, 216, 216);
         font-size: 16px;
         position: relative;

         span {
            font-size: 18px;
            position: absolute;
            left: 25px;
            top: 50%;
            transform: translateY(-50%);
         }

         .icon-chevron-thin-right {
            font-size: 18px;
            position: absolute;
            top: 50%;
            right: 25px;
            transform: translateY(-50%);
         }

         .btn {
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 25px;
            border-radius: 12px;
            background-color: rgba(255, 255, 255, 0.411);
            border: 1px solid #999;

            .short {
               height: 100%;
               background-color: rgb(95, 1, 1);
               position: relative;
               border-radius: 12px;
               width: 25px;

               i {
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  background-color: #fff;
                  position: absolute;
                  right: 0;
               }
            }
         }
      }

      .login_out {
         width: 100%;
         height: 45px;
         line-height: 45px;
         background-color: rgba(255, 255, 255, 0.178);
         text-align: center;
         color: rgb(240, 240, 240);
         font-size: 16px;
      }
   }
</style>
<script>
   export default {
      props: {
      },
      data() {
         return {
            light: 0,
            out_show: false,
            noLogIn: false
         }
      },
      watch: {},
      methods: {
         outLogin() {
            sessionStorage.clear()
            localStorage.clear()
            this.out_show=false
            this.$store.commit('setLogIn',false)
            this.$router.push('/selected')
         },
         setLight() {
            this.light = 100
         },
         goPerson(e) {
            if (this.$store.state.isLogin) {
               this.$router.push(e)
            } else {
               this.noLogIn = true
               setTimeout(() => {
                  this.noLogIn = false
               }, 1800);
            }
         }
      },
      created() {},
      mounted() {}
   }
</script>
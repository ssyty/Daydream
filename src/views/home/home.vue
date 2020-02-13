<template>
   <div class="home">
      <top title="个人主页" :back="false" :isload="false"></top>
      <div class="admin_box">
         <div class="message">
            <div class="login_new" v-if="!$store.state.isLogin">
               <router-link to="/selected" class="login_btn">立即登录</router-link>
            </div>
            <div class="person" v-if="$store.state.isLogin">
               <img :src="message.profile.avatarUrl" class="avatar">
               <div class="name">
                  <p class="admin">{{message.profile.nickname}}</p>
                  <p class="birthday">{{message.profile.birthday | opDate(message.profile.birthday)}}</p>
               </div>
               <router-link to="/edit" class="change_mess">编辑<i class="icon-edit-3"></i></router-link>
            </div>
         </div>
         <router-view></router-view>
      </div>
      <home-nav v-if="$route.path!='/home/message'"></home-nav>
   </div>
</template>
<style scoped lang="scss">
   .home {
      width: 100%;
      height: 100%;
      padding: 45px 0 55px;
      box-sizing: border-box;

      .admin_box::-webkit-scrollbar {
         display: none;
      }

      .admin_box {
         width: 100%;
         box-sizing: border-box;
         height: 100%;
         overflow: auto;
      }

      .message {
         width: 100%;
         padding: 10px 20px;
         height: 95px;
         box-sizing: border-box;
         margin-bottom: 25px;
         position: relative;
         .change_mess {
            font-size: 15px;
            padding: 3px 8px;
            background-color: rgba(255, 255, 255, 0.15);
            position: absolute;
            right: 15px;
            top: 25px;
            color: rgb(218, 218, 218);
            border-radius: 5px;
         }
         .login_new {
            width: 100%;
            height: 100%;

            .login_btn {
               width: 80%;
               height: 35px;
               border-radius: 17px;
               background-color: rgba(255, 255, 255, 0.274);
               text-align: center;
               line-height: 35px;
               color: rgb(202, 202, 202);
               font-size: 16px;
               display: block;
               margin: 20px auto 0;
            }
         }

         .person {
            width: 100%;
            height: 100%;

            .avatar {
               height: 80%;
               border-radius: 50%;
               float: left;
               margin-right: 25px;
            }

            .name {
               float: left;
               width: 70%;
               height: 100%;

               .admin {
                  width: 100%;
                  line-height: 35px;
                  color: rgb(230, 230, 230);
                  font-size: 18px;
               }

               .birthday {
                  width: 100%;
                  line-height: 20px;
                  font-size: 14px;
                  color: rgb(156, 156, 156);
               }
            }
         }
      }

   }
</style>
<script>
   import {
      parse
   } from 'path';
   export default {
      data() {
         return {
            islogin: true,
            message: {}
         }
      },
      watch: {},
      filters: {
         opDate(num) {
            let time = new Date(parseInt(num));
            let y = time.getFullYear();
            let mon = time.getMonth() + 1;
            let day = time.getDate();
            return `${y}-${mon}-${day}`
         }
      },
      methods: {
         getMessage() {
            let person = JSON.parse(sessionStorage.getItem('person')) || null
            if (person == null || person == undefined) {
               this.islogin = false
            } else {
               this.message = person
            }
         }
      },
      created() {
         this.getMessage()
      },
      mounted() {}
   }
</script>
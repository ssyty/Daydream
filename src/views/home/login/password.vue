<template>
    <div class="password">
        <div class="pass">
            <input type="password" v-model="password" placeholder="请输入密码" class="ipt" autofocus="autofocus">
            <div class="next" @click="login">登录</div>
            <router-link to="find_password?w=找回密码" class="lose_password">忘记密码?</router-link>
        </div>
        
        <transition enter-active-class="shake" leave-active-class="fadeOut">
            <div class="info_box animated" v-if='flog'>
                <div class="info">
                    <span class="icon-cross"></span>
                    密码不正确
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="scss">
    .password {
        width: 100%;
        height: 100%;
        padding-top: 50px;
        box-sizing: border-box;
        
        .pass {
            width: 100%;
            height: 120px;
            position: relative;
            .lose_password {
                font-size: 16px;
                position: absolute;
                bottom: -15px;
                right: 25px;
                color: #999;
            }
            .ipt {
                width: 80%;
                display: block;
                margin: 15px auto;
                height: 45px;
                font-size: 20px;
                color: rgb(209, 209, 209);
                background-color: rgba(255, 255, 255, 0);
                box-sizing: border-box;
                border-bottom: 1px solid rgb(204, 204, 204);
            }
            .ipt::-webkit-input-placeholder {
                font-size: 14px;
                color: rgb(158, 158, 158);

            }

            .next {
                width: 80%;
                height: 35px;
                text-align: center;
                font-size: 17px;
                color: rgb(194, 194, 194);
                background-color: rgba(228, 226, 226, 0.171);
                line-height: 35px;
                border-radius: 20px;
                margin: 0 auto;
            }
        }

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

    }
</style>
<script>
import {musicAPI} from '../../../api/adr'
    export default {
        data() {
            return {
                password: '',
                flog: false
            }
        },
        watch: {
            'flog'() {
                setTimeout(() => {
                    this.flog = false
                }, 1200)
            }
        },
        methods: {
            login() {
                let phone = JSON.parse(localStorage.getItem('admin')).phone
                this.$axios.post(`${musicAPI}/login/cellphone`, {
                    phone: phone,
                    password: this.password
                }).then(res => {
                    this.getPerson(res.data.account.id)
                    localStorage.setItem('admin',JSON.stringify({phone:phone,password:this.password,login:true}))
                    
                }).catch(res=>{
                    this.flog = true
                    this.password = ''
                })
            },
            getPerson(id){
                this.$axios.get(`${musicAPI}/user/detail?uid=${id}`).then(res=>{
                     sessionStorage.setItem('person',JSON.stringify(res.data))
                     this.$store.commit('setLogIn',true)
                     this.$router.push('/film')
                })
            }
        },
        created() {},
        mounted() {}
    }
</script>
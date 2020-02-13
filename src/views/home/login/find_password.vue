<template>
    <div class="find">
        <main>
            <div class="getpass">
                <span class="num">+86</span>
                <input type="number" v-model="phone" class="phone_box" autofocus="autofocus" 请输入手机号>
                <div class="get_ture" @click="getNumber">
                    获取验证码
                </div>
            </div>
            <transition enter-active-class="shake" leave-active-class="fadeOut">
                <div class="info_box animated" v-if='flog'>
                    <div class="info">
                        <span class="icon-cross"></span>
                        请输入正确的手机号</div>
                </div>
            </transition>
        </main>
    </div>
</template>
<style scoped lang="scss">
    .find {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        main {
            width: 100%;
            padding-top: 65px;
            box-sizing: border-box;

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

            .getpass {
                width: 100%;
                padding: 0 15px;
                box-sizing: border-box;
                position: relative;

                .num {
                    position: absolute;
                    top: 8px;
                    left: 16%;
                    color: rgb(129, 129, 129);
                    font-size: 16px;
                }

                .phone_box {
                    width: 65%;
                    display: block;
                    margin: 0 auto;
                    height: 35px;
                    background-color: rgba(255, 255, 255, 0);
                    padding-left: 45px;
                    color: rgb(204, 204, 204);
                    font-size: 16px;
                    border-bottom: 1px solid rgb(184, 183, 183);
                }

                .get_ture {
                    width: 50%;
                    line-height: 35px;
                    margin: 15px auto;
                    background-color: rgba(255, 255, 255, 0.301);
                    border-radius: 17px;
                    text-align: center;
                    color: rgb(172, 172, 172);
                }
            }

        }
    }
</style>
<script>
    import {
        musicAPI
    } from '../../../api/adr'
    export default {
        data() {
            return {
                phone: JSON.parse(localStorage.getItem('admin')).phone,
                flog: false,
                
            }
        },
        watch: {
            'flog'() {
                setTimeout(() => {
                    this.flog = false
                }, 1000)
            }
        },
        methods: {
            getNumber() {
                let telStr =
                    /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
                if (telStr.test(this.phone)) {
                    localStorage.setItem('admin', JSON.stringify({
                        phone: this.phone
                    }))
                    this.$router.push("captcha?w=获取验证码")
                    // this.$axios.get(`${musicAPI}/captcha/sent?phone=${this.phone}`).then(res=>{
                    //      console.log(res.data)
                    //      if(res.data.code==200){

                    //      }
                    // })

                } else {
                    this.flog = true
                }
            }
        },
        created() {},
        mounted() {}
    }
</script>
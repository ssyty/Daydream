<template>
    <div class="captcha">
        <div class="ipt">
            <van-password-input :value="value" :mask="false" :length='4' :gutter="25" :focused="keyBoard" @focus="keyBoard = true" />
        </div>
        <van-number-keyboard :show="keyBoard" close-button-text="完成" @blur="keyBoard = false" @input="onInput" @delete="onDelete" />
    </div>
</template>
<style scoped lang="scss">
    .captcha {
        width: 100%;
        height: 100%;
        padding-top: 55px;
        box-sizing: border-box;
    }

    .ipt {
        width: 80%;
        margin: 0 auto;
    }
</style>
<script>
    export default {
        data() {
            return {
                value: '',
                keyBoard: false
            }
        },
        watch: {},
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 4)
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1)
            }
        },
        created() {},
        mounted() {}
    }
</script>
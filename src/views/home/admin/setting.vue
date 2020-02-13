<template>
   <div class="set">
      <h3>设置</h3>
      <p class="item_set" @click="read=!read">阅读</p>
      <ul class="set_list" v-show="read">
         <li class="item">字体大小</li>
         <li class="item">背景色</li>
         <li class="item"></li>
         <li class="item"></li>
      </ul>
      <p class="item_set" @click="music=!music">音乐</p>
      <ul class="set_list" v-show="music">
         <li class="item">播放设置</li>
         <li class="item">播放定时</li>
         <li class="item">边听边存</li>
         <li class="item"></li>
      </ul>
      <p class="item_set" @click="person=!person">偏好设置</p>
      <ul class="set_list" v-show="person">
         <li class="item">音乐</li>
         <li class="item">读书</li>
         <li class="item">搜索记录</li>
         <li class="item"></li>
      </ul>
   </div>
</template>
<style scoped lang="scss">
.set {
   width: 100%;
   h3 {
      width: 100%;
      line-height: 35px;
      font-size: 16px;
      color: rgb(207, 207, 207);
      background-color: rgba(255, 255, 255, 0.26);
      padding-left: 15px;
      box-sizing:border-box;
      margin-bottom: 15px;
   }
   .item_set {
      width: 80%;
      margin: 5px auto;
      font-size: 15px;
      color: rgb(206, 205, 205);
   }
   .set_list {
      width: 100%;
      .item {
         width: 100%;
         line-height: 35px;
         background-color: rgba(255, 255, 255, 0.192);
         margin-bottom: 12px;
         padding: 0 12px;
         box-sizing: border-box;
         color: antiquewhite;
      }
   }
}
</style>
<script>
export default {
   data(){
       return {
          read:true,
          music:true,
          person:true
       }
   },
   watch:{},
   methods:{},
   created(){},
   mounted(){}
}
</script>
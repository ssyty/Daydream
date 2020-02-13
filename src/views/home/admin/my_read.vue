<template>
   <div class="my_read">
      <h3 class="title">最近阅读<span class="book_num">({{book_num}})</span></h3>
      <div class="isList" v-if="flog">
         当前暂无阅读记录,快去读书吧!
         <router-link class="icon-point-right" to="/read"></router-link>
      </div>
      <div class="list_box" v-if="!flog">
         <ul class="list">
         <li class="item" v-for="(item,i) in list" :key="i" @click="goRead(item)">
            <img v-lazy="`http://statics.zhuishushenqi.com${item.book.cover}`" class="item_img">
            <div class="mess">
               <p class="name text">{{item.book.title}}</p>
               <p>当前阅读:{{item.list[item.page].title}}</p>
            </div>
         </li>
      </ul>
      </div>
   </div>
</template>
<style scoped lang="scss">
.my_read {
   width: 100%;
   .title {
      width: 100%;
      line-height: 35px;
      padding-left: 15px;
      box-sizing: border-box;
      color: rgb(197, 196, 196);
      font-size: 16px;
      background-color: rgba(255, 255, 255, 0.198);
      margin-bottom: 25px;
   }
   .isList {
     width: 100%;
     padding: 0 25px;
     line-height: 55px;
     height: 80px;
     box-sizing: border-box;
     position: relative;
     color: rgb(209, 209, 209);
     font-size: 16px;
     text-align: center;
     .icon-point-right {
        font-size: 24px;
        color: rgb(138, 2, 2);
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
     }
  }
   .list {
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      .item {
         width: 100%;
         height: 75px;
         position: relative;
         margin-bottom: 15px;
         .item_img {
            height: 100%;
            float: left;
            width: 57px;
            border-radius: 5px;
         }
         .mess {
            float: left;
            margin-left: 15px;
            width: 65%;
            line-height: 25px;
            color: rgb(202, 202, 202);
            .name {
               font-size: 16px;
               color: rgb(238, 237, 237);
            }
         }
      }
   }
}
</style>
<script>
export default {
   data(){
       return {
          list:[],
          flog:true,
          book_num:null
       }
   },
   watch:{},
   methods:{
      goRead(e){
         localStorage.setItem('booklist',JSON.stringify(e))
         this.$router.push(`/text/${e.page}`)
      }
   },
   created(){
      this.list = JSON.parse(localStorage.getItem('read_lists')) || null
      
      if(this.list==null || this.list==undefined){
         this.flog = true
         this.book_num = 0
      }else {
         this.flog = false
         this.book_num = this.list.length
      }
   },
   mounted(){}
}
</script>
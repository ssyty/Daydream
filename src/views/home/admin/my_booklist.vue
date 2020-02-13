<template>
   <div class="my_booklist">
      <h3>我的书架</h3>
      <div class="empty" v-if="!show">
         <span class="icon-coffee1"></span>
         当前暂无收藏的书籍，现在去收藏!!!
         <p>去选书<router-link class="icon-point-right" to="/read"></router-link></p>
      </div>
      <ul class="list clear" v-if="show">
         <li class="item" v-for="item in list" :key="item.book._id" @click="goRead(item)">
            <img v-lazy="`http://statics.zhuishushenqi.com${item.book.cover}`" class="list_img">
            <p class="name text">{{item.book.title}}</p>
         </li>
     </ul>
   </div>
</template>
<style scoped lang="scss">
.my_booklist {
   width: 100%;
   h3 {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      color: rgb(206, 206, 206);
      padding: 0 15px;
      box-sizing: border-box;
      margin-bottom: 15px;
      background-color: rgba(255, 255, 255, 0.164);
   }
   .empty {
      width: 100%;
      height: 120px;
      line-height: 35px;
      font-size: 16px;
      text-align: center;
      position: relative;
      color: rgb(218, 216, 216);
      .icon-coffee1 {
         font-size: 28px;
         display: block;
         width: 100%;
         line-height: 45px;
         text-align: center;
      }
      p {
         position: absolute;
         bottom: 12px;
         line-height: 35px;
         text-align: center;
         font-size: 16px;
         color: rgb(221, 220, 220);
         width: 20%;
         left: 40%;
         .icon-point-right {
            font-size: 25px;
            top: 5px;
            position: absolute;
            right: -25px;
            color: rgb(121, 1, 1);
         }
      }
   }
   .list {
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      .item {
         width: 33.33%;
         float: left;
         height: 180px;
         .list_img {
            width: 85%;
            height: 135px;
            display: block;
            margin: 0 auto;
            border-radius: 5px;
         }
         .name {
            width: 85%;
            height: 35px;
            line-height: 35px;
            margin: 0 auto;
            text-align: center;
            color: rgb(204, 204, 204);
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
         show:false
       }
   },
   watch:{},
   methods:{
      goRead(e){
         localStorage.setItem('book_list',JSON.stringify(e))
         this.$router.push('/text/0')
      }
   },
   created(){
      this.list = JSON.parse(localStorage.getItem('mybooklist'))||null
      if(this.list==null){
         this.show=false
      }else {
         this.show= true
      }
   },
   mounted(){}
}
</script>
<template>
   <div class="read_rank">
       <top :title="`读书排行-${cat}`" :isload="false"></top>
       <main>
           <span class="cat icon-signal_cellular_4_bar" @click="cat_show=!cat_show"></span>
           <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
               <div class="cats animated" v-show="cat_show">
               <p :class="{'cat_item':true,'red':index==0}" @click="changeCat('男生',0)">男生</p>
               <p :class="{'cat_item':true,'red':index==1}" @click="changeCat('女生',1)">女生</p>
               <p :class="{'cat_item':true,'red':index==2}" @click="changeCat('漫画',2)">漫画</p>
               <p :class="{'cat_item':true,'red':index==3}" @click="changeCat('杂志',3)">杂志</p>
           </div>
           </transition>
           <ul class="nav" v-if="show">
           <li :class="{'nav_item':true,'light':item._id==id}" v-for="item in nav_list" :key="item._id" @click="handleId(item._id)">
               {{item.shortTitle}}
           </li>
          </ul>
          <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
              <div class="view animated" v-if="view">
                    <ul class="views_ul">
                        <router-link  tag='li' v-for="(item,i) in books" :key="i" :to="`/book_detail/${item._id}`">
                        <img v-lazy="`https://statics.zhuishushenqi.com${item.cover}`" class="view_img">
                        <div class="mess">
                            <p class="book_name">{{i+1}}.{{item.title}}</p>
                            <p class="author">作者:{{item.author}}</p>
                            <p class="info text">{{item.shortIntro}}</p>
                        </div>
                        </router-link>
                    </ul>
              </div>
          </transition>
       </main>
   </div>
</template>
<style scoped lang="scss">
.read_rank {
    width:100%;
    height:100%;
    padding-top: 45px;
    box-sizing:border-box;
    main {
        width: 100%;
        height: 100%;
        padding-top: 35px;
        position: relative;
        .cat {
            position: absolute;
            left: 12px;
            top: 7px;
            color: rgb(202, 199, 199);
            font-size: 18px;
        }
        .cats {
            width: 55px;
            height: 140px;
            background-color: rgba(206, 205, 205, 0.726);
            position: absolute;
            left: 15px;
            top: 35px;
            .cat_item {
                width: 100%;
                line-height: 35px;
                text-align: center;
                font-size: 15px;
                transition: all 0.2s linear;
            }
            .red {
                color: rgb(145, 1, 1);
            }
        }
    }
    .nav::-webkit-scrollbar {
        display: none;
    }
    .nav {
        width: 85%;
        height: 35px;
        white-space: nowrap;
        overflow-x: auto;
        position: absolute;
        top: 0;
        left: 10%;
        .nav_item {
            display: inline-block;
            padding: 0 5px;
            line-height: 35px;
            color: rgb(160, 159, 159);
        }
        .light {
            color: rgb(250, 250, 250);
        }
    }
    .view {
        width: 100%;
        height: 100%;
        overflow: auto;
        .views_ul {
            margin-top: 15px;
            width: 100%;
            padding: 0 12px;
            box-sizing: border-box;
            li {
                width: 100%;
                height: 105px;
                margin-bottom: 12px;
                .view_img {
                    height: 100%;
                    float: left;
                    width: 79px;
                    border-radius: 5px;
                }
                .mess {
                    float: left;
                    width: 65%;
                    height: 100%;
                    margin-left: 10px;
                    color: #999;
                    p {
                        width: 100%;
                        line-height: 25px;
                    }
                    .book_name {
                        font-size: 16px;
                        color: rgb(231, 231, 231);
                    }
                    .author {
                        color: rgb(218, 218, 218);
                    }
                }
            }
        }
    }
}
</style>
<script>
import {readAPI} from '../../../api/adr'
export default {
   data(){
       return {
           all:[],
           cat:'男生',
           cat_show:false,
           index:0,
           id:null,
           view:false,
           books:[],
           show:false
       }
   },
   computed:{
       'nav_list'(){
           return this.all[this.index]
       }
   },
   watch:{
       'id'(newval){
           this.getList(newval)
       }
   },
   methods:{
       getData(){
           this.$axios.get(`${readAPI}/rank-category`).then(res=>{
                this.all= [res.data.male,res.data.female,res.data.picture,res.data.epub]
                this.id = res.data.male[0]._id
                this.show = true
           })
       },
       changeCat(e,n){
           this.cat_show = false
           this.cat=e
           this.index = n
           this.id = this.all[n][0]._id
       },
       handleId(id){
           this.id = id
       },
       getList(id){
           this.view = false
           this.$axios.get(`${readAPI}/rank/${id}`).then(res=>{
                this.books = res.data.ranking.books.slice(2)
                this.view = true
           })
       }
   },
   created(){
       this.getData()
   },
   mounted(){}
}
</script>
<template>
   <div class="class_musicBox" :style="`height:${$store.state.height-80}px`">
        <h3 class="title"><span class="icon-earth"></span>语种</h3>
        <div class="body_list clear">
            <a href="#" 
            :class="{'body_item':true,'light':item.name==title}"
            v-for="item in list_1"
            :key="item.name"
            @click.prevent="change(item.name)">{{item.name}}</a>
        </div>
        <h3 class="title"><span class="icon-leaf"></span>风格</h3>
        <div class="body_list clear">
            <a href="#" 
            :class="{'body_item':true,'light':item.name==title}"
            v-for="item in list_2"
            :key="item.name"
             @click.prevent="change(item.name)">{{item.name}}</a>
        </div>
        <h3 class="title"><span class="icon-eercast"></span>场景</h3>
        <div class="body_list clear">
            <a href="#" 
            :class="{'body_item':true,'light':item.name==title}"
            v-for="item in list_3"
            :key="item.name"
             @click.prevent="change(item.name)">{{item.name}}</a>
        </div>
        <h3 class="title"><span class="icon-hipster"></span>情感</h3>
        <div class="body_list clear">
            <a href="#" 
            :class="{'body_item':true,'light':item.name==title}"
            v-for="item in list_4"
            :key="item.name"
             @click.prevent="change(item.name)">{{item.name}}</a>
        </div>
        <h3 class="title"><span class="icon-gift"></span>主题</h3>
        <div class="body_list clear">
            <a href="#" 
            :class="{'body_item':true,'light':item.name==title}"
            v-for="item in list_5"
            :key="item.name"
             @click.prevent="change(item.name)">{{item.name}}</a>
        </div>
   </div>
</template>
<script>
import {musicAPI} from '../../../api/adr.js'
export default {
    props:{
        'title':{
            type:String,
            default:'全部'
        }
    },
   data(){
       return {
           list_1:[],
           list_2:[],
           list_3:[],
           list_4:[],
           list_5:[]
       }
   },
   watch:{},
   methods:{
        getClass() {
            this.$axios.get(`${musicAPI}/playlist/catlist`).then(res => {
                res.data.sub.forEach(ele => {
                    if(ele.category==0){
                        this.list_1.push(ele)
                    }else if(ele.category==1){
                        this.list_2.push(ele)
                    }else if(ele.category==2){
                        this.list_3.push(ele)
                    }else if(ele.category==3){
                        this.list_4.push(ele)
                    }else if(ele.category==4){
                        this.list_5.push(ele)
                    }
                }); 
            })
         },
         change(e){
             this.$emit('setData',e)
         }
   },
   created(){
       this.getClass()
   }
}
</script>
<style scoped lang="scss">
.class_musicBox::-webkit-scrollbar {
    display: none;
}
.class_musicBox {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.883);
    z-index: 500;
    overflow: auto;
    padding: 0 12px;
    box-sizing: border-box;
    .title {
        width: 100%;
        height: 35px;
        color: rgb(216, 216, 216);
        line-height: 35px;
        font-size: 18px;
        padding-left: 25px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 12px;
        span {
            font-size: 20px;
            color: rgb(5, 131, 180);
            position: absolute;
            left: 0;
            line-height: 35px;
        }
    }
    .body_list {
        width: 100%;
        margin-bottom: 20px;
        .body_item {
            float: left;
            padding: 0 9px;
            font-size: 15px;
            color: rgb(200, 199, 199);
            line-height: 25px;
            margin-bottom: 15px;
        }
        .light {
            color: rgb(168, 2, 2);
        }
    }
}
</style>
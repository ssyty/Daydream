<template>
   <div class="listen">
      <div class="emtpy" v-if="list.length==0">
         当前暂无记录
      </div>
      <h3 class="title">最近收听({{list.length}}) <span @click="delate">清除记录</span></h3>
       <ul v-if="list.length>0">
          <li v-for="item in list" :key="item.id" @click="playSong(item.id)">
             <div class="mess">
                <p class="name">{{item.name}}</p>
                <p class="nick">{{item.ar[0].name}} - {{item.al.name==undefined?'':item.al.name}}</p>
             </div>
          </li>
       </ul>
   </div>
</template>
<style scoped lang="scss">
.listen {
     width: 100%;
     position: relative;
     .emtpy {
        width: 100%;
        line-height: 65px;
        color: rgb(204, 204, 204);
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: 45px;
     }
     .title {
        width: 100%;
        line-height: 45px;
        padding-left: 25px;
        box-sizing: border-box;
        color: rgb(194, 192, 192);
        border-bottom: 1px solid rgb(107, 106, 106);
        margin-bottom: 25px;
        span {
           position: absolute;
           line-height: 45px;
           right: 20px;
           color: rgb(139, 139, 139);
           font-size: 14px;
           font-weight: 400;
        }
     }
     ul {
        width: 100%;
        
        box-sizing: border-box;
        li {
           width: 100%;
           height: 50px;
           padding: 0 15px;
           box-sizing: border-box;
           background-color: rgba(255, 255, 255, 0.212);
           margin-bottom: 5px;
           p {
              line-height: 25px;
              color: rgb(211, 211, 211);
           }
           .name {
              font-size: 16px;
           }
        }
     }
}
</style>
<script>
export default {
   data(){
       return {
          list:JSON.parse(localStorage.getItem('mylistens'))||[]
       }
   },
   watch:{},
   methods:{
      playSong(id){

      },
      delate(){

      }
   },
   created(){
      
   },
   mounted(){}
}
</script>
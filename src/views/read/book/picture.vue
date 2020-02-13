<template>
   <div>
      <top v-show="!set_show" :isload="show"></top>
   </div>
</template>
<style scoped lang="scss"></style>
<script>
import {readAPI} from '../../../api/adr'
import { format } from 'path'
export default {
   data(){
       return {
          show:false,
          set_show:false,
          list:JSON.parse(localStorage.getItem('picture_list')).list,
          pic_list:[],
          title:''
       }
   },
   watch:{},
   methods:{
      getData(i){
         let link = encodeURIComponent(this.list[i].link)
         this.$axios.get(`${readAPI}/chapters/${link}`).then(res=>{
              this.pic_list = res.data.chapter.cpContent.split('\n')
              this.title = res.data.chapter.title
              this.show = true
         })
      }
   },
   created(){
      this.getData(this.$route.params.page)  
   },
   mounted(){}
}
</script>
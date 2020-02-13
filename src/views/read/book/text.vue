<template>
   <div class="text_box" ref="box" :style="`backgroundColor:${$store.state.text_setColor.color}`">
      <transition enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
         <top :title="title | opTitle(title)" :isload="false" v-show="setShow"></top>
      </transition>
      <main @click="showSet">
         <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
            <div class="contents animated" v-if="show">
               <p class="con_item" v-for="(item,i) in text" :key="i"
                  :style="`color:${$store.state.text_setColor.text}`">
                  {{item}}
               </p>
            </div>
         </transition>
      </main>

      <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
         <div class="bottom animated" v-show="setShow" @click="setting">
            <div class="set">
               <div class="set_top">
                  <span class="dark icon-light-down"></span>
                  <van-slider v-model="value" @change="onChange" bar-height="3px"
                     active-color="rgba(194, 193, 193, 0.856)" class="lang">
                     <div slot="button" class="custom-button"></div>
                  </van-slider>
                  <span class="light icon-light-up"></span>
               </div>
               <div class="set_font">
                  <div class="font">
                     <span class="icon-superscript2"></span>
                     <span class="icon-subscript2"></span>
                  </div>
                  <div class="book_list">
                     <span class="icon-file-text"></span>
                  </div>
               </div>
               <div class="color_change">
                  <a href="#" :style="`backgroundColor:${item.color};color:${item.text}`"
                     :class="{'color_item':true,'icon-done':$store.state.text_setColor.num==i}"
                     @click.prevent="changeColor(i)" v-for="(item,i) in $store.state.text_bg" :key="i">
                  </a>
               </div>
            </div>
         </div>
      </transition>
   </div>
</template>
<script>
   import {
      readAPI
   } from '../../../api/adr.js'
   export default {
      data() {
         return {
            value: 50,
            show: false,
            title: '',
            setShow: false,
            text: '',
            set: false,
            page: null,
            timer: null,
            width: null,
            list: JSON.parse(localStorage.getItem('book_list')).list
         }
      },
      watch: {
         'setShow'(newval) {

            if (!this.set) {
               this.timer = setTimeout(() => {
                  this.setShow = false
               }, 7000);
            }
         },
         'page'(newval) {
            if (newval >= 0) {
               this.show = false
               this.getText(newval)
            } else {
               return this.page = 0
            }
         }
      },
      filters: {
         opTitle(str) {
            return str
         }
      },
      methods: {
         getText(i) {
            let link = encodeURIComponent(this.list[i].link)
            this.$axios.get(`${readAPI}/chapters/${link}`).then(res => {
               this.text = res.data.chapter.cpContent.split('\n')
               this.title = res.data.chapter.title
             
               this.show = true
            })
         },
         showSet() {
            clearTimeout(this.timer)
            let w = event.x / this.width
            if (w < 0.4 && this.page > 0) {
               this.setShow = false
               this.page--
            } else if (w > 0.6) {
               this.setShow = false
               this.page++
            } else {
               if (this.setShow) {
                  this.setShow = false
                  this.set = false
               } else {
                  this.setShow = true
               }
            }
         },
         setting() {
            this.set = true
            clearTimeout(this.timer)
         },
         changeColor(e) {
            this.$store.commit('setTextColor', e)
         },
         onChange() {

         }
      },
      created() {
         this.page = this.$route.params.page
      },
      mounted() {
         this.width = parseInt(document.querySelector('.text_box').scrollWidth)
      },
      beforeDestroy() {
         let arr = JSON.parse(localStorage.getItem('read_lists')) || []
         let book = JSON.parse(localStorage.getItem('book_list'))
         if (arr != []) {
            let index = arr.findIndex(ele => {
               return book.book._id == ele.book._id
            })
            if (index != -1) {
               let newArr = arr.map(ele => {
                  if (ele.book._id == book.book._id) {
                     return {
                  book: ele.book,
                  list: ele.list,
                  page: parseInt(this.page)
               }
                  }
               })
               localStorage.setItem('read_lists', JSON.stringify(newArr))
            } else {
               let a = {
                  book: book.book,
                  list: book.list,
                  page: parseInt(this.page)
               }
               arr.unshift(a)
               localStorage.setItem('read_lists', JSON.stringify(arr))
            }
         }else {
            let a = {book:book.book,list:book.list,page:parseInt(this.page)}
            arr.unshift(a)
            localStorage.setItem('read_lists', JSON.stringify(arr))
         }
      }
   }
</script>
<style scoped lang="scss">
   .text_box {
      width: 100%;
      height: 100%;
      position: relative;
      box-sizing: border-box;
      transition: all 1s linear;

      .contents::-webkit-scrollbar {
         display: block;
      }

      main {
         width: 100%;
         height: 100%;
         box-sizing: border-box;
         padding: 0 0 0 25px;
         transition: all 0.2s linear;

         .contents {
            width: 100%;
            height: 100%;
            overflow: auto;
            line-height: 35px;
            font-size: 16px;
            transition: all 1s linear;
         }
      }

      .bottom {
         width: 100%;
         height: 40%;
         background-color: rgba(0, 0, 0, 0.678);
         position: absolute;
         bottom: 0;

         .set {
            width: 100%;
            height: 100%;

            .set_top {
               width: 100%;
               height: 45px;
               position: relative;

               .lang {
                  width: 70%;
                  height: 3px;
                  background-color: rgba(59, 59, 59, 0.555);
                  border-radius: 2px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  .custom-button {
                     width: 12px;
                     height: 12px;
                     border-radius: 50%;
                     background-color: #fff;
                  }
               }

               span {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  color: rgb(246, 246, 246);
               }

               .dark {
                  left: 9%;
                  font-size: 18px;
               }

               .light {
                  right: 8%;
                  font-size: 18px;
               }
            }

            .set_font {
               width: 100%;
               height: 60px;
               position: relative;
               display: flex;

               .font {
                  flex: 2;
                  position: relative;

                  span {
                     font-size: 26px;
                     color: rgb(221, 221, 221);
                     position: absolute;
                     top: 50%;
                     transform: translateY(-50%);
                  }

                  .icon-superscript2 {
                     left: 15px;
                  }

                  .icon-subscript2 {
                     left: 75px;
                  }
               }

               .book_list {
                  flex: 1;
                  font-size: 24px;
                  color: rgb(207, 207, 207);
                  position: relative;

                  .icon-file-text {
                     font-size: 24px;
                     position: absolute;
                     top: 50%;
                     left: 50%;
                     transform: translate(-50%, -50%);
                  }
               }
            }

            .color_change::-webkit-scrollbar {
               display: none;
            }

            .color_change {
               width: 90%;
               height: 55px;
               overflow-x: scroll;
               white-space: nowrap;
               margin: 0 auto;
               transition: all 1s linear;

               .color_item {
                  width: 35px;
                  height: 35px;
                  display: inline-block;
                  background-color: rgb(107, 97, 96);
                  border-radius: 50%;
                  margin: 10px 25px 0 0;
                  line-height: 35px;
                  text-align: center;
                  font-size: 25px;
                  color: rgb(214, 213, 213);
                  transition: all 1s linear;
               }
            }
         }

      }
   }
</style>
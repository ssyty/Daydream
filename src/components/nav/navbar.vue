<template>
   <div class="nav_bar">
            <router-link
            to="/film"
            class="nav_link">
             <span class="icon-film"></span>
             电影
            </router-link>
            <router-link
            to="/music"
            class="nav_link">
             <span class="icon-music"></span>
             音乐
            </router-link>
            <router-link
            to="/read"
            class="nav_link">
             <span class="icon-bookclass"></span>
             读书
            </router-link>
            <router-link
            to="/home"
            class="nav_link">
             <span class="icon-home"></span>
             主页
            </router-link>
        </div>
</template>
<script>
export default {
   data(){
       return {}
   },
   watch:{},
   methods:{},
   created(){}
}
</script>
<style scoped lang="scss">
.nav_bar {
    width: 100%;
    height: 55px;
    background-color: rgba(0, 0, 0, 0.678);
    position: fixed;
    bottom: 0;
    display: flex;
    z-index: 700;
}
.nav_link {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: rgb(95, 95, 95);
}
.nav_link span {
    font-size: 22px;
    display: block;
    padding: 10px 0 3px;
}
.router-link-active {
    color: rgb(216, 216, 216);
}
</style>
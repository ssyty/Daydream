 const mutations = {
     audioBox(state,e){
         state.audio = e
     },
     isPlay(state){
          if(state.audio.paused){
            state.audio.play()
          }else{
            state.audio.pause()
          }
          
     },
    setClassMusicBox(state) {
        // 分类框显示隐藏
        state.class_musicBox = !state.class_musicBox
    },
    setMusicBox(state, e) {
        // 播放组件的显示
        state.musicBox_show = e
    },
    setHeight(state, h) {
        state.height = h
    },
    setMusicList(state, list) {
        // 播放歌单的设置
        state.musicList = list
    },
    showMusicList(state,e) {
        // 播放歌单的显示与隐藏
        state.musicList_show = e
    },
    setTime(state, t) {
        // 播放歌曲时的时间更新
        state.time = t
    },
    setTimeIndex(state,index){
        state.current = index
    },
    getSongUrl(state, url) {
        // 设置歌曲播放的地址
        console.log(url);
        
        state.songUrl = url
    },
    setLrc(state,arr){
        state.songLrc = arr
    },
    setIndex(state, i) {
        // 设置当前歌曲在歌单的位置
        state.index = i
    },
    setSongId(state, id) {
        // 设置歌曲的id
        state.songId = id
    },
    setLoop(state, e) {
        // 设置歌曲的播放模式，
        state.loop = e
    },
    setVum(state, e) {
        // 设置音量
        state.vum = e
    },
    setType(state, e) {
        // 设置搜索类型
        state.type = e
    },
    setTextColor(state,e){
        // 读书页面设置
        state.text_setColor = state.text_bg[e]
    },
    setSearchBox(state,e){
        // 显示搜索页面
         state.search_show = e
    },
    setLogIn(state,e){
         state.isLogin = e
    }
}

export default mutations 
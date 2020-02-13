 const state = {
     isLogin:false,
     bg_color: '#fff',
     height: null,
     type: {
         key:1,
         text:'电影'
     },
     musicList: [],
     loop: 0,
     musicList_show: false,
     musicBox_show: false,
     class_musicBox: false,
     search_show:false,
     time: 0,
     songUrl: null,
     songId: 167876,
     songLrc: [{time:0,lrc:'点击获取歌词'}],
     audio:null,
     current: 0,
     index: 0,
     vum: 1,
     music_class: ['全部', '华语', '摇滚', '怀旧', '清新', '学习', '民谣', '校园', '说唱', '游戏'],
     text_bg: [{
         num: 0,
         color: 'rgb(255, 255, 255)',
         text: '#333'
     }, {
         num: 1,
         color: 'rgb(107, 97, 96)',
         text: 'rgb(211, 211, 211)'
     }, {
         num: 2,
         color: 'rgb(0, 108, 112)',
         text: 'rgba(20, 20, 20, 0.925)'
     }, {
         num: 3,
         color: 'rgb(95, 27, 0)',
         text: 'rgba(233, 233, 233, 0.925)'
     }, {
         num: 4,
         color: 'rgb(103, 158, 0)',
         text: 'rgb(24, 23, 23)'
     }, {
         num: 5,
         color: 'rgb(66, 0, 39)',
         text: 'rgb(214, 213, 213)'
     }, {
         num: 6,
         color: 'rgb(77, 5, 0)',
         text: 'rgb(214, 213, 213)'
     }],
     text_setColor: {
         num: 0,
         color: 'rgb(255, 255, 255)',
         text: '#333'
     }
 }

 export default state
import Router from 'vue-router'

import result from '../components/header/search/result.vue'
import search from '../components/header/search/search.vue'

// 电影
import film from '../views/film/film.vue'
import film_detail from '../views/film/film_detail.vue'
import film_rank from '../views/film/rank/rank_detail.vue'

// 音乐
import music from '../views/music/music.vue'
import class_musiclist from '../views/music/class/music_class.vue'
import musiclist_detail from '../views/music/detail/musiclist_detail.vue'
import ranking from '../views/music/rank/ranking.vue'
import radio from '../views/music/radio/radio.vue'
import radio_rec from '../views/music/radio/detail/radio_rec.vue'
import daily from '../views/music/radio/detail/daily.vue'
import radio_class from '../views/music/radio/detail/radio_class.vue'
import radio_pro from '../views/music/radio/detail/radio_pro.vue'

// 读书
import read from '../views/read/read.vue'
import book_detail from '../views/read/detail/book_detail.vue'
import picture_detail from '../views/read/detail/picture_detail.vue'
import chapter from '../views/read/book/chapter.vue'
import text from '../views/read/book/text.vue'
import picture from '../views/read/book/picture.vue'
import read_rank from '../views/read/rank/read_rank.vue'
import booklist from '../views/read/booklist.vue'
import booklist_detail from '../views/read/detail/booklist_detail.vue'

import bookClass_detail from '../views/read/detail/bookClass_detail.vue'

// 个人主页
import home from '../views/home/home.vue'
import selected from '../views/home/selected.vue'
import login from '../views/home/login/login.vue'
import phone from '../views/home/login/phone.vue'
import password from '../views/home/login/password.vue'
import find_password from '../views/home/login/find_password.vue'
import captcha from '../views/home/login/captcha.vue'

// 个人信息
import message from '../views/home/admin/message.vue'
import my_musicList from '../views/home/admin/my_musicList.vue'
import my_listen from '../views/home/admin/my_listen.vue'
import my_read from '../views/home/admin/my_read.vue'
import setting from '../views/home/admin/setting.vue'
import want_film from '../views/home/admin/want_film.vue'
import my_booklist from '../views/home/admin/my_booklist.vue'


let router = new Router({
    routes: [
        {
            path: '/film',
            component: film
            // 推荐电影
        },
        {
            path: '/film_detail/:id',
            component: film_detail
            // 电影详情
        },
        {
            path:'/film_rank/:type',
            component:film_rank
            // 电影榜单详情
        },
        {
            path: '/music',
            component: music
            // 推荐音乐
        },
        {
            path: '/class_musiclist',
            component: class_musiclist
            // 音乐歌单分类详情
        },
        {
            path:'/radio',
            component:radio,
            // 电台
            children:[
                {
                    path:'/radio',
                    redirect:'/radio/radio_rec'
                },
                {
                    path:'radio_rec',
                    component:radio_rec
                },
                {
                    path:'daily',
                    component:daily
                },
                {
                    path:'radio_class',
                    component:radio_class
                },
                {
                    path:'radio_pro',
                    component:radio_pro
                },
            ]
        },
        {
            path: '/musiclist_detail/:id',
            component: musiclist_detail
            // 歌单详情
        },
        {
            path: '/ranking',
            component: ranking
            // 音乐榜单
        },
        {
            path: '/read',
            component: read
            // 推荐书籍
        },
        {
            path:'/read_rank',
            component:read_rank
            // 读书排行榜
        },
        {
            path:'/booklist',
            component:booklist
        },
        {
            path:'/booklist_detail/:id',
            component:booklist_detail
        },
        {
            path:'/bookClass_detail/:cat',
            component:bookClass_detail
            // 书籍分类详情页
        },
        {
            path: '/chapter/:type',
            component: chapter
            // 书籍章节页
        },
        {
            path: '/book_detail/:id',
            component: book_detail
            // 书籍详情页
        },
        {
            path:'/picture_detail/:id',
            component:picture_detail
            // 漫画详情页
        },
        {
            path:'/picture/:page',
            component:picture
            // 漫画阅读页
        },
        {
            path: '/text/:page',
            component: text
            // 书籍阅读页
        },
        {
            path: '/selected',
            component: selected
            // 选择登录页面
        },
        {
            path: '/home',
            component: home,
            // 个人主页
            children:[
                {
                    path:'/home',
                    redirect:'/home/message'
                },
                {
                    path:'message',
                    component:message

                },
                {
                    path:'my_musicList',
                    component:my_musicList
                },
                {
                    path:'my_listen',
                    component:my_listen
                },
                {
                    path:'my_read',
                    component:my_read
                },
                {
                    path:'want_film',
                    component:want_film
                },
                {
                    path:'setting',
                    component:setting
                },
                {
                    path:'my_booklist',
                    component:my_booklist
                }
            ]
        },
        {
            path: '/login',
            component: login,
            // 登录页面
            children: [{
                    path: "phone",
                    component: phone
                    // 手机号
                },
                {
                    path: 'password',
                    component: password
                    // 密码
                },
                {
                    path:'find_password',
                    component:find_password
                    // 找回密码，修改密码
                },
                {
                    path:'captcha',
                    component:captcha
                }
            ]
        },
        {
            path:'/result/:type/:words',
            component:result
            // 搜索详情页
        },
        {
            path:'/search/:type',
            component:search
            // 搜索
        },
        
    ]
})

export default router
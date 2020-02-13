import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

import state from './state.js'
import mutations from './mutations.js'

const store = new vuex.Store({
    state,
    mutations,
    getters:{
        getTime:function(state){
            return 0 
        }
    }
    
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'

import role from './modules/role'
import user from './modules/user'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    role,
    user,
    task
  }
})

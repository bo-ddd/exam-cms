import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '../views/LayoutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    redirect:'/myDiary',
    component: LayoutView,
    children:[
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/question',
        name: 'question',
        component: () => import(/* webpackChunkName: "question" */ '../views/QuestionView.vue')
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
      },
      {
        path: '/myDiary',
        name: 'myDiary',
        component: () => import(/* webpackChunkName: "myDiary" */ '../views/userCenter/MyDiary.vue')
      },
      {
        path: '/createTask',
        name: 'createTask',
        component: () => import(/* webpackChunkName: "createTask" */ '../views/task/CreateTask.vue')
      },
      {
        path: '/taskList',
        name: 'taskList',
        component: () => import(/* webpackChunkName: "taskList" */ '../views/task/TaskList.vue')
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        component: () => import(/* webpackChunkName: "roleManage" */ '../views/role/RoleManage.vue')
      },
      {
        path: '/permissionConfig',
        name: 'permissionConfig',
        component: () => import(/* webpackChunkName: "permissionConfig" */ '../views/role/PermissionConfig.vue')
      },
      {
        path:'/createRole',
        name:'createRole',
        component: () => import(/* webpackChunkName: "createRole" */ '../views/role/CreateRole.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },

  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

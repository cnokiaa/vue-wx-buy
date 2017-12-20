import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
  {
    path:'/upload',component:require('../views/upload.vue')
  },
  {
    path:'/info',component:require('../views/info.vue')
  },
  {
    path:'/cards',component:require('../views/cards.vue')
  },
  {
    path:'/apply',component:require('../views/apply.vue')
  },
  {
    path:'/done',component:require('../views/done.vue')
  },
  {
    path:'/status',component:require('../views/status.vue')
  },
  {
    path:'*',redirect:'/upload'
  }]
})

export default router;

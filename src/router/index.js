import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);
// 路径参数

const routes = [{
    path: '/login',
    name: '登录',
    component: resolve => require(['@/page/login/index'], resolve)
  },{
    path: '/domain/index/',
    name: '域名交易_手机版',
    component: resolve => require(['@/page/domain/index'], resolve)
  },
  {
    path: '/domain/detail/',
    name: '域名交易',
    component: resolve => require(['@/page/domain/detail'], resolve)
  }
];
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});
export default router;

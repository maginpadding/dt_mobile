import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);
// 路径参数

const routes = [{
    path: '/login',
    name: '登录',
    component: resolve => require(['@/page/login/index'], resolve)
  }, {
    path: '/domain/index/',
    name: '域名交易_手机版',
    component: resolve => require(['@/page/domain/index'], resolve)
  },
  {
    path: '/domain/detail/:id',
    name: '域名详情',
    component: resolve => require(['@/page/domain/detail'], resolve)
  }, {
    path: '/domain/publish/',
    name: '域名发布',
    component: resolve => require(['@/page/domain/publish'], resolve)
  }, {
    path: '/domain/order/:id',
    name: '域名发布订单',
    component: resolve => require(['@/page/domain/order'], resolve)
  }
];
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});
export default router;

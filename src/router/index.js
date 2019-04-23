import Vue from 'vue';
import VueRouter from 'vue-router';

// import domain from '@/page/pc/domain/index';
// import domainM from '@/page/mobile/domain/index';
// import domainDetail from '@/page/pc/domain/detail';
// import domainMobile from '@/page/mobile/domain/index';

Vue.use(VueRouter);
// 路径参数

const routes = [{
    path: '/login',
    name: '登录',
    component: resolve => require(['@/page/pc/login/index'], resolve)
  }, {
    path: '/domain/index/',
    name: '域名交易',
    component: resolve => require(['@/page/pc/domain/index'], resolve)
  }, {
    path: '/domain/detail/:id',
    name: '域名详情',
    component: resolve => require(['@/page/pc/domain/detail'], resolve)
  }, {
    path: '/domain/publish/',
    name: '域名发布',
    component: resolve => require(['@/page/pc/domain/publish'], resolve)
  }, {
    path: '/domain/order/:id',
    name: '域名发布订单',
    component: resolve => require(['@/page/pc/domain/order'], resolve)
  }, {
    path: '/domain/index/mobile',
    name: '域名交易_手机版',
    component: resolve => require(['@/page/mobile/domain/index'], resolve)
  },
  {
    path: '/domain/detail/mobile',
    name: '域名交易',
    component: resolve => require(['@/page/mobile/domain/detail'], resolve)
  },
  {
    path: '/test',
    name: '测试专用',
    component: resolve => require(['@/components/test/index'], resolve)
  }
];
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});
export default router;

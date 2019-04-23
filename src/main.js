import Vue from 'vue';
import App from './App.vue';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//router.js
import router from './router/index';
//mock.js模拟数据
// import Mock from './mock/mock' // 刚刚手写的mock.js文件
// import axios from 'axios' // axios http请求库

// axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
// Vue.prototype.$http = axios



Vue.config.productionTip = false;

// Vue.use(Axios);

// Vue.use(VueAxios , Axios);
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
    render : h => h(App) ,
    router
}).$mount('#app');
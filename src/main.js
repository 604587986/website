import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'


import { Button, Layout, menu, Icon, Breadcrumb } from 'ant-design-vue';
Vue.use(Button)
Vue.use(Layout)
Vue.use(menu)
Vue.use(Icon)
Vue.use(Breadcrumb)

import "@/assets/iconfont/iconfont.css"; //阿里巴巴图标库







Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

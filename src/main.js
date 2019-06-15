import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import 'ant-design-vue/dist/antd.less';  // or 'ant-design-vue/dist/antd.less'
import { Button, Layout, menu, Icon, Breadcrumb, Form, Input, Checkbox ,Notification} from 'ant-design-vue';
Vue.use(Button)
Vue.use(Layout)
Vue.use(menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Notification)

import "@/assets/iconfont/iconfont.css"; //阿里巴巴图标库






import "@/permission"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import { Button, Layout, Menu, Icon, Breadcrumb, Form, Input, Checkbox,Table,Tag,Collapse,Modal } from 'ant-design-vue';
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Collapse)
Vue.use(Modal)

import "@/assets/iconfont/iconfont.css"; //阿里巴巴图标库






import "@/permission"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

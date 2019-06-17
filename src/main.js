import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import { Button, Layout, Menu, Icon, Breadcrumb, Form, Input, Checkbox,Table,Tag,Collapse,Modal,Spin,Radio,Select } from 'ant-design-vue';
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
Vue.use(Spin)
Vue.use(Radio)
Vue.use(Select)

import "@/assets/iconfont/iconfont.css"; //阿里巴巴图标库
import "@/assets/public.less"; 

import crumb from "@/components/Breadcrumb"
Vue.component('wy-crumb',crumb)



import "@/permission"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

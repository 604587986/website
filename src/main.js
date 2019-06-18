import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import { LocaleProvider, Button, Layout, Menu, Icon, Breadcrumb, Form, Input, Checkbox, Table, Tag, Collapse, Modal, Spin, Radio, Select, TreeSelect, Cascader, Row, Col, message, Popconfirm, DatePicker, Switch } from 'ant-design-vue';
Vue.use(LocaleProvider)
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
Vue.use(TreeSelect)
Vue.use(Cascader)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popconfirm)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.prototype.$message = message;


import "@/assets/iconfont/iconfont.css"; //阿里巴巴图标库
import "@/assets/public.less";

import crumb from "@/components/Breadcrumb"
Vue.component('wy-crumb', crumb)

import PageHeadActionWrapper from "@/components/PageHeadActionWrapper"
Vue.component('PageHeadActionWrapper', PageHeadActionWrapper)

import mixin from "@/utils/mixin"
Vue.mixin(mixin)

import "@/permission"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

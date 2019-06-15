<template>
  <div class="user-basic-layout">
    <the-header></the-header>
    <a-button type="primary" @click="backToAdmin" v-if="isMock">返回系统管理员界面</a-button>
    <router-link to="/workbench">工作台</router-link>
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
</template>
<script>
import theHeader from "./Header";
import theFooter from "./Footer";
import Cookie from "js-cookie";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      isMock: Cookie.get("mock_user") ? true : false
    };
  },
  components: {
    theHeader,
    theFooter
  },
  methods: {
    backToAdmin() {
      Cookie.remove("mock_user");
      Cookie.remove("mock_site");
      setTimeout(() => {
        location.href = "/";
      }, 300);
    }
  }
};
</script>

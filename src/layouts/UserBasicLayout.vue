<template>
  <div class="user-basic-layout">
    <a-layout-header>
      <the-header></the-header>
    </a-layout-header>
    <router-link to="/workbench">工作台</router-link>
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
</template>
<script>
import theHeader from "./UserHeader";
import theFooter from "./Footer";
export default {
  data() {
    return {
    };
  },
  components: {
    theHeader,
    theFooter
  },

};
</script>

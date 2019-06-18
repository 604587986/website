<template>
  <div class="admin-basic-layout">
    <a-layout :style="{minHeight:'100vh'}">
      <a-layout-header>
        <the-header></the-header>
      </a-layout-header>
      <the-nav></the-nav>
      <a-layout class="layout-content">
        <side-menu mode="inline" :menus="menus" :collapsed="collapsed" :collapsible="true"></side-menu>
        <a-layout style="padding: 0 24px">
          <wy-crumb></wy-crumb>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <route-view></route-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
      <a-layout-footer style="text-align: center">
        <the-footer></the-footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import theHeader from "./Header";
import theNav from "./AdminNav";
import theFooter from "./Footer";
import RouteView from "./RouteView";

import SideMenu from "@/components/menu/SideMenu";

export default {
  data() {
    return {};
  },
  computed: {
    collapsed() {
      return !this.$store.state.app.sidebar.opened;
    },

    menus() {
      const menus = this.$store.getters.addRouters.find(
        route => route.path === "/"
      ).children;
      return menus;
    }
  },
  components: {
    theHeader,
    theNav,
    theFooter,
    SideMenu,
    RouteView
  }
};
</script>
<style lang="less" scoped>
</style>

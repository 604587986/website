<template>
  <div class="admin-basic-layout">
    <a-layout :style="{minHeight:'100vh'}">
      <a-layout-header class="header">
        <the-header></the-header>
      </a-layout-header>
      <a-layout>
        <side-menu mode="inline" :menus="menus" :collapsed="false" :collapsible="true"></side-menu>
        <a-layout style="padding: 0 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
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
import theFooter from "./Footer";
import RouteView from "./RouteView";

import SideMenu from "@/components/menu/SideMenu";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    menus() {
      const menus = this.$store.getters.addRouters.find(
        route => route.path === "/"
      ).children;
      return menus;
    }
  },
  components: {
    theHeader,
    theFooter,
    SideMenu,
    RouteView
  }
};
</script>

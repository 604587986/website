<template>
  <div class="user-menu">
    <router-link to="/workbench" class="menu-item">
      <a-button class="menu-btn">工作台</a-button>
    </router-link>
    <router-link v-for="item in routers" :to="item.path" :key="item.id" class="menu-item">
      <a-button
        :type="$route.path === item.path?'primary':null"
        class="menu-btn"
      >{{item.meta.title}}</a-button>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routers: []
    };
  },
  created() {
    this.panelRouterMap(this.$store.getters.addRouters);
  },
  methods: {
    panelRouterMap(mapRouters = []) {
      mapRouters.forEach(route => {
        const _route = { ...route };
        if (_route.meta && _route.meta.showInPanel) {
          delete _route.children;
          delete _route.component;
          this.routers.push(_route);
        } else if (route.children) {
          this.panelRouterMap(route.children);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-menu {
  .menu-item {
    margin-right: 10px;
    .menu-btn {
      font-size: 12px;
      margin-bottom: 4px;
    }
  }
}
</style>

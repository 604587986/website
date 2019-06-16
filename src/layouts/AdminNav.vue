<template>
  <div class="nav clearfix">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt>
    </div>
    <div class="nav-item-wrapper">
      <router-link to="/workbench" class="nav-item">工作台</router-link>
      <router-link to="/site" class="nav-item">站点管理</router-link>
      <router-link to="/template" class="nav-item">发布监控</router-link>
    </div>
  </div>
</template>
<style lang="less" scoped>
.nav {
  height: 80px;
  line-height: 80px;
  background: #fff;
  padding: 0 50px;
  .logo {
    float: left;
  }
  .nav-item-wrapper {
    float: right;
    .nav-item {
      padding: 0 20px;
      font-size: 16px;
      color: #606266;
      &.router-link-active{
          color: #00a0e9;
      }
    }
  }
}
</style>

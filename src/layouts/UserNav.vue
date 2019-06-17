<template>
  <div class="public-container">
    <div class="nav clearfix">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt>
      </div>
      <div class="nav-item-wrapper">
        <div class="nav-item">
          <span class="text">发布文章</span>
          <span class="number">{{$store.state.user.init.statistics.PublishCount}}</span>
        </div>
        <div class="nav-item">
          <span class="text">今日发布</span>
          <span class="number">{{$store.state.user.init.statistics.TodayPublishCount}}</span>
        </div>
        <div class="nav-item">
          <span class="text">待审文章</span>
          <span class="number">{{$store.state.user.init.statistics.VerifyPendingCount}}</span>
        </div>
        <div class="nav-item">
          <span class="text">文章总数</span>
          <span class="number">{{$store.state.user.init.statistics.ArticleCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.public-container {
  background: #fff;
}
.nav {
  height: 80px;
  line-height: 80px;
  .logo {
    float: left;
  }
  .nav-item-wrapper {
    float: right;
    .nav-item {
      margin-left: 30px;
      font-size: 14px;
      color: #606266;
      display: inline-block;
      text-align: right;
      .text {
        vertical-align: middle;
        display: inline-block;
      }
      .number {
        color: #00a0e9;
        font-size: 34px;
        transition: all 0.3s;
        font-weight: 600;
        margin-left: 20px;
        vertical-align: middle;
        display: inline-block;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>

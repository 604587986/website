<template>
    <div class="header clearfix">
      <div class="actions">
        <span>修改密码</span>
        <i class="line">|</i>
        <span @click="logout">退出</span>
      </div>
      <div class="welcome">
        <i class="iconfont icon-user"></i>
        <span>欢迎您，</span>
        <span>{{$store.state.user.user.nickname}}</span>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    logout() {
      const {
        $store: { dispatch }
      } = this;

      dispatch("logout").then(res => {
        location.reload();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  color: #fff;
  .actions {
    float: right;
    .line {
      padding: 0 10px;
    }
    > span {
      cursor: pointer;
    }
  }
  .welcome {
    float: right;
    margin-right: 20px;
    .iconfont {
      padding: 0 10px;
    }
  }
}
</style>

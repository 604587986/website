<template>
  <div class="header clearfix">
    <div class="is-mock">
      <span @click="backToAdmin" v-if="isMock">返回系统管理员界面</span>
    </div>

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
import Cookie from "js-cookie";

export default {
  data() {
    return {
      isMock: Cookie.get("mock_user") ? true : false
    };
  },
  methods: {
    logout() {
      const {
        $store: { dispatch }
      } = this;

      dispatch("logout").then(res => {
        location.reload();
      });
    },
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
<style lang="less" scoped>
.header {
  color: #fff;
  .is-mock {
    float: left;
    >span{
      cursor: pointer;
    }
  }
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

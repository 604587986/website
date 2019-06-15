<template>
  <div>
    <a-button type="primary" @click="logout">退出</a-button>
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

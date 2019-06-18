<template>
  <div class="page-top-action-wrapper">
    <a-row>
      <a-col v-bind="layout" class="left">
        <slot name="left"></slot>
      </a-col>
      <a-col v-bind="layout" class="right">
        <slot name="right"></slot>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layout: {
        span: 12,
      }
    };
  }
};
</script>

<style lang="less">
.page-top-action-wrapper {
  margin-bottom: 6px;
  .left {
    text-align: left;
    .ant-btn {
      margin-right: 20px;
      margin-bottom: 2px;
    }
  }
  .right {
    text-align: right;
    .ant-btn {
      margin-left: 20px;
      margin-bottom: 2px;

    }
  }
}
</style>

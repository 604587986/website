<template>
  <div class="filter-form">
    <a-row>
      <a-col :span="22">
        <a-form layout="inline" :form="form">
          <a-form-item label="关键字">
            <a-input
              size="small"
              v-decorator="['keyword']"
              placeholder="关键字搜索"
              @keyup.enter="nextSearch"
              @blur="nextSearch"
            ></a-input>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="2" class="filter-clear">
        <a-button size="small" type="dashed" @click="clear">清空筛选</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {};
  },

  computed: {},
  methods: {
    search() {
      const data = { ...this.form.getFieldsValue() };

      this.$emit("search", data);
    },
    clear() {
      this.form.resetFields();
      this.search();
    },
    nextSearch() {
      this.$nextTick(() => {
        this.search();
      });
    }
  }
};
</script>
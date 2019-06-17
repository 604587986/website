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
          <a-form-item label="所属分类">
            <a-select
              size="small"
              v-decorator="['category_id']"
              placeholder="所属分类"
              :dropdownMatchSelectWidth="false"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in category_list"
                :value="item.id"
                :key="item.id"
              >{{item.title}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="显示状态">
            <a-select
              size="small"
              v-decorator="['type']"
              placeholder="显示状态"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in type_list"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</a-select-option>
            </a-select>
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
import { getCategory } from "@/api/links";
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      category_list: [],
      type_list: [
        {
          value: 1,
          label: "显示"
        },
        {
          value: -1,
          label: "隐藏"
        }
      ]
    };
  },

  mounted() {
    this.getCategory();
  },
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
    },
    //获取分类列表
    getCategory() {
      getCategory({ page: 0 }).then(res => {
        this.category_list = res.data.list;
      });
    }
  }
};
</script>
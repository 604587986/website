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

          <a-form-item label="所属站点">
            <a-select
              size="small"
              v-decorator="['site_id']"
              placeholder="所属站点"
              :dropdownMatchSelectWidth="false"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in site_list"
                :value="item.id"
                :key="item.id"
              >{{item.title}}</a-select-option>
            </a-select>
          </a-form-item>


          <!-- <a-form-item>
				<a-button size="small" type="primary" @click="search">搜索</a-button>
          </a-form-item>-->
        </a-form>
      </a-col>
      <a-col :span="2" class="filter-clear">
        <a-button size="small" type="dashed" @click="clear">清空筛选</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { getSiteList } from "@/api/site";

export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      site_list: [],

      release_state_list: [
        {
          value: 1,
          label: "已发布"
        },
        {
          value: 0,
          label: "未发布"
        }
      ]
    };
  },
  mounted() {
    this.getSiteList();
  },
  methods: {
    search() {
      const data = { ...this.form.getFieldsValue() };
      if (data.category_id) {
        if (data.category_id.length) {
          data.category_id = data.category_id[data.category_id.length - 1];
        } else {
          delete data.category_id;
        }
      }
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
    //获取站点列表
    getSiteList() {
      getSiteList({ page: 0 }).then(res => {
        this.site_list = res.data.list;
      });
    },
  }
};
</script>
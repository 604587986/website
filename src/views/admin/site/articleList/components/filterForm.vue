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
          <a-form-item label="审核状态">
            <a-select
              size="small"
              v-decorator="['state_verify']"
              placeholder="审核状态"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in state_verify_list"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="站点">
            <a-select
              size="small"
              v-decorator="['site_id']"
              placeholder="所属站点"
              :dropdownMatchSelectWidth="false"
              allowClear
              @change="nextSearchAndGetCategory"
            >
              <a-select-option
                v-for="item in site_list"
                :value="item.id"
                :key="item.id"
              >{{item.title}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="所属分类">
            <a-cascader
              size="small"
              v-decorator="['category_id']"
              placeholder="所属分类"
              :options="category_list"
              :fieldNames="{label:'title',value:'id',children:'children'}"
              @change="nextSearch"
              changeOnSelect
            />
          </a-form-item>
          <a-form-item label="置顶状态">
            <a-select
              size="small"
              v-decorator="['pin_date']"
              placeholder="置顶状态"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in pin_date_list"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="是否推荐">
            <a-select
              size="small"
              v-decorator="['recommend']"
              placeholder="是否推荐"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in recommend_list"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="发布状态">
            <a-select
              size="small"
              v-decorator="['release_state']"
              placeholder="发布状态"
              allowClear
              @change="nextSearch"
            >
              <a-select-option
                v-for="item in release_state_list"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</a-select-option>
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
import { getCategoryList } from "@/api/category";
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      state_verify_list: [
        {
          value: -1,
          label: "驳回"
        },
        {
          value: 0,
          label: "待审"
        },
        {
          value: 1,
          label: "通过"
        }
      ],
      site_list: [],
      category_list: [],
      pin_date_list: [
        {
          value: 1,
          label: "正在置顶"
        },
        {
          value: 0,
          label: "置顶已过期"
        }
      ],
      recommend_list: [
        {
          value: 1,
          label: "推荐"
        },
        {
          value: 0,
          label: "非推荐"
        }
      ],
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
    nextSearchAndGetCategory() {
      this.$nextTick(() => {
        this.category_list = [];
        this.form.resetFields("category_id");

        this.search();
        this.getCategoryList();
      });
    },
    //获取站点列表
    getSiteList() {
      getSiteList({ page: 0 }).then(res => {
        this.site_list = res.data.list;
      });
    },
    //获取分类列表
    getCategoryList() {
      const site_id = this.form.getFieldValue("site_id");
      site_id &&
        getCategoryList({ tree: true, site_id }).then(res => {
          this.category_list = res.data.list;
        });
    }
  }
};
</script>
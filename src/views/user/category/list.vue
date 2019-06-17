<template>
  <div>
    <filterForm @search="handleSearch"></filterForm>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="categoryList"
      :pagination="false"
      :loading="loading"
      size="small"
    >
      <span slot="this_title" slot-scope="text,row">
        <div v-if="row">
          <a-tag v-if="row.image_id !== 0" color="orange">图</a-tag>
          {{row.title}}
          <span v-if="row.children && row.children.length">({{row.children.length}})</span>
        </div>
      </span>
      <span slot="type" slot-scope="text,row">
        <div v-if="row">
          <a-tag v-if="row.type === -2">隐藏</a-tag>
          <a-tag v-if="row.type === 1" color="green">显示</a-tag>
          <a-tag v-if="row.type === 3" color="blue">外链</a-tag>
        </div>
      </span>
      <span slot="action" slot-scope="text,row">
        <a-button size="small">添加子类</a-button>
        <a-button size="small">编辑</a-button>
        <a-button size="small">删除</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import { buildContent } from "@/api/build";
import filterForm from "./components/filterForm";
import { getCategoryList } from "@/api/category";
const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "标题（子类数量）",
    dataIndex: "title",
    scopedSlots: { customRender: "this_title" }
  },
  {
    title: "英文标题",
    dataIndex: "en_title"
  },
  {
    title: "生成目录/外链",
    dataIndex: "name"
  },
  {
    title: "列表页模板",
    dataIndex: "index_tpl"
  },
  {
    title: "内容页模板",
    dataIndex: "content_tpl"
  },
  {
    title: "排序",
    dataIndex: "sort"
  },
  {
    title: "状态",
    dataIndex: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      filterData: {},
      loading: false,
      columns,
      categoryList: []
    };
  },
  components: {
    filterForm
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    handleSearch(filterData) {
      this.filterData = { ...filterData };
      this.getCategoryList();
    },

    getCategoryList() {
      this.loading = true;
      let ajaxData;
      if (Object.keys(this.filterData).length) {
        ajaxData = {
          ...this.filterData
        };
      } else {
        ajaxData = {
          ...this.filterData,
          tree: true
        };
      }
      getCategoryList(ajaxData).then(res => {
        this.loading = false;

        this.categoryList = res.data.list;
      });
    }
  }
};
</script>

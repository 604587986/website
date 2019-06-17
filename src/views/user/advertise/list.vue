<template>
  <div>
    <filterForm @search="handleSearch"></filterForm>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :pagination="pagination"
      @change="handleTableChange"
      :loading="loading"
      size="small"
    >
      <span slot="image_url" slot-scope="text">
        <img :src="mixin_format_img(text,'/160')" alt v-if="text">
        <span v-else>无</span>
      </span>
      <span slot="type" slot-scope="text,row">
        <div v-if="row">
          <a-tag v-if="row.type === -2">隐藏</a-tag>
          <a-tag v-if="row.type === 1" color="green">显示</a-tag>
          <a-tag v-if="row.type === 3" color="blue">外链</a-tag>
        </div>
      </span>
      <span slot="action" slot-scope="text,row">
        <a-button size="small">编辑</a-button>
        <a-button size="small">删除</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getList } from "@/api/advertise";

import filterForm from "./components/filterForm";

const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "标题",
    dataIndex: "title"
  },
  {
    title: "友链分类",
    dataIndex: "category_title"
  },
  {
    title: "图片",
    dataIndex: "image_url",
    scopedSlots: { customRender: "image_url" }
  },
  {
    title: "链接",
    dataIndex: "link"
  },
  {
    title: "显示状态",
    dataIndex: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "添加时间",
    dataIndex: "create_time"
  },
  {
    title: "排序",
    dataIndex: "sort"
  },

  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showTotal: total => {
          return `共${total}条`;
        }
      },
      filterData: {},
      loading: false,
      columns
    };
  },
  components: {
    filterForm
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const ajaxData = {
        ...this.filterData,
        page: this.pagination.current,
        size: this.pagination.pageSize
      };

      getList(ajaxData).then(res => {
        const pagination = { ...this.pagination };
        // Read total count from server
        pagination.total = res.data.count;
        this.loading = false;
        this.data = res.data.list;
        this.pagination = pagination;
      });
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;

      this.getList();
    },
    handleSearch(filterData) {
      this.pagination.current = 1;
      this.filterData = { ...filterData };
      this.getList();
    }
  }
};
</script>

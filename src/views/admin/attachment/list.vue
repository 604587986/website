<template>
  <div>
    <filterForm @search="handleSearch"></filterForm>
    <PageHeadActionWrapper>
      <template v-slot:right>
        <a-button type="primary" size="small" @click="getList">数据更新</a-button>
      </template>
    </PageHeadActionWrapper>
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
      <span slot="action" slot-scope="text,row">
        <a-button size="small">编辑</a-button>
        <a-button size="small">删除</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getList } from "@/api/attachment";

import filterForm from "./components/filterForm";

import paginationMixin from "@/utils/paginationMixin";

const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "文件名称",
    dataIndex: "title"
  },

  {
    title: "图片",
    dataIndex: "url",
    scopedSlots: { customRender: "image_url" }
  },
  {
    title: "所属站点",
    dataIndex: "site_title"
  },
  {
    title: "上传人",
    dataIndex: "user_title"
  },
  {
    title: "添加时间",
    dataIndex: "create_time"
  },
  {
    title: "文件类型",
    dataIndex: "ext"
  },

  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  mixins: [paginationMixin],

  data() {
    return {
      data: [],
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
      pager.pageSize = pagination.pageSize;
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

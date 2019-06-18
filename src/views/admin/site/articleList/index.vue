<template>
  <div>
    <component
      :is="$store.state.user.group.level === 0 ? 'filterForm':'filterFormForUser'"
      @search="handleSearch"
    ></component>
    <PageHeadActionWrapper>
      <template v-slot:right>
        <a-button type="primary" size="small">回收站</a-button>
        <a-button type="primary" size="small" @click="getArticleList">数据更新</a-button>
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
      <span slot="this_title" slot-scope="text,row">
        <div v-if="row">
          <a-tag v-if="row.image_id !== 0" color="orange">图</a-tag>
          <a-tag v-if="row.pin_date" color="orange">{{row.pin_date | overdue}}</a-tag>
          <a-tag v-if="row.recommend" color="orange">推荐</a-tag>
          {{row.title}}
        </div>
      </span>
      <span slot="state" slot-scope="state">
        <a-tag v-if="state === 1" color="green">正常</a-tag>
        <a-tag v-if="state === 0" color="orange">草稿</a-tag>
        <a-tag v-if="state === -1" color="red">已删除</a-tag>
      </span>
      <span slot="state_verify" slot-scope="state_verify">
        <a-tag v-if="state_verify === 1" color="green">通过</a-tag>
        <a-tag v-if="state_verify === 0" color="orange">待审</a-tag>
        <a-tag v-if="state_verify === -1" color="red">驳回</a-tag>
      </span>
      <span slot="release_state" slot-scope="release_state">
        <a-tag v-if="release_state === 1" color="green">已发布</a-tag>
        <a-tag v-if="release_state === 0">未发布</a-tag>
      </span>
      <span slot="action" slot-scope="text,row">
        <a-popconfirm
          title="是否发布这篇文章？"
          @confirm="publish(row.id)"
          v-if="$store.state.user.group.level !== 0"
        >
          <a-button size="small">发布</a-button>
        </a-popconfirm>
        <a-button size="small" @click="go(row)">前往</a-button>
        <a-button size="small" @click="preview(row)">预览</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getArticleList } from "@/api/article";
import { buildContent } from "@/api/build";
import filterForm from "./components/filterForm";
import filterFormForUser from "./components/filterFormForUser";

import paginationMixin from "@/utils/paginationMixin";

const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "标题",
    dataIndex: "title",
    scopedSlots: { customRender: "this_title" }
  },
  {
    title: "所属分类",
    dataIndex: "category_title"
  },
  {
    title: "所属站点",
    dataIndex: "site_title"
  },
  {
    title: "文章状态",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
  },
  {
    title: "审核状态",
    dataIndex: "state_verify",
    scopedSlots: { customRender: "state_verify" }
  },
  {
    title: "发布时间",
    dataIndex: "release_time"
  },
  {
    title: "创建人",
    dataIndex: "user_name"
  },
  {
    title: "排序",
    dataIndex: "sort"
  },
  {
    title: "发布状态",
    dataIndex: "release_state",
    scopedSlots: { customRender: "release_state" }
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
    filterForm,
    filterFormForUser
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.loading = true;
      const ajaxData = {
        ...this.filterData,
        page: this.pagination.current,
        size: this.pagination.pageSize
      };

      getArticleList(ajaxData).then(res => {
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

      this.getArticleList();
    },
    handleSearch(filterData) {
      this.pagination.current = 1;
      this.filterData = { ...filterData };
      this.getArticleList();
    },
    go(row) {
      window.open(row.article_link);
    },
    preview(row) {
      var URL = window.document.domain;
      window.open(
          "/api/article/preview" +
          "?id=" +
          row.id +
          "&check_token=" +
          row.check_token
      );
    },
    publish(id) {
      buildContent({ article_id: id }).then(res => {
        this.$message.success(res.message);
      });
    }
  },
  filters: {
    overdue: function(value) {
      if (null == value || value == "") {
        return "";
      }
      var now = new Date().getTime();
      var this_time = new Date(value);
      if (now > this_time) {
        return "置顶(过期)";
      } else {
        return "置顶";
      }
    }
  }
};
</script>

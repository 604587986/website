<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :pagination="pagination"
      @change="handleTableChange"
      :loading="loading"
      size="small"
    >
      <span slot="state" slot-scope="state">
        <a-tag>{{state === 1 ? '正常':state === 0?'建设中':'其他'}}</a-tag>
      </span>
      <span slot="action" slot-scope="text,row">
        <a-button size="small" type="primary" @click="switchUser(row.id)">切换</a-button>
      </span>
    </a-table>
    <a-modal title="Basic Modal" :footer="null" destroyOnClose v-model="userPanelShow">
      <user-panel :siteId="currentSiteId"/>
    </a-modal>
  </div>
</template>
<script>
import { getSiteList } from "@/api/site";
import userPanel from "./components/userPanel";
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "站点名称",
    dataIndex: "title"
  },
  {
    title: "编码",
    dataIndex: "code"
  },
  {
    title: "别名",
    dataIndex: "alias"
  },
  {
    title: "域名",
    dataIndex: "domain"
  },
  {
    title: "创建时间",
    dataIndex: "create_time"
  },
  {
    title: "状态",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
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
      pagination: {},
      loading: false,
      columns,
      userPanelShow: false,
      currentSiteId: null
    };
  },
  components: {
    userPanel
  },
  mounted() {
    this.getSiteList();
  },
  methods: {
    getSiteList(data = {}) {
      this.loading = true;
      getSiteList(data).then(res => {
        const pagination = { ...this.pagination };
        // Read total count from server
        pagination.total = res.data.count;
        this.loading = false;
        this.data = res.data.list;
        this.pagination = pagination;
      });
    },
    switchUser(id) {
      this.currentSiteId = id;
      this.userPanelShow = true;
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getSiteList({
        size: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    }
  }
};
</script>

<template>
	<div>
		<filter-form @search="handleSearch"></filter-form>
		<PageHeadActionWrapper>
			<template v-slot:left>
				<a-button type="primary" size="small" @click="mixin_jump('/site/add-site')">添加站点</a-button>
			</template>
			<template v-slot:right>
				<a-button type="primary" size="small" @click="getSiteList">数据更新</a-button>
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
			<span slot="state" slot-scope="state">
				<a-tag color="#409eff" v-if="state === 1">正常</a-tag>
				<a-tag color="#aaa" v-else-if="state === 0">建设中</a-tag>
				<a-tag color="red" v-else>其他</a-tag>
			</span>
			<span slot="action" slot-scope="text,row">
				<a-button size="small" @click="go(row)">访问</a-button>
				<a-button size="small" @click="switchUser(row.id)">切换</a-button>
				<a-button size="small" @click="mixin_jump('/site/edit-site/'+row.id)">编辑</a-button>
			</span>
		</a-table>
		<user-panel :siteId="currentSiteId" :userPanelShow.sync="userPanelShow" />
	</div>
</template>
<script>
import { getSiteList } from "@/api/site";
import userPanel from "./components/userPanel";
import filterForm from "./components/filterForm";

import paginationMixin from "@/utils/paginationMixin";

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
	mixins: [paginationMixin],

	data() {
		return {
			data: [],
			loading: false,
			columns,
			userPanelShow: false,
			currentSiteId: ""
		};
	},
	components: {
		userPanel,
		filterForm
	},
	mounted() {
		this.getSiteList();
	},
	methods: {
		getSiteList() {
			this.loading = true;
			const ajaxData = {
				...this.filterData,
				page: this.pagination.current,
				size: this.pagination.pageSize
			};

			getSiteList(ajaxData).then(res => {
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
		go(row) {
			window.open(
				`${row.domain_https === 1 ? "https" : "http"}://${row.domain}`
			);
		},
		handleTableChange(pagination, filters, sorter) {
			const pager = { ...this.pagination };
			pager.current = pagination.current;
			pager.pageSize = pagination.pageSize;
			this.pagination = pager;
			this.getSiteList();
		},
		handleSearch(filterData) {
			this.pagination.current = 1;
			this.filterData = { ...filterData };
			this.getSiteList();
		}
	}
};
</script>

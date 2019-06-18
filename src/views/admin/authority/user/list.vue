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
			<span slot="site_title" slot-scope="text" v-if="text">
				<a-tag v-for="item in text.split('|')" :key="item" v-if="text" color="cyan">{{item}}</a-tag>
			</span>
			<span slot="site_title" slot-scope="text" v-else>
				<span>暂未设置</span>
			</span>
			<span slot="state" slot-scope="state">
				<a-tag color="red" v-if="state === 2">删除</a-tag>
				<a-tag color="green" v-if="state === 1">正常</a-tag>
				<a-tag v-if="state === 0">未激活</a-tag>
				<a-tag color="purple" v-if="state === -1">禁用</a-tag>
			</span>
			<span slot="action" slot-scope="text,row">
				<a-button size="small">编辑</a-button>
				<a-button size="small">删除</a-button>
			</span>
		</a-table>
	</div>
</template>
<script>
import { getUserList } from "@/api/auth";

import filterForm from "./components/filterForm";

const columns = [
	{
		title: "ID",
		dataIndex: "id"
	},
	{
		title: "账号",
		dataIndex: "account"
	},

	{
		title: "昵称",
		dataIndex: "nickname"
	},
	{
		title: "用户组",
		dataIndex: "group_title",
	},
	{
		title: "管理站点",
		dataIndex: "site_title",
		width:200,
		scopedSlots: { customRender: "site_title" }
	},
	{
		title: "上次登录",
		dataIndex: "last_time"
	},
	{
		title: "添加时间",
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
		this.getUserList();
	},
	methods: {
		getUserList() {
			this.loading = true;
			const ajaxData = {
				...this.filterData,
				page: this.pagination.current,
				size: this.pagination.pageSize
			};

			getUserList(ajaxData).then(res => {
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

			this.getUserList();
		},
		handleSearch(filterData) {
			this.pagination.current = 1;
			this.filterData = { ...filterData };
			this.getUserList();
		}
	}
};
</script>

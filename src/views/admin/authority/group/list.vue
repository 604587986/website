<template>
	<div>
		<filterForm @search="handleSearch"></filterForm>
		<PageHeadActionWrapper>
			<template v-slot:left>
				<a-button type="primary" size="small" @click="mixin_jump('/authority/add-group')">添加用户组</a-button>
			</template>
			<template v-slot:right>
				<a-button type="primary" size="small" @click="getGroupList">数据更新</a-button>
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
			<p slot="expandedRowRender" slot-scope="record" style="margin: 0">
				<span v-if="record.privilege">
					<a-tag v-for="item in record.privilege.split(',')" :key="item" color="green">{{privilegeMap(item)}}</a-tag>
				</span>
			</p>
			<span slot="action" slot-scope="text,row">
				<a-button size="small" @click="mixin_jump('/authority/edit-group/'+row.id)">编辑</a-button>
				<a-button size="small" @click="deleteGroup(row.id)">删除</a-button>
			</span>
		</a-table>
	</div>
</template>
<script>
import { getGroupList, deleteGroup, getPrivilegeList } from "@/api/auth";

import filterForm from "./components/filterForm";

import paginationMixin from "@/utils/paginationMixin";

const columns = [
	{
		title: "ID",
		dataIndex: "id"
	},
	{
		title: "用户组名称",
		dataIndex: "title"
	},
	{
		title: "级别",
		dataIndex: "level"
	},

	{
		title: "操作",
		width: 200,
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
			columns,
			privilegeList: []
		};
	},
	components: {
		filterForm
	},
	mounted() {
		this.getPrivilegeList();
		this.getGroupList();
	},
	methods: {
		//获取用户组
		getGroupList() {
			this.loading = true;
			const ajaxData = {
				...this.filterData,
				page: this.pagination.current,
				size: this.pagination.pageSize
			};

			getGroupList(ajaxData).then(res => {
				const pagination = { ...this.pagination };
				// Read total count from server
				pagination.total = res.data.count;
				this.loading = false;
				this.data = res.data.list;
				this.pagination = pagination;
			});
		},
		//获取权限列表
		getPrivilegeList() {
			getPrivilegeList({ page: 0 }).then(res => {
				this.privilegeList = res.data.list;
			});
		},
		//删除用户组
		deleteGroup(id) {
			const _this = this;
			this.$confirm({
				title: "确定删除此用户组吗？",
				okType: "danger",
				centered: true,
				onOk() {
					deleteGroup({ id }).then(res => {
						_this.$message.success("删除成功");
						_this.getGroupList();
					});
				}
			});
		},
		handleTableChange(pagination, filters, sorter) {
			const pager = { ...this.pagination };
			pager.current = pagination.current;
			pager.pageSize = pagination.pageSize;
			this.pagination = pager;

			this.getGroupList();
		},
		handleSearch(filterData) {
			this.pagination.current = 1;
			this.filterData = { ...filterData };
			this.getGroupList();
		},
		privilegeMap(tid) {
			for (let i in this.privilegeList) {
				if (this.privilegeList[i].id == tid) {
					return this.privilegeList[i].title;
				}
			}
		}
	}
};
</script>

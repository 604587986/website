
<template>
	<div>
		<filterForm @search="handleSearch"></filterForm>
		<PageHeadActionWrapper>
			<template v-slot:left>
				<a-button type="primary" size="small" @click="mixin_jump('/tag/add')">添加标签</a-button>
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
			<span slot="action" slot-scope="text,row">
				<a-button size="small" @click="mixin_jump('/tag/edit/'+row.id)">编辑</a-button>
				<a-button size="small" @click="deleteTag(row.id)">删除</a-button>
			</span>
		</a-table>
	</div>
</template>
<script>
import { getTagList,deleteTag } from "@/api/tag";

import filterForm from "./components/filterForm";

import paginationMixin from "@/utils/paginationMixin";

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
		title: "操作",
		dataIndex: "action",
		width: 120,
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
		this.getTagList();
	},
	methods: {
		getTagList() {
			this.loading = true;
			const ajaxData = {
				...this.filterData,
				page: this.pagination.current,
				size: this.pagination.pageSize
			};

			getTagList(ajaxData).then(res => {
				const pagination = { ...this.pagination };
				// Read total count from server
				pagination.total = res.data.count;
				this.loading = false;
				this.data = res.data.list;
				this.pagination = pagination;
			});
		},
		//删除
		deleteTag(id) {
			const _this = this;
			this.$confirm({
				title: "确定删除此标签吗？",
				okType: "danger",
				centered: true,
				onOk() {
					deleteTag({ id }).then(res => {
						_this.$message.success("删除成功");
						_this.getTagList();
					});
				}
			});
		},
		handleTableChange(pagination, filters, sorter) {
			const pager = { ...this.pagination };
			pager.current = pagination.current;
			pager.pageSize = pagination.pageSize;

			this.pagination = pager;

			this.getTagList();
		},
		handleSearch(filterData) {
			this.pagination.current = 1;
			this.filterData = { ...filterData };
			this.getTagList();
		}
	}
};
</script>

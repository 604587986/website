<template>
	<div>
		<filter-form @search="handleSearch"></filter-form>
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
				<a-button size="small" type="primary" @click="switchUser(row.id)">切换</a-button>
			</span>
		</a-table>
	</div>
</template>
<script>
import { getArticleList } from "@/api/article";
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
	}
];
export default {
	data() {
		return {
			data: [],
			pagination: {},
			filterData: {},
			loading: false,
			columns
		};
	},
	components: {
		filterForm
	},
	mounted() {
		this.getArticleList();
	},
	methods: {
		getArticleList(data = {}) {
			this.loading = true;
			const ajaxData = { ...data, ...this.pagination };

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
			this.pagination = pager;

			this.getArticleList(this.filterData);
		},
		handleSearch(filterData) {
			this.filterData = filterData;
			this.getArticleList(filterData);
		}
	}
};
</script>

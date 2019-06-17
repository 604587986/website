<template>
	<div>
		<filterForm @search="handleSearch"></filterForm>
		<a-table
			:columns="columns"
			:rowKey="record => record.id"
			:dataSource="categoryList"
			:pagination="pagination"
			@change="handleTableChange"
			:loading="loading"
			size="small"
		>

		</a-table>
	</div>
</template>
<script>
import { getArticleList } from "@/api/article";
import { buildContent } from "@/api/build";
import filterForm from "./components/filterForm";
import { getCategoryList } from "@/api/category";
const columns = [
	{
		title: "ID",
		dataIndex: "id"
	},
	{
		title: "标题",
		dataIndex: "title",
		scopedSlots: { customRender: "title" }
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
			columns,

			categoryList: []
		};
	},
	components: {
		filterForm
	},
	mounted() {
        this.getArticleList();
        
        this.getCategoryList()
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
			const protocol = window.location.protocol;
			window.open(
				protocol +
					"//" +
					URL +
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
		},

		getCategoryList() {
			getCategoryList({ tree: true }).then(res => {
				this.categoryList = res.data.list;
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



<template>
	<div>
		<PageHeadActionWrapper>
			<template v-slot:right>
				<a-button type="primary" size="small" @click="getList">数据更新</a-button>
			</template>
		</PageHeadActionWrapper>
		<a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :pagination="false" :loading="loading" size="small">
			<span slot="index" slot-scope="text,row,index">{{index+1}}</span>
			<span slot="this_title" slot-scope="text,row,index">
				<a :href="row.article_link" class="rank-link">{{row.title}}</a>
			</span>
		</a-table>
	</div>
</template>
<script>
import { articleViewsRanking } from "@/api/workbench";

const columns = [
	{
		title: "排行",
		scopedSlots: { customRender: "index" }
	},
	{
		title: "标题",
		dataIndex: "title",
		scopedSlots: { customRender: "this_title" }
	},
	{
		title: "浏览次数",
		dataIndex: "click_num"
	},
	{
		title: "分类",
		dataIndex: "category_title"
	},
	{
		title: "创建日期",
		dataIndex: "create_time"
	},
	{
		title: "所属站点",
		dataIndex: "site_title"
	}
];
export default {
	data() {
		return {
			data: [],
			loading: false,
			columns
		};
	},
	components: {},
	mounted() {
		this.getList();
	},
	methods: {
		getList() {
			this.loading = true;

			articleViewsRanking().then(res => {
				this.loading = false;

				this.data = res.data;
			});
		}
	}
};
</script>

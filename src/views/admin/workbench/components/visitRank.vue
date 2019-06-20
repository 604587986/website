

<template>
	<div>
		<PageHeadActionWrapper>
			<template v-slot:right>
				<a-button type="primary" size="small" @click="getList">数据更新</a-button>
			</template>
		</PageHeadActionWrapper>
		<a-table :columns="columns" :rowKey="record => record.site_title" :dataSource="data" :pagination="false" :loading="loading" size="small">
			<span slot="index" slot-scope="text,row,index">{{index+1}}</span>
		</a-table>
	</div>
</template>
<script>
import { siteViewsRanking } from "@/api/workbench";

const columns = [
	{
		title: "排行",
		scopedSlots: { customRender: "index" }
	},
	{
		title: "网站名称",
		dataIndex: "site_title"
	},
	{
		title: "本月访问量",
		dataIndex: "month_views"
	},
	{
		title: "今日访问量",
		dataIndex: "today_views"
	},
	{
		title: "上月访问量",
		dataIndex: "last_month_views"
	},
	{
		title: "今年访问量",
		dataIndex: "year_views"
	},
	{
		title: "总访问量",
		dataIndex: "num"
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

			siteViewsRanking().then(res => {
				this.loading = false;

				this.data = res.data;
			});
		}
	}
};
</script>

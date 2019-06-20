




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
import { articleCountRanking } from "@/api/workbench";

const columns = [
    {
        title:"排行",
		scopedSlots: { customRender: "index" }        
    },
	{
		title: "网站名称",
		dataIndex: "site_title"
	},
	{
		title: "今日发布",
		dataIndex: "today_publish"
	},
	{
		title: "本月发布",
		dataIndex: "month_publish"
	},
	{
		title: "上月发布",
		dataIndex: "last_month_publish"
	},
	{
		title: "今年发布",
		dataIndex: "year_publish"
	},
	{
		title: "总文章数量",
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

			articleCountRanking().then(res => {
				this.loading = false;

				this.data = res.data;
			});
		}
	}
};
</script>

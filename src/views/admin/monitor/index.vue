<template>
	<div class="monitor">
		<component :is="$store.state.user.group.level === 0 ? 'filterForm':'filterFormForUser'" @search="handleSearch"></component>
		<a-table
			:columns="columns"
			:rowKey="record => record.id"
			:dataSource="data"
			:pagination="pagination"
			@change="handleTableChange"
			:loading="loading"
			size="small"
		>
			<span slot="state" slot-scope="text,row">
				<span v-if="row.state === 0">
					<a-icon type="clock-circle"/>
					{{row.publish_state}}
				</span>
				<span v-if="row.state === 1">
					<a-icon type="loading" style="color:#fa8c16"/>
					{{row.publish_state}}
				</span>
				<span v-if="row.state === 2">
					<a-icon type="check-circle" style="color:#52c41a"/>
					{{row.publish_state}}
				</span>
				<span v-if="row.state === 3">
					<a-icon type="close-circle" style="color:#f5222d"/>
					{{row.publish_state}}
				</span>
			</span>
		</a-table>
	</div>
</template>
<script>
import filterForm from "./components/filterForm";
import filterFormForUser from "./components/filterFormForUser";

const columns = [
	{
		title: "ID",
		dataIndex: "id",
		width:70
	},
	{
		title: "任务名称",
		dataIndex: "job_name",
		width:300
	},
	// {
	// 	title: "发布状态",
	// 	dataIndex: "publish_state",
	// 	scopedSlots: { customRender: "publish_state" }
	// },
	{
		title: "发布状态",
		dataIndex: "state",
		scopedSlots: { customRender: "state" },
	},
	{
		title: "发布类型",
		dataIndex: "publish_type",
	},
	{
		title: "发布人",
		dataIndex: "publish_user",
	},
	{
		title: "站点",
		dataIndex: "site_title",
	},
	{
		title: "开始时间",
		dataIndex: "start_time",
	},
	{
		title: "结束时间",
		dataIndex: "end_time",
	},
	{
		title: "共计时间",
		dataIndex: "time_cost",
	}
];
import { mapState } from "vuex";
export default {
	data() {
		return {
			columns
		};
	},
	computed: {
		data() {
			return this.$store.state.monitor.list;
		},
		pagination() {
			return this.$store.state.monitor.pagination;
		},
		loading() {
			return this.$store.state.monitor.loading;
		}
	},
	components: {
		filterForm,
		filterFormForUser
	},
	mounted() {
		const { dispatch } = this.$store;
		dispatch("getMonitorList");
	},
	methods: {
		handleTableChange(pagination, filters, sorter) {
			const { dispatch, commit } = this.$store;

			commit("SET_PAGINATION", {
				current: pagination.current
			});

			dispatch("getMonitorList", this.filterData);
		},
		handleSearch(filterData) {
			const { dispatch, commit } = this.$store;
			commit("SET_PAGINATION", {
				current: 1
			});
			this.filterData = { ...filterData };
			dispatch("getMonitorList", this.filterData);
		}
	}
};
</script>

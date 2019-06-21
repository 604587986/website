<template>
	<div class="data-view">
		<div class="top" v-if="$store.getters.group === 0">
			<div class="quick-nav-item" v-for="item in navList" :key="item.title">
				<div class="link-box">
					<p class="value">{{item.val}}</p>
					<p class="title">{{item.title}}</p>
				</div>
				<!-- <div class="chart-wrapper">
					<charts style="height: 400px" :option="chartOption"/>
				</div>-->
			</div>
		</div>
		<a-row class="bottom" :gutter="16">
			<a-col :span="6">
				<div class="chart-item-wrapper">
					<h5 class="title">当日数据</h5>
					<charts style="height:220px" :dataSource="today_data" name="当日数据"/>
				</div>
				<div class="chart-item-wrapper" style="margin-top:16px">
					<h5 class="title">本月数据</h5>
					<charts style="height:220px" :dataSource="month_data" name="本月数据"/>
				</div>
			</a-col>
			<a-col :span="6">
				<div class="chart-item-wrapper">
					<h5 class="title">本周数据</h5>
					<charts style="height:220px" :dataSource="week_data" name="本周数据"/>
				</div>
				<div class="chart-item-wrapper" style="margin-top:16px">
					<h5 class="title">年度数据</h5>
					<charts style="height:220px" :dataSource="year_data" name="年度数据"/>
				</div>
			</a-col>
			<a-col :span="12">
				<div class="chart-item-wrapper">
					<h5 class="title">
						<a-row>
							<a-col :span="16">
								<a-range-picker size="small" @change="handleDateChange"/>
							</a-col>
							<a-col :span="8">
								<a-select size="small" v-model="site_id" style="width:100%" placeholder="全部" :dropdownMatchSelectWidth="false" allowClear @change="handleSiteChange">
									<a-select-option v-for="item in site_list" :value="item.id" :key="item.id">{{item.title}}</a-select-option>
								</a-select>
							</a-col>
						</a-row>
					</h5>
					<charts style="height:488px" :dataSource="site_data" name="访问量"/>
				</div>
			</a-col>
		</a-row>
	</div>
</template>
<script>
import charts from "@/components/echart";

import { getData, getDataBySite } from "@/api/workbench";
import { getSiteList } from "@/api/site";

export default {
	data() {
		const { statistics } = this.$store.state.user.init;
		return {
			navList: [
				{
					val: statistics.SiteCount,
					title: "站点数量(个)",
					url: ""
				},
				{
					val: statistics.ArticleCount,
					title: "文章总数(篇)",
					url: ""
				},
				{
					val: statistics.PageCount,
					title: "菜单总数(个)",
					url: ""
				},
				{
					val: statistics.AttachmentSize,
					title: "附件总体积",
					url: ""
				},
				{
					val: statistics.ManagerCount,
					title: "管理员数量(位)",
					url: ""
				}
			],

			today_data: {},
			month_data: {},
			week_data: {},
			year_data: {},
			site_data: {},
			start_time: undefined,
			end_time: undefined,
			site_list: [],
			site_id: undefined
		};
	},
	computed: {
		chartOption() {
			return {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#00a0e9"
						}
					}
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: true,
						data: this.today_data.filter_info
					}
				],
				yAxis: [
					{
						type: "value"
					}
				],
				series: [
					{
						type: "line",
						stack: "总量",
						itemStyle: {
							normal: {
								color: "rgba(84,195,241,0.5)"
							}
						},
						label: {
							normal: {
								show: false,
								position: "top"
							}
						},
						areaStyle: {
							normal: {}
						},
						data: this.today_data.show_info
					}
				]
			};
		}
	},
	components: {
		charts
	},
	mounted() {
		this.getData();
		this.getDataBySite();
		this.getSiteList();
	},
	methods: {
		//多个小图表数据获取
		getData() {
			getData().then(res => {
				this.today_data = res.data.hours || {};
				this.month_data = res.data.month_days || {};
				this.week_data = res.data.week_days || {};
				this.year_data = res.data.year_month || {};
			});
		},
		//大图表数据获取
		getDataBySite() {
			const ajaxData = {
				start_time: this.start_time,
				end_time: this.end_time,
				site_id: this.site_id
			};
			getDataBySite(ajaxData).then(res => {
				//处理兼容，因为无数据时返回了一个空数组
				if (Array.isArray(res.data)) {
					this.site_data = {};
				} else {
					this.site_data = res.data || {};
				}
			});
		},
		//获取站点列表
		getSiteList() {
			getSiteList({ page: 0 }).then(res => {
				this.site_list = res.data.list;
			});
		},
		handleDateChange(date, dateString) {
			this.start_time = dateString[0];
			this.end_time = dateString[1];

			this.getDataBySite();
		},
		handleSiteChange(id) {
			this.site_id = id;
			this.getDataBySite();
		}
	}
};
</script>
<style lang="less" scoped>
.top {
	padding-top: 48px;
	border-top: 1px solid #d9d9d9;
	display: flex;
	width: 100%;
	.quick-nav-item {
		flex: 1 1 auto;
		color: #fff;
		height: 140px;
		margin-right: 20px;
		margin-bottom: 10px;
		text-align: center;
		color: #fff;
		display: inline-block;
		width: 100%;
		position: relative;
		border: 1px solid #d9d9d9;
		transition: all 0.3s;
		.link-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.value {
				font-size: 30px;
				color: #00a0e9;
			}
			.title {
				margin-top: 10px;
				font-size: 14px;
				color: #888;
			}
		}
	}
}
.bottom {
	margin-top: 30px;
	.title {
		background: #dcdddd;
		color: #707070;
		font-size: 16px;
		padding-left: 5px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}
	.chart-item-wrapper {
		border: 1px solid #c4c5c5;
	}
}
</style>

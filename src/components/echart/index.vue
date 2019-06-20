<template>
		<div ref="chartDom"></div>
</template>

<script>
// import echarts from "echarts"
// echats 得 打包优化方法 式 只引入 我们需要 使用得 柱状图得 代码
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import debounce from "lodash/debounce"; // 这里引入lodash 也是按需加载得 方法
import { addListener, removeListener } from "resize-detector";
export default {
	props: {
		dataSource: {
			type: Object,
			default: () => {}
		},
		name: {
			type: String,
			default: ""
		}
	},
	created() {
		// 利用lodash de  debounce 进行防抖操作； 避免 高频次 得 resize
		this.resize = debounce(this.resize, 300);
	},
	computed: {
		option() {
			return {
				noDataLoadingOption: {
					text: "暂无数据",
					effect: "bubble",
					effectOption: {
						effect: {
							n: 0
						}
					}
				},
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
						data: this.dataSource.filter_info
					}
				],
				yAxis: [
					{
						type: "value"
					}
				],
				series: [
					{
						name: this.name,
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
						data: this.dataSource.show_info
					}
				]
			};
		}
	},
	mounted() {
		this.renderChart();
		addListener(this.$refs.chartDom, this.resize);
	},
	watch: {
		dataSource(val) {
			// 这样子做 不能深度 监听
			this.chart.setOption(this.option);
		}
		// option: {
		//   handler(val) {
		//     // 可以进行深度监听，但对性能得消耗比较大
		//     this.chart.setOption(val)
		//   },
		//   deep: true
		// }
	},
	methods: {
		resize() {
			this.chart.resize();
		},
		renderChart() {
			// 基于准备好的dom，初始化echarts实例
			this.chart = echarts.init(this.$refs.chartDom);
			// 绘制图表
			this.chart.setOption(this.option);
		}
	},
	beforeDestroy() {
		removeListener(this.$refs.chartDom, this.resize);
		this.chart.dispose();
		this.chart = null;
	}
};
</script>

<style>
</style>
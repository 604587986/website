<template>
	<div>
		<quickNav></quickNav>
		<div class="tabs-wrapper">
			<a-tabs defaultActiveKey="1">
				<a-tab-pane tab="数据概况" key="1">
					<overView></overView>
				</a-tab-pane>
				<a-tab-pane tab="访问量排行" key="2">
					<visitRank></visitRank>
				</a-tab-pane>
				<a-tab-pane tab="文章数量排行" key="3">
					<articleNumRank></articleNumRank>
				</a-tab-pane>
				<a-tab-pane tab="文章访问排行" key="4">
					<articleViewRank></articleViewRank>
				</a-tab-pane>
			</a-tabs>
		</div>
	</div>
</template>
<script>
import quickNav from "./components/quickNav";
import overView from "./components/overView";
import visitRank from "./components/visitRank";
import articleNumRank from "./components/articleNumRank";
import articleViewRank from "./components/articleViewRank";

export default {
	data() {
		return {

		};
	},
	components: {
		quickNav,
		overView,
		visitRank,
		articleNumRank,
		articleViewRank
	},

};
</script>
<style lang="less" scoped>
.tabs-wrapper {
	margin-top: 20px;
}
</style>

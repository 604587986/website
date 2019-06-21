<template>
	<div>
		<div>
			<a-button type="primary" size="small" @click="getPageList(true)">刷新数据</a-button>
		</div>
		<div style="margin-top:20px">
			<span class="this-lable">选择一个单页：</span>
			<a-select size="small" v-model="value" placeholder="选择一个单页" style="width:160px" :dropdownMatchSelectWidth="false">
				<a-select-option :key="item.id" :value="item.id" v-for="item in list">{{item.title}}</a-select-option>
			</a-select>
		</div>
		<div style="margin-top:60px">
			<span class="this-lable"></span>
			<a-button type="primary" size="small" :loading="btnLoading" @click="buildPage">开始</a-button>
		</div>
	</div>
</template>
<script>
import { buildPage } from "@/api/build";
import { getPageList } from "@/api/singlePage";

export default {
	data() {
		return {
			value: undefined,
			btnLoading: false,
			list: []
		};
	},
	mounted() {
		this.getPageList();
	},
	methods: {
		buildPage() {
			if (!this.value) {
				return;
			}

			this.btnLoading = true;
			let ajaxData = {
				page_id: this.value
			};
			buildPage(ajaxData)
				.then(res => {
					this.btnLoading = false;

					this.$message.success("单页生成成功");
				})
				.catch(err => {
					this.btnLoading = false;
				});
		},
		//获取分类列表
		getPageList(needMessage = false) {
			getPageList({ size: 100 }).then(res => {
				this.list = res.data.list;

				if (needMessage) {
					this.$message.success("数据获取成功");
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
.this-lable {
	min-width: 110px;
	display: inline-block;
}
</style>

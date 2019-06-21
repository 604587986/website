<template>
	<div>
		<div>
			<a-button type="primary" size="small" @click="getCategoryList(true)">刷新数据</a-button>
		</div>
		<div style="margin-top:20px">
			<span class="this-lable">选择一个分类：</span>
			<a-cascader
				size="small"
				v-model="value"
				placeholder="选择一个分类"
				:options="categoryList"
				:fieldNames="{label:'title',value:'id',children:'children'}"
				changeOnSelect
			/>
		</div>
		<div style="margin-top:60px">
			<span class="this-lable"></span>
			<a-button type="primary" size="small" :loading="btnLoading" @click="buildCategory">开始</a-button>
		</div>
	</div>
</template>
<script>
import { buildCategory } from "@/api/build";
import { getCategoryList } from "@/api/category";

export default {
	data() {
		return {
			value: undefined,
			btnLoading: false,
			categoryList: []
		};
	},
	mounted() {
		this.getCategoryList();
	},
	methods: {
		buildCategory() {
			if (!this.value || !this.value.length) {
				return;
			}

			this.btnLoading = true;
			let ajaxData = {};
			if (this.value && this.value.length) {
				ajaxData.category_id = this.value[this.value.length - 1];
			}
			buildCategory(ajaxData)
				.then(res => {
					this.btnLoading = false;

					this.$message.success(res.message);
				})
				.catch(err => {
					this.btnLoading = false;
				});
		},
		//获取分类列表
		getCategoryList(needMessage = false) {
			getCategoryList({ tree: true }).then(res => {
				this.categoryList = res.data.list;

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

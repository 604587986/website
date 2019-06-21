<template>
	<div>
		<div>
			<a-button type="primary" size="small" @click="getDir">刷新数据</a-button>
		</div>
		<div style="margin-top:20px">
			<span class="this-lable">选择首页模板：</span>
			<a-select v-model="value" style="width:160px" size="small" placeholder="选择模板" :loading="loading">
				<a-select-option :value="dir" v-for="dir in dirList" :key="dir">{{dir}}</a-select-option>
			</a-select>
		</div>
		<div style="margin-top:60px">
			<span class="this-lable"></span>
			<a-button type="primary" size="small" :loading="btnLoading" @click="buildIndex">开始</a-button>
		</div>
	</div>
</template>
<script>
import { dir, buildIndex } from "@/api/build";
export default {
	data() {
		return {
			dirList: [],
			value: undefined,
			loading: false,
			btnLoading: false
		};
	},
	mounted() {
		this.getDir();
	},
	methods: {
		getDir() {
			this.loading = true;
			dir().then(res => {
				this.dirList = res.data;
				this.loading = false;
			});
		},
		buildIndex() {
			this.btnLoading = true;
			buildIndex({ index_template: this.value })
				.then(res => {
					this.btnLoading = false;
					
					this.$message.success('首页生成成功')
				})
				.catch(err => {
					this.btnLoading = false;
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

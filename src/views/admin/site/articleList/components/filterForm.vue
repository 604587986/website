<template>
	<div class="filter-form">
		<a-form layout="inline" :form="form">
			<a-form-item label="审核状态">
				<a-select size="small" v-decorator="['state_verify']" placeholder="审核状态" allowClear>
					<a-select-option v-for="item in state_verify_list" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="站点">
				<a-select size="small" v-decorator="['site_id']" placeholder="所属站点" allowClear>
					<a-select-option v-for="item in site_list" :value="item.id" :key="item.id">{{item.title}}</a-select-option>
				</a-select>
			</a-form-item>
			<!-- <a-form-item label="分类">
				<a-input size="small" placeholder/>
			</a-form-item>
			<a-form-item label="是否置顶">
				<a-input size="small" placeholder/>
			</a-form-item>
			<a-form-item label="是否推荐">
				<a-input size="small" placeholder/>
			</a-form-item>
			<a-form-item label="发布状态">
				<a-input size="small" placeholder/>
			</a-form-item>-->
			<a-form-item>
				<a-button size="small" type="primary" @click="search">搜索</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
import { getSiteList } from "@/api/site";

export default {
	data() {
		this.form = this.$form.createForm(this, {
			onFieldsChange: (props, fields) => {
				this.search();
			}
		});
		return {
			state_verify_list: [
				{
					value: -1,
					label: "驳回"
				},
				{
					value: 0,
					label: "待审"
				},
				{
					value: 1,
					label: "通过"
				}
			],
			site_list: []
		};
	},
	beforeCreate() {},
	mounted() {
		this.getSiteList();
	},
	computed: {},
	methods: {
		search() {
			this.$emit("search", this.form.getFieldsValue());
		},
		//获取站点列表
		getSiteList() {
			getSiteList({ page: 0 }).then(res => {
				this.site_list = res.data.list;
			});
		}
	}
};
</script>
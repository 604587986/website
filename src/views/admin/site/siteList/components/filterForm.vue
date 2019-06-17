<template>
	<div class="filter-form">
		<a-form layout="inline">
			<a-form-item label="审核状态">
				<a-select size="small" v-decorator="'state_verify'">
					<a-select-option v-for="item in state_verify_list" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="站点">
				<a-select size="small" v-decorator="'site_id'">
					<a-select-option v-for="item in site_list" :value="item.id" :key="item.id">{{item.title}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="分类">
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
			</a-form-item>
			<a-form-item>
				<a-button size="small" type="primary">搜索</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
export default {
	data() {
		this.form = this.$form.createForm(this);
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
            site_list:[]
		};
	},
	computed: {},
	methods: {
		handleFormLayoutChange(e) {
			this.formLayout = e.target.value;
		}
	}
};
</script>
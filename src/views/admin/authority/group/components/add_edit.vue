<template>
	<div class="add-edit-group">
		<a-skeleton :loading="pageLoading" active :paragraph="{rows:6}">
			<a-form :form="form" class="login-form" layout="horizontal" @submit="handleSubmit">
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="用户组名" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['title']" placeholder="用户组名"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="级别" v-bind="mixinFormItemLayoutShort">
							<a-select size="small" v-decorator="['level']" placeholder="级别" allowClear>
								<a-select-option v-for="item in levelList" :value="item.id" :key="item.id">{{item.title}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>

				<a-form-item label="权限" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<div :style="{ borderBottom: '1px solid #E9E9E9' }">
						<a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全选</a-checkbox>
					</div>
					<a-checkbox-group :options="privilegeList" v-decorator="['privilege']" @change="onChange"></a-checkbox-group>
				</a-form-item>

				<a-form-item v-bind="mixinFormItemLayoutShort">
					<a-button type="primary" html-type="submit">提交</a-button>
				</a-form-item>
			</a-form>
		</a-skeleton>
	</div>
</template>
<script>
import {
	getPrivilegeList,
	createGroup,
	editGroup,
	saveGroup
} from "@/api/auth";
export default {
	props: {
		mode: {
			type: String,
			default: "add",
			validator(value) {
				return ["add", "edit"].indexOf(value) !== -1;
			}
		}
	},
	data() {
		this.form = this.$form.createForm(this);
		return {

			indeterminate: false,
			checkAll: false,
			privilegeList: [], //权限列表
			levelList: [
				//级别列表
				{
					id: 0,
					title: "系统管理员"
				},
				{
					id: 1,
					title: "主站管理员"
				},
				{
					id: 2,
					title: "分站管理员"
				},
				{
					id: 3,
					title: "领导"
				},
				{
					id: 4,
					title: "编辑"
				},
				{
					id: 5,
					title: "实习编辑"
				}
			],
			//编辑模式下的用户组信息
			editForm: {},
			pageLoading: false
		};
	},
	mounted() {
		this.getPrivilegeList();

		if (this.mode === "edit") {
			this.getInfo();
		}
	},
	methods: {
		handleSubmit() {
			if (this.mode === "add") {
				return this.create();
			}
			if (this.mode === "edit") {
				return this.save();
			}
		},
		onChange(checkedList) {
			this.indeterminate =
				!!checkedList.length &&
				checkedList.length < this.privilegeList.length;
			this.checkAll = checkedList.length === this.privilegeList.length;
		},
		onCheckAllChange(e) {
			Object.assign(this, {
				indeterminate: false,
				checkAll: e.target.checked
			});
			if (e.target.checked) {
				this.form.setFieldsValue({
					privilege: this.privilegeList.map(i => {
						return i.value;
					})
				});
			} else {
				this.form.setFieldsValue({ privilege: [] });
			}
		},
		//获取权限列表
		getPrivilegeList() {
			getPrivilegeList({ page: 0 }).then(res => {
				this.privilegeList = res.data.list;
				if (this.privilegeList && this.privilegeList.length) {
					this.privilegeList = this.privilegeList.map(i => {
						return {
							value: i.id.toString(),
							label: i.title
						};
					});
				}
			});
		},
		//编辑模式下获取用户组信息
		getInfo() {
			this.pageLoading = true;
			const { params } = this.$route;
			const ajaxData = {
				id: params.id
			};
			editGroup(ajaxData).then(res => {
				this.pageLoading = false;

				this.editForm = { ...res.data };

				this.$nextTick(() => {
					this.form.setFieldsValue({
						title: this.editForm.title,
						level: this.editForm.level,
						privilege: this.editForm.privilege.split(",")
					});
				});
			});
		},
		//编辑模式下保存用户组信息
		save() {
			let ajaxData = {
				...this.form.getFieldsValue(),
				id: this.editForm.id
			};
			if (ajaxData.privilege) {
				ajaxData.privilege = ajaxData.privilege.join(",");
			}

			saveGroup(ajaxData)
				.then(res => {
					this.$message.success("保存成功");
				})
				.then(() => {
					this.$router.push("/authority/group-list");
				});
		},
		//新增模式下创建用户组
		create() {
			let ajaxData = { ...this.form.getFieldsValue() };
			if (ajaxData.privilege) {
				ajaxData.privilege = ajaxData.privilege.join(",");
			}

			createGroup(ajaxData)
				.then(res => {
					this.$message.success("添加成功");
				})
				.then(() => {
					this.$router.push("/authority/group-list");
				});
		}
	}
};
</script>
<style lang="less">
.add-edit-group {
	.ant-checkbox-group-item {
		min-width: 160px;
		margin-top: 10px;
	}
}
</style>

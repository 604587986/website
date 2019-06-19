<template>
	<div class="add-edit">
		<a-skeleton :loading="pageLoading" active :paragraph="{rows:6}">
			<a-form :form="form" class="login-form" layout="horizontal" @submit="handleSubmit">
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="账号" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['account']" placeholder="账号"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="昵称" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['nickname']" placeholder="昵称"/>
						</a-form-item>
					</a-col>
				</a-row>

				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="登录密码" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" type="password" v-decorator="['passwd']" placeholder="登录密码"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="确认密码" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" type="password" v-decorator="['passwd_confirm']" placeholder="确认密码"/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="用户组" v-bind="mixinFormItemLayoutShort">
							<a-select size="small" v-decorator="['group_id']" placeholder="用户组" allowClear>
								<a-select-option v-for="item in groupList" :value="item.id" :key="item.id">{{item.title}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="所属部门" v-bind="mixinFormItemLayoutShort">
							<a-select size="small" v-decorator="['department_id']" placeholder="所属部门" allowClear>
								<a-select-option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.title}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
				<a-form-item label="管理站点" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<a-select mode="multiple" v-decorator="['site_id']" allowClear placeholder="请选择管理站点">
						<a-select-option v-for="i in siteList" :key="i.id" :value="String(i.id)">{{i.title}}</a-select-option>
					</a-select>
				</a-form-item>

				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="邮箱" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['mail']" placeholder="邮箱"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="手机号" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['mobile']" placeholder="手机号"/>
						</a-form-item>
					</a-col>
				</a-row>

				<a-form-item v-bind="mixinFormItemLayoutShort">
					<a-button type="primary" html-type="submit">提交</a-button>
				</a-form-item>
			</a-form>
		</a-skeleton>
	</div>
</template>
<script>
import { createUser, editUser, saveUser, getGroupList } from "@/api/auth";

import { getDepartmentList } from "@/api/department";

import { getSiteList } from "@/api/site";
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

			groupList: [], //用户组列表
			departmentList: [], //用户组列表
			siteList: [], //站点列表
			editForm: {}, //编辑模式下的信息
			pageLoading: false
		};
	},
	mounted() {
		this.getGroupList();
		this.getDepartmentList();
		this.getSiteList();

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
		//获取用户组列表
		getGroupList() {
			getGroupList({ size: 1000 }).then(res => {
				this.groupList = res.data.list;
			});
		},
		//获取部门列表
		getDepartmentList() {
			getDepartmentList({ size: 1000 }).then(res => {
				this.departmentList = res.data.list;
			});
		},
		//获取站点列表
		getSiteList() {
			getSiteList({ size: 1000 }).then(res => {
				this.siteList = res.data.list;
			});
		},
		//编辑模式下获取
		getInfo() {
			this.pageLoading = true;

			const { params } = this.$route;
			const ajaxData = {
				id: params.id
			};
			editUser(ajaxData).then(res => {
				this.pageLoading = false;

				this.editForm = { ...res.data };

				if (this.editForm.site_list && this.editForm.site_list.length) {
					this.editForm.site_id = this.editForm.site_list.map(i => {
						return i.id.toString();
					});
				}
				this.$nextTick(() => {
					this.form.setFieldsValue({
						account: this.editForm.account,
						nickname: this.editForm.nickname,
						group_id: this.editForm.group_id,
						department_id: this.editForm.department_id,
						site_id: this.editForm.site_id,
						mail: this.editForm.mail,
						mobile: this.editForm.mobile
					});
				});
			});
		},
		//编辑模式下保存
		save() {
			let ajaxData = {
				...this.form.getFieldsValue(),
				id: this.editForm.id
			};
			if (ajaxData.privilege) {
				ajaxData.privilege = ajaxData.privilege.join(",");
			}

			saveUser(ajaxData)
				.then(res => {
					this.$message.success("保存成功");
				})
				.then(() => {
					this.$router.push("/authority/user-list");
				});
		},
		//新增模式下创建
		create() {
			let ajaxData = { ...this.form.getFieldsValue() };

			if (ajaxData.site_id) {
				ajaxData.site_id = ajaxData.site_id.join(",");
			}

			createUser(ajaxData)
				.then(res => {
					this.$message.success("添加成功");
				})
				.then(() => {
					this.$router.push("/authority/user-list");
				});
		}
	}
};
</script>

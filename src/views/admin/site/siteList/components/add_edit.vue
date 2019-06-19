<template>
	<div class="add-edit">
		<a-skeleton :loading="pageLoading" active :paragraph="{rows:12}">
			<a-form :form="form" class="login-form" layout="horizontal" @submit="handleSubmit">
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="站点名称" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['title']" placeholder="站点名称"/>
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

				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="编码" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['code']" placeholder="编码"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="别名" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['alias']" placeholder="别名"/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="域名" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['domain']" placeholder="域名"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="启用HTTPS" v-bind="mixinFormItemLayoutShort">
							<a-radio-group v-decorator="['domain_https']">
								<a-radio :value="1">启用</a-radio>
								<a-radio :value="0">不启用</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
				</a-row>

				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="跨站点引用" v-bind="mixinFormItemLayoutShort">
							<a-radio-group v-model="is_cross">
								<a-radio :value="true">启用</a-radio>
								<a-radio :value="false">不启用</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="选择引用站点" v-bind="mixinFormItemLayoutShort" v-if="is_cross">
							<a-select size="small" v-decorator="['cross_site']" placeholder="选择引用站点" allowClear>
								<a-select-option v-for="item in siteList" :value="item.id" :key="item.id" :disabled="item.id == $route.params.id">{{item.title}}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>

				<a-form-item label="网站关键字" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<a-textarea size="small" v-decorator="['keywords']" placeholder="网站关键字"/>
				</a-form-item>
				<a-form-item label="网站描述" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<a-textarea size="small" v-decorator="['description']" placeholder="网站描述"/>
				</a-form-item>
				<a-form-item label="访问统计代码" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<a-textarea size="small" v-decorator="['analytics']" placeholder="访问统计代码"/>
				</a-form-item>
				<a-form-item label="底部信息" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<a-textarea size="small" v-decorator="['tail_info']" placeholder="底部信息"/>
				</a-form-item>

				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="微信二维码" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['qr_wechat']" placeholder="微信二维码"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="微博二维码" v-bind="mixinFormItemLayoutShort">
							<a-input size="small" v-decorator="['qr_weibo']" placeholder="微博二维码"/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="网站状态" v-bind="mixinFormItemLayoutShort">
							<a-radio-group v-decorator="['state']">
								<a-radio :value="1">正常</a-radio>
								<a-radio :value="0">建设中</a-radio>
								<a-radio :value="-1">关闭</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="排序" v-bind="mixinFormItemLayoutShort">
							<a-input-number size="small" v-decorator="['sort']" placeholder="排序"/>
						</a-form-item>
					</a-col>
				</a-row>

				<a-form-item label="备注" :labelCol="{span:2}" :wrapperCol="{span:22}">
					<a-textarea size="small" v-decorator="['comment']" placeholder="备注"/>
				</a-form-item>

				<a-form-item v-bind="mixinFormItemLayoutShort">
					<a-button type="primary" html-type="submit">提交</a-button>
				</a-form-item>
			</a-form>
		</a-skeleton>
	</div>
</template>
<script>
import { createSite, editSite, saveSite } from "@/api/site";

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
			pageLoading: false,
			is_cross: false //是否启用跨站点引用
		};
	},
	mounted() {
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
			editSite(ajaxData).then(res => {
				this.pageLoading = false;

				this.editForm = { ...res.data };

				if (this.editForm.site_list && this.editForm.site_list.length) {
					this.editForm.site_id = this.editForm.site_list.map(i => {
						return i.id.toString();
					});
				}
				if (this.editForm.cross_site) {
					this.is_cross = true;
				}

				this.$nextTick(() => {
					this.form.setFieldsValue({
						title: this.editForm.title,
						department_id: this.editForm.department_id,
						code: this.editForm.code,
						alias: this.editForm.alias,
						domain: this.editForm.domain,
						domain_https: this.editForm.domain_https,
						keywords: this.editForm.keywords,
						description: this.editForm.description,
						analytics: this.editForm.analytics,
						tail_info: this.editForm.tail_info,
						qr_wechat: this.editForm.qr_wechat,
						qr_weibo: this.editForm.qr_weibo,
						state: this.editForm.state,
						sort: this.editForm.sort,
						comment: this.editForm.comment,
					});
					//判断是否跨站点引用，再进行赋值操作
					if (this.editForm.cross_site) {
						this.form.setFieldsValue({
							cross_site: this.editForm.cross_site
						});
					}
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

			saveSite(ajaxData)
				.then(res => {
					this.$message.success("保存成功");
				})
				.then(() => {
					this.$router.push("/site/site-list");
				});
		},
		//新增模式下创建
		create() {
			let ajaxData = { ...this.form.getFieldsValue() };

			if (ajaxData.site_id) {
				ajaxData.site_id = ajaxData.site_id.join(",");
			}

			createSite(ajaxData)
				.then(res => {
					this.$message.success("添加成功");
				})
				.then(() => {
					this.$router.push("/site/site-list");
				});
		}
	}
};
</script>

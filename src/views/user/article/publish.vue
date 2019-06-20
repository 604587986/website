<template>
	<div class="publish-article">
		<a-form :form="form" class="login-form" layout="horizontal" @submit="handleSubmit">
			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="分类" v-bind="mixinFormItemLayoutShort">
						<a-cascader
							size="small"
							v-decorator="['category_id']"
							placeholder="所属分类"
							:options="category.list"
							:fieldNames="{label:'title',value:'id',children:'children'}"
							changeOnSelect
						/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="引用" v-bind="mixinFormItemLayoutShort">
						<a-tree-select
							v-decorator="['quote_id']"
							:treeData="categoryTreeSelect"
							:dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
							:optionL="{label:'title',value:'id',children:'children'}"
							treeNodeFilterProp="id"
							treeNodeLabelProp="title"
							placeholder="引用"
							allowClear
							multiple
							size="small"
						></a-tree-select>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="标题" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['title']" placeholder="标题"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="作者" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['author']" placeholder="作者"/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-form-item label="摘要" :labelCol="{span:2}" :wrapperCol="{span:22}">
				<a-textarea size="small" v-decorator="['abstract']" placeholder="摘要"/>
			</a-form-item>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="摄影" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['photo']" placeholder="摄影"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="编辑" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['editor']" placeholder="编辑"/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="来源" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['source']" placeholder="来源"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="字段1" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['field_one']" placeholder="字段1"/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="字段2" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['field_two']" placeholder="字段2"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="字段3" v-bind="mixinFormItemLayoutShort">
						<a-input size="small" v-decorator="['field_three']" placeholder="字段3"/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="文章发布日期" v-bind="mixinFormItemLayoutShort">
						<a-date-picker v-decorator="['release_time']"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="置顶截止日期" v-bind="mixinFormItemLayoutShort">
						<a-date-picker v-decorator="['pin_date']"/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="文章标签" v-bind="mixinFormItemLayoutShort">
						<a-select mode="multiple" :loading="tag.loading" v-decorator="['tag_id']" allowClear placeholder="请选择标签">
							<a-select-option v-for="i in tag.list" :key="i.id" :value="String(i.id)">{{i.title}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="是否推荐" v-bind="mixinFormItemLayoutShort">
						<a-switch v-decorator="['recommend']" defaultChecked/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-form-item label="文章内容">
				<editor v-decorator="['content']"></editor>
			</a-form-item>

			<a-form-item v-bind="mixinFormItemLayoutShort">
				<a-button type="primary" html-type="submit">提交</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
import { getCategoryList } from "@/api/category";
import { getTagList } from "@/api/tag";
import { create } from "@/api/article";
import Moment from "moment";

import editor from "@/components/Tinymce";

export default {
	data() {
		this.form = this.$form.createForm(this);
		return {
			aaa: "",

			category: {
				list: [],
				loading: false
			},
			tag: {
				list: [],
				loading: false
			},
			preCreateForm: {}
		};
	},
	computed: {
		categoryTreeSelect() {
			return this.treeRender(this.category.list);
		}
	},
	components: {
		editor
	},
	mounted() {
		this.getCategoryList();
		this.getTagList();

		this.form.setFieldsValue({
			release_time: Moment()
		});
	},
	methods: {
		handleSubmit() {
			this.preCreate().then(res => {
				this.preCreateForm = { ...res.data.data };

				let data = { ...this.form.getFieldsValue() };

				if (data.pin_date) {
					data.pin_date = data.pin_date.format("YYYY-MM-DD hh:mm:ss");
				}
				if (data.release_time) {
					data.release_time = data.release_time.format(
						"YYYY-MM-DD hh:mm:ss"
					);
				}
				if (data.category_id && data.category_id.length) {
					data.category_id =
						data.category_id[data.category_id.length - 1];
				} else {
					delete data.category_id;
				}

				if (data.quote_id && data.quote_id.length) {
					data.quote_id = data.quote_id.join(",");
				} else {
					delete data.quote_id;
				}
				if (data.tag_id && data.tag_id.length) {
					data.tag_id = data.tag_id.join(",");
				} else {
					delete data.tag_id;
				}

				data.id = this.preCreateForm.id;

				data.content = this.preCreateForm.content;

				console.log(data);
			});
		},
		//获取分类列表
		getCategoryList() {
			this.category.loading = true;
			getCategoryList({ tree: true }).then(res => {
				this.category.loading = false;
				this.category.list = res.data.list;
			});
		},
		//获取文章标签列表
		getTagList() {
			getTagList({ page: 0 }).then(res => {
				this.tag.loading = false;
				this.tag.list = res.data.list;
			});
		},
		//树形结构字段重组（tree select 组件）
		treeRender(treeData) {
			let newarr = [];
			treeData.forEach(i => {
				let objItem = {};
				objItem.value = i.id;
				objItem.label = i.title;
				if (i.children && i.children.length) {
					objItem.children = this.treeRender(i.children);
				}

				newarr.push(objItem);
			});
			return newarr;
		},
		//文章预创建
		preCreate() {
			return create().then(res => {
				return res;
			});
		}
	}
	// beforeRouteLeave(to, from, next) {
	// 	if (!this.isSubmit) {
	// 		this.$confirm("是否放弃保存并离开此页面", "提示", {
	// 			confirmButtonText: "确定",
	// 			cancelButtonText: "取消",
	// 			type: "warning"
	// 		})
	// 			.then(() => {
	// 				next();
	// 			})
	// 			.catch(() => {
	// 				next(false);
	// 			});
	// 	} else {
	// 		next();
	// 	}
	// }
};
</script>
<style lang="less">
.publish-article {
	.ant-form-item {
		margin-bottom: 20px;
	}
}
</style>

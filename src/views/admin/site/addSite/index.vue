<template>
	<div class="site">
		<a-form :form="form" class="login-form" layout="horizontal" @submit="handleSubmit">
			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="站点名称" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['title']" placeholder="站点名称"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="所属部门" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['title']" placeholder="所属部门"/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="编码" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['title']" placeholder="编码"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="别名" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['author']" placeholder="别名"/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="域名" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['title']" placeholder="域名"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}"></a-col>
			</a-row>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="启用HTTPS" v-bind="formItemLayoutShort">
						<a-radio-group v-decorator="['http']">
							<a-radio :value="1">启用</a-radio>
							<a-radio :value="0">不启用</a-radio>
						</a-radio-group>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="跨站点引用" v-bind="formItemLayoutShort">
						<a-radio-group v-decorator="['http']">
							<a-radio :value="1">启用</a-radio>
							<a-radio :value="0">不启用</a-radio>
						</a-radio-group>
					</a-form-item>
				</a-col>
			</a-row>

			<a-form-item label="网站关键字" :labelCol="{span:2}" :wrapperCol="{span:22}">
				<a-textarea size="small" v-decorator="['abstract']" placeholder="网站关键字"/>
			</a-form-item>
			<a-form-item label="网站描述" :labelCol="{span:2}" :wrapperCol="{span:22}">
				<a-textarea size="small" v-decorator="['abstract']" placeholder="网站描述"/>
			</a-form-item>
			<a-form-item label="访问统计代码" :labelCol="{span:2}" :wrapperCol="{span:22}">
				<a-textarea size="small" v-decorator="['abstract']" placeholder="访问统计代码"/>
			</a-form-item>
			<a-form-item label="底部信息" :labelCol="{span:2}" :wrapperCol="{span:22}">
				<a-textarea size="small" v-decorator="['abstract']" placeholder="底部信息"/>
			</a-form-item>

			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="微信二维码" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['photo']" placeholder="微信二维码"/>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="微博二维码" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['editor']" placeholder="微博二维码"/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="网站状态" v-bind="formItemLayoutShort">
						<a-radio-group v-decorator="['http']">
							<a-radio :value="1">正常</a-radio>
							<a-radio :value="0">建设中</a-radio>
							<a-radio :value="-1">关闭</a-radio>
						</a-radio-group>
					</a-form-item>
				</a-col>
				<a-col :lg="{span:12}" :xs="{span:24}">
					<a-form-item label="排序" v-bind="formItemLayoutShort">
						<a-input size="small" v-decorator="['editor']" placeholder="排序"/>
					</a-form-item>
				</a-col>
			</a-row>

			<a-form-item label="备注" :labelCol="{span:2}" :wrapperCol="{span:22}">
				<a-textarea size="small" v-decorator="['abstract']" placeholder="备注"/>
			</a-form-item>

			<a-form-item v-bind="formItemLayoutShort">
				<a-button type="primary" html-type="submit">提交</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
export default {
	data() {
		this.form = this.$form.createForm(this);
		return {
			formItemLayoutShort: {
				labelCol: { lg: { span: 4 }, xs: { span: 2 } },
				wrapperCol: { lg: { span: 10 }, xs: { span: 22 } }
			}
		};
	},
	components: {},
	mounted() {},
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
		}
	}
};
</script>
<style lang="less">
.publish-article {
	.ant-form-item {
		margin-bottom: 20px;
	}
}
</style>

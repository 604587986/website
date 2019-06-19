<template>
	<div class="add-edit">
		<a-skeleton :loading="pageLoading" active :paragraph="{rows:1}">
			<a-form :form="form" class="login-form" layout="horizontal" @submit="handleSubmit">
				<a-row>
					<a-col :lg="{span:12}" :xs="{span:24}">
						<a-form-item label="标签名称" v-bind="mixinFormItemLayoutShort">
							<a-input v-decorator="['title']" placeholder="请填写标签名称"/>
						</a-form-item>
					</a-col>
					<a-col :lg="{span:12}" :xs="{span:24}"></a-col>
				</a-row>

				<a-form-item style="text-align:center">
					<a-button type="primary" html-type="submit">提交</a-button>
				</a-form-item>
			</a-form>
		</a-skeleton>
	</div>
</template>
<script>
import { createTag, editTag, saveTag } from "@/api/tag";

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

			editForm: {}, //编辑模式下的信息
			pageLoading: false
		};
	},
	mounted() {
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
		//编辑模式下获取
		getInfo() {
			this.pageLoading = true;

			const { params } = this.$route;
			const ajaxData = {
				id: params.id
			};
			editTag(ajaxData).then(res => {
				this.pageLoading = false;

				this.editForm = { ...res.data };

				this.$nextTick(() => {
					this.form.setFieldsValue({
						title: this.editForm.title
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

			saveTag(ajaxData)
				.then(res => {
					this.$message.success("保存成功");
				})
				.then(() => {
					this.$router.push("/tag/list");
				});
		},
		//新增模式下创建
		create() {
			let ajaxData = { ...this.form.getFieldsValue() };

			createTag(ajaxData)
				.then(res => {
					this.$message.success("添加成功");
				})
				.then(() => {
					this.$router.push("/tag/list");
				});
		}
	}
};
</script>

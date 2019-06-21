<template>
	<div class="bg" :style="{backgroundImage:'url('+siteInfo.image_url+')'}">
		<div class="login-box">
			<div class="logo">
				<img :src="siteInfo.login_url" alt>
			</div>

			<a-form id="login-form" :form="form" class="login-form" @submit="handleSubmit">
				<a-form-item>
					<a-input v-decorator="[
          'account',
          { rules: [{ required: true, message: '请输入账号' }] }
        ]" placeholder="账号">
						<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-input v-decorator="[
          'passwd',
          { rules: [{ required: true, message: '请输入密码' }] }
        ]" type="password" placeholder="密码">
						<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-row :gutter="16">
						<a-col :span="14">
							<a-input v-decorator="[
          'value',
          { rules: [{ required: true, message: '请输入验证码' }] }
        ]" placeholder="请输入验证码"></a-input>
						</a-col>
						<a-col :span="10">
							<img :src="captchaImg" class="captchaImg" alt @click="getCaptcha">
						</a-col>
					</a-row>
				</a-form-item>

				<a-form-item>
					<a-button type="primary" html-type="submit" class="login-form-button" :loading="btnLoading">登录</a-button>
				</a-form-item>
				<a-form-item>
					<div>
						<p>登录说明：</p>
						<p style="font-size:12px;color:rgb(136, 136, 136)">1.浏览器建议使用Chrome、Firefox、360极速浏览器</p>
						<p style="font-size:12px;color:rgb(136, 136, 136)">2.分辨率建议使用1366*768以上</p>
					</div>
				</a-form-item>
			</a-form>
			<div style="text-align:center;color:rgb(136, 136, 136)">中国美术学院 版权所有</div>
		</div>

		<a-modal title="选择您要进入的站点" v-model="visible" @ok="handleOk" :afterClose="handleClose">
			<a-radio-group v-model="siteselected">
				<a-radio :style="radioStyle" :value="site.id" v-for="site in managedSiteList" :key="site.id">{{site.title}}</a-radio>
			</a-radio-group>
		</a-modal>
	</div>
</template>
<script>
import { captcha, getSiteInfo } from "@/api/user";
import Cookie from "js-cookie";

export default {
	data() {
		this.form = this.$form.createForm(this);
		return {
			siteInfo: {},
			captchaImg: "",
			btnLoading: false,
			visible: false,
			siteselected: undefined,
			radioStyle: {
				display: "block",
				height: "30px",
				lineHeight: "30px"
			}
		};
	},
	computed: {
		managedSiteList() {
			return this.$store.state.user.siteList;
		}
	},
	mounted() {
		this.getCaptcha();
		this.getSiteInfo();
	},
	methods: {
		getSiteInfo() {
			getSiteInfo().then(res => {
				this.siteInfo = res.data[0];
			});
		},
		getCaptcha() {
			captcha().then(res => {
				this.captchaImg = res.data[0];
			});
		},
		handleSubmit(e) {
			e.preventDefault();
			const {
				$store: { dispatch }
			} = this;

			this.form.validateFields((err, values) => {
				if (!err) {
					this.btnLoading = true;
					const data = this.form.getFieldsValue();
					dispatch("login", data)
						.then(res => {
							//此时用户已登录成功，但前端路由未授权
							this.btnLoading = false;
							// 如果此用户有管理站点，且大于一个，则显示弹出框让用户选择
							if (
								this.managedSiteList &&
								this.managedSiteList.length > 1
							) {
								this.visible = true;
							}
							// 如果此用户有管理站点，但只有一个，则默认此用户选择了这个站点
							else if (
								this.managedSiteList &&
								this.managedSiteList.length === 1
							) {
								//管理的站点
								Cookie.set(
									"mock_site",
									this.managedSiteList[0].id,
									{
										expires: 1
									}
								);
								Cookie.set("QH_STATUS", true, { expires: 1 });
								this.$router.push("/");
							}
							//如果此用户无管理站点，则为系统管理员，直接授权
							else if (!this.managedSiteList.length) {
								Cookie.set("QH_STATUS", true, { expires: 1 });
								this.$router.push("/");
							}
						})
						.catch(err => {
							this.btnLoading = false;
						});
				}
			});
		},
		handleOk() {
			if (this.siteselected) {
				//管理的站点
				Cookie.set("mock_site", this.siteselected, { expires: 1 });
				//标记用户已登录（路由授权）
				Cookie.set("QH_STATUS", true, { expires: 1 });
				//
				this.$router.push("/");
			} else {
				this.$message.warning("请选择一个站点");
			}
		},
		handleClose() {
			this.siteselected = undefined;
		}
	}
};
</script>
<style>
#login-form .login-form {
	max-width: 300px;
}
#login-form .login-form-forgot {
	float: right;
}
#login-form .login-form-button {
	width: 100%;
}
</style>
<style lang="less" scoped>
.bg {
	min-height: 100vh;
	overflow: hidden;
	background-position: top center;
	.login-box {
		width: 400px;
		margin: 200px auto;
		background: #fff;
		padding: 30px;
		.logo {
			img {
				width: 335px;
			}
		}
		.login-form {
			margin-top: 20px;
			.captchaImg {
				width: 100%;
				cursor: pointer;
			}
		}
	}
}
</style>

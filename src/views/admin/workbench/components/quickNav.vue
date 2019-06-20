<template>
	<div class="quick-nav">
		<a-row style="width:100%" :gutter="40">

			<a-col :xl="{span:4}" :md="{span:8}"   v-for="item in navList" :key="item.title">
				<router-link class="quick-nav-item" :to="item.url">
					<div class="link-box">
						<i class="iconfont" :class="'icon-'+item.icon"></i>
						<p class="title">{{item.title}}</p>
					</div>
				</router-link>
			</a-col>
		</a-row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			navList: [
				{
					icon: "user",
					title: "用户管理",
					url: ""
				},
				{
					icon: "fujianguanli",
					title: "附件管理",
					url: ""
				},
				{
					icon: "xitongrizhi",
					title: "系统日志",
					url: ""
				},
				{
					icon: "shujubeifen",
					title: "数据备份",
					url: ""
				},
				{
					icon: "wenzhangliebiao",
					title: "查看站点内容",
					url: ""
				},
				{
					icon: "liuyan",
					title: "发布监控",
					url: ""
				},
			]
		};
	}
};
</script>
<style lang="less" scoped>
.quick-nav {
	padding-top: 48px;
	border-top: 1px solid #d9d9d9;
	display: flex;
	width: 100%;
	.quick-nav-item {
		flex: 1 1 auto;
		color: #fff;
		height: 140px;
		margin-right: 20px;
		margin-bottom: 10px;
		text-align: center;
		color: #fff;
		display: inline-block;
		width: 100%;
		position: relative;
		border: 1px solid #d9d9d9;
		transition: all 0.3s;
		.link-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.iconfont {
				font-size: 38px;
				color: #00a0e9;
				&.icon-user {
					font-weight: 600;
				}
			}
			.title {
				margin-top: 20px;
				font-size: 14px;
				color: #888;
			}
		}
		&:hover {
			transform: scale(1.1);
		}
	}
}
</style>

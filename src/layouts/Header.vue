<template>
	<div class="public-container">
		<div class="header clearfix">
			<div class="site-info">
				<span v-if="$store.state.user.site">所属站点：{{$store.state.user.site.title}}</span>
				<span v-if="$store.state.user.site" class="site-link">
					<a :href="'//'+$store.state.user.site.domain" target="_blank">前台首页</a>
				</span>
			</div>
			<div class="is-mock">
				<a-tag color="#f56c6c" @click="backToAdmin" v-if="isMock">返回系统管理员界面</a-tag>
			</div>

			<div class="actions">
				<span>修改密码</span>
				<i class="line">|</i>
				<span @click="logout">退出</span>
			</div>
			<div class="welcome">
				<i class="iconfont icon-user"></i>
				<span>欢迎您，</span>
				<span>{{$store.state.user.user.nickname}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import Cookie from "js-cookie";

export default {
	data() {
		return {
			isMock: Cookie.get("mock_user") ? true : false
		};
	},
	methods: {
		logout() {
			const {
				$store: { dispatch }
			} = this;

			dispatch("logout").then(res => {
				location.reload();
			});
		},
		backToAdmin() {
			Cookie.remove("mock_user");
			Cookie.remove("mock_site");
			setTimeout(() => {
				location.href = "/";
			}, 300);
		}
	}
};
</script>
<style lang="less" scoped>
.header {
	color: #fff;
	.site-info {
		float: left;
		.site-link {
			margin-left: 30px;
			a {
				color: #fff;
			}
		}
	}
	.is-mock {
		float: left;
		margin-left: 20px;
		cursor: pointer;
	}
	.actions {
		float: right;
		.line {
			padding: 0 10px;
		}
		> span {
			cursor: pointer;
		}
	}
	.welcome {
		float: right;
		margin-right: 20px;
		.iconfont {
			padding: 0 10px;
		}
	}
}
</style>

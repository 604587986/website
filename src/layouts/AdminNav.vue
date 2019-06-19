<template>
	<div class="public-container">
		<div class="nav clearfix">
			<div class="logo">
				<img src="@/assets/images/logo.png" alt>
			</div>
			<div class="nav-item-wrapper">
				<router-link to="/workbench" class="nav-item">工作台</router-link>
				<router-link to="/site" class="nav-item">站点管理</router-link>
				<router-link to="/monitor" class="nav-item">发布监控</router-link>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.public-container {
  background: #fff;
  width: 100%;
}
.nav {
	height: 80px;
	line-height: 80px;
	.logo {
		float: left;
	}
	.nav-item-wrapper {
    float: left;
    margin-left: 40px;
		.nav-item {
			padding: 0 20px;
			font-size: 16px;
			color: #606266;
			&.router-link-active {
				color: #00a0e9;
			}
		}
	}
}
</style>

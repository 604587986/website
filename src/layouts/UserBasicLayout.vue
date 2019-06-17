<template>
	<div class="user-basic-layout">
		<a-layout-header>
			<the-header></the-header>
		</a-layout-header>
		<div class="public-container">
			<div class="card">
				<user-menu></user-menu>
				<router-view></router-view>
			</div>
		</div>

		<the-footer></the-footer>
	</div>
</template>
<script>
import theHeader from "./Header";
import theFooter from "./Footer";
import UserMenu from "./UserMenu";
export default {
	data() {
		return {};
	},
	components: {
		theHeader,
		theFooter,
		UserMenu
	}
};
</script>
<style lang="less" scoped>
.user-basic-layout {
	.card {
		padding: 20px;
		margin-top: 20px;
    background: #fff;
    min-height: 80vh;
	}
}
</style>

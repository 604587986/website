<template>
	<div class="user-basic-layout">
		<a-layout-header>
			<the-header></the-header>
		</a-layout-header>
		<div :class="{'public-container':needPadding}">
			<div class="card">
				<user-menu></user-menu>
				<wy-crumb style="margin-top:40px"></wy-crumb>
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
	computed: {
		needPadding() {
			if (this.$store.state.app.device === "desktop") {
				return true;
			}
			return false;
		}
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

<template>
	<div class="user-panel-layout">
		<a-layout-header>
			<the-header></the-header>
		</a-layout-header>
		<the-nav></the-nav>
		<div class="panel-body public-container">
			<div class="entry-list">
				<div v-for="item in routers" :key="item.path" class="entry-box">
					<router-link :to="item.path">
						<div class="link-box">
							<div class="iconfont" :class="'icon-'+item.meta.icon"></div>
							<div>{{item.meta.title}}</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<the-footer></the-footer>
	</div>
</template>
<script>
import theHeader from "./Header";
import theFooter from "./Footer";
import theNav from "./UserNav";

export default {
	data() {
		return {
			routers: []
		};
	},
	created() {
		this.panelRouterMap(this.$store.getters.addRouters);
	},
	methods: {
		panelRouterMap(mapRouters = []) {
			mapRouters.forEach(route => {
				const _route = { ...route };
				if (_route.meta && _route.meta.showInPanel) {
					delete _route.children;
					delete _route.component;
					this.routers.push(_route);
				} else if (route.children) {
					this.panelRouterMap(route.children);
				}
			});
		}
	},
	components: {
		theHeader,
		theNav,
		theFooter
	}
};
</script>
<style lang="less" scoped>
.panel-body {
	min-height: 80vh;
	 background: #f3f3f3;
	padding-top: 30px;
	.entry-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.entry-box {
		flex: 1 1 auto;
		background: #54c3f1;
		color: #fff;
		height: 250px;
		width: 15%;
		margin-right: 10px;
		margin-bottom: 10px;
		text-align: center;
		a {
			color: #fff;
			display: inline-block;
			width: 100%;
			height: 100%;
			position: relative;
			.link-box {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				.iconfont{
					font-size: 54px
				}
			}
		}
		&:nth-child(even) {
			background: #00a0e9;
		}
	}
}
</style>

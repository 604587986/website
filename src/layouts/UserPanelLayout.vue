<template>
	<div class="user-panel-layout">
		<the-header></the-header>
		<div class="panel-body">
			<div v-for="item in routers" :key="item.path">
				<router-link :to="item.path">{{item.meta.title}}</router-link>
			</div>
		</div>
		<the-footer></the-footer>
	</div>
</template>
<script>
import theHeader from "./Header";
import theFooter from "./Footer";
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
		theFooter
	}
};
</script>
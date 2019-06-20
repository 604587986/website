<template>
	<div class="admin-basic-layout">
		<a-layout :style="{minHeight:'100vh'}">
			<a-layout-header>
				<the-header></the-header>
			</a-layout-header>
			<the-nav></the-nav>
			<a-layout class="layout-content" :style="{padding:needPadding?'20px':0}">
				<side-menu mode="inline" :menus="menuData" :collapsed="collapsed" :collapsible="true"></side-menu>
				<a-layout :style="{paddingLeft:needPadding?'20px':0}">
					<a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
						<wy-crumb></wy-crumb>
						<route-view></route-view>
					</a-layout-content>
				</a-layout>
			</a-layout>
			<a-layout-footer style="text-align: center">
				<the-footer></the-footer>
			</a-layout-footer>
		</a-layout>
	</div>
</template>
<script>
import theHeader from "./Header";
import theNav from "./AdminNav";
import theFooter from "./Footer";
import RouteView from "./RouteView";

import SideMenu from "@/components/menu/SideMenu";

export default {
	data() {
		const menuData = this.getMenuData(
			this.$store.getters.addRouters.find(route => route.path === "/")
				.children
		);
		return {
			menuData
		};
	},
	computed: {
		collapsed() {
			return !this.$store.state.app.sidebar.opened;
		},
		needPadding() {
			if (this.$store.state.app.device === "desktop") {
				return true;
			}
			return false;
		}
	},
	methods: {
		//生成菜单
		getMenuData(treeData = []) {
			let newarr = [];
			treeData.forEach(i => {
				if (!i.meta || (i.meta && !i.meta.hidden)) {
					let objItem = { ...i };
					newarr.push(objItem);
					if (i.children && i.children.length) {
						objItem.children = this.getMenuData(i.children);
					}
				}
			});
			return newarr;
		}
	},
	components: {
		theHeader,
		theNav,
		theFooter,
		SideMenu,
		RouteView
	}
};
</script>
<style lang="less" scoped>
</style>

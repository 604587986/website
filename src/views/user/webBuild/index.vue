<template>
	<div class="web-build">
		<a-tabs defaultActiveKey="1">
			<a-tab-pane tab="生成首页" key="1">
				<indexBuild></indexBuild>
			</a-tab-pane>
			<a-tab-pane tab="生成分类页" key="2">
				<categoryBuild></categoryBuild>
			</a-tab-pane>
			<a-tab-pane tab="生成单页" key="3">
				<pageBuild></pageBuild>
			</a-tab-pane>
			<a-tab-pane tab="生成内容页" key="4">
				<contentBuild></contentBuild>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>
<script>
import indexBuild from "./components/index_build";
import categoryBuild from "./components/category_build";
import pageBuild from "./components/page_build";
import contentBuild from "./components/content_build";
export default {
	components: {
		indexBuild,
		categoryBuild,
		pageBuild,
		contentBuild
	}
};
</script>

<template>
	<a-breadcrumb class="breadcrumb">
		<a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
			<router-link v-if="item.name != name" :to="{ path: item.path }">{{ item.meta.title }}</router-link>
			<span v-else>{{ item.meta.title }}</span>
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			breadList: []
		};
	},
	created() {
		this.getBreadcrumb();
	},
	methods: {
		getBreadcrumb() {
			this.breadList = [];
			this.name = this.$route.name;

			console.log(this.$route.matched);

			this.$route.matched.forEach(item => {
				// item.name === "index"
				// 	? (item.path = "/")
				// 	: this.$route.path === item.path;
				if (item.name !== "index") {
					this.breadList.push(item);
				}
			});
		}
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		}
	}
};
</script>

<style scoped>
.breadcrumb {
	margin-bottom: 10px;
}
</style>
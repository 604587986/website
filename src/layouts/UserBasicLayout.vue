<template>
	<div class="user-basic-layout">
		<the-header></the-header>
		<router-link to="/workbench">工作台</router-link>
		<router-view></router-view>
		<the-footer></the-footer>
	</div>
</template>
<script>
import theHeader from "./Header";
import theFooter from "./Footer";
export default {
	components: {
		theHeader,
		theFooter
	}
};
</script>

export default {
	name: "wyRouterView",
	render() {
		if (this.keepAlive) {
			return (
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			)
		} 
		return (
			<router-view></router-view>
		)



	},
	computed:{
		keepAlive(){
			return this.$route.meta && this.$route.meta.keepAlive
		}
	},

}
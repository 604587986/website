<template>
	<div class="wy-spin wy-spin-fix">
		<div class="wy-spin-main">
			<span class="wy-span-dot"></span>
			<div class="wy-spin-text" v-show="text">{{text}}</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		text: {
			type: String,
			default: ""
		}
	}
};
</script>

<style lang="less">
.wy-spin {
	color: rgb(245, 108, 108);
	vertical-align: middle;
	text-align: center;
	&.wy-spin-fix {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 8;
		width: 100%;
		height: 100%;
		background-color: hsla(0, 0%, 100%, 0.6);
		.wy-spin-main {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.wy-span-dot {
				display: inline-block;
			}
		}
	}
	.wy-spin-main {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.wy-span-dot {
			position: relative;
			display: block;
			border-radius: 50%;
			background-color: rgb(245, 108, 108);
			width: 20px;
			height: 20px;
			animation: ani-spin-bounce 1s 0s ease-in-out infinite;
		}
		.wy-span-text {
		}
	}
}
@keyframes ani-spin-bounce {
	0% {
		transform: scale(0);
	}

	to {
		transform: scale(1);
		opacity: 0;
	}
}
</style>

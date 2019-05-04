<template>
	<header class="app-header">
		<div class="app-header-content">
			<span class="menu"><font-awesome-icon icon="bars" /></span>
			<router-link to="/">
				<h1>DVLP / DNVR / 2019</h1>
			</router-link>
			<!-- <primary-navigation /> -->
		</div>
	</header>
</template>

<script>
import PrimaryNavigation from "@/components/primary-navigation.vue";

export default {
	components: {
		PrimaryNavigation,
	},
};
</script>

<style lang="scss">
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";
	@import "@/styles/_typography.scss";

	.app-header {
		.app-header-content {
			background-color: $black;
			position: fixed;
			max-width: 100px; // Chrome hack
			height: 100vh;
			top: 0;
			left: 0;
			z-index: 1;
			padding: $baseline;
			h1 {
				writing-mode: vertical-rl;
				@include primary-header-font;
				transform: rotate(180deg);
			}
		}
		.menu {
			display: inline-block;
			width: 100%;
			margin-bottom: $baseline * 4;
			svg {
				width: 100%;
				height: 36px;
			}
		}
	}
</style>

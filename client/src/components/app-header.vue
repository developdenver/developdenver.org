<template>
	<header class="app-header">
		<p>Icon</p>
		<p>Menu</p>
		<router-link to="/">
			<h1>DVLP / DNVR / 2019</h1>
		</router-link>
		<!-- <primary-navigation /> -->
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
		background-color: $black;
		position: fixed;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 1;
		padding: $baseline;
		h1 {
			writing-mode: sideways-lr;
			@include primary-header-font;
		}
	}
</style>

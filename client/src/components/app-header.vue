<template>
	<header class="app-header">
		<router-link to="/">
			<h1>Develop Denver 2019</h1>
		</router-link>
		<primary-navigation />
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
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		padding: $baseline;
		a {
			text-decoration: none;
		}
		h1 {
			@include primary-header-font;
		}
		.logo {
			padding: $small;
			height: 50px;
			max-width: 100%;
			margin-top: $large;
			margin-bottom: $large;
			fill: $white;
		}
	}
</style>

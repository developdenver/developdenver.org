<template>
	<header class="app-header">
		<h1>Develop Denver</h1>
		<router-link to="/">
			<img class="logo" src="../assets/dvlp_18_wht.svg" alt="Develop Denver Logo" />
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

	.app-header {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		padding: $baseline;
		h1 {
			display: none;
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

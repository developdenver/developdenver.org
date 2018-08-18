<template>
	<header class="app-header">
		<h1>Develop Denver</h1>
		<router-link to="/">
			<img class="logo" src="../assets/logo.svg" alt="Develop Denver Logo" />
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

	.app-header {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		h1 {
			display: none;
		}
		.logo {
			width: 150px;
			margin-top: $xl;
			margin-bottom: $xl;
		}
	}
</style>

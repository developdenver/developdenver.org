<template>
	<header class="app-header">
		<div class="app-header-content">
			<button
				class="menu"
				@click="toggleMenu"
				:isMenuOpen="isMenuOpen"
			><font-awesome-icon :icon="menuIcon" /></button>
			<router-link to="/">
				<h1>DVLP / DNVR / 2019</h1>
			</router-link>
		</div>
		<slot />
	</header>
</template>

<script>
import PrimaryNavigation from "@/components/primary-navigation.vue";

export default {
	components: {
		PrimaryNavigation,
	},
	props: {
		isMenuOpen: Boolean,
	},
	computed: {
		menuIcon(){
			return this.isMenuOpen ? "times" : "bars"
		},
	},
	methods: {
		toggleMenu(){
			this.$emit("toggleMenu");
		}
	}
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
			display: inline-flex;
			justify-content: center;
			align-items: center;
			padding: 0;
			background: none;
			border: none;
			color: $white;
			width: 100%;
			margin-bottom: $baseline * 4;
			cursor: pointer;
			svg {
				width: 100%;
				height: 36px;
			}
		}
	}
</style>

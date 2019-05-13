<template>
	<header class="app-header">
		<div class="app-header-content">
			<router-link to="/" class="circle-logo-link"><circle-logo /></router-link>
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
import CircleLogo from "@/components/circle-logo";
import PrimaryNavigation from "@/components/primary-navigation.vue";

export default {
	components: {
		PrimaryNavigation,
		CircleLogo,
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
			z-index: 100;
			padding: $baseline;
			@media (max-width: $small-breakpoint) {
				top: auto;
				left: auto;
				height: auto;
				max-width: 100%;
				width: 100%;
				bottom: 0;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				.circle-logo-link {
					display: none;
				}
				.hamburger-container {
					display: none;
				}
				a {
					width: 100%;
				}
			}
			h1 {
				@include primary-header-font;
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				@media (max-width: $small-breakpoint) {
					writing-mode: initial;
					transform: initial;
					font-size: $baseline;
				}
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
			cursor: pointer;
			margin-top: $baseline * 4;
			margin-bottom: $baseline * 4;
			@media (max-width: $small-breakpoint) {
				margin: 0;
				order: 2;
				flex: 1;
				justify-self: flex-end;
			}
			svg {
				width: 100%;
				height: 36px;
				@media (max-width: $small-breakpoint) {
					width: auto;
				}
			}
		}
	}
</style>

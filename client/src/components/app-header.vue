<template>
	<header class="app-header">
		<div class="app-header-content">
			<router-link to="/" class="circle-logo-link"
				><circle-logo
			/></router-link>
			<button class="menu" @click="toggleMenu" :isMenuOpen="isMenuOpen">
				<font-awesome-icon :icon="menuIcon" />
			</button>
			<div class="title-wrap">
				<img src="/img/DVLP_DNVR_text.png" />
			</div>
		</div>
		<slot />
	</header>
</template>

<script>
import CircleLogo from '@/components/circle-logo';
import PrimaryNavigation from '@/components/primary-navigation.vue';

export default {
	components: {
		PrimaryNavigation,
		CircleLogo,
	},
	props: {
		isMenuOpen: Boolean,
	},
	computed: {
		menuIcon() {
			return this.isMenuOpen ? 'times' : 'bars';
		},
	},
	methods: {
		toggleMenu() {
			this.$emit('toggleMenu');
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.app-header {
	.app-header-content {
		background-color: $yellow;
		border-right: $thin-border-width solid $black;
		height: 100vh;
		left: 0;
		max-width: 100px; // Chrome hack
		position: fixed;
		top: 0;
		z-index: 100;
		@media (max-width: $small-breakpoint) {
			@include flexbox;
			@include flex-flow(nowrap);
			@include justify-content(space-between);
			bottom: 0;
			height: auto;
			left: auto;
			max-width: 100%;
			top: auto;
			width: 100%;
			.circle-logo-link {
				display: none;
			}
			.hamburger-container {
				display: none;
			}
		}
		.title-wrap {
			@include flexbox;
			@include justify-content(center);
			@include align-items(center);
			height: 78%;
			img {
				height: 100%;
				max-height: 400px;
				width: auto;
			}
		}
	}
	.menu {
		@include align-items(center);
		@include justify-content(center);
		cursor: pointer;
		display: inline-flex;
		background: none;
		border-bottom: $thin-border-width solid $black;
		border-left: none;
		border-right: none;
		border-top: none;
		color: $black;
		width: 100%;
		padding-top: $baseline;
		padding-bottom: $baseline;
		@media (max-width: $small-breakpoint) {
			@include flex(1);
			justify-self: flex-end;
			margin: 0;
			order: 2;
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

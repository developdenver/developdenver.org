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
				<img
					src="/img/DVLP_DNVR_text_horizontal.png"
					class="mobile-title"
				/>
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
			@include align-items(center);
			@include justify-content(space-between);
			border: 0;
			border-top: $thin-border-width solid $black;
			bottom: 0;
			height: auto;
			padding: $baseline;
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
			.mobile-title {
				display: none;
			}
			img {
				height: 100%;
				max-height: 400px;
				width: auto;
			}
			@media (max-width: $small-breakpoint) {
				@include justify-content(flex-start);
				@include align-items(center);
				width: 70%;
				img {
					display: none;
					&.mobile-title {
						display: block;
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
	.menu {
		@include align-items(center);
		@include justify-content(flex-end);
		cursor: pointer;
		display: inline-flex;
		background: none;
		border: none;
		border-bottom: $thin-border-width solid $black;
		color: $black;
		margin-top: 0;
		padding: $baseline 0;
		width: 100%;
		@media (max-width: $small-breakpoint) {
			border-bottom: none;
			@include flex(1);
			justify-self: flex-end;
			margin: 0;
			order: 2;
			padding: 0;
			width: 30%;
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

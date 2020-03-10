<template>
	<div id="app">
		<!-- <header class="mobile-header">
			<circle-logo />
			<countdown />
		</header> -->
		<app-header @toggleMenu="toggleMenu" :isMenuOpen="isMenuOpen">
			<hamburger-menu
				:isMenuOpen="isMenuOpen"
				@click.native="closeMenu"
			/>
		</app-header>
		<main @click="closeMenu">
			<router-view />
			<app-footer />
		</main>
	</div>
</template>

<script>
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import HamburgerMenu from '@/components/hamburger-menu';

import CircleLogo from '@/components/circle-logo';
import Countdown from '@/components/count-down';

export default {
	hagridActions: ['tickets/fetchTickets'],
	components: {
		AppHeader,
		AppFooter,
		HamburgerMenu,
		CircleLogo,
		Countdown,
	},
	data() {
		return {
			isMenuOpen: false,
		};
	},
	mounted() {
		this.$store.dispatch('services/user/fetchProfile');
	},
	watch: {
		$route() {
			this.isMenuOpen = false;
		},
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
		closeMenu() {
			this.isMenuOpen = false;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_reset.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

#app {
	@include flexbox;
	@include flex-flow(row nowrap);
	min-height: 100vh;
	.mobile-header {
		display: none;
	}
	main {
		margin-left: 100px;
		max-width: 100%;
		overflow: hidden;
		width: 100%;
		@media (max-width: $small-breakpoint) {
			margin-left: 0;
		}
	}
	@media (max-width: $small-breakpoint) {
		@include flex-flow(column nowrap);
		//	margin: $mobile-header-size auto $mobile-footer-size auto; // Makes room for fixed header and footer;
		min-height: initial;
		padding: 0;
		.mobile-header {
			background-color: $yellow;
			display: flex;
			justify-content: space-between;
			width: 100%;
			z-index: 1;
			.countdown {
				max-width: 70%;
			}
			.circle-logo {
				@include flexbox;
				@include align-items(center);
				@include justify-content(start);
				width: 30%;
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
}
</style>

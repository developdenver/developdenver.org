<template>
	<div id="app">
		<header class="mobile-header">
			<circle-logo />
			<countdown />
		</header>
		<app-header
			@toggleMenu="toggleMenu"
			:isMenuOpen="isMenuOpen"
		>
			<hamburger-menu
				:isMenuOpen="isMenuOpen"
				@click.native="closeMenu"
			/>
		</app-header>
		<main
			@click="closeMenu"
		>
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
			isMenuOpen: false
		}
	},
	mounted() {
		this.$store.dispatch('services/user/fetchProfile');
	},
	watch: {
		'$route' (){
			this.isMenuOpen = false
		}
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		closeMenu() {
			this.isMenuOpen = false
		}
	},
};
</script>

<style lang="scss">
@import '@/styles/_reset.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

#app {
	min-height: 100vh;
	display: flex;
	flex-flow: row nowrap;
	padding: $baseline;
	.mobile-header {
		display: none;
	}
	main {
		width: 100%;
	}
	@media (max-width: $small-breakpoint) {
		flex-flow: column nowrap;
		margin: $mobile-header-size auto $mobile-footer-size auto; // Makes room for fixed header and footer;
		padding: 0;
		min-height: initial;
		.mobile-header {
			background-color: $black;
			display: flex;
			position: fixed;
			top: 0;
			width: 100%;
			padding: $baseline;
			justify-content: space-between;
			z-index: 1;
			.countdown {
				max-width: 70%;
			}
			.circle-logo {
				width: 30%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
}
</style>
